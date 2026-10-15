ALTER TABLE study_sessions ADD COLUMN evaluation jsonb;
ALTER TABLE study_sessions ADD COLUMN conversation jsonb NOT NULL DEFAULT '[]'
  CHECK (jsonb_typeof(conversation) = 'array');
CREATE TABLE ai_usage (
  profile_id bigint NOT NULL REFERENCES visitors(id),
  day date NOT NULL DEFAULT CURRENT_DATE,
  calls integer NOT NULL DEFAULT 0,
  PRIMARY KEY(profile_id, day)
);
CREATE TABLE ai_pending (
  profile_id bigint PRIMARY KEY REFERENCES visitors(id),
  request_id text NOT NULL,
  expires_at timestamptz NOT NULL
);
