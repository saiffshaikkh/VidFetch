import React from "react";
import { SUPPORTED_PLATFORMS } from "@/lib/constants/platforms";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";

export function SupportedPlatforms() {
  const platforms = [
    { name: "YouTube", icon: "▶️", color: "bg-red-50 border-red-200 text-red-700", features: "All videos, Shorts, Chapters, embedded CC subtitles & pure 360p audio." },
    { name: "TikTok", icon: "🎵", color: "bg-pink-50 border-pink-200 text-pink-700", features: "All stream bypasses without visual stamp/artifacts via compression." },
    { name: "X / Twitter", icon: "✕", color: "bg-blue-50 border-blue-200 text-blue-700", features: "Extract live & static MP4 representations from tweets media pools and Spaces." },
    { name: "Instagram", icon: "📷", color: "bg-purple-50 border-purple-200 text-purple-700", features: "Grabs via Reels, video posts, and carousel media via reduced stereo compression." },
    { name: "Reddit Video", icon: "🔴", color: "bg-orange-50 border-orange-200 text-orange-700", features: "Automatically stitches Reddit's separated audio track from DASH manifest." },
    { name: "Vimeo", icon: "▶", color: "bg-teal-50 border-teal-200 text-teal-700", features: "High-definition source via extraction of manifold artifact-free and HLS formats." },
    { name: "Twitch", icon: "🎮", color: "bg-indigo-50 border-indigo-200 text-indigo-700", features: "Download original stage videos and full FPS-passthru VODs at native bitrate." },
    { name: "+1,000 Platforms", icon: "🌐", color: "bg-gray-50 border-gray-200 text-gray-700", features: "Soundcloud, Dailymotion, Bilibili, custom repos/extracts via yt-dlp upstream synced." },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <Card key={platform.name} className="hover:border-indigo-300 hover:shadow-md transition-all">
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-xl ${platform.color} flex items-center justify-center mb-2`}>
                {platform.icon}
              </div>
              <CardTitle className="text-lg font-bold text-gray-900">{platform.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600 leading-relaxed">{platform.features}</CardDescription>
              {platform.name === "Reddit Video" && (
                <Badge variant="outline" className="mt-2">Video+Audio Merge</Badge>
              )}
              {platform.name === "TikTok" && (
                <Badge variant="outline" className="mt-2">Anti-fingerprint Sync</Badge>
              )}
              {platform.name === "Vimeo" && (
                <Badge variant="outline" className="mt-2">Original Bitrate</Badge>
              )}
              {platform.name === "Twitch" && (
                <Badge variant="outline" className="mt-2">RePlays Capable</Badge>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500 mt-8">
        + 1,000+ edge extractors online — <a href="#" className="text-indigo-600 hover:underline">Logo & platform sync</a>
      </p>
    </div>
  );
}
