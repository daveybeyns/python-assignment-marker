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
      input: { mode: "sequence", values: ["Alice", "72", "Ben", "48", "Cara", "60"] },
      expected: {
        records: [
          { name: "Alice", score: 72, message: "Pass" },
          { name: "Ben", score: 48, message: "Needs improvement" },
          { name: "Cara", score: 60, message: "Pass" }
        ],
        average: 60
      },
      functionTests: [
        { label: "calculate_average()", functionName: "calculate_average", args: [{ Alice: 72, Ben: 48, Cara: 60 }] },
        { label: "get_result_message() — pass", functionName: "get_result_message", args: [72] },
        { label: "get_result_message() — improvement", functionName: "get_result_message", args: [48] }
      ]
    },
    {
      label: "Test 2 — score boundary",
      input: { mode: "sequence", values: ["Ana", "0", "Bo", "100", "Cy", "50"] },
      expected: {
        records: [
          { name: "Ana", score: 0, message: "Needs improvement" },
          { name: "Bo", score: 100, message: "Pass" },
          { name: "Cy", score: 50, message: "Pass" }
        ],
        average: 50
      },
      functionTests: [
        { label: "calculate_average()", functionName: "calculate_average", args: [{ Ana: 0, Bo: 100, Cy: 50 }] },
        { label: "get_result_message() — boundary", functionName: "get_result_message", args: [50] },
        { label: "get_result_message() — below boundary", functionName: "get_result_message", args: [49.9] }
      ]
    },
    {
      label: "Test 3 — decimal scores",
      input: { mode: "sequence", values: ["Dee", "55.5", "Eli", "44.5", "Fay", "80"] },
      expected: {
        records: [
          { name: "Dee", score: 55.5, message: "Pass" },
          { name: "Eli", score: 44.5, message: "Needs improvement" },
          { name: "Fay", score: 80, message: "Pass" }
        ],
        average: 60
      },
      functionTests: [
        { label: "calculate_average()", functionName: "calculate_average", args: [{ Dee: 55.5, Eli: 44.5, Fay: 80 }] },
        { label: "get_result_message() — decimal pass", functionName: "get_result_message", args: [55.5] },
        { label: "get_result_message() — decimal improvement", functionName: "get_result_message", args: [44.5] }
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

function hasSource(source, pattern) {
  return pattern.test(String(source || ""));
}

function executableSource(source) {
  return String(source || "")
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, "").trim())
    .filter(Boolean)
    .join("\n");
}

