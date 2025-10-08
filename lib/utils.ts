// lib/utils.ts
import { Level } from "@/types/roadmap";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function extractYouTubeId(url: string): string | null {
//   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
//   const match = url.match(regExp);
//   return match && match[2].length === 11 ? match[2] : null;
// }

export const getYouTubeThumbnail = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    let videoId: string | null = null;

    // Handle different YouTube URL formats
    if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v");
    } else if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1);
    }

    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }
    return null;
  } catch {
    return null;
  }
};

export const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    case "intermediate":
      return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    case "advanced":
      return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    case "expert":
      return "bg-red-500/10 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/10 text-gray-400 border-gray-500/30";
  }
};

export function getLevelBgGradient(level: Level) {
  const gradients = {
    Beginner: "from-emerald-500/5 to-emerald-500/0",
    Intermediate: "from-blue-500/5 to-blue-500/0",
    Advanced: "from-purple-500/5 to-purple-500/0",
    Expert: "from-rose-500/5 to-rose-500/0"
  };
  return gradients[level];
}