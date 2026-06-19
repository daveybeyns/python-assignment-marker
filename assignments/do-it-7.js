// Do It 7 calibrated marker — version 20260619h

const rubric = [
  {
    id: "structure",
    title: "1. Program structure and required functions",
    shortTitle: "Program structure and functions",
    summary: "Defines and uses the four required functions with suitable parameters and return values.",
    levels: {
      4: "All four required functions are correctly named and used. Parameters and return values are appropriate. main() controls the complete program and is called correctly.",
      3: "All or most required functions are present and used, with one minor structural, calling or runtime-completion problem.",
      2: "Some function structure is present, but one or more required functions are missing, incorrectly named or not properly used.",
      1: "Very limited use of functions; most code is placed in one block.",
      0: "No meaningful function structure or no assessable submission."
    }
  },
  {
    id: "loading",
    title: "2. Reading and cleaning file contents",
    shortTitle: "Reading and cleaning files",
    summary: "Reads books from a text file, removes newline characters and returns a clean list.",
    levels: {
      4: "load_books() correctly opens the supplied filename in read mode, loops through the file, strips each line, ignores blank lines and returns a clean list.",
      3: "File reading and cleaning are mostly correct, with one minor issue such as keeping blank lines or using a less suitable approach.",
      2: "The file is read, but cleaning, looping, list storage or the returned result is incomplete or unreliable.",
      1: "A limited attempt to read a file is present.",
      0: "No meaningful file-reading work."
    }
  },
  {
    id: "inputValidation",
    title: "3. Input, validation and title cleaning",
    shortTitle: "Input and validation",
    summary: "Collects a new title, removes outside spaces and rejects blank input.",
    levels: {
      4: "The program repeatedly rejects an empty or space-only title and stores a correctly stripped title.",
      3: "Input and title cleaning work correctly, but blank-title validation is missing or has a minor fault.",
      2: "Input is present, but cleaning or validation is incomplete or unreliable.",
      1: "A fixed title is used, or input handling is very limited.",
      0: "No meaningful title input or validation."
    }
  },
  {
    id: "appending",
    title: "4. Appending the new book",
    shortTitle: "Appending without overwriting",
    summary: "Adds the cleaned title to the end of the existing file without deleting its contents.",
    levels: {
      4: "add_book() correctly opens the supplied filename in append mode and writes the cleaned title followed by a newline, preserving all existing books.",
      3: "Appending works and existing data is preserved, with one minor formatting, function-use or reliability issue.",
      2: "The program writes a title to a file, but append mode, newline handling or preservation of existing data is incomplete.",
      1: "A limited file-writing attempt is present but it may overwrite or corrupt existing data.",
      0: "No meaningful attempt to add the new title to the file."
    }
  },
  {
    id: "display",
    title: "5. Reloading, numbering and displaying the list",
    shortTitle: "Reloading and displaying books",
    summary: "Reloads the updated file, numbers every book and displays the correct total.",
    levels: {
      4: "The updated file is reloaded and every clean title is displayed in a clearly numbered list with the correct total.",
      3: "The updated books and total are displayed correctly, with one minor numbering, labelling or reloading issue.",
      2: "Some updated content is displayed, but important titles, numbering, the total or the reload step are missing.",
      1: "Very limited display of the reading-list data.",
      0: "No meaningful updated list output."
    }
  },
  {
    id: "summaryQuality",
    title: "6. Summary file, output and code quality",
    shortTitle: "Summary and code quality",
    summary: "Writes a complete reading_summary.txt file and produces clear, readable and reliable code.",
    levels: {
      4: "write_summary() creates a clear heading, correct total and numbered copy of every book. The program runs reliably with clear messages, meaningful names and consistent formatting.",
      3: "The summary file and program output are mostly complete and the code is readable, with only minor omissions or presentation issues.",
      2: "A summary file is produced, but it is incomplete, unclear or only partly reliable; code quality is inconsistent.",
      1: "A very limited output-file attempt or minimal readable output is present.",
      0: "No meaningful summary file or assessable output quality."
    }
  }
];

const BASE_BOOKS = "The Hobbit\nNoughts & Crosses\nThe Hunger Games\n";

