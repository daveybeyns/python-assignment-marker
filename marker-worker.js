import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/pyodide.mjs";

const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v0.29.4/full/";
let pyodide;

const MARKER_SCRIPT = String.raw`
import ast
import builtins
import io
import json
import os
import shutil

source = SOURCE_CODE
test_cases = json.loads(TEST_CASES_JSON)
assignment_id = ASSIGNMENT_ID
options = json.loads(OPTIONS_JSON)

allow_open = bool(options.get("allowOpen", False))
allow_imports = bool(options.get("allowImports", False))
max_output = int(options.get("maxOutputCharacters", 12000))

GENERIC_NAMES = {
    "a", "b", "c", "x", "y", "z", "n", "num", "var", "variable",
    "value", "val", "data", "info", "thing", "temp", "test", "answer"
}
BANNED_CALLS = {
    "exec", "eval", "compile", "__import__", "globals", "locals",
    "vars", "getattr", "setattr", "delattr", "breakpoint", "help", "exit", "quit"
}
if not allow_open:
    BANNED_CALLS.add("open")

COMPARE_NAMES = {
    ast.Eq: "==", ast.NotEq: "!=", ast.Gt: ">", ast.GtE: ">=",
    ast.Lt: "<", ast.LtE: "<=", ast.In: "in", ast.NotIn: "not in",
    ast.Is: "is", ast.IsNot: "is not"
}
BINARY_NAMES = {
    ast.Add: "+", ast.Sub: "-", ast.Mult: "*", ast.Div: "/", ast.FloorDiv: "//",
    ast.Mod: "%", ast.Pow: "**", ast.MatMult: "@", ast.BitAnd: "&", ast.BitOr: "|",
    ast.BitXor: "^", ast.LShift: "<<", ast.RShift: ">>"
}

result = {
    "assignmentId": assignment_id,
    "syntax": {"ok": False, "error": None},
    "policy": {"safe": True, "issues": []},
    "static": {},
    "tests": []
}
source_lines = source.splitlines()

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
    return any(word in lowered for word in ("total", "saved", "saving", "amount", "sum"))

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
        self.round_calls = 0
        self.open_calls = 0
        self.file_modes = []
        self.constants = {"string": 0, "integer": 0, "float": 0, "boolean": 0, "none": 0}
        self.heading_strings = []
        self.issues = []
        self.if_count = 0
        self.elif_count = 0
        self.else_count = 0
        self.comparison_count = 0
        self.comparison_operators = []
        self.binary_operators = []
        self.boolean_operator_count = 0
        self.for_count = 0
        self.while_count = 0
        self.range_calls = 0
        self.for_inside_while = 0
        self.total_initialisations = 0
        self.total_updates = 0
        self.repeat_updates = 0
        self.break_count = 0
        self.continue_count = 0
        self.try_count = 0
        self.except_count = 0
        self.raise_count = 0
        self.list_literal_count = 0
        self.dict_literal_count = 0
        self.set_literal_count = 0
        self.tuple_literal_count = 0
        self.subscript_count = 0
        self.function_definitions = []
        self.function_calls = {}
        self.method_calls = {}
        self.function_call_sites = []
        self.class_definitions = []
        self.return_count = 0
        self.loop_stack = []
        self.function_stack = []
        self.class_stack = []
        self.function_records = {}

    def collect_target(self, target):
        for name in target_names(target):
            self.assigned_names.add(name)

    def current_function(self):
        return self.function_stack[-1] if self.function_stack else "<module>"

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

    def visit_FunctionDef(self, node):
        parameters = [arg.arg for arg in node.args.posonlyargs + node.args.args + node.args.kwonlyargs]
        if node.args.vararg:
            parameters.append("*" + node.args.vararg.arg)
        if node.args.kwarg:
            parameters.append("**" + node.args.kwarg.arg)
        record = {
            "name": node.name,
            "parameters": parameters,
            "parameterCount": len(parameters),
            "returnCount": 0,
            "hasReturn": False,
            "lineno": node.lineno,
            "className": self.class_stack[-1] if self.class_stack else None
        }
        self.function_definitions.append(record)
        self.function_records[(self.class_stack[-1] if self.class_stack else None, node.name)] = record
        self.function_stack.append(node.name)
        for statement in node.body:
            self.visit(statement)
        self.function_stack.pop()
        for decorator in node.decorator_list:
            self.visit(decorator)
        for default in list(node.args.defaults) + list(node.args.kw_defaults):
            if default is not None:
                self.visit(default)

    visit_AsyncFunctionDef = visit_FunctionDef

    def visit_Return(self, node):
        self.return_count += 1
        if self.function_stack:
            key = (self.class_stack[-1] if self.class_stack else None, self.function_stack[-1])
            record = self.function_records.get(key)
            if record:
                record["returnCount"] += 1
                if node.value is not None:
                    record["hasReturn"] = True
        self.generic_visit(node)

    def visit_ClassDef(self, node):
        record = {"name": node.name, "methods": [], "lineno": node.lineno}
        self.class_definitions.append(record)
        self.class_stack.append(node.name)
        before = len(self.function_definitions)
        for statement in node.body:
            self.visit(statement)
        record["methods"] = [
            item["name"] for item in self.function_definitions[before:]
            if item.get("className") == node.name
        ]
        self.class_stack.pop()
        for decorator in node.decorator_list:
            self.visit(decorator)

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
            self.comparison_operators.append(
                COMPARE_NAMES.get(type(operator), type(operator).__name__)
            )
        self.generic_visit(node)

    def visit_BinOp(self, node):
        self.binary_operators.append(
            BINARY_NAMES.get(type(node.op), type(node.op).__name__)
        )
        self.generic_visit(node)

    def visit_BoolOp(self, node):
        self.boolean_operator_count += 1
        self.generic_visit(node)

    def visit_Break(self, node):
        self.break_count += 1

    def visit_Continue(self, node):
        self.continue_count += 1

    def visit_Try(self, node):
        self.try_count += 1
        self.except_count += len(node.handlers)
        self.generic_visit(node)

    def visit_Raise(self, node):
        self.raise_count += 1
        self.generic_visit(node)

    def visit_List(self, node):
        self.list_literal_count += 1
        self.generic_visit(node)

    def visit_Dict(self, node):
        self.dict_literal_count += 1
        self.generic_visit(node)

    def visit_Set(self, node):
        self.set_literal_count += 1
        self.generic_visit(node)

    def visit_Tuple(self, node):
        self.tuple_literal_count += 1
        self.generic_visit(node)

    def visit_Subscript(self, node):
        self.subscript_count += 1
        self.generic_visit(node)

    def visit_Import(self, node):
        if not allow_imports:
            self.issues.append("import statements are not enabled for this assignment")
        self.generic_visit(node)

    def visit_ImportFrom(self, node):
        if not allow_imports:
            self.issues.append("import statements are not enabled for this assignment")
        self.generic_visit(node)

    def visit_Call(self, node):
        name = node.func.id if isinstance(node.func, ast.Name) else None
        method_name = node.func.attr if isinstance(node.func, ast.Attribute) else None
        if name:
            self.function_calls[name] = self.function_calls.get(name, 0) + 1
            self.function_call_sites.append({
                "caller": self.current_function(), "callee": name, "lineno": node.lineno
            })
        elif method_name:
            self.method_calls[method_name] = self.method_calls.get(method_name, 0) + 1
            self.function_call_sites.append({
                "caller": self.current_function(), "callee": method_name,
                "lineno": node.lineno, "method": True
            })

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
        elif name == "round":
            self.round_calls += 1
        elif name == "range":
            self.range_calls += 1
        elif name == "open":
            self.open_calls += 1
            if len(node.args) >= 2 and isinstance(node.args[1], ast.Constant):
                self.file_modes.append(str(node.args[1].value))

        if name in BANNED_CALLS:
            self.issues.append(f"unsupported call: {name}()")
        self.generic_visit(node)

    def visit_Attribute(self, node):
        allowed_special_attributes = {"__init__", "__str__", "__repr__"}
        if node.attr.startswith("_") and node.attr not in allowed_special_attributes:
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
        elif value is None:
            self.constants["none"] += 1
        elif isinstance(value, str):
            self.constants["string"] += 1
            lowered = value.lower()
            if any(word in lowered for word in ("profile", "summary", "report", "tracker")):
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
        "roundCalls": visitor.round_calls,
        "openCalls": visitor.open_calls,
        "fileModes": visitor.file_modes,
        "constantCounts": visitor.constants,
        "headingStrings": visitor.heading_strings,
        "ifCount": visitor.if_count,
        "elifCount": visitor.elif_count,
        "elseCount": visitor.else_count,
        "comparisonCount": visitor.comparison_count,
        "comparisonOperators": sorted(set(visitor.comparison_operators)),
        "binaryOperators": visitor.binary_operators,
        "booleanOperatorCount": visitor.boolean_operator_count,
        "forCount": visitor.for_count,
        "whileCount": visitor.while_count,
        "rangeCalls": visitor.range_calls,
        "forInsideWhile": visitor.for_inside_while,
        "totalInitialisations": visitor.total_initialisations,
        "totalUpdates": visitor.total_updates,
        "repeatUpdates": visitor.repeat_updates,
        "breakCount": visitor.break_count,
        "continueCount": visitor.continue_count,
        "tryCount": visitor.try_count,
        "exceptCount": visitor.except_count,
        "raiseCount": visitor.raise_count,
        "listLiteralCount": visitor.list_literal_count,
        "dictLiteralCount": visitor.dict_literal_count,
        "setLiteralCount": visitor.set_literal_count,
        "tupleLiteralCount": visitor.tuple_literal_count,
        "subscriptCount": visitor.subscript_count,
        "functionDefinitions": visitor.function_definitions,
        "functionCalls": visitor.function_calls,
        "methodCalls": visitor.method_calls,
        "functionCallSites": visitor.function_call_sites,
        "classDefinitions": visitor.class_definitions,
        "returnCount": visitor.return_count,
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
        root = "/tmp/python_assignment_marker"
        if os.path.exists(root):
            shutil.rmtree(root)
        os.makedirs(root, exist_ok=True)

        for case_index, case in enumerate(test_cases):
            test_dir = os.path.join(root, f"test_{case_index + 1}")
            os.makedirs(test_dir, exist_ok=True)
            os.chdir(test_dir)

            for file_name, content in (case.get("files") or {}).items():
                safe_path = os.path.abspath(os.path.join(test_dir, file_name))
                if not safe_path.startswith(os.path.abspath(test_dir) + os.sep):
                    continue
                os.makedirs(os.path.dirname(safe_path), exist_ok=True)
                with builtins.open(safe_path, "w", encoding="utf-8") as handle:
                    handle.write(str(content))

            input_spec = case.get("input") or {}
            mode = input_spec.get("mode", "sequence")
            sequence_values = [
                str(value) for value in input_spec.get("values", case.get("inputs", []))
            ]
            mapped_values = {
                str(key): str(value)
                for key, value in (input_spec.get("valuesByKey") or {}).items()
            }
            fallback_order = [
                str(key) for key in input_spec.get("fallbackOrder", mapped_values.keys())
            ]
            aliases = input_spec.get("aliases") or []
            used_keys = set()
            position_box = [0]
            inputs_used = []
            output_stream = io.StringIO()

            def capture_print(*args, sep=" ", end="\n", file=None, flush=False):
                output_stream.write(sep.join(str(item) for item in args) + end)

            def choose_key(prompt):
                lowered = str(prompt).lower()
                for alias in aliases:
                    key = str(alias.get("key", ""))
                    terms = [str(term).lower() for term in alias.get("terms", [])]
                    if key and key not in used_keys and any(term in lowered for term in terms):
                        return key
                for key in fallback_order:
                    if key not in used_keys:
                        return key
                return None

            def supplied_input(prompt=""):
                if mode == "prompt-map":
                    key = choose_key(prompt)
                    if key is None or key not in mapped_values:
                        raise EOFError(
                            f"The program requested more than {len(mapped_values)} supplied answers"
                        )
                    used_keys.add(key)
                    value = mapped_values[key]
                else:
                    index = position_box[0]
                    if index >= len(sequence_values):
                        raise EOFError(
                            f"The program requested more than {len(sequence_values)} supplied answers"
                        )
                    key = f"answer{index + 1}"
                    value = sequence_values[index]
                    position_box[0] += 1
                inputs_used.append({"prompt": str(prompt), "key": key, "value": value})
                return value

            safe_builtins = {
                "print": capture_print, "input": supplied_input,
                "int": int, "float": float, "str": str, "bool": bool,
                "len": len, "range": range, "round": round, "min": min, "max": max,
                "abs": abs, "sum": sum, "enumerate": enumerate, "zip": zip,
                "list": list, "dict": dict, "set": set, "tuple": tuple,
                "sorted": sorted, "reversed": reversed, "any": any, "all": all,
                "isinstance": isinstance, "issubclass": issubclass, "type": type,
                "iter": iter, "next": next, "map": map, "filter": filter,
                "format": format, "ord": ord, "chr": chr, "bin": bin,
                "hex": hex, "oct": oct, "divmod": divmod, "pow": pow,
                "object": object, "super": super, "property": property,
                "staticmethod": staticmethod, "classmethod": classmethod,
                "__build_class__": builtins.__build_class__,
                "ValueError": ValueError, "TypeError": TypeError, "Exception": Exception,
                "IndexError": IndexError, "KeyError": KeyError,
                "ZeroDivisionError": ZeroDivisionError,
                "FileNotFoundError": FileNotFoundError, "OSError": OSError,
                "EOFError": EOFError, "AttributeError": AttributeError,
                "NameError": NameError,
                "True": True, "False": False, "None": None
            }
            if allow_open:
                safe_builtins["open"] = builtins.open
            if allow_imports:
                safe_builtins["__import__"] = builtins.__import__

            execution_globals = {"__builtins__": safe_builtins, "__name__": "__main__"}
            test_result = {
                "label": case.get("label", f"Test {case_index + 1}"),
                "ok": False, "error": None, "output": "", "transcript": "",
                "inputsUsed": [], "variables": [], "functionTests": [], "files": {}
            }

            try:
                exec(compiled, execution_globals, execution_globals)
                test_result["ok"] = True
            except BaseException as exc:
                test_result["error"] = f"{type(exc).__name__}: {exc}"

            output = output_stream.getvalue()
            test_result["output"] = output[:max_output]
            test_result["inputsUsed"] = inputs_used
            test_result["transcript"] = "\n".join(
                f"{item['prompt']}{item['value']}" for item in inputs_used
            )[:max_output]

            variable_rows = []
            for name, value in execution_globals.items():
                if name.startswith("__") or callable(value):
                    continue
                try:
                    rendered = repr(value)
                except BaseException:
                    rendered = "<unavailable>"
                row = {"name": name, "type": type(value).__name__, "value": rendered[:160]}
                if value is None or isinstance(value, (str, int, float, bool)):
                    row["jsonValue"] = value
                variable_rows.append(row)
            test_result["variables"] = sorted(
                variable_rows, key=lambda item: item["name"]
            )

            if test_result["ok"]:
                for spec in case.get("functionTests", []):
                    function_name = str(spec.get("functionName", ""))
                    function_result = {
                        "label": spec.get("label", function_name),
                        "functionName": function_name,
                        "ok": False, "error": None, "value": None,
                        "valueType": None, "jsonValue": None, "printed": ""
                    }
                    try:
                        function = execution_globals.get(function_name)
                        if not callable(function):
                            raise NameError(
                                f"{function_name} is not defined as a callable function"
                            )
                        before = output_stream.tell()
                        value = function(
                            *spec.get("args", []), **spec.get("kwargs", {})
                        )
                        complete_output = output_stream.getvalue()
                        function_result["printed"] = complete_output[before:][:max_output]
                        function_result["ok"] = True
                        function_result["valueType"] = type(value).__name__
                        function_result["value"] = repr(value)[:500]
                        if value is None or isinstance(value, (str, int, float, bool)):
                            function_result["jsonValue"] = value
                    except BaseException as exc:
                        function_result["error"] = f"{type(exc).__name__}: {exc}"
                    test_result["functionTests"].append(function_result)

            for file_name in case.get("captureFiles") or []:
                safe_path = os.path.abspath(os.path.join(test_dir, file_name))
                if (
                    safe_path.startswith(os.path.abspath(test_dir) + os.sep)
                    and os.path.isfile(safe_path)
                ):
                    try:
                        with builtins.open(
                            safe_path, "r", encoding="utf-8"
                        ) as handle:
                            test_result["files"][file_name] = handle.read(max_output)
                    except BaseException as exc:
                        test_result["files"][file_name] = f"<read error: {exc}>"

            result["tests"].append(test_result)

RESULT_JSON = json.dumps(result)
`;

async function boot() {
    self.postMessage({ type: "loading", message: "Loading shared Python marker…" });
    pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
    self.postMessage({ type: "ready" });
}

const readyPromise = boot().catch((error) => {
    self.postMessage({ type: "boot-error", error: error?.message || String(error) });
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
        pyodide.globals.set("OPTIONS_JSON", JSON.stringify(message.options || {}));
        try {
            pyodide.globals.delete("RESULT_JSON");
        } catch {
            // First evaluation.
        }

        await pyodide.runPythonAsync(MARKER_SCRIPT);

        const resultValue = pyodide.globals.get("RESULT_JSON");
        let resultJson;
        if (typeof resultValue === "string") resultJson = resultValue;
        else if (resultValue && typeof resultValue.toJs === "function") {
            resultJson = resultValue.toJs();
        } else if (resultValue !== undefined && resultValue !== null) {
            resultJson = String(resultValue);
        }
        if (resultValue && typeof resultValue.destroy === "function") {
            resultValue.destroy();
        }
        if (!resultJson || resultJson === "undefined") {
            throw new Error("The marker completed but did not return a JSON result.");
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
