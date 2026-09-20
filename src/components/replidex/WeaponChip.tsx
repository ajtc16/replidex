import Link from "next/link";
import { WeaponArtwork } from "./WeaponArtwork";
import type { Weapon } from "@/domain/types";
import { elementMeta } from "@/lib/elements";
import { cn } from "@/lib/cn";

interface WeaponChipProps {
  weapon: Weapon;
  /** Link to the source maverick's dossier when clickable. */
  href?: string;
  variant?: "default" | "weakness" | "reward";
  className?: string;
}

const LABELS: Record<string, string> = {
  weakness: "WEAKNESS",
  reward: "WEAPON",
  default: "",
};

export function WeaponChip({
  weapon,
  href,
  variant = "default",
  className,
}: WeaponChipProps) {
  const meta = elementMeta(weapon.element);
  const tone =
    variant === "weakness" ? "var(--danger)" : variant === "reward" ? "var(--tactical-cyan)" : meta.color;

  const inner = (
    <span
      className={cn(
        "group inline-flex items-center gap-2 border px-2 py-1 transition-colors",
        href && "hover:bg-[var(--surface-elevated)]",
        className,
      )}
      style={{
        borderColor: `color-mix(in srgb, ${tone} 45%, var(--border))`,
        background: `color-mix(in srgb, ${tone} 8%, transparent)`,
      }}
    >
      <span
        className="grid h-10 w-10 shrink-0 place-items-center border text-[0.7rem]"
        style={{ borderColor: tone, color: tone }}
        aria-hidden
      >
        <WeaponArtwork id={weapon.id} />
      </span>
      <span className="flex flex-col leading-tight">
        {LABELS[variant] && (
          <span className="tac-label text-[0.65rem]" style={{ color: tone }}>
            {LABELS[variant]}
          </span>
        )}
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {weapon.name}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {inner}
      </Link>
    );
  }
  return inner;
}
