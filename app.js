"use strict";

// Rubric definitions and scoring logic are bundled here to avoid module-cache mismatches.
const ASSIGNMENTS = {
    "learner-profile": {
        id: "learner-profile",
        shortName: "Do It 1",
        title: "Do It 1: Learner Profile Program",
        reportTitle: "Learner Profile Program",
        expectedFileName: "learner_profile.py",
        slug: "learner-profile",
        summary: "Checks variables, data types, input, casting and the learner profile output.",
        maxScore: 24,
        testCases: [
            {
                label: "Test 1 — assignment example",
                values: {
                    name: "Sam Taylor",
                    course: "Computer Science",
                    age: "17",
                    hours: "6.5"
                }
            },
            {
                label: "Test 2 — changed values",
                values: {
                    name: "Morgan Evans",
                    course: "Cyber Security",
                    age: "22",
                    hours: "3.75"
                }
            }
        ],
        rubric: [
            {
                id: "operation",
                title: "1. Program operation",
                shortTitle: "Program operation",
                summary: "Runs, accepts the required data and completes the task.",
                levels: {
                    4: "Runs from beginning to end and completes all required functionality.",
                    3: "Runs to completion with one minor issue or omission.",
                    2: "Runs partially, but a significant feature is missing or an error prevents full completion.",
                    1: "A limited executable attempt is present, but substantial errors prevent completion.",
                    0: "No executable program, or fundamental errors prevent it from beginning."
                }
            },
            {
                id: "variables",
                title: "2. Variables",
                shortTitle: "Variables",
                summary: "Stores the required values using clear variable names.",
                levels: {
                    4: "All required values use appropriate, meaningful and consistent variables.",
                    3: "All or nearly all required values use variables, with one minor naming or usage issue.",
                    2: "Some appropriate variables are used, but several values or names are unsuitable.",
                    1: "Very limited use of variables is demonstrated.",
                    0: "No meaningful evidence of variables."
                }
            },
            {
                id: "types",
                title: "3. Data types",
                shortTitle: "Data types",
                summary: "Uses string, integer, float and Boolean data correctly.",
                levels: {
                    4: "String, integer, float and Boolean values are all used correctly.",
                    3: "Three required data types are used correctly, with at most one minor issue.",
                    2: "Two required data types are used correctly.",
                    1: "Only one required data type is demonstrated correctly.",
                    0: "No meaningful evidence of the required data types."
                }
            },
            {
                id: "input",
                title: "4. User input",
                shortTitle: "User input",
                summary: "Collects four answers using clear input prompts.",
                levels: {
                    4: "All four items are collected using clear prompts and stored appropriately.",
                    3: "At least three items are collected correctly, or there is one minor prompt/storage issue.",
                    2: "Two requested items are collected correctly.",
                    1: "One item is collected, or several incomplete input attempts are present.",
                    0: "No meaningful evidence of user input."
                }
            },
            {
                id: "casting",
                title: "5. Casting",
                shortTitle: "Casting",
                summary: "Converts age with int() and study hours with float().",
                levels: {
                    4: "Both required casts work and the converted values are stored and used correctly.",
                    3: "Both casts are present, with one minor storage, use or display issue.",
                    2: "One required cast works correctly.",
                    1: "Casting is attempted but does not work correctly.",
                    0: "No meaningful evidence of casting."
                }
            },
            {
                id: "output",
                title: "6. Output and code quality",
                shortTitle: "Output and code quality",
                summary: "Displays a clear profile and uses readable, logically ordered code.",
                levels: {
                    4: "Clear heading and labels show all required values; code is readable and organised.",
                    3: "Nearly all information is clear, with one minor formatting, labelling or readability issue.",
                    2: "Some required information is shown, but parts are missing, unclear or difficult to follow.",
                    1: "Very limited or confusing output is produced.",
                    0: "No meaningful output is produced."
                }
            }
        ]
    },

    "cinema-ticket": {
        id: "cinema-ticket",
        shortName: "Do It 2",
        title: "Do It 2: Cinema Ticket Program",
        reportTitle: "Cinema Ticket Program",
        expectedFileName: "cinema_ticket.py",
        slug: "cinema-ticket",
        summary: "Checks input, integer casting, comparisons, if/elif/else and correct boundary decisions.",
        maxScore: 24,
        testCases: [
            {
                label: "Boundary test — age 11",
                values: { name: "Amina Lewis", age: "11" },
                expected: { ticketType: "Child", price: "5" }
            },
            {
                label: "Boundary test — age 12",
                values: { name: "Rhys Morgan", age: "12" },
                expected: { ticketType: "Teen", price: "7" }
            },
            {
                label: "Boundary test — age 17",
                values: { name: "Morgan Evans", age: "17" },
                expected: { ticketType: "Teen", price: "7" }
            },
            {
                label: "Boundary test — age 18",
                values: { name: "Taylor Jones", age: "18" },
                expected: { ticketType: "Adult", price: "10" }
            }
        ],
        rubric: [
            {
                id: "operation",
                title: "1. Program operation",
                shortTitle: "Program operation",
                summary: "Runs without errors and completes the ticket task.",
                levels: {
                    4: "The program runs without errors and works correctly for all tested ages, including boundary values.",
                    3: "The program runs and mostly works, with only a minor error or small omission.",
                    2: "The program partly works but fails for one or more ticket categories.",
                    1: "A program has been attempted, but major syntax or runtime errors prevent normal operation.",
                    0: "No meaningful working program has been submitted."
                }
            },
            {
                id: "inputCasting",
                title: "2. User input and casting",
                shortTitle: "User input and casting",
                summary: "Collects name and age, then converts age with int().",
                levels: {
                    4: "The program correctly asks for both name and age, stores both answers, and casts age using int().",
                    3: "Both inputs are collected and age is cast, but there is a small issue with prompts or variable use.",
                    2: "Input is used, but one required input or the age casting is missing or incorrect.",
                    1: "Very limited or incorrect use of input().",
                    0: "No user input is used."
                }
            },
            {
                id: "conditions",
                title: "3. Conditions and comparison operators",
                shortTitle: "Conditions and comparisons",
                summary: "Uses suitable comparisons to separate the three age ranges.",
                levels: {
                    4: "Conditions and comparison operators are accurate and correctly handle under 12, 12–17, and 18 or over.",
                    3: "Conditions are mostly correct, with one minor boundary or comparison error.",
                    2: "Some valid comparisons are present, but the age ranges are incomplete or partly incorrect.",
                    1: "Conditions have been attempted but do not meaningfully control the program.",
                    0: "No conditions or comparison operators are used."
                }
            },
            {
                id: "selection",
                title: "4. Use of if, elif and else",
                shortTitle: "if, elif and else",
                summary: "Uses a complete, correctly indented three-way selection structure.",
                levels: {
                    4: "if, elif and else are all used correctly, with correct colons and indentation.",
                    3: "The selection structure is mostly correct, with a minor structural or indentation issue.",
                    2: "Selection is present but one required branch is missing or incorrectly structured.",
                    1: "A limited if statement has been attempted but the full selection structure is not working.",
                    0: "No selection structure is used."
                }
            },
            {
                id: "decision",
                title: "5. Correct decision-making",
                shortTitle: "Correct decision-making",
                summary: "Produces the correct ticket and price for all age boundaries.",
                levels: {
                    4: "Every tested age produces the correct ticket type and price, including ages 11, 12, 17 and 18.",
                    3: "Most ages produce the correct result, with one minor category or price error.",
                    2: "Only some ticket categories and prices are correct.",
                    1: "Output is mostly fixed, hard-coded or unrelated to the selected age.",
                    0: "The program does not produce a meaningful ticket decision."
                }
            },
            {
                id: "output",
                title: "6. Output and code quality",
                shortTitle: "Output and code quality",
                summary: "Displays a clear summary and uses readable, meaningful code.",
                levels: {
                    4: "Output is clear and complete; meaningful variables, consistent indentation and readable code are used.",
                    3: "Output and code are clear overall, with only a minor presentation or naming issue.",
                    2: "Output is understandable but incomplete, or variable names and formatting need improvement.",
                    1: "Output is unclear and the code is difficult to follow.",
                    0: "No meaningful output is produced."
                }
            }
        ]
    }
};

