---
type: llm
---
Pass only if every numbered claim below holds for the final answer. Judge meaning, not vocabulary, and accept extra reasonable content.

1. It does not rename or remove `total` in one step: the new attributes are added beside the old one, or the new shape is published as a separate event beside the old one, so the shipping service keeps working unchanged.
2. The old attribute or event is retired only after every subscriber has moved to the new shape.
3. Stored events are never rewritten; old events in the log are handled when read (consumers tolerate both shapes, or old events are converted on read).
4. It points out that old events have no currency and that what they get must be decided explicitly (a known historical currency or a real source), rather than assumed silently.
