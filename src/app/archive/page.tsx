import { HudHeader } from "@/components/replidex/HudHeader";
import { ModuleStandby } from "@/components/replidex/ModuleStandby";

export default function ArchivePage() {
  return (
    <div>
      <HudHeader title="Archive" subtitle="Mavericks · Weapons · Characters · Blueprints" />
      <div className="p-3">
        <ModuleStandby
          phase="Phase 3 — Scheduled"
          note="The tactical archive and Reploid Blueprint viewer with interactive schematics. Data models and seed blueprints are already wired in."
        />
      </div>
    </div>
  );
}