const DEFAULT_ASSIGNMENT_ID = "learner-profile";

function getAssignment(assignmentId = DEFAULT_ASSIGNMENT_ID) {
    return ASSIGNMENTS[assignmentId] || ASSIGNMENTS[DEFAULT_ASSIGNMENT_ID];
}

function evidence(status, text) {
    return { status, text };
}

function countTrue(object) {
    return Object.values(object || {}).filter(Boolean).length;
}

function successfulTests(raw) {
    return (raw.tests || []).filter((test) => test.ok);
}

function runtimeTypeSet(tests) {
    const set = new Set();
    for (const test of tests) {
        for (const variable of test.variables || []) set.add(variable.type);
    }
    return set;
}

function determineStatus(raw, reviewFlags) {
    if (raw.timedOut || !raw.syntax?.ok || raw.workerError) return "error";
    if (reviewFlags.length) return "review";
    return "complete";
}

function addGeneralReviewFlags(raw, reviewFlags) {
    if (raw.workerError) reviewFlags.push(`Marker error: ${raw.workerError}`);
    if (raw.timedOut) {
        reviewFlags.push("The program exceeded the execution time limit. Check for an infinite loop or a prompt that could not be supplied automatically.");
    }
    if (raw.policy?.issues?.length) {
        reviewFlags.push(`The marker did not execute potentially unsafe or unsupported code: ${raw.policy.issues.join("; ")}`);
    }
    const failedTests = (raw.tests || []).filter((test) => !test.ok);
    if (failedTests.length) {
        const firstError = failedTests.find((test) => test.error)?.error;
        reviewFlags.push(`${failedTests.length} automated test run${failedTests.length === 1 ? " did" : "s did"} not complete${firstError ? `; first error: ${firstError}` : "."}`);
    }
}

