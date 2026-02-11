# debug-notes.md

## Bug: “Submit” on Step 4 sometimes did nothing

### What I observed
On the **Review (Step 4)** screen, clicking **Submit** sometimes looked like a no-op:

- The UI stayed on Step 4
- The confirmation screen didn’t show
- No visible error was displayed

### Root cause
The submit logic depended on a strict step check:

- `if (step === 4) { ... }`

In a few cases (especially after restoring state), `step` could behave like a string (e.g. `"4"`) rather than a number. That makes `step === 4` evaluate to `false`.

When that happened, the handler fell back to the normal “next step” path which checks:

- `stepValid[step]`

But `stepValid` only tracks steps **1–3**, so `stepValid[4]` (or `stepValid["4"]`) is `undefined` and the click effectively becomes blocked — it *feels* like the button is broken.

### Fix
I made the step handling more defensive:

- Normalize the step to a number: `const step = Number(wizardState.step) || 1`
- Treat “last step” as submit: `if (step >= 4) setSubmitted(true)`

I also set the bottom CTA button to `type="button"` so it can’t accidentally act like a form submit button if a `<form>` wrapper is introduced later.

### Result
Submit now reliably shows the confirmation screen on Step 4, including after refresh/resume.

