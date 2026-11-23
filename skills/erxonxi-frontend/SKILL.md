---
name: erxonxi-frontend
description: "Frontend structure in any framework: how much architecture a client needs, components, hooks, state, injecting repositories, UI tests, CSS, accessibility. Use when creating or reviewing components, screens, client state, styles or the layout of a web app."
---

# Frontend

React/TypeScript notation is only an illustration. If the project already has screens, copy their structure and shape.

## First decision: how much architecture

"You may not need hexagonal architecture." On the frontend it is applied in degrees:

| Situation | Structure |
|---|---|
| Screens that show data and submit forms, with the rules in the backend | By feature: `sections/<feature>/`, with types and validators next to the feature. No ports or layers. |
| Framework with server rendering and server actions | The view calls the backend from the server. Thin pages. Hexagonal only in the backend. |
| Real business rules on the client, several data sources, or a core shared between applications | `modules/<module>/{domain,application,infrastructure}` + `sections/` for the interface. |

Pick the simplest one that works. Move up when the client domain justifies it.

## Structure

```
src/
  modules/<module>/              # only if there is business logic on the client
    domain/                      # types or classes, validators, repository port
    application/<action>/        # use cases
    infrastructure/              # ApiProductRepository, LocalStorageProductRepository
  sections/<feature>/            # components, hooks and styles of a screen or feature
  design-system/ (or ui/)        # generic components, with no knowledge of the application
```

- The domain does not import the UI library, the DOM or `fetch`.
- `fetch`, local storage and SDKs only in `infrastructure`.
- The design system imports nothing from the application.
- The paradigm is free: classes with constructor injection, or types plus functions that receive the repository as the first argument. Choose one per project.
- In functional style, the "value object" is a type plus a validator (`isProductTitleValid`) and a guard that throws (`ensureProductTitleIsValid`).
- The direction of dependencies between layers is enforced with a lint rule applied to the core folders.

## Components

- Components as functions. Props typed next to the component.
- A component does one thing. A screen's state and effects logic is extracted into its own `use<Feature>` hook and the component stays a view.
- Explicit UI states with an enumeration (`Initial`, `Loading`, `Success`, `Error`) and an exhaustive `switch`. Not several booleans that can contradict each other.
- Validation lives in the domain. The form shows the message the domain gives and does not duplicate the rule.
- Domain constants (lengths, limits) are exported by name and reused in the UI and in tests.
- No floating promises in state hooks: await the result before marking success and catch the error to mark failure.
- Files together per component: `Component.tsx` and its stylesheet. Tests go in the mirrored `tests/` tree.
- Pages and routes are thin: they fetch data and delegate to tested components.

## Dependency injection in the UI

- Repositories and use cases are built in a single composition root (the application root or a container) and passed down through props or a context provider.
- Components consume actions (`createProduct`) through context or hooks. They do not know the repository implementation.
- Nothing is built and no configuration is read at module import time.
- In server mode: server components and server actions call the API. Client components do not. Actions return an action state and translate the API's error types into user messages in a single place.

## State

1. Local state first.
2. Reducer in a hook when the state is a small aggregate (a cart).
3. Context only for data shared by a subtree.
4. Server state: let the framework manage it (actions and revalidation) or a data-cache library.
5. Global store only for shared, mutable client state that truly needs it.

## Tests

- Test like a user: query by role, label or visible text, and interact with user events. No test ids except as a last resort. No snapshots. Do not test internal state.
- Render the component with the real provider and a repository replaced through a prop.
- Data with Object Mothers, with named variants built from the domain constants (`ProductMother.createWithTooLongTitle()`).
- The network is replaced at the boundary, not inside the components.
- Accessibility is checked automatically in component tests.
- End-to-end browser tests only for the critical happy path, if at all.

## CSS

- Layers from generic to specific, loaded in that order: settings (tokens) → tools → generic (reset) → elements → layout objects → components (atoms, molecules, organisms) → utilities.
- Design tokens as custom properties in a single place. No loose colors or sizes in components.
- One class per component part. Flat selectors. Do not style by element type or by descendant chains. No `!important` or ids.
- Component-scoped styles (CSS modules) or a block, element and modifier naming convention. Only one per project.
- Intrinsic layout: `min`/`max`, `gap`, `aspect-ratio`, grids with `auto-fill` and `minmax`, `sticky` instead of `fixed`. Avoid fixed widths and heights.
- Named `z-index` scale, never magic numbers.
- Theme with custom properties at the root, respecting the system preference and declaring `color-scheme`.
- Reusable components expose their customization as custom properties with a default value.
- With a utility framework: tokens go in the theme and utility-heavy markup is extracted into semantic component classes.
- Respect `prefers-reduced-motion` and high-contrast modes.

## Accessibility and performance

- Semantic HTML first: the right element before a `div` with a role. Every interactive control is keyboard-operable and has an accessible name.
- Measure before optimizing. Then one habit at a time: images with explicit dimensions and lazy loading, adapted formats and sizes, fonts with `font-display`, `preconnect` to critical origins, code splitting and loading on user intent.

## What to avoid

- Building layers and ports for a screen without rules.
- Business logic inside components or pages.
- Network or storage access from components.
- A global store by default.
- Several booleans to represent a UI state.
- Third-party dependencies for something small that can be built in-house.
- Styles coupled to the HTML structure.

## Checklist

- [ ] Is the chosen structure the simplest one that works for this feature?
- [ ] Does the component receive its dependencies and can it be replaced in tests?
- [ ] Is the UI state an enumeration with an exhaustive `switch`?
- [ ] Is the validation rule in a single place?
- [ ] Do the tests query by role or label?
- [ ] Do the styles use tokens and flat selectors?
- [ ] Can it be used with a keyboard and does it have accessible names?
