"use client";

import React, { useState } from "react";
import type { VideoProcessResult } from "@/types";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

interface VideoCardProps {
  result: VideoProcessResult;
  onCleanup: (fileId: string) => Promise<void>;
  onReset: () => void;
}

export function VideoCard({ result, onCleanup, onReset }: VideoCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const formatSize = (bytes: number) => {
    if (!bytes) return "Standard Quality";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "Short Video";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleDownload = () => {
    setDownloaded(true);
    // Open download in new tab or trigger browser download
    const link = document.createElement("a");
    link.href = result.downloadUrl;
    link.target = "_blank";
    link.download = `${result.title}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onCleanup(result.fileId);
      setDeleted(true);
    } finally {
      setIsDeleting(false);
    }
  };

  if (deleted) {
    return (
      <Card className="w-full bg-slate-900/60 border border-slate-800 p-8 text-center backdrop-blur-md">
        <CardHeader className="mb-3">
          <div className="w-12 h-12 rounded-full bg-indigo-500/15 text-indigo-400 flex items-center justify-center mx-auto text-xl font-bold">
            ✓
          </div>
          <h3 className="text-lg font-semibold text-white">Temporary Video Purged</h3>
          <p className="text-sm text-slate-400 mt-2">
            The file has been completely removed from ImageKit CDN and local server storage.
          </p>
        </CardHeader>
        <CardFooter>
          <Button variant="secondary" onClick={onReset}>
            Download Another Video
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-xl border-indigo-200/90 bg-white rounded-2xl overflow-hidden animate-fadeIn">
      <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-slate-100 bg-gradient-to-r from-indigo-50/70 via-white to-blue-50/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 border border-indigo-200">
                ✓ Ready to Download
              </span>
              <Badge variant="secondary">MP4</Badge>
              <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                {formatSize(result.sizeBytes)} • {formatDuration(result.duration)}
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
              {result.title}
            </h3>
            <div className="flex sm:hidden items-center gap-2 text-xs text-slate-500 font-medium">
              <span>{formatSize(result.sizeBytes)}</span>
              <span>•</span>
              <span>{formatDuration(result.duration)}</span>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-xs text-slate-400">
            <span className="text-indigo-700 font-semibold bg-indigo-50 px-2 py-0.5 rounded sm:bg-transparent sm:p-0">
              Ephemeral CDN link
            </span>
            <span className="text-[11px] text-amber-600 sm:text-slate-400">Auto-expires</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
          <Button
            size="lg"
            onClick={handleDownload}
            className="w-full sm:flex-1 py-3.5 sm:py-3 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 active:scale-98 transition-all cursor-pointer"
          >
            {downloaded ? "✓ Downloaded — Click to Save Again" : "⬇ Download MP4 Video"}
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleDelete}
              isLoading={isDeleting}
              className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 cursor-pointer"
            >
              🗑 Purge
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={onReset}
              className="flex-1 sm:flex-initial text-xs sm:text-sm py-2.5 sm:py-3 cursor-pointer"
            >
              + New URL
            </Button>
          </div>
        </div>

        {downloaded && (
          <p className="mt-4 text-center text-gray-600">
            If download didn't start,{" "}
            <a
              href={result.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              click here
            </a>
          </p>
        )}
      </CardContent>
    </Card>
  );
}
