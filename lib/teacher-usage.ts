export function teacherDailyLimit() {
  return Math.max(1, Math.min(100, Number.parseInt(process.env.AI_DAILY_LIMIT || "20", 10) || 20));
}
