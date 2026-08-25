# Database Rules

- migrations-as-code only for permanent schema changes.
- every private user-owned table uses RLS.
- normal user-owned tables are scoped by a `user_id` column.
- identity-table exception: `profiles` is 1:1 with `auth.users` and is scoped by its primary key, `profiles.id = auth.users.id`. Do not add a redundant `profiles.user_id`.
- test RLS behavior, not only table CRUD.
- never expose service-role credentials to the client.
- vector search functions must preserve user isolation.