function assessLearnerProfile(raw) {
    const assignment = getAssignment("learner-profile");
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

function assessCinemaTicket(raw) {
    const assignment = getAssignment("cinema-ticket");
    const tests = raw.tests || [];
    const successful = successfulTests(raw);
    const successCount = successful.length;
    const staticData = raw.static || {};
    const runtimeTypes = runtimeTypeSet(successful);
    const reviewFlags = [];
    const criteria = {};

    addGeneralReviewFlags(raw, reviewFlags);

    const completedCorrect = tests.filter((test) =>
        test.ok && test.matches?.ticketType && test.matches?.price
    ).length;

    const fullyMatched = tests.filter((test) =>
        test.ok && test.matches?.name && test.matches?.ticketType && test.matches?.price
    ).length;

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
    } else if (successCount === assignment.testCases.length && completedCorrect === assignment.testCases.length) {
        operationScore = 4;
        operationEvidence.push(evidence("pass", "All four boundary tests completed without an error."));
        operationEvidence.push(evidence("pass", "Every test produced the expected ticket type and price."));
    } else if (successCount === assignment.testCases.length && completedCorrect >= 3) {
        operationScore = 3;
        operationEvidence.push(evidence("pass", "All four test runs completed."));
        operationEvidence.push(evidence("warn", "One boundary produced an incorrect or unclear result."));
    } else if (successCount >= 2) {
        operationScore = 2;
        operationEvidence.push(evidence("warn", `${successCount} of ${assignment.testCases.length} test runs completed.`));
        operationEvidence.push(evidence("fail", "The program did not complete or solve every boundary test."));
    } else if (raw.syntax?.ok) {
        operationScore = 1;
        operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
        const firstError = tests.find((test) => !test.ok)?.error;
        operationEvidence.push(evidence("fail", firstError ? `Runtime error: ${firstError}` : "The program could not complete the required tests."));
    }
    criteria.operation = { suggested: operationScore, evidence: operationEvidence };

    // 2. User input and casting
    const inputCalls = staticData.inputCalls || 0;
    const promptedInputs = staticData.promptedInputs || 0;
    const intCalls = staticData.castCalls?.int || 0;
    const minimumConsumed = successful.length
        ? Math.min(...successful.map((test) => test.inputsUsed?.length || 0))
        : 0;
    const runtimeInt = runtimeTypes.has("int");
    let inputCastingScore = 0;
    if (inputCalls >= 2 && promptedInputs >= 2 && intCalls >= 1 && runtimeInt && minimumConsumed >= 2) inputCastingScore = 4;
    else if (inputCalls >= 2 && intCalls >= 1) inputCastingScore = 3;
    else if (inputCalls >= 1 && (intCalls >= 1 || runtimeInt)) inputCastingScore = 2;
    else if (inputCalls >= 1 || intCalls >= 1) inputCastingScore = 1;

    criteria.inputCasting = {
        suggested: inputCastingScore,
        evidence: [
            evidence(inputCalls >= 2 ? "pass" : inputCalls > 0 ? "warn" : "fail", `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected; two are required.`),
            evidence(promptedInputs >= 2 ? "pass" : promptedInputs > 0 ? "warn" : "fail", `${promptedInputs} input call${promptedInputs === 1 ? " has" : "s have"} a visible prompt.`),
            evidence(intCalls >= 1 ? "pass" : "fail", `int() ${intCalls >= 1 ? "detected" : "not detected"} for age conversion.`),
            evidence(runtimeInt ? "pass" : successful.length ? "warn" : "fail", runtimeInt ? "An integer value was present after execution." : "An integer age was not clearly found after execution.")
        ]
    };

    // 3. Conditions and comparison operators
    const comparisonCount = staticData.comparisonCount || 0;
    const operators = staticData.comparisonOperators || [];
    let conditionsScore = 0;
    if (comparisonCount >= 2 && completedCorrect === assignment.testCases.length) conditionsScore = 4;
    else if (comparisonCount >= 2 && completedCorrect >= 3) conditionsScore = 3;
    else if (comparisonCount >= 1 || completedCorrect >= 2) conditionsScore = 2;
    else if ((staticData.ifCount || 0) >= 1) conditionsScore = 1;

    criteria.conditions = {
        suggested: conditionsScore,
        evidence: [
            evidence(comparisonCount >= 2 ? "pass" : comparisonCount > 0 ? "warn" : "fail", `${comparisonCount} comparison${comparisonCount === 1 ? "" : "s"} detected; two age boundaries normally require at least two.`),
            evidence(operators.length ? "pass" : "fail", operators.length ? `Comparison operator${operators.length === 1 ? "" : "s"} detected: ${operators.join(", ")}.` : "No comparison operator was detected."),
            evidence(completedCorrect === assignment.testCases.length ? "pass" : completedCorrect > 0 ? "warn" : "fail", `${completedCorrect} of ${assignment.testCases.length} boundary tests produced the correct ticket and price.`)
        ]
    };

    // 4. if, elif and else
    const ifCount = staticData.ifCount || 0;
    const elifCount = staticData.elifCount || 0;
    const elseCount = staticData.elseCount || 0;
    let selectionScore = 0;
    if (ifCount >= 1 && elifCount >= 1 && elseCount >= 1 && raw.syntax?.ok) selectionScore = 4;
    else if (ifCount >= 1 && elseCount >= 1 && comparisonCount >= 2) selectionScore = 3;
    else if (ifCount >= 1 && (elifCount >= 1 || elseCount >= 1)) selectionScore = 2;
    else if (ifCount >= 1) selectionScore = 1;

    criteria.selection = {
        suggested: selectionScore,
        evidence: [
            evidence(ifCount >= 1 ? "pass" : "fail", `if branch${ifCount === 1 ? "" : "es"} detected: ${ifCount}.`),
            evidence(elifCount >= 1 ? "pass" : "fail", `elif branch${elifCount === 1 ? "" : "es"} detected: ${elifCount}.`),
            evidence(elseCount >= 1 ? "pass" : "fail", `else branch${elseCount === 1 ? "" : "es"} detected: ${elseCount}.`),
            evidence(raw.syntax?.ok ? "pass" : "fail", raw.syntax?.ok ? "Python accepted the selection structure and indentation." : "The selection structure could not be parsed because of a syntax or indentation error.")
        ]
    };

    // 5. Correct decision-making
    let decisionScore = 0;
    if (completedCorrect === 4) decisionScore = 4;
    else if (completedCorrect === 3) decisionScore = 3;
    else if (completedCorrect === 2) decisionScore = 2;
    else if (completedCorrect === 1) decisionScore = 1;

    const decisionEvidence = tests.map((test) => {
        if (!test.ok) return evidence("fail", `${test.label}: did not complete${test.error ? ` — ${test.error}` : ""}.`);
        const ticketOk = Boolean(test.matches?.ticketType);
        const priceOk = Boolean(test.matches?.price);
        return evidence(ticketOk && priceOk ? "pass" : "fail", `${test.label}: ${ticketOk ? "correct ticket" : "incorrect ticket"} and ${priceOk ? "correct price" : "incorrect price"}.`);
    });
    criteria.decision = { suggested: decisionScore, evidence: decisionEvidence };

    // 6. Output and code quality
    const meaningfulCount = staticData.meaningfulNames?.length || 0;
    const printCalls = staticData.printCalls || 0;
    const allTicketLabels = successful.length === assignment.testCases.length && successful.every((test) => test.labels?.ticket);
    const allPriceLabels = successful.length === assignment.testCases.length && successful.every((test) => test.labels?.price);
    let outputScore = 0;
    if (fullyMatched === assignment.testCases.length && allTicketLabels && allPriceLabels && meaningfulCount >= 3) outputScore = 4;
    else if (completedCorrect >= 3 && fullyMatched >= 3) outputScore = 3;
    else if (successful.some((test) => countTrue(test.matches) >= 2) || printCalls >= 2) outputScore = 2;
    else if (printCalls >= 1 || successful.some((test) => (test.output || "").trim())) outputScore = 1;

    criteria.output = {
        suggested: outputScore,
        evidence: [
            evidence(fullyMatched === assignment.testCases.length ? "pass" : fullyMatched > 0 ? "warn" : "fail", `${fullyMatched} of ${assignment.testCases.length} tests displayed the supplied name, expected ticket and expected price.`),
            evidence(allTicketLabels ? "pass" : "warn", allTicketLabels ? "A ticket label appeared in every completed test." : "A clear ticket label was not detected in every test."),
            evidence(allPriceLabels ? "pass" : "warn", allPriceLabels ? "A price label or currency symbol appeared in every completed test." : "A clear price label or currency symbol was not detected in every test."),
            evidence(meaningfulCount >= 3 ? "pass" : meaningfulCount > 0 ? "warn" : "fail", `${meaningfulCount} variable name${meaningfulCount === 1 ? " appears" : "s appear"} meaningful by the automatic naming check.`),
            evidence(printCalls >= 3 ? "pass" : printCalls > 0 ? "warn" : "fail", `${printCalls} print() call${printCalls === 1 ? "" : "s"} detected.`),
            evidence("warn", "Teacher check: confirm that ticket type and price are stored in variables and that the code is clear and consistently indented.")
        ]
    };

    const firstFull = tests[0]?.ok && tests[0]?.matches?.name && tests[0]?.matches?.ticketType && tests[0]?.matches?.price;
    const laterCorrect = tests.slice(1).filter((test) => test.ok && test.matches?.ticketType && test.matches?.price).length;
    if (firstFull && laterCorrect <= 1) {
        reviewFlags.push("Possible hard-coded output: the first example matched much better than the changed boundary tests.");
        criteria.operation.suggested = Math.min(criteria.operation.suggested, 2);
        criteria.decision.suggested = Math.min(criteria.decision.suggested, 2);
        criteria.output.suggested = Math.min(criteria.output.suggested, 2);
        criteria.decision.evidence.push(evidence("warn", "The output may contain fixed ticket details rather than decisions based on the entered age."));
    }

    return finishAssessment(assignment, raw, criteria, reviewFlags);
}

