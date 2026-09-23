// ============================================================
// GET /api/v1/video/health
// Diagnostic endpoint to check availability of yt-dlp, FFmpeg, ImageKit
// ============================================================

import { NextResponse } from "next/server";
import { isYtdlpAvailable } from "@/lib/services/ytdlp.service";
import { isFfmpegAvailable } from "@/lib/services/ffmpeg.service";
import { isImageKitAvailable } from "@/lib/services/imagekit.service";
import type { ApiResponse, HealthCheckResult } from "@/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const [ytdlpOk, ffmpegOk, imagekitOk] = await Promise.all([
    isYtdlpAvailable(),
    isFfmpegAvailable(),
    isImageKitAvailable(),
  ]);

  const allHealthy = ytdlpOk && ffmpegOk && imagekitOk;

  const result: HealthCheckResult = {
    status: allHealthy ? "ok" : "degraded",
    ytdlp: ytdlpOk,
    ffmpeg: ffmpegOk,
    imagekit: imagekitOk,
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json<ApiResponse<HealthCheckResult>>(
    {
      success: true,
      data: result,
    },
    { status: allHealthy ? 200 : 207 }
  );
}
