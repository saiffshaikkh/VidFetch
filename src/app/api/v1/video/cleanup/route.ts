// ============================================================
// POST /api/v1/video/cleanup
// Deletes temporary video from ImageKit after download or expiry
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { cleanupRemoteFile, runTTLReaper } from "@/lib/services/cleanup.service";
import { logger } from "@/lib/utils/logger";
import type { ApiResponse } from "@/types";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body || typeof body.fileId !== "string" || !body.fileId.trim()) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: "fileId is required to cleanup a video" },
        { status: 400 }
      );
    }

    const fileId = body.fileId.trim();
    logger.info(`Explicit cleanup requested for fileId: ${fileId}`);

    await cleanupRemoteFile(fileId);

    // Opportunistically run TTL reaper on cleanup to sweep any older expired files
    runTTLReaper().catch((err) => {
      logger.warn("Opportunistic TTL reaper warning:", err);
    });

    return NextResponse.json<ApiResponse<{ message: string }>>(
      {
        success: true,
        data: { message: "Video successfully removed from temporary storage." },
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    const error = err as Error;
    logger.error("Error in /api/v1/video/cleanup:", error.message);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message || "Failed to cleanup video.",
      },
      { status: 500 }
    );
  }
}