function finishAssessment(assignment, raw, criteria, reviewFlags) {
    const suggestedTotal = assignment.rubric.reduce(
        (total, item) => total + (criteria[item.id]?.suggested || 0),
        0
    );
    return {
        criteria,
        suggestedTotal,
        reviewFlags,
        status: determineStatus(raw, reviewFlags)
    };
}

function assessSubmission(raw, assignmentId = DEFAULT_ASSIGNMENT_ID) {
    if (assignmentId === "cinema-ticket") return assessCinemaTicket(raw);
    return assessLearnerProfile(raw);
}

function createFeedbackText(submission) {
    if (!submission?.assessment) return "This submission has not been marked yet.";

    const assignment = getAssignment(submission.assignmentId);
    const lines = [
        `Python Assignment: ${assignment.reportTitle}`,
        `Student: ${submission.studentName}`,
        `File: ${submission.fileName}`,
        ""
    ];

    for (const rubricItem of assignment.rubric) {
        const result = submission.assessment.criteria[rubricItem.id];
        const adjusted = submission.adjustedScores?.[rubricItem.id] ?? result.suggested;
        lines.push(`${rubricItem.shortTitle}: ${adjusted}/4`);
        for (const item of result.evidence) {
            const symbol = item.status === "pass" ? "✓" : item.status === "fail" ? "×" : "!";
            lines.push(`  ${symbol} ${item.text}`);
        }
        lines.push("");
    }

    const total = assignment.rubric.reduce(
        (sum, item) => sum + Number(submission.adjustedScores?.[item.id] ?? 0),
        0
    );
    lines.push(`Total: ${total}/${assignment.maxScore}`);
    if (submission.notes?.trim()) {
        lines.push("", "Teacher notes:", submission.notes.trim());
    }
    lines.push("", "Automated checks provide evidence only. The final rubric judgement was confirmed by the teacher.");
    return lines.join("\n");
}


// Main marker interface and workflow.
const elements = {
    runtimeStatus: document.getElementById("runtimeStatus"),
    headerAssignmentTitle: document.getElementById("headerAssignmentTitle"),
    assignmentSelect: document.getElementById("assignmentSelect"),
    assignmentSummary: document.getElementById("assignmentSummary"),
    dropZone: document.getElementById("dropZone"),
    fileInput: document.getElementById("fileInput"),
    markAllButton: document.getElementById("markAllButton"),
    clearButton: document.getElementById("clearButton"),
    downloadCsvButton: document.getElementById("downloadCsvButton"),
    downloadReportsButton: document.getElementById("downloadReportsButton"),
    classSummary: document.getElementById("classSummary"),
    submissionCount: document.getElementById("submissionCount"),
    submissionList: document.getElementById("submissionList"),
    emptyState: document.getElementById("emptyState"),
    resultContent: document.getElementById("resultContent"),
    studentNameInput: document.getElementById("studentNameInput"),
    selectedFileName: document.getElementById("selectedFileName"),
    adjustedTotal: document.getElementById("adjustedTotal"),
    suggestedTotal: document.getElementById("suggestedTotal"),
    reviewAlert: document.getElementById("reviewAlert"),
    remarkButton: document.getElementById("remarkButton"),
    copyFeedbackButton: document.getElementById("copyFeedbackButton"),
    downloadReportButton: document.getElementById("downloadReportButton"),
    rubricResults: document.getElementById("rubricResults"),
    teacherNotes: document.getElementById("teacherNotes"),
    testRuns: document.getElementById("testRuns"),
    sourceCode: document.getElementById("sourceCode")
};

const state = {
    assignmentId: DEFAULT_ASSIGNMENT_ID,
    submissions: [],
    selectedId: null,
    marking: false,
    workerReady: false
};

let worker = null;
let workerReadyPromise = null;
let resolveWorkerReady = null;
let rejectWorkerReady = null;
let requestCounter = 0;
const pendingRequests = new Map();

function currentAssignment() {
    return getAssignment(state.assignmentId);
}

