// Copy this file over the matching disabled do-it-N.js placeholder.
// The main app and shared worker do not need editing.

const rubric = [
    // Add the six Moodle rubric criteria. Each item needs:
    // id, title, shortTitle, summary and levels 0–4.
];

const testCases = [
    {
        label: "Test 1",
        input: {
            mode: "sequence",
            values: ["first answer", "second answer"]
        },
        expected: {}

        // Optional capabilities:
        // files: { "input.txt": "starting file content" },
        // captureFiles: ["output.txt"],
        // functionTests: [
        //     {
        //         label: "Direct function check",
        //         functionName: "my_function",
        //         args: [1, 2]
        //     }
        // ]
    }
];

function assess(raw, helpers, source, assignment) {
    const reviewFlags = [];
    const criteria = {};
    helpers.addGeneralReviewFlags(raw, reviewFlags);

    // Use:
    // raw.static  — AST/static evidence
    // raw.tests   — runtime output, variables, direct function results and files
    // source      — assignment-specific source checks
    //
    // Create one entry for each rubric id:
    // criteria.example = {
    //     suggested: 0,
    //     evidence: [helpers.evidence("warn", "Teacher review required.")]
    // };

    return helpers.finishAssessment(
        assignment, raw, criteria, reviewFlags
    );
}

const assignment = {
    enabled: true,
    number: 5,
    id: "unique-assignment-id",
    shortName: "Do It 5",
    title: "Do It 5: Assignment Name",
    reportTitle: "Assignment Name",
    expectedFileName: "required_filename.py",
    slug: "assignment-name",
    summary: "Brief marker summary.",
    maxScore: 24,

    workerOptions: {
        // allowOpen: true,
        // allowImports: true
    },

    testCases,
    rubric
};

export default { ...assignment, assess };
