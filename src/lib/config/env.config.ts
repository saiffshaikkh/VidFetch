// ============================================================
// Centralized environment configuration with runtime validation
// ============================================================

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

function getOptionalEnvVar(key: string, fallback: string = ""): string {
  return process.env[key] || fallback;
}

function getNumericEnvVar(key: string, fallback: number): number {
  const raw = process.env[key];
  if (!raw) return fallback;
  const parsed = parseInt(raw, 10);
  return isNaN(parsed) ? fallback : parsed;
}

export const env = {
  // Server
  port: getNumericEnvVar("PORT", 5000),
  nodeEnv: getOptionalEnvVar("NODE_ENV", "development"),
  isDev: getOptionalEnvVar("NODE_ENV", "development") === "development",

  // ImageKit
  imagekit: {
    publicKey: getEnvVar("IMAGEKIT_PUBLIC_KEY"),
    privateKey: getEnvVar("IMAGEKIT_PRIVATE_KEY"),
    urlEndpoint: getEnvVar("IMAGEKIT_URL_ENDPOINT"),
  },

  // Temp storage (defaults to /tmp on Vercel serverless)
  tempDir: getOptionalEnvVar("TEMP_DIR", process.env.VERCEL ? "/tmp" : "./temp"),

  // Lifecycle
  ephemeralTtlMinutes: getNumericEnvVar("EPHEMERAL_TTL_MINUTES", 15),
  maxFileSizeMB: getNumericEnvVar("MAX_FILE_SIZE_MB", 150),
} as const;
