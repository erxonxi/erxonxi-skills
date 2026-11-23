# No default parameters

Functions and methods in `src` do not declare default values for their parameters. The caller states every argument, so a call shows how the object is built.

- Instead of `search(id, limit = 50)`, require `limit` or add a second named method.
- Boolean flag parameters are not used either: two methods with two names.
- Test code is out of scope: Object Mothers take an `overrides` object on purpose.

Not checked: nothing enforces it yet.
