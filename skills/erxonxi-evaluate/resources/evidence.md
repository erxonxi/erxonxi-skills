# Evidence

Evidence answers one question for someone who will not run the code: what does this change do that the code did not do before? Anything that does not help answer it is noise.

## Before capturing

- **Pick the claim.** Write the single sentence the evidence must support, taken from the problem the change solves. Capture that, not the most photogenic thing the change touched.
- **Fix the comparison.** Both sides use the same input, data and setup. The only difference is the code: the base commit on one side, the change on the other. Write that down in one line at the top, naming the commit, the environment and the data.
- **For a fix, the failure first.** The "before" that shows the bug (an error, a wrong response, a broken screen) is the strongest piece. Capture it even when the screen looks the same: show the failure in whatever form it takes.

## By kind of change

| Kind | Capture | Watch out for |
|---|---|---|
| Something users see | Screenshots of both sides, same state, same viewport, same crop | Web: a wide and a narrow viewport, unless the change only appears at one width (say which and why). Add dark mode, languages, empty or error states only if the change affects them. A tiny visual defect deserves a zoomed crop, same zoom on both sides |
| A flow of several steps | A short recording per flow, under a minute each, or a numbered strip of screenshots or outputs, one per step | The action and its result in the same frame. Visible clicks and typing, a pause after each step. One line above each recording saying what it shows and how long it is |
| Behavior with no screen | The same call on both sides (request, command, tool call) and each side's output in a code block | Trim to the fields that changed and say it is trimmed |
| How parts connect | A diagram of the affected part before and after, with identical node names | A dozen nodes at most. Flowchart for decisions and routing, sequence diagram for call order, dependency graph for module structure. Mark added, removed and changed parts, with a legend. A new flow has only an "after". Diagrams come on top of other evidence, never instead of it |
| Nothing observable outside the tests | Nothing | Say so in one line and let the verification command speak |

## Layout

Lead with the claim and its strongest evidence. Then one short block per extra scenario or variant: a heading, one sentence on what to look at, the evidence. Use side-by-side tables for before and after, a grid when several states matter, a matrix when several variants do.

## Hygiene

- Keep captures in a temporary directory outside the repository. Never commit them.
- Use the browser, terminal or desktop tools the agent has. If it has none for this kind of change, say what is missing and how the user can produce it in one step.
