CREATE TABLE visitors (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  token_hash text NOT NULL UNIQUE,
  active_topic text,
  expires_at timestamptz NOT NULL DEFAULT now() + interval '30 days'
);

CREATE TABLE study_sessions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  visitor_id bigint NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  goal text NOT NULL CHECK (char_length(goal) BETWEEN 1 AND 600),
  answers jsonb NOT NULL DEFAULT '{}' CHECK (jsonb_typeof(answers) = 'object'),
  completed_lessons jsonb NOT NULL DEFAULT '[]' CHECK (jsonb_typeof(completed_lessons) = 'array'),
  notes jsonb NOT NULL DEFAULT '{}' CHECK (jsonb_typeof(notes) = 'object'),
  submitted_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(visitor_id, topic_id)
);
