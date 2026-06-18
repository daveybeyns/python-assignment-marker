# Python Assignment Marker

A browser-based lecturer marking assistant for **Do It 1: Learner Profile Program**.

It analyses Moodle Python submissions against the six-part rubric for:

1. Program operation
2. Variables
3. Data types
4. User input
5. Casting
6. Output and code quality

The tool provides suggested rubric scores and evidence. The teacher remains responsible for confirming or changing every score before entering the grade in Moodle.

## What it does

- Accepts one or more `.py` files.
- Accepts Moodle's **Download all submissions** ZIP file.
- Extracts Python files from Moodle student folders.
- Runs two sets of test data to help identify hard-coded output.
- Checks Python syntax and selected code structures using Python's AST.
- Runs student code in Pyodide inside a Web Worker.
- Stops a program that exceeds the execution timeout.
- Suggests a score from 0–4 for each rubric criterion.
- Shows evidence for each suggested score.
- Allows the teacher to override every score.
- Allows teacher notes to be entered.
- Copies concise feedback for pasting into Moodle.
- Downloads an individual HTML report.
- Downloads a class CSV summary.
- Downloads all marked reports in one ZIP.

## Privacy and security model

- Student files are read and processed in the browser.
- The page does not send submissions or grades to a server.
- Refreshing or closing the page clears the loaded marking session.
- Python code runs in a separate browser worker rather than directly through desktop Python.
- Imports, private attribute access and several dangerous dynamic functions are blocked by the assignment marker.

This is a marking assistant, not a secure malware-analysis sandbox. Do not deliberately run hostile code with it.

## Files

- `index.html` — main interface
- `styles.css` — lecturer-tool design
- `app.js` — uploads, batch marking, display and exports
- `rubric.js` — rubric definitions, test data and score suggestions
- `marker-worker.js` — Pyodide worker and Python AST/runtime checks
- `moodle-embed-snippet.html` — iframe block to paste into Moodle
- `.nojekyll` — tells GitHub Pages to serve the files directly
- `examples/submissions/` — individual sample student programs
- `examples/example-moodle-submissions.zip` — Moodle-style batch test file

## GitHub setup

### 1. Create the repository

1. Sign in to GitHub.
2. Select **New repository**.
3. Use a name such as `python-assignment-marker`.
4. Set the repository to **Private**.
5. Create the repository without adding a README, because this project already contains one.

GitHub Pages from a private personal repository requires a GitHub plan that supports Pages for private repositories. A private repository does not necessarily make the published Pages URL private.

### 2. Upload the project

The easiest method is GitHub's web interface:

1. Open the new repository.
2. Select **Add file → Upload files**.
3. Drag all files and folders from this project into the upload area.
4. Commit the upload to the `main` branch.

Alternatively, use GitHub Desktop and publish the local project folder to the private repository.

### 3. Enable GitHub Pages

1. Open the repository's **Settings**.
2. Select **Pages** under **Code and automation**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Select the `main` branch and `/ (root)` folder.
5. Select **Save**.
6. Use the **Visit site** link when deployment completes.

The expected address is:

`https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

### 4. Test the site

1. Open the Pages address.
2. Wait until the top-right status says **Python marker ready**.
3. Upload `examples/example-moodle-submissions.zip`.
4. Select **Mark all**.
5. Review the range of strong, incomplete, hard-coded and erroneous submissions.
6. Change one suggested score to confirm manual overrides update the total.
7. Test **Download CSV** and **Download reports ZIP**.

The first visit downloads the Pyodide browser runtime, so it needs an internet connection. Later loads are usually faster because browser files are cached.

## Moodle setup

### Recommended placement

Create a hidden course section called **Lecturer Tools** and place the marker there.

### Add it as a Moodle Page

1. Turn editing on.
2. In the hidden Lecturer Tools section, select **Add an activity or resource**.
3. Choose **Page**.
4. Name it **Python Assignment Marker**.
5. Open the HTML/source view in the Page content editor.
6. Open `moodle-embed-snippet.html` from this project.
7. Replace both placeholders in the iframe URL with the GitHub username and repository name.
8. Paste the updated HTML into Moodle.
9. Save and display.
10. From the activity menu, choose **Hide from students**.

Do not choose **Make available but don't show on course page**, because that mode can still permit access through a direct Moodle link.

If Moodle removes the iframe, add it as a **URL resource** instead and set it to open in a new window. Keep the resource hidden from students.

## Normal marking workflow

1. In the Moodle assignment, choose **View all submissions**.
2. Use **Download all submissions** to obtain the ZIP file.
3. Open the hidden Python Assignment Marker.
4. Drop the Moodle ZIP onto the upload panel.
5. Select **Mark all**.
6. Select each student in the left panel.
7. Review test output and rubric evidence.
8. Adjust suggested rubric scores where professional judgement differs.
9. Add teacher notes.
10. Use **Copy feedback** for a Moodle feedback comment if useful.
11. Enter the confirmed six rubric levels in Moodle.
12. Download the CSV or report ZIP before closing the page if a local record is required.

## Editing the assignment checks

The current test data and rubric logic are in `rubric.js`.

The Python AST and runtime analysis is in `marker-worker.js`.

For later assignments, make a copy of the repository or create a new branch before changing these files. This avoids accidentally changing the marker used for earlier submitted work.

## Limitations

- Meaningful variable names and code readability still require teacher judgement.
- Unusual but valid solutions may need manual score adjustment.
- The automatic input supplier recognises prompts containing words such as `name`, `course`, `age`, `hours` and `study`, with a sequential fallback.
- Programs using imports are not executed because imports are unnecessary for this assignment.
- The marker expects a maximum of four required input answers for this task.
- The browser page does not write grades back to Moodle.
