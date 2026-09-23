"use client";

import React from "react";
import type { PipelineStatus } from "@/types";
import { Card } from "@/components/ui/card";

interface StatusStepperProps {
  status: PipelineStatus;
}

const STEPS = [
  {
    key: "fetching",
    label: "URL Ingestion",
    desc: "Manifest lookup",
    icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  },
  {
    key: "downloading",
    label: "Stream Fetch",
    desc: "Downloading chunks",
    icon: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10",
  },
  {
    key: "processing",
    label: "Remuxing",
    desc: "FFmpeg lossless",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    key: "uploading",
    label: "CDN Delivery",
    desc: "Signed ephemeral link",
    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  },
] as const;

export function StatusStepper({ status }: StatusStepperProps) {
  // Hide completely when idle, error, or ready (so download card is directly in view without scroll!)
  if (status === "idle" || status === "error" || status === "ready") return null;

  const currentStepIndex = (() => {
    switch (status) {
      case "fetching":
        return 0;
      case "downloading":
        return 1;
      case "processing":
        return 2;
      case "uploading":
        return 3;
      default:
        return 0;
    }
  })();

  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 0.6) / STEPS.length) * 100));

  return (
    <Card className="w-full max-w-4xl mx-auto mt-4 sm:mt-6 border-indigo-100 shadow-md overflow-hidden animate-fadeIn">
      {/* COMPACT MOBILE VIEW (<640px): Takes only ~75px height instead of 500px! */}
      <div className="block sm:hidden p-4 bg-white">
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={STEPS[currentStepIndex].icon}
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                  Phase {currentStepIndex + 1}/4
                </span>
                <span className="text-xs font-bold text-slate-800 truncate">
                  {STEPS[currentStepIndex].label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {STEPS[currentStepIndex].desc}
              </p>
            </div>
          </div>
          <span className="text-xs font-extrabold text-indigo-600 shrink-0">
            {progressPercent}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Connected Mini Step Dots */}
        <div className="flex items-center justify-between px-1">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div key={step.key} className="flex items-center gap-1">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isDone
                      ? "bg-emerald-500"
                      : isCurrent
                      ? "bg-indigo-600 ring-2 ring-indigo-200 scale-125"
                      : "bg-slate-200"
                  }`}
                />
                <span
                  className={`text-[9px] font-medium hidden xs:inline ${
                    isCurrent ? "text-indigo-600 font-bold" : "text-slate-400"
                  }`}
                >
                  {step.label.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* TABLET / DESKTOP VIEW (>=640px) */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between p-4 bg-slate-50/70 border-b border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            Processing Pipeline
          </h4>
          <span className="text-xs text-slate-600 font-medium">
            Phase {currentStepIndex + 1}/4 — {STEPS[currentStepIndex]?.label} ({progressPercent}%)
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-white">
          {STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.key}
                className={`relative rounded-xl border p-3.5 transition-all duration-300 ${
                  isDone
                    ? "border-emerald-200 bg-emerald-50/40"
                    : isCurrent
                    ? "border-indigo-400 bg-indigo-50/40 shadow-md ring-1 ring-indigo-500/20"
                    : "border-slate-100 bg-slate-50/40 opacity-70"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {isDone ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className={`w-4 h-4 ${isCurrent ? "animate-pulse" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[10px] font-bold tracking-wider uppercase block ${
                        isDone
                          ? "text-emerald-700"
                          : isCurrent
                          ? "text-indigo-700"
                          : "text-slate-400"
                      }`}
                    >
                      PHASE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h5 className="text-xs font-bold text-slate-900 truncate mt-0.5">
                      {step.label}
                    </h5>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {isCurrent && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-500 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-indigo-300 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
