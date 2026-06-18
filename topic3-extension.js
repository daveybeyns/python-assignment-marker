"use strict";

/*
  Topic 3 extension for the existing Python Assignment Marker.
  This leaves the working Topic 1 and Topic 2 marker unchanged.
*/

ASSIGNMENTS["savings-tracker"] = {
  id: "savings-tracker",
  shortName: "Do It 3",
  title: "Do It 3: Savings Tracker Program",
  reportTitle: "Savings Tracker Program",
  expectedFileName: "savings_tracker.py",
  slug: "savings-tracker",
  summary: "Checks input and casting, for/range, while repetition, running totals and clear weekly output.",
  maxScore: 24,
  testCases: [
    {
      label: "Test 1 — £10 for 5 weeks",
      values: { inputs: ["10", "5", "no"] },
      expected: { plans: [{ weekly: 10, weeks: 5 }] }
    },
    {
      label: "Test 2 — £7.50 for 4 weeks",
      values: { inputs: ["7.5", "4", "no"] },
      expected: { plans: [{ weekly: 7.5, weeks: 4 }] }
    },
    {
      label: "Test 3 — repeat with two savings plans",
      values: { inputs: ["5", "2", "yes", "3", "3", "no"] },
      expected: {
        plans: [
          { weekly: 5, weeks: 2 },
          { weekly: 3, weeks: 3 }
        ]
      }
    }
  ],
  rubric: [
    {
      id: "operation",
      title: "1. Program operation",
      shortTitle: "Program operation",
      summary: "Runs correctly, repeats when requested and closes normally.",
      levels: { 4: "The complete program runs correctly for suitable test values, repeats when requested and closes correctly.", 3: "The program mostly works, with only a minor error or omission.", 2: "The program runs partly but contains errors affecting several results or repetitions.", 1: "A limited attempt runs, but the main program does not work correctly.", 0: "No working program submitted." }
    },
    {
      id: "inputCasting",
      title: "2. User input and casting",
      shortTitle: "User input and casting",
      summary: "Collects weekly saving, weeks and repeat choice using suitable casting.",
      levels: { 4: "Weekly saving, number of weeks and repeat response are requested clearly; numeric inputs use suitable casting.", 3: "All required inputs are present, with a minor prompt or data-type issue.", 2: "Inputs are present but one required input or conversion is missing or unsuitable.", 1: "Limited use of input() with major errors.", 0: "No meaningful user input." }
    },
    {
      id: "forRange",
      title: "3. for loop and range()",
      shortTitle: "for loop and range()",
      summary: "Repeats once for each week and produces correct week numbers.",
      levels: { 4: "A correct for loop and range() repeat exactly once for each week and produce correct week numbers.", 3: "A suitable for loop is used with a minor range or week-number issue.", 2: "A for loop is present but repetitions are not reliably correct.", 1: "A limited or incomplete attempt at a for loop.", 0: "No meaningful for loop." }
    },
    {
      id: "whileRepeat",
      title: "4. while loop and repetition",
      shortTitle: "while loop and repetition",
      summary: "Repeats the whole tracker for another savings plan.",
      levels: { 4: "A correct while loop repeats the whole savings tracker when the user enters yes and stops for no.", 3: "The while loop mostly works, with a minor response-handling or placement issue.", 2: "A while loop is present but does not reliably repeat or stop correctly.", 1: "A limited or incomplete attempt at a while loop.", 0: "No meaningful while loop." }
    },
    {
      id: "runningTotal",
      title: "5. Running total and correct results",
      shortTitle: "Running total and results",
      summary: "Resets and updates the total correctly for every savings plan.",
      levels: { 4: "The total resets for each plan, updates accurately each week and produces correct final results for all tests.", 3: "The running total is mostly correct, with one minor calculation or reset issue.", 2: "A total variable is used but some weekly or final results are incorrect.", 1: "Limited attempt to calculate a running total.", 0: "No meaningful running total." }
    },
    {
      id: "output",
      title: "6. Output and code quality",
      shortTitle: "Output and code quality",
      summary: "Displays clear weekly and final results using readable code.",
      levels: { 4: "Output is clear and well formatted; indentation, variable names and code organisation are consistently appropriate.", 3: "Output and code are clear, with only minor formatting or organisation issues.", 2: "Output is understandable but inconsistent; code quality or indentation needs improvement.", 1: "Output is difficult to understand or code is poorly organised.", 0: "No meaningful output or readable code." }
    }
  ]
};

