# Dev Loop Prompt

Run one iteration of the project's delivery loop for the active ticket.

1. Determine current stage: Implementation, Review, Security FE, Security BE, or QA.
2. Perform only that role/stage.
3. If PASS, identify the next required gate from Security Impact and DEVELOPMENT_PROCESS.
4. If changes are required, return precise findings to the implementing role.
5. Increment the ticket iteration only when work returns from a gate to implementation.
6. At iteration 3 failure, stop and escalate to Architect with:
   - repeated failure pattern
   - unresolved requirement/design issue
   - recommended split/ADR/clarification

Never skip required Security or QA gates.
Never modify Production.
