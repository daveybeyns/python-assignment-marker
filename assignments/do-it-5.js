const assignment = {
  enabled: true,
  number: 5,
  id: "class-score-tracker",
  shortName: "Do It 5",
  title: "Do It 5: Class Score Tracker",
  reportTitle: "Class Score Tracker",
  expectedFileName: "class_score_tracker.py",
  fileNameAliases: ["class score tracker"],
  slug: "class-score-tracker",
  summary: "Checks lists, dictionaries, functions, iteration, input, casting, selection and calculated output.",
  maxScore: 24,
  testCases: [
    {
      label: "Test 1 — mixed results",
      input: {
        mode: "sequence",
        values: ["Alice", "72", "Ben", "48", "Cara", "60"]
      },
      expected: {
        records: [
          { name: "Alice", score: 72, message: "Pass" },
          { name: "Ben", score: 48, message: "Needs improvement" },
          { name: "Cara", score: 60, message: "Pass" }
        ],
        average: 60
      },
      functionTests: [
        {
          label: "calculate_average()",
          functionName: "calculate_average",
          args: [{ Alice: 72, Ben: 48, Cara: 60 }]
        },
        {
          label: "get_result_message() — pass",
          functionName: "get_result_message",
          args: [72]
        },
        {
          label: "get_result_message() — improvement",
          functionName: "get_result_message",
          args: [48]
        }
      ]
    },
    {
      label: "Test 2 — score boundary",
      input: {
        mode: "sequence",
        values: ["Ana", "0", "Bo", "100", "Cy", "50"]
      },
      expected: {
        records: [
          { name: "Ana", score: 0, message: "Needs improvement" },
          { name: "Bo", score: 100, message: "Pass" },
          { name: "Cy", score: 50, message: "Pass" }
        ],
        average: 50
      },
      functionTests: [
        {
          label: "calculate_average()",
          functionName: "calculate_average",
          args: [{ Ana: 0, Bo: 100, Cy: 50 }]
        },
        {
          label: "get_result_message() — boundary",
          functionName: "get_result_message",
          args: [50]
        },
        {
          label: "get_result_message() — below boundary",
          functionName: "get_result_message",
          args: [49.9]
        }
      ]
    },
    {
      label: "Test 3 — decimal scores",
      input: {
        mode: "sequence",
        values: ["Dee", "55.5", "Eli", "44.5", "Fay", "80"]
      },
      expected: {
        records: [
          { name: "Dee", score: 55.5, message: "Pass" },
          { name: "Eli", score: 44.5, message: "Needs improvement" },
          { name: "Fay", score: 80, message: "Pass" }
        ],
        average: 60
      },
      functionTests: [
        {
          label: "calculate_average()",
          functionName: "calculate_average",
          args: [{ Dee: 55.5, Eli: 44.5, Fay: 80 }]
        },
        {
          label: "get_result_message() — decimal pass",
          functionName: "get_result_message",
          args: [55.5]
        },
        {
          label: "get_result_message() — decimal improvement",
          functionName: "get_result_message",
          args: [44.5]
        }
      ]
    }
  ],
  rubric: [
    {
      id: "operation",
      title: "1. Program operation",
      shortTitle: "Program operation",
      summary: "Runs correctly and completes the class-score task.",
      levels: {
        0: "No meaningful executable program is submitted.",
        1: "A limited executable attempt is present, but major errors prevent normal completion.",
        2: "The program runs partly, but a significant feature is missing or one or more test paths fail.",
        3: "The program runs and completes the main task with one minor error or omission.",
        4: "The program runs from beginning to end and works correctly for all supplied test values."
      }
    },
    {
      id: "lists",
      title: "2. List creation and use",
      shortTitle: "List creation and use",
      summary: "Stores student names in a list and uses the list meaningfully.",
      levels: {
        0: "No meaningful list is used.",
        1: "A list is attempted but is not used successfully.",
        2: "A list stores some suitable data, but its use is incomplete or unreliable.",
        3: "Student names are stored and used in a list, with one minor issue.",
        4: "A suitable student-name list is created, populated and iterated through correctly."
      }
    },
    {
      id: "dictionaries",
      title: "3. Dictionary creation and use",
      shortTitle: "Dictionary creation and use",
      summary: "Stores and retrieves each student's score using a dictionary.",
      levels: {
        0: "No meaningful dictionary is used.",
        1: "A dictionary is attempted but is not used successfully.",
        2: "A dictionary stores some suitable data, but access or updating is incomplete.",
        3: "Names and scores are stored and retrieved using a dictionary, with one minor issue.",
        4: "A suitable name-score dictionary is created, updated, accessed and used correctly throughout."
      }
    },
    {
      id: "functions",
      title: "4. Functions and calculations",
      shortTitle: "Functions and calculations",
      summary: "Uses the required functions and returns correct average and result messages.",
      levels: {
        0: "No meaningful required functions or returned results are present.",
        1: "A required function or return value is attempted but does not work correctly.",
        2: "Some required functions or calculations work, but a major element is missing or incorrect.",
        3: "The required functions and returned values are mostly correct, with one minor issue.",
        4: "calculate_average(), get_result_message() and main() are defined and used correctly, with accurate returned results."
      }
    },
    {
      id: "structure",
      title: "5. main(), input, loops and selection",
      shortTitle: "main(), input, loops and selection",
      summary: "Uses main() to collect scores, repeat tasks and select the correct message.",
      levels: {
        0: "No meaningful main(), input, loop or selection structure is present.",
        1: "One or more required structures are attempted but do not coordinate the program.",
        2: "Some required structures work, but a major element is missing or incorrectly placed.",
        3: "main(), input, loops and selection are mostly correct, with one minor issue.",
        4: "main() coordinates clear input, float casting, suitable loops, function calls and the pass boundary correctly."
      }
    },
    {
      id: "output",
      title: "6. Output and code quality",
      shortTitle: "Output and code quality",
      summary: "Displays clear individual results and a calculated class average using readable code.",
      levels: {
        0: "No meaningful output is produced.",
        1: "Output is very limited or unclear and the code is difficult to follow.",
        2: "Output is understandable but incomplete, or code quality needs noticeable improvement.",
        3: "Output and code are clear overall, with one minor formatting or readability issue.",
        4: "Output is clear and complete; names, scores, messages and the class average are labelled, and the code is well organised."
      }
    }
  ]
};

