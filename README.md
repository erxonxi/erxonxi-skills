# erxonxi-skills

[![skills.sh](https://skills.sh/b/erxonxi/erxonxi-skills)](https://skills.sh/erxonxi/erxonxi-skills)

Language-agnostic engineering skills for coding agents: architecture, domain modeling, naming, testing, infrastructure, frontend, and how to plan and ship work with an agent.

They follow the [Agent Skills](https://skills.sh) format and work with Claude Code, Codex, Cursor and any agent the `skills` CLI supports.

## Install

All skills:

```bash
npx skills add erxonxi/erxonxi-skills
```

A single skill, for a given agent:

```bash
npx skills add erxonxi/erxonxi-skills --skill erxonxi-testing -a claude-code
```

### As a Claude plugin

In Claude Code:

```bash
/plugin install erxonxi-skills --marketplace erxonxi/erxonxi-skills
```

In the Claude app, go to Customize → Plugins → Add → Add marketplace, enter `erxonxi/erxonxi-skills`, then install the `erxonxi-skills` plugin.

## Skills

| Skill | Covers |
|---|---|
| `erxonxi-architecture` | Bounded contexts, modules, domain/application/infrastructure layers, use cases, entry points, composition root, collaboration between contexts |
| `erxonxi-domain-modeling` | Aggregates, value objects, domain events, domain errors, repositories, criteria, read models |
| `erxonxi-testing` | Test levels, use case tests with mocked ports, Object Mothers, test doubles, naming, TDD |
| `erxonxi-clean-code` | Naming, functions, classes, smells and refactorings, design patterns, simple design |
| `erxonxi-infrastructure` | Adapters, event bus, retries and dead letters, transactions, outbox and inbox, caching, projections, schema |
| `erxonxi-frontend` | How much architecture a client needs, components, state, UI tests, CSS architecture, accessibility |
| `erxonxi-workflow` | Agent memory layers, research/plan/implement, vertical-slice plans, specs, commits, project scaffolding |

Every skill starts from the same rule: the project's existing convention wins. A skill only decides when the project has no precedent.

## Also in this repo

- [PHILOSOPHY.md](PHILOSOPHY.md): the reasoning behind the skills, the default choices and what is deliberately avoided. Spanish version: [FILOSOFIA.md](FILOSOFIA.md).
- [AGENTS-snippet.md](AGENTS-snippet.md): a short always-on version to paste into a global `AGENTS.md` or `CLAUDE.md`.

## License

[MIT](LICENSE)
