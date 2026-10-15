ALTER TABLE accounts ADD COLUMN email_verified_at timestamptz;
-- Existing sessions predate proof of mailbox ownership; require a fresh confirmation.
DELETE FROM account_sessions;
CREATE TABLE auth_challenges (
  token_hash text PRIMARY KEY,
  email text NOT NULL,
  purpose text NOT NULL CHECK (purpose IN ('register', 'login')),
  account_id bigint REFERENCES accounts(id) ON DELETE CASCADE,
  profile_id bigint REFERENCES visitors(id),
  name text,
  password_hash text NOT NULL,
  code_hash text NOT NULL,
  attempts integer NOT NULL DEFAULT 0 CHECK (attempts BETWEEN 0 AND 5),
  sends integer NOT NULL DEFAULT 1 CHECK (sends BETWEEN 1 AND 3),
  sent_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '10 minutes',
  CHECK ((purpose = 'login' AND account_id IS NOT NULL) OR
    (purpose = 'register' AND profile_id IS NOT NULL AND name IS NOT NULL))
);
CREATE INDEX auth_challenges_expiry_idx ON auth_challenges(expires_at);
