import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TacticalPanelProps {
  title?: string;
  /** Right-aligned header slot (status light, "VIEW ALL", etc.) */
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  scanlines?: boolean;
  brackets?: boolean;
  id?: string;
}

/**
 * The core surface primitive. Thin technical border, condensed uppercase title,
 * optional HUD brackets + scanlines. Everything in Replidex sits in one of these.
 */
export function TacticalPanel({
  title,
  action,
  children,
  className,
  bodyClassName,
  scanlines,
  brackets,
  id,
}: TacticalPanelProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative border bg-[var(--surface)]",
        brackets && "hud-brackets",
        scanlines && "scanlines",
        className,
      )}
      style={{ borderColor: "var(--border)" }}
    >
      {title && (
        <header className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-3 py-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-1 bg-[var(--tactical-amber)]"
              aria-hidden
            />
            <h2 className="tac-label text-[0.72rem] text-[var(--text-secondary)]">
              {title}
            </h2>
          </div>
          {action}
        </header>
      )}
      <div className={cn("p-3", bodyClassName)}>{children}</div>
    </section>
  );
}
