-- RED PATH EVIDENCE ONLY - DO NOT MERGE.
-- Every value below is fabricated. This file exists to prove the repo-hygiene
-- secret scan fires on true positives and stays silent on legitimate code.

-- The sbp_ personal-access-token shape is absent on purpose: GitHub push protection
-- rejects that shape outright, so it cannot reach CI. It is proven in a scratch repo.

-- Expected TRUE POSITIVES - the scan must print each of these lines.
select 'sb_secret_FAKEfake0123456789';
select 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiZmFrZSJ9.ZmFrZXNpZ25hdHVyZTAwMA';
SUPABASE_SERVICE_ROLE_KEY = "fabricated-not-a-real-value"

-- Expected NEGATIVE CONTROLS - the scan must not print any of these lines.
grant select on table public.profiles to service_role;
grant usage on schema public to service_role;
-- SUPABASE_SERVICE_ROLE_KEY=
-- The service_role key is server-side only and is never committed.
