// ============================================================
// File system utilities: temp directory, safe unlink, path gen
// ============================================================

import { mkdir, unlink, stat } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { env } from "@/lib/config/env.config";
import { logger } from "./logger";

/**
 * Ensures the temp directory exists. Creates it recursively if missing.
 */
export async function ensureTempDir(): Promise<string> {
  const dir = env.tempDir;
  await mkdir(dir, { recursive: true });
  return dir;
}

/**
 * Generates a unique temp file path with a UUID prefix to avoid collisions.
 * Example: ./temp/a1b2c3d4-video.mp4
 */
export function generateTempPath(suffix: string = "video.mp4"): string {
  const uuid = randomUUID().slice(0, 8);
  return join(env.tempDir, `${uuid}-${suffix}`);
}

/**
 * Safely deletes a file. Swallows ENOENT errors (file already gone).
 * Logs other errors but does not throw.
 */
export async function safeUnlink(filePath: string): Promise<void> {
  try {
    await unlink(filePath);
    logger.info(`Deleted temp file: ${filePath}`);
  } catch (err: unknown) {
    const error = err as NodeJS.ErrnoException;
    if (error.code === "ENOENT") {
      // File already gone — that's fine
      return;
    }
    logger.error(`Failed to delete file ${filePath}:`, error.message);
  }
}

/**
 * Gets the file size in bytes. Returns 0 if the file doesn't exist.
 */
export async function getFileSize(filePath: string): Promise<number> {
  try {
    const stats = await stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}
