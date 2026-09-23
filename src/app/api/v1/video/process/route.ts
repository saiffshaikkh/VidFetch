// ============================================================
// POST /api/v1/video/process
// Full pipeline: URL validation -> download -> remux -> ImageKit upload -> cleanup
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { processVideo } from "@/lib/services/orchestrator.service";
import { isValidVideoUrl } from "@/lib/constants/platforms";
import { logger } from "@/lib/utils/logger";
import type { ApiResponse, VideoProcessResult } from "@/types";

export const maxDuration = 180; // 3 minutes timeout for Next.js serverless/node route if applicable
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.url !== "string" || !body.url.trim()) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Please provide a valid video URL in the request body." },
        { status: 400 }
      );
    }

    const trimmedUrl = body.url.trim();

    if (!isValidVideoUrl(trimmedUrl)) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "Invalid URL protocol. Must start with http:// or https://" },
        { status: 400 }
      );
    }

    logger.info(`Processing video request for URL: ${trimmedUrl}`);

    const result: VideoProcessResult = await processVideo(trimmedUrl);

    return NextResponse.json<ApiResponse<VideoProcessResult>>(
      {
        success: true,
        data: result,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    logger.error("Error in /api/v1/video/process:", error.message);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || "Failed to process video.",
      },
      { status: 500 }
    );
  }
}