function assess(raw, helpers, source, assignment) {
  const staticData = raw.static || {};
  const reviewFlags = [];
  const criteria = {};
  const code = String(source || "");
  const meaningfulCode = executableSource(code);

  if (!meaningfulCode) {
    for (const item of assignment.rubric) {
      criteria[item.id] = {
        suggested: 0,
        evidence: [helpers.evidence("fail", "No meaningful executable code was detected.")]
      };
    }
    reviewFlags.push("No meaningful executable solution was submitted.");
    return helpers.finishAssessment(assignment, raw, criteria, reviewFlags);
  }

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
        everyRecord:
          recordMatches.length > 0 &&
          recordMatches.every((record) => record.name && record.score && record.message),
        average: helpers.hasNumber(output, expected.average, 0.051),
        allInputsUsed:
          (test.inputsUsed?.length || 0) ===
          (assignment.testCases[index]?.input?.values?.length || 0)
      },
      labels: {
        average: lower.includes("average"),
        result: lower.includes("pass") && lower.includes("needs improvement")
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
  const outputCorrectIgnoringInputs = tests.filter(
    (test) => test.ok && test.matches.everyRecord && test.matches.average
  ).length;
  const firstStrong = Boolean(
    tests[0]?.ok && tests[0]?.matches?.everyRecord && tests[0]?.matches?.average
  );
  const changedStrong = tests.slice(1).filter(
    (test) => test.ok && test.matches?.everyRecord && test.matches?.average
  ).length;
  const looksHardCoded = firstStrong && changedStrong === 0;

  const names = ["calculate_average", "get_result_message", "main"];
  const definitions = Object.fromEntries(
    names.map((name) => [name, functionDefinition(staticData, name)])
  );
  const definitionCount = names.filter((name) => definitions[name]).length;
  const returnDefinitions = ["calculate_average", "get_result_message"].filter(
    (name) => definitions[name]?.hasReturn
  ).length;
  const callSites = staticData.functionCallSites || [];

  const mainDefined = Boolean(definitions.main) || hasSource(code, /(^|\n)\s*def\s+main\s*\(\s*\)\s*:/m);
  const mainCalledFromStatic = callSites.some(
    (site) => site.callee === "main" && (site.caller === "" || site.caller == null)
  );
  const mainCalledFromSource =
    hasSource(code, /(^|\n)\s*main\s*\(\s*\)\s*(?:#.*)?(?=\n|$)/m) ||
    hasSource(code, /if\s+__name__\s*==\s*["']__main__["']\s*:[\s\S]*?\bmain\s*\(\s*\)/m);
  const mainCalled = mainCalledFromStatic || mainCalledFromSource;

  const mainCalls = ["calculate_average", "get_result_message"].filter((name) =>
    callSites.some((site) => site.caller === "main" && site.callee === name) ||
    hasSource(code, new RegExp(`\\b${name}\\s*\\(`))
  );

  const inputCalls = staticData.inputCalls || 0;
  const floatCalls = staticData.castCalls?.float || 0;
  const forCount = staticData.forCount || 0;
  const ifCount = staticData.ifCount || 0;
  const comparisons = staticData.comparisonOperators || [];
  const printCalls = staticData.printCalls || 0;
  const meaningfulCount = staticData.meaningfulNames?.length || 0;

  const studentsEmptyList = hasSource(code, /\bstudents\s*=\s*\[\s*\]/m);
  const scoresEmptyDictionary = hasSource(code, /\bscores\s*=\s*\{\s*\}/m);
  const studentAppend = hasSource(code, /\bstudents\s*\.\s*append\s*\(/m);
  const loopsStudents = hasSource(code, /\bfor\s+\w+\s+in\s+students\s*:/m);
  const threeRecordLoop = hasSource(code, /\bfor\s+\w+\s+in\s+range\s*\(\s*3\s*\)\s*:/m);
  const assignsScoreByKey = hasSource(code, /\bscores\s*\[\s*[^\]]+\s*\]\s*=/m);
  const accessesScoreByKey = hasSource(code, /\bscores\s*\[\s*[^\]]+\s*\]/m);
  const usesValues = hasSource(code, /\bscores\s*\.\s*values\s*\(/m);
  const hasBoundary = comparisons.includes(">=") || hasSource(code, /\bif\s+[^\n:]+>=\s*50\s*:/m);

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
  } else if (fullyCorrect === assignment.testCases.length) {
    operationScore = 4;
    operationEvidence.push(
      helpers.evidence("pass", "All three tests completed with the correct student results and class average.")
    );
  } else if (outputCorrectIgnoringInputs === assignment.testCases.length) {
    operationScore = 3;
    operationEvidence.push(
      helpers.evidence("warn", "The displayed results were correct, but the supplied test inputs were not all used.")
    );
  } else if (looksHardCoded || outputCorrectIgnoringInputs >= 1) {
    operationScore = 2;
    operationEvidence.push(
      helpers.evidence("warn", "Only part of the changing test data produced the correct result.")
    );
  } else if (successful.length >= 1) {
    operationScore = 1;
    operationEvidence.push(
      helpers.evidence("fail", "The code ran, but it did not complete the required class-score task.")
    );
  }
  criteria.operation = { suggested: operationScore, evidence: operationEvidence };

  // 2. List creation and use
  let listScore = 0;
  if (studentsEmptyList && studentAppend && loopsStudents && threeRecordLoop) {
    listScore = scoresEmptyDictionary ? 4 : 2;
  } else if (studentsEmptyList && studentAppend && (loopsStudents || threeRecordLoop)) {
    listScore = scoresEmptyDictionary ? 3 : 2;
  } else if (studentsEmptyList && (studentAppend || loopsStudents || threeRecordLoop)) {
    listScore = 2;
  } else if (studentsEmptyList) {
    listScore = 1;
  }
  criteria.lists = {
    suggested: listScore,
    evidence: [
      helpers.evidence(studentsEmptyList ? "pass" : "fail", `An empty students list ${studentsEmptyList ? "was" : "was not"} detected.`),
      helpers.evidence(studentAppend ? "pass" : "fail", `students.append() ${studentAppend ? "was" : "was not"} detected.`),
      helpers.evidence(loopsStudents ? "pass" : "fail", `A loop through students ${loopsStudents ? "was" : "was not"} detected.`),
      helpers.evidence(
        scoresEmptyDictionary || listScore < 4 ? (scoresEmptyDictionary ? "pass" : "warn") : "pass",
        scoresEmptyDictionary
          ? "The student list is used alongside the required score dictionary."
          : "A parallel score list cannot replace the required dictionary."
      )
    ]
  };

  // 3. Dictionary creation and use
  let dictionaryScore = 0;
  if (scoresEmptyDictionary && assignsScoreByKey && accessesScoreByKey && usesValues) dictionaryScore = 4;
  else if (scoresEmptyDictionary && assignsScoreByKey && accessesScoreByKey) dictionaryScore = 3;
  else if (scoresEmptyDictionary && assignsScoreByKey) dictionaryScore = 2;
  else if (scoresEmptyDictionary) dictionaryScore = 1;
  criteria.dictionaries = {
    suggested: dictionaryScore,
    evidence: [
      helpers.evidence(scoresEmptyDictionary ? "pass" : "fail", `An empty scores dictionary ${scoresEmptyDictionary ? "was" : "was not"} detected.`),
      helpers.evidence(assignsScoreByKey ? "pass" : "fail", `Dynamic score assignment by key ${assignsScoreByKey ? "was" : "was not"} detected.`),
      helpers.evidence(accessesScoreByKey ? "pass" : "fail", `Score access by dictionary key ${accessesScoreByKey ? "was" : "was not"} detected.`),
      helpers.evidence(usesValues ? "pass" : "warn", `scores.values() ${usesValues ? "was" : "was not"} detected for the average.`)
    ]
  };

  // 4. Functions and calculations
  let functionsScore = 0;
  if (definitionCount === 3 && returnDefinitions === 2) {
    functionsScore = looksHardCoded ? 2 : outputCorrectIgnoringInputs === assignment.testCases.length ? 4 : 3;
  } else if (definitionCount >= 2 && returnDefinitions >= 1) {
    functionsScore = 2;
  } else if (definitionCount >= 1 || returnDefinitions >= 1) {
    functionsScore = 1;
  }
  criteria.functions = {
    suggested: functionsScore,
    evidence: [
      ...names.map((name) =>
        helpers.evidence(definitions[name] ? "pass" : "fail", `${name}() ${definitions[name] ? "defined" : "not detected"}.`)
      ),
      helpers.evidence(
        returnDefinitions === 2 ? "pass" : returnDefinitions ? "warn" : "fail",
        `${returnDefinitions} of 2 result functions contain a value-returning return statement.`
      ),
      helpers.evidence(
        looksHardCoded ? "warn" : outputCorrectIgnoringInputs === assignment.testCases.length ? "pass" : "warn",
        looksHardCoded
          ? "The functions appear to return fixed example results rather than calculate from changing data."
          : `${outputCorrectIgnoringInputs} of ${assignment.testCases.length} program tests produced the expected calculations.`
      )
    ]
  };

  // 5. main(), input, loops and selection
  let structureScore = 0;
  if (
    mainDefined &&
    mainCalled &&
    inputCalls >= 2 &&
    floatCalls >= 1 &&
    forCount >= 2 &&
    ifCount >= 1 &&
    hasBoundary &&
    mainCalls.length === 2
  ) {
    structureScore = 4;
  } else if (
    mainDefined &&
    inputCalls >= 2 &&
    floatCalls >= 1 &&
    forCount >= 1 &&
    ifCount >= 1
  ) {
    structureScore = 3;
  } else if (
    inputCalls >= 2 &&
    floatCalls >= 1 &&
    forCount >= 1 &&
    ifCount >= 1 &&
    hasBoundary
  ) {
    structureScore = 2;
  } else if (mainDefined || mainCalled || inputCalls || forCount || ifCount) {
    structureScore = 1;
  }
  criteria.structure = {
    suggested: structureScore,
    evidence: [
      helpers.evidence(mainDefined ? "pass" : "fail", `main() ${mainDefined ? "defined" : "not detected"}.`),
      helpers.evidence(mainCalled ? "pass" : "fail", `main() ${mainCalled ? "called at module level" : "was not clearly called at the end of the program"}.`),
      helpers.evidence(inputCalls >= 2 ? "pass" : inputCalls ? "warn" : "fail", `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected.`),
      helpers.evidence(floatCalls >= 1 ? "pass" : "fail", `float() ${floatCalls >= 1 ? "detected" : "not detected"}.`),
      helpers.evidence(forCount >= 2 ? "pass" : forCount >= 1 ? "warn" : "fail", `${forCount} for loop${forCount === 1 ? "" : "s"} detected.`),
      helpers.evidence(ifCount >= 1 && hasBoundary ? "pass" : ifCount >= 1 ? "warn" : "fail", `Selection with the >= 50 boundary ${ifCount >= 1 && hasBoundary ? "detected" : "not clearly detected"}.`),
      helpers.evidence(mainCalls.length === 2 ? "pass" : mainCalls.length ? "warn" : "fail", `${mainCalls.length} of the 2 helper-function calls were detected.`)
    ]
  };

  // 6. Output and code quality
  const clearLabels = tests.filter((test) => test.labels?.average && test.labels?.result).length;
  let outputScore = 0;
  if (
    outputCorrectIgnoringInputs === assignment.testCases.length &&
    clearLabels === assignment.testCases.length &&
    printCalls >= 2
  ) {
    outputScore = scoresEmptyDictionary ? 4 : 3;
  } else if (looksHardCoded && printCalls >= 2) {
    outputScore = 3;
  } else if (outputCorrectIgnoringInputs >= 1 || printCalls >= 2) {
    outputScore = 2;
  } else if (printCalls >= 1) {
    outputScore = 1;
  }
  criteria.output = {
    suggested: outputScore,
    evidence: [
      helpers.evidence(
        outputCorrectIgnoringInputs === assignment.testCases.length ? "pass" : outputCorrectIgnoringInputs ? "warn" : "fail",
        `${outputCorrectIgnoringInputs} of ${assignment.testCases.length} tests displayed the required results and class average.`
      ),
      helpers.evidence(
        clearLabels === assignment.testCases.length ? "pass" : clearLabels ? "warn" : "fail",
        `${clearLabels} of ${assignment.testCases.length} tests used recognisable result and average labels.`
      ),
      helpers.evidence(
        meaningfulCount >= 4 ? "pass" : meaningfulCount ? "warn" : "fail",
        `${meaningfulCount} meaningful variable name${meaningfulCount === 1 ? " was" : "s were"} detected.`
      ),
      helpers.evidence(printCalls >= 2 ? "pass" : printCalls ? "warn" : "fail", `${printCalls} print() call${printCalls === 1 ? "" : "s"} detected.`)
    ]
  };

  if (listScore < 4) reviewFlags.push("The required student-name list may be missing or incomplete.");
  if (dictionaryScore < 4) reviewFlags.push("The required name-score dictionary may be missing or incomplete.");
  if (definitionCount < 3) reviewFlags.push("One or more required function definitions were not detected.");
  if (!mainCalled) reviewFlags.push("main() was not clearly called at the end of the program.");
  if (!hasBoundary) reviewFlags.push("The required pass boundary of score >= 50 was not clearly detected.");
  if (looksHardCoded) reviewFlags.push("Possible hard-coded output: changed-value tests did not reproduce the first result.");

  return helpers.finishAssessment(assignment, raw, criteria, reviewFlags);
}

export default { ...assignment, assess };
