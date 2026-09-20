import type { SchematicView } from "./ReploidSchematic";

/** Original X study. Coordinates match the normalized module anchors in x1/blueprints. */
export function XSchematic({ view }: { view: SchematicView }) {
  const side = view === "side";
  const rear = view === "rear";
  return (
    <svg viewBox="0 0 200 300" className="h-full w-full" role="img" aria-label={`X — ${view} technical schematic`}>
      <g fill="none" stroke="#69b9bb" strokeWidth=".4" opacity=".6">
        <path d="M100 5v285M25 40h150M25 120h150M25 240h150" strokeDasharray="3 4" />
        <path d="M22 20v260m-4-260h8m-8 260h8M38 287h126m-126-4v8m126-8v8"/>
        {Array.from({length: 25},(_,i)=><path key={i} d={`M22 ${30+i*10}h${i%5===0?7:3}`} />)}
      </g>
      <g transform={rear ? "translate(200 0) scale(-1 1)" : undefined} stroke="#91e1df" strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round" fill="#143239">
      {side ? <>
        <path d="M83 49 79 32Q80 14 102 14l14 9 3 20-8 15H92Z"/>
        <path d="m100 14 7-5 6 17-8 7M110 35l12 6-8 4v8l-10 5-8-9" fill="#244c50"/>
        <circle cx="90" cy="38" r="9"/><circle cx="90" cy="38" r="5"/>
        <path d="m111 37 5-1M93 57v8h13v-9M87 65l24 2 11 26-9 24-1 24-25 3-9-30 1-32Z"/>
        <path d="m85 72-8 6 2 28 7 4M86 120h28l-2 10H88M90 144l22-1 1 22-10 16-18-18Z"/>
        <path d="m90 165 20 2-1 36-7 15-18-4Z" fill="#244c50"/>
        <path d="m83 204 25 3 4 43 17 15-1 10H78l-3-13Z"/>
        <path d="m80 252 27 1 16 13H80M82 217l17 3M83 230l16 2"/>
        <circle cx="101" cy="80" r="15"/><path d="m90 92 20 2-3 24-16-1Z" fill="#244c50"/>
        <path d="m87 116 24 2 4 41-31-1Z"/><ellipse cx="99" cy="158" rx="15" ry="5"/><ellipse cx="99" cy="158" rx="8" ry="2" fill="#060f17"/>
        <path d="m91 124 14 1 2 22H89Z"/>
      </> : <>
        {/* Helmet: raised crown, angular cheek guards and circular ear housings. */}
        <path d="M76 42V31Q78 13 100 12q22 1 24 19v13l-9 14H85Z"/>
        <path d="m91 15 3-8h12l3 8-3 22H94Z" fill="#285961"/>
        <path d="m94 27 6-5 6 5-6 12Z" fill={rear ? "#143239" : "#bba46a"}/>
        <path d="m77 34 10-5 13 16 13-16 10 5-7 22-16 7-16-7Z" fill={rear ? "#143239" : "#244c50"}/>
        <path d="M74 32h7v18h-7ZM119 32h7v18h-7Z"/>
        {rear ? <path d="M88 44h24M89 49h22M93 54h14"/> : <><path d="m86 38 9 5-8 1Zm28 0-9 5 8 1Z" fill="#a9efea"/><path d="m96 52 4 2 4-2"/></>}
        <path d="M92 61v8h16v-8" fill="#244c50"/>
        {/* Chest plates, waist segments and hip assembly. */}
        <path d="m76 68 16-4 8 7 8-7 16 4 6 30-13 18H83L70 98Z"/>
        <path d="m77 74 23 8 23-8-5 24-18 10-18-10Z" fill="#285961"/>
        {rear ? <><path d="M92 79h16v23H92Z"/><path d="M95 84h10m-10 5h10m-10 5h10"/></> : <path d="m83 77 17 5 17-5M100 84v15"/>}
        <path d="m83 114 34 0-2 22H85Z" fill="#244c50"/><path d="M85 120h30m-29 7h28"/>
        <path d="m84 135 32 0 9 22-18 15-7-10-7 10-18-15Z"/>
        <path d="m91 139 9 5 9-5-3 17H94Z" fill="#285961"/>
        {/* Broad shoulder shells, glove on one arm, cannon on the other. */}
        <path d="M75 68Q56 60 50 80l3 18 21-3 6-14Z"/>
        <path d="M125 68q19-8 25 12l-3 18-21-3-6-14Z"/>
        <path d="m57 97 15 1-2 20-16 2Zm71 1 15-1 3 23-17-2Z" fill="#244c50"/>
        <circle cx="61" cy="119" r="7"/><circle cx="139" cy="119" r="7"/>
        <path d="m51 123 20-1 1 29-8 13-19-6Z"/><path d="m48 145 21 1-4 15-17-4Z" fill="#285961"/>
        <path d="m49 160-3 11 5 7 14-2 3-12M51 168v6m5-7v7m5-8v7"/>
        <path d="m128 116 22 1 9 37-8 12-23-2-7-13Z"/>
        <path d="m130 124 14 1 7 25-20-1Z" fill="#285961"/>
        <ellipse cx="141" cy="159" rx="15" ry="6"/><ellipse cx="141" cy="159" rx="9" ry="3" fill="#07151b"/>
        {/* Light undersuit and the oversized flared boots that define X's silhouette. */}
        <path d="m78 161 18 9-5 38-20-4Zm44 0-18 9 5 38 20-4Z" fill="#244c50"/>
        <path d="m71 201 23 5-2 36 2 24-9 9H48l-2-12 14-16Z"/>
        <path d="m129 201-23 5 2 36-2 24 9 9h37l2-12-14-16Z"/>
        <path d="m71 208 16 5-4 28-20 7ZM129 208l-16 5 4 28 20 7Z" fill="#285961"/>
        <path d="m51 261 34-3 5 10H50Zm98 0-34-3-5 10h40Z" fill="#244c50"/>
        <path d="m66 230 16 4m36 0 16-4M49 272h36m30 0h36"/>
      </>}
      </g>
      <g fill="#82b9b8" fontFamily="monospace" fontSize="5" letterSpacing=".8"><text x="30" y="12">DLN–000X</text><text x="132" y="12">{view.toUpperCase()}</text><text x="32" y="298">LIGHT LABS / FRAME STUDY</text></g>
    </svg>
  );
}
