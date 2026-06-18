import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.mjs";

const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";
let pyodide;

const MARKER_SCRIPT = String.raw`
import ast
import io
import json
import re

source = SOURCE_CODE
test_cases = json.loads(TEST_CASES_JSON)
assignment_id = ASSIGNMENT_ID

GENERIC_NAMES = {
    "a", "b", "c", "x", "y", "z", "n", "num", "var", "variable",
    "value", "val", "data", "info", "thing", "temp", "test", "answer"
}

BANNED_CALLS = {
    "open", "exec", "eval", "compile", "__import__", "globals", "locals",
    "vars", "getattr", "setattr", "delattr", "breakpoint", "help", "exit", "quit"
}

COMPARE_NAMES = {
    ast.Eq: "==", ast.NotEq: "!=", ast.Gt: ">", ast.GtE: ">=",
    ast.Lt: "<", ast.LtE: "<=", ast.In: "in", ast.NotIn: "not in",
    ast.Is: "is", ast.IsNot: "is not"
}

result = {
    "assignmentId": assignment_id,
    "syntax": {"ok": False, "error": None},
    "policy": {"safe": True, "issues": []},
    "static": {},
    "tests": []
}

def target_names(target):
    names = []
    if isinstance(target, ast.Name):
        names.append(target.id)
    elif isinstance(target, (ast.Tuple, ast.List)):
        for item in target.elts:
            names.extend(target_names(item))
    return names

def contains_call(node, function_name):
    return any(
        isinstance(item, ast.Call)
        and isinstance(item.func, ast.Name)
        and item.func.id == function_name
        for item in ast.walk(node)
    )

def contains_name(node, name):
    return any(isinstance(item, ast.Name) and item.id == name for item in ast.walk(node))

def total_like(name):
    lowered = name.lower()
    return any(word in lowered for word in ("total", "saved", "saving", "amount"))

def repeat_like(name):
    lowered = name.lower()
    return any(word in lowered for word in ("again", "repeat", "continue", "another", "choice"))

def is_numeric_zero(node):
    return (
        isinstance(node, ast.Constant)
        and isinstance(node.value, (int, float))
        and not isinstance(node.value, bool)
        and float(node.value) == 0.0
    )

class MarkerVisitor(ast.NodeVisitor):
    def __init__(self):
        self.assigned_names = set()
        self.input_calls = 0
        self.prompted_inputs = 0
        self.cast_calls = {"int": 0, "float": 0, "str": 0, "bool": 0}
        self.print_calls = 0
        self.for_count = 0
        self.while_count = 0
        self.range_calls = 0
        self.for_inside_while = 0
        self.total_initialisations = 0
        self.total_updates = 0
        self.repeat_updates = 0
        self.comparison_count = 0
        self.comparison_operators = []
        self.issues = []
        self.loop_stack = []

    def collect_target(self, target):
        for name in target_names(target):
            self.assigned_names.add(name)

    def visit_Assign(self, node):
        for target in node.targets:
            self.collect_target(target)
            for name in target_names(target):
                if total_like(name) and is_numeric_zero(node.value):
                    self.total_initialisations += 1
                if "for" in self.loop_stack and total_like(name) and contains_name(node.value, name):
                    self.total_updates += 1
                if "while" in self.loop_stack and repeat_like(name) and contains_call(node.value, "input"):
                    self.repeat_updates += 1
        self.generic_visit(node)

    def visit_AnnAssign(self, node):
        self.collect_target(node.target)
        if node.value is not None:
            for name in target_names(node.target):
                if total_like(name) and is_numeric_zero(node.value):
                    self.total_initialisations += 1
                if "for" in self.loop_stack and total_like(name) and contains_name(node.value, name):
                    self.total_updates += 1
                if "while" in self.loop_stack and repeat_like(name) and contains_call(node.value, "input"):
                    self.repeat_updates += 1
        self.generic_visit(node)

    def visit_AugAssign(self, node):
        self.collect_target(node.target)
        for name in target_names(node.target):
            if "for" in self.loop_stack and total_like(name):
                self.total_updates += 1
        self.generic_visit(node)

    def visit_NamedExpr(self, node):
        self.collect_target(node.target)
        self.generic_visit(node)

    def visit_For(self, node):
        self.for_count += 1
        self.collect_target(node.target)
        if "while" in self.loop_stack:
            self.for_inside_while += 1
        self.loop_stack.append("for")
        self.generic_visit(node)
        self.loop_stack.pop()

    def visit_While(self, node):
        self.while_count += 1
        self.loop_stack.append("while")
        self.generic_visit(node)
        self.loop_stack.pop()

    def visit_Compare(self, node):
        self.comparison_count += len(node.ops)
        for operator in node.ops:
            self.comparison_operators.append(
                COMPARE_NAMES.get(type(operator), type(operator).__name__)
            )
        self.generic_visit(node)

    def visit_Import(self, node):
        self.issues.append("import statements are not required for this assignment")

    def visit_ImportFrom(self, node):
        self.issues.append("import statements are not required for this assignment")

    def visit_Call(self, node):
        name = node.func.id if isinstance(node.func, ast.Name) else None
        if name == "input":
            self.input_calls += 1
            if node.args:
                first = node.args[0]
                if isinstance(first, ast.Constant) and isinstance(first.value, str) and first.value.strip():
                    self.prompted_inputs += 1
        elif name in self.cast_calls:
            self.cast_calls[name] += 1
        elif name == "print":
            self.print_calls += 1
        elif name == "range":
            self.range_calls += 1

        if name in BANNED_CALLS:
            self.issues.append(f"unsupported call: {name}()")
        self.generic_visit(node)

    def visit_Attribute(self, node):
        if node.attr.startswith("_"):
            self.issues.append(f"unsupported private attribute access: {node.attr}")
        self.generic_visit(node)

    def visit_Name(self, node):
        if node.id.startswith("__") and node.id != "__name__":
            self.issues.append(f"unsupported special name: {node.id}")
        if node.id in {"js", "pyodide", "pyodide_js"}:
            self.issues.append(f"unsupported browser/Pyodide access: {node.id}")
        self.generic_visit(node)

try:
    tree = ast.parse(source, filename="submission.py")
    result["syntax"] = {"ok": True, "error": None}
except SyntaxError as exc:
    location = f"line {exc.lineno}" if exc.lineno else "unknown line"
    result["syntax"] = {"ok": False, "error": f"{exc.msg} ({location})"}
else:
    visitor = MarkerVisitor()
    visitor.visit(tree)

    assigned_names = sorted(visitor.assigned_names)
    meaningful_names = sorted(
        name for name in assigned_names
        if len(name.strip("_")) >= 3 and name.lower() not in GENERIC_NAMES
    )
    issues = sorted(set(visitor.issues))

    result["policy"] = {"safe": len(issues) == 0, "issues": issues}
    result["static"] = {
        "assignedNames": assigned_names,
        "meaningfulNames": meaningful_names,
        "inputCalls": visitor.input_calls,
        "promptedInputs": visitor.prompted_inputs,
        "castCalls": visitor.cast_calls,
        "printCalls": visitor.print_calls,
        "forCount": visitor.for_count,
        "whileCount": visitor.while_count,
        "rangeCalls": visitor.range_calls,
        "forInsideWhile": visitor.for_inside_while,
        "totalInitialisations": visitor.total_initialisations,
        "totalUpdates": visitor.total_updates,
        "repeatUpdates": visitor.repeat_updates,
        "comparisonCount": visitor.comparison_count,
        "comparisonOperators": sorted(set(visitor.comparison_operators)),
        "nonBlankLines": sum(1 for line in source.splitlines() if line.strip())
    }

    def numbers_in(text):
        values = []
        for match in re.findall(r"(?<![\w.])-?\d+(?:\.\d+)?", text):
            try:
                values.append(float(match))
            except ValueError:
                pass
        return values

    def has_number(text, expected):
        return any(abs(value - float(expected)) < 0.005 for value in numbers_in(text))

    def ordered_week_progress(lines, plans):
        position = 0
        for plan in plans:
            weekly = float(plan["weekly"])
            weeks = int(plan["weeks"])
            for week in range(1, weeks + 1):
                expected_total = weekly * week
                found = False
                while position < len(lines):
                    line = lines[position]
                    position += 1
                    lowered = line.lower()
                    if (
                        "week" in lowered
                        and has_number(line, week)
                        and has_number(line, expected_total)
                    ):
                        found = True
                        break
                if not found:
                    return False
        return True

    def ordered_final_totals(lines, plans):
        position = 0
        labels = ("final", "total", "saved", "saving")
        for plan in plans:
            expected_total = float(plan["weekly"]) * int(plan["weeks"])
            found = False
            while position < len(lines):
                line = lines[position]
                position += 1
                lowered = line.lower()
                if (
                    "week" not in lowered
                    and any(label in lowered for label in labels)
                    and has_number(line, expected_total)
                ):
                    found = True
                    break
            if not found:
                return False
        return True

    if result["policy"]["safe"]:
        compiled = compile(tree, "submission.py", "exec")

        for case in test_cases:
            values = case.get("values", {})
            supplied_inputs = [str(value) for value in values.get("inputs", [])]
            expected = case.get("expected", {})
            plans = expected.get("plans", [])

            output_stream = io.StringIO()
            inputs_used = []
            position_box = [0]

            def capture_print(*args, sep=" ", end="\n", file=None, flush=False):
                output_stream.write(sep.join(str(item) for item in args) + end)

            def supplied_input(prompt=""):
                index = position_box[0]
                if index >= len(supplied_inputs):
                    raise EOFError(
                        f"The program requested more than {len(supplied_inputs)} supplied answers"
                    )
                value = supplied_inputs[index]
                position_box[0] += 1
                inputs_used.append({
                    "prompt": str(prompt),
                    "key": f"answer{index + 1}",
                    "value": value
                })
                return value

            safe_builtins = {
                "print": capture_print,
                "input": supplied_input,
                "int": int,
                "float": float,
                "str": str,
                "bool": bool,
                "len": len,
                "range": range,
                "round": round,
                "min": min,
                "max": max,
                "abs": abs,
                "sum": sum,
                "enumerate": enumerate,
                "zip": zip,
                "list": list,
                "dict": dict,
                "set": set,
                "tuple": tuple,
                "ValueError": ValueError,
                "TypeError": TypeError,
                "Exception": Exception,
                "True": True,
                "False": False,
                "None": None
            }

            execution_globals = {
                "__builtins__": safe_builtins,
                "__name__": "__main__"
            }

            test_result = {
                "label": case.get("label", "Automated test"),
                "ok": False,
                "error": None,
                "output": "",
                "transcript": "",
                "inputsUsed": [],
                "variables": [],
                "matches": {},
                "labels": {},
                "heading": False
            }

            try:
                exec(compiled, execution_globals, execution_globals)
                test_result["ok"] = True
            except BaseException as exc:
                test_result["error"] = f"{type(exc).__name__}: {exc}"

            output = output_stream.getvalue()
            output_lines = [line.strip() for line in output.splitlines() if line.strip()]
            output_lower = output.lower()

            test_result["output"] = output[:12000]
            test_result["inputsUsed"] = inputs_used
            test_result["transcript"] = "\n".join(
                f"{item['prompt']}{item['value']}" for item in inputs_used
            )[:12000]

            variable_rows = []
            for name, value in execution_globals.items():
                if name.startswith("__"):
                    continue
                try:
                    rendered = repr(value)
                except BaseException:
                    rendered = "<unavailable>"
                variable_rows.append({
                    "name": name,
                    "type": type(value).__name__,
                    "value": rendered[:160]
                })
            test_result["variables"] = sorted(variable_rows, key=lambda item: item["name"])

            all_inputs_used = len(inputs_used) == len(supplied_inputs)
            weekly_progress = ordered_week_progress(output_lines, plans) if plans else False
            final_totals = ordered_final_totals(output_lines, plans) if plans else False
            closing_words = ("closed", "goodbye", "thank", "finished", "complete", "bye")
            closing = bool(output_lines) and any(
                word in output_lines[-1].lower() for word in closing_words
            )
            multiple_plans = len(plans) > 1
            repeat_worked = (
                not multiple_plans
                or (all_inputs_used and final_totals and weekly_progress)
            )
            reset_worked = True
            if multiple_plans:
                combined_total = sum(
                    float(plan["weekly"]) * int(plan["weeks"]) for plan in plans
                )
                second_total = float(plans[-1]["weekly"]) * int(plans[-1]["weeks"])
                final_lines = [
                    line for line in output_lines
                    if "week" not in line.lower()
                    and any(label in line.lower() for label in ("final", "total", "saved", "saving"))
                ]
                reset_worked = final_totals and (
                    abs(combined_total - second_total) < 0.005
                    or not any(has_number(line, combined_total) for line in final_lines)
                )

            test_result["matches"] = {
                "allInputsUsed": all_inputs_used,
                "weeklyProgress": weekly_progress,
                "finalTotals": final_totals,
                "closing": closing,
                "repeatWorked": repeat_worked,
                "resetWorked": reset_worked
            }
            test_result["labels"] = {
                "week": "week" in output_lower,
                "final": any(word in output_lower for word in ("final", "total", "saved")),
                "closing": closing
            }

            result["tests"].append(test_result)

RESULT_JSON = json.dumps(result)
`;

