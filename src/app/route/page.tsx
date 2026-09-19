import { HudHeader } from "@/components/replidex/HudHeader";
import { ModuleStandby } from "@/components/replidex/ModuleStandby";

export default function RoutePage() {
  return (
    <div>
      <HudHeader title="Hunter Route" subtitle="Deployment sequencing & recommendations" />
      <div className="p-3">
        <ModuleStandby
          phase="Phase 2 — Scheduled"
          note="The Hunter Route planner computes optimal clear orders from your live progress and the weakness graph. Coming online in the next deployment."
        />
      </div>
    </div>
  );
}
