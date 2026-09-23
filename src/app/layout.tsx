import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VidFetch — Download Videos Simple",
  description:
    "Paste any supported video URL and extract ready-to-play media directly to your local workstation. High-speed worker remuxing with pristine codec retention.",
  keywords: [
    "video downloader",
    "yt-dlp",
    "ffmpeg remux",
    "mp4 download",
    "instagram downloader",
    "tiktok downloader",
    "youtube downloader",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
