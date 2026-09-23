"use client";

import { useState, useCallback, useRef } from "react";
import type { PipelineStatus, VideoProcessResult, ApiResponse } from "@/types";

export function useVideoDownloader() {
  const [status, setStatus] = useState<PipelineStatus>("idle");
  const [result, setResult] = useState<VideoProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  const clearTimers = () => {
    timerRef.current.forEach((t) => clearTimeout(t));
    timerRef.current = [];
  };

  const processUrl = useCallback(async (url: string) => {
    clearTimers();
    setError(null);
    setResult(null);
    setStatus("fetching");

    // Realistic UI stepper milestones for UX while server works
    timerRef.current.push(
      setTimeout(() => setStatus("downloading"), 2000),
      setTimeout(() => setStatus("processing"), 6000),
      setTimeout(() => setStatus("uploading"), 10000)
    );

    try {
      const res = await fetch("/api/v1/video/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data: ApiResponse<VideoProcessResult> = await res.json();

      clearTimers();

      if (!res.ok || !data.success || !data.data) {
        throw new Error(data.error || "Failed to process video");
      }

      setResult(data.data);
      setStatus("ready");
    } catch (err: unknown) {
      clearTimers();
      const message = err instanceof Error ? err.message : "An unexpected error occurred";
      setError(message);
      setStatus("error");
    }
  }, []);

  const cleanup = useCallback(async (fileId?: string) => {
    const targetFileId = fileId || result?.fileId;
    if (!targetFileId) return;

    try {
      await fetch("/api/v1/video/cleanup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: targetFileId }),
      });
    } catch (err) {
      console.warn("Cleanup notice:", err);
    }
  }, [result]);

  const reset = useCallback(() => {
    clearTimers();
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return {
    status,
    result,
    error,
    processUrl,
    cleanup,
    reset,
  };
}
