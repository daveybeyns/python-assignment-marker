const assignment = {
  enabled: true,
  number: 6,
  id: "message-analyser",
  shortName: "Do It 6",
  title: "Do It 6: Message Analyser",
  reportTitle: "Message Analyser",
  expectedFileName: "message_analyser.py",
  fileNameAliases: ["message analyzer", "message analyser"],
  slug: "message-analyser",
  summary:
    "Checks string cleaning, character analysis, indexing, slicing, searching, validation, functions and clear f-string output.",
  maxScore: 24,
  testCases: [
    {
      label: "Test 1 — short message with outside spaces",
      input: {
        mode: "sequence",
        values: ["  Python rocks  "]
      },
      expected: {
        cleaned: "Python rocks",
        preview: "Python roc",
        first: "P",
        last: "s",
        total: 12,
        withoutSpaces: 11,
        vowels: 2,
        spaces: 1,
        containsPython: true,
        category: "Short message",
        inputsUsed: 1
      },
      functionTests: [
        {
          label: "clean_message() removes outside spaces",
          functionName: "clean_message",
          args: ["  Python Rules  "]
        },
        {
          label: "count_vowels() handles mixed case",
          functionName: "count_vowels",
          args: ["PYTHON education"]
        },
        {
          label: "get_length_message() — 19",
          functionName: "get_length_message",
          args: [19]
        }
      ]
    },
    {
      label: "Test 2 — exact medium boundary",
      input: {
        mode: "sequence",
        values: ["Python makes coding!"]
      },
      expected: {
        cleaned: "Python makes coding!",
        preview: "Python mak",
        first: "P",
        last: "!",
        total: 20,
        withoutSpaces: 18,
        vowels: 5,
        spaces: 2,
        containsPython: true,
        category: "Medium message",
        inputsUsed: 1
      },
      functionTests: [
        {
          label: "clean_message() keeps internal spaces",
          functionName: "clean_message",
          args: ["  one two  "]
        },
        {
          label: "count_vowels() — no vowels",
          functionName: "count_vowels",
          args: ["rhythms"]
        },
        {
          label: "get_length_message() — 20",
          functionName: "get_length_message",
          args: [20]
        },
        {
          label: "get_length_message() — 49",
          functionName: "get_length_message",
          args: [49]
        }
      ]
    },
    {
      label: "Test 3 — exact long boundary",
      input: {
        mode: "sequence",
        values: ["Python aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]
      },
      expected: {
        cleaned: "Python aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        preview: "Python aaa",
        first: "P",
        last: "a",
        total: 50,
        withoutSpaces: 49,
        vowels: 44,
        spaces: 1,
        containsPython: true,
        category: "Long message",
        inputsUsed: 1
      },
      functionTests: [
        {
          label: "count_vowels() — uppercase vowels",
          functionName: "count_vowels",
          args: ["AEIOU"]
        },
        {
          label: "get_length_message() — 50",
          functionName: "get_length_message",
          args: [50]
        }
      ]
    },
    {
      label: "Test 4 — rejects a space-only message",
      input: {
        mode: "sequence",
        values: ["   ", "Python is fun"]
      },
      expected: {
        cleaned: "Python is fun",
        preview: "Python is ",
        first: "P",
        last: "n",
        total: 13,
        withoutSpaces: 11,
        vowels: 3,
        spaces: 2,
        containsPython: true,
        category: "Short message",
        inputsUsed: 2
      },
      functionTests: []
    }
  ],
  rubric: [
    {
      id: "structure",
      title: "1. Program structure and required functions",
      shortTitle: "Program structure and functions",
      summary: "Defines and uses all four required functions with appropriate parameters and returns.",
      levels: {
        4: "All four required functions are correctly named and used. Parameters and return values are appropriate. main() controls the complete program and is called correctly.",
        3: "All or most required functions are present and used, with one minor structural, calling or runtime-completion problem.",
        2: "Some function structure is present, but one or more required functions are missing, incorrectly named or not properly used.",
        1: "Very limited use of functions; most code is placed in one block.",
        0: "No meaningful function structure or no assessable submission."
      }
    },
    {
      id: "inputCleaning",
      title: "2. Input, validation and cleaning",
      shortTitle: "Input, validation and cleaning",
      summary: "Collects a message, rejects blank input and returns a stripped version.",
      levels: {
        4: "The program accepts user input, repeatedly rejects an empty or space-only message, and clean_message() correctly returns message.strip().",
        3: "Input and cleaning work correctly, but empty-message validation is missing or has a minor fault.",
        2: "Input is present, but cleaning or validation is incomplete or unreliable.",
        1: "A fixed message is used, or input handling is very limited.",
        0: "No meaningful input or cleaning."
      }
    },
    {
      id: "counts",
      title: "3. Character counts and vowel function",
      shortTitle: "Character counts and vowels",
      summary: "Calculates all required counts and returns a case-insensitive vowel total.",
      levels: {
        4: "Total characters, characters excluding spaces, spaces and vowels are all calculated correctly. count_vowels() processes the message and works regardless of case.",
        3: "Most counts are correct, with one minor error or missing result.",
        2: "Some counts work, but several are missing or incorrect, or count_vowels() is only partly correct.",
        1: "Very limited character analysis.",
        0: "No meaningful character-counting work."
      }
    },
    {
      id: "stringTechniques",
      title: "4. Indexing, slicing and string searching",
      shortTitle: "Indexing, slicing and searching",
      summary: "Uses indexes, a ten-character slice and a case-insensitive python search.",
      levels: {
        4: "The program correctly stores the first and last characters, creates the first-10-character preview, and checks for python without case sensitivity.",
        3: "All techniques are attempted and mostly correct, with one minor issue or results used directly rather than stored clearly.",
        2: "Some indexing, slicing or searching is correct, but important parts are missing.",
        1: "A single technique is attempted with limited success.",
        0: "No meaningful indexing, slicing or searching."
      }
    },
    {
      id: "classification",
      title: "5. Selection and length classification",
      shortTitle: "Length classification",
      summary: "Returns the correct category at the 20- and 50-character boundaries.",
      levels: {
        4: "get_length_message() correctly applies all boundaries: under 20 Short message, 20–49 Medium message, and 50+ Long message.",
        3: "Classification is mostly correct but has one minor boundary or wording error.",
        2: "Selection is used, but two or more tested boundaries or categories are incorrect.",
        1: "A limited or incomplete selection statement is present.",
        0: "No meaningful classification."
      }
    },
    {
      id: "outputQuality",
      title: "6. Output, readability and reliability",
      shortTitle: "Output and code quality",
      summary: "Runs reliably and displays a complete, clearly labelled f-string summary.",
      levels: {
        4: "The program runs reliably and displays every required result with clear labels and f-strings. Names, indentation and comments make the code easy to follow.",
        3: "The program is readable and output is mostly complete, with only minor omissions or presentation issues.",
        2: "The program partly runs or output is incomplete or unclear; readability or required formatting is inconsistent.",
        1: "The program has major errors or very limited readable output.",
        0: "The program does not perform the assigned task or contains no meaningful assessable output."
      }
    }
  ]
};

function functionDefinition(staticData, name) {
  return (staticData.functionDefinitions || []).find(
    (item) => item.name === name && !item.className
  );
}

function functionResult(test, label) {
  return (test?.functionTests || []).find((item) => item.label === label);
}

function textResultCorrect(result, expected) {
  return Boolean(
    result?.ok && String(result.jsonValue ?? "") === String(expected)
  );
}

function numberResultCorrect(result, expected) {
  return Boolean(
    result?.ok &&
      typeof result.jsonValue === "number" &&
      Number(result.jsonValue) === Number(expected)
  );
}

function sourceHas(source, pattern) {
  return pattern.test(String(source || ""));
}

function labelledValueMatches(output, labelPattern, expected) {
  return String(output || "")
    .split(/\r?\n/)
    .some(
      (line) =>
        labelPattern.test(line) &&
        line.toLowerCase().includes(String(expected ?? "").toLowerCase())
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

    const matches = {
      cleaned: helpers.includesText(output, expected.cleaned),
      preview: labelledValueMatches(output, /\bpreview\b/i, expected.preview),
      first: labelledValueMatches(output, /\bfirst\b/i, expected.first),
      last: labelledValueMatches(output, /\blast\b/i, expected.last),
      total: helpers.hasNumber(output, expected.total),
      withoutSpaces: helpers.hasNumber(output, expected.withoutSpaces),
      vowels: helpers.hasNumber(output, expected.vowels),
      spaces: helpers.hasNumber(output, expected.spaces),
      containsPython:
        lower.includes("contains") && lower.includes("python") && lower.includes("true"),
      category: helpers.includesText(output, expected.category)
    };

    const labels = {
      message: lower.includes("message"),
      preview: lower.includes("preview"),
      first: lower.includes("first"),
      last: lower.includes("last"),
      total: lower.includes("total") || lower.includes("characters:"),
      withoutSpaces:
        lower.includes("without spaces") || lower.includes("excluding spaces"),
      vowels: lower.includes("vowel"),
      spaces: lower.includes("spaces"),
      containsPython: lower.includes("contains") && lower.includes("python"),
      category: lower.includes("category") || lower.includes("length")
    };

    return { ...test, expected, matches, labels };
  });

  const successful = tests.filter((test) => test.ok);
  const fullyCorrect = tests.filter(
    (test) =>
      test.ok &&
      Object.values(test.matches).every(Boolean) &&
      (test.inputsUsed?.length || 0) === Number(test.expected.inputsUsed || 1)
  ).length;

  const names = ["clean_message", "count_vowels", "get_length_message", "main"];
  const definitions = Object.fromEntries(
    names.map((name) => [name, functionDefinition(staticData, name)])
  );
  const definitionCount = names.filter((name) => definitions[name]).length;
  const callSites = staticData.functionCallSites || [];
  const helperNames = ["clean_message", "count_vowels", "get_length_message"];
  const mainCalls = helperNames.filter((name) =>
    callSites.some((site) => site.caller === "main" && site.callee === name)
  );
  const mainCalled = callSites.some(
    (site) => site.caller === "" && site.callee === "main"
  );

  // 1. Program structure and required functions
  let structureScore = 0;
  if (
    definitionCount === 4 &&
    mainCalls.length === 3 &&
    mainCalled &&
    fullyCorrect === assignment.testCases.length
  ) {
    structureScore = 4;
  } else if (definitionCount === 4 && mainCalls.length === 3 && mainCalled) {
    structureScore = 3;
  } else if (definitionCount >= 3 && mainCalls.length >= 2) {
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
        mainCalls.length === 3 ? "pass" : mainCalls.length ? "warn" : "fail",
        `main() calls ${mainCalls.length} of the 3 required helper functions.`
      ),
      helpers.evidence(
        mainCalled ? "pass" : "fail",
        `main() ${mainCalled ? "is called at module level" : "was not clearly called at the end of the program"}.`
      ),
      helpers.evidence(
        fullyCorrect === assignment.testCases.length ? "pass" : "warn",
        `${fullyCorrect} of ${assignment.testCases.length} complete program tests met every required result.`
      )
    ]
  };

  // Direct function evidence shared by later criteria.
  const cleanChecks = [
    textResultCorrect(
      functionResult(tests[0], "clean_message() removes outside spaces"),
      "Python Rules"
    ),
    textResultCorrect(
      functionResult(tests[1], "clean_message() keeps internal spaces"),
      "one two"
    )
  ];

  const vowelChecks = [
    numberResultCorrect(
      functionResult(tests[0], "count_vowels() handles mixed case"),
      6
    ),
    numberResultCorrect(
      functionResult(tests[1], "count_vowels() — no vowels"),
      0
    ),
    numberResultCorrect(
      functionResult(tests[2], "count_vowels() — uppercase vowels"),
      5
    )
  ];

  const classificationChecks = [
    textResultCorrect(
      functionResult(tests[0], "get_length_message() — 19"),
      "Short message"
    ),
    textResultCorrect(
      functionResult(tests[1], "get_length_message() — 20"),
      "Medium message"
    ),
    textResultCorrect(
      functionResult(tests[1], "get_length_message() — 49"),
      "Medium message"
    ),
    textResultCorrect(
      functionResult(tests[2], "get_length_message() — 50"),
      "Long message"
    )
  ];

  // 2. Input, validation and cleaning
  const inputCalls = staticData.inputCalls || 0;
  const usesWhile = (staticData.whileCount || 0) >= 1;
  const stripCalls = staticData.methodCalls?.strip || 0;
  const validationTest = tests[3];
  const validationWorks = Boolean(
    validationTest?.ok &&
      (validationTest.inputsUsed?.length || 0) >= 2 &&
      Object.values(validationTest.matches).every(Boolean)
  );
  const correctCleanChecks = cleanChecks.filter(Boolean).length;

  let inputCleaningScore = 0;
  if (
    definitions.clean_message?.hasReturn &&
    inputCalls >= 1 &&
    usesWhile &&
    stripCalls >= 1 &&
    validationWorks &&
    correctCleanChecks === cleanChecks.length
  ) {
    inputCleaningScore = 4;
  } else if (
    definitions.clean_message?.hasReturn &&
    inputCalls >= 1 &&
    correctCleanChecks >= 2
  ) {
    inputCleaningScore = 3;
  } else if (inputCalls >= 1 && (stripCalls >= 1 || definitions.clean_message)) {
    inputCleaningScore = 2;
  } else if (inputCalls >= 1 || definitions.clean_message) {
    inputCleaningScore = 1;
  }

  criteria.inputCleaning = {
    suggested: inputCleaningScore,
    evidence: [
      helpers.evidence(
        inputCalls >= 1 ? "pass" : "fail",
        `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        definitions.clean_message?.hasReturn ? "pass" : definitions.clean_message ? "warn" : "fail",
        definitions.clean_message?.hasReturn
          ? "clean_message() contains a value-returning return statement."
          : "clean_message() was missing or did not clearly return a value."
      ),
      helpers.evidence(
        correctCleanChecks === cleanChecks.length ? "pass" : correctCleanChecks ? "warn" : "fail",
        `${correctCleanChecks} of ${cleanChecks.length} direct cleaning checks returned the expected text.`
      ),
      helpers.evidence(
        validationWorks ? "pass" : usesWhile ? "warn" : "fail",
        validationWorks
          ? "The program rejected a space-only message and requested another value."
          : "The blank-message validation test did not complete correctly."
      )
    ]
  };

  // 3. Character counts and vowel function
  const correctVowelChecks = vowelChecks.filter(Boolean).length;
  const countMatches = tests.map((test) => ({
    total: test.ok && test.matches.total,
    withoutSpaces: test.ok && test.matches.withoutSpaces,
    vowels: test.ok && test.matches.vowels,
    spaces: test.ok && test.matches.spaces
  }));
  const allFourCountOutputs = countMatches.filter((row) =>
    Object.values(row).every(Boolean)
  ).length;
  const atLeastThreeCountOutputs = countMatches.filter(
    (row) => helpers.countTrue(row) >= 3
  ).length;
  const countFunctionReturns = Boolean(definitions.count_vowels?.hasReturn);

  let countsScore = 0;
  if (
    countFunctionReturns &&
    correctVowelChecks === vowelChecks.length &&
    allFourCountOutputs >= 3
  ) {
    countsScore = 4;
  } else if (
    countFunctionReturns &&
    correctVowelChecks >= 3 &&
    atLeastThreeCountOutputs >= 2
  ) {
    countsScore = 3;
  } else if (
    definitions.count_vowels &&
    (correctVowelChecks >= 1 || atLeastThreeCountOutputs >= 1 || (staticData.printCalls || 0) >= 2)
  ) {
    countsScore = 2;
  } else if (definitions.count_vowels || (staticData.functionCalls?.len || 0) >= 1) {
    countsScore = 1;
  }

  criteria.counts = {
    suggested: countsScore,
    evidence: [
      helpers.evidence(
        countFunctionReturns ? "pass" : definitions.count_vowels ? "warn" : "fail",
        countFunctionReturns
          ? "count_vowels() returns a value."
          : "count_vowels() was missing or did not clearly return its result."
      ),
      helpers.evidence(
        correctVowelChecks === vowelChecks.length ? "pass" : correctVowelChecks ? "warn" : "fail",
        `${correctVowelChecks} of ${vowelChecks.length} direct vowel checks returned the expected total.`
      ),
      helpers.evidence(
        allFourCountOutputs >= 3 ? "pass" : atLeastThreeCountOutputs ? "warn" : "fail",
        `${allFourCountOutputs} test outputs showed all four required counts; ${atLeastThreeCountOutputs} showed at least three.`
      ),
      helpers.evidence(
        (staticData.forCount || 0) >= 1 || sourceHas(source, /\bfor\s+\w+\s+in\s+/)
          ? "pass"
          : "warn",
        (staticData.forCount || 0) >= 1 || sourceHas(source, /\bfor\s+\w+\s+in\s+/)
          ? "Character iteration was detected."
          : "Teacher check: the vowel result may not use a clear character loop."
      )
    ]
  };

  // 4. Indexing, slicing and string searching
  const stringMatches = tests.map((test) => ({
    first: test.ok && test.matches.first,
    last: test.ok && test.matches.last,
    preview: test.ok && test.matches.preview,
    containsPython: test.ok && test.matches.containsPython
  }));
  const completeStringTests = stringMatches.filter((row) =>
    Object.values(row).every(Boolean)
  ).length;
  const partialStringTests = stringMatches.filter(
    (row) => helpers.countTrue(row) >= 2
  ).length;
  const assignedNames = new Set(staticData.assignedNames || []);
  const storedStringResults = [
    ["first_character", "first"],
    ["last_character", "last"],
    ["preview"],
    ["contains_python"]
  ].filter((aliases) => aliases.some((name) => assignedNames.has(name))).length;
  const usesSubscripts = (staticData.subscriptCount || 0) >= 3;
  const usesIn = (staticData.comparisonOperators || []).includes("in");

  let stringScore = 0;
  if (
    completeStringTests === assignment.testCases.length &&
    storedStringResults >= 4 &&
    usesSubscripts &&
    usesIn
  ) {
    stringScore = 4;
  } else if (
    (completeStringTests >= 2 || partialStringTests >= 2) &&
    usesSubscripts &&
    usesIn
  ) {
    stringScore = 3;
  } else if (partialStringTests >= 1 || ((staticData.subscriptCount || 0) >= 2 && usesIn)) {
    stringScore = 2;
  } else if ((staticData.subscriptCount || 0) >= 1 || usesIn) {
    stringScore = 1;
  }

  criteria.stringTechniques = {
    suggested: stringScore,
    evidence: [
      helpers.evidence(
        completeStringTests === assignment.testCases.length ? "pass" : completeStringTests ? "warn" : "fail",
        `${completeStringTests} of ${assignment.testCases.length} tests displayed the correct first character, last character, preview and python check.`
      ),
      helpers.evidence(
        usesSubscripts ? "pass" : (staticData.subscriptCount || 0) ? "warn" : "fail",
        `${staticData.subscriptCount || 0} indexing or slicing operation${(staticData.subscriptCount || 0) === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        usesIn ? "pass" : "fail",
        usesIn ? "The in operator was detected for string searching." : "No in search was detected."
      ),
      helpers.evidence(
        storedStringResults >= 4 ? "pass" : storedStringResults ? "warn" : "warn",
        `${storedStringResults} of 4 expected string-analysis results were clearly stored in named variables.`
      )
    ]
  };

  // 5. Selection and length classification
  const correctClassificationChecks = classificationChecks.filter(Boolean).length;
  const hasSelection =
    (staticData.ifCount || 0) >= 1 &&
    ((staticData.elifCount || 0) >= 1 || (staticData.elseCount || 0) >= 1);

  let classificationScore = 0;
  if (
    definitions.get_length_message?.hasReturn &&
    correctClassificationChecks === classificationChecks.length
  ) {
    classificationScore = 4;
  } else if (
    definitions.get_length_message?.hasReturn &&
    correctClassificationChecks === classificationChecks.length - 1
  ) {
    classificationScore = 3;
  } else if (definitions.get_length_message && correctClassificationChecks >= 2) {
    classificationScore = 2;
  } else if (definitions.get_length_message || hasSelection) {
    classificationScore = 1;
  }

  criteria.classification = {
    suggested: classificationScore,
    evidence: [
      helpers.evidence(
        definitions.get_length_message?.hasReturn
          ? "pass"
          : definitions.get_length_message
            ? "warn"
            : "fail",
        definitions.get_length_message?.hasReturn
          ? "get_length_message() returns a category."
          : "get_length_message() was missing or did not clearly return a category."
      ),
      helpers.evidence(
        correctClassificationChecks === classificationChecks.length
          ? "pass"
          : correctClassificationChecks
            ? "warn"
            : "fail",
        `${correctClassificationChecks} of ${classificationChecks.length} boundary checks returned the expected category.`
      ),
      helpers.evidence(
        hasSelection ? "pass" : "fail",
        hasSelection
          ? "A multi-branch selection structure was detected."
          : "A complete if/elif/else classification was not detected."
      )
    ]
  };

  // 6. Output, readability and reliability
  const allLabels = tests.filter((test) =>
    test.ok && Object.values(test.labels).every(Boolean)
  ).length;
  const fStringCount = (String(source || "").match(/(^|[^A-Za-z0-9_])f["']/g) || []).length;
  const meaningfulCount = staticData.meaningfulNames?.length || 0;
  const printCalls = staticData.printCalls || 0;
  const taskEvidence = definitionCount + (staticData.subscriptCount || 0) + (staticData.inputCalls || 0);

  let outputScore = 0;
  if (
    fullyCorrect === assignment.testCases.length &&
    allLabels === assignment.testCases.length &&
    fStringCount >= 1 &&
    meaningfulCount >= 8
  ) {
    outputScore = 4;
  } else if (
    successful.length === assignment.testCases.length &&
    fullyCorrect >= assignment.testCases.length - 1 &&
    allLabels >= assignment.testCases.length - 1 &&
    fStringCount >= 1
  ) {
    outputScore = 3;
  } else if (
    taskEvidence >= 4 &&
    printCalls >= 4 &&
    (fullyCorrect >= 1 || allLabels >= 2 || meaningfulCount >= 4)
  ) {
    outputScore = 2;
  } else if (taskEvidence >= 2 && printCalls >= 1) {
    outputScore = 1;
  }

  criteria.outputQuality = {
    suggested: outputScore,
    evidence: [
      helpers.evidence(
        fullyCorrect === assignment.testCases.length ? "pass" : fullyCorrect ? "warn" : "fail",
        `${fullyCorrect} of ${assignment.testCases.length} tests displayed every expected result.`
      ),
      helpers.evidence(
        allLabels === assignment.testCases.length ? "pass" : allLabels ? "warn" : "fail",
        `${allLabels} of ${assignment.testCases.length} tests used all required clear labels.`
      ),
      helpers.evidence(
        fStringCount >= 1 ? "pass" : "warn",
        `${fStringCount} f-string${fStringCount === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        meaningfulCount >= 8 ? "pass" : meaningfulCount ? "warn" : "fail",
        `${meaningfulCount} variable name${meaningfulCount === 1 ? " appears" : "s appear"} meaningful by the automatic check.`
      ),
      helpers.evidence(
        "warn",
        "Teacher check: confirm consistent indentation, comments and overall readability."
      )
    ]
  };

  if (definitionCount < 4) {
    reviewFlags.push("One or more required function definitions were not detected.");
  }
  if (!validationWorks) {
    reviewFlags.push("The program did not clearly reject a space-only message and request another value.");
  }
  if (correctVowelChecks < vowelChecks.length) {
    reviewFlags.push("One or more direct count_vowels() checks returned an incorrect value or no value.");
  }
  if (correctClassificationChecks < classificationChecks.length) {
    reviewFlags.push("One or more length-category boundary checks were incorrect.");
  }
  if (fStringCount < 1 && taskEvidence >= 2) {
    reviewFlags.push("No f-string was detected in the output code.");
  }

  const firstStrong =
    tests[0]?.ok && Object.values(tests[0].matches).every(Boolean);
  const changedStrong = tests
    .slice(1, 3)
    .filter((test) => test.ok && Object.values(test.matches).every(Boolean)).length;

  if (firstStrong && changedStrong === 0) {
    reviewFlags.push(
      "Possible hard-coded example output: changed-message tests did not reproduce the first result."
    );
    criteria.structure.suggested = Math.min(criteria.structure.suggested, 2);
    criteria.counts.suggested = Math.min(criteria.counts.suggested, 2);
    criteria.outputQuality.suggested = Math.min(criteria.outputQuality.suggested, 2);
  }

  return helpers.finishAssessment(
    assignment,
    raw,
    criteria,
    reviewFlags
  );
}

export default { ...assignment, assess };