function assessSavingsTracker(raw) {
  const assignment = getAssignment("savings-tracker");
  const tests = raw.tests || [];
  const successful = successfulTests(raw);
  const staticData = raw.static || {};
  const reviewFlags = [];
  const criteria = {};

  addGeneralReviewFlags(raw, reviewFlags);

  const completedCount = successful.length;
  const correctFinalCount = tests.filter(
    (test) => test.ok && test.matches?.finalTotals
  ).length;
  const correctProgressCount = tests.filter(
    (test) => test.ok && test.matches?.weeklyProgress
  ).length;
  const closingCount = tests.filter(
    (test) => test.ok && test.matches?.closing
  ).length;
  const fullyCorrectCount = tests.filter(
    (test) =>
      test.ok &&
      test.matches?.allInputsUsed &&
      test.matches?.weeklyProgress &&
      test.matches?.finalTotals &&
      test.matches?.closing &&
      test.matches?.repeatWorked &&
      test.matches?.resetWorked
  ).length;

  const repeatTest = tests[2];
  const repeatCorrect = Boolean(
    repeatTest?.ok &&
    repeatTest.matches?.allInputsUsed &&
    repeatTest.matches?.repeatWorked
  );
  const resetCorrect = Boolean(
    repeatTest?.ok &&
    repeatTest.matches?.resetWorked &&
    repeatTest.matches?.finalTotals
  );

  let operationScore = 0;
  const operationEvidence = [];

  if (!raw.syntax?.ok) {
    operationEvidence.push(
      evidence("fail", `Syntax error: ${raw.syntax?.error || "Python could not parse the file."}`)
    );
  } else if (raw.policy && !raw.policy.safe) {
    operationScore = 1;
    operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
    operationEvidence.push(
      evidence("warn", "Automatic execution was skipped because unsupported or suspicious code was detected.")
    );
  } else if (raw.timedOut) {
    operationScore = 1;
    operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
    operationEvidence.push(evidence("fail", "The program did not finish within the time limit."));
  } else if (
    completedCount === assignment.testCases.length &&
    fullyCorrectCount === assignment.testCases.length
  ) {
    operationScore = 4;
    operationEvidence.push(evidence("pass", "All three automated tests completed correctly."));
    operationEvidence.push(
      evidence("pass", "The program handled a repeated second savings plan and then closed.")
    );
  } else if (
    completedCount === assignment.testCases.length &&
    correctFinalCount === assignment.testCases.length
  ) {
    operationScore = 3;
    operationEvidence.push(evidence("pass", "All automated tests ran to completion."));
    operationEvidence.push(
      evidence("warn", "A minor weekly-output, repeat or closing-message requirement was not fully demonstrated.")
    );
  } else if (completedCount >= 1) {
    operationScore = 2;
    operationEvidence.push(
      evidence("pass", `${completedCount} of ${assignment.testCases.length} automated tests completed.`)
    );
    operationEvidence.push(
      evidence("fail", "The program did not complete every required test correctly.")
    );
  } else {
    operationScore = 1;
    operationEvidence.push(evidence("pass", "The file contains valid Python syntax."));
    operationEvidence.push(evidence("fail", "The program could not complete an automated test."));
  }
  criteria.operation = { suggested: operationScore, evidence: operationEvidence };

  const inputCalls = staticData.inputCalls || 0;
  const promptedInputs = staticData.promptedInputs || 0;
  const castCalls = staticData.castCalls || {};
  const hasFloat = (castCalls.float || 0) >= 1;
  const hasInt = (castCalls.int || 0) >= 1;
  const minimumInputsUsed = successful.length
    ? Math.min(...successful.map((test) => test.inputsUsed?.length || 0))
    : 0;

  let inputScore = 0;
  if (
    inputCalls >= 3 &&
    promptedInputs >= 3 &&
    hasFloat &&
    hasInt &&
    minimumInputsUsed >= 3
  ) inputScore = 4;
  else if (inputCalls >= 3 && hasFloat && hasInt) inputScore = 3;
  else if (inputCalls >= 2 && (hasFloat || hasInt)) inputScore = 2;
  else if (inputCalls >= 1) inputScore = 1;

  criteria.inputCasting = {
    suggested: inputScore,
    evidence: [
      evidence(
        inputCalls >= 3 ? "pass" : inputCalls > 0 ? "warn" : "fail",
        `${inputCalls} input() call${inputCalls === 1 ? "" : "s"} detected.`
      ),
      evidence(
        promptedInputs >= 3 ? "pass" : promptedInputs > 0 ? "warn" : "fail",
        `${promptedInputs} input call${promptedInputs === 1 ? " has" : "s have"} a visible prompt.`
      ),
      evidence(hasFloat ? "pass" : "fail", `float() casting for the weekly saving amount ${hasFloat ? "detected." : "not detected."}`),
      evidence(hasInt ? "pass" : "fail", `int() casting for the number of weeks ${hasInt ? "detected." : "not detected."}`)
    ]
  };

  const forCount = staticData.forCount || 0;
  const rangeCalls = staticData.rangeCalls || 0;
  const forInsideWhile = staticData.forInsideWhile || 0;

  let forScore = 0;
  if (
    forCount >= 1 &&
    rangeCalls >= 1 &&
    forInsideWhile >= 1 &&
    correctProgressCount === assignment.testCases.length
  ) forScore = 4;
  else if (
    forCount >= 1 &&
    rangeCalls >= 1 &&
    correctProgressCount >= 2
  ) forScore = 3;
  else if (forCount >= 1 && rangeCalls >= 1) forScore = 2;
  else if (forCount >= 1) forScore = 1;

  criteria.forRange = {
    suggested: forScore,
    evidence: [
      evidence(forCount >= 1 ? "pass" : "fail", `${forCount} for loop${forCount === 1 ? "" : "s"} detected.`),
      evidence(rangeCalls >= 1 ? "pass" : "fail", `${rangeCalls} range() call${rangeCalls === 1 ? "" : "s"} detected.`),
      evidence(
        forInsideWhile >= 1 ? "pass" : forCount >= 1 ? "warn" : "fail",
        forInsideWhile >= 1
          ? "The for loop is placed inside the repeating while loop."
          : "The required for loop was not clearly placed inside the while loop."
      ),
      evidence(
        correctProgressCount === assignment.testCases.length
          ? "pass"
          : correctProgressCount > 0
            ? "warn"
            : "fail",
        `${correctProgressCount} of ${assignment.testCases.length} tests displayed the expected week numbers and cumulative totals.`
      )
    ]
  };

  const whileCount = staticData.whileCount || 0;
  const repeatUpdates = staticData.repeatUpdates || 0;

  let whileScore = 0;
  if (whileCount >= 1 && repeatUpdates >= 1 && repeatCorrect && closingCount === tests.length) {
    whileScore = 4;
  } else if (whileCount >= 1 && repeatCorrect) {
    whileScore = 3;
  } else if (whileCount >= 1) {
    whileScore = 2;
  } else if ((staticData.comparisonCount || 0) > 0) {
    whileScore = 1;
  }

  criteria.whileRepeat = {
    suggested: whileScore,
    evidence: [
      evidence(whileCount >= 1 ? "pass" : "fail", `${whileCount} while loop${whileCount === 1 ? "" : "s"} detected.`),
      evidence(
        repeatUpdates >= 1 ? "pass" : whileCount >= 1 ? "warn" : "fail",
        repeatUpdates >= 1
          ? "A repeat-control variable is updated using input() inside the while loop."
          : "The repeat response was not clearly updated inside the while loop."
      ),
      evidence(
        repeatCorrect ? "pass" : "fail",
        repeatCorrect
          ? "The two-plan test consumed both sets of values and completed both plans."
          : "The program did not reliably complete a second savings plan when yes was supplied."
      ),
      evidence(
        closingCount === tests.length ? "pass" : closingCount > 0 ? "warn" : "fail",
        `${closingCount} of ${tests.length} tests ended with a closing message.`
      )
    ]
  };

  const totalInitialisations = staticData.totalInitialisations || 0;
  const totalUpdates = staticData.totalUpdates || 0;

  let totalScore = 0;
  if (
    totalInitialisations >= 1 &&
    totalUpdates >= 1 &&
    correctFinalCount === assignment.testCases.length &&
    resetCorrect
  ) totalScore = 4;
  else if (
    totalUpdates >= 1 &&
    correctFinalCount >= 2
  ) totalScore = 3;
  else if (totalUpdates >= 1 || correctFinalCount >= 1) totalScore = 2;
  else if (totalInitialisations >= 1) totalScore = 1;

  criteria.runningTotal = {
    suggested: totalScore,
    evidence: [
      evidence(
        totalInitialisations >= 1 ? "pass" : "fail",
        `${totalInitialisations} running-total initialisation${totalInitialisations === 1 ? "" : "s"} to zero detected.`
      ),
      evidence(
        totalUpdates >= 1 ? "pass" : "fail",
        `${totalUpdates} running-total update${totalUpdates === 1 ? "" : "s"} inside a for loop detected.`
      ),
      evidence(
        correctFinalCount === assignment.testCases.length
          ? "pass"
          : correctFinalCount > 0
            ? "warn"
            : "fail",
        `${correctFinalCount} of ${assignment.testCases.length} tests displayed the correct final total.`
      ),
      evidence(
        resetCorrect ? "pass" : "fail",
        resetCorrect
          ? "The running total reset correctly before the second savings plan."
          : "The repeated-plan test did not show a correctly reset total."
      )
    ]
  };

  const printCalls = staticData.printCalls || 0;
  const meaningfulCount = staticData.meaningfulNames?.length || 0;
  const labelCount = tests.filter(
    (test) => test.labels?.week && test.labels?.final
  ).length;

  let outputScore = 0;
  if (
    printCalls >= 3 &&
    meaningfulCount >= 4 &&
    correctProgressCount === tests.length &&
    labelCount === tests.length &&
    closingCount === tests.length
  ) outputScore = 4;
  else if (
    printCalls >= 2 &&
    meaningfulCount >= 3 &&
    correctProgressCount >= 2
  ) outputScore = 3;
  else if (printCalls >= 1 && (correctProgressCount >= 1 || correctFinalCount >= 1)) outputScore = 2;
  else if (printCalls >= 1) outputScore = 1;

  criteria.output = {
    suggested: outputScore,
    evidence: [
      evidence(printCalls >= 3 ? "pass" : printCalls > 0 ? "warn" : "fail", `${printCalls} print() call${printCalls === 1 ? "" : "s"} detected.`),
      evidence(
        meaningfulCount >= 4 ? "pass" : meaningfulCount > 0 ? "warn" : "fail",
        `${meaningfulCount} variable name${meaningfulCount === 1 ? " appears" : "s appear"} meaningful by the automatic naming check.`
      ),
      evidence(
        labelCount === tests.length ? "pass" : labelCount > 0 ? "warn" : "fail",
        `${labelCount} of ${tests.length} tests used recognisable week and final-total labels.`
      ),
      evidence(
        closingCount === tests.length ? "pass" : closingCount > 0 ? "warn" : "fail",
        `${closingCount} of ${tests.length} tests displayed a closing message.`
      ),
      evidence("warn", "Teacher check: confirm that indentation, variable names and formatting are consistently clear.")
    ]
  };

  if (forCount < 1) reviewFlags.push("The required for loop was not detected.");
  if (rangeCalls < 1) reviewFlags.push("The required range() call was not detected.");
  if (whileCount < 1) reviewFlags.push("The required while loop was not detected.");
  if (!repeatCorrect) reviewFlags.push("The program did not pass the repeated two-plan test.");
  if (!resetCorrect) reviewFlags.push("The running total may not reset correctly for a second plan.");

  const firstStrong = Boolean(
    tests[0]?.ok &&
    tests[0]?.matches?.weeklyProgress &&
    tests[0]?.matches?.finalTotals
  );
  const changedStrong = tests.slice(1).filter(
    (test) => test.ok && test.matches?.weeklyProgress && test.matches?.finalTotals
  ).length;

  if (firstStrong && changedStrong === 0) {
    reviewFlags.push("Possible hard-coded output: the first example matched but the changed-value tests did not.");
    criteria.operation.suggested = Math.min(criteria.operation.suggested, 2);
    criteria.runningTotal.suggested = Math.min(criteria.runningTotal.suggested, 2);
    criteria.output.suggested = Math.min(criteria.output.suggested, 2);
    criteria.runningTotal.evidence.push(
      evidence("warn", "Output may contain fixed example totals rather than calculations from the entered values.")
    );
  }

  return finishAssessment(assignment, raw, criteria, reviewFlags);
}

