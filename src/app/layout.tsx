import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://my-wedding-letter.vercel.app"),
  title: "제세환 ♥ 신지은, 우리 결혼합니다",
  description: "결혼식 안내 및 신혼집 3D 체험",
  openGraph: {
    title: "제세환 ♥ 신지은, 우리 결혼합니다",
    description: "결혼식 안내 및 신혼집 3D 체험",
    images: [
      {
        url: "/image/photomatic133040.jpg",
        width: 720,
        height: 1080,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
