import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation, SideNavigation } from "@/components/replidex/BottomNavigation";

const heading = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-tech",
});

export const metadata: Metadata = {
  title: "Replidex — Maverick Hunter Tactical Database",
  description:
    "An in-universe Maverick Hunter tactical computer: analyze threats, plan deployments, and browse Reploid intel for Mega Man X.",
  applicationName: "Replidex",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Replidex",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a0c",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl">
          <SideNavigation />
          <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
        </div>
        <BottomNavigation />
      </body>
    </html>
  );
}
