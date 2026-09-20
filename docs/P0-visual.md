# Replidex P0 — Visual reference

Implemented from the diagnosis in “Auditar visualmente Replidex”.

- Eight X1 Maverick portraits, reused by Command, Targets, Route and the weakness chain.
- Comm-Link portraits for Zero, Dr. Cain and Alia; an X portrait is included in the atlas.
- Eight original vector weapon emblems, shared by chips and the weakness chain.
- Dossier reference: illustrated identity panel, olive surfaces, warm text, weakness/reward/next target before narrative content. The shared dossier template applies to all eight bosses.
- Original X vector study with front, side and rear views, component anchors, zoom and catalogue preview.
- Mobile inspector sits below the drawing instead of covering it. Controls and hotspots have 44px targets.

The portraits are generated fan interpretations, not official game assets. Zero and Chill Penguin's existing schematic drawings are outside this X-focused P0 and remain provisional. Existing game-data verification notes are unchanged.

## Art source

`public/art/x1-portraits.png` was generated with the built-in image generation tool on 2026-09-19. It is a single 4×3 sprite atlas used directly via CSS, without runtime external requests or per-card downloads. Row-major order: Chill Penguin, Spark Mandrill, Armored Armadillo, Launch Octopus; Boomer Kuwanger, Sting Chameleon, Storm Eagle, Flame Mammoth; X, Zero, Dr. Cain, Alia.

The editable vector sources are `src/components/replidex/WeaponArtwork.tsx` and `src/components/replidex/XSchematic.tsx`.

### Generation prompt

Create a production game UI portrait atlas, one single square image, exactly 4 columns and 3 rows, 12 equally sized rectangular cells edge-to-edge with NO gutters, NO borders, NO text, NO letters, NO labels. Every cell has same dark olive black background, centered head and upper torso fully contained within its cell with 12% margins. Polished detailed 1990s Japanese Mega Man X anime mechanical character illustration, crisp ink lines, cel shading, restrained textured metal, warm highlights and subtle cyan rim light. Accurate recognizable Mega Man X character designs, not realistic animals, not emojis. Exact reading order left to right top to bottom: row 1 Chill Penguin (small blue purple armored robotic penguin with white face, yellow beak, red forehead lens), Spark Mandrill (orange and blue massive robotic mandrill with electric antennae), Armored Armadillo (purple armored robotic armadillo with silver plates), Launch Octopus (red robotic octopus with white face and missile pod shoulders). Row 2 Boomer Kuwanger (red stag beetle robot with large boomerang antlers), Sting Chameleon (green robotic chameleon with curled crest and yellow eyes), Storm Eagle (purple and white eagle reploid with golden beak and wing shoulders), Flame Mammoth (large gray and pink mammoth reploid with mechanical trunk and white tusks). Row 3 X (blue helmet, cyan armor and red forehead gem), Zero (red helmet, green forehead gem, long blond hair, red white armor), Dr Cain (bald elderly human scientist with bushy white eyebrows and long white beard), Alia (blond female reploid navigator with red white headset and green lenses). Uniform scale, consistent premium tactical archive art direction. Each character occupies ONLY its own cell. Sheet will be used directly as CSS background sprites. No UI, no words, no watermark.
