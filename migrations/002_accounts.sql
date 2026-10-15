CREATE TABLE accounts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id bigint NOT NULL UNIQUE REFERENCES visitors(id),
  email text NOT NULL UNIQUE CHECK (email = lower(email)),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 80),
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE account_sessions (
  token_hash text PRIMARY KEY,
  account_id bigint NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL DEFAULT now() + interval '7 days'
);
CREATE INDEX account_sessions_account_idx ON account_sessions(account_id);
CREATE INDEX account_sessions_expiry_idx ON account_sessions(expires_at);
CREATE TABLE request_limits (
  bucket text PRIMARY KEY,
  count integer NOT NULL,
  resets_at timestamptz NOT NULL
);
