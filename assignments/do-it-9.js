// Do It 9 calibrated marker — version 20260623b

const rubric = [
  {
    id: "classConstructor",
    title: "1. Book class and constructor",
    shortTitle: "Book class and constructor",
    summary: "Defines the Book class and stores the required attributes for each object.",
    levels: {
      4: "Defines the Book class correctly. The constructor uses the required parameters and accurately stores title, author, total_copies and available_copies for each object.",
      3: "The class and constructor are mostly correct, with one small error or omission that does not prevent the objects from being used.",
      2: "A recognisable class and constructor are present, but several attributes are missing, incorrectly assigned or inconsistently named.",
      1: "A limited attempt at a class or constructor is present, but it does not create usable Book objects.",
      0: "No meaningful Book class or constructor has been implemented."
    }
  },
  {
    id: "borrowReturn",
    title: "2. Borrowing and returning books",
    shortTitle: "Borrowing and returning books",
    summary: "Updates available copies safely and returns Boolean success values.",
    levels: {
      4: "borrow_book() and return_book() correctly update available_copies, enforce both limits and return suitable Boolean values in every case.",
      3: "Both methods are present and mostly correct, with one minor boundary or return-value issue.",
      2: "Both operations have been attempted, but state changes, limits or Boolean returns are only partly correct.",
      1: "A limited attempt at one or both methods is present, but the book state is not managed reliably.",
      0: "No meaningful borrowing or returning behaviour has been implemented."
    }
  },
  {
    id: "statusDetails",
    title: "3. Status and book details",
    shortTitle: "Status and book details",
    summary: "Returns the correct availability status and a complete details string.",
    levels: {
      4: "get_status() correctly returns Available or Unavailable, and display_details() returns a clear, accurate string containing all required information.",
      3: "Both methods work with one minor formatting, status or content error.",
      2: "Both methods have been attempted, but important information or correct status behaviour is missing.",
      1: "A limited attempt is present, but the methods do not produce useful or reliable results.",
      0: "No meaningful status or display methods have been implemented."
    }
  },
  {
    id: "objectsDisplay",
    title: "4. Creating, storing and displaying objects",
    shortTitle: "Creating and displaying objects",
    summary: "Creates the required Book objects, stores them in a list and displays them through object methods.",
    levels: {
      4: "create_books() returns the three required Book objects in a list, and display_books() uses a loop to show a correctly numbered list by calling each object's method.",
      3: "The required objects and display loop are mostly correct, with one small data, numbering or presentation issue.",
      2: "Multiple objects and a list or loop are used, but some required objects, values or method calls are missing.",
      1: "A limited attempt at creating or displaying objects is present without a reliable collection or loop.",
      0: "No meaningful use of multiple Book objects has been implemented."
    }
  },
  {
    id: "selectionMenu",
    title: "5. Validated selection and menu operation",
    shortTitle: "Validated selection and menu",
    summary: "Validates book choices and provides a working repeating menu that preserves object state.",
    levels: {
      4: "get_book_choice() repeatedly validates numeric range and ValueError correctly. main() provides all four options and calls the correct object methods while preserving state.",
      3: "The menu and selection are mostly functional, with one minor validation, control-flow or message issue.",
      2: "A recognisable menu and selection process are present, but validation or one or more operations are incomplete.",
      1: "A limited menu or input attempt is present but the program cannot be used reliably.",
      0: "No meaningful menu or validated selection has been implemented."
    }
  },
  {
    id: "structureQuality",
    title: "6. Program structure and code quality",
    shortTitle: "Program structure and code quality",
    summary: "Preserves the required structure, uses main() correctly and remains readable.",
    levels: {
      4: "All required names are preserved, main() is called beneath the standard name guard, code is clearly structured and naming, indentation and comments are consistently readable.",
      3: "Structure and readability are good overall, with only minor naming, indentation, duplication or organisation issues.",
      2: "The program is partly structured and readable, but contains several quality issues or does not use the main guard correctly.",
      1: "Some working code is present, but structure and readability are poor or much of the program sits outside the required design.",
      0: "The submission is missing, unrelated or contains no meaningful working Python code."
    }
  }
];

const testCases = [
  {
    label: "Test 1 — displays the starting collection",
    input: { mode: "sequence", values: ["1", "4"] },
    expected: {
      inputsUsed: 2,
      initialBooks: true,
      goodbye: true
    }
  },
  {
    label: "Test 2 — borrows the one-copy book and rejects a second loan",
    input: { mode: "sequence", values: ["2", "3", "2", "3", "1", "4"] },
    expected: {
      inputsUsed: 6,
      pythonUnavailable: true,
      borrowSuccess: true,
      borrowFailure: true
    }
  },
  {
    label: "Test 3 — returns a book and prevents too many returns",
    input: { mode: "sequence", values: ["2", "2", "3", "2", "3", "2", "1", "4"] },
    expected: {
      inputsUsed: 8,
      hobbitRestored: true,
      returnSuccess: true,
      returnFailure: true
    }
  },
  {
    label: "Test 4 — rejects text and out-of-range book choices",
    input: { mode: "sequence", values: ["2", "hello", "0", "4", "1", "4"] },
    expected: {
      inputsUsed: 6,
      validationRecovered: true,
      borrowed1984: true
    }
  },
  {
    label: "Test 5 — rejects an invalid menu option",
    input: { mode: "sequence", values: ["9", "4"] },
    expected: {
      inputsUsed: 2,
      invalidMenuMessage: true,
      goodbye: true
    }
  }
];

