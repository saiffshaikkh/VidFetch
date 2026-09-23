"use client";

import React from "react";
import { UrlForm } from "@/components/UrlForm";
import { StatusStepper } from "@/components/StatusStepper";
import { VideoCard } from "@/components/VideoCard";
import { SupportedPlatforms } from "@/components/SupportedPlatforms";
import { useVideoDownloader } from "@/hooks/useVideoDownloader";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

export default function Home() {
  const { status, result, error, processUrl, cleanup, reset } =
    useVideoDownloader();
  const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const resultRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (status === "ready" && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent leading-none">
                VidFetch
              </span>
              <span className="text-[10px] text-indigo-600 font-bold tracking-wider">
                ONLINE EXTRACTOR
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              How it works
            </a>
            <a
              href="#platforms"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Supported platforms
            </a>
            <a
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#api"
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              API Docs
            </a>
            <a
              href="#downloader"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all"
            >
              Paste Link
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200/80 bg-white/95 backdrop-blur-md px-4 pt-3 pb-5 space-y-1.5 animate-fadeIn shadow-xl">
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors"
            >
              How it works
            </a>
            <a
              href="#platforms"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors"
            >
              Supported platforms
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors"
            >
              Features
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#api"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/70 transition-colors"
            >
              API Docs
            </a>
            <div className="pt-2">
              <a
                href="#downloader"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3 px-4 text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/25 active:scale-98 transition-all"
              >
                Paste Video Link
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Hero */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs sm:text-sm font-medium mb-6 max-w-full">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse shrink-0"></span>
            <span className="truncate">Engine v4.4 — yt-dlp & FFmpeg Remuxer</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-4 sm:mb-6 tracking-tight leading-tight">
            Download Videos. <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Simple.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8 px-2">
            Paste any video URL from YouTube, TikTok, Twitter/X, or Instagram. Fast worker extraction with pristine quality.
          </p>

          {/* URL Input */}
          <div id="downloader" className="mb-8">
            <UrlForm
              onSubmit={processUrl}
              isLoading={
                status !== "idle" && status !== "ready" && status !== "error"
              }
            />
          </div>

          {/* Status */}
          <StatusStepper status={status} />

          {/* Error */}
          {status === "error" && (
            <div className="max-w-2xl mx-auto mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-lg">⚠</span>
                <div className="text-left flex-1">
                  <h4 className="text-sm font-semibold text-red-900">
                    Error State
                  </h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
                <Button variant="secondary" size="sm" onClick={reset}>
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Result */}
          {status === "ready" && result && (
            <div ref={resultRef} className="max-w-2xl mx-auto mt-4 sm:mt-6">
              <VideoCard result={result} onCleanup={cleanup} onReset={reset} />
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
            <div>
              <div className="text-3xl font-bold text-gray-900">1,248,930+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                Streams Processed
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">1.8s</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                Average Turnaround Time
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">99.98%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                Extraction Success Rate
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">0 bytes</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide mt-1">
                Permanent Retention
              </div>
            </div>
          </div>
        </div>

        {/* Supported Platforms */}
        <div id="platforms" className="mt-20">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-center mb-8">
            Video Protocol Coverage
          </h2>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Supported Platforms & Video Manifests
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powered natively by yt-dlp parsers with automatic codec extraction
              against for maximum platform coverage sans hardcoded extractors
            </p>
          </div>
          <SupportedPlatforms />
        </div>

        {/* How it Works */}
        <div id="how-it-works" className="mt-24">
          <h2 className="text-sm font-semibold text-indigo-600 uppercase tracking-wider text-center mb-4">
            Architecture Pipeline
          </h2>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-16">
            How VidFetch Works Under the Hood
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="mb-2 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Phase 01
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                URL Ingestion & Manifest Lookup
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Engine receives user-supplied URL, identifies the host domain
                and initiates an ephemeral DRM-conscious manifest running the
                latest yt-dlp core extractors
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Latency: ~300ms
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <div className="mb-2 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Phase 02
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Lossless Remuxing (FFmpeg)
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Raw transport stream chunks flow through our clustered
                DASH/HLS/fMP4 worker that rebuilds streams into an optimized MP4
                container without re-encode or quality degradation
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Zero Re-encode
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Fast Codec
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="mb-2 text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                Phase 03
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">
                Signed Ephemeral Delivery
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Remuxed file lands in a geo-distributed temporary cache bucket.
                You receive a cryptographic download token valid for 5 minutes.
                Once retrieved, files are purged instantly
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-gray-500">
                <span className="px-2 py-1 bg-gray-100 rounded">
                  Zero-wait ephemeral purge
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div
          id="features"
          className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Max Quality Preservation
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Preserves true bit 4K (3840p, 1440p, 720p) @ 60fps and original
              audio profiles (High 3 AAC, Dolby atmos-embedded streams without
              uncompressed re-encoding
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-100 rounded">
                1080p & 4K Support
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              No User Tracking
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Zero registration, zero login panels, and zero analytical
              trackers. Complies built-for technical creators who respect
              digital privacy
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Ephemeral Scratch Storage
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Every file is held in a volatile in-memory object store that runs
              its own purge job against video entries. We never retain a catalog
              video catalog
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-3">
              Pure Local Installation
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Pure rust applications. You don't load external browser, FFmpeg
              binaries, or kernel-level video permissions installed on your
              personal device
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-24">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-center mb-4">
            Knowledge Base
          </h2>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How does VidFetch extract and remux video streams?",
                a: "VidFetch uses yt-dlp to extract video manifests from supported platforms, then remuxes the streams using FFmpeg without re-encoding. This preserves the original quality while combining audio and video tracks into a single MP4 container.",
              },
              {
                q: "Do I need to install any local software or extensions?",
                a: "No installation required. VidFetch is a fully web-based service. All processing happens on our servers, and you simply download the final file directly to your device through your browser.",
              },
              {
                q: "Where is my video temporarily stored?",
                a: "Videos are stored in ephemeral memory on our geo-distributed cache servers. Files are automatically purged within minutes after download or when the signed URL expires, whichever comes first.",
              },
              {
                q: "Are my downloads or URL history logged?",
                a: "No. We don't log URLs, track users, or maintain any download history. No registration or authentication is required, ensuring complete privacy for all users.",
              },
              {
                q: "Why do some video URLs fail or show an error?",
                a: "Failures typically occur due to DRM protection, region restrictions, private/unlisted content, or unsupported platforms. Some sites also implement rate limiting or bot detection that may block automated extraction.",
              },
              {
                q: "Does VidFetch work on mobile devices (iOS / Android)?",
                a: "Yes, VidFetch works on all modern mobile browsers. However, download behavior depends on your browser's settings. Some mobile browsers may stream files instead of saving them directly to your device.",
              },
            ].map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <Collapsible
                  key={i}
                  className={`group w-full transition-all duration-300 rounded-2xl overflow-hidden border ${
                    isOpen
                      ? "bg-white border-indigo-300/80 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/15"
                      : "bg-white/90 backdrop-blur-sm border-slate-200/90 shadow-xs hover:border-indigo-200 hover:shadow-md hover:bg-white"
                  }`}
                  open={isOpen}
                  onOpenChange={(open) => setOpenFaqIndex(open ? i : null)}
                >
                  <CollapsibleTrigger
                    className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 select-none"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span
                        className={`flex items-center justify-center shrink-0 w-8 h-8 rounded-xl text-xs font-bold tracking-tight transition-all duration-300 ${
                          isOpen
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                            : "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100 group-hover:scale-105"
                        }`}
                      >
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <span
                        className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                          isOpen
                            ? "text-indigo-950 font-bold"
                            : "text-slate-800 group-hover:text-indigo-600"
                        }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                          : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                      }`}
                    >
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t border-slate-100 mx-6" />
                    <div className="px-6 pt-4 pb-6">
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed pl-12 pr-2">
                        {faq.a}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div
          id="api"
          className="mt-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider mb-4 text-indigo-200">
            For API Automation
          </h2>
          <h3 className="text-3xl font-bold mb-4">
            Need programmatic video extraction?
          </h3>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Integrate our RESTful remuxing endpoint directly into your logistics
            workflows, AI datasets, or media transcription pipelines
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="px-6 py-3">
              Explore API Docs
            </Button>
            <Button className="px-6 py-3">CLI Reference</Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Resources
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Supported platforms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4">
                Legal & Source
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    DMCA Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    GitHub Repository
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-gray-900">
                  VidFetch
                </span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded">
                  Content-compliant
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Ultra-temporary server-side video extraction powered by yt-dlp &
                FFmpeg. Zero-host latent data retention; zero-back-catalog video
                entries.
              </p>
              <p className="text-xs text-gray-500">
                © 2025 VidFetch Engine Inc. All rights reserved. Open-source
                client.
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-xs text-gray-500 text-center">
              yt-dlp v2025.3.6 • Privacy v1.0 • FFmpeg v7.1
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