const originalAssessSubmissionForTopic3 = assessSubmission;
assessSubmission = function (raw, assignmentId = DEFAULT_ASSIGNMENT_ID) {
  if (assignmentId === "savings-tracker") return assessSavingsTracker(raw);
  return originalAssessSubmissionForTopic3(raw, assignmentId);
};

const originalEvaluateSourceForTopic3 = evaluateSource;
let topic3Worker = null;
let topic3ReadyPromise = null;
let topic3ResolveReady = null;
let topic3RejectReady = null;
let topic3RequestCounter = 0;
const topic3PendingRequests = new Map();

function startTopic3Worker() {
  if (topic3Worker) topic3Worker.terminate();

  topic3ReadyPromise = new Promise((resolve, reject) => {
    topic3ResolveReady = resolve;
    topic3RejectReady = reject;
  });

  topic3Worker = new Worker("topic3-marker-worker.js?v=20260618a", { type: "module" });

  topic3Worker.onmessage = (event) => {
    const message = event.data || {};

    if (message.type === "ready") {
      topic3ResolveReady?.();
      return;
    }

    if (message.type === "boot-error") {
      topic3RejectReady?.(new Error(message.error || "Topic 3 marker could not load."));
      return;
    }

    if (message.type === "result" || message.type === "evaluation-error") {
      const pending = topic3PendingRequests.get(message.requestId);
      if (!pending) return;

      clearTimeout(pending.timeoutId);
      topic3PendingRequests.delete(message.requestId);

      if (message.type === "result") pending.resolve(message.result);
      else pending.reject(new Error(message.error || "Topic 3 evaluation failed."));
    }
  };

  topic3Worker.onerror = (event) => {
    const error = new Error(event.message || "Topic 3 marker worker failed.");
    topic3RejectReady?.(error);

    for (const pending of topic3PendingRequests.values()) {
      clearTimeout(pending.timeoutId);
      pending.reject(error);
    }
    topic3PendingRequests.clear();
  };
}

async function evaluateTopic3Source(source, assignmentId) {
  await topic3ReadyPromise;

  const assignment = getAssignment(assignmentId);
  const requestId = ++topic3RequestCounter;

  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      topic3PendingRequests.delete(requestId);
      topic3Worker.terminate();
      startTopic3Worker();
      reject(Object.assign(new Error("Execution timed out"), { code: "TIMEOUT" }));
    }, 8000);

    topic3PendingRequests.set(requestId, { resolve, reject, timeoutId });

    topic3Worker.postMessage({
      type: "evaluate",
      requestId,
      source,
      assignmentId: assignment.id,
      tests: assignment.testCases
    });
  });
}

evaluateSource = async function (source, assignmentId) {
  if (assignmentId === "savings-tracker") {
    return evaluateTopic3Source(source, assignmentId);
  }
  return originalEvaluateSourceForTopic3(source, assignmentId);
};

const originalCleanStudentNameForTopic3 = cleanStudentName;
cleanStudentName = function (path, fileName) {
  const result = originalCleanStudentNameForTopic3(path, fileName);
  if (/^(savings tracker|savings tracker program)$/i.test(result)) {
    return "Student name";
  }
  return result;
};

startTopic3Worker();
populateAssignments();
renderAll();
