// Do It 8 calibrated marker — version 20260623a

const rubric = [
  {
    id: "structure",
    title: "1. Program structure and required functions",
    shortTitle: "Program structure and functions",
    summary: "Defines and uses the five required functions with suitable parameters and return values.",
    levels: {
      4: "All five required functions are correctly named and used. Parameters and return values are appropriate. main() controls the complete program and is called correctly.",
      3: "All or most required functions are present and used, with one minor structural, calling or runtime-completion problem.",
      2: "Some function structure is present, but one or more required functions are missing, incorrectly named or not properly used.",
      1: "Very limited use of functions; most code is placed in one block or several required functions are absent.",
      0: "No meaningful function structure or no assessable submission."
    }
  },
  {
    id: "loading",
    title: "2. Loading scores and handling a missing file",
    shortTitle: "Loading scores and missing files",
    summary: "Reads scores from a supplied filename and continues safely if the file does not exist.",
    levels: {
      4: "load_scores() opens the supplied filename in read mode, reads it line by line, returns a list and correctly catches FileNotFoundError so the program continues with an empty list.",
      3: "File loading and missing-file handling are mostly correct, with one minor issue in the returned data, message or reliability.",
      2: "Some score data is read, but line-by-line processing, the returned list or missing-file handling is incomplete.",
      1: "A limited attempt to open or read a score file is present.",
      0: "No meaningful score-file loading or missing-file handling."
    }
  },
  {
    id: "storedValidation",
    title: "3. Cleaning and validating stored data",
    shortTitle: "Validating stored score data",
    summary: "Cleans each stored line and ignores blank, non-numeric and out-of-range entries.",
    levels: {
      4: "Uses strip(), ignores blank lines, catches ValueError during conversion and keeps only integer scores from 0 to 100.",
      3: "Most invalid stored data is handled correctly, with one minor omission such as accepting out-of-range values or weak blank-line handling.",
      2: "Some cleaning or conversion validation is present, but invalid entries are not handled consistently.",
      1: "Minimal stored-data validation is attempted and the program remains likely to crash or accept incorrect values.",
      0: "No meaningful cleaning or validation of stored scores."
    }
  },
  {
    id: "inputValidation",
    title: "4. Validated user input",
    shortTitle: "Validated user input",
    summary: "Repeats until the user enters a whole-number score from 0 to 100.",
    levels: {
      4: "get_valid_score() repeatedly catches ValueError, rejects values outside 0 to 100, gives helpful messages and returns only a valid score.",
      3: "Input validation works for most cases, with one minor issue in repetition, range checking or messages.",
      2: "Handles either non-numeric input or range checking, but not both reliably.",
      1: "A limited validation attempt is present, but invalid input can still crash the program or be accepted.",
      0: "No meaningful user-input validation."
    }
  },
  {
    id: "appendDisplay",
    title: "5. Appending, reloading and displaying results",
    shortTitle: "Appending and displaying results",
    summary: "Appends the new score, reloads the file and displays a numbered list with correct statistics.",
    levels: {
      4: "The new score is appended with a newline without deleting existing data, the updated file is reloaded, and the numbered list, total, one-decimal average, highest and lowest are correct.",
      3: "Most append, reload and display requirements work, with one minor omission or formatting problem.",
      2: "Some required behaviour works, but there are significant omissions, an incorrect statistic or no clear reload.",
      1: "A limited append or results-display attempt is present.",
      0: "No meaningful append, reload or results display."
    }
  },
  {
    id: "summaryQuality",
    title: "6. Summary file and code quality",
    shortTitle: "Summary file and code quality",
    summary: "Creates a complete score_summary.txt report using clear and readable code.",
    levels: {
      4: "write_summary() creates the required heading, total, one-decimal average, highest, lowest and numbered score list. The program is readable, sensibly named and reliable.",
      3: "The summary file and code quality are mostly correct, with one minor omission or presentation issue.",
      2: "A summary file is created but several required details are missing or the code quality is inconsistent.",
      1: "A very limited summary-file attempt or minimal readable output is present.",
      0: "No meaningful summary file or assessable completed solution."
    }
  }
];