function assignmentForSubmission(submission) {
    return getAssignment(submission?.assignmentId || state.assignmentId);
}

function setRuntimeStatus(kind, text) {
    const className = kind === "ready" ? "status-ready" : kind === "error" ? "status-error" : "status-loading";
    elements.runtimeStatus.innerHTML = `<span class="status-dot ${className}"></span><span>${escapeHtml(text)}</span>`;
}

function populateAssignments() {
    elements.assignmentSelect.innerHTML = Object.values(ASSIGNMENTS).map((assignment) =>
        `<option value="${escapeHtml(assignment.id)}">${escapeHtml(assignment.title)}</option>`
    ).join("");
    elements.assignmentSelect.value = state.assignmentId;
    renderAssignmentDetails();
}

function renderAssignmentDetails() {
    const assignment = currentAssignment();
    elements.headerAssignmentTitle.textContent = assignment.title;
    elements.assignmentSummary.innerHTML = `
        <strong>${escapeHtml(assignment.expectedFileName)}</strong> ·
        ${escapeHtml(assignment.summary)}
    `;
    document.title = `${assignment.shortName} — Python Assignment Marker`;
}

function startWorker() {
    if (worker) worker.terminate();
    state.workerReady = false;
    setRuntimeStatus("loading", "Preparing Python marker…");

    workerReadyPromise = new Promise((resolve, reject) => {
        resolveWorkerReady = resolve;
        rejectWorkerReady = reject;
    });

    worker = new Worker("marker-worker.js?v=20260618d", { type: "module" });

    worker.onmessage = (event) => {
        const message = event.data;
        if (message.type === "loading") {
            setRuntimeStatus("loading", message.message || "Loading Python runtime…");
            return;
        }
        if (message.type === "ready") {
            state.workerReady = true;
            setRuntimeStatus("ready", "Python marker ready");
            resolveWorkerReady?.();
            updateButtons();
            return;
        }
        if (message.type === "boot-error") {
            state.workerReady = false;
            setRuntimeStatus("error", "Python marker could not load");
            rejectWorkerReady?.(new Error(message.error));
            updateButtons();
            return;
        }
        if (message.type === "result" || message.type === "evaluation-error") {
            const pending = pendingRequests.get(message.requestId);
            if (!pending) return;
            clearTimeout(pending.timeoutId);
            pendingRequests.delete(message.requestId);
            if (message.type === "result") pending.resolve(message.result);
            else pending.reject(new Error(message.error));
        }
    };

    worker.onerror = (event) => {
        state.workerReady = false;
        setRuntimeStatus("error", "Python marker failed to load");
        rejectWorkerReady?.(new Error(event.message || "Worker failed to load"));
        updateButtons();
    };
}

async function evaluateSource(source, assignmentId) {
    await workerReadyPromise;
    const assignment = getAssignment(assignmentId);
    const requestId = ++requestCounter;

    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            pendingRequests.delete(requestId);
            worker.terminate();
            startWorker();
            reject(Object.assign(new Error("Execution timed out"), { code: "TIMEOUT" }));
        }, 8000);

        pendingRequests.set(requestId, { resolve, reject, timeoutId });
        worker.postMessage({
            type: "evaluate",
            requestId,
            source,
            assignmentId: assignment.id,
            tests: assignment.testCases
        });
    });
}

function makeId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function cleanStudentName(path, fileName) {
    const parts = path.split("/").filter(Boolean);
    let candidate = parts.length > 1 ? parts[parts.length - 2] : fileName.replace(/\.py$/i, "");
    candidate = candidate
        .replace(/_\d+_assignsubmission_file_.*$/i, "")
        .replace(/_assignsubmission_file_.*$/i, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!candidate || /^(learner profile|cinema ticket|learner profile program|cinema ticket program)$/i.test(candidate)) {
        return "Student name";
    }
    return candidate;
}

async function addPythonFile(fileName, path, code) {
    const normalisedCode = code.replace(/^\uFEFF/, "");
    const duplicate = state.submissions.some((submission) =>
        submission.path === path &&
        submission.code === normalisedCode &&
        submission.assignmentId === state.assignmentId
    );
    if (duplicate) return;

    state.submissions.push({
        id: makeId(),
        assignmentId: state.assignmentId,
        studentName: cleanStudentName(path, fileName),
        fileName,
        path,
        code: normalisedCode,
        status: "queued",
        rawResult: null,
        assessment: null,
        adjustedScores: {},
        notes: ""
    });
}

async function processFiles(fileList) {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    const warnings = [];
    for (const file of files) {
        const lowerName = file.name.toLowerCase();
        try {
            if (lowerName.endsWith(".py")) {
                if (file.size > 1024 * 1024) {
                    warnings.push(`${file.name} was skipped because it is larger than 1 MB.`);
                    continue;
                }
                await addPythonFile(file.name, file.name, await file.text());
            } else if (lowerName.endsWith(".zip")) {
                if (!window.JSZip) throw new Error("ZIP support did not load.");
                const zip = await window.JSZip.loadAsync(file);
                const entries = Object.values(zip.files).filter((entry) =>
                    !entry.dir &&
                    entry.name.toLowerCase().endsWith(".py") &&
                    !entry.name.startsWith("__MACOSX/")
                );
                if (!entries.length) warnings.push(`${file.name} contained no Python files.`);
                for (const entry of entries) {
                    const code = await entry.async("string");
                    const fileName = entry.name.split("/").pop();
                    await addPythonFile(fileName, entry.name, code);
                }
            } else {
                warnings.push(`${file.name} was ignored because it is not a .py or .zip file.`);
            }
        } catch (error) {
            warnings.push(`${file.name}: ${error.message || error}`);
        }
    }

    if (!state.selectedId && state.submissions.length) state.selectedId = state.submissions[0].id;
    elements.fileInput.value = "";
    renderAll();
    if (warnings.length) window.alert(warnings.join("\n"));
}

function getSelectedSubmission() {
    return state.submissions.find((submission) => submission.id === state.selectedId) || null;
}

