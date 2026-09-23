// ============================================================
// Structured logger for server-side operations
// ============================================================

type LogLevel = "info" | "warn" | "error" | "debug";

function formatMessage(level: LogLevel, message: string, ...args: unknown[]): string {
  const timestamp = new Date().toISOString();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
  return `${prefix} ${message} ${args.length ? JSON.stringify(args) : ""}`.trim();
}

export const logger = {
  info(message: string, ...args: unknown[]) {
    console.log(formatMessage("info", message, ...args));
  },

  warn(message: string, ...args: unknown[]) {
    console.warn(formatMessage("warn", message, ...args));
  },

  error(message: string, ...args: unknown[]) {
    console.error(formatMessage("error", message, ...args));
  },

  debug(message: string, ...args: unknown[]) {
    if (process.env.NODE_ENV === "development") {
      console.debug(formatMessage("debug", message, ...args));
    }
  },
};
