import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NeuroQuest",
    short_name: "NeuroQuest",
    description: "Duolingo-style prep for Neuromatch Academy",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#1A1B2E",
    theme_color: "#1A1B2E",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    categories: ["education", "productivity"],
  };
}
