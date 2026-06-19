(function () {
    "use strict";

    const rubric = [
        { id: "operation", title: "Program operation", max: 4 },
        { id: "lists", title: "List creation and use", max: 4 },
        { id: "dictionaries", title: "Dictionary creation and use", max: 4 },
        { id: "functions", title: "Functions and calculations", max: 4 },
        { id: "structure", title: "main(), input, loops and selection", max: 4 },
        { id: "quality", title: "Output and code quality", max: 4 }
    ];

    const tests = [
        {
            id: "mixed-results",
            name: "Mixed pass and improvement results",
            inputs: ["Alice", "72", "Ben", "48", "Cara", "60"],
            input: "Alice\n72\nBen\n48\nCara\n60\n",
            expectedOutputIncludes: ["Alice", "72", "Pass", "Ben", "48", "Needs improvement", "Cara", "60", "Class average", "60"],
            timeoutMs: 5000
        },
        {
            id: "boundary-score",
            name: "Boundary score of 50",
            inputs: ["Ana", "0", "Bo", "100", "Cy", "50"],
            input: "Ana\n0\nBo\n100\nCy\n50\n",
            expectedOutputIncludes: ["Ana", "Needs improvement", "Bo", "Pass", "Cy", "50", "Pass", "Class average", "50"],
            timeoutMs: 5000
        },
        {
            id: "decimal-scores",
            name: "Decimal scores",
            inputs: ["Dee", "55.5", "Eli", "44.5", "Fay", "80"],
            input: "Dee\n55.5\nEli\n44.5\nFay\n80\n",
            expectedOutputIncludes: ["Dee", "55.5", "Pass", "Eli", "44.5", "Needs improvement", "Fay", "80", "Class average", "60"],
            timeoutMs: 5000
        }
    ];

    function has(pattern, source) {
        return pattern.test(String(source || ""));
    }

    function staticAnalysis(source) {
        source = String(source || "");
        const checks = {
            hasStudentsList: has(/students\s*=\s*\[\s*\]/, source),
            usesAppend: has(/students\s*\.\s*append\s*\(/, source),
            hasScoresDictionary: has(/scores\s*=\s*\{\s*\}/, source),
            assignsDictionaryByName: has(/scores\s*\[\s*\w+\s*\]\s*=/, source),
            accessesDictionaryByName: has(/scores\s*\[\s*\w+\s*\]/, source),
            calculateAverageFunction: has(/def\s+calculate_average\s*\(\s*scores\s*\)\s*:/, source),
            resultMessageFunction: has(/def\s+get_result_message\s*\(\s*score\s*\)\s*:/, source),
            mainFunction: has(/def\s+main\s*\(\s*\)\s*:/, source),
            callsMain: has(/(^|\n)\s*main\s*\(\s*\)\s*($|\n)/, source),
            returnsAverage: has(/return\s+[^\n]*(values\s*\(|sum\s*\(|len\s*\()/, source),
            returnsMessages: has(/return\s+["']Pass["']/, source) && has(/return\s+["']Needs improvement["']/, source),
            threeRecordLoop: has(/for\s+\w+\s+in\s+range\s*\(\s*3\s*\)\s*:/, source),
            usesInput: has(/input\s*\(/, source),
            usesFloat: has(/float\s*\(\s*input\s*\(/, source) || has(/float\s*\(/, source),
            passSelection: has(/if\s+\w+\s*>=\s*50\s*:/, source),
            loopsStudents: has(/for\s+\w+\s+in\s+students\s*:/, source),
            printsAverage: has(/print\s*\([^\n]*(average|Class average)/i, source),
            meaningfulOutput: has(/print\s*\(/, source)
        };
        return checks;
    }

    function clamp(value) {
        return Math.max(0, Math.min(4, Math.round(value)));
    }

    function suggestScores(context) {
        context = context || {};
        const source = context.source || context.code || "";
        const checks = staticAnalysis(source);
        const runtime = context.runtime || context.testResults || [];
        const passedRuntime = Array.isArray(runtime) ? runtime.filter(function (item) { return item && (item.passed || item.success); }).length : 0;

        const scores = {};
        scores.operation = passedRuntime >= 3 ? 4 : passedRuntime === 2 ? 3 : passedRuntime === 1 ? 2 : (checks.mainFunction && checks.callsMain ? 1 : 0);
        scores.lists = clamp((checks.hasStudentsList ? 1 : 0) + (checks.usesAppend ? 1 : 0) + (checks.loopsStudents ? 2 : 0));
        scores.dictionaries = checks.hasScoresDictionary ? clamp(1 + (checks.assignsDictionaryByName ? 1.5 : 0) + (checks.accessesDictionaryByName ? 1.5 : 0)) : 0;
        scores.functions = clamp((checks.calculateAverageFunction ? 1 : 0) + (checks.resultMessageFunction ? 1 : 0) + (checks.returnsAverage ? 1 : 0) + (checks.returnsMessages ? 1 : 0));
        scores.structure = clamp((checks.mainFunction ? 0.5 : 0) + (checks.callsMain ? 0.5 : 0) + (checks.threeRecordLoop ? 1 : 0) + (checks.usesInput && checks.usesFloat ? 1 : 0) + (checks.passSelection ? 1 : 0));
        scores.quality = clamp((checks.meaningfulOutput ? 1 : 0) + (checks.printsAverage ? 1 : 0) + (checks.loopsStudents ? 1 : 0) + (source.split("\n").length >= 15 ? 1 : 0));
        return scores;
    }

    const assignment = {
        id: "do-it-5",
        key: "do-it-5",
        number: 5,
        assignmentNumber: 5,
        title: "Do It 5: Class Score Tracker",
        shortTitle: "Class Score Tracker",
        filename: "class_score_tracker.py",
        expectedFilename: "class_score_tracker.py",
        maxScore: 24,
        maximumGrade: 24,
        rubric: rubric,
        criteria: rubric,
        tests: tests,
        testCases: tests,
        requiredFunctions: ["calculate_average", "get_result_message", "main"],
        staticAnalysis: staticAnalysis,
        analyse: staticAnalysis,
        analyze: staticAnalysis,
        suggestScores: suggestScores,
        score: suggestScores,
        instructions: "Store three student names in a list and their scores in a dictionary, display each result and calculate the class average."
    };

    window.PYTHON_ASSIGNMENTS = window.PYTHON_ASSIGNMENTS || {};
    window.PYTHON_ASSIGNMENTS[assignment.id] = assignment;
    window.PYTHON_ASSIGNMENTS[5] = assignment;
    window.PYTHON_MARKER_ASSIGNMENTS = window.PYTHON_MARKER_ASSIGNMENTS || {};
    window.PYTHON_MARKER_ASSIGNMENTS[assignment.id] = assignment;
    window.MARKER_ASSIGNMENT = assignment;
    window.ASSIGNMENT_DATA = assignment;
    window.assignmentExtension = assignment;

    if (typeof window.registerAssignment === "function") {
        window.registerAssignment(assignment);
    } else if (typeof window.registerMarkerAssignment === "function") {
        window.registerMarkerAssignment(assignment);
    }
})();
