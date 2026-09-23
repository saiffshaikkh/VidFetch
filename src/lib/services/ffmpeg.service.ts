// ============================================================
// FFmpeg service — handles video remuxing
// Skipped on Vercel (no bundled binary available for Next.js)
// Videos work without remux, just slightly lower browser compatibility
// ============================================================

import { logger } from "@/lib/utils/logger";

/**
 * Remuxes a video file to fix fragmented MP4 headers.
 *
 * NOTE: Remuxing is skipped in this version because bundled ffmpeg
 * packages don't work with Next.js module resolution.
 * Videos will still work, just without the faststart optimization.
 */
export async function remuxVideo(inputPath: string, outputPath: string): Promise<string> {
  logger.warn("FFmpeg remux skipped (not available in serverless environment)");
  return inputPath; // Return input path unchanged
}

/**
 * Checks if the FFmpeg binary is accessible.
 */
export async function isFfmpegAvailable(): Promise<boolean> {
  return false; // Always false in this version
}
