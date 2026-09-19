import type { Metadata, Viewport } from "next";
import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { BottomNavigation, SideNavigation } from "@/components/replidex/BottomNavigation";
import { PageTransition } from "@/components/replidex/PageTransition";
import { ServiceWorkerRegister } from "@/components/replidex/ServiceWorkerRegister";

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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:border focus:border-[var(--border-active)] focus:bg-[var(--surface)] focus:px-3 focus:py-2 focus:text-[var(--tactical-amber)]"
        >
          Skip to content
        </a>
        <div className="mx-auto flex min-h-dvh w-full max-w-6xl">
          <SideNavigation />
          <main id="main-content" className="min-w-0 flex-1 pb-20 lg:pb-0">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
        <BottomNavigation />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
