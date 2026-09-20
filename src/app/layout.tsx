import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

/**
 * 欧文のディスプレイ書体（Anton / Jost / Yellowtail）は
 * `public/fonts` にセルフホストし、`src/app/fonts.css` で読み込んでいます。
 * 日本語書体はサブセットが巨大なため Google Fonts CDN を利用します。
 */
const JP_FONTS =
  "https://fonts.googleapis.com/css2" +
  "?family=Klee+One:wght@400;600" +
  "&family=Shippori+Mincho:wght@400;500;600;700" +
  "&family=Zen+Kaku+Gothic+New:wght@400;500;700;900" +
  "&display=swap";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "NEWTONE",
    "NEWTONE 2027",
    "美容",
    "POPUP",
    "学生起業家",
    "ビューティー",
    "イベント",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#060619",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="preload"
          href="/fonts/anton-400-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/jost-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href={JP_FONTS} />
      </head>
      <body>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
