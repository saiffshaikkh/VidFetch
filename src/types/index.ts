// ============================================================
// Shared TypeScript interfaces for the video downloader pipeline
// ============================================================

/** Request body for POST /api/v1/video/process */
export interface VideoProcessRequest {
  url: string;
}

/** Metadata extracted from yt-dlp before/after download */
export interface VideoMetadata {
  id: string;
  title: string;
  duration: number | null;
  thumbnail: string | null;
  ext: string;
  filesize: number | null;
  webpage_url: string;
}

/** Successful result returned after the full pipeline completes */
export interface VideoProcessResult {
  fileId: string;
  downloadUrl: string;
  title: string;
  duration: number | null;
  sizeBytes: number;
  expiresAt: number; // Unix timestamp (ms)
}

/** Request body for POST /api/v1/video/cleanup */
export interface CleanupRequest {
  fileId: string;
}

/** Standard API response envelope */
export interface ApiResponse<T = undefined> {
  success: boolean;
  data?: T;
  error?: string;
}

/** Pipeline processing state — used by the frontend hook */
export type PipelineStatus =
  | "idle"
  | "fetching"
  | "downloading"
  | "processing"
  | "uploading"
  | "ready"
  | "error";

/** Health check response */
export interface HealthCheckResult {
  status: "ok" | "degraded";
  ytdlp: boolean;
  ffmpeg: boolean;
  imagekit: boolean;
  timestamp: string;
}
