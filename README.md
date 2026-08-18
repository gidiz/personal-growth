# Personal Growth OS — Complete Foundation Package

This package combines the project's product, architecture, engineering-governance, agent, and repository-rule files.

## Canonical sources of truth

- `docs/product/PRD.md`
- `docs/architecture/HLD.md`
- `docs/architecture/LLD.md`
- `docs/adr/`
- `docs/engineering/DEVELOPMENT_PROCESS.md`

## Agent / repository governance

- `AGENTS.md`
- `.doc/`
- `.rule/`

## Next layer to add

The `.github/` execution layer is intentionally not included yet because the custom Copilot agents, issue templates, prompts, and exact MCP tool allowlists have not yet been finalized.

Planned:

```text
.github/
├── copilot-instructions.md
├── agents/
├── instructions/
├── prompts/
└── ISSUE_TEMPLATE/
```


## Copilot execution layer

The package now also includes:

- `.github/copilot-instructions.md`
- 9 custom agent profiles under `.github/agents/`
- path-specific instructions under `.github/instructions/`
- reusable workflow prompts under `.github/prompts/`
- GitHub Issue Forms under `.github/ISSUE_TEMPLATE/`
- `.github/SETUP_CHECKLIST.md`

MCP server credentials/configuration are intentionally not hard-coded in this package. Configure them at repository/IDE/platform level according to ADR-007 and the setup checklist.
