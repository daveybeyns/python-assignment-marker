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
    ast.Eq: "==",
    ast.NotEq: "!=",
    ast.Gt: ">",
    ast.GtE: ">=",
    ast.Lt: "<",
    ast.LtE: "<=",
    ast.In: "in",
    ast.NotIn: "not in",
    ast.Is: "is",
    ast.IsNot: "is not"
}

result = {
    "assignmentId": assignment_id,
    "syntax": {"ok": False, "error": None},
    "policy": {"safe": True, "issues": []},
    "static": {},
    "tests": []
}

source_lines = source.splitlines()

class MarkerVisitor(ast.NodeVisitor):
    def __init__(self):
        self.assigned_names = set()
        self.input_calls = 0
        self.prompted_inputs = 0
        self.cast_calls = {"int": 0, "float": 0, "str": 0, "bool": 0}
        self.print_calls = 0
        self.constants = {"string": 0, "integer": 0, "float": 0, "boolean": 0}
        self.heading_strings = []
        self.issues = []
        self.if_count = 0
        self.elif_count = 0
        self.else_count = 0
        self.comparison_count = 0
        self.comparison_operators = []

    def collect_target(self, target):
        if isinstance(target, ast.Name):
            self.assigned_names.add(target.id)
        elif isinstance(target, (ast.Tuple, ast.List)):
            for item in target.elts:
                self.collect_target(item)

    def visit_Assign(self, node):
        for target in node.targets:
            self.collect_target(target)
        self.generic_visit(node)

    def visit_AnnAssign(self, node):
        self.collect_target(node.target)
        self.generic_visit(node)

    def visit_NamedExpr(self, node):
        self.collect_target(node.target)
        self.generic_visit(node)

    def visit_For(self, node):
        self.collect_target(node.target)
        self.generic_visit(node)

    def visit_If(self, node):
        line = source_lines[node.lineno - 1].lstrip() if 0 < node.lineno <= len(source_lines) else ""
        if line.startswith("elif "):
            self.elif_count += 1
        else:
            self.if_count += 1

        if node.orelse and not (len(node.orelse) == 1 and isinstance(node.orelse[0], ast.If)):
            self.else_count += 1
        self.generic_visit(node)

    def visit_Compare(self, node):
        self.comparison_count += len(node.ops)
        for operator in node.ops:
            name = COMPARE_NAMES.get(type(operator), type(operator).__name__)
            self.comparison_operators.append(name)
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

    def visit_Constant(self, node):
        value = node.value
        if isinstance(value, bool):
            self.constants["boolean"] += 1
        elif isinstance(value, str):
            self.constants["string"] += 1
            lowered = value.lower()
            if "profile" in lowered:
                self.heading_strings.append(value)
        elif isinstance(value, int):
            self.constants["integer"] += 1
        elif isinstance(value, float):
            self.constants["float"] += 1

try:
    tree = ast.parse(source, filename="submission.py")
    result["syntax"] = {"ok": True, "error": None}
except SyntaxError as exc:
    location = f"line {exc.lineno}" if exc.lineno else "unknown line"
    result["syntax"] = {
        "ok": False,
        "error": f"{exc.msg} ({location})"
    }