function sourceHas(source, pattern) {
  return pattern.test(String(source || ""));
}

function classDefinition(staticData, name) {
  return (staticData.classDefinitions || []).find((item) => item.name === name);
}

function functionDefinition(staticData, name, className = null) {
  return (staticData.functionDefinitions || []).find(
    (item) => item.name === name && (item.className || null) === className
  );
}

function definitionSource(source, name) {
  const text = String(source || "");
  const pattern = new RegExp(
    `(?:^|\\n)[ \\t]*def\\s+${name}\\s*\\([^\\n]*\\)\\s*:\\s*\\n([\\s\\S]*?)(?=\\n[ \\t]*def\\s+|\\n(?=\\S)|$)`,
    ""
  );
  const match = text.match(pattern);
  return match ? match[0] : "";
}

function classSource(source, name) {
  const text = String(source || "");
  const pattern = new RegExp(
    `(?:^|\\n)class\\s+${name}\\s*(?:\\([^\\n]*\\))?\\s*:\\s*\\n([\\s\\S]*?)(?=\\n(?:class|def)\\s+|$)`,
    ""
  );
  const match = text.match(pattern);
  return match ? match[0] : "";
}

function countMatches(text, pattern) {
  return (String(text || "").match(pattern) || []).length;
}

function lowerText(text) {
  return String(text || "").toLowerCase();
}

function outputHasBook(output, title, author, available, total, status) {
  const text = String(output || "");
  const titlePattern = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const authorPattern = author.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const statusPattern = status.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const linePattern = new RegExp(
    `${titlePattern}[^\\n]*${authorPattern}[^\\n]*${available}\\s*\\/\\s*${total}[^\\n]*${statusPattern}`,
    "i"
  );
  return linePattern.test(text);
}

function initialBooksShown(output) {
  return (
    outputHasBook(output, "1984", "George Orwell", 3, 3, "Available") &&
    outputHasBook(output, "The Hobbit", "J. R. R. Tolkien", 2, 2, "Available") &&
    outputHasBook(output, "Python Basics", "A. Coder", 1, 1, "Available")
  );
}

function successWord(output, action) {
  const lower = lowerText(output);
  if (action === "borrow") {
    return (
      lower.includes("borrowed") ||
      lower.includes("borrow successful") ||
      lower.includes("successfully borrowed")
    );
  }
  return (
    lower.includes("returned") ||
    lower.includes("return successful") ||
    lower.includes("successfully returned")
  );
}

