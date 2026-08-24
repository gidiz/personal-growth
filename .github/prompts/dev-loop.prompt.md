---
mode: agent
description: Run the controlled implementation-review-security-QA loop for one ticket.
---

Run this workflow for one ticket:

1. Verify ticket is Ready.
2. Move to In Progress.
3. Implement.
4. Validate locally/Test.
5. Move to In Review.
6. Reviewer checks.
7. If blocker: fix and re-review.
8. Maximum automated review cycles: 3.
9. If Security Impact is Medium/High, move to Security Review and route correctly.
10. Move to QA.
11. QA validates acceptance/regression/cross-platform behavior.
12. Move to Done only when required gates pass.

If 3 review cycles fail:
- move to Blocked
- add `needs-human`
- summarize unresolved blockers

Do not confuse review cycles with the GitHub Iteration field.