async function boot() {
  self.postMessage({ type: "loading", message: "Loading Topic 3 iteration marker…" });
  pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
  self.postMessage({ type: "ready" });
}

const readyPromise = boot().catch((error) => {
  self.postMessage({
    type: "boot-error",
    error: error?.message || String(error)
  });
  throw error;
});

self.onmessage = async (event) => {
  const message = event.data || {};
  if (message.type !== "evaluate") return;

  try {
    await readyPromise;
    pyodide.globals.set("SOURCE_CODE", message.source);
    pyodide.globals.set("TEST_CASES_JSON", JSON.stringify(message.tests || []));
    pyodide.globals.set("ASSIGNMENT_ID", message.assignmentId);

    try {
      pyodide.globals.delete("RESULT_JSON");
    } catch {
      // RESULT_JSON may not exist before the first evaluation.
    }

    await pyodide.runPythonAsync(MARKER_SCRIPT);

    const resultValue = pyodide.globals.get("RESULT_JSON");
    let resultJson;

    if (typeof resultValue === "string") {
      resultJson = resultValue;
    } else if (resultValue && typeof resultValue.toJs === "function") {
      resultJson = resultValue.toJs();
    } else if (resultValue !== undefined && resultValue !== null) {
      resultJson = String(resultValue);
    }

    if (resultValue && typeof resultValue.destroy === "function") {
      resultValue.destroy();
    }

    if (!resultJson || resultJson === "undefined") {
      throw new Error("The Topic 3 marker completed but did not return a JSON result.");
    }

    self.postMessage({
      type: "result",
      requestId: message.requestId,
      result: JSON.parse(resultJson)
    });
  } catch (error) {
    self.postMessage({
      type: "evaluation-error",
      requestId: message.requestId,
      error: error?.message || String(error)
    });
  }
};