function functionDefinition(staticData, name) {
  return (staticData.functionDefinitions || []).find(
    (item) => item.name === name && !item.className
  );
}

function functionResult(test, name, occurrence = 0) {
  return (test?.functionTests || []).filter(
    (item) => item.functionName === name
  )[occurrence];
}

function numericFunctionCorrect(result, expected) {
  return Boolean(
    result?.ok &&
    typeof result.jsonValue === "number" &&
    Math.abs(result.jsonValue - expected) < 0.005
  );
}

function textFunctionCorrect(result, expected) {
  return Boolean(
    result?.ok &&
    String(result.jsonValue || "").trim().toLowerCase() ===
      String(expected).trim().toLowerCase()
  );
}

function assess(raw, helpers, source, assignment) {
  const staticData = raw.static || {};
  const reviewFlags = [];
  const criteria = {};
  helpers.addGeneralReviewFlags(raw, reviewFlags);

  const tests = (raw.tests || []).map((test, index) => {
    const expected = assignment.testCases[index]?.expected || {};
    const output = String(test.output || "");
    const lower = output.toLowerCase();

    const recordMatches = (expected.records || []).map((record) => ({
      name: helpers.includesText(output, record.name),
      score: helpers.hasNumber(output, record.score, 0.01),
      message: helpers.includesText(output, record.message)
    }));

    return {
      ...test,
      matches: {
        records: recordMatches,
        everyRecord: recordMatches.length > 0 && recordMatches.every(
          (record) => record.name && record.score && record.message
        ),
        average: helpers.hasNumber(output, expected.average, 0.051),
        allInputsUsed:
          (test.inputsUsed?.length || 0) ===
          (assignment.testCases[index]?.input?.values?.length || 0)
      },
      labels: {
        heading: lower.includes("class") && lower.includes("score"),
        average: lower.includes("average"),
        result:
          lower.includes("pass") && lower.includes("needs improvement")
      }
    };
  });

  raw.tests = tests;

  const successful = tests.filter((test) => test.ok);
  const fullyCorrect = tests.filter(
    (test) =>
      test.ok &&
      test.matches.everyRecord &&
      test.matches.average &&
      test.matches.allInputsUsed
  ).length;

  const names = ["calculate_average", "get_result_message", "main"];
  const definitions = Object.fromEntries(
    names.map((name) => [name, functionDefinition(staticData, name)])
  );
  const callSites = staticData.functionCallSites || [];

  // 1. Program operation
  let operationScore = 0;
  const operationEvidence = [];
  if (!raw.syntax?.ok) {
    operationEvidence.push(
      helpers.evidence(
        "fail",
        `Syntax error: ${raw.syntax?.error || "Python could not parse the file."}`
      )
    );
  } else if (raw.policy && !raw.policy.safe) {
    operationScore = 1;
    operationEvidence.push(
      helpers.evidence(
        "warn",
        "Execution was skipped because unsupported code was detected."
      )
    );
  } else if (raw.timedOut) {
    operationScore = 1;
    operationEvidence.push(
      helpers.evidence("fail", "The program did not finish within the time limit.")
    );
  } else if (
    successful.length === assignment.testCases.length &&
    fullyCorrect === assignment.testCases.length
  ) {
    operationScore = 4;
    operationEvidence.push(
      helpers.evidence(
        "pass",
        "All three tests completed with the correct student results and class average."
      )
    );
  } else if (
    successful.length === assignment.testCases.length &&
    fullyCorrect >= 2
  ) {
    operationScore = 3;
    operationEvidence.push(
      helpers.evidence(
        "warn",
        "All tests completed, with one minor incorrect or unclear result."
      )
    );
  } else if (successful.length >= 1) {
    operationScore = 2;
    operationEvidence.push(
      helpers.evidence(
        "warn",
        `${successful.length} of ${assignment.testCases.length} tests completed.`
      )
    );
  } else if (raw.syntax?.ok) {
    operationScore = 1;
    operationEvidence.push(
      helpers.evidence("fail", "The program could not complete an automated test.")
    );
  }
  criteria.operation = { suggested: operationScore, evidence: operationEvidence };

  // 2. List creation and use
  const listLiterals = staticData.listLiteralCount || 0;
  const appendCalls = staticData.methodCalls?.append || 0;
  const forCount = staticData.forCount || 0;
  let listScore = 0;
  if (listLiterals >= 1 && appendCalls >= 1 && forCount >= 2) listScore = 4;
  else if (listLiterals >= 1 && appendCalls >= 1 && forCount >= 1) listScore = 3;
  else if (listLiterals >= 1 && (appendCalls >= 1 || forCount >= 1)) listScore = 2;
  else if (listLiterals >= 1) listScore = 1;
  criteria.lists = {
    suggested: listScore,
    evidence: [
      helpers.evidence(
        listLiterals >= 1 ? "pass" : "fail",
        `${listLiterals} list literal${listLiterals === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        appendCalls >= 1 ? "pass" : "fail",
        `append() ${appendCalls >= 1 ? "detected" : "not detected"}.`
      ),
      helpers.evidence(
        forCount >= 2 ? "pass" : forCount >= 1 ? "warn" : "fail",
        `${forCount} for loop${forCount === 1 ? "" : "s"} detected; the expected solution uses loops to collect and display records.`
      ),
      helpers.evidence(
        fullyCorrect === assignment.testCases.length ? "pass" : fullyCorrect ? "warn" : "fail",
        `${fullyCorrect} of ${assignment.testCases.length} tests displayed all three student records correctly.`
      )
    ]
  };

  // 3. Dictionary creation and use
  const dictLiterals = staticData.dictLiteralCount || 0;
  const subscripts = staticData.subscriptCount || 0;
  const valuesCalls = staticData.methodCalls?.values || 0;
  let dictionaryScore = 0;
  if (dictLiterals >= 1 && subscripts >= 2 && valuesCalls >= 1) dictionaryScore = 4;
  else if (dictLiterals >= 1 && subscripts >= 2) dictionaryScore = 3;
  else if (dictLiterals >= 1 && subscripts >= 1) dictionaryScore = 2;
  else if (dictLiterals >= 1) dictionaryScore = 1;
  criteria.dictionaries = {
    suggested: dictionaryScore,
    evidence: [
      helpers.evidence(
        dictLiterals >= 1 ? "pass" : "fail",
        `${dictLiterals} dictionary literal${dictLiterals === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        subscripts >= 2 ? "pass" : subscripts >= 1 ? "warn" : "fail",
        `${subscripts} dictionary/list subscript access${subscripts === 1 ? "" : "es"} detected.`
      ),
      helpers.evidence(
        valuesCalls >= 1 ? "pass" : "warn",
        `values() ${valuesCalls >= 1 ? "detected for the average calculation" : "was not detected; check how dictionary scores are totalled"}.`
      ),
      helpers.evidence(
        "warn",
        "Teacher check: confirm that student names are used as dictionary keys and scores as their values."
      )
    ]
  };

  // 4. Functions and calculations
  const definitionCount = names.filter((name) => definitions[name]).length;
  const returnDefinitions = ["calculate_average", "get_result_message"].filter(
    (name) => definitions[name]?.hasReturn
  ).length;

  let directCorrect = 0;
  let directPossible = 0;
  for (let index = 0; index < tests.length; index += 1) {
    const expected = assignment.testCases[index].expected;
    const averageResult = functionResult(tests[index], "calculate_average", 0);
    const messageOne = functionResult(tests[index], "get_result_message", 0);
    const messageTwo = functionResult(tests[index], "get_result_message", 1);
    directPossible += 3;
    if (numericFunctionCorrect(averageResult, expected.average)) directCorrect += 1;
    if (textFunctionCorrect(messageOne, expected.records[0].message)) directCorrect += 1;
    if (textFunctionCorrect(messageTwo, expected.records[1].message)) directCorrect += 1;
  }

  let functionsScore = 0;
  if (definitionCount === 3 && returnDefinitions === 2 && directCorrect === directPossible) {
    functionsScore = 4;
  } else if (definitionCount === 3 && returnDefinitions === 2 && directCorrect >= directPossible - 2) {
    functionsScore = 3;
  } else if (definitionCount >= 2 && (returnDefinitions >= 1 || directCorrect >= 3)) {
    functionsScore = 2;
  } else if (definitionCount >= 1 || returnDefinitions >= 1 || directCorrect >= 1) {
    functionsScore = 1;
  }

  criteria.functions = {
    suggested: functionsScore,
    evidence: [
      ...names.map((name) =>
        helpers.evidence(
          definitions[name] ? "pass" : "fail",
          `${name}() ${definitions[name] ? "defined" : "not detected"}.`
        )
      ),
      helpers.evidence(
        returnDefinitions === 2 ? "pass" : returnDefinitions ? "warn" : "fail",
        `${returnDefinitions} of 2 result functions contain a value-returning return statement.`
      ),
      helpers.evidence(
        directCorrect === directPossible ? "pass" : directCorrect ? "warn" : "fail",
        `${directCorrect} of ${directPossible} direct function checks returned the expected value.`
      )
    ]
  };

  // 5. main(), input, loops and selection
  const inputCalls = staticData.inputCalls || 0;
  const promptedInputs = staticData.promptedInputs || 0;
  const floatCalls = staticData.castCalls?.float || 0;
  const ifCount = staticData.ifCount || 0;
  const comparisons = staticData.comparisonOperators || [];
  const mainDefined = Boolean(definitions.main);
  const mainCalled = callSites.some(
    (site) => site.caller === "" && site.callee === "main"
  );
  const mainCalls = ["calculate_average", "get_result_message"].filter((name) =>
    callSites.some((site) => site.caller === "main" && site.callee === name)
  );
  const minimumInputsUsed = successful.length
    ? Math.min(...successful.map((test) => test.inputsUsed?.length || 0))
    : 0;

  let structureScore = 0;
  if (
    mainDefined &&
    mainCalled &&
    inputCalls >= 2 &&
    promptedInputs >= 2 &&
    floatCalls >= 1 &&
    forCount >= 2 &&
    ifCount >= 1 &&
    comparisons.includes(">=") &&
    mainCalls.length === 2 &&
    minimumInputsUsed >= 6
  ) {
    structureScore = 4;
  } else if (
    mainDefined &&
    inputCalls >= 2 &&
    floatCalls >= 1 &&
    forCount >= 1 &&
    ifCount >= 1 &&
    mainCalls.length >= 1
  ) {
    structureScore = 3;
  } else if (
    mainDefined &&
    (inputCalls >= 1 || forCount >= 1 || ifCount >= 1)
  ) {
    structureScore = 2;
  } else if (mainDefined || inputCalls || forCount || ifCount) {
    structureScore = 1;
  }

  criteria.structure = {
    suggested: structureScore,
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
        inputCalls >= 2 ? "pass" : inputCalls ? "warn" : "fail",
        `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected; two reusable input statements are expected inside the entry loop.`
      ),
      helpers.evidence(
        floatCalls >= 1 ? "pass" : "fail",
        `float() ${floatCalls >= 1 ? "detected" : "not detected"}.`
      ),
      helpers.evidence(
        forCount >= 2 ? "pass" : forCount >= 1 ? "warn" : "fail",
        `${forCount} for loop${forCount === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        ifCount >= 1 && comparisons.includes(">=") ? "pass" : ifCount >= 1 ? "warn" : "fail",
        `Selection with the >= 50 boundary ${ifCount >= 1 && comparisons.includes(">=") ? "detected" : "not clearly detected"}.`
      ),
      helpers.evidence(
        mainCalls.length === 2 ? "pass" : mainCalls.length ? "warn" : "fail",
        `main() calls ${mainCalls.length} of the 2 required helper functions.`
      )
    ]
  };

  // 6. Output and code quality
  const clearLabels = tests.filter(
    (test) => test.labels?.average && test.labels?.result
  ).length;
  const meaningfulCount = staticData.meaningfulNames?.length || 0;
  const printCalls = staticData.printCalls || 0;
  let outputScore = 0;
  if (
    fullyCorrect === assignment.testCases.length &&
    clearLabels === assignment.testCases.length &&
    meaningfulCount >= 6 &&
    printCalls >= 3
  ) {
    outputScore = 4;
  } else if (fullyCorrect >= 2 && meaningfulCount >= 4 && printCalls >= 2) {
    outputScore = 3;
  } else if (fullyCorrect >= 1 || printCalls >= 2) {
    outputScore = 2;
  } else if (printCalls >= 1) {
    outputScore = 1;
  }

  criteria.output = {
    suggested: outputScore,
    evidence: [
      helpers.evidence(
        fullyCorrect === assignment.testCases.length ? "pass" : fullyCorrect ? "warn" : "fail",
        `${fullyCorrect} of ${assignment.testCases.length} tests displayed all required student results and the correct class average.`
      ),
      helpers.evidence(
        clearLabels === assignment.testCases.length ? "pass" : clearLabels ? "warn" : "fail",
        `${clearLabels} of ${assignment.testCases.length} tests used recognisable result and average labels.`
      ),
      helpers.evidence(
        meaningfulCount >= 6 ? "pass" : meaningfulCount ? "warn" : "fail",
        `${meaningfulCount} variable name${meaningfulCount === 1 ? " appears" : "s appear"} meaningful by the automatic check.`
      ),
      helpers.evidence(
        printCalls >= 3 ? "pass" : printCalls ? "warn" : "fail",
        `${printCalls} print() call${printCalls === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        "warn",
        "Teacher check: confirm consistent indentation, clear naming and logical organisation."
      )
    ]
  };

  if (listLiterals < 1) reviewFlags.push("The required list was not detected.");
  if (dictLiterals < 1) reviewFlags.push("The required dictionary was not detected.");
  if (definitionCount < 3) reviewFlags.push("One or more required function definitions were not detected.");
  if (!mainCalled) reviewFlags.push("main() was not clearly called at the end of the program.");
  if (!comparisons.includes(">=")) reviewFlags.push("The required pass boundary of score >= 50 was not clearly detected.");

  const firstStrong = Boolean(
    tests[0]?.ok && tests[0]?.matches?.everyRecord && tests[0]?.matches?.average
  );
  const changedStrong = tests.slice(1).filter(
    (test) => test.ok && test.matches?.everyRecord && test.matches?.average
  ).length;
  if (firstStrong && changedStrong === 0) {
    reviewFlags.push(
      "Possible hard-coded output: the first example matched but the changed-value tests did not."
    );
    criteria.operation.suggested = Math.min(criteria.operation.suggested, 2);
    criteria.functions.suggested = Math.min(criteria.functions.suggested, 2);
    criteria.output.suggested = Math.min(criteria.output.suggested, 2);
  }

  return helpers.finishAssessment(assignment, raw, criteria, reviewFlags);
}

export default { ...assignment, assess };
