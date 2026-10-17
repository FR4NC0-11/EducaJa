/** Deployment identity comes only from server configuration, never request headers. */
/** @param {Record<string, string | undefined>} env */
export function appOrigins(env = process.env) {
  if (env.VERCEL === "1" && env.VERCEL_ENV === "preview") {
    const origins = [env.VERCEL_BRANCH_URL, env.VERCEL_URL]
      .filter((host) => typeof host === "string" && /^[a-z0-9-]+\.vercel\.app$/.test(host))
      .map((host) => `https://${host}`);
    if (origins.length) return [...new Set(origins)];
  }
  return env.APP_ORIGIN ? [env.APP_ORIGIN] : [];
}

/** @param {Record<string, string | undefined>} env */
export function secureCookies(env = process.env) {
  return (
    env.VERCEL === "1" ||
    env.COOKIE_SECURE === "true" ||
    appOrigins(env).some((origin) => origin.startsWith("https://"))
  );
}
