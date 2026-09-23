// ============================================================
// Cleanup service — local and remote file lifecycle management
// ============================================================

import { safeUnlink } from "@/lib/utils/fileSystem";
import { deleteVideo, purgeExpiredFiles } from "@/lib/services/imagekit.service";
import { env } from "@/lib/config/env.config";
import { logger } from "@/lib/utils/logger";

/**
 * Deletes a local temp file. Safe to call even if the file doesn't exist.
 */
export async function cleanupLocalFile(filePath: string): Promise<void> {
  await safeUnlink(filePath);
}

/**
 * Deletes a file from ImageKit by fileId.
 */
export async function cleanupRemoteFile(fileId: string): Promise<void> {
  try {
    await deleteVideo(fileId);
    logger.info(`Remote cleanup complete for fileId: ${fileId}`);
  } catch (err: unknown) {
    const error = err as Error;
    logger.error(`Remote cleanup failed for fileId ${fileId}:`, error.message);
    // Don't throw — cleanup failures should not crash the caller
  }
}

/**
 * Cleans up multiple local temp files. Used in finally blocks
 * to guarantee no files are orphaned on the server.
 */
export async function cleanupLocalFiles(...filePaths: string[]): Promise<void> {
  await Promise.all(filePaths.map((p) => safeUnlink(p)));
}

/**
 * Runs the TTL reaper to purge expired ImageKit files.
 * Can be triggered periodically or on each API request.
 */
export async function runTTLReaper(): Promise<number> {
  return purgeExpiredFiles(env.ephemeralTtlMinutes);
}
