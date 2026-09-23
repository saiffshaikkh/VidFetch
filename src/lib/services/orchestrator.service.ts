// ============================================================
// Orchestrator service — the full video download pipeline
// Ties together: yt-dlp → FFmpeg → ImageKit → cleanup
// ============================================================

import { extractVideoInfo, downloadVideo } from "@/lib/services/ytdlp.service";
import { remuxVideo } from "@/lib/services/ffmpeg.service";
import { uploadVideo } from "@/lib/services/imagekit.service";
import { cleanupLocalFiles } from "@/lib/services/cleanup.service";
import { ensureTempDir, generateTempPath, getFileSize } from "@/lib/utils/fileSystem";
import { env } from "@/lib/config/env.config";
import { logger } from "@/lib/utils/logger";
import type { VideoProcessResult } from "@/types";

/**
 * Executes the complete video processing pipeline:
 *
 * 1. Extract video metadata (yt-dlp --dump-json)
 * 2. Download video to temp directory (yt-dlp)
 * 3. Remux to fix fMP4 headers + add faststart (FFmpeg -c copy)
 * 4. Upload remuxed video to ImageKit CDN
 * 5. Delete all local temp files (guaranteed via finally)
 * 6. Return download URL and metadata to caller
 *
 * @param url - The video URL to process
 * @returns VideoProcessResult with CDN download URL
 * @throws Error if any pipeline step fails
 */
export async function processVideo(url: string): Promise<VideoProcessResult> {
  // Track all temp files for guaranteed cleanup
  const tempFiles: string[] = [];

  try {
    // Step 0: Ensure temp directory exists
    await ensureTempDir();

    // Step 1: Extract video metadata
    logger.info("Pipeline Step 1/5: Extracting video info...");
    const videoInfo = await extractVideoInfo(url);

    // Step 2: Download video
    logger.info("Pipeline Step 2/5: Downloading video...");
    const downloadPath = generateTempPath(`${videoInfo.id}.mp4`);
    tempFiles.push(downloadPath);
    await downloadVideo(url, downloadPath);

    // Validate file size
    const downloadSize = await getFileSize(downloadPath);
    const maxBytes = env.maxFileSizeMB * 1024 * 1024;
    if (downloadSize > maxBytes) {
      throw new Error(
        `Video file size (${Math.round(downloadSize / 1024 / 1024)}MB) exceeds the maximum allowed size (${env.maxFileSizeMB}MB).`
      );
    }

    // Step 3: Remux (fix fMP4 headers + faststart)
    logger.info("Pipeline Step 3/5: Remuxing video...");
    const remuxPath = generateTempPath(`${videoInfo.id}-remuxed.mp4`);
    tempFiles.push(remuxPath);
    const finalPath = await remuxVideo(downloadPath, remuxPath);

    // Step 4: Upload to ImageKit
    logger.info("Pipeline Step 4/5: Uploading to ImageKit...");
    const sanitizedTitle = videoInfo.title
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 100);
    const fileName = `${sanitizedTitle}_${videoInfo.id}.mp4`;
    const uploadResult = await uploadVideo(finalPath, fileName);

    // Step 5: Calculate expiry timestamp
    const expiresAt = Date.now() + env.ephemeralTtlMinutes * 60 * 1000;

    logger.info("Pipeline Step 5/5: Complete!");
    logger.info(`Download URL: ${uploadResult.url}`);

    return {
      fileId: uploadResult.fileId,
      downloadUrl: uploadResult.url,
      title: videoInfo.title,
      duration: videoInfo.duration,
      sizeBytes: uploadResult.size || downloadSize,
      expiresAt,
    };
  } finally {
    // GUARANTEED: Always clean up local temp files, even on error
    logger.info(`Cleaning up ${tempFiles.length} temp file(s)...`);
    await cleanupLocalFiles(...tempFiles);
  }
}
