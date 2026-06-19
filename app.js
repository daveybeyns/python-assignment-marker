"use strict";

const ASSIGNMENTS = {};
let DEFAULT_ASSIGNMENT_ID = null;
const MODULE_VERSION = "20260618c";

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
    for (const test of tests || []) {
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

function finishAssessment(assignment, raw, criteria, reviewFlags) {
    for (const rubricItem of assignment.rubric) {
        if (!criteria[rubricItem.id]) {
            criteria[rubricItem.id] = {
                suggested: 0,
                evidence: [evidence("fail", "No automated evidence rule was returned for this rubric criterion.")]
            };
            reviewFlags.push(`No automated result was returned for ${rubricItem.shortTitle}.`);
        }
    }
    const suggestedTotal = assignment.rubric.reduce(
        (total, item) => total + Number(criteria[item.id]?.suggested || 0),
        0
    );
    return {
        criteria,
        suggestedTotal,
        reviewFlags,
        status: determineStatus(raw, reviewFlags)
    };
}

function numbersIn(text) {
    return (String(text || "").match(/(?<![\w.])-?\d+(?:\.\d+)?/g) || [])
        .map(Number)
        .filter(Number.isFinite);
}

function hasNumber(text, expected, tolerance = 0.005) {
    return numbersIn(text).some((value) => Math.abs(value - Number(expected)) <= tolerance);
}

function includesText(text, expected) {
    return String(text || "").toLowerCase().includes(String(expected || "").toLowerCase());
}

const ASSESSMENT_HELPERS = Object.freeze({
    evidence,
    countTrue,
    successfulTests,
    runtimeTypeSet,
    determineStatus,
    addGeneralReviewFlags,
    finishAssessment,
    numbersIn,
    hasNumber,
    includesText
});

async function loadAssignmentModules() {
    const loaded = [];
    for (let number = 1; number <= 10; number += 1) {
        const module = await import(`./assignments/do-it-${number}.js?v=${MODULE_VERSION}`);
        const assignment = module.default;
        if (!assignment || assignment.enabled === false) continue;
        validateAssignment(assignment, number);
        if (ASSIGNMENTS[assignment.id]) {
            throw new Error(`Duplicate assignment id: ${assignment.id}`);
        }
        ASSIGNMENTS[assignment.id] = assignment;
        loaded.push(assignment);
    }
    loaded.sort((a, b) => Number(a.number) - Number(b.number));
    if (!loaded.length) throw new Error("No enabled assignment modules were found.");
    DEFAULT_ASSIGNMENT_ID = loaded[0].id;
}

function validateAssignment(assignment, expectedNumber) {
    const requiredText = ["id", "title", "shortName", "reportTitle", "expectedFileName", "slug", "summary"];
    for (const property of requiredText) {
        if (!assignment[property] || typeof assignment[property] !== "string") {
            throw new Error(`Do It ${expectedNumber} is missing a valid ${property}.`);
        }
    }
    if (!Array.isArray(assignment.testCases) || !assignment.testCases.length) {
        throw new Error(`${assignment.title} must contain at least one test case.`);
    }
    if (!Array.isArray(assignment.rubric) || !assignment.rubric.length) {
        throw new Error(`${assignment.title} must contain rubric criteria.`);
    }
    if (typeof assignment.assess !== "function") {
        throw new Error(`${assignment.title} must provide an assess() function.`);
    }
    const ids = new Set();
    for (const item of assignment.rubric) {
        if (!item.id || ids.has(item.id)) throw new Error(`${assignment.title} contains a missing or duplicate rubric id.`);
        ids.add(item.id);
        for (let score = 0; score <= 4; score += 1) {
            if (!item.levels || typeof item.levels[score] !== "string") {
                throw new Error(`${assignment.title}: ${item.title} is missing level ${score}.`);
            }
        }
    }
}

function getAssignment(assignmentId = DEFAULT_ASSIGNMENT_ID) {
    return ASSIGNMENTS[assignmentId] || ASSIGNMENTS[DEFAULT_ASSIGNMENT_ID];
}

function assessSubmission(raw, assignmentId, source) {
    const assignment = getAssignment(assignmentId);
    return assignment.assess(raw, ASSESSMENT_HELPERS, source, assignment);
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
        for (const item of result.evidence || []) {
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
    if (submission.notes?.trim()) lines.push("", "Teacher notes:", submission.notes.trim());
    lines.push("", "Automated checks provide evidence only. The final rubric judgement was confirmed by the teacher.");
    return lines.join("\n");
}

// Main marker interface and workflow.
const elements = {
    runtimeStatus: document.getElementById("runtimeStatus"),
    headerAssignmentTitle: document.getElementById("headerAssignmentTitle"),
    assignmentSelect: document.getElementById("assignmentSelect"),
    assignmentSummary: document.getElementById("assignmentSummary"),
    startupError: document.getElementById("startupError"),
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
    assignmentId: null,
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
    const assignments = Object.values(ASSIGNMENTS).sort((a, b) => Number(a.number) - Number(b.number));
    elements.assignmentSelect.innerHTML = assignments.map((assignment) =>
        `<option value="${escapeHtml(assignment.id)}">${escapeHtml(assignment.title)}</option>`
    ).join("");
    elements.assignmentSelect.value = state.assignmentId;
    elements.assignmentSelect.disabled = false;
    renderAssignmentDetails();
}

function renderAssignmentDetails() {
    const assignment = currentAssignment();
    if (!assignment) return;
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

    worker = new Worker(`marker-worker.js?v=${MODULE_VERSION}`, { type: "module" });

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
    const timeoutMs = Number(assignment.timeoutMs || 8000);

    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            pendingRequests.delete(requestId);
            worker.terminate();
            startWorker();
            reject(Object.assign(new Error("Execution timed out"), { code: "TIMEOUT" }));
        }, timeoutMs);

        pendingRequests.set(requestId, { resolve, reject, timeoutId });
        worker.postMessage({
            type: "evaluate",
            requestId,
            source,
            assignmentId: assignment.id,
            tests: assignment.testCases,
            options: assignment.workerOptions || {}
        });
    });
}

