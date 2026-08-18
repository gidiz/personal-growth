# Implement Ticket Prompt

Implement only the active GitHub ticket.

Before editing:
1. Read `AGENTS.md`.
2. Read the active ticket.
3. Read only relevant PRD/HLD/LLD/ADRs and `.rule` files.
4. State the files/areas you expect to change.
5. Identify blockers or architecture conflicts before coding.

During implementation:
- obey Ticket Scope Lock;
- add/update required tests;
- do not implement follow-up tickets;
- do not use Production;
- do not weaken security to make checks pass.

Before finishing:
- run relevant lint/typecheck/tests/build checks available for the ticket;
- summarize changed files;
- map implementation to acceptance criteria;
- report remaining risks/blockers.

Do not claim PASS for Reviewer, Security, or QA; those are separate roles.
