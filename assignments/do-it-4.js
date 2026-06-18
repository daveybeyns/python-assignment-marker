const assignment = {
    "enabled": true,
    "number": 4,
    "id": "study-session-analyser",
    "shortName": "Do It 4",
    "title": "Do It 4: Study Session Analyser",
    "reportTitle": "Study Session Analyser",
    "expectedFileName": "study_session_analyser.py",
    "fileNameAliases": [
        "study session analyzer"
    ],
    "slug": "study-session-analyser",
    "summary": "Checks function definitions, parameters, arguments, returned values, main(), input, casting and clear output.",
    "maxScore": 24,
    "testCases": [
        {
            "label": "Test 1 — target achieved with decimals",
            "input": {
                "mode": "sequence",
                "values": [
                    "Sam Taylor",
                    "2",
                    "1.5",
                    "3"
                ]
            },
            "expected": {
                "name": "Sam Taylor",
                "total": 6.5,
                "average": 2.1666666666666665,
                "roundedAverage": 2.2,
                "message": "Target achieved"
            },
            "functionTests": [
                {
                    "label": "calculate_total()",
                    "functionName": "calculate_total",
                    "args": [
                        2,
                        1.5,
                        3
                    ]
                },
                {
                    "label": "calculate_average()",
                    "functionName": "calculate_average",
                    "args": [
                        6.5
                    ]
                },
                {
                    "label": "get_target_message()",
                    "functionName": "get_target_message",
                    "args": [
                        6.5
                    ]
                }
            ]
        },
        {
            "label": "Test 2 — below target",
            "input": {
                "mode": "sequence",
                "values": [
                    "Morgan Evans",
                    "1",
                    "1",
                    "2"
                ]
            },
            "expected": {
                "name": "Morgan Evans",
                "total": 4,
                "average": 1.3333333333333333,
                "roundedAverage": 1.3,
                "message": "Keep practising"
            },
            "functionTests": [
                {
                    "label": "calculate_total()",
                    "functionName": "calculate_total",
                    "args": [
                        1,
                        1,
                        2
                    ]
                },
                {
                    "label": "calculate_average()",
                    "functionName": "calculate_average",
                    "args": [
                        4
                    ]
                },
                {
                    "label": "get_target_message()",
                    "functionName": "get_target_message",
                    "args": [
                        4
                    ]
                }
            ]
        },
        {
            "label": "Test 3 — exact target boundary",
            "input": {
                "mode": "sequence",
                "values": [
                    "Aisha Lewis",
                    "2",
                    "2",
                    "2"
                ]
            },
            "expected": {
                "name": "Aisha Lewis",
                "total": 6,
                "average": 2.0,
                "roundedAverage": 2.0,
                "message": "Target achieved"
            },
            "functionTests": [
                {
                    "label": "calculate_total()",
                    "functionName": "calculate_total",
                    "args": [
                        2,
                        2,
                        2
                    ]
                },
                {
                    "label": "calculate_average()",
                    "functionName": "calculate_average",
                    "args": [
                        6
                    ]
                },
                {
                    "label": "get_target_message()",
                    "functionName": "get_target_message",
                    "args": [
                        6
                    ]
                }
            ]
        }
    ],
    "rubric": [
        {
            "id": "operation",
            "title": "1. Program operation",
            "shortTitle": "Program operation",
            "summary": "Runs correctly and completes the study-session task.",
            "levels": {
                "4": "Runs from beginning to end and works correctly for all supplied test values.",
                "3": "Runs and completes the main task with one minor error or omission.",
                "2": "Runs partly, but a significant feature is missing or one test path fails.",
                "1": "A limited executable attempt is present, but major errors prevent normal completion.",
                "0": "No meaningful executable program is submitted."
            }
        },
        {
            "id": "functions",
            "title": "2. Function definitions and structure",
            "shortTitle": "Function definitions",
            "summary": "Defines four separate functions with clear responsibilities.",
            "levels": {
                "4": "All four required functions are defined correctly, clearly separated and used for their intended purposes.",
                "3": "All four functions are present, with one minor structural or naming issue.",
                "2": "Two or three meaningful functions are present, but the program is not fully decomposed.",
                "1": "A function is attempted, but most code remains outside a suitable function structure.",
                "0": "No meaningful functions are defined."
            }
        },
        {
            "id": "parameters",
            "title": "3. Parameters and arguments",
            "shortTitle": "Parameters and arguments",
            "summary": "Uses the required parameters and passes suitable arguments.",
            "levels": {
                "4": "All required parameters are present, meaningful values are passed as arguments, and the functions use them correctly.",
                "3": "Parameters and arguments are mostly correct, with one minor issue.",
                "2": "Some appropriate parameters are used, but one or more functions depend on unsuitable global values or incorrect arguments.",
                "1": "Parameters are attempted but are incomplete or do not work correctly.",
                "0": "No meaningful use of parameters and arguments."
            }
        },
        {
            "id": "returns",
            "title": "4. Return values and calculations",
            "shortTitle": "Return values and calculations",
            "summary": "Returns correct total, average and target results.",
            "levels": {
                "4": "Total, average and target functions return correct values for all tests; results are stored and used correctly.",
                "3": "Required return values are present and mostly correct, with one minor calculation or usage issue.",
                "2": "Some correct calculations or return statements are present, but one major result is missing or incorrect.",
                "1": "Return is attempted but results are mostly printed, hard-coded or not used correctly.",
                "0": "No meaningful returned values or correct calculations."
            }
        },
        {
            "id": "mainInput",
            "title": "5. main(), input and function calls",
            "shortTitle": "main(), input and calls",
            "summary": "Uses main() to collect input and coordinate the other functions.",
            "levels": {
                "4": "main() correctly collects name and three float inputs, calls all required functions and stores their returned values.",
                "3": "main() is present and mostly complete, with one minor input, casting or call issue.",
                "2": "Input and function calls are partly correct, but one major element is missing.",
                "1": "Limited input or calling is attempted, but main() does not coordinate the program successfully.",
                "0": "No meaningful main() function, input or function calls."
            }
        },
        {
            "id": "output",
            "title": "6. Output and code quality",
            "shortTitle": "Output and code quality",
            "summary": "Displays a clear, rounded study summary using readable code.",
            "levels": {
                "4": "Output is clear, complete and rounded correctly; code uses meaningful names, consistent indentation and logical organisation.",
                "3": "Output and code are clear overall, with one minor formatting, rounding or readability issue.",
                "2": "Output is understandable but incomplete, or code quality needs noticeable improvement.",
                "1": "Output is very limited or unclear and the code is difficult to follow.",
                "0": "No meaningful output is produced."
            }
        }
    ]
};


