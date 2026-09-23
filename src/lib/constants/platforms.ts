// ============================================================
// Supported video platforms — metadata for UI and validation
// ============================================================

export interface PlatformInfo {
  name: string;
  icon: string; // emoji for now, can swap for SVG later
  urlPatterns: RegExp[];
}

export const SUPPORTED_PLATFORMS: PlatformInfo[] = [
  {
    name: "YouTube",
    icon: "🎬",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch/i,
      /(?:https?:\/\/)?youtu\.be\//i,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\//i,
    ],
  },
  {
    name: "Instagram",
    icon: "📸",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:p|reel|reels|tv)\//i,
    ],
  },
  {
    name: "TikTok",
    icon: "🎵",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[^/]+\/video\//i,
      /(?:https?:\/\/)?vm\.tiktok\.com\//i,
    ],
  },
  {
    name: "X (Twitter)",
    icon: "🐦",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?(?:twitter|x)\.com\/[^/]+\/status\//i,
    ],
  },
  {
    name: "Facebook",
    icon: "👤",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.*\/videos\//i,
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/watch/i,
      /(?:https?:\/\/)?fb\.watch\//i,
    ],
  },
  {
    name: "Moj",
    icon: "🎭",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?mojapp\.in\//i,
    ],
  },
  {
    name: "Reddit",
    icon: "🤖",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?reddit\.com\/r\/[^/]+\/comments\//i,
    ],
  },
  {
    name: "Snapchat",
    icon: "👻",
    urlPatterns: [
      /(?:https?:\/\/)?(?:www\.)?snapchat\.com\/spotlight\//i,
    ],
  },
];

/**
 * Checks if a URL matches any supported platform.
 * Returns the platform info or null.
 */
export function matchPlatform(url: string): PlatformInfo | null {
  for (const platform of SUPPORTED_PLATFORMS) {
    if (platform.urlPatterns.some((pattern) => pattern.test(url))) {
      return platform;
    }
  }
  return null;
}

/**
 * Basic URL validation — checks that it's a valid HTTP(S) URL.
 * yt-dlp supports thousands of sites, so we don't restrict to known platforms.
 */
export function isValidVideoUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}