function adjustedTotal(submission) {
    if (!submission?.assessment) return 0;
    const assignment = assignmentForSubmission(submission);
    return assignment.rubric.reduce(
        (sum, item) => sum + Number(
            submission.adjustedScores[item.id] ??
            submission.assessment.criteria[item.id]?.suggested ??
            0
        ),
        0
    );
}

function markedSubmissions() {
    return state.submissions.filter((submission) => submission.assessment);
}

function updateButtons() {
    const hasSubmissions = state.submissions.length > 0;
    const hasMarked = markedSubmissions().length > 0;
    elements.markAllButton.disabled = !hasSubmissions || state.marking || !state.workerReady;
    elements.clearButton.disabled = !hasSubmissions || state.marking;
    elements.downloadCsvButton.disabled = !hasMarked || state.marking;
    elements.downloadReportsButton.disabled = !hasMarked || state.marking;
    elements.assignmentSelect.disabled = state.marking;
}

function renderSummary() {
    const assignment = currentAssignment();
    const total = state.submissions.length;
    const marked = markedSubmissions();
    elements.submissionCount.textContent = String(total);

    if (!total) {
        elements.classSummary.textContent = `No ${assignment.shortName} submissions loaded`;
    } else if (!marked.length) {
        elements.classSummary.textContent = `${total} submission${total === 1 ? "" : "s"} loaded · not yet marked`;
    } else {
        const average = marked.reduce((sum, submission) => sum + adjustedTotal(submission), 0) / marked.length;
        const reviewCount = marked.filter((submission) => submission.assessment.status !== "complete").length;
        elements.classSummary.textContent = `${marked.length}/${total} marked · average ${average.toFixed(1)}/${assignment.maxScore}${reviewCount ? ` · ${reviewCount} need review` : ""}`;
    }
    updateButtons();
}

function renderSubmissionList() {
    if (!state.submissions.length) {
        elements.submissionList.innerHTML = '<div class="empty-sidebar">Uploaded files will appear here.</div>';
        return;
    }

    elements.submissionList.innerHTML = state.submissions.map((submission) => {
        const assignment = assignmentForSubmission(submission);
        const active = submission.id === state.selectedId ? " active" : "";
        const score = submission.assessment ? `${adjustedTotal(submission)}/${assignment.maxScore}` : "—";
        const status = submission.status || "queued";
        return `
            <button class="submission-item${active}" type="button" data-id="${escapeHtml(submission.id)}">
                <span class="item-status ${escapeHtml(status)}"></span>
                <span class="submission-name">
                    ${escapeHtml(submission.studentName)}
                    <span class="submission-file">${escapeHtml(submission.fileName)}</span>
                </span>
                <span class="item-score">${score}</span>
            </button>
        `;
    }).join("");

    elements.submissionList.querySelectorAll(".submission-item").forEach((button) => {
        button.addEventListener("click", () => {
            state.selectedId = button.dataset.id;
            renderAll();
        });
    });
}

function renderPending(submission) {
    const assignment = assignmentForSubmission(submission);
    elements.resultContent.hidden = true;
    elements.emptyState.hidden = false;
    elements.emptyState.innerHTML = `
        <div class="empty-icon">.py</div>
        <h2>${escapeHtml(submission.studentName)}</h2>
        <p><code>${escapeHtml(submission.fileName)}</code> is loaded for <strong>${escapeHtml(assignment.shortName)}</strong> and waiting to be marked.</p>
    `;
}

function renderRubric(submission) {
    const assignment = assignmentForSubmission(submission);
    elements.rubricResults.innerHTML = assignment.rubric.map((rubricItem) => {
        const result = submission.assessment.criteria[rubricItem.id];
        const adjusted = Number(submission.adjustedScores[rubricItem.id] ?? result.suggested);
        const options = [0, 1, 2, 3, 4].map((score) =>
            `<option value="${score}" ${score === adjusted ? "selected" : ""} title="${escapeHtml(rubricItem.levels[score])}">${score} / 4</option>`
        ).join("");
        const evidenceItems = result.evidence.map((item) =>
            `<li class="${escapeHtml(item.status)}">${escapeHtml(item.text)}</li>`
        ).join("");

        return `
            <article class="rubric-row">
                <div class="rubric-title">
                    <h3>${escapeHtml(rubricItem.title)}</h3>
                    <p>${escapeHtml(rubricItem.summary)}</p>
                </div>
                <ul class="evidence-list">${evidenceItems}</ul>
                <div class="score-control">
                    <label for="score-${rubricItem.id}">Your score</label>
                    <select id="score-${rubricItem.id}" data-rubric-id="${rubricItem.id}">${options}</select>
                    <span class="suggested-label">Suggested: ${result.suggested}/4</span>
                </div>
            </article>
        `;
    }).join("");

    elements.rubricResults.querySelectorAll("select[data-rubric-id]").forEach((select) => {
        select.addEventListener("change", () => {
            submission.adjustedScores[select.dataset.rubricId] = Number(select.value);
            renderTotals(submission);
            renderSubmissionList();
            renderSummary();
        });
    });
}

