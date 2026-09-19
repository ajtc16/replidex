import Link from "next/link";
import { Radio } from "lucide-react";
import type { Transmission } from "@/data/x1/intel";
import { cn } from "@/lib/cn";

interface CommLinkCardProps {
  transmission: Transmission;
  maverickSlug?: string;
}

export function CommLinkCard({ transmission, maverickSlug }: CommLinkCardProps) {
  return (
    <article className="relative border border-[var(--border)] bg-[var(--surface)]">
      {/* channel header */}
      <header className="flex items-center gap-2.5 border-b border-[var(--border)] bg-[var(--surface-inset)] px-3 py-2">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center border border-[var(--tactical-cyan)] text-lg"
          style={{ background: "color-mix(in srgb, var(--tactical-cyan) 10%, transparent)" }}
          aria-hidden
        >
          {transmission.glyph}
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-bold uppercase tracking-wide text-[var(--tactical-cyan)]">
            {transmission.senderName}
          </p>
          <p className="text-[0.58rem] text-[var(--text-muted)]">{transmission.role}</p>
        </div>
        <span className="tac-label inline-flex items-center gap-1 text-[0.5rem] text-[var(--tactical-green)]">
          <Radio className="h-3 w-3 status-pulse" /> Secure
        </span>
      </header>

      <div className="p-3">
        {/* waveform */}
        <div className="mb-2.5 flex h-4 items-end gap-0.5" aria-hidden>
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 bg-[var(--tactical-cyan)]"
              style={{
                height: `${20 + Math.abs(Math.sin(i * 0.9)) * 80}%`,
                opacity: 0.25 + Math.abs(Math.sin(i * 0.9)) * 0.5,
              }}
            />
          ))}
        </div>

        <p className="text-[0.8rem] italic leading-relaxed text-[var(--text-secondary)]">
          &ldquo;{transmission.message}&rdquo;
        </p>

        {maverickSlug && (
          <Link
            href={`/targets/${maverickSlug}`}
            className={cn(
              "tac-label mt-3 inline-flex items-center gap-1 text-[0.55rem] text-[var(--tactical-amber)] hover:underline",
            )}
          >
            View Related Dossier →
          </Link>
        )}
      </div>
    </article>
  );
}