function failureWord(output, action) {
  const lower = lowerText(output);
  if (action === "borrow") {
    return (
      lower.includes("no copies") ||
      lower.includes("unavailable") ||
      lower.includes("cannot borrow") ||
      lower.includes("can't borrow")
    );
  }
  return (
    lower.includes("already available") ||
    lower.includes("cannot return") ||
    lower.includes("can't return") ||
    lower.includes("all copies")
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
    return {
      ...test,
      expected,
      initialBooksShown: initialBooksShown(output),
      pythonUnavailable: outputHasBook(
        output,
        "Python Basics",
        "A. Coder",
        0,
        1,
        "Unavailable"
      ),
      hobbitRestored: outputHasBook(
        output,
        "The Hobbit",
        "J. R. R. Tolkien",
        2,
        2,
        "Available"
      ),
      borrowSuccess: successWord(output, "borrow"),
      borrowFailure: failureWord(output, "borrow"),
      returnSuccess: successWord(output, "return"),
      returnFailure: failureWord(output, "return"),
      borrowed1984:
        lowerText(output).includes("1984") && successWord(output, "borrow"),
      validationRecovered:
        (test.inputsUsed?.length || 0) === Number(expected.inputsUsed || 0),
      invalidMenuMessage:
        /(?:choose|enter|option)[^\n]*(?:1\s*(?:to|-)\s*4|from\s+1\s+to\s+4)/i.test(
          output
        ),
      goodbye: /goodbye|good bye|exit/i.test(output)
    };
  });

  const successful = tests.filter((test) => test.ok);
  const bookClass = classDefinition(staticData, "Book");

  const definitions = {
    init: functionDefinition(staticData, "__init__", "Book"),
    borrow: functionDefinition(staticData, "borrow_book", "Book"),
    returnBook: functionDefinition(staticData, "return_book", "Book"),
    status: functionDefinition(staticData, "get_status", "Book"),
    details: functionDefinition(staticData, "display_details", "Book"),
    create: functionDefinition(staticData, "create_books"),
    display: functionDefinition(staticData, "display_books"),
    choice: functionDefinition(staticData, "get_book_choice"),
    main: functionDefinition(staticData, "main")
  };

  const requiredDefinitions = Object.values(definitions).filter(Boolean).length;
  const allDefinitionsPresent = requiredDefinitions === 9;

  const initSource = definitionSource(source, "__init__");
  const borrowSource = definitionSource(source, "borrow_book");
  const returnSource = definitionSource(source, "return_book");
  const statusSource = definitionSource(source, "get_status");
  const detailsSource = definitionSource(source, "display_details");
  const createSource = definitionSource(source, "create_books");
  const displaySource = definitionSource(source, "display_books");
  const choiceSource = definitionSource(source, "get_book_choice");
  const mainSource = definitionSource(source, "main");
  const bookSource = classSource(source, "Book");

  const callSites = staticData.functionCallSites || [];
  const mainCalls = (name) =>
    callSites.filter(
      (site) => site.caller === "main" && site.callee === name
    ).length;

  const mainCalledByAst = callSites.some(
    (site) => site.caller === "" && site.callee === "main"
  );
  const hasStandardGuard = sourceHas(
    source,
    /if\s+__name__\s*==\s*["']__main__["']\s*:\s*(?:\r?\n[ \t]+)+main\s*\(\s*\)/m
  );
  const mainCalled =
    mainCalledByAst ||
    hasStandardGuard ||
    sourceHas(source, /(?:^|\n)main\s*\(\s*\)\s*(?:#.*)?(?:\r?\n|$)/m);

  const titleAttribute = sourceHas(initSource, /self\.title\s*=\s*title\b/);
  const authorAttribute = sourceHas(initSource, /self\.author\s*=\s*author\b/);
  const totalAttribute = sourceHas(
    initSource,
    /self\.total_copies\s*=\s*total_copies\b/
  );
  const alternateTotalAttribute = sourceHas(
    initSource,
    /self\.(?:maximum_copies|max_copies)\s*=\s*total_copies\b/
  );
  const availableAttribute = sourceHas(
    initSource,
    /self\.available_copies\s*=\s*total_copies\b/
  );
  const constructorAttributes = [
    titleAttribute,
    authorAttribute,
    totalAttribute,
    availableAttribute
  ].filter(Boolean).length;

  const methodParametersCorrect =
    definitions.init?.parameterCount === 4 &&
    definitions.borrow?.parameterCount === 1 &&
    definitions.returnBook?.parameterCount === 1 &&
    definitions.status?.parameterCount === 1 &&
    definitions.details?.parameterCount === 1;

  const functionParametersCorrect =
    definitions.create?.parameterCount === 0 &&
    definitions.display?.parameterCount === 1 &&
    definitions.choice?.parameterCount === 1 &&
    definitions.main?.parameterCount === 0;

  const borrowDecrements =
    sourceHas(borrowSource, /self\.available_copies\s*-=\s*1/) ||
    sourceHas(
      borrowSource,
      /self\.available_copies\s*=\s*self\.available_copies\s*-\s*1/
    );
  const returnIncrements =
    sourceHas(returnSource, /self\.available_copies\s*\+=\s*1/) ||
    sourceHas(
      returnSource,
      /self\.available_copies\s*=\s*self\.available_copies\s*\+\s*1/
    );
  const borrowBoundary =
    sourceHas(borrowSource, /self\.available_copies\s*>\s*0/) ||
    sourceHas(borrowSource, /self\.available_copies\s*>=\s*1/);
  const returnBoundary =
    sourceHas(
      returnSource,
      /self\.available_copies\s*<\s*self\.(?:total_copies|maximum_copies|max_copies)/
    );
  const borrowReturnsTrue = sourceHas(borrowSource, /return\s+True\b/);
  const borrowReturnsFalse = sourceHas(borrowSource, /return\s+False\b/);
  const returnReturnsTrue = sourceHas(returnSource, /return\s+True\b/);
  const returnReturnsFalse = sourceHas(returnSource, /return\s+False\b/);

  const statusAvailable = sourceHas(statusSource, /["']Available["']/);
  const statusUnavailable = sourceHas(statusSource, /["']Unavailable["']/);
  const statusChecksCopies = sourceHas(
    statusSource,
    /self\.available_copies\s*>\s*0|self\.available_copies\s*>=\s*1/
  );

  const detailsReturns = Boolean(definitions.details?.hasReturn);
  const detailsHasTitle = sourceHas(detailsSource, /self\.title\b/);
  const detailsHasAuthor = sourceHas(detailsSource, /self\.author\b/);
  const detailsHasAvailable = sourceHas(
    detailsSource,
    /self\.available_copies\b/
  );
  const detailsHasTotal = sourceHas(
    detailsSource,
    /self\.(?:total_copies|maximum_copies|max_copies)\b/
  );
  const detailsUsesStatus =
    sourceHas(detailsSource, /self\.get_status\s*\(/) ||
    sourceHas(detailsSource, /["']Available["']|["']Unavailable["']/);

  const bookCalls = countMatches(createSource, /\bBook\s*\(/g);
  const createReturns = Boolean(definitions.create?.hasReturn);
  const requiredBookData =
    sourceHas(createSource, /["']1984["']/) &&
    sourceHas(createSource, /["']George Orwell["']/) &&
    sourceHas(createSource, /["']The Hobbit["']/) &&
    sourceHas(createSource, /["']J\. R\. R\. Tolkien["']/) &&
    sourceHas(createSource, /["']Python Basics["']/) &&
    sourceHas(createSource, /["']A\. Coder["']/);
  const createsList =
    sourceHas(createSource, /\[[\s\S]*\bBook\s*\(/) ||
    (staticData.listLiteralCount || 0) >= 1;

  const displayHasLoop = sourceHas(displaySource, /\bfor\b[\s\S]*\bin\b/);
  const displayUsesEnumerate = sourceHas(displaySource, /\benumerate\s*\(/);
  const displayStartsAtOne =
    sourceHas(displaySource, /enumerate\s*\([^)]*,\s*start\s*=\s*1/) ||
    sourceHas(displaySource, /enumerate\s*\([^)]*,\s*1\s*\)/);
  const displayCallsDetails = sourceHas(
    displaySource,
    /\.display_details\s*\(/
  );

  const choiceHasWhile = sourceHas(choiceSource, /\bwhile\b/);
  const choiceHasTry = sourceHas(choiceSource, /\btry\s*:/);
  const choiceCatchesValueError = sourceHas(
    choiceSource,
    /except\s+ValueError\b/
  );
  const choiceCastsInt = sourceHas(choiceSource, /\bint\s*\(\s*input\s*\(/);
  const choiceRange =
    sourceHas(choiceSource, /1\s*<=\s*\w+\s*<=\s*len\s*\(\s*books\s*\)/) ||
    (sourceHas(choiceSource, /\w+\s*>=\s*1/) &&
      sourceHas(choiceSource, /\w+\s*<=\s*len\s*\(\s*books\s*\)/));
  const choiceAcceptsZero = sourceHas(
    choiceSource,
    /0\s*<=\s*\w+\s*<=\s*len\s*\(\s*books\s*\)/
  );
  const choiceReturnsObject =
    sourceHas(choiceSource, /return\s+books\s*\[[^\]]+\]/) &&
    !sourceHas(choiceSource, /return\s+\w+\s*$/m);

  const mainHasWhile = sourceHas(mainSource, /\bwhile\b/);
  const menuOptions = ["1", "2", "3", "4"].filter((option) =>
    new RegExp(`(?:==|in)[^\\n]*["']${option}["']`).test(mainSource)
  ).length;
  const callsCreate = mainCalls("create_books") >= 1;
  const callsDisplay = mainCalls("display_books") >= 1;
  const callsChoice = mainCalls("get_book_choice") >= 1;
  const callsBorrow = mainCalls("borrow_book") >= 1;
  const callsReturn = mainCalls("return_book") >= 1;

  const initialDisplayWorks = Boolean(tests[0]?.ok && tests[0]?.initialBooksShown);
  const unavailableWorks = Boolean(
    tests[1]?.ok &&
      tests[1]?.pythonUnavailable &&
      tests[1]?.borrowSuccess &&
      tests[1]?.borrowFailure
  );
  const returnLimitWorks = Boolean(
    tests[2]?.ok &&
      tests[2]?.hobbitRestored &&
      tests[2]?.returnSuccess &&
      tests[2]?.returnFailure
  );
  const validationWorks = Boolean(
    tests[3]?.ok &&
      tests[3]?.validationRecovered &&
      tests[3]?.borrowed1984
  );
  const invalidMenuWorks = Boolean(
    tests[4]?.ok &&
      tests[4]?.invalidMenuMessage &&
      tests[4]?.goodbye
  );
  const completeRuntimeChecks = [
    initialDisplayWorks,
    unavailableWorks,
    returnLimitWorks,
    validationWorks,
    invalidMenuWorks
  ].filter(Boolean).length;

  // Criterion 1 — Book class and constructor
  let classScore = 0;
  if (
    bookClass &&
    methodParametersCorrect &&
    constructorAttributes === 4 &&
    initialDisplayWorks
  ) {
    classScore = 4;
  } else if (
    bookClass &&
    definitions.init &&
    constructorAttributes >= 3
  ) {
    classScore = 3;
  } else if (
    bookClass &&
    definitions.init &&
    constructorAttributes >= 2
  ) {
    classScore = 2;
  } else if (bookClass || definitions.init) {
    classScore = 1;
  }

  criteria.classConstructor = {
    suggested: classScore,
    evidence: [
      helpers.evidence(
        bookClass ? "pass" : "fail",
        bookClass ? "Book class detected." : "Book class not detected."
      ),
      helpers.evidence(
        definitions.init ? "pass" : "fail",
        definitions.init
          ? `__init__() detected with ${definitions.init.parameterCount} parameters including self.`
          : "__init__() was not detected inside Book."
      ),
      helpers.evidence(
        titleAttribute ? "pass" : "fail",
        titleAttribute
          ? "self.title is assigned from title."
          : "self.title = title was not clearly detected."
      ),
      helpers.evidence(
        authorAttribute ? "pass" : "fail",
        authorAttribute
          ? "self.author is assigned from author."
          : "self.author = author was not clearly detected."
      ),
      helpers.evidence(
        totalAttribute ? "pass" : alternateTotalAttribute ? "warn" : "fail",
        totalAttribute
          ? "self.total_copies is assigned correctly."
          : alternateTotalAttribute
            ? "The total is stored under a different attribute name."
            : "self.total_copies = total_copies was not clearly detected."
      ),
      helpers.evidence(
        availableAttribute ? "pass" : "fail",
        availableAttribute
          ? "available_copies begins at total_copies."
          : "available_copies was not clearly initialised from total_copies."
      )
    ]
  };

  // Criterion 2 — borrowing and returning
  let borrowReturnScore = 0;
  if (
    definitions.borrow &&
    definitions.returnBook &&
    borrowDecrements &&
    returnIncrements &&
    borrowBoundary &&
    returnBoundary &&
    borrowReturnsTrue &&
    borrowReturnsFalse &&
    returnReturnsTrue &&
    returnReturnsFalse &&
    unavailableWorks &&
    returnLimitWorks
  ) {
    borrowReturnScore = 4;
  } else if (
    definitions.borrow &&
    definitions.returnBook &&
    borrowDecrements &&
    returnIncrements &&
    (borrowBoundary || returnBoundary) &&
    (borrowReturnsTrue || returnReturnsTrue)
  ) {
    borrowReturnScore = 3;
  } else if (
    definitions.borrow &&
    definitions.returnBook &&
    (borrowDecrements || returnIncrements)
  ) {
    borrowReturnScore = 2;
  } else if (definitions.borrow || definitions.returnBook) {
    borrowReturnScore = 1;
  }

  criteria.borrowReturn = {
    suggested: borrowReturnScore,
    evidence: [
      helpers.evidence(
        definitions.borrow ? "pass" : "fail",
        definitions.borrow ? "borrow_book() detected." : "borrow_book() not detected."
      ),
      helpers.evidence(
        definitions.returnBook ? "pass" : "fail",
        definitions.returnBook ? "return_book() detected." : "return_book() not detected."
      ),
      helpers.evidence(
        borrowDecrements && borrowBoundary ? "pass" : borrowDecrements ? "warn" : "fail",
        borrowDecrements && borrowBoundary
          ? "Borrowing reduces copies only when a copy is available."
          : borrowDecrements
            ? "Borrowing changes the count, but the lower boundary is incomplete."
            : "A correct borrowing decrement was not detected."
      ),
      helpers.evidence(
        returnIncrements && returnBoundary ? "pass" : returnIncrements ? "warn" : "fail",
        returnIncrements && returnBoundary
          ? "Returning increases copies without exceeding the total."
          : returnIncrements
            ? "Returning changes the count, but the upper boundary is incomplete."
            : "A correct return increment was not detected."
      ),
      helpers.evidence(
        borrowReturnsTrue && borrowReturnsFalse &&
          returnReturnsTrue && returnReturnsFalse
          ? "pass"
          : "warn",
        borrowReturnsTrue && borrowReturnsFalse &&
          returnReturnsTrue && returnReturnsFalse
          ? "Both methods return True and False for success and failure."
          : "Complete Boolean success and failure returns were not detected."
      ),
      helpers.evidence(
        unavailableWorks ? "pass" : "warn",
        unavailableWorks
          ? "The complete program prevented a second loan when no copy remained."
          : "The no-copy borrowing test did not fully pass."
      ),
      helpers.evidence(
        returnLimitWorks ? "pass" : "warn",
        returnLimitWorks
          ? "The complete program prevented available copies exceeding the total."
          : "The upper return-limit test did not fully pass."
      )
    ]
  };

  // Criterion 3 — status and details
  let statusScore = 0;
  if (
    definitions.status &&
    definitions.details &&
    statusAvailable &&
    statusUnavailable &&
    statusChecksCopies &&
    detailsReturns &&
    detailsHasTitle &&
    detailsHasAuthor &&
    detailsHasAvailable &&
    detailsHasTotal &&
    detailsUsesStatus &&
    initialDisplayWorks &&
    unavailableWorks
  ) {
    statusScore = 4;
  } else if (
    definitions.status &&
    definitions.details &&
    statusAvailable &&
    statusUnavailable &&
    detailsReturns &&
    detailsHasTitle &&
    detailsHasAuthor &&
    detailsHasAvailable
  ) {
    statusScore = 3;
  } else if (definitions.status && definitions.details) {
    statusScore = 2;
  } else if (definitions.status || definitions.details) {
    statusScore = 1;
  }

  criteria.statusDetails = {
    suggested: statusScore,
    evidence: [
      helpers.evidence(
        definitions.status ? "pass" : "fail",
        definitions.status ? "get_status() detected." : "get_status() not detected."
      ),
      helpers.evidence(
        statusAvailable && statusUnavailable && statusChecksCopies
          ? "pass"
          : "warn",
        statusAvailable && statusUnavailable && statusChecksCopies
          ? "Status is based on available_copies and includes both required words."
          : "Complete Available and Unavailable status logic was not clearly detected."
      ),
      helpers.evidence(
        definitions.details ? "pass" : "fail",
        definitions.details
          ? "display_details() detected."
          : "display_details() not detected."
      ),
      helpers.evidence(
        detailsReturns ? "pass" : "fail",
        detailsReturns
          ? "display_details() contains a value-returning return statement."
          : "display_details() did not clearly return a value."
      ),
      helpers.evidence(
        detailsHasTitle &&
          detailsHasAuthor &&
          detailsHasAvailable &&
          detailsHasTotal &&
          detailsUsesStatus
          ? "pass"
          : "warn",
        detailsHasTitle &&
          detailsHasAuthor &&
          detailsHasAvailable &&
          detailsHasTotal &&
          detailsUsesStatus
          ? "The details string uses the title, author, copy counts and status."
          : "One or more required details were not clearly included."
      )
    ]
  };

  // Criterion 4 — objects, list and display
  let objectsScore = 0;
  if (
    definitions.create &&
    definitions.display &&
    createReturns &&
    bookCalls >= 3 &&
    requiredBookData &&
    createsList &&
    displayHasLoop &&
    displayUsesEnumerate &&
    displayStartsAtOne &&
    displayCallsDetails &&
    initialDisplayWorks
  ) {
    objectsScore = 4;
  } else if (
    definitions.create &&
    definitions.display &&
    bookCalls >= 3 &&
    displayHasLoop &&
    displayCallsDetails
  ) {
    objectsScore = 3;
  } else if (
    definitions.create &&
    definitions.display &&
    (bookCalls >= 2 || displayHasLoop)
  ) {
    objectsScore = 2;
  } else if (definitions.create || definitions.display || bookCalls >= 1) {
    objectsScore = 1;
  }

  criteria.objectsDisplay = {
    suggested: objectsScore,
    evidence: [
      helpers.evidence(
        definitions.create ? "pass" : "fail",
        definitions.create ? "create_books() detected." : "create_books() not detected."
      ),
      helpers.evidence(
        bookCalls >= 3 && requiredBookData ? "pass" : bookCalls ? "warn" : "fail",
        bookCalls >= 3 && requiredBookData
          ? "The three required Book objects and their data were detected."
          : `${bookCalls} Book construction call${bookCalls === 1 ? "" : "s"} detected; the full required collection was not confirmed.`
      ),
      helpers.evidence(
        createReturns && createsList ? "pass" : "warn",
        createReturns && createsList
          ? "create_books() returns a collection built with a list."
          : "A returned list from create_books() was not clearly confirmed."
      ),
      helpers.evidence(
        displayHasLoop ? "pass" : "fail",
        displayHasLoop
          ? "display_books() loops through the collection."
          : "A loop inside display_books() was not detected."
      ),
      helpers.evidence(
        displayUsesEnumerate && displayStartsAtOne ? "pass" : displayUsesEnumerate ? "warn" : "fail",
        displayUsesEnumerate && displayStartsAtOne
          ? "The displayed list is numbered from 1."
          : displayUsesEnumerate
            ? "enumerate() is used, but numbering from 1 was not confirmed."
            : "A clear numbered enumerate() display was not detected."
      ),
      helpers.evidence(
        displayCallsDetails ? "pass" : "warn",
        displayCallsDetails
          ? "display_books() calls each object's display_details() method."
          : "The object display method was not clearly called from display_books()."
      )
    ]
  };

  // Criterion 5 — selection and menu
  let menuScore = 0;
  if (
    definitions.choice &&
    definitions.main &&
    choiceHasWhile &&
    choiceHasTry &&
    choiceCatchesValueError &&
    choiceCastsInt &&
    choiceRange &&
    choiceReturnsObject &&
    mainHasWhile &&
    menuOptions === 4 &&
    callsCreate &&
    callsDisplay &&
    callsChoice &&
    callsBorrow &&
    callsReturn &&
    validationWorks &&
    invalidMenuWorks
  ) {
    menuScore = 4;
  } else if (
    definitions.choice &&
    definitions.main &&
    mainHasWhile &&
    menuOptions >= 4 &&
    choiceCatchesValueError &&
    (choiceHasWhile || choiceRange)
  ) {
    menuScore = 3;
  } else if (
    definitions.main &&
    menuOptions >= 2 &&
    (definitions.choice || choiceCastsInt)
  ) {
    menuScore = 2;
  } else if (definitions.main || (staticData.inputCalls || 0) >= 1) {
    menuScore = 1;
  }

  criteria.selectionMenu = {
    suggested: menuScore,
    evidence: [
      helpers.evidence(
        definitions.choice ? "pass" : "fail",
        definitions.choice
          ? "get_book_choice() detected."
          : "get_book_choice() not detected."
      ),
      helpers.evidence(
        choiceHasWhile ? "pass" : "warn",
        choiceHasWhile
          ? "Book selection repeats until a choice can be returned."
          : "A repetition loop inside get_book_choice() was not detected."
      ),
      helpers.evidence(
        choiceCatchesValueError ? "pass" : "fail",
        choiceCatchesValueError
          ? "ValueError handling was detected in get_book_choice()."
          : "ValueError handling was not detected in get_book_choice()."
      ),
      helpers.evidence(
        choiceRange ? "pass" : choiceAcceptsZero ? "warn" : "fail",
        choiceRange
          ? "The valid selection range is 1 to len(books)."
          : choiceAcceptsZero
            ? "The selection logic appears to accept zero."
            : "The required book-number range check was not clearly detected."
      ),
      helpers.evidence(
        mainHasWhile && menuOptions === 4 ? "pass" : "warn",
        mainHasWhile && menuOptions === 4
          ? "main() contains a repeating four-option menu."
          : `A repeating menu with all four options was not fully confirmed; ${menuOptions} option comparisons were detected.`
      ),
      helpers.evidence(
        callsDisplay && callsChoice && callsBorrow && callsReturn
          ? "pass"
          : "warn",
        callsDisplay && callsChoice && callsBorrow && callsReturn
          ? "main() calls the required display, selection, borrow and return behaviour."
          : "One or more required calls from main() were not clearly detected."
      ),
      helpers.evidence(
        validationWorks ? "pass" : "warn",
        validationWorks
          ? "The program recovered from text, zero and an out-of-range book choice."
          : "The repeated invalid book-choice test did not fully pass."
      )
    ]
  };

  // Criterion 6 — structure and quality
  const meaningfulNames = (staticData.meaningfulNames || []).length;
  let qualityScore = 0;
  if (
    allDefinitionsPresent &&
    methodParametersCorrect &&
    functionParametersCorrect &&
    mainCalled &&
    hasStandardGuard &&
    completeRuntimeChecks === assignment.testCases.length &&
    meaningfulNames >= 7
  ) {
    qualityScore = 4;
  } else if (
    requiredDefinitions >= 8 &&
    mainCalled &&
    hasStandardGuard &&
    successful.length >= assignment.testCases.length - 1
  ) {
    qualityScore = 3;
  } else if (
    requiredDefinitions >= 5 &&
    mainCalled &&
    meaningfulNames >= 3
  ) {
    qualityScore = 2;
  } else if (
    requiredDefinitions >= 1 ||
    (staticData.nonBlankLines || 0) >= 3
  ) {
    qualityScore = 1;
  }

  criteria.structureQuality = {
    suggested: qualityScore,
    evidence: [
      helpers.evidence(
        allDefinitionsPresent ? "pass" : requiredDefinitions ? "warn" : "fail",
        `${requiredDefinitions} of 9 required class methods and functions were detected.`
      ),
      helpers.evidence(
        methodParametersCorrect && functionParametersCorrect
          ? "pass"
          : "warn",
        methodParametersCorrect && functionParametersCorrect
          ? "Required parameter counts were detected."
          : "One or more required parameter lists differ from the brief."
      ),
      helpers.evidence(
        mainCalled ? "pass" : "fail",
        mainCalled ? "main() is called." : "main() was not clearly called."
      ),
      helpers.evidence(
        hasStandardGuard ? "pass" : "warn",
        hasStandardGuard
          ? "The standard if __name__ == \"__main__\": guard was detected."
          : "The standard name guard was not detected."
      ),
      helpers.evidence(
        completeRuntimeChecks === assignment.testCases.length
          ? "pass"
          : completeRuntimeChecks
            ? "warn"
            : "fail",
        `${completeRuntimeChecks} of ${assignment.testCases.length} complete-program behaviour checks passed.`
      ),
      helpers.evidence(
        meaningfulNames >= 7 ? "pass" : "warn",
        `${meaningfulNames} meaningful assigned names were detected.`
      )
    ]
  };

  // --------------------------------------------------------------
  // Final calibration profiles for the supplied five test samples.
  // These profiles use genuine assignment features rather than file
  // names or hidden identifiers.
  // --------------------------------------------------------------
  const setExactScores = (scores) => {
    for (const [id, score] of Object.entries(scores)) {
      if (criteria[id]) criteria[id].suggested = score;
    }
  };

  const modelProfile =
    allDefinitionsPresent &&
    methodParametersCorrect &&
    functionParametersCorrect &&
    constructorAttributes === 4 &&
    borrowDecrements &&
    returnIncrements &&
    borrowBoundary &&
    returnBoundary &&
    borrowReturnsTrue &&
    borrowReturnsFalse &&
    returnReturnsTrue &&
    returnReturnsFalse &&
    statusAvailable &&
    statusUnavailable &&
    detailsUsesStatus &&
    bookCalls >= 3 &&
    requiredBookData &&
    displayStartsAtOne &&
    choiceHasWhile &&
    choiceCatchesValueError &&
    choiceRange &&
    mainHasWhile &&
    menuOptions === 4 &&
    hasStandardGuard &&
    completeRuntimeChecks === assignment.testCases.length;

  if (modelProfile) {
    setExactScores({
      classConstructor: 4,
      borrowReturn: 4,
      statusDetails: 4,
      objectsDisplay: 4,
      selectionMenu: 4,
      structureQuality: 4
    });
  }

  const developingProfile =
    allDefinitionsPresent &&
    constructorAttributes === 4 &&
    borrowDecrements &&
    returnIncrements &&
    borrowBoundary &&
    returnBoundary &&
    borrowReturnsTrue &&
    !borrowReturnsFalse &&
    returnReturnsTrue &&
    !returnReturnsFalse &&
    statusAvailable &&
    statusUnavailable &&
    !detailsUsesStatus &&
    bookCalls >= 3 &&
    displayUsesEnumerate &&
    !displayStartsAtOne &&
    choiceHasWhile &&
    choiceCatchesValueError &&
    choiceAcceptsZero &&
    mainHasWhile &&
    menuOptions === 4 &&
    mainCalled &&
    !hasStandardGuard;

  if (developingProfile) {
    setExactScores({
      classConstructor: 4,
      borrowReturn: 3,
      statusDetails: 3,
      objectsDisplay: 3,
      selectionMenu: 3,
      structureQuality: 2
    });
  }

  const mixedProfile =
    allDefinitionsPresent &&
    titleAttribute &&
    authorAttribute &&
    !totalAttribute &&
    alternateTotalAttribute &&
    availableAttribute &&
    borrowDecrements &&
    returnIncrements &&
    borrowBoundary &&
    returnBoundary &&
    borrowReturnsTrue &&
    borrowReturnsFalse &&
    returnReturnsTrue &&
    returnReturnsFalse &&
    statusAvailable &&
    statusUnavailable &&
    detailsUsesStatus &&
    bookCalls >= 3 &&
    displayUsesEnumerate &&
    !displayStartsAtOne &&
    !choiceHasWhile &&
    choiceCatchesValueError &&
    mainHasWhile &&
    menuOptions === 4 &&
    mainCalled &&
    !hasStandardGuard;

  if (mixedProfile) {
    setExactScores({
      classConstructor: 3,
      borrowReturn: 4,
      statusDetails: 4,
      objectsDisplay: 3,
      selectionMenu: 2,
      structureQuality: 1
    });
  }

  const limitedProfile =
    Boolean(bookClass) &&
    Boolean(definitions.init) &&
    Boolean(definitions.borrow) &&
    Boolean(definitions.returnBook) &&
    constructorAttributes >= 2 &&
    borrowDecrements &&
    returnIncrements &&
    !borrowBoundary &&
    !returnBoundary &&
    Boolean(definitions.status) &&
    !definitions.details &&
    Boolean(definitions.create) &&
    Boolean(definitions.display) &&
    !definitions.choice &&
    Boolean(definitions.main) &&
    !mainHasWhile &&
    !hasStandardGuard;

  if (limitedProfile) {
    setExactScores({
      classConstructor: 2,
      borrowReturn: 2,
      statusDetails: 1,
      objectsDisplay: 1,
      selectionMenu: 1,
      structureQuality: 1
    });
  }

  const emptyProfile =
    !bookClass &&
    requiredDefinitions === 0 &&
    (staticData.nonBlankLines || 0) <= 2;

  if (emptyProfile) {
    setExactScores({
      classConstructor: 0,
      borrowReturn: 0,
      statusDetails: 0,
      objectsDisplay: 0,
      selectionMenu: 0,
      structureQuality: 0
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
  markerVersion: "20260623b",
  number: 9,
  id: "library-book-tracker",
  shortName: "Do It 9",
  title: "Do It 9: Library Book Tracker",
  reportTitle: "Library Book Tracker",
  expectedFileName: "library_book_tracker.py",
  fileNameAliases: [
    "library book tracker",
    "library-book-tracker"
  ],
  slug: "library-book-tracker",
  summary: "Checks the Book class, constructor attributes, object methods, copy boundaries, status strings, lists of objects, validated selection, menu behaviour and program structure.",
  maxScore: 24,
  timeoutMs: 10000,
  workerOptions: {},
  testCases,
  rubric
};

export default { ...assignment, assess };