else:
    visitor = MarkerVisitor()
    visitor.visit(tree)

    assigned_names = sorted(visitor.assigned_names)
    meaningful_names = sorted(
        name for name in assigned_names
        if len(name.strip("_")) >= 3 and name.lower() not in GENERIC_NAMES
    )

    issue_list = sorted(set(visitor.issues))
    result["policy"] = {
        "safe": len(issue_list) == 0,
        "issues": issue_list
    }

    result["static"] = {
        "assignedNames": assigned_names,
        "meaningfulNames": meaningful_names,
        "inputCalls": visitor.input_calls,
        "promptedInputs": visitor.prompted_inputs,
        "castCalls": visitor.cast_calls,
        "printCalls": visitor.print_calls,
        "constantCounts": visitor.constants,
        "headingStrings": visitor.heading_strings,
        "ifCount": visitor.if_count,
        "elifCount": visitor.elif_count,
        "elseCount": visitor.else_count,
        "comparisonCount": visitor.comparison_count,
        "comparisonOperators": sorted(set(visitor.comparison_operators)),
        "typeEvidence": {
            "string": visitor.constants["string"] > 0 or visitor.input_calls > 0,
            "integer": visitor.constants["integer"] > 0 or visitor.cast_calls["int"] > 0,
            "float": visitor.constants["float"] > 0 or visitor.cast_calls["float"] > 0,
            "boolean": visitor.constants["boolean"] > 0 or visitor.cast_calls["bool"] > 0
        },
        "nonBlankLines": sum(1 for line in source.splitlines() if line.strip())
    }

    if result["policy"]["safe"]:
        compiled = compile(tree, "submission.py", "exec")

        for case in test_cases:
            values = case["values"]
            output_stream = io.StringIO()
            inputs_used = []
            used_keys = set()

            if assignment_id == "cinema-ticket":
                fallback_order = ["name", "age"]
                aliases = [
                    ("age", ("age", "old")),
                    ("name", ("name",))
                ]
            else:
                fallback_order = ["name", "course", "age", "hours"]
                aliases = [
                    ("course", ("course", "subject", "programme", "program")),
                    ("hours", ("hour", "study", "weekly")),
                    ("age", ("age", "old")),
                    ("name", ("name",))
                ]

            def capture_print(*args, sep=" ", end="\n", file=None, flush=False):
                text = sep.join(str(item) for item in args) + end
                output_stream.write(text)

            def choose_key(prompt):
                lowered = str(prompt).lower()
                for key, terms in aliases:
                    if key not in used_keys and any(term in lowered for term in terms):
                        return key
                for key in fallback_order:
                    if key not in used_keys:
                        return key
                return None

            def fake_input(prompt=""):
                key = choose_key(prompt)
                if key is None:
                    raise EOFError(f"The program requested more than {len(fallback_order)} answers")
                used_keys.add(key)
                value = str(values[key])
                inputs_used.append({"prompt": str(prompt), "key": key, "value": value})
                return value

            safe_builtins = {
                "print": capture_print,
                "input": fake_input,
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
                "label": case["label"],
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

            def contains_number(number_text):
                return re.search(rf"(?<![\d.]){re.escape(str(number_text))}(?![\d.])", output) is not None

            if assignment_id == "cinema-ticket":
                expected = case.get("expected", {})
                test_result["matches"] = {
                    "name": values["name"].lower() in output_lower,
                    "ticketType": str(expected.get("ticketType", "")).lower() in output_lower,
                    "price": contains_number(expected.get("price", ""))
                }
                test_result["labels"] = {
                    "name": "name" in output_lower or "hello" in output_lower or "customer" in output_lower,
                    "ticket": "ticket" in output_lower,
                    "price": "price" in output_lower or "£" in output or "gbp" in output_lower
                }
            else:
                test_result["matches"] = {
                    "name": values["name"].lower() in output_lower,
                    "course": values["course"].lower() in output_lower,
                    "age": contains_number(values["age"]),
                    "hours": contains_number(values["hours"]),
                    "enrolled": "true" in output_lower
                }
                test_result["labels"] = {
                    "name": "name" in output_lower,
                    "course": "course" in output_lower,
                    "age": "age" in output_lower,
                    "hours": "hour" in output_lower or "study" in output_lower,
                    "enrolled": "enrol" in output_lower or "enroll" in output_lower
                }
                test_result["heading"] = (
                    "learner profile" in output_lower
                    or "student profile" in output_lower
                    or ("profile" in output_lower and output_lower.count("\n") >= 2)
                )

            result["tests"].append(test_result)


json.dumps(result)
`;

async function initialise() {
    try {
        self.postMessage({ type: "loading", message: "Loading Python runtime…" });
        pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
        self.postMessage({ type: "ready" });
    } catch (error) {
        self.postMessage({ type: "boot-error", error: String(error?.message || error) });
    }
}

self.onmessage = async (event) => {
    const message = event.data;
    if (message.type !== "evaluate" || !pyodide) return;

    try {
        pyodide.globals.set("SOURCE_CODE", message.source);
        pyodide.globals.set("TEST_CASES_JSON", JSON.stringify(message.tests));
        pyodide.globals.set("ASSIGNMENT_ID", message.assignmentId);
        const returnedValue = await pyodide.runPythonAsync(MARKER_SCRIPT);
        const resultJson = typeof returnedValue === "string"
            ? returnedValue
            : returnedValue?.toString?.();

        if (!resultJson) {
            throw new Error("The Python marker completed but returned no result.");
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
            error: String(error?.message || error)
        });
    }
};

initialise();
