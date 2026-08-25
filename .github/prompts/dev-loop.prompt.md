---
mode: agent
description: Run the controlled implementation-review-security-QA loop for one ticket.
---

1. Verify Ready; move to In Progress.
2. Implement and validate Local/Test.
3. Move to In Review; Reviewer returns APPROVE | CHANGES_REQUIRED | BLOCKED.
4. Reviewer CHANGES_REQUIRED -> fix, increment shared review-cycle counter, re-run required gates.
5. Medium/High Security Impact -> Security Review; Security returns PASS | CHANGES_REQUIRED | BLOCKED.
6. Security CHANGES_REQUIRED -> fix, increment the same counter, re-run relevant prior gates.
7. Move to QA only after required review/security pass.
8. QA returns PASS | FAIL | BLOCKED.
9. QA FAIL -> fix, increment the same counter, re-run relevant gates.
10. Done only after all required gates pass.

Global budget: `MAX_REVIEW_CYCLES = 3`.

Any BLOCKED result -> Status Blocked + `needs-human` + blocker summary.
Third failed correction cycle -> same escalation.

Do not confuse review cycles with GitHub Iteration.
