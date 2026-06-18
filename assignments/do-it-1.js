const assignment = {
    "id": "learner-profile",
    "shortName": "Do It 1",
    "title": "Do It 1: Learner Profile Program",
    "reportTitle": "Learner Profile Program",
    "expectedFileName": "learner_profile.py",
    "slug": "learner-profile",
    "summary": "Checks variables, data types, input, casting and the learner profile output.",
    "maxScore": 24,
    "rubric": [
        {
            "id": "operation",
            "title": "1. Program operation",
            "shortTitle": "Program operation",
            "summary": "Runs, accepts the required data and completes the task.",
            "levels": {
                "0": "No executable program, or fundamental errors prevent it from beginning.",
                "1": "A limited executable attempt is present, but substantial errors prevent completion.",
                "2": "Runs partially, but a significant feature is missing or an error prevents full completion.",
                "3": "Runs to completion with one minor issue or omission.",
                "4": "Runs from beginning to end and completes all required functionality."
            }
        },
        {
            "id": "variables",
            "title": "2. Variables",
            "shortTitle": "Variables",
            "summary": "Stores the required values using clear variable names.",
            "levels": {
                "0": "No meaningful evidence of variables.",
                "1": "Very limited use of variables is demonstrated.",
                "2": "Some appropriate variables are used, but several values or names are unsuitable.",
                "3": "All or nearly all required values use variables, with one minor naming or usage issue.",
                "4": "All required values use appropriate, meaningful and consistent variables."
            }
        },
        {
            "id": "types",
            "title": "3. Data types",
            "shortTitle": "Data types",
            "summary": "Uses string, integer, float and Boolean data correctly.",
            "levels": {
                "0": "No meaningful evidence of the required data types.",
                "1": "Only one required data type is demonstrated correctly.",
                "2": "Two required data types are used correctly.",
                "3": "Three required data types are used correctly, with at most one minor issue.",
                "4": "String, integer, float and Boolean values are all used correctly."
            }
        },
        {
            "id": "input",
            "title": "4. User input",
            "shortTitle": "User input",
            "summary": "Collects four answers using clear input prompts.",
            "levels": {
                "0": "No meaningful evidence of user input.",
                "1": "One item is collected, or several incomplete input attempts are present.",
                "2": "Two requested items are collected correctly.",
                "3": "At least three items are collected correctly, or there is one minor prompt/storage issue.",
                "4": "All four items are collected using clear prompts and stored appropriately."
            }
        },
        {
            "id": "casting",
            "title": "5. Casting",
            "shortTitle": "Casting",
            "summary": "Converts age with int() and study hours with float().",
            "levels": {
                "0": "No meaningful evidence of casting.",
                "1": "Casting is attempted but does not work correctly.",
                "2": "One required cast works correctly.",
                "3": "Both casts are present, with one minor storage, use or display issue.",
                "4": "Both required casts work and the converted values are stored and used correctly."
            }
        },
        {
            "id": "output",
            "title": "6. Output and code quality",
            "shortTitle": "Output and code quality",
            "summary": "Displays a clear profile and uses readable, logically ordered code.",
            "levels": {
                "0": "No meaningful output is produced.",
                "1": "Very limited or confusing output is produced.",
                "2": "Some required information is shown, but parts are missing, unclear or difficult to follow.",
                "3": "Nearly all information is clear, with one minor formatting, labelling or readability issue.",
                "4": "Clear heading and labels show all required values; code is readable and organised."
            }
        }
    ],
    "testCases": [
        {
            "label": "Test 1 — assignment example",
            "input": {
                "mode": "prompt-map",
                "valuesByKey": {
                    "name": "Sam Taylor",
                    "course": "Computer Science",
                    "age": "17",
                    "hours": "6.5"
                },
                "fallbackOrder": [
                    "name",
                    "course",
                    "age",
                    "hours"
                ],
                "aliases": [
                    {
                        "key": "course",
                        "terms": [
                            "course",
                            "subject",
                            "programme",
                            "program"
                        ]
                    },
                    {
                        "key": "hours",
                        "terms": [
                            "hour",
                            "study",
                            "weekly"
                        ]
                    },
                    {
                        "key": "age",
                        "terms": [
                            "age",
                            "old"
                        ]
                    },
                    {
                        "key": "name",
                        "terms": [
                            "name"
                        ]
                    }
                ]
            },
            "expected": {
                "name": "Sam Taylor",
                "course": "Computer Science",
                "age": "17",
                "hours": "6.5"
            }
        },
        {
            "label": "Test 2 — changed values",
            "input": {
                "mode": "prompt-map",
                "valuesByKey": {
                    "name": "Morgan Evans",
                    "course": "Cyber Security",
                    "age": "22",
                    "hours": "3.75"
                },
                "fallbackOrder": [
                    "name",
                    "course",
                    "age",
                    "hours"
                ],
                "aliases": [
                    {
                        "key": "course",
                        "terms": [
                            "course",
                            "subject",
                            "programme",
                            "program"
                        ]
                    },
                    {
                        "key": "hours",
                        "terms": [
                            "hour",
                            "study",
                            "weekly"
                        ]
                    },
                    {
                        "key": "age",
                        "terms": [
                            "age",
                            "old"
                        ]
                    },
                    {
                        "key": "name",
                        "terms": [
                            "name"
                        ]
                    }
                ]
            },
            "expected": {
                "name": "Morgan Evans",
                "course": "Cyber Security",
                "age": "22",
                "hours": "3.75"
            }
        }
    ],
    "number": 1,
    "enabled": true
};
const testCases = assignment.testCases;

