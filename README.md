# Python Assignment Marker — Dynamic Assignment Modules

This is the modular version of the lecturer marking assistant used by the Moodle Python Crash Course.

## Included assignments

1. **Do It 1: Learner Profile Program**
2. **Do It 2: Cinema Ticket Program**
3. **Do It 3: Savings Tracker Program**
4. **Do It 4: Study Session Analyser**

The established interface and workflow are preserved:

- Moodle ZIP and individual `.py` uploads
- automatic student-name extraction
- local Pyodide execution
- suggested 0–4 rubric scores
- manual score overrides
- teacher notes
- Copy feedback
- CSV export
- individual HTML reports
- batch report ZIP export

## Modular structure

```text
python-assignment-marker/
├── index.html
├── styles.css
├── app.js
├── marker-worker.js
├── moodle-embed-snippet.html
├── assignments/
│   ├── do-it-1.js
│   ├── do-it-2.js
│   ├── do-it-3.js
│   ├── do-it-4.js
│   ├── do-it-5.js
│   ├── ...
│   ├── do-it-10.js
│   └── assignment-template.js
└── examples/
    └── do-it-4/
```

`app.js` and `marker-worker.js` are shared core files. Each assignment module contains its own:

- assignment identity and required filename
- automated test inputs
- rubric wording
- scoring and evidence rules
- optional direct function tests
- optional file-handling test data

## Adding the next assignment

Files `do-it-5.js` through `do-it-10.js` are disabled placeholders.

To add Do It 5, replace only:

```text
assignments/do-it-5.js
```

A valid enabled module appears in the assignment dropdown automatically. No changes to `index.html`, `app.js` or `marker-worker.js` are normally required.

Use `assignment-template.js` as a structural reference. In practice, a complete assignment-specific module will be generated for each new course topic so its tests and rubric evidence match that assignment precisely.

## Shared worker capabilities

The generic worker already gathers evidence for:

- variables, constants and data types
- input, prompts and casting
- selection and comparisons
- for loops, while loops and range
- running totals
- function definitions, parameters, calls and return statements
- direct calls to named student functions
- lists, dictionaries, sets, tuples and subscripting
- method calls
- string operations
- try, except and raise
- classes and methods, including `__init__`
- file reading and writing when enabled by an assignment module
- generated output files

For a File Handling assignment, the module can set:

```javascript
workerOptions: {
    allowOpen: true
}
```

## Publishing

Upload the complete package to the existing public GitHub repository and preserve the `assignments` folder paths.

The existing address remains:

```text
https://daveybeyns.github.io/python-assignment-marker/
```

The existing hidden Moodle iframe does not need changing.

## Testing Do It 4

1. Open the marker.
2. Select **Do It 4: Study Session Analyser**.
3. Upload:

```text
examples/do-it-4/example-do-it-4-moodle-submissions.zip
```

4. Select **Mark all**.
5. Confirm that the model solution receives **24/24**.
6. Confirm that the other examples receive varied lower scores and review warnings.
7. Test manual overrides, notes, feedback copying and exports.

## Privacy and professional judgement

Submissions are processed inside the browser and are not uploaded by the marker page. Automated results are suggested evidence only. The lecturer must review the submission and confirm the final rubric grade.
