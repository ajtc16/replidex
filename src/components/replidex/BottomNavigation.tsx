"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Crosshair, Route, Radio, Archive } from "lucide-react";
import { cn } from "@/lib/cn";

const NAV = [
  { href: "/", label: "Command", icon: LayoutDashboard, match: (p: string) => p === "/" },
  { href: "/targets", label: "Targets", icon: Crosshair, match: (p: string) => p.startsWith("/targets") },
  { href: "/route", label: "Route", icon: Route, match: (p: string) => p.startsWith("/route") },
  { href: "/intel", label: "Intel", icon: Radio, match: (p: string) => p.startsWith("/intel") },
  { href: "/archive", label: "Archive", icon: Archive, match: (p: string) => p.startsWith("/archive") },
] as const;

/** Mobile bottom nav (also visible on tablet). Desktop uses the sidebar. */
export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] backdrop-blur-md lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Primary"
    >
      <ul className="mx-auto grid max-w-2xl grid-cols-5">
        {NAV.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex flex-col items-center gap-1 py-2.5 text-[0.58rem] transition-colors",
                  active ? "text-[var(--tactical-amber)]" : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]",
                )}
              >
                {active && (
                  <span className="absolute inset-x-3 top-0 h-0.5 bg-[var(--tactical-amber)]" aria-hidden />
                )}
                <Icon className="h-5 w-5" aria-hidden />
                <span className="tac-label tracking-wider">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Desktop left sidebar. */
export function SideNavigation() {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-[var(--border-strong)] bg-[var(--surface)] lg:flex">
      <div className="border-b border-[var(--border)] px-4 py-4">
        <p className="font-heading text-lg font-black tracking-[0.18em] text-[var(--tactical-amber)]">
          REPLIDEX
        </p>
        <p className="tac-label text-[0.52rem] text-[var(--text-muted)]">
          Tactical Database
        </p>
      </div>
      <ul className="flex-1 space-y-1 p-2">
        {NAV.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 border px-3 py-2 text-sm transition-colors",
                  active
                    ? "border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_10%,transparent)] text-[var(--tactical-amber)]"
                    : "border-transparent text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--surface-elevated)]",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                <span className="tac-label text-[0.7rem]">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-[var(--border)] px-4 py-3">
        <p className="text-[0.55rem] leading-relaxed text-[var(--text-muted)]">
          &ldquo;Our data today saves lives tomorrow.&rdquo;
        </p>
        <p className="tac-label mt-1 text-[0.5rem] text-[var(--tactical-cyan)]">— Lt. Alia</p>
      </div>
    </aside>
  );
}
