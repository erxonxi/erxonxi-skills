# Evidence

The evidence proves the change the description promises. A reviewer must see it without running the code.

## Structure

1. One line that says where each side comes from: "Before is `main` at `<commit>`, after is this branch, both on <environment> with <the same input or seed data>."
2. The main change first. Then scenarios and variants.
3. One block per thing to prove: a heading, one sentence that says what to look at, then the evidence.

## By kind of change

### Visual

- Same state, same viewport and same crop on both sides.
- For a web change: a wide and a narrow viewport (desktop and phone). If the change exists at one width only, capture that one and say why.
- Other variants (dark mode, language, long content, empty state, error) only when the change affects them.
- A defect of a few pixels: a close-up with the same crop and zoom on both sides.
- Layout: a before/after table for the main change, a grid for states, a matrix for variants.

### Flow

- A recording under a minute, or several short ones for a long flow.
- Keep the action and its result in the frame, show where each click lands and what is typed, and pause a second after each action.
- One sentence above each recording with the steps it shows and its length.
- Without a recorder: the numbered sequence of screenshots or outputs, one per step.

### Behavior without a visual

- The same request, command or tool call on both sides, and each side's output in a code block.
- Trim long outputs to the fields that matter, and say that they are trimmed.

### Architecture

- A before and an after diagram of the affected part only, around a dozen nodes at most, with the same node names on both sides.
- The diagram type follows the change: a flowchart for a decision or routing, a sequence diagram for the order of calls, a dependency graph for module structure.
- Mark what is added, removed and changed, with a legend.
- A new flow with no "before": the "after" only, all marked as added.
- Diagrams complement the other evidence, they do not replace it.

## Producing it

- Work in a temporary directory outside the repository. Never commit screenshots or recordings.
- Capture "before" from the base branch and "after" from the change, with the same input.
- Use the agent's browser, terminal or desktop tools when it has them. If it has none, say which evidence is missing and how the user can produce it.
