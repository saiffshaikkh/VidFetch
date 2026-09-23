"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidVideoUrl } from "@/lib/constants/platforms";

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

export function UrlForm({ onSubmit, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [justPasted, setJustPasted] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text.trim());
        setInputError("");
        setJustPasted(true);
        setTimeout(() => setJustPasted(false), 2000);
      }
    } catch {
      // Clipboard permissions denied
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = url.trim();

    if (!trimmed) {
      setInputError("Please enter or paste a video URL.");
      return;
    }

    if (!isValidVideoUrl(trimmed)) {
      setInputError("Please enter a valid link starting with http:// or https://");
      return;
    }

    setInputError("");
    onSubmit(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto px-1 sm:px-0">
      <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 sm:py-2 flex-1 min-w-0">
          <div className="text-slate-400 shrink-0 pl-1">
            <svg
              className="w-5 h-5 text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>

          <Input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (inputError) setInputError("");
            }}
            placeholder="Paste video URL from YouTube, Instagram, TikTok..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none shadow-none text-slate-900 placeholder:text-slate-400 text-sm sm:text-base focus:ring-0 focus-visible:ring-0 p-0 h-10"
          />

          {url && !isLoading && (
            <button
              type="button"
              onClick={() => setUrl("")}
              className="shrink-0 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Clear URL"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {!url && !isLoading && (
            <button
              type="button"
              onClick={handlePaste}
              className="shrink-0 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
              title="Paste from clipboard"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>{justPasted ? "Pasted!" : "Paste"}</span>
            </button>
          )}
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          disabled={isLoading || !url.trim()}
          className="w-full sm:w-auto px-6 py-3 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/25 transition-all shrink-0 cursor-pointer"
        >
          {isLoading ? "⚡ Processing..." : "⚡ Fetch Stream"}
        </Button>
      </div>

      {inputError && (
        <div className="mt-2.5 flex items-center justify-center gap-1.5 text-sm font-medium text-red-600 animate-fadeIn">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{inputError}</span>
        </div>
      )}

      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-slate-500 text-center px-2">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Direct HD & 4K Streams
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          No Watermarks
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
          Zero Registration
        </span>
      </div>
    </form>
  );
}