function functionDefinition(staticData, name) {
    return (staticData.functionDefinitions || []).find(
        (item) => item.name === name && !item.className
    );
}

function functionResult(test, name) {
    return (test?.functionTests || []).find((item) => item.functionName === name);
}

function numericFunctionCorrect(result, expected) {
    return Boolean(
        result?.ok
        && typeof result.jsonValue === "number"
        && Math.abs(result.jsonValue - expected) < 0.005
    );
}

function textFunctionCorrect(result, expected) {
    return Boolean(
        result?.ok
        && String(result.jsonValue || "").toLowerCase() === String(expected).toLowerCase()
    );
}

function assess(raw, helpers, source, assignment) {
    const staticData = raw.static || {};
    const reviewFlags = [];
    const criteria = {};
    helpers.addGeneralReviewFlags(raw, reviewFlags);

    const tests = (raw.tests || []).map((test, index) => {
        const expected = assignment.testCases[index]?.expected || {};
        const output = test.output || "";
        const lower = output.toLowerCase();
        return {
            ...test,
            matches: {
                name: helpers.includesText(output, expected.name),
                total: helpers.hasNumber(output, expected.total),
                average: helpers.hasNumber(output, expected.roundedAverage, 0.051),
                message: helpers.includesText(output, expected.message)
            },
            labels: {
                heading: lower.includes("study") && lower.includes("summary"),
                learner: lower.includes("learner") || lower.includes("name"),
                total: lower.includes("total"),
                average: lower.includes("average"),
                target: lower.includes("target")
            }
        };
    });

    const successful = tests.filter((test) => test.ok);
    const fullyCorrect = tests.filter(
        (test) => test.ok && Object.values(test.matches).every(Boolean)
    ).length;

    // 1. Program operation
    let operationScore = 0;
    const operationEvidence = [];
    if (!raw.syntax?.ok) {
        operationEvidence.push(
            helpers.evidence("fail", `Syntax error: ${raw.syntax?.error || "Python could not parse the file."}`)
        );
    } else if (raw.policy && !raw.policy.safe) {
        operationScore = 1;
        operationEvidence.push(
            helpers.evidence("warn", "Execution was skipped because unsupported code was detected.")
        );
    } else if (raw.timedOut) {
        operationScore = 1;
        operationEvidence.push(
            helpers.evidence("fail", "The program did not finish within the time limit.")
        );
    } else if (
        successful.length === assignment.testCases.length
        && fullyCorrect === assignment.testCases.length
    ) {
        operationScore = 4;
        operationEvidence.push(
            helpers.evidence("pass", "All three tests completed with the correct total, average and target message.")
        );
    } else if (
        successful.length === assignment.testCases.length
        && fullyCorrect >= 2
    ) {
        operationScore = 3;
        operationEvidence.push(
            helpers.evidence("warn", "All tests completed, with one minor incorrect or unclear result.")
        );
    } else if (successful.length >= 1) {
        operationScore = 2;
        operationEvidence.push(
            helpers.evidence("warn", `${successful.length} of ${assignment.testCases.length} tests completed.`)
        );
    } else if (raw.syntax?.ok) {
        operationScore = 1;
        operationEvidence.push(
            helpers.evidence("fail", "The program could not complete an automated test.")
        );
    }
    criteria.operation = { suggested: operationScore, evidence: operationEvidence };

    // 2. Function definitions
    const names = ["calculate_total", "calculate_average", "get_target_message", "main"];
    const definitions = Object.fromEntries(
        names.map((name) => [name, functionDefinition(staticData, name)])
    );
    const definitionCount = names.filter((name) => definitions[name]).length;
    const functionsScore =
        definitionCount === 4 ? 4
            : definitionCount === 3 ? 3
                : definitionCount >= 2 ? 2
                    : definitionCount === 1 ? 1 : 0;
    criteria.functions = {
        suggested: functionsScore,
        evidence: names.map((name) =>
            helpers.evidence(
                definitions[name] ? "pass" : "fail",
                `${name}() ${definitions[name] ? "defined" : "not detected"}.`
            )
        )
    };

    // 3. Parameters and arguments
    const correctParameterCounts = {
        calculate_total: 3,
        calculate_average: 1,
        get_target_message: 1,
        main: 0
    };
    const parameterCorrect = names.filter(
        (name) => definitions[name]?.parameterCount === correctParameterCounts[name]
    ).length;
    const callSites = staticData.functionCallSites || [];
    const requiredCalls = ["calculate_total", "calculate_average", "get_target_message"];
    const mainCalls = requiredCalls.filter((name) =>
        callSites.some((site) => site.caller === "main" && site.callee === name)
    );
    const parameterScore =
        parameterCorrect === 4 && mainCalls.length === 3 ? 4
            : parameterCorrect >= 3 && mainCalls.length >= 2 ? 3
                : parameterCorrect >= 2 || mainCalls.length >= 2 ? 2
                    : parameterCorrect >= 1 || mainCalls.length >= 1 ? 1 : 0;
    criteria.parameters = {
        suggested: parameterScore,
        evidence: [
            ...names.map((name) =>
                helpers.evidence(
                    definitions[name]?.parameterCount === correctParameterCounts[name]
                        ? "pass"
                        : definitions[name] ? "warn" : "fail",
                    `${name}() has ${definitions[name]?.parameterCount ?? 0} parameter${definitions[name]?.parameterCount === 1 ? "" : "s"}; ${correctParameterCounts[name]} required.`
                )
            ),
            helpers.evidence(
                mainCalls.length === 3 ? "pass" : mainCalls.length ? "warn" : "fail",
                `main() calls ${mainCalls.length} of the 3 calculation/message functions.`
            )
        ]
    };

    // 4. Return values and calculations
    let directCorrect = 0;
    let directPossible = 0;
    for (let index = 0; index < tests.length; index += 1) {
        const expected = assignment.testCases[index].expected;
        const totalResult = functionResult(tests[index], "calculate_total");
        const averageResult = functionResult(tests[index], "calculate_average");
        const messageResult = functionResult(tests[index], "get_target_message");
        directPossible += 3;
        if (numericFunctionCorrect(totalResult, expected.total)) directCorrect += 1;
        if (numericFunctionCorrect(averageResult, expected.average)) directCorrect += 1;
        if (textFunctionCorrect(messageResult, expected.message)) directCorrect += 1;
    }
    const returnDefinitions = requiredCalls.filter(
        (name) => definitions[name]?.hasReturn
    ).length;
    const returnScore =
        returnDefinitions === 3 && directCorrect === directPossible ? 4
            : returnDefinitions === 3 && directCorrect >= directPossible - 2 ? 3
                : returnDefinitions >= 1 && directCorrect >= 3 ? 2
                    : returnDefinitions >= 1 || directCorrect >= 1 ? 1 : 0;
    criteria.returns = {
        suggested: returnScore,
        evidence: [
            helpers.evidence(
                returnDefinitions === 3 ? "pass" : returnDefinitions ? "warn" : "fail",
                `${returnDefinitions} of 3 result functions contain a value-returning return statement.`
            ),
            helpers.evidence(
                directCorrect === directPossible ? "pass" : directCorrect ? "warn" : "fail",
                `${directCorrect} of ${directPossible} direct function checks returned the expected value.`
            ),
            helpers.evidence(
                (staticData.binaryOperators || []).includes("+") ? "pass" : "warn",
                "Addition is used for the total calculation."
            ),
            helpers.evidence(
                (staticData.binaryOperators || []).includes("/") ? "pass" : "warn",
                "Division is used for the average calculation."
            )
        ]
    };

    // 5. main(), input and function calls
    const inputCalls = staticData.inputCalls || 0;
    const promptedInputs = staticData.promptedInputs || 0;
    const floatCalls = staticData.castCalls?.float || 0;
    const mainDefined = Boolean(definitions.main);
    const mainCalled = callSites.some(
        (site) => site.caller === "<module>" && site.callee === "main"
    );
    const inputUsed = successful.length
        ? Math.min(...successful.map((test) => test.inputsUsed?.length || 0))
        : 0;
    const mainScore =
        mainDefined && mainCalled && inputCalls >= 4 && promptedInputs >= 4
        && floatCalls >= 3 && mainCalls.length === 3 && inputUsed >= 4 ? 4
            : mainDefined && inputCalls >= 4 && floatCalls >= 3 && mainCalls.length >= 2 ? 3
                : mainDefined && inputCalls >= 2 && mainCalls.length >= 1 ? 2
                    : mainDefined || inputCalls || mainCalls.length ? 1 : 0;
    criteria.mainInput = {
        suggested: mainScore,
        evidence: [
            helpers.evidence(
                mainDefined ? "pass" : "fail",
                `main() ${mainDefined ? "defined" : "not detected"}.`
            ),
            helpers.evidence(
                mainCalled ? "pass" : "fail",
                `main() ${mainCalled ? "called at module level" : "was not clearly called at the end of the program"}.`
            ),
            helpers.evidence(
                inputCalls >= 4 ? "pass" : inputCalls ? "warn" : "fail",
                `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected; four are required.`
            ),
            helpers.evidence(
                floatCalls >= 3 ? "pass" : floatCalls ? "warn" : "fail",
                `${floatCalls} float() call${floatCalls === 1 ? "" : "s"} detected; three are required.`
            ),
            helpers.evidence(
                mainCalls.length === 3 ? "pass" : mainCalls.length ? "warn" : "fail",
                `main() calls ${mainCalls.length} of the 3 required helper functions.`
            )
        ]
    };

    // 6. Output and code quality
    const allLabels = successful.length === assignment.testCases.length
        && successful.every((test) => Object.values(test.labels).every(Boolean));
    const allRounded = successful.length === assignment.testCases.length
        && successful.every((test) => test.matches.average);
    const meaningfulCount = staticData.meaningfulNames?.length || 0;
    const printCalls = staticData.printCalls || 0;
    const outputScore =
        fullyCorrect === assignment.testCases.length && allLabels && allRounded
        && meaningfulCount >= 6 ? 4
            : fullyCorrect >= 2 && meaningfulCount >= 4 ? 3
                : successful.some((test) => helpers.countTrue(test.matches) >= 2)
                    || printCalls >= 3 ? 2
                    : printCalls ? 1 : 0;
    criteria.output = {
        suggested: outputScore,
        evidence: [
            helpers.evidence(
                fullyCorrect === assignment.testCases.length
                    ? "pass"
                    : fullyCorrect ? "warn" : "fail",
                `${fullyCorrect} of ${assignment.testCases.length} tests displayed all required values and the correct message.`
            ),
            helpers.evidence(
                allLabels ? "pass" : "warn",
                allLabels
                    ? "Every test used clear summary labels."
                    : "One or more clear summary labels were missing."
            ),
            helpers.evidence(
                allRounded ? "pass" : "warn",
                allRounded
                    ? "The displayed average matched the required one-decimal result."
                    : "The average was missing or not rounded as expected in one or more tests."
            ),
            helpers.evidence(
                meaningfulCount >= 6 ? "pass" : meaningfulCount ? "warn" : "fail",
                `${meaningfulCount} variable name${meaningfulCount === 1 ? " appears" : "s appear"} meaningful by the automatic check.`
            ),
            helpers.evidence(
                "warn",
                "Teacher check: confirm consistent indentation, organisation and readability."
            )
        ]
    };

    if (definitionCount < 4) {
        reviewFlags.push("One or more required function definitions were not detected.");
    }
    if (returnDefinitions < 3) {
        reviewFlags.push("One or more result functions may print instead of returning a value.");
    }
    if (!mainCalled) {
        reviewFlags.push("main() was not clearly called at the end of the program.");
    }
    if (fullyCorrect && directCorrect < directPossible) {
        reviewFlags.push(
            "The printed output was stronger than the direct function results; check for hard-coded or non-reusable calculations."
        );
    }
    const firstStrong = tests[0]?.ok
        && Object.values(tests[0].matches).every(Boolean);
    const changedStrong = tests.slice(1).filter(
        (test) => test.ok && Object.values(test.matches).every(Boolean)
    ).length;
    if (firstStrong && changedStrong === 0) {
        reviewFlags.push(
            "Possible hard-coded example output: changed-value tests did not reproduce the first result."
        );
        criteria.operation.suggested = Math.min(criteria.operation.suggested, 2);
        criteria.returns.suggested = Math.min(criteria.returns.suggested, 2);
        criteria.output.suggested = Math.min(criteria.output.suggested, 2);
    }

    return helpers.finishAssessment(
        assignment, raw, criteria, reviewFlags
    );
}


export default { ...assignment, assess };