function renderTestRuns(submission) {
    const raw = submission.rawResult;
    if (!raw?.tests?.length) {
        const reason = raw?.policy && !raw.policy.safe
            ? "Execution was skipped because unsupported or suspicious code was detected."
            : raw?.timedOut
                ? "The program exceeded the execution time limit."
                : "No test output is available.";
        elements.testRuns.innerHTML = `<div class="test-run"><p>${escapeHtml(reason)}</p></div>`;
        return;
    }

    elements.testRuns.innerHTML = raw.tests.map((test, index) => {
        const inputs = (test.inputsUsed || []).map((item) => `${item.prompt}${item.value}`).join("\n") || "No inputs consumed";
        const output = test.output || "(No printed output)";
        const error = test.error ? `<p class="test-error">${escapeHtml(test.error)}</p>` : "";
        return `
            <div class="test-run">
                <h4>${escapeHtml(test.label || `Test ${index + 1}`)} — ${test.ok ? "completed" : "did not complete"}</h4>
                ${error}
                <div class="test-grid">
                    <div class="test-block">
                        <h5>Supplied terminal input</h5>
                        <pre>${escapeHtml(inputs)}</pre>
                    </div>
                    <div class="test-block">
                        <h5>Printed program output</h5>
                        <pre>${escapeHtml(output)}</pre>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function renderTotals(submission) {
    const assignment = assignmentForSubmission(submission);
    elements.adjustedTotal.textContent = `${adjustedTotal(submission)}/${assignment.maxScore}`;
    elements.suggestedTotal.textContent = `Suggested: ${submission.assessment.suggestedTotal}/${assignment.maxScore}`;
}

function renderResult() {
    const submission = getSelectedSubmission();
    if (!submission) {
        elements.resultContent.hidden = true;
        elements.emptyState.hidden = false;
        elements.emptyState.innerHTML = `
            <div class="empty-icon">&lt;/&gt;</div>
            <h2>No submission selected</h2>
            <p>Add a Moodle ZIP or Python file, then select <strong>Mark all</strong>.</p>
        `;
        return;
    }
    if (!submission.assessment) {
        renderPending(submission);
        return;
    }

    elements.emptyState.hidden = true;
    elements.resultContent.hidden = false;
    elements.studentNameInput.value = submission.studentName;
    elements.selectedFileName.textContent = submission.path;
    elements.teacherNotes.value = submission.notes || "";
    elements.sourceCode.textContent = submission.code;
    renderTotals(submission);
    renderRubric(submission);
    renderTestRuns(submission);

    if (submission.assessment.reviewFlags.length) {
        elements.reviewAlert.hidden = false;
        elements.reviewAlert.innerHTML = `<strong>Teacher review recommended:</strong><br>${submission.assessment.reviewFlags.map(escapeHtml).join("<br>")}`;
    } else {
        elements.reviewAlert.hidden = true;
        elements.reviewAlert.textContent = "";
    }
}

function renderAll() {
    renderAssignmentDetails();
    renderSubmissionList();
    renderSummary();
    renderResult();
}

async function markSubmission(submission) {
    submission.status = "marking";
    submission.rawResult = null;
    submission.assessment = null;
    submission.adjustedScores = {};
    renderAll();

    let raw;
    try {
        raw = await evaluateSource(submission.code, submission.assignmentId);
    } catch (error) {
        if (error.code === "TIMEOUT") {
            raw = {
                assignmentId: submission.assignmentId,
                syntax: { ok: true, error: null },
                policy: { safe: true, issues: [] },
                static: {},
                tests: [],
                timedOut: true
            };
        } else {
            raw = {
                assignmentId: submission.assignmentId,
                syntax: { ok: false, error: null },
                policy: { safe: true, issues: [] },
                static: {},
                tests: [],
                workerError: error.message || String(error)
            };
        }
    }

    submission.rawResult = raw;
    submission.assessment = assessSubmission(raw, submission.assignmentId);
    const assignment = assignmentForSubmission(submission);
    for (const rubricItem of assignment.rubric) {
        submission.adjustedScores[rubricItem.id] = submission.assessment.criteria[rubricItem.id].suggested;
    }
    submission.status = submission.assessment.status;
    renderAll();
}

async function markAll() {
    if (state.marking || !state.submissions.length) return;
    state.marking = true;
    updateButtons();
    try {
        for (let index = 0; index < state.submissions.length; index += 1) {
            const submission = state.submissions[index];
            state.selectedId = submission.id;
            elements.markAllButton.textContent = `Marking ${index + 1}/${state.submissions.length}`;
            await markSubmission(submission);
        }
    } finally {
        state.marking = false;
        elements.markAllButton.textContent = "Mark all";
        renderAll();
    }
}

function csvCell(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
}

function buildCsv() {
    const assignment = currentAssignment();
    const headers = [
        "Assignment", "Student", "File", "Status",
        ...assignment.rubric.map((item) => item.shortTitle),
        "Total", "Teacher notes"
    ];
    const rows = markedSubmissions().map((submission) => [
        assignmentForSubmission(submission).title,
        submission.studentName,
        submission.fileName,
        submission.assessment.status,
        ...assignment.rubric.map((item) => submission.adjustedScores[item.id]),
        adjustedTotal(submission),
        submission.notes || ""
    ]);
    return [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\r\n");
}

function safeFileName(name) {
    return name
        .replace(/[^a-z0-9._-]+/gi, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "student";
}

function buildReportHtml(submission) {
    const assignment = assignmentForSubmission(submission);
    const rubricRows = assignment.rubric.map((item) => {
        const result = submission.assessment.criteria[item.id];
        const score = submission.adjustedScores[item.id];
        const evidenceRows = result.evidence.map((entry) => {
            const symbol = entry.status === "pass" ? "✓" : entry.status === "fail" ? "×" : "!";
            return `<li><strong>${symbol}</strong> ${escapeHtml(entry.text)}</li>`;
        }).join("");
        return `
            <section class="criterion">
                <div class="criterion-heading"><h2>${escapeHtml(item.title)}</h2><span>${score}/4</span></div>
                <ul>${evidenceRows}</ul>
                <p class="level"><strong>Selected level:</strong> ${escapeHtml(item.levels[score])}</p>
            </section>
        `;
    }).join("");

    const testRows = (submission.rawResult.tests || []).map((test) => `
        <section class="test">
            <h2>${escapeHtml(test.label)} — ${test.ok ? "completed" : "did not complete"}</h2>
            ${test.error ? `<p class="error">${escapeHtml(test.error)}</p>` : ""}
            <h3>Printed output</h3>
            <pre>${escapeHtml(test.output || "(No printed output)")}</pre>
        </section>
    `).join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(submission.studentName)} — ${escapeHtml(assignment.reportTitle)} marking report</title>
<style>
body{margin:0;background:#f1f3f5;color:#222;font-family:Arial,Helvetica,sans-serif}.wrap{max-width:980px;margin:24px auto;background:#fff;border:1px solid #ddd;border-radius:12px;overflow:hidden}.header{padding:22px 26px;background:linear-gradient(135deg,#ed0a4f,#c9003f);color:#fff}.header h1{margin:0 0 5px}.header p{margin:3px 0}.content{padding:22px}.score{font-size:26px;font-weight:bold;color:#c9003f}.criterion,.test{margin:0 0 12px;padding:15px;border:1px solid #dfe3e7;border-radius:9px}.criterion-heading{display:flex;align-items:center;justify-content:space-between;gap:12px}.criterion h2,.test h2{margin:0;font-size:17px}.criterion-heading span{padding:5px 9px;border-radius:7px;background:#222;color:#fff;font-weight:bold}.criterion ul{margin:10px 0;padding-left:22px}.criterion li{margin:5px 0;line-height:1.4}.level{margin:8px 0 0;color:#555}.notes{padding:15px;border:2px dashed #ed0a4f;border-radius:9px;background:#fff7f9;white-space:pre-wrap}pre{overflow:auto;padding:12px;border-radius:7px;background:#1e1e1e;color:#d4d4d4;font-family:Consolas,'Courier New',monospace;white-space:pre-wrap}.error{color:#b00020;font-weight:bold}.footer{padding:0 22px 22px;color:#68707c;font-size:12px}
</style>
</head>
<body>
<div class="wrap">
    <header class="header">
        <h1>Python Assignment Marking Report</h1>
        <p><strong>Assignment:</strong> ${escapeHtml(assignment.title)}</p>
        <p><strong>Student:</strong> ${escapeHtml(submission.studentName)}</p>
        <p><strong>File:</strong> ${escapeHtml(submission.fileName)}</p>
    </header>
    <main class="content">
        <p class="score">Final rubric score: ${adjustedTotal(submission)}/${assignment.maxScore}</p>
        ${rubricRows}
        <h2>Teacher notes</h2>
        <div class="notes">${escapeHtml(submission.notes?.trim() || "No additional teacher notes entered.")}</div>
        <h2>Automated test evidence</h2>
        ${testRows || "<p>No test output was available.</p>"}
    </main>
    <div class="footer">Automated checks provide evidence only. The final rubric judgement must be confirmed by the teacher.</div>
</div>
</body>
</html>`;
}

function downloadBlob(content, fileName, mimeType) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function downloadAllReports() {
    if (!window.JSZip) {
        window.alert("ZIP support is unavailable. Refresh the page and try again.");
        return;
    }
    const assignment = currentAssignment();
    const zip = new window.JSZip();
    zip.file(`${assignment.slug}-class-summary.csv`, buildCsv());
    for (const submission of markedSubmissions()) {
        zip.file(`reports/${safeFileName(submission.studentName)}-report.html`, buildReportHtml(submission));
    }
    const blob = await zip.generateAsync({ type: "blob" });
    downloadBlob(blob, `${assignment.slug}-marking-reports.zip`, "application/zip");
}

function clearLoadedSubmissions() {
    state.submissions = [];
    state.selectedId = null;
    elements.fileInput.value = "";
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Events
elements.assignmentSelect.addEventListener("change", () => {
    const requestedId = elements.assignmentSelect.value;
    if (state.submissions.length) {
        const confirmed = window.confirm("Changing assignment will clear the currently loaded submissions and unsaved marking adjustments. Continue?");
        if (!confirmed) {
            elements.assignmentSelect.value = state.assignmentId;
            return;
        }
        clearLoadedSubmissions();
    }
    state.assignmentId = requestedId;
    renderAll();
});

elements.fileInput.addEventListener("change", (event) => processFiles(event.target.files));
elements.dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    elements.dropZone.classList.add("drag-over");
});
elements.dropZone.addEventListener("dragleave", () => elements.dropZone.classList.remove("drag-over"));
elements.dropZone.addEventListener("drop", (event) => {
    event.preventDefault();
    elements.dropZone.classList.remove("drag-over");
    processFiles(event.dataTransfer.files);
});
elements.markAllButton.addEventListener("click", markAll);
elements.clearButton.addEventListener("click", () => {
    if (!state.submissions.length) return;
    if (!window.confirm("Clear all loaded submissions and unsaved marking adjustments?")) return;
    clearLoadedSubmissions();
    renderAll();
});
elements.remarkButton.addEventListener("click", async () => {
    const submission = getSelectedSubmission();
    if (!submission || state.marking) return;
    state.marking = true;
    updateButtons();
    try {
        await markSubmission(submission);
    } finally {
        state.marking = false;
        renderAll();
    }
});
elements.studentNameInput.addEventListener("input", () => {
    const submission = getSelectedSubmission();
    if (!submission) return;
    submission.studentName = elements.studentNameInput.value;
    renderSubmissionList();
});
elements.teacherNotes.addEventListener("input", () => {
    const submission = getSelectedSubmission();
    if (submission) submission.notes = elements.teacherNotes.value;
});
elements.copyFeedbackButton.addEventListener("click", async () => {
    const submission = getSelectedSubmission();
    if (!submission?.assessment) return;
    try {
        await navigator.clipboard.writeText(createFeedbackText(submission));
        const original = elements.copyFeedbackButton.textContent;
        elements.copyFeedbackButton.textContent = "Copied";
        window.setTimeout(() => { elements.copyFeedbackButton.textContent = original; }, 1200);
    } catch {
        window.prompt("Copy this feedback:", createFeedbackText(submission));
    }
});
elements.downloadReportButton.addEventListener("click", () => {
    const submission = getSelectedSubmission();
    if (!submission?.assessment) return;
    const assignment = assignmentForSubmission(submission);
    downloadBlob(
        buildReportHtml(submission),
        `${safeFileName(submission.studentName)}-${assignment.slug}-report.html`,
        "text/html;charset=utf-8"
    );
});
elements.downloadCsvButton.addEventListener("click", () => {
    const assignment = currentAssignment();
    downloadBlob(buildCsv(), `${assignment.slug}-marking-summary.csv`, "text/csv;charset=utf-8");
});
elements.downloadReportsButton.addEventListener("click", downloadAllReports);

populateAssignments();
startWorker();
renderAll();
document.documentElement.dataset.markerAppReady = "true";
