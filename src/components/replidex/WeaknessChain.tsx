import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import type { WeaknessChainView } from "@/services/weaknessGraph";
import { TargetPortrait } from "./TargetPortrait";
import { elementMeta } from "@/lib/elements";
import { cn } from "@/lib/cn";

interface WeaknessChainProps {
  chain: WeaknessChainView;
  className?: string;
}

function Node({
  glyph,
  element,
  name,
  href,
  highlight,
}: {
  glyph: string;
  element?: import("@/domain/types").ElementType;
  name: string;
  href?: string;
  highlight?: boolean;
}) {
  const body = (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <TargetPortrait
        glyph={glyph}
        element={element}
        size="md"
        className={cn(highlight && "glow-amber")}
      />
      <span
        className={cn(
          "tac-label max-w-[6rem] text-[0.6rem] leading-tight",
          highlight ? "text-[var(--tactical-amber)]" : "text-[var(--text-secondary)]",
        )}
      >
        {name}
      </span>
    </div>
  );
  return href ? (
    <Link href={href} className="transition-transform hover:scale-105">
      {body}
    </Link>
  ) : (
    body
  );
}

function WeaponLink({ name, element }: { name: string; element?: import("@/domain/types").ElementType }) {
  const meta = elementMeta(element);
  return (
    <div className="flex flex-col items-center">
      <span
        className="grid h-8 w-8 place-items-center border text-sm"
        style={{ borderColor: meta.color, color: meta.color, background: `color-mix(in srgb, ${meta.color} 10%, transparent)` }}
      >
        {meta.glyph}
      </span>
      <span className="mt-1 max-w-[6rem] text-center text-[0.58rem] leading-tight text-[var(--text-muted)]">
        {name}
      </span>
    </div>
  );
}

/**
 * Renders the programmatically-built weakness chain:
 * incoming maverick → weakness weapon → CENTER → reward weapon → next victim.
 * Horizontal on desktop, vertical on mobile.
 */
export function WeaknessChain({ chain, className }: WeaknessChainProps) {
  const { incoming, center, outgoing } = chain;

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-3",
        className,
      )}
    >
      {incoming && (
        <>
          <Node
            glyph={incoming.maverick.portrait}
            element={incoming.maverick.element}
            name={incoming.maverick.name}
            href={`/targets/${incoming.maverick.slug}`}
          />
          <Arrow />
          <WeaponLink name={incoming.weapon.name} element={incoming.weapon.element} />
          <Arrow />
        </>
      )}

      <Node
        glyph={center.portrait}
        element={center.element}
        name={center.name}
        highlight
      />

      {outgoing && (
        <>
          <Arrow />
          <WeaponLink name={outgoing.weapon.name} element={outgoing.weapon.element} />
          <Arrow />
          <Node
            glyph={outgoing.maverick.portrait}
            element={outgoing.maverick.element}
            name={outgoing.maverick.name}
            href={`/targets/${outgoing.maverick.slug}`}
          />
        </>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <>
      <ArrowDown className="h-4 w-4 text-[var(--tactical-amber)] sm:hidden" aria-hidden />
      <ArrowRight className="hidden h-4 w-4 text-[var(--tactical-amber)] sm:block" aria-hidden />
    </>
  );
}
