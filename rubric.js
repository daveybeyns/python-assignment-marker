export const TEST_CASES = [
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
];

export const RUBRIC = [
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
];

function evidence(status, text) {
    return { status, text };
}

function countTrue(object) {
    return Object.values(object || {}).filter(Boolean).length;
}

function successfulTests(raw) {
    return (raw.tests || []).filter((test) => test.ok);
}

function minimumMatchCount(tests) {
    if (!tests.length) return 0;
    return Math.min(...tests.map((test) => countTrue(test.matches)));
}

function runtimeTypeSet(tests) {
    const set = new Set();
    for (const test of tests) {
        for (const variable of test.variables || []) {
            set.add(variable.type);
        }
    }
    return set;
}

function determineStatus(raw, reviewFlags) {
    if (raw.timedOut || !raw.syntax?.ok || raw.workerError) return "error";
    if (reviewFlags.length) return "review";
    return "complete";
}

export function assessSubmission(raw) {
    const staticData = raw.static || {};
    const tests = raw.tests || [];
    const successful = successfulTests(raw);
    const successCount = successful.length;
    const minMatches = minimumMatchCount(successful);
    const runtimeTypes = runtimeTypeSet(successful);
    const reviewFlags = [];
    const criteria = {};

    if (raw.workerError) {
        reviewFlags.push(`Marker error: ${raw.workerError}`);
    }
    if (raw.timedOut) {
        reviewFlags.push("The program exceeded the execution time limit. Check for an infinite loop or a prompt that could not be supplied automatically.");
    }
    if (raw.policy?.issues?.length) {
        reviewFlags.push(`The marker did not execute potentially unsafe or unsupported code: ${raw.policy.issues.join("; ")}`);
    }

    // 1. Program operation
    let operationScore = 0;
    const operationEvidence = [];
    if (!raw.syntax?.ok) {
        operationScore = 0;
        operationEvidence.push(evidence("fail", `Syntax error: ${raw.syntax?.error || "Python could not parse the file."}`));
    } else if (raw.policy && !raw.policy.safe) {
        operationScore = 1;
        operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
        operationEvidence.push(evidence("warn", "Automatic execution was skipped because unsupported or suspicious code was detected."));
    } else if (raw.timedOut) {
        operationScore = 1;
        operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
        operationEvidence.push(evidence("fail", "The program did not finish within the time limit."));
    } else if (successCount === TEST_CASES.length && minMatches === 5 && staticData.inputCalls >= 4) {
        operationScore = 4;
        operationEvidence.push(evidence("pass", "The program completed both test runs without an error."));
        operationEvidence.push(evidence("pass", "Both tests displayed all required learner values and the Boolean value."));
    } else if (successCount === TEST_CASES.length && minMatches >= 4) {
        operationScore = 3;
        operationEvidence.push(evidence("pass", "The program completed both test runs."));
        operationEvidence.push(evidence("warn", "One required item was missing or unclear in at least one test output."));
    } else if (successCount >= 1) {
        operationScore = 2;
        operationEvidence.push(evidence("pass", `${successCount} of ${TEST_CASES.length} test runs completed.`));
        operationEvidence.push(evidence("fail", "The program did not complete every test successfully."));
    } else {
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
    const variableEvidence = [];
    if (assignedCount >= 5 && meaningfulCount >= 4) {
        variableScore = 4;
    } else if (assignedCount >= 4 && meaningfulCount >= 3) {
        variableScore = 3;
    } else if (assignedCount >= 2) {
        variableScore = 2;
    } else if (assignedCount >= 1) {
        variableScore = 1;
    }
    variableEvidence.push(evidence(assignedCount >= 5 ? "pass" : assignedCount > 0 ? "warn" : "fail", `${assignedCount} distinct assigned variable${assignedCount === 1 ? "" : "s"} detected.`));
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
    const typeCount = countTrue(detectedTypes);
    const typeScore = typeCount;
    const typeEvidence = Object.entries(detectedTypes).map(([name, present]) =>
        evidence(present ? "pass" : "fail", `${name[0].toUpperCase()}${name.slice(1)} data ${present ? "detected" : "not clearly demonstrated"}.`)
    );
    criteria.types = { suggested: typeScore, evidence: typeEvidence };

    // 4. User input
    const inputCalls = staticData.inputCalls || 0;
    const promptedInputs = staticData.promptedInputs || 0;
    const minimumConsumed = successful.length ? Math.min(...successful.map((test) => test.inputsUsed?.length || 0)) : 0;
    let inputScore = 0;
    if (inputCalls >= 4 && promptedInputs >= 4 && minimumConsumed >= 4) {
        inputScore = 4;
    } else if (inputCalls >= 3 || (inputCalls >= 4 && promptedInputs < 4)) {
        inputScore = 3;
    } else if (inputCalls === 2) {
        inputScore = 2;
    } else if (inputCalls === 1) {
        inputScore = 1;
    }
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
    if (intCalls >= 1 && floatCalls >= 1 && runtimeInt && runtimeFloat && successCount === TEST_CASES.length) {
        castingScore = 4;
    } else if (intCalls >= 1 && floatCalls >= 1) {
        castingScore = 3;
    } else if ((intCalls >= 1 && runtimeInt) || (floatCalls >= 1 && runtimeFloat)) {
        castingScore = 2;
    } else if (intCalls >= 1 || floatCalls >= 1) {
        castingScore = 1;
    }
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
    const minLabelCount = successful.length ? Math.min(...successful.map((test) => countTrue(test.labels))) : 0;
    const allHeadings = successful.length === TEST_CASES.length && successful.every((test) => test.heading);
    const printCalls = staticData.printCalls || 0;
    let outputScore = 0;
    if (successCount === TEST_CASES.length && minMatches === 5 && minLabelCount >= 4 && allHeadings && meaningfulCount >= 4) {
        outputScore = 4;
    } else if (successCount === TEST_CASES.length && minMatches >= 4 && minLabelCount >= 3) {
        outputScore = 3;
    } else if (successful.some((test) => countTrue(test.matches) >= 2) || printCalls >= 2) {
        outputScore = 2;
    } else if (printCalls >= 1 || successful.some((test) => (test.output || "").trim())) {
        outputScore = 1;
    }
    const outputEvidence = [
        evidence(allHeadings ? "pass" : "warn", allHeadings ? "A learner/student profile heading appeared in both tests." : "A clear profile heading was not detected in every completed test."),
        evidence(minLabelCount >= 4 ? "pass" : minLabelCount > 0 ? "warn" : "fail", `At least ${minLabelCount} clear output label${minLabelCount === 1 ? " was" : "s were"} detected across completed tests.`),
        evidence(minMatches === 5 ? "pass" : minMatches > 0 ? "warn" : "fail", `At least ${minMatches} of 5 required values appeared in every completed test.`),
        evidence(printCalls >= 5 ? "pass" : printCalls > 0 ? "warn" : "fail", `${printCalls} print() call${printCalls === 1 ? "" : "s"} detected.`),
        evidence("warn", "Teacher check: review layout, logical order and readability before confirming this score.")
    ];
    criteria.output = { suggested: outputScore, evidence: outputEvidence };

    // Cross-test hard-coding check
    if (tests.length >= 2 && tests[0]?.ok && tests[1]?.ok) {
        const firstMatchCount = countTrue(tests[0].matches);
        const secondMatchCount = countTrue(tests[1].matches);
        if (firstMatchCount >= 4 && secondMatchCount <= 2) {
            reviewFlags.push("Possible hard-coded example output: the first test matched substantially better than the changed-values test.");
            criteria.operation.suggested = Math.min(criteria.operation.suggested, 2);
            criteria.output.suggested = Math.min(criteria.output.suggested, 2);
            criteria.operation.evidence.push(evidence("warn", "The changed-values test did not reproduce the strong result from the assignment example."));
            criteria.output.evidence.push(evidence("warn", "Output may contain fixed example values rather than the user's answers."));
        }
    }

    const suggestedTotal = RUBRIC.reduce((total, item) => total + (criteria[item.id]?.suggested || 0), 0);

    return {
        criteria,
        suggestedTotal,
        reviewFlags,
        status: determineStatus(raw, reviewFlags)
    };
}

export function createFeedbackText(submission) {
    if (!submission?.assessment) return "This submission has not been marked yet.";

    const lines = [
        `Python Assignment: Learner Profile Program`,
        `Student: ${submission.studentName}`,
        `File: ${submission.fileName}`,
        ""
    ];

    for (const rubricItem of RUBRIC) {
        const result = submission.assessment.criteria[rubricItem.id];
        const adjusted = submission.adjustedScores?.[rubricItem.id] ?? result.suggested;
        lines.push(`${rubricItem.shortTitle}: ${adjusted}/4`);
        for (const item of result.evidence) {
            const symbol = item.status === "pass" ? "✓" : item.status === "fail" ? "×" : "!";
            lines.push(`  ${symbol} ${item.text}`);
        }
        lines.push("");
    }

    const total = RUBRIC.reduce((sum, item) => sum + Number(submission.adjustedScores?.[item.id] ?? 0), 0);
    lines.push(`Total: ${total}/24`);
    if (submission.notes?.trim()) {
        lines.push("", "Teacher notes:", submission.notes.trim());
    }
    lines.push("", "Automated checks provide evidence only. The final rubric judgement was confirmed by the teacher.");
    return lines.join("\n");
}
