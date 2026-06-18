# Python Assignment Marker

A browser-based lecturer marking assistant for the Moodle Python Crash Course.

The same tool now supports:

1. **Do It 1: Learner Profile Program**
2. **Do It 2: Cinema Ticket Program**

Choose the assignment from the selector before adding Moodle submissions.

## What the Topic 2 update adds

- An assignment selector at the top of the marker.
- The existing Topic 1 checks and rubric remain available.
- Four automated boundary tests for the Cinema Ticket Program:
  - age 11
  - age 12
  - age 17
  - age 18
- Static checks for:
  - two input calls
  - `int()` casting
  - comparison operators
  - `if`, `elif` and `else`
  - meaningful variables
- Runtime checks for:
  - correct Child / Teen / Adult ticket
  - correct £5 / £7 / £10 price
  - customer name in the output
- Suggested scores for the six Topic 2 rubric criteria.
- Manual score overrides, teacher notes, copied feedback, CSV export and HTML reports.

## Privacy

- Student files are processed locally inside the browser.
- Files and grades are not uploaded to a server by this page.
- Closing or refreshing the page clears the current marking session.

## Files

- `index.html` — main interface and assignment selector
- `styles.css` — lecturer-tool design
- `app.js` — uploads, marking workflow, display and exports
- `rubric.js` — both assignment definitions, tests, rubrics and scoring logic
- `marker-worker.js` — Pyodide worker, AST checks and runtime tests
- `moodle-embed-snippet.html` — optional Moodle iframe example
- `.nojekyll` — ensures GitHub Pages serves the files directly
- `examples/submissions/` — sample Topic 2 programs
- `examples/example-topic2-moodle-submissions.zip` — Moodle-style test ZIP

## Updating the existing GitHub repository

Upload and replace these five files in the current `python-assignment-marker` repository:

- `index.html`
- `styles.css`
- `app.js`
- `rubric.js`
- `marker-worker.js`

Do not rename them.

The existing GitHub Pages address and Moodle iframe can stay the same.

## Normal workflow

1. Open the marker.
2. Select the assignment being marked.
3. Download all submissions from the matching Moodle assignment.
4. Drop the Moodle ZIP onto the marker.
5. Select **Mark all**.
6. Review each test run and each suggested rubric score.
7. Override scores where professional judgement differs.
8. Add teacher notes and copy feedback to Moodle.
9. Export the CSV or report ZIP before closing the page.

## Testing Topic 2

1. Select **Do It 2: Cinema Ticket Program**.
2. Upload `examples/example-topic2-moodle-submissions.zip`.
3. Select **Mark all**.
4. Confirm that the examples produce a range of strong, boundary-error, no-cast, hard-coded and syntax-error outcomes.

## Limitations

The tool provides evidence and suggested scores. It cannot reliably judge every valid coding style, the true quality of variable names or all aspects of readability. The lecturer must confirm the final rubric grade.