const testCases = [
  {
    label: "Test 1 — adds a normal title",
    input: { mode: "sequence", values: ["The Martian"] },
    files: {
      "books.txt": BASE_BOOKS,
      "load_test.txt": " Dune \n\n1984\n",
      "append_test.txt": "Foundation\n"
    },
    captureFiles: ["books.txt", "reading_summary.txt", "append_test.txt", "direct_summary.txt"],
    functionTests: [
      { label: "load_books() strips and ignores blanks", functionName: "load_books", args: ["load_test.txt"] },
      { label: "add_book() appends without overwriting", functionName: "add_book", args: ["append_test.txt", "Neuromancer"] },
      { label: "write_summary() creates a numbered summary", functionName: "write_summary", args: ["direct_summary.txt", ["Dune", "1984"]] }
    ],
    expected: {
      initialBooks: ["The Hobbit", "Noughts & Crosses", "The Hunger Games"],
      newTitle: "The Martian",
      total: 4,
      inputsUsed: 1,
      loadResult: "['Dune', '1984']"
    }
  },
  {
    label: "Test 2 — rejects a blank title",
    input: { mode: "sequence", values: ["   ", "Project Hail Mary"] },
    files: {
      "books.txt": "Coraline\nThe Maze Runner\n",
      "load_test.txt": "One\nTwo\nThree\n",
      "append_test.txt": "Starter\n"
    },
    captureFiles: ["books.txt", "reading_summary.txt", "append_test.txt", "direct_summary.txt"],
    functionTests: [
      { label: "load_books() returns three clean titles", functionName: "load_books", args: ["load_test.txt"] },
      { label: "add_book() appends a second test title", functionName: "add_book", args: ["append_test.txt", "Added Book"] },
      { label: "write_summary() handles one title", functionName: "write_summary", args: ["direct_summary.txt", ["Solo"]] }
    ],
    expected: {
      initialBooks: ["Coraline", "The Maze Runner"],
      newTitle: "Project Hail Mary",
      total: 3,
      inputsUsed: 2,
      loadResult: "['One', 'Two', 'Three']"
    }
  },
  {
    label: "Test 3 — strips outside spaces from a title",
    input: { mode: "sequence", values: ["  Dune  "] },
    files: {
      "books.txt": "The Book Thief\n",
      "load_test.txt": "  A Wrinkle in Time  \n\n",
      "append_test.txt": "Existing\n"
    },
    captureFiles: ["books.txt", "reading_summary.txt", "append_test.txt", "direct_summary.txt"],
    functionTests: [
      { label: "load_books() cleans one spaced title", functionName: "load_books", args: ["load_test.txt"] },
      { label: "add_book() preserves an existing line", functionName: "add_book", args: ["append_test.txt", "New Line"] },
      { label: "write_summary() handles an empty list", functionName: "write_summary", args: ["direct_summary.txt", []] }
    ],
    expected: {
      initialBooks: ["The Book Thief"],
      newTitle: "Dune",
      total: 2,
      inputsUsed: 1,
      loadResult: "['A Wrinkle in Time']"
    }
  },
  {
    label: "Test 4 — ignores blank lines in the source file",
    input: { mode: "sequence", values: ["1984"] },
    files: {
      "books.txt": "The Hobbit\n\n  Coraline  \n",
      "load_test.txt": "\n  Clean Me  \n\n",
      "append_test.txt": "First\n"
    },
    captureFiles: ["books.txt", "reading_summary.txt", "append_test.txt", "direct_summary.txt"],
    functionTests: [
      { label: "load_books() ignores surrounding blank lines", functionName: "load_books", args: ["load_test.txt"] },
      { label: "add_book() appends after existing data", functionName: "add_book", args: ["append_test.txt", "Second"] },
      { label: "write_summary() writes three titles", functionName: "write_summary", args: ["direct_summary.txt", ["A", "B", "C"]] }
    ],
    expected: {
      initialBooks: ["The Hobbit", "Coraline"],
      newTitle: "1984",
      total: 3,
      inputsUsed: 1,
      loadResult: "['Clean Me']"
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

function normaliseLines(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function fileContainsAll(text, values) {
  const lower = String(text || "").toLowerCase();
  return values.every((value) => lower.includes(String(value).toLowerCase()));
}

function cleanBookLines(text) {
  return String(text || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function loadResultCorrect(result, expectedRepr) {
  return Boolean(
    result?.ok &&
      result.valueType === "list" &&
      String(result.value || "") === String(expectedRepr)
  );
}

function numberedTitlesIn(text, books) {
  const lines = normaliseLines(text);

  return books.every((book, index) => {
    const escapedBook = book.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`^${index + 1}\\s*[.):-]\\s*${escapedBook}$`, "i");
    return lines.some((line) => pattern.test(line));
  });
}

function summaryFileComplete(text, books, total) {
  const lower = String(text || "").toLowerCase();

  return (
    lower.includes("summary") &&
    lower.includes("total") &&
    lower.includes(String(total)) &&
    fileContainsAll(text, books) &&
    numberedTitlesIn(text, books)
  );
}

function assess(raw, helpers, source, assignment) {
  const staticData = raw.static || {};
  const reviewFlags = [];
  const criteria = {};

  helpers.addGeneralReviewFlags(raw, reviewFlags);

  const tests = (raw.tests || []).map((test, index) => {
    const expected = assignment.testCases[index]?.expected || {};
    const updatedBooks = [...(expected.initialBooks || []), expected.newTitle];
    const output = test.output || "";
    const booksFile = test.files?.["books.txt"] || "";
    const summaryFile = test.files?.["reading_summary.txt"] || "";
    const appendFile = test.files?.["append_test.txt"] || "";
    const directSummary = test.files?.["direct_summary.txt"] || "";
    const loadCheck = functionResult(
      test,
      assignment.testCases[index]?.functionTests?.[0]?.label
    );

    const outputHasBooks = fileContainsAll(output, updatedBooks);
    const outputHasTotal =
      helpers.hasNumber(output, expected.total) && /total/i.test(output);
    const outputNumbered = numberedTitlesIn(output, updatedBooks);
    const appendedBooks = cleanBookLines(booksFile);
    const mainAppendCorrect =
      appendedBooks.length === expected.total &&
      updatedBooks.every((book, bookIndex) => appendedBooks[bookIndex] === book);
    const summaryCorrect = summaryFileComplete(
      summaryFile,
      updatedBooks,
      expected.total
    );

    return {
      ...test,
      expected,
      updatedBooks,
      outputHasBooks,
      outputHasTotal,
      outputNumbered,
      mainAppendCorrect,
      summaryCorrect,
      loadCheckCorrect: loadResultCorrect(loadCheck, expected.loadResult),
      appendDirectCorrect:
        cleanBookLines(appendFile).length === 2 &&
        cleanBookLines(appendFile)[1] ===
          assignment.testCases[index]?.functionTests?.[1]?.args?.[1],
      directSummaryUseful:
        /summary/i.test(directSummary) && /total/i.test(directSummary)
    };
  });

  const successful = tests.filter((test) => test.ok);
  const names = ["load_books", "add_book", "write_summary", "main"];
  const definitions = Object.fromEntries(
    names.map((name) => [name, functionDefinition(staticData, name)])
  );
  const definitionCount = names.filter((name) => definitions[name]).length;
  const callSites = staticData.functionCallSites || [];
  const mainCalls = (name) =>
    callSites.filter(
      (site) => site.caller === "main" && site.callee === name
    ).length;
  const mainCalled = callSites.some(
    (site) => site.caller === "" && site.callee === "main"
  );
  const completeProgramTests = tests.filter(
    (test) =>
      test.ok &&
      test.mainAppendCorrect &&
      test.outputHasBooks &&
      test.outputHasTotal &&
      test.outputNumbered &&
      test.summaryCorrect &&
      (test.inputsUsed?.length || 0) ===
        Number(test.expected.inputsUsed || 1)
  ).length;

  let structureScore = 0;

  if (
    definitionCount === 4 &&
    definitions.load_books?.parameterCount === 1 &&
    definitions.add_book?.parameterCount === 2 &&
    definitions.write_summary?.parameterCount === 2 &&
    definitions.main?.parameterCount === 0 &&
    definitions.load_books?.hasReturn &&
    mainCalls("load_books") >= 2 &&
    mainCalls("add_book") >= 1 &&
    mainCalls("write_summary") >= 1 &&
    mainCalled &&
    completeProgramTests === assignment.testCases.length
  ) {
    structureScore = 4;
  } else if (
    definitionCount === 4 &&
    mainCalls("load_books") >= 1 &&
    mainCalls("add_book") >= 1 &&
    mainCalls("write_summary") >= 1 &&
    mainCalled
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
        definitions.load_books?.hasReturn ? "pass" : "fail",
        definitions.load_books?.hasReturn
          ? "load_books() contains a value-returning return statement."
          : "load_books() did not clearly return a value."
      ),
      helpers.evidence(
        mainCalled ? "pass" : "fail",
        `main() ${
          mainCalled
            ? "is called at module level"
            : "was not clearly called at the end of the program"
        }.`
      ),
      helpers.evidence(
        completeProgramTests === assignment.testCases.length
          ? "pass"
          : "warn",
        `${completeProgramTests} of ${assignment.testCases.length} complete program tests met every major requirement.`
      )
    ]
  };

  const loadChecksCorrect = tests.filter(
    (test) => test.loadCheckCorrect
  ).length;
  const usesReadMode = (staticData.fileModes || []).some((mode) =>
    String(mode).includes("r")
  );
  const stripCalls = staticData.methodCalls?.strip || 0;
  const loadHasLoop = Boolean(
    definitions.load_books &&
      /def\s+load_books[\s\S]*?for\s+/i.test(String(source || ""))
  );
  const ignoresBlank =
    /if\s+\w+\s*:/i.test(String(source || "")) ||
    /if\s+.*strip/i.test(String(source || ""));

  let loadingScore = 0;

  if (
    definitions.load_books?.hasReturn &&
    usesReadMode &&
    stripCalls >= 1 &&
    loadHasLoop &&
    ignoresBlank &&
    loadChecksCorrect === assignment.testCases.length
  ) {
    loadingScore = 4;
  } else if (
    definitions.load_books?.hasReturn &&
    usesReadMode &&
    stripCalls >= 1 &&
    loadChecksCorrect >= assignment.testCases.length - 1
  ) {
    loadingScore = 3;
  } else if (
    (staticData.openCalls || 0) >= 1 &&
    (usesReadMode || /\.read\s*\(/i.test(source))
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
        `${usesReadMode ? "Read mode detected" : "No clear read-mode open detected"}.`
      ),
      helpers.evidence(
        stripCalls >= 1 ? "pass" : "fail",
        `${stripCalls} strip() call${stripCalls === 1 ? "" : "s"} detected.`
      ),
      helpers.evidence(
        loadHasLoop ? "pass" : "warn",
        loadHasLoop
          ? "load_books() loops through file data."
          : "A loop inside load_books() was not clearly detected."
      ),
      helpers.evidence(
        loadChecksCorrect === assignment.testCases.length
          ? "pass"
          : loadChecksCorrect
            ? "warn"
            : "fail",
        `${loadChecksCorrect} of ${assignment.testCases.length} direct load_books() checks returned the expected clean list.`
      )
    ]
  };

  const inputCalls = staticData.inputCalls || 0;
  const usesWhile = (staticData.whileCount || 0) >= 1;
  const validationTest = tests[1];
  const validationWorks = Boolean(
    validationTest?.ok &&
      (validationTest.inputsUsed?.length || 0) >= 2 &&
      validationTest.mainAppendCorrect
  );
  const cleanTitleRuns = tests.filter(
    (test) => test.mainAppendCorrect
  ).length;
  const allTitlesCleaned =
    cleanTitleRuns === assignment.testCases.length;

  let inputScore = 0;

  if (
    inputCalls >= 1 &&
    usesWhile &&
    stripCalls >= 1 &&
    validationWorks &&
    allTitlesCleaned
  ) {
    inputScore = 4;
  } else if (
    inputCalls >= 1 &&
    stripCalls >= 1 &&
    cleanTitleRuns >= assignment.testCases.length - 1
  ) {
    inputScore = 3;
  } else if (
    inputCalls >= 1 &&
    (stripCalls >= 1 || (staticData.ifCount || 0) >= 1)
  ) {
    inputScore = 2;
  } else if (inputCalls >= 1 || /input\s*\(/i.test(source)) {
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
        stripCalls >= 1 ? "pass" : "warn",
        stripCalls >= 1
          ? "strip() is used to clean text."
          : "No strip() call was detected."
      ),
      helpers.evidence(
        validationWorks ? "pass" : usesWhile ? "warn" : "fail",
        validationWorks
          ? "The program rejected a space-only title and requested another value."
          : "The blank-title validation test did not complete correctly."
      ),
      helpers.evidence(
        allTitlesCleaned ? "pass" : "warn",
        allTitlesCleaned
          ? "Test titles were appended without unwanted outside spaces."
          : "One or more test titles were not stored cleanly."
      )
    ]
  };

  const usesAppendMode = (staticData.fileModes || []).some((mode) =>
    String(mode).includes("a")
  );
  const directAppendCorrect = tests.filter(
    (test) => test.appendDirectCorrect
  ).length;
  const mainAppendCorrect = tests.filter(
    (test) => test.mainAppendCorrect
  ).length;
  const writesNewline =
    /write\s*\([^\n]*["']\\n["']/i.test(String(source || "")) ||
    /\+\s*["']\\n["']/i.test(String(source || ""));

  let appendScore = 0;

  if (
    definitions.add_book &&
    usesAppendMode &&
    writesNewline &&
    directAppendCorrect === assignment.testCases.length &&
    mainAppendCorrect === assignment.testCases.length
  ) {
    appendScore = 4;
  } else if (
    usesAppendMode &&
    directAppendCorrect >= assignment.testCases.length - 1 &&
    mainAppendCorrect >= assignment.testCases.length - 1
  ) {
    appendScore = 3;
  } else if (
    (staticData.openCalls || 0) >= 1 &&
    (staticData.methodCalls?.write || 0) >= 1
  ) {
    appendScore = 2;
  } else if (
    (staticData.openCalls || 0) >= 1 ||
    (staticData.methodCalls?.write || 0) >= 1
  ) {
    appendScore = 1;
  }

  criteria.appending = {
    suggested: appendScore,
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
          ? "A newline is written after the added title."
          : "A clear newline write was not detected."
      ),
      helpers.evidence(
        directAppendCorrect === assignment.testCases.length
          ? "pass"
          : directAppendCorrect
            ? "warn"
            : "fail",
        `${directAppendCorrect} of ${assignment.testCases.length} direct add_book() checks preserved the original line and appended the new title.`
      ),
      helpers.evidence(
        mainAppendCorrect === assignment.testCases.length
          ? "pass"
          : mainAppendCorrect
            ? "warn"
            : "fail",
        `${mainAppendCorrect} of ${assignment.testCases.length} complete runs produced the correct updated books.txt file.`
      )
    ]
  };

  const outputBooksCorrect = tests.filter(
    (test) => test.outputHasBooks
  ).length;
  const outputTotalsCorrect = tests.filter(
    (test) => test.outputHasTotal
  ).length;
  const numberedCorrect = tests.filter(
    (test) => test.outputNumbered
  ).length;
  const reloadDetected = mainCalls("load_books") >= 2;

  let displayScore = 0;

  if (
    reloadDetected &&
    outputBooksCorrect === assignment.testCases.length &&
    outputTotalsCorrect === assignment.testCases.length &&
    numberedCorrect === assignment.testCases.length
  ) {
    displayScore = 4;
  } else if (
    outputBooksCorrect >= assignment.testCases.length - 1 &&
    outputTotalsCorrect >= assignment.testCases.length - 1
  ) {
    displayScore = 3;
  } else if (outputBooksCorrect >= 1 || outputTotalsCorrect >= 1) {
    displayScore = 2;
  } else if ((staticData.printCalls || 0) >= 1) {
    displayScore = 1;
  }

  criteria.display = {
    suggested: displayScore,
    evidence: [
      helpers.evidence(
        reloadDetected ? "pass" : "warn",
        reloadDetected
          ? "main() calls load_books() at least twice, supporting a genuine reload."
          : "A clear reload after appending was not detected."
      ),
      helpers.evidence(
        outputBooksCorrect === assignment.testCases.length
          ? "pass"
          : outputBooksCorrect
            ? "warn"
            : "fail",
        `${outputBooksCorrect} of ${assignment.testCases.length} outputs included every expected book.`
      ),
      helpers.evidence(
        numberedCorrect === assignment.testCases.length
          ? "pass"
          : numberedCorrect
            ? "warn"
            : "fail",
        `${numberedCorrect} of ${assignment.testCases.length} outputs showed a correctly numbered updated list.`
      ),
      helpers.evidence(
        outputTotalsCorrect === assignment.testCases.length
          ? "pass"
          : outputTotalsCorrect
            ? "warn"
            : "fail",
        `${outputTotalsCorrect} of ${assignment.testCases.length} outputs showed the correct labelled total.`
      )
    ]
  };

  const summariesCorrect = tests.filter(
    (test) => test.summaryCorrect
  ).length;
  const directSummariesUseful = tests.filter(
    (test) => test.directSummaryUseful
  ).length;
  const directSummariesWithContent = tests.filter((test) =>
    String(test.files?.["direct_summary.txt"] || "").trim()
  ).length;
  const usesWriteMode = (staticData.fileModes || []).some((mode) =>
    String(mode).includes("w")
  );
  const meaningfulNames = (staticData.meaningfulNames || []).length;
  const usesFString = /f["'][^"'\n]*\{/i.test(String(source || ""));

  let summaryScore = 0;

  if (
    definitions.write_summary &&
    usesWriteMode &&
    summariesCorrect === assignment.testCases.length &&
    directSummariesUseful === assignment.testCases.length &&
    successful.length === assignment.testCases.length &&
    meaningfulNames >= 5 &&
    usesFString
  ) {
    summaryScore = 4;
  } else if (
    definitions.write_summary &&
    summariesCorrect >= assignment.testCases.length - 1 &&
    successful.length >= assignment.testCases.length - 1
  ) {
    summaryScore = 3;
  } else if (
    usesWriteMode &&
    (
      summariesCorrect >= 1 ||
      directSummariesUseful >= 1 ||
      (definitions.write_summary && directSummariesWithContent >= 1)
    )
  ) {
    summaryScore = 2;
  } else if (
    usesWriteMode ||
    /summary/i.test(String(source || ""))
  ) {
    summaryScore = 1;
  }

  criteria.summaryQuality = {
    suggested: summaryScore,
    evidence: [
      helpers.evidence(
        usesWriteMode ? "pass" : "fail",
        usesWriteMode
          ? "Write mode was detected for an output file."
          : "No clear write-mode output file was detected."
      ),
      helpers.evidence(
        summariesCorrect === assignment.testCases.length
          ? "pass"
          : summariesCorrect
            ? "warn"
            : "fail",
        `${summariesCorrect} of ${assignment.testCases.length} complete runs created a full reading_summary.txt file.`
      ),
      helpers.evidence(
        directSummariesUseful === assignment.testCases.length
          ? "pass"
          : directSummariesUseful
            ? "warn"
            : "fail",
        `${directSummariesUseful} of ${assignment.testCases.length} direct write_summary() checks produced a recognisable summary.`
      ),
      helpers.evidence(
        meaningfulNames >= 5 ? "pass" : "warn",
        `${meaningfulNames} meaningful variable or function-related names were detected.`
      ),
      helpers.evidence(
        usesFString ? "pass" : "warn",
        usesFString
          ? "f-string formatting was detected."
          : "No f-string formatting was detected."
      )
    ]
  };

  return helpers.finishAssessment(
    assignment,
    raw,
    criteria,
    reviewFlags
  );
}

const assignment = {
  enabled: true,
  markerVersion: "20260619h",
  number: 7,
  id: "reading-list-manager",
  shortName: "Do It 7",
  title: "Do It 7: Reading List Manager",
  reportTitle: "Reading List Manager",
  expectedFileName: "reading_list_manager.py",
  fileNameAliases: [
    "reading list manager",
    "reading-list-manager"
  ],
  slug: "reading-list-manager",
  summary: "Checks file reading, line cleaning, validation, append mode, reloading, numbered output, summary-file writing and required functions.",
  maxScore: 24,
  workerOptions: {
    allowOpen: true
  },
  testCases,
  rubric
};

export default { ...assignment, assess };