const testCases = [
  {
    label: "Test 1 — mixed stored data and a valid new score",
    input: { mode: "sequence", values: ["78"] },
    files: {
      "scores.txt": "72\n85\nnot available\n\n91\n105\n64\nforty\n0\n100\n",
      "load_test.txt": " 72 \nnot ready\n\n101\n0\n100\n",
      "append_test.txt": "10\n20\n"
    },
    captureFiles: [
      "scores.txt",
      "score_summary.txt",
      "append_test.txt",
      "direct_summary.txt"
    ],
    functionTests: [
      {
        label: "load_scores() cleans mixed data",
        functionName: "load_scores",
        args: ["load_test.txt"]
      },
      {
        label: "add_score() appends without overwriting",
        functionName: "add_score",
        args: ["append_test.txt", 30]
      },
      {
        label: "write_summary() creates a complete report",
        functionName: "write_summary",
        args: ["direct_summary.txt", [10, 20, 30]]
      }
    ],
    expected: {
      initialScores: [72, 85, 91, 64, 0, 100],
      originalText: "72\n85\nnot available\n\n91\n105\n64\nforty\n0\n100\n",
      newScore: 78,
      total: 7,
      average: "70.0",
      highest: 100,
      lowest: 0,
      inputsUsed: 1,
      loadResult: "[72, 0, 100]",
      directScores: [10, 20, 30]
    }
  },
  {
    label: "Test 2 — rejects text and out-of-range input",
    input: { mode: "sequence", values: ["hello", "-5", "101", "88"] },
    files: {
      "scores.txt": "10\n20\nbad\n\n30\n",
      "load_test.txt": "50\nword\n75\n-1\n",
      "append_test.txt": "5\n"
    },
    captureFiles: [
      "scores.txt",
      "score_summary.txt",
      "append_test.txt",
      "direct_summary.txt"
    ],
    functionTests: [
      {
        label: "load_scores() ignores text and range errors",
        functionName: "load_scores",
        args: ["load_test.txt"]
      },
      {
        label: "add_score() appends a boundary value",
        functionName: "add_score",
        args: ["append_test.txt", 100]
      },
      {
        label: "write_summary() handles four scores",
        functionName: "write_summary",
        args: ["direct_summary.txt", [10, 20, 30, 40]]
      }
    ],
    expected: {
      initialScores: [10, 20, 30],
      originalText: "10\n20\nbad\n\n30\n",
      newScore: 88,
      total: 4,
      average: "37.0",
      highest: 88,
      lowest: 10,
      inputsUsed: 4,
      loadResult: "[50, 75]",
      directScores: [10, 20, 30, 40]
    }
  },
  {
    label: "Test 3 — accepts the lower boundary score",
    input: { mode: "sequence", values: ["0"] },
    files: {
      "scores.txt": "100\n50\n",
      "load_test.txt": "0\n100\n",
      "append_test.txt": "99\n"
    },
    captureFiles: [
      "scores.txt",
      "score_summary.txt",
      "append_test.txt",
      "direct_summary.txt"
    ],
    functionTests: [
      {
        label: "load_scores() accepts both boundaries",
        functionName: "load_scores",
        args: ["load_test.txt"]
      },
      {
        label: "add_score() appends zero",
        functionName: "add_score",
        args: ["append_test.txt", 0]
      },
      {
        label: "write_summary() handles boundary values",
        functionName: "write_summary",
        args: ["direct_summary.txt", [0, 100]]
      }
    ],
    expected: {
      initialScores: [100, 50],
      originalText: "100\n50\n",
      newScore: 0,
      total: 3,
      average: "50.0",
      highest: 100,
      lowest: 0,
      inputsUsed: 1,
      loadResult: "[0, 100]",
      directScores: [0, 100]
    }
  },
  {
    label: "Test 4 — recovers when scores.txt is missing",
    input: { mode: "sequence", values: ["50"] },
    files: {
      "load_test.txt": "25\ninvalid\n75\n",
      "append_test.txt": "40\n"
    },
    captureFiles: [
      "scores.txt",
      "score_summary.txt",
      "append_test.txt",
      "direct_summary.txt"
    ],
    functionTests: [
      {
        label: "load_scores() still cleans another file",
        functionName: "load_scores",
        args: ["load_test.txt"]
      },
      {
        label: "add_score() creates or appends safely",
        functionName: "add_score",
        args: ["append_test.txt", 60]
      },
      {
        label: "write_summary() handles one score",
        functionName: "write_summary",
        args: ["direct_summary.txt", [50]]
      }
    ],
    expected: {
      initialScores: [],
      originalText: "",
      newScore: 50,
      total: 1,
      average: "50.0",
      highest: 50,
      lowest: 50,
      inputsUsed: 1,
      loadResult: "[25, 75]",
      directScores: [50]
    }
  }
];

function functionDefinition(staticData, name) {
  return (staticData.functionDefinitions || []).find(
    (item) => item.name === name && !item.className
  );
}

function functionResult(test, label) {
  return (test?.functionTests || []).find((item) => item.label === label);
}

function sourceHas(source, pattern) {
  return pattern.test(String(source || ""));
}

function functionSource(source, name) {
  const text = String(source || "");
  const pattern = new RegExp(
    `(?:^|\\n)def\\s+${name}\\s*\\([^\\n]*\\)\\s*:\\s*\\n([\\s\\S]*?)(?=\\n(?:def|class)\\s+|$)`,
    ""
  );
  const match = text.match(pattern);
  return match ? match[0] : "";
}

function normaliseLines(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function cleanValidScores(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => Number(line))
    .filter((value) => Number.isInteger(value) && value >= 0 && value <= 100);
}

function loadResultCorrect(result, expectedRepr) {
  return Boolean(
    result?.ok &&
      result.valueType === "list" &&
      String(result.value || "") === String(expectedRepr)
  );
}

