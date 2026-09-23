// ============================================================
// ImageKit service — temporary video upload and deletion
// Uses @imagekit/nodejs SDK v7+
// ============================================================

import { ImageKit, toFile } from "@imagekit/nodejs";
import { readFile } from "fs/promises";
import { env } from "@/lib/config/env.config";
import { logger } from "@/lib/utils/logger";

// Singleton ImageKit client
let imagekitClient: ImageKit | null = null;

function getClient(): ImageKit {
  if (!imagekitClient) {
    imagekitClient = new ImageKit({
      privateKey: env.imagekit.privateKey,
    });
  }
  return imagekitClient;
}

/** The folder in ImageKit where ephemeral videos are stored */
const EPHEMERAL_FOLDER = "/ephemeral_videos";

export interface ImageKitUploadResult {
  fileId: string;
  url: string;
  name: string;
  size: number;
}

/**
 * Uploads a video file to ImageKit's ephemeral folder.
 * Returns the fileId (for later deletion) and the CDN URL.
 */
export async function uploadVideo(
  filePath: string,
  fileName: string
): Promise<ImageKitUploadResult> {
  logger.info(`Uploading to ImageKit: ${fileName}`);

  const client = getClient();
  const fileBuffer = await readFile(filePath);

  try {
    const uploadableFile = await toFile(fileBuffer, fileName);

    const result = await client.files.upload({
      file: uploadableFile,
      fileName: fileName,
      folder: EPHEMERAL_FOLDER,
      tags: ["ephemeral", "video-download"],
      useUniqueFileName: true,
    });

    if (!result.fileId) {
      throw new Error("ImageKit upload response missing fileId");
    }

    // Ensure we have a complete public CDN URL
    let downloadUrl = result.url || "";
    if (!downloadUrl.startsWith("http")) {
      const baseEndpoint = env.imagekit.urlEndpoint.replace(/\/$/, "");
      const pathSuffix = result.filePath?.replace(/^\//, "") || fileName;
      downloadUrl = `${baseEndpoint}/${pathSuffix}`;
    }

    logger.info(`Upload successful: ${downloadUrl} (fileId: ${result.fileId})`);

    return {
      fileId: result.fileId,
      url: downloadUrl,
      name: result.name || fileName,
      size: result.size || fileBuffer.length,
    };
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`ImageKit upload failed: ${error.message}`);
  }
}

/**
 * Deletes a file from ImageKit by its fileId.
 * Used for cleanup after user downloads or for TTL expiry.
 */
export async function deleteVideo(fileId: string): Promise<void> {
  logger.info(`Deleting from ImageKit: ${fileId}`);

  const client = getClient();

  try {
    await client.files.delete(fileId);
    logger.info(`File deleted from ImageKit: ${fileId}`);
  } catch (err: unknown) {
    const error = err as Error;
    logger.error(`ImageKit delete failed for ${fileId}:`, error.message);
    throw new Error(`ImageKit delete failed: ${error.message}`);
  }
}

/**
 * Lists files in the ephemeral folder and deletes any older than the TTL.
 * Acts as a garbage collector for orphaned uploads.
 */
export async function purgeExpiredFiles(ttlMinutes: number): Promise<number> {
  logger.info(`Running TTL reaper (TTL: ${ttlMinutes} minutes)`);

  const client = getClient();
  const cutoff = new Date(Date.now() - ttlMinutes * 60 * 1000);
  let purgedCount = 0;

  try {
    const assets = await client.assets.list({
      path: EPHEMERAL_FOLDER,
      limit: 100,
    });

    for (const asset of assets) {
      // Check if it's a file with createdAt and fileId
      if ("fileId" in asset && asset.fileId && asset.createdAt) {
        const createdAt = new Date(asset.createdAt);
        if (createdAt < cutoff) {
          try {
            await client.files.delete(asset.fileId);
            purgedCount++;
            logger.info(`Purged expired file: ${asset.name} (created: ${asset.createdAt})`);
          } catch (err: unknown) {
            const error = err as Error;
            logger.error(`Failed to purge file ${asset.fileId}:`, error.message);
          }
        }
      }
    }

    logger.info(`TTL reaper complete: ${purgedCount} files purged`);
    return purgedCount;
  } catch (err: unknown) {
    const error = err as Error;
    logger.error("TTL reaper error:", error.message);
    return purgedCount;
  }
}

/**
 * Checks if ImageKit is reachable by listing files.
 */
export async function isImageKitAvailable(): Promise<boolean> {
  try {
    const client = getClient();
    await client.assets.list({ limit: 1 });
    return true;
  } catch {
    return false;
  }
}
