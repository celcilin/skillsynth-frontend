// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Skill Synth - Build Your Dream Career Roadmap",
    template: "%s | Skill Synth",
  },
  description:
    "Build personalized career roadmaps, solve real-world GitHub projects, and accelerate your learning journey. Get AI-powered learning paths tailored to your goals.",
  keywords: [
    "career roadmap",
    "learning path",
    "GitHub projects",
    "coding bootcamp",
    "skill development",
    "personalized learning",
    "code review",
    "AI assessment",
    "career guidance",
    "programming tutorials",
  ],
  authors: [{ name: "Skill Synth Team" }],
  creator: "Skill Synth",
  publisher: "Skill Synth",
  metadataBase: new URL("https://skillsynth.com"), // Replace with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillsynth.com",
    title: "Skill Synth - Build Your Dream Career Roadmap",
    description:
      "Build personalized career roadmaps, solve real-world GitHub projects, and accelerate your learning journey.",
    siteName: "Skill Synth",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Skill Synth - Career Roadmap Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Synth - Build Your Dream Career Roadmap",
    description:
      "Build personalized career roadmaps, solve real-world GitHub projects, and accelerate your learning journey.",
    images: ["/og-image.png"],
    creator: "@skillsynth",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A0A0A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
      </head>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
