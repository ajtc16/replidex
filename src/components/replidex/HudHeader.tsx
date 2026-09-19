import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface HudHeaderProps {
  title: string;
  subtitle?: string;
  /** Optional back-link or actions on the right. */
  action?: ReactNode;
  className?: string;
}

/** Page-level HUD header with coordinate ticks and condensed title. */
export function HudHeader({ title, subtitle, action, className }: HudHeaderProps) {
  return (
    <header
      className={cn(
        "relative flex items-end justify-between gap-3 border-b border-[var(--border-strong)] px-4 py-3",
        className,
      )}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="h-4 w-1 bg-[var(--tactical-amber)]" aria-hidden />
          <h1 className="truncate font-heading text-xl font-black uppercase tracking-[0.12em] text-[var(--text-primary)] sm:text-2xl">
            {title}
          </h1>
        </div>
        {subtitle && (
          <p className="mt-0.5 pl-3 text-[0.7rem] text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
      {action}
      {/* coordinate ticks */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--border-strong) 0 2px, transparent 2px 22px)",
        }}
        aria-hidden
      />
    </header>
  );
}
