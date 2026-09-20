/** Original vector emblems: each weapon keeps a distinct silhouette at chip size. */
export function WeaponArtwork({ id, className }: { id: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    "shotgun-ice": <><path d="m16 3 9 12-9 14L7 15Z"/><path d="M16 3v26M7 15h18M10 7l12 16M22 7 10 23"/></>,
    "electric-spark": <path d="m19 2-14 17h10l-2 11 14-18H17Z"/>,
    "rolling-shield": <><circle cx="16" cy="16" r="12"/><circle cx="16" cy="16" r="7"/><path d="m12 16 3 3 6-7"/></>,
    "homing-torpedo": <><path d="M8 24 12 10 24 4l4 4-6 12Z"/><path d="m12 10-7 2-2 7 7-1m12 2-2 8-7 1 2-7M17 10l5 5M4 28l4-4"/></>,
    "boomerang-cutter": <><path d="m3 5 14 6 12 17-15-9-8-1Z"/><path d="m3 5 13 10 13 13"/></>,
    "chameleon-sting": <><path d="m3 16 19-4 7 4-7 4Zm4-8 17-5-8 7Zm0 16 17 5-8-7Z"/></>,
    "storm-tornado": <><path d="M4 5h24M7 10h18M10 15h12M12 20h8M14 25h4M16 29h1"/><path d="M4 5Q0 8 7 10m18 0q5 3-3 5m-12 0q-4 3 2 5"/></>,
    "fire-wave": <path d="M17 2c3 10-5 10-1 16 3-1 6-6 6-9 10 11 8 21-6 21C3 30 0 20 9 11c-1 7 2 10 4 9C9 12 17 10 17 2Z"/>,
  };
  return <svg viewBox="0 0 32 32" className={className ?? "h-8 w-8"} fill="currentColor" fillOpacity=".13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[id] ?? <circle cx="16" cy="16" r="10"/>}</svg>;
}
