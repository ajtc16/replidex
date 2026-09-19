import { HudHeader } from "@/components/replidex/HudHeader";
import { ModuleStandby } from "@/components/replidex/ModuleStandby";

export default function IntelPage() {
  return (
    <div>
      <HudHeader title="Intel Hub" subtitle="Briefings · Comm-Link · Tactical Logs" />
      <div className="p-3">
        <ModuleStandby
          phase="Phase 3 — Scheduled"
          note="Command briefings, encrypted comm-link transmissions from Alia and Zero, and auto-generated tactical logs from your progress."
        />
      </div>
    </div>
  );
}
