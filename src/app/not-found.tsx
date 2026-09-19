import Link from "next/link";
import { HudHeader } from "@/components/replidex/HudHeader";
import { TacticalPanel } from "@/components/replidex/TacticalPanel";

export default function NotFound() {
  return (
    <div>
      <HudHeader title="Signal Lost" subtitle="Requested record not found in database" />
      <div className="p-3">
        <TacticalPanel title="Error 404" scanlines brackets>
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="font-heading text-5xl font-black text-[var(--danger)]">404</p>
            <p className="max-w-sm text-[0.8rem] text-[var(--text-secondary)]">
              The tactical record you requested does not exist or has been purged from the archive.
            </p>
            <Link
              href="/"
              className="tac-label border border-[var(--border-active)] bg-[color-mix(in_srgb,var(--tactical-amber)_14%,transparent)] px-4 py-2 text-[0.7rem] text-[var(--tactical-amber)] hover:bg-[color-mix(in_srgb,var(--tactical-amber)_24%,transparent)]"
            >
              Return to Command
            </Link>
          </div>
        </TacticalPanel>
      </div>
    </div>
  );
}
