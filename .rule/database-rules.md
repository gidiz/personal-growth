# Database Rules

- migrations-as-code only for permanent schema changes.
- every private user-owned table uses RLS.
- user data is scoped by `user_id`.
- test RLS behavior, not only table CRUD.
- never expose service-role credentials to the client.
- vector search functions must preserve user isolation.
