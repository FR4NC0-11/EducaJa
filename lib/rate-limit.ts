import { getDb } from "./db";

// A database bucket works across server processes; it does not trust proxy IP headers.
export async function consumeLimit(bucket: string, maximum: number, seconds: number) {
  const result = await getDb().query<{ count: number }>(
    `INSERT INTO request_limits (bucket, count, resets_at)
    VALUES ($1, 1, now() + $2 * interval '1 second')
    ON CONFLICT (bucket) DO UPDATE SET
      count = CASE WHEN request_limits.resets_at <= now() THEN 1 ELSE request_limits.count + 1 END,
      resets_at = CASE WHEN request_limits.resets_at <= now() THEN EXCLUDED.resets_at ELSE request_limits.resets_at END
    RETURNING count`,
    [bucket, seconds],
  );
  return result.rows[0].count <= maximum;
}