function makeId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normaliseName(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/\.py$/i, "")
        .replace(/[^a-z0-9]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function cleanStudentName(path, fileName, assignment = currentAssignment()) {
    const parts = path.split("/").filter(Boolean);
    let candidate = parts.length > 1 ? parts[parts.length - 2] : fileName.replace(/\.py$/i, "");
    candidate = candidate
        .replace(/_\d+_assignsubmission_file_.*$/i, "")
        .replace(/_assignsubmission_file_.*$/i, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const reserved = new Set([
        normaliseName(assignment?.expectedFileName),
        normaliseName(assignment?.reportTitle),
        normaliseName(assignment?.title),
        normaliseName(assignment?.slug),
        ...(assignment?.fileNameAliases || []).map(normaliseName)
    ]);

    if (!candidate || reserved.has(normaliseName(candidate))) return "Student name";
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
    if (!assignment) return;
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
        const functionRows = (test.functionTests || []).map((functionTest) => {
            const result = functionTest.ok
                ? `${functionTest.valueType}: ${functionTest.value}`
                : functionTest.error;
            return `${functionTest.label || functionTest.functionName}: ${result}`;
        }).join("\n");
        const functionBlock = functionRows ? `
                    <div class="test-block">
                        <h5>Direct function checks</h5>
                        <pre>${escapeHtml(functionRows)}</pre>
                    </div>
        ` : "";
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
                    ${functionBlock}
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
    submission.assessment = assessSubmission(raw, submission.assignmentId, submission.code);
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
    const url = new URL(window.location.href);
    url.searchParams.set("assignment", requestedId);
    window.history.replaceState({}, "", url);
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

async function initialiseApplication() {
    try {
        await loadAssignmentModules();
        const requestedAssignment = new URLSearchParams(window.location.search).get("assignment");
        state.assignmentId = ASSIGNMENTS[requestedAssignment] ? requestedAssignment : DEFAULT_ASSIGNMENT_ID;
        populateAssignments();
        startWorker();
        renderAll();
        document.documentElement.dataset.markerAppReady = "true";
    } catch (error) {
        console.error(error);
        elements.startupError.hidden = false;
        elements.startupError.textContent = `The marker could not initialise: ${error.message || error}`;
        setRuntimeStatus("error", "Marker setup error");
    }
}

initialiseApplication();