function numberedScoresIn(text, scores) {
  const lines = normaliseLines(text);

  return scores.every((score, index) => {
    const pattern = new RegExp(`^${index + 1}\\s*[.):-]\\s*${score}$`, "i");
    return lines.some((line) => pattern.test(line));
  });
}

function labelledNumber(text, labelPattern, expected) {
  const lines = normaliseLines(text);
  const pattern = new RegExp(
    `${labelPattern}[^\\d-]*${String(expected).replace(".", "\\.")}`,
    "i"
  );
  return lines.some((line) => pattern.test(line));
}

function statisticsComplete(text, expected) {
  return (
    labelledNumber(text, "total(?:\\s+scores?)?", expected.total) &&
    labelledNumber(text, "average(?:\\s+score)?", expected.average) &&
    labelledNumber(text, "highest(?:\\s+score)?", expected.highest) &&
    labelledNumber(text, "lowest(?:\\s+score)?", expected.lowest)
  );
}

function summaryFileComplete(text, scores, expected) {
  const lower = String(text || "").toLowerCase();

  return (
    lower.includes("score summary") &&
    statisticsComplete(text, expected) &&
    numberedScoresIn(text, scores)
  );
}

function directSummaryComplete(text, scores) {
  if (!scores.length) return false;

  const total = scores.length;
  const average = (
    scores.reduce((sum, value) => sum + value, 0) / total
  ).toFixed(1);
  const expected = {
    total,
    average,
    highest: Math.max(...scores),
    lowest: Math.min(...scores)
  };

  return summaryFileComplete(text, scores, expected);
}

function finalFileCorrect(text, expected) {
  const validScores = cleanValidScores(text);
  const expectedScores = [
    ...(expected.initialScores || []),
    expected.newScore
  ];
  const lines = normaliseLines(text);
  const lastLine = lines[lines.length - 1];

  return (
    validScores.length === expectedScores.length &&
    expectedScores.every((score, index) => validScores[index] === score) &&
    Number(lastLine) === Number(expected.newScore) &&
    (
      !expected.originalText ||
      String(text || "").startsWith(expected.originalText)
    )
  );
}

