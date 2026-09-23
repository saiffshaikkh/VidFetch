// ============================================================
// yt-dlp service — wraps the yt-dlp CLI binary
// Handles video info extraction and downloading
// ============================================================

import { execFile } from "child_process";
import { promisify } from "util";
import path from "path";
import { logger } from "@/lib/utils/logger";
import type { VideoMetadata } from "@/types";

const execFileAsync = promisify(execFile);

// Get yt-dlp binary path from the installed package
const getYtDlpPath = () => {
  const isWindows = process.platform === "win32";
  const binaryName = isWindows ? "yt-dlp.exe" : "yt-dlp";
  return path.resolve(process.cwd(), "node_modules", "yt-dlp-exec", "bin", binaryName);
};

/** Maximum execution time for yt-dlp commands (ms) */
const DOWNLOAD_TIMEOUT_MS = 120_000; // 2 minutes
const INFO_TIMEOUT_MS = 30_000; // 30 seconds

/**
 * Extracts video metadata without downloading.
 * Runs: yt-dlp --dump-json --playlist-items 1 --no-warnings <url>
 */
export async function extractVideoInfo(url: string): Promise<VideoMetadata> {
  logger.info(`Extracting video info for: ${url}`);

  const ytDlpPath = getYtDlpPath();
  const args = [
    "--dump-json",
    "--playlist-items", "1",
    "--no-warnings",
    "--no-check-certificates",
    url,
  ];

  try {
    const { stdout } = await execFileAsync(ytDlpPath, args, {
      timeout: INFO_TIMEOUT_MS,
      maxBuffer: 10 * 1024 * 1024,
    });

    const data = JSON.parse(stdout);

    // Sanitize video ID (remove URL params and special chars)
    const rawId = data.id || "unknown";
    const sanitizedId = rawId.split('?')[0].replace(/[^a-zA-Z0-9_-]/g, '_');

    const info: VideoMetadata = {
      id: sanitizedId,
      title: data.title || data.fulltitle || "Untitled Video",
      duration: data.duration || null,
      thumbnail: data.thumbnail || null,
      ext: data.ext || "mp4",
      filesize: data.filesize || data.filesize_approx || null,
      webpage_url: data.webpage_url || url,
    };

    logger.info(`Video info extracted: "${info.title}" (${info.duration}s)`);
    return info;
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Failed to extract video info: ${error.message}`);
  }
}

/**
 * Downloads a video to the specified output path.
 * Preserves the exact yt-dlp flags from the reference script.py:
 *   --playlist-items 1
 *   --restrict-filenames
 *   --merge-output-format mp4
 */
export async function downloadVideo(url: string, outputPath: string): Promise<string> {
  logger.info(`Downloading video to: ${outputPath}`);

  const ytDlpPath = getYtDlpPath();
  const args = [
    "--playlist-items", "1",
    "--restrict-filenames",
    "--merge-output-format", "mp4",
    "--no-warnings",
    "--no-check-certificates",
    "--no-playlist",
    "-o", outputPath,
    url,
  ];

  try {
    const { stdout, stderr } = await execFileAsync(ytDlpPath, args, {
      timeout: DOWNLOAD_TIMEOUT_MS,
      maxBuffer: 10 * 1024 * 1024,
    });

    if (stderr) {
      logger.warn("yt-dlp stderr:", stderr);
    }

    logger.info(`Download completed: ${outputPath}`);
    return outputPath;
  } catch (err: unknown) {
    const error = err as Error;
    throw new Error(`Video download failed: ${error.message}`);
  }
}

/**
 * Checks if the yt-dlp binary is accessible.
 */
export async function isYtdlpAvailable(): Promise<boolean> {
  try {
    const ytDlpPath = getYtDlpPath();
    await execFileAsync(ytDlpPath, ["--version"], { timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}
