const assignment = {
    "id": "cinema-ticket",
    "shortName": "Do It 2",
    "title": "Do It 2: Cinema Ticket Program",
    "reportTitle": "Cinema Ticket Program",
    "expectedFileName": "cinema_ticket.py",
    "slug": "cinema-ticket",
    "summary": "Checks input, integer casting, comparisons, if/elif/else and correct boundary decisions.",
    "maxScore": 24,
    "rubric": [
        {
            "id": "operation",
            "title": "1. Program operation",
            "shortTitle": "Program operation",
            "summary": "Runs without errors and completes the ticket task.",
            "levels": {
                "0": "No meaningful working program has been submitted.",
                "1": "A program has been attempted, but major syntax or runtime errors prevent normal operation.",
                "2": "The program partly works but fails for one or more ticket categories.",
                "3": "The program runs and mostly works, with only a minor error or small omission.",
                "4": "The program runs without errors and works correctly for all tested ages, including boundary values."
            }
        },
        {
            "id": "inputCasting",
            "title": "2. User input and casting",
            "shortTitle": "User input and casting",
            "summary": "Collects name and age, then converts age with int().",
            "levels": {
                "0": "No user input is used.",
                "1": "Very limited or incorrect use of input().",
                "2": "Input is used, but one required input or the age casting is missing or incorrect.",
                "3": "Both inputs are collected and age is cast, but there is a small issue with prompts or variable use.",
                "4": "The program correctly asks for both name and age, stores both answers, and casts age using int()."
            }
        },
        {
            "id": "conditions",
            "title": "3. Conditions and comparison operators",
            "shortTitle": "Conditions and comparisons",
            "summary": "Uses suitable comparisons to separate the three age ranges.",
            "levels": {
                "0": "No conditions or comparison operators are used.",
                "1": "Conditions have been attempted but do not meaningfully control the program.",
                "2": "Some valid comparisons are present, but the age ranges are incomplete or partly incorrect.",
                "3": "Conditions are mostly correct, with one minor boundary or comparison error.",
                "4": "Conditions and comparison operators are accurate and correctly handle under 12, 12–17, and 18 or over."
            }
        },
        {
            "id": "selection",
            "title": "4. Use of if, elif and else",
            "shortTitle": "if, elif and else",
            "summary": "Uses a complete, correctly indented three-way selection structure.",
            "levels": {
                "0": "No selection structure is used.",
                "1": "A limited if statement has been attempted but the full selection structure is not working.",
                "2": "Selection is present but one required branch is missing or incorrectly structured.",
                "3": "The selection structure is mostly correct, with a minor structural or indentation issue.",
                "4": "if, elif and else are all used correctly, with correct colons and indentation."
            }
        },
        {
            "id": "decision",
            "title": "5. Correct decision-making",
            "shortTitle": "Correct decision-making",
            "summary": "Produces the correct ticket and price for all age boundaries.",
            "levels": {
                "0": "The program does not produce a meaningful ticket decision.",
                "1": "Output is mostly fixed, hard-coded or unrelated to the selected age.",
                "2": "Only some ticket categories and prices are correct.",
                "3": "Most ages produce the correct result, with one minor category or price error.",
                "4": "Every tested age produces the correct ticket type and price, including ages 11, 12, 17 and 18."
            }
        },
        {
            "id": "output",
            "title": "6. Output and code quality",
            "shortTitle": "Output and code quality",
            "summary": "Displays a clear summary and uses readable, meaningful code.",
            "levels": {
                "0": "No meaningful output is produced.",
                "1": "Output is unclear and the code is difficult to follow.",
                "2": "Output is understandable but incomplete, or variable names and formatting need improvement.",
                "3": "Output and code are clear overall, with only a minor presentation or naming issue.",
                "4": "Output is clear and complete; meaningful variables, consistent indentation and readable code are used."
            }
        }
    ],
    "testCases": [
        {
            "label": "Boundary test — age 11",
            "input": {
                "mode": "prompt-map",
                "valuesByKey": {
                    "name": "Amina Lewis",
                    "age": "11"
                },
                "fallbackOrder": [
                    "name",
                    "age"
                ],
                "aliases": [
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
                "name": "Amina Lewis",
                "ticketType": "Child",
                "price": "5"
            }
        },
        {
            "label": "Boundary test — age 12",
            "input": {
                "mode": "prompt-map",
                "valuesByKey": {
                    "name": "Rhys Morgan",
                    "age": "12"
                },
                "fallbackOrder": [
                    "name",
                    "age"
                ],
                "aliases": [
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
                "name": "Rhys Morgan",
                "ticketType": "Teen",
                "price": "7"
            }
        },
        {
            "label": "Boundary test — age 17",
            "input": {
                "mode": "prompt-map",
                "valuesByKey": {
                    "name": "Morgan Evans",
                    "age": "17"
                },
                "fallbackOrder": [
                    "name",
                    "age"
                ],
                "aliases": [
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
                "ticketType": "Teen",
                "price": "7"
            }
        },
        {
            "label": "Boundary test — age 18",
            "input": {
                "mode": "prompt-map",
                "valuesByKey": {
                    "name": "Taylor Jones",
                    "age": "18"
                },
                "fallbackOrder": [
                    "name",
                    "age"
                ],
                "aliases": [
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
                "name": "Taylor Jones",
                "ticketType": "Adult",
                "price": "10"
            }
        }
    ],
    "number": 2,
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
                ticketType: helpers.includesText(output, expected.ticketType),
                price: helpers.hasNumber(output, expected.price)
            },
            labels: {
                name: lower.includes("name") || lower.includes("hello") || lower.includes("customer"),
                ticket: lower.includes("ticket"),
                price: lower.includes("price") || output.includes("£") || lower.includes("gbp")
            }
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

export default { ...assignment, assess };
