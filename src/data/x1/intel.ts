/** Static intel content for the Intel Hub (briefings + comm-link). */

export interface Briefing {
  id: string;
  operation: string;
  priority: "routine" | "elevated" | "critical";
  timestamp: string;
  body: string;
  relatedMaverickId?: string;
}

export interface Transmission {
  id: string;
  sender: string; // character id
  senderName: string;
  role: string;
  glyph: string;
  message: string;
  relatedMaverickId?: string;
}

export const x1Briefings: Briefing[] = [
  {
    id: "brief-arctic-sweep",
    operation: "Operation: Arctic Sweep",
    priority: "critical",
    timestamp: "2h ago",
    body: "Maverick activity confirmed near the abandoned Arctic facility. A Reploid designated Chill Penguin has seized the base and encased the surrounding sector in ice. Recommend deploying a mobility-capable Hunter.",
    relatedMaverickId: "chill-penguin",
  },
  {
    id: "brief-grid-overload",
    operation: "Operation: Grid Overload",
    priority: "elevated",
    timestamp: "6h ago",
    body: "Unusual energy readings across multiple power sectors. The central plant has gone dark and hostile. Expect ambushes in low-visibility corridors. Remain on alert.",
    relatedMaverickId: "spark-mandrill",
  },
  {
    id: "brief-open-skies",
    operation: "Operation: Open Skies",
    priority: "elevated",
    timestamp: "1d ago",
    body: "An airborne carrier has been commandeered and now patrols restricted airspace. Anti-air countermeasures are active. High-altitude engagement authorized for qualified units only.",
    relatedMaverickId: "storm-eagle",
  },
  {
    id: "brief-data-unlocked",
    operation: "New Data Unlocked",
    priority: "routine",
    timestamp: "1d ago",
    body: "Replidex has verified and archived new Maverick weapon data. Weakness cross-references updated. Review the Target Database for revised tactical assessments.",
  },
];

export const x1Transmissions: Transmission[] = [
  {
    id: "tx-alia-penguin",
    sender: "alia",
    senderName: "Lt. Alia",
    role: "Maverick Hunter Operations",
    glyph: "🛰",
    message:
      "Target analysis complete. Chill Penguin demonstrates high mobility but limited recovery after his sliding attacks. Wait for the whiff, then punish. His ice sculptures melt instantly under Fire Wave.",
    relatedMaverickId: "chill-penguin",
  },
  {
    id: "tx-zero-scout",
    sender: "zero",
    senderName: "Zero",
    role: "Commander · 17th Elite Unit",
    glyph: "🔴",
    message:
      "I scouted a Maverick signal near the power plant. Big one — reads as electric. Bring something cold and you'll cut the fight in half. I'll cover the perimeter.",
    relatedMaverickId: "spark-mandrill",
  },
  {
    id: "tx-cain-directive",
    sender: "dr-cain",
    senderName: "Dr. Cain",
    role: "Reploid Pioneer · Hunter Founder",
    glyph: "🧬",
    message:
      "Every Maverick you neutralize teaches us more about what turns a Reploid. Recover their weapon data intact. Knowledge is how we prevent the next uprising — not just win this one.",
  },
  {
    id: "tx-alia-armor",
    sender: "alia",
    senderName: "Lt. Alia",
    role: "Maverick Hunter Operations",
    glyph: "🛰",
    message:
      "Reminder: Dr. Light's capsules are scattered across the Maverick stages. The leg upgrade in the Arctic sector should be your first priority — dash mobility changes everything.",
  },
];