function assess(raw, helpers, source, assignment) {
    const { evidence, countTrue, successfulTests, runtimeTypeSet, addGeneralReviewFlags, finishAssessment } = helpers;
    const testCases = assignment.testCases;

    raw.tests = (raw.tests || []).map((test, index) => {
        const expected = testCases[index]?.expected || {};
        const output = test.output || "";
        const lower = output.toLowerCase();
        return {
            ...test,
            matches: {
                name: helpers.includesText(output, expected.name),
                course: helpers.includesText(output, expected.course),
                age: helpers.hasNumber(output, expected.age),
                hours: helpers.hasNumber(output, expected.hours),
                enrolled: lower.includes("true")
            },
            labels: {
                name: lower.includes("name"),
                course: lower.includes("course"),
                age: lower.includes("age"),
                hours: lower.includes("hour") || lower.includes("study"),
                enrolled: lower.includes("enrol") || lower.includes("enroll")
            },
            heading: lower.includes("learner profile")
                || lower.includes("student profile")
                || (lower.includes("profile") && output.split("\\n").length >= 3)
        };
    });



    const tests = raw.tests || [];
    const successful = successfulTests(raw);
    const successCount = successful.length;
    const staticData = raw.static || {};
    const runtimeTypes = runtimeTypeSet(successful);
    const reviewFlags = [];
    const criteria = {};

    addGeneralReviewFlags(raw, reviewFlags);

    const minimumMatches = successful.length
        ? Math.min(...successful.map((test) => countTrue(test.matches)))
        : 0;

    // 1. Program operation
    let operationScore = 0;
    const operationEvidence = [];
    if (!raw.syntax?.ok) {
        operationEvidence.push(evidence("fail", `Syntax error: ${raw.syntax?.error || "Python could not parse the file."}`));
    } else if (raw.policy && !raw.policy.safe) {
        operationScore = 1;
        operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
        operationEvidence.push(evidence("warn", "Automatic execution was skipped because unsupported or suspicious code was detected."));
    } else if (raw.timedOut) {
        operationScore = 1;
        operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
        operationEvidence.push(evidence("fail", "The program did not finish within the time limit."));
    } else if (successCount === assignment.testCases.length && minimumMatches === 5 && staticData.inputCalls >= 4) {
        operationScore = 4;
        operationEvidence.push(evidence("pass", "The program completed both test runs without an error."));
        operationEvidence.push(evidence("pass", "Both tests displayed all required learner values and the Boolean value."));
    } else if (successCount === assignment.testCases.length && minimumMatches >= 4) {
        operationScore = 3;
        operationEvidence.push(evidence("pass", "The program completed both test runs."));
        operationEvidence.push(evidence("warn", "One required item was missing or unclear in at least one test output."));
    } else if (successCount >= 1) {
        operationScore = 2;
        operationEvidence.push(evidence("pass", `${successCount} of ${assignment.testCases.length} test runs completed.`));
        operationEvidence.push(evidence("fail", "The program did not complete every test successfully."));
    } else if (raw.syntax?.ok) {
        operationScore = 1;
        operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
        const firstError = tests.find((test) => !test.ok)?.error;
        operationEvidence.push(evidence("fail", firstError ? `Runtime error: ${firstError}` : "The program could not complete a test run."));
    }
    criteria.operation = { suggested: operationScore, evidence: operationEvidence };

    // 2. Variables
    const assignedCount = staticData.assignedNames?.length || 0;
    const meaningfulCount = staticData.meaningfulNames?.length || 0;
    let variableScore = 0;
    if (assignedCount >= 5 && meaningfulCount >= 4) variableScore = 4;
    else if (assignedCount >= 4 && meaningfulCount >= 3) variableScore = 3;
    else if (assignedCount >= 2) variableScore = 2;
    else if (assignedCount >= 1) variableScore = 1;

    const variableEvidence = [
        evidence(assignedCount >= 5 ? "pass" : assignedCount > 0 ? "warn" : "fail", `${assignedCount} distinct assigned variable${assignedCount === 1 ? "" : "s"} detected.`)
    ];
    if (assignedCount) {
        variableEvidence.push(evidence(meaningfulCount >= 4 ? "pass" : "warn", `${meaningfulCount} variable name${meaningfulCount === 1 ? " appears" : "s appear"} meaningful by the automatic naming check.`));
        variableEvidence.push(evidence("warn", "Teacher check: confirm that names are genuinely clear and that each required value is stored appropriately."));
    }
    criteria.variables = { suggested: variableScore, evidence: variableEvidence };

    // 3. Data types
    const detectedTypes = {
        string: Boolean(staticData.typeEvidence?.string || runtimeTypes.has("str")),
        integer: Boolean(staticData.typeEvidence?.integer || runtimeTypes.has("int")),
        float: Boolean(staticData.typeEvidence?.float || runtimeTypes.has("float")),
        Boolean: Boolean(staticData.typeEvidence?.boolean || runtimeTypes.has("bool"))
    };
    const typeScore = countTrue(detectedTypes);
    criteria.types = {
        suggested: typeScore,
        evidence: Object.entries(detectedTypes).map(([name, present]) =>
            evidence(present ? "pass" : "fail", `${name[0].toUpperCase()}${name.slice(1)} data ${present ? "detected" : "not clearly demonstrated"}.`)
        )
    };

    // 4. User input
    const inputCalls = staticData.inputCalls || 0;
    const promptedInputs = staticData.promptedInputs || 0;
    const minimumConsumed = successful.length
        ? Math.min(...successful.map((test) => test.inputsUsed?.length || 0))
        : 0;
    let inputScore = 0;
    if (inputCalls >= 4 && promptedInputs >= 4 && minimumConsumed >= 4) inputScore = 4;
    else if (inputCalls >= 3 || (inputCalls >= 4 && promptedInputs < 4)) inputScore = 3;
    else if (inputCalls === 2) inputScore = 2;
    else if (inputCalls === 1) inputScore = 1;

    const inputEvidence = [
        evidence(inputCalls >= 4 ? "pass" : inputCalls > 0 ? "warn" : "fail", `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected.`),
        evidence(promptedInputs >= 4 ? "pass" : promptedInputs > 0 ? "warn" : "fail", `${promptedInputs} input call${promptedInputs === 1 ? " has" : "s have"} a visible prompt.`)
    ];
    if (successful.length) {
        inputEvidence.push(evidence(minimumConsumed >= 4 ? "pass" : "warn", `The completed tests consumed at least ${minimumConsumed} supplied answer${minimumConsumed === 1 ? "" : "s"}.`));
    }
    criteria.input = { suggested: inputScore, evidence: inputEvidence };

    // 5. Casting
    const intCalls = staticData.castCalls?.int || 0;
    const floatCalls = staticData.castCalls?.float || 0;
    const runtimeInt = runtimeTypes.has("int");
    const runtimeFloat = runtimeTypes.has("float");
    let castingScore = 0;
    if (intCalls >= 1 && floatCalls >= 1 && runtimeInt && runtimeFloat && successCount === assignment.testCases.length) castingScore = 4;
    else if (intCalls >= 1 && floatCalls >= 1) castingScore = 3;
    else if ((intCalls >= 1 && runtimeInt) || (floatCalls >= 1 && runtimeFloat)) castingScore = 2;
    else if (intCalls >= 1 || floatCalls >= 1) castingScore = 1;

    const castingEvidence = [
        evidence(intCalls >= 1 ? "pass" : "fail", `int() ${intCalls >= 1 ? "detected" : "not detected"}.`),
        evidence(floatCalls >= 1 ? "pass" : "fail", `float() ${floatCalls >= 1 ? "detected" : "not detected"}.`)
    ];
    if (successful.length) {
        castingEvidence.push(evidence(runtimeInt ? "pass" : "warn", `An integer variable was ${runtimeInt ? "present" : "not found"} after execution.`));
        castingEvidence.push(evidence(runtimeFloat ? "pass" : "warn", `A float variable was ${runtimeFloat ? "present" : "not found"} after execution.`));
    }
    criteria.casting = { suggested: castingScore, evidence: castingEvidence };

    // 6. Output and code quality
    const minimumLabels = successful.length
        ? Math.min(...successful.map((test) => countTrue(test.labels)))
        : 0;
    const allHeadings = successful.length === assignment.testCases.length && successful.every((test) => test.heading);
    const printCalls = staticData.printCalls || 0;
    let outputScore = 0;
    if (successCount === assignment.testCases.length && minimumMatches === 5 && minimumLabels >= 4 && allHeadings && meaningfulCount >= 4) outputScore = 4;
    else if (successCount === assignment.testCases.length && minimumMatches >= 4 && minimumLabels >= 3) outputScore = 3;
    else if (successful.some((test) => countTrue(test.matches) >= 2) || printCalls >= 2) outputScore = 2;
    else if (printCalls >= 1 || successful.some((test) => (test.output || "").trim())) outputScore = 1;

    criteria.output = {
        suggested: outputScore,
        evidence: [
            evidence(allHeadings ? "pass" : "warn", allHeadings ? "A learner/student profile heading appeared in both tests." : "A clear profile heading was not detected in every completed test."),
            evidence(minimumLabels >= 4 ? "pass" : minimumLabels > 0 ? "warn" : "fail", `At least ${minimumLabels} clear output label${minimumLabels === 1 ? " was" : "s were"} detected across completed tests.`),
            evidence(minimumMatches === 5 ? "pass" : minimumMatches > 0 ? "warn" : "fail", `At least ${minimumMatches} of 5 required values appeared in every completed test.`),
            evidence(printCalls >= 5 ? "pass" : printCalls > 0 ? "warn" : "fail", `${printCalls} print() call${printCalls === 1 ? "" : "s"} detected.`),
            evidence("warn", "Teacher check: review layout, logical order and readability before confirming this score.")
        ]
    };

    if (tests.length >= 2 && tests[0]?.ok && tests[1]?.ok) {
        const firstMatches = countTrue(tests[0].matches);
        const secondMatches = countTrue(tests[1].matches);
        if (firstMatches >= 4 && secondMatches <= 2) {
            reviewFlags.push("Possible hard-coded example output: the first test matched substantially better than the changed-values test.");
            criteria.operation.suggested = Math.min(criteria.operation.suggested, 2);
            criteria.output.suggested = Math.min(criteria.output.suggested, 2);
            criteria.operation.evidence.push(evidence("warn", "The changed-values test did not reproduce the strong result from the assignment example."));
            criteria.output.evidence.push(evidence("warn", "Output may contain fixed example values rather than the user's answers."));
        }
    }

    return finishAssessment(assignment, raw, criteria, reviewFlags);

}

export default { ...assignment, assess };