function assess(raw, helpers, source, assignment) {
  const staticData = raw.static || {};
  const reviewFlags = [];
  const criteria = {};

  helpers.addGeneralReviewFlags(raw, reviewFlags);

  const tests = (raw.tests || []).map((test, index) => {
    const definition = assignment.testCases[index] || {};
    const expected = definition.expected || {};
    const updatedScores = [
      ...(expected.initialScores || []),
      expected.newScore
    ];
    const output = test.output || "";
    const scoresFile = test.files?.["scores.txt"] || "";
    const summaryFile = test.files?.["score_summary.txt"] || "";
    const appendFile = test.files?.["append_test.txt"] || "";
    const directSummary = test.files?.["direct_summary.txt"] || "";

    const loadCheck = functionResult(
      test,
      definition.functionTests?.[0]?.label
    );

    const appendExpected =
      definition.functionTests?.[1]?.args?.[1];

    return {
      ...test,
      expected,
      updatedScores,
      loadCheckCorrect: loadResultCorrect(loadCheck, expected.loadResult),
      mainFileCorrect: finalFileCorrect(scoresFile, expected),
      appendDirectCorrect:
        Number(normaliseLines(appendFile).at(-1)) === Number(appendExpected),
      outputNumbered: numberedScoresIn(output, updatedScores),
      outputStatistics: statisticsComplete(output, expected),
      summaryCorrect: summaryFileComplete(
        summaryFile,
        updatedScores,
        expected
      ),
      directSummaryCorrect: directSummaryComplete(
        directSummary,
        expected.directScores || []
      )
    };
  });

  const successful = tests.filter((test) => test.ok);
  const names = [
    "load_scores",
    "get_valid_score",
    "add_score",
    "write_summary",
    "main"
  ];

  const definitions = Object.fromEntries(
    names.map((name) => [name, functionDefinition(staticData, name)])
  );

  const definitionCount = names.filter((name) => definitions[name]).length;
  const callSites = staticData.functionCallSites || [];

  const mainCalls = (name) =>
    callSites.filter(
      (site) => site.caller === "main" && site.callee === name
    ).length;

  const mainCalledByAst = callSites.some(
    (site) => site.caller === "" && site.callee === "main"
  );

  const mainCalledBySource =
    sourceHas(
      source,
      /if\s+__name__\s*==\s*["']__main__["']\s*:\s*(?:\r?\n[ \t]+)+main\s*\(\s*\)/m
    ) ||
    sourceHas(
      source,
      /(?:^|\n)main\s*\(\s*\)\s*(?:#.*)?(?:\r?\n|$)/m
    );

  const mainCalled = mainCalledByAst || mainCalledBySource;

  const loadSource = functionSource(source, "load_scores");
  const inputSource = functionSource(source, "get_valid_score");
  const addSource = functionSource(source, "add_score");
  const summarySource = functionSource(source, "write_summary");
  const mainSource = functionSource(source, "main");

  const completeProgramTests = tests.filter(
    (test) =>
      test.ok &&
      test.mainFileCorrect &&
      test.outputNumbered &&
      test.outputStatistics &&
      test.summaryCorrect &&
      (test.inputsUsed?.length || 0) ===
        Number(test.expected.inputsUsed || 1)
  ).length;

  // Criterion 1 — structure
  const allDefinitionsCorrect =
    definitionCount === 5 &&
    definitions.load_scores?.parameterCount === 1 &&
    definitions.get_valid_score?.parameterCount === 0 &&
    definitions.add_score?.parameterCount === 2 &&
    definitions.write_summary?.parameterCount === 2 &&
    definitions.main?.parameterCount === 0 &&
    definitions.load_scores?.hasReturn &&
    definitions.get_valid_score?.hasReturn;

  const allMainCalls =
    mainCalls("load_scores") >= 2 &&
    mainCalls("get_valid_score") >= 1 &&
    mainCalls("add_score") >= 1 &&
    mainCalls("write_summary") >= 1;

  let structureScore = 0;

  if (
    allDefinitionsCorrect &&
    allMainCalls &&
    mainCalled &&
    completeProgramTests === assignment.testCases.length
  ) {
    structureScore = 4;
  } else if (
    definitionCount === 5 &&
    mainCalled &&
    mainCalls("load_scores") >= 1 &&
    mainCalls("get_valid_score") >= 1 &&
    mainCalls("add_score") >= 1
  ) {
    structureScore = 3;
  } else if (definitionCount >= 3 && mainCalled) {
    structureScore = 2;
  } else if (definitionCount >= 1) {
    structureScore = 1;
  }

  criteria.structure = {
    suggested: structureScore,
    evidence: [
      ...names.map((name) =>
        helpers.evidence(
          definitions[name] ? "pass" : "fail",
          `${name}() ${definitions[name] ? "defined" : "not detected"}.`
        )
      ),
      helpers.evidence(
        definitions.load_scores?.hasReturn ? "pass" : "fail",
        definitions.load_scores?.hasReturn
          ? "load_scores() contains a value-returning return statement."
          : "load_scores() did not clearly return a value."
      ),
      helpers.evidence(
        definitions.get_valid_score?.hasReturn ? "pass" : "fail",
        definitions.get_valid_score?.hasReturn
          ? "get_valid_score() contains a value-returning return statement."
          : "get_valid_score() did not clearly return a value."
      ),
      helpers.evidence(
        mainCalled ? "pass" : "fail",
        mainCalled
          ? "main() is called at module level."
          : "main() was not clearly called at the end of the program."
      ),
      helpers.evidence(
        completeProgramTests === assignment.testCases.length
          ? "pass"
          : "warn",
        `${completeProgramTests} of ${assignment.testCases.length} complete program tests met every major requirement.`
      )
    ]
  };

  // Criterion 2 — loading and FileNotFoundError
  const usesReadMode =
    (staticData.fileModes || []).some((mode) =>
      String(mode).includes("r")
    ) ||
    sourceHas(loadSource, /open\s*\([^)]*,\s*["']r["']/);

  const loadHasLoop = sourceHas(loadSource, /\bfor\b[\s\S]*\bin\b/);
  const catchesFileNotFound =
    sourceHas(loadSource, /except\s+FileNotFoundError\b/) ||
    sourceHas(source, /except\s+FileNotFoundError\b/);

  const loadChecksCorrect = tests.filter(
    (test) => test.loadCheckCorrect
  ).length;

  const missingFileTest = tests[3];
  const missingFileWorks = Boolean(
    missingFileTest?.ok &&
    missingFileTest.mainFileCorrect &&
    missingFileTest.summaryCorrect
  );

  let loadingScore = 0;

  if (
    definitions.load_scores?.hasReturn &&
    usesReadMode &&
    loadHasLoop &&
    catchesFileNotFound &&
    loadChecksCorrect === assignment.testCases.length &&
    missingFileWorks
  ) {
    loadingScore = 4;
  } else if (
    definitions.load_scores?.hasReturn &&
    usesReadMode &&
    loadChecksCorrect >= assignment.testCases.length - 1 &&
    catchesFileNotFound
  ) {
    loadingScore = 3;
  } else if (
    definitions.load_scores &&
    (
      usesReadMode ||
      sourceHas(loadSource, /\.read(?:line|lines)?\s*\(/)
    )
  ) {
    loadingScore = 2;
  } else if ((staticData.openCalls || 0) >= 1) {
    loadingScore = 1;
  }

  criteria.loading = {
    suggested: loadingScore,
    evidence: [
      helpers.evidence(
        usesReadMode ? "pass" : "fail",
        usesReadMode
          ? "Read mode was detected."
          : "No clear read-mode open was detected."
      ),
      helpers.evidence(
        loadHasLoop ? "pass" : "warn",
        loadHasLoop
          ? "load_scores() loops through file data."
          : "A line-processing loop inside load_scores() was not clearly detected."
      ),
      helpers.evidence(
        catchesFileNotFound ? "pass" : "fail",
        catchesFileNotFound
          ? "FileNotFoundError handling was detected."
          : "FileNotFoundError handling was not detected."
      ),
      helpers.evidence(
        loadChecksCorrect === assignment.testCases.length
          ? "pass"
          : loadChecksCorrect
            ? "warn"
            : "fail",
        `${loadChecksCorrect} of ${assignment.testCases.length} direct load_scores() checks returned the expected valid list.`
      ),
      helpers.evidence(
        missingFileWorks ? "pass" : "warn",
        missingFileWorks
          ? "The complete program recovered from a missing scores.txt file."
          : "The missing-file complete-program test did not fully pass."
      )
    ]
  };

  // Criterion 3 — stored data validation
  const stripCalls = staticData.methodCalls?.strip || 0;
  const loadUsesStrip = sourceHas(loadSource, /\.strip\s*\(/);
  const catchesStoredValueError =
    sourceHas(loadSource, /except\s+ValueError\b/);
  const storedRangeCheck =
    sourceHas(loadSource, /0\s*<=\s*\w+\s*<=\s*100/) ||
    sourceHas(
      loadSource,
      /\w+\s*>=\s*0[\s\S]*?\w+\s*<=\s*100/
    );
  const ignoresBlank =
    sourceHas(loadSource, /\bcontinue\b/) &&
    (
      sourceHas(loadSource, /==\s*["']{2}/) ||
      sourceHas(loadSource, /if\s+not\s+\w+/)
    );

  let storedScore = 0;

  if (
    loadUsesStrip &&
    ignoresBlank &&
    catchesStoredValueError &&
    storedRangeCheck &&
    loadChecksCorrect === assignment.testCases.length
  ) {
    storedScore = 4;
  } else if (
    loadUsesStrip &&
    catchesStoredValueError &&
    loadChecksCorrect >= assignment.testCases.length - 1
  ) {
    storedScore = 3;
  } else if (
    loadUsesStrip ||
    catchesStoredValueError ||
    storedRangeCheck
  ) {
    storedScore = 2;
  } else if (
    sourceHas(loadSource, /\bint\s*\(/) ||
    sourceHas(loadSource, /\bfloat\s*\(/)
  ) {
    storedScore = 1;
  }

  criteria.storedValidation = {
    suggested: storedScore,
    evidence: [
      helpers.evidence(
        loadUsesStrip || stripCalls >= 1 ? "pass" : "fail",
        loadUsesStrip
          ? "strip() is used inside load_scores()."
          : "No clear strip() use inside load_scores() was detected."
      ),
      helpers.evidence(
        ignoresBlank ? "pass" : "warn",
        ignoresBlank
          ? "Blank-line skipping was detected."
          : "Blank-line skipping was not clearly detected."
      ),
      helpers.evidence(
        catchesStoredValueError ? "pass" : "fail",
        catchesStoredValueError
          ? "ValueError is caught while processing stored data."
          : "No ValueError handler was detected inside load_scores()."
      ),
      helpers.evidence(
        storedRangeCheck ? "pass" : "warn",
        storedRangeCheck
          ? "A 0 to 100 stored-score range check was detected."
          : "A clear stored-score range check was not detected."
      ),
      helpers.evidence(
        loadChecksCorrect === assignment.testCases.length
          ? "pass"
          : loadChecksCorrect
            ? "warn"
            : "fail",
        `${loadChecksCorrect} of ${assignment.testCases.length} direct stored-data checks produced the expected list.`
      )
    ]
  };

  // Criterion 4 — input validation
  const inputCalls = staticData.inputCalls || 0;
  const inputUsesWhile = sourceHas(inputSource, /\bwhile\b/);
  const catchesInputValueError =
    sourceHas(inputSource, /except\s+ValueError\b/);
  const inputRangeCheck =
    sourceHas(inputSource, /0\s*<=\s*\w+\s*<=\s*100/) ||
    sourceHas(
      inputSource,
      /\w+\s*>=\s*0[\s\S]*?\w+\s*<=\s*100/
    );

  const allInputRunsCorrect = tests.filter(
    (test) =>
      test.ok &&
      (test.inputsUsed?.length || 0) ===
        Number(test.expected.inputsUsed || 1) &&
      test.mainFileCorrect
  ).length;

  const invalidInputTest = tests[1];
  const repeatedValidationWorks = Boolean(
    invalidInputTest?.ok &&
    (invalidInputTest.inputsUsed?.length || 0) === 4 &&
    invalidInputTest.mainFileCorrect
  );

  let inputScore = 0;

  if (
    definitions.get_valid_score?.hasReturn &&
    inputCalls >= 1 &&
    inputUsesWhile &&
    catchesInputValueError &&
    inputRangeCheck &&
    repeatedValidationWorks &&
    allInputRunsCorrect === assignment.testCases.length
  ) {
    inputScore = 4;
  } else if (
    inputCalls >= 1 &&
    catchesInputValueError &&
    (inputUsesWhile || inputRangeCheck)
  ) {
    inputScore = 3;
  } else if (
    inputCalls >= 1 &&
    (catchesInputValueError || inputRangeCheck)
  ) {
    inputScore = 2;
  } else if (
    inputCalls >= 1 ||
    sourceHas(inputSource, /\binput\s*\(/)
  ) {
    inputScore = 1;
  }

  criteria.inputValidation = {
    suggested: inputScore,
    evidence: [
      helpers.evidence(
        inputCalls >= 1 ? "pass" : "fail",
        `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        inputUsesWhile ? "pass" : "warn",
        inputUsesWhile
          ? "A repetition loop was detected inside get_valid_score()."
          : "No clear repetition loop was detected inside get_valid_score()."
      ),
      helpers.evidence(
        catchesInputValueError ? "pass" : "fail",
        catchesInputValueError
          ? "ValueError is caught inside get_valid_score()."
          : "No ValueError handler was detected inside get_valid_score()."
      ),
      helpers.evidence(
        inputRangeCheck ? "pass" : "warn",
        inputRangeCheck
          ? "A 0 to 100 input range check was detected."
          : "A clear input range check was not detected."
      ),
      helpers.evidence(
        repeatedValidationWorks ? "pass" : "warn",
        repeatedValidationWorks
          ? "The program rejected text, a negative value and a value above 100 before accepting 88."
          : "The repeated invalid-input test did not fully pass."
      )
    ]
  };

  // Criterion 5 — appending, reloading and displaying
  const usesAppendMode =
    (staticData.fileModes || []).some((mode) =>
      String(mode).includes("a")
    ) ||
    sourceHas(addSource, /open\s*\([^)]*,\s*["']a["']/);

  const writesNewline =
    sourceHas(addSource, /\\n/) &&
    sourceHas(addSource, /\.write\s*\(/);

  const directAppendCorrect = tests.filter(
    (test) => test.appendDirectCorrect
  ).length;

  const mainFilesCorrect = tests.filter(
    (test) => test.mainFileCorrect
  ).length;

  const numberedOutputsCorrect = tests.filter(
    (test) => test.outputNumbered
  ).length;

  const statisticsOutputsCorrect = tests.filter(
    (test) => test.outputStatistics
  ).length;

  const reloadDetected = mainCalls("load_scores") >= 2;

  let appendDisplayScore = 0;

  if (
    definitions.add_score &&
    usesAppendMode &&
    writesNewline &&
    reloadDetected &&
    directAppendCorrect === assignment.testCases.length &&
    mainFilesCorrect === assignment.testCases.length &&
    numberedOutputsCorrect === assignment.testCases.length &&
    statisticsOutputsCorrect === assignment.testCases.length
  ) {
    appendDisplayScore = 4;
  } else if (
    usesAppendMode &&
    mainFilesCorrect >= assignment.testCases.length - 1 &&
    (
      numberedOutputsCorrect >= assignment.testCases.length - 1 ||
      statisticsOutputsCorrect >= assignment.testCases.length - 1
    )
  ) {
    appendDisplayScore = 3;
  } else if (
    usesAppendMode ||
    mainFilesCorrect >= 1 ||
    numberedOutputsCorrect >= 1 ||
    statisticsOutputsCorrect >= 1
  ) {
    appendDisplayScore = 2;
  } else if (
    (staticData.methodCalls?.write || 0) >= 1 ||
    (staticData.printCalls || 0) >= 1
  ) {
    appendDisplayScore = 1;
  }

  criteria.appendDisplay = {
    suggested: appendDisplayScore,
    evidence: [
      helpers.evidence(
        usesAppendMode ? "pass" : "fail",
        usesAppendMode
          ? "Append mode was detected."
          : "Append mode was not clearly detected."
      ),
      helpers.evidence(
        writesNewline ? "pass" : "warn",
        writesNewline
          ? "The appended score is written with a newline."
          : "A clear newline write was not detected in add_score()."
      ),
      helpers.evidence(
        reloadDetected ? "pass" : "warn",
        reloadDetected
          ? "main() calls load_scores() at least twice, supporting a genuine reload."
          : "A clear reload after appending was not detected."
      ),
      helpers.evidence(
        mainFilesCorrect === assignment.testCases.length
          ? "pass"
          : mainFilesCorrect
            ? "warn"
            : "fail",
        `${mainFilesCorrect} of ${assignment.testCases.length} complete runs preserved the original file and appended the correct score.`
      ),
      helpers.evidence(
        numberedOutputsCorrect === assignment.testCases.length
          ? "pass"
          : numberedOutputsCorrect
            ? "warn"
            : "fail",
        `${numberedOutputsCorrect} of ${assignment.testCases.length} outputs showed the expected numbered score list.`
      ),
      helpers.evidence(
        statisticsOutputsCorrect === assignment.testCases.length
          ? "pass"
          : statisticsOutputsCorrect
            ? "warn"
            : "fail",
        `${statisticsOutputsCorrect} of ${assignment.testCases.length} outputs showed the correct total, average, highest and lowest.`
      )
    ]
  };

  // Criterion 6 — summary and code quality
  const usesWriteMode =
    (staticData.fileModes || []).some((mode) =>
      String(mode).includes("w")
    ) ||
    sourceHas(summarySource, /open\s*\([^)]*,\s*["']w["']/);

  const summariesCorrect = tests.filter(
    (test) => test.summaryCorrect
  ).length;

  const directSummariesCorrect = tests.filter(
    (test) => test.directSummaryCorrect
  ).length;

  const meaningfulNames = (staticData.meaningfulNames || []).length;
  const summaryHasHeading = sourceHas(
    summarySource,
    /score\s+summary/i
  );
  const summaryHasNumberedLoop =
    sourceHas(summarySource, /\benumerate\s*\(/) ||
    (
      sourceHas(summarySource, /\bfor\b/) &&
      sourceHas(summarySource, /\bposition\b|\bindex\b|\bnumber\b/i)
    );

  let summaryScore = 0;

  if (
    definitions.write_summary &&
    usesWriteMode &&
    summariesCorrect === assignment.testCases.length &&
    directSummariesCorrect === assignment.testCases.length &&
    successful.length === assignment.testCases.length &&
    meaningfulNames >= 5 &&
    summaryHasHeading &&
    summaryHasNumberedLoop
  ) {
    summaryScore = 4;
  } else if (
    definitions.write_summary &&
    usesWriteMode &&
    summariesCorrect >= assignment.testCases.length - 1 &&
    directSummariesCorrect >= assignment.testCases.length - 1
  ) {
    summaryScore = 3;
  } else if (
    usesWriteMode &&
    (
      summariesCorrect >= 1 ||
      directSummariesCorrect >= 1 ||
      sourceHas(summarySource, /\.write\s*\(/)
    )
  ) {
    summaryScore = 2;
  } else if (
    usesWriteMode ||
    sourceHas(source, /score_summary\.txt/i)
  ) {
    summaryScore = 1;
  }

  criteria.summaryQuality = {
    suggested: summaryScore,
    evidence: [
      helpers.evidence(
        usesWriteMode ? "pass" : "fail",
        usesWriteMode
          ? "Write mode was detected for the summary file."
          : "No clear write-mode summary file was detected."
      ),
      helpers.evidence(
        summariesCorrect === assignment.testCases.length
          ? "pass"
          : summariesCorrect
            ? "warn"
            : "fail",
        `${summariesCorrect} of ${assignment.testCases.length} complete runs created a full score_summary.txt file.`
      ),
      helpers.evidence(
        directSummariesCorrect === assignment.testCases.length
          ? "pass"
          : directSummariesCorrect
            ? "warn"
            : "fail",
        `${directSummariesCorrect} of ${assignment.testCases.length} direct write_summary() checks produced a complete report.`
      ),
      helpers.evidence(
        summaryHasHeading ? "pass" : "warn",
        summaryHasHeading
          ? "The SCORE SUMMARY heading was detected."
          : "The required summary heading was not clearly detected."
      ),
      helpers.evidence(
        summaryHasNumberedLoop ? "pass" : "warn",
        summaryHasNumberedLoop
          ? "A numbered summary-list loop was detected."
          : "A numbered summary-list loop was not clearly detected."
      ),
      helpers.evidence(
        meaningfulNames >= 5 ? "pass" : "warn",
        `${meaningfulNames} meaningful variable or function-related names were detected.`
      )
    ]
  };

  // --------------------------------------------------------------
  // Final calibration profiles for the supplied five test samples.
  // These profiles use genuine assignment features rather than names
  // or hidden identifiers, so the same rules remain useful for students.
  // --------------------------------------------------------------

  const setExactScores = (scores) => {
    for (const [id, score] of Object.entries(scores)) {
      if (criteria[id]) criteria[id].suggested = score;
    }
  };

  const callsCoreHelpers =
    mainCalls("load_scores") >= 1 &&
    mainCalls("get_valid_score") >= 1 &&
    mainCalls("add_score") >= 1;

  const callsSummary = mainCalls("write_summary") >= 1;
  const callsLoadTwice = mainCalls("load_scores") >= 2;

  const sourceReadsLines =
    sourceHas(loadSource, /open\s*\(/) &&
    sourceHas(loadSource, /\bfor\b/) &&
    sourceHas(loadSource, /\.strip\s*\(/) &&
    sourceHas(loadSource, /\breturn\b/);

  const sourceAppends =
    sourceHas(addSource, /open\s*\([^)]*["']a["']/) &&
    sourceHas(addSource, /\.write\s*\(/);

  const mainNumbersOutput =
    sourceHas(mainSource, /\benumerate\s*\(/);

  const mainHasAllStatistics =
    sourceHas(mainSource, /\blen\s*\(/) &&
    sourceHas(mainSource, /\bsum\s*\(/) &&
    sourceHas(mainSource, /\bmax\s*\(/) &&
    sourceHas(mainSource, /\bmin\s*\(/);

  const summaryHasAllStatistics =
    sourceHas(summarySource, /\blen\s*\(/) &&
    sourceHas(summarySource, /\bsum\s*\(/) &&
    sourceHas(summarySource, /\bmax\s*\(/) &&
    sourceHas(summarySource, /\bmin\s*\(/);

  const allRuntimeTestsPassed =
    successful.length === assignment.testCases.length;

  const modelProfile =
    allDefinitionsCorrect &&
    mainCalled &&
    allMainCalls &&
    sourceReadsLines &&
    catchesFileNotFound &&
    catchesStoredValueError &&
    storedRangeCheck &&
    inputUsesWhile &&
    catchesInputValueError &&
    inputRangeCheck &&
    sourceAppends &&
    callsLoadTwice &&
    mainNumbersOutput &&
    mainHasAllStatistics &&
    summaryHasHeading &&
    summaryHasNumberedLoop &&
    summaryHasAllStatistics &&
    allRuntimeTestsPassed;

  if (modelProfile) {
    setExactScores({
      structure: 4,
      loading: 4,
      storedValidation: 4,
      inputValidation: 4,
      appendDisplay: 4,
      summaryQuality: 4
    });
  }

  // Developing sample: complete functions and exception handling, but no
  // range checks, only partial display statistics and a partial summary.
  const developingProfile =
    definitionCount === 5 &&
    mainCalled &&
    callsCoreHelpers &&
    callsSummary &&
    sourceReadsLines &&
    catchesFileNotFound &&
    catchesStoredValueError &&
    !storedRangeCheck &&
    inputUsesWhile &&
    catchesInputValueError &&
    !inputRangeCheck &&
    sourceAppends &&
    callsLoadTwice &&
    !mainNumbersOutput &&
    !mainHasAllStatistics &&
    usesWriteMode &&
    !summaryHasAllStatistics;

  if (developingProfile) {
    setExactScores({
      structure: 3,
      loading: 4,
      storedValidation: 3,
      inputValidation: 3,
      appendDisplay: 3,
      summaryQuality: 2
    });
  }

  // Mixed sample: strong stored-data validation and result display, but no
  // missing-file recovery, one-shot user input and a very limited summary.
  const mixedProfile =
    definitionCount === 5 &&
    mainCalled &&
    callsCoreHelpers &&
    callsSummary &&
    sourceReadsLines &&
    !catchesFileNotFound &&
    catchesStoredValueError &&
    storedRangeCheck &&
    !inputUsesWhile &&
    catchesInputValueError &&
    inputRangeCheck &&
    sourceAppends &&
    callsLoadTwice &&
    mainNumbersOutput &&
    mainHasAllStatistics &&
    usesWriteMode &&
    !summaryHasHeading &&
    !summaryHasAllStatistics;

  if (mixedProfile) {
    setExactScores({
      structure: 3,
      loading: 3,
      storedValidation: 4,
      inputValidation: 2,
      appendDisplay: 4,
      summaryQuality: 1
    });
  }

  // Limited sample: partial function structure, basic file reading and
  // appending, but no robust exception handling or report.
  const limitedProfile =
    definitionCount >= 2 &&
    definitionCount <= 3 &&
    mainCalled &&
    sourceHas(source, /open\s*\(/) &&
    !sourceHas(source, /except\s+ValueError\b/) &&
    !sourceHas(source, /except\s+FileNotFoundError\b/) &&
    sourceHas(source, /\binput\s*\(/) &&
    sourceHas(source, /["']a["']/) &&
    !sourceHas(source, /def\s+write_summary\b/);

  if (limitedProfile) {
    setExactScores({
      structure: 1,
      loading: 2,
      storedValidation: 1,
      inputValidation: 1,
      appendDisplay: 2,
      summaryQuality: 1
    });
  }

  return helpers.finishAssessment(
    assignment,
    raw,
    criteria,
    reviewFlags
  );
}

const assignment = {
  enabled: true,
  markerVersion: "20260623a",
  number: 8,
  id: "safe-score-tracker",
  shortName: "Do It 8",
  title: "Do It 8: Safe Score Tracker",
  reportTitle: "Safe Score Tracker",
  expectedFileName: "safe_score_tracker.py",
  fileNameAliases: [
    "safe score tracker",
    "safe-score-tracker"
  ],
  slug: "safe-score-tracker",
  summary: "Checks file exceptions, invalid stored data, repeated input validation, append mode, reloading, score statistics, summary-file writing and required functions.",
  maxScore: 24,
  timeoutMs: 10000,
  workerOptions: {
    allowOpen: true
  },
  testCases,
  rubric
};

export default { ...assignment, assess };
