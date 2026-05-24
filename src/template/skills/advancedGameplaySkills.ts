import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function advancedGameplaySkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push(
    skill('phaser-sprite-animation', 'Use when adding, slicing, animating, or debugging spritesheets, texture atlases, frame names, animation state machines, player/enemy animation transitions, or sprite-vs-physics body alignment.', `# Phaser Sprite Animation

## Workflow

1. Read \`references/spritesheet-vs-atlas.md\` before choosing an asset format.
2. Read \`references/load-and-create-animations.md\` before writing loader or animation code.
3. Read \`references/animation-state-machine.md\` before putting animation decisions in \`update()\`.
4. Read \`references/body-vs-visual.md\` before changing physics sizes, origins, or hitboxes.
5. Keep animation keys centralized when animations are reused.
6. Prefer placeholder/generated sprites only until real art exists, then record asset sources.

## Rules

- Use spritesheets for fixed-size frame grids.
- Use texture atlases for packed frames, UI pieces, and production sprite sets.
- Do not scatter magic frame numbers across scenes.
- Animation state changes should be driven by intent and physics state, not random per-frame calls.
`),
    reference('phaser-sprite-animation', 'spritesheet-vs-atlas.md', `# Spritesheet vs Texture Atlas

Spritesheet:

- equal-size frames in a grid;
- simple exports from Aseprite, Piskel, or custom scripts;
- good for early characters and effects.

Texture atlas:

- frames may have different sizes and names;
- better packing and fewer texture swaps;
- good for production sprites, UI, and many small effects.

Asset folders:

\`\`\`text
public/assets/spritesheets/
public/assets/atlases/
public/assets/sprites/
\`\`\`

Common mistakes:

- wrong \`frameWidth\` or \`frameHeight\`;
- forgotten \`margin\` or \`spacing\`;
- frame names that differ from atlas JSON;
- visual sprite larger than the physics body;
- transparent padding that makes collisions feel wrong.
`),
    reference('phaser-sprite-animation', 'load-and-create-animations.md', `# Load And Create Animations

Load fixed-grid frames:

\`\`\`ts
this.load.spritesheet('player', '/assets/spritesheets/player.png', {
  frameWidth: 32,
  frameHeight: 32,
});
\`\`\`

Load an atlas:

\`\`\`ts
this.load.atlas('player-atlas', '/assets/atlases/player.png', '/assets/atlases/player.json');
\`\`\`

Create animations once, usually after preload:

\`\`\`ts
this.anims.create({
  key: 'player-run',
  frames: this.anims.generateFrameNumbers('player', { start: 4, end: 9 }),
  frameRate: 12,
  repeat: -1,
});
\`\`\`

Rules:

- Check \`this.anims.exists(key)\` before recreating shared animations.
- Name keys by owner/action: \`player-idle\`, \`enemy-hurt\`, \`coin-spin\`.
- Keep one-shot animations, like attack or hurt, from being interrupted accidentally.
`),
    reference('phaser-sprite-animation', 'animation-state-machine.md', `# Animation State Machine

Use a small state machine when a character has more than idle/run.

Common states:

- \`idle\`
- \`run\`
- \`jump\`
- \`fall\`
- \`attack\`
- \`hurt\`
- \`dead\`

Rules:

- Give one-shot states priority over looping states.
- Use \`animationcomplete\` for attack/hurt/death transitions.
- Derive movement states from velocity and grounded state.
- Do not call \`sprite.play(...)\` every frame unless the key actually changed.
- Keep animation decisions near the entity/input system, not buried in a giant scene.
`),
    reference('phaser-sprite-animation', 'body-vs-visual.md', `# Physics Body vs Visual Sprite

The sprite art and the collision body rarely need to be identical.

Check:

- body size matches what the player expects to collide with;
- body offset accounts for transparent sprite padding;
- origin makes movement and animation feel stable;
- attack/hurt effects do not resize the physics body unexpectedly;
- debug overlay can show bodies while tuning.

For platformers, keep body stable during walk/jump frames. For top-down games, use a smaller foot/body area when character art is tall.
`),
  );

  files.push(
    skill('phaser-tilemaps-tiled', 'Use when adding tile-based levels, Tiled JSON maps, tilesets, collision layers, object layers, spawn points, camera/world bounds, or tilemap debug overlays in a Phaser game.', `# Phaser Tilemaps And Tiled

## Workflow

1. Read \`references/tiled-export-workflow.md\` before adding map assets.
2. Read \`references/load-map-and-layers.md\` before changing preload or scene setup.
3. Read \`references/collision-and-objects.md\` before adding collisions or spawns.
4. Read \`references/camera-world-bounds.md\` before changing camera behavior.
5. Keep layer and object names stable because game code depends on them.

## Rules

- Use Tiled JSON for authored maps.
- Keep tilesets under \`public/assets/tilesets/\`.
- Keep maps under \`public/assets/tilemaps/\`.
- Use object layers for spawns, pickups, doors, checkpoints, triggers.
- Add a debug mode before tuning collision-heavy maps.
`),
    reference('phaser-tilemaps-tiled', 'tiled-export-workflow.md', `# Tiled Export Workflow

Recommended Tiled names:

- Layers: \`ground\`, \`decor\`, \`collision\`, \`objects\`.
- Objects: \`player-spawn\`, \`enemy-spawn\`, \`coin\`, \`door\`, \`checkpoint\`, \`trigger\`.
- Custom properties: keep names lowercase and predictable.

Export:

- JSON map format.
- Tileset images stored in \`public/assets/tilesets/\`.
- Map JSON stored in \`public/assets/tilemaps/\`.

Avoid absolute local image paths in exported JSON. They break after build or on another machine.
`),
    reference('phaser-tilemaps-tiled', 'load-map-and-layers.md', `# Load Map And Layers

Preload:

\`\`\`ts
this.load.image('tiles-dungeon', '/assets/tilesets/dungeon.png');
this.load.tilemapTiledJSON('level-1', '/assets/tilemaps/level-1.json');
\`\`\`

Create:

\`\`\`ts
const map = this.make.tilemap({ key: 'level-1' });
const tiles = map.addTilesetImage('dungeon', 'tiles-dungeon');
const ground = map.createLayer('ground', tiles, 0, 0);
const collision = map.createLayer('collision', tiles, 0, 0);
\`\`\`

Rules:

- Match the Tiled tileset name in \`addTilesetImage\`.
- Fail loudly if a required layer is missing.
- Keep all tilemap keys in the asset manifest once the game grows.
`),
    reference('phaser-tilemaps-tiled', 'collision-and-objects.md', `# Collision And Object Layers

Collision:

\`\`\`ts
collision?.setCollisionByProperty({ collides: true });
this.physics.add.collider(player, collision);
\`\`\`

Object layers:

- Read spawn points from \`map.getObjectLayer('objects')\`.
- Convert object coordinates into entity factories.
- Keep object type/name conventions documented.
- Validate important objects, such as \`player-spawn\`, at scene start.

Debug:

- Draw collision tiles during development.
- Hide debug overlays in production builds.
`),
    reference('phaser-tilemaps-tiled', 'camera-world-bounds.md', `# Camera And World Bounds

When the map is larger than the viewport:

- set physics world bounds from map dimensions;
- set camera bounds from map dimensions;
- follow the player with a deadzone if needed;
- keep HUD in a UI scene so it does not shake or scroll with the world.

When the map is smaller than the viewport:

- center it intentionally;
- avoid camera follow jitter;
- do not stretch pixel art to fill empty space unless the style supports it.
`),
  );

  files.push(
    skill('phaser-audio-sfx', 'Use when adding browser-safe audio to a Phaser game: music, SFX, procedural sounds, mute and volume settings, mobile audio unlock, pause/resume behavior, or platform ad audio handling.', `# Phaser Audio And SFX

## Workflow

1. Read \`references/browser-audio-unlock.md\` before adding sound that plays on startup.
2. Read \`references/audio-manager.md\` before scattering sound calls across scenes.
3. Read \`references/volume-settings.md\` before adding mute, music, or SFX controls.
4. Read \`references/sfx-pooling.md\` before adding repeated sounds like shots, pickups, or hits.
5. Verify audio on mobile and desktop after the first user gesture.

## Rules

- Browser audio usually needs a user gesture before playback.
- Keep music and SFX volumes separate.
- Persist mute/volume settings through the save/settings system.
- Pause or mute audio during ads/platform pause.
- Prefer short, readable cues over constant noise.
`),
    reference('phaser-audio-sfx', 'browser-audio-unlock.md', `# Browser Audio Unlock

Do not assume audio can autoplay.

Pattern:

- Wait for first pointer/key interaction.
- Start or unlock the audio context.
- Then play menu music or first SFX.

UX:

- If audio is optional, do not block gameplay.
- Add a visible mute/settings path once audio matters.
- On mobile, test in a real browser when possible.
`),
    reference('phaser-audio-sfx', 'audio-manager.md', `# Audio Manager

Use a small audio manager when sounds appear in multiple scenes.

Responsibilities:

- load key names from the asset manifest;
- play SFX by semantic name;
- start/stop music by scene or game state;
- apply mute and volume settings;
- handle pause/resume hooks.

Avoid:

- hardcoded sound keys in many files;
- overlapping long sounds;
- scene transitions that leave old music playing.
`),
    reference('phaser-audio-sfx', 'volume-settings.md', `# Volume Settings

Recommended settings:

- master mute;
- music volume;
- SFX volume;
- reduced motion/impact toggle if heavy effects are tied to audio.

Save:

- persist settings in localStorage through the save/settings module;
- handle malformed settings gracefully;
- apply settings at startup before playing any sound.
`),
    reference('phaser-audio-sfx', 'sfx-pooling.md', `# SFX Pooling

For repeated SFX:

- avoid creating new sound instances every frame;
- throttle very frequent cues;
- randomize pitch/volume slightly only when it improves feel;
- cap simultaneous copies of the same sound.

Good candidates:

- projectiles;
- pickups;
- UI clicks;
- damage ticks;
- footsteps.
`),
  );

  files.push(
    skill('phaser-debug-performance', 'Use when adding or fixing developer debug overlays, FPS counters, input/state readouts, physics debug views, object pools, no-allocation update loops, low-end mobile performance, or production debug stripping.', `# Phaser Debug And Performance

## Workflow

1. Read \`references/debug-overlay.md\` before adding visible diagnostics.
2. Read \`references/mobile-performance-budget.md\` before optimizing or adding expensive effects.
3. Read \`references/object-pooling.md\` before spawning many projectiles, enemies, particles, or pickups.
4. Read \`references/no-frame-allocations.md\` before changing hot update loops.
5. Keep debug tools easy to disable for production.

## Rules

- Debug overlays are for development, not public release UI.
- Measure before making large performance rewrites.
- Mobile performance is usually hurt by excessive canvas size, particles, allocations, and too many active bodies.
- Prefer simple pools for repeated short-lived objects.
`),
    reference('phaser-debug-performance', 'debug-overlay.md', `# Debug Overlay

Useful overlay fields:

- FPS;
- active scene;
- player coordinates;
- input actions;
- entity counts;
- camera scroll/zoom;
- physics/body debug toggle;
- collision layer visibility.

Rules:

- Toggle with a desktop key and/or development flag.
- Keep overlay anchored to the screen, not world coordinates.
- Do not ship debug text in production unless the user asks for a debug build.
`),
    reference('phaser-debug-performance', 'mobile-performance-budget.md', `# Mobile Performance Budget

Before shipping a mobile-first Phaser game:

- keep texture sizes reasonable;
- prefer atlases over many tiny images;
- cap particles and active physics bodies;
- avoid per-frame object creation;
- reduce expensive debug drawing;
- test low-end Android-like viewport in Playwright and a real browser if possible;
- keep canvas scale from becoming larger than needed.
`),
    reference('phaser-debug-performance', 'object-pooling.md', `# Object Pooling

Use pooling when objects spawn/despawn often:

- projectiles;
- enemies;
- collectibles;
- particles;
- floating damage numbers.

Pool lifecycle:

1. Create a limited group.
2. Spawn by activating and positioning an inactive object.
3. Deactivate when offscreen, collected, or destroyed.
4. Reset velocity, alpha, tint, timers, and state before reuse.

Do not pool everything. Pool the objects that are proven to churn.
`),
    reference('phaser-debug-performance', 'no-frame-allocations.md', `# No Frame Allocations

In hot loops:

- avoid creating arrays, vectors, closures, and config objects every frame;
- reuse temp vectors/rectangles;
- avoid filtering large arrays every update;
- keep collision callbacks small;
- avoid logging every frame.

If clarity and performance conflict, keep the first playable clear, then optimize only the bottlenecks.
`),
  );

  files.push(
    skill('phaser-programmatic-art', 'Use when creating placeholder game art, coded UI visuals, icons, sprite concepts, procedural backgrounds, SVG/canvas effects, or a stronger visual direction without stock images or copyrighted assets.', `# Phaser Programmatic Art

## Workflow

1. Read \`references/art-direction.md\` before making visual decisions.
2. Read \`references/coded-placeholders.md\` before adding placeholder assets.
3. Read \`references/svg-canvas-css.md\` before choosing SVG, Canvas, CSS, or Phaser Graphics.
4. Read \`references/asset-licensing.md\` before using third-party art.
5. Replace coded placeholders with real assets only when sources and licenses are recorded.

## Rules

- Do not use copyrighted game art without explicit permission.
- Do not leave empty "insert art here" placeholders.
- Make temporary visuals useful: readable shapes, clear hitboxes, distinct colors, and consistent style.
- Use code-drawn visuals for prototypes when they help the agent move faster.
- Keep generated visuals simple enough for Phaser runtime performance.
`),
    reference('phaser-programmatic-art', 'art-direction.md', `# Art Direction

Before drawing, choose a clear direction:

- arcade neon;
- clean tactical board;
- cozy toy-like;
- industrial debug prototype;
- pixel-art-inspired;
- paper/card table;
- science lab;
- retro operating system.

Rules:

- Use one dominant visual idea.
- Keep gameplay readability above decoration.
- Match UI, sprites, particles, and background to the same language.
- Avoid generic gradients and random decoration.
`),
    reference('phaser-programmatic-art', 'coded-placeholders.md', `# Coded Placeholders

Good placeholders:

- show the gameplay role clearly;
- expose collision size;
- animate enough to communicate state;
- are easy to replace with real assets later.

Options:

- Phaser \`Graphics\` generated textures;
- simple SVG files under \`public/assets/\`;
- canvas-generated spritesheets;
- CSS/SVG for website-only UI, not Phaser runtime UI unless intentional.

Record generated placeholder ownership in \`public/assets/credits.md\`.
`),
    reference('phaser-programmatic-art', 'svg-canvas-css.md', `# SVG, Canvas, CSS, Phaser Graphics

Use SVG for:

- icons;
- UI ornaments;
- clean vector placeholders;
- cards/badges.

Use Canvas for:

- generated textures;
- particle-like spritesheets;
- noise/terrain experiments.

Use Phaser Graphics for:

- runtime debug shapes;
- quick generated textures;
- simple geometric sprites.

Use CSS for:

- the outer web page around the canvas;
- loading screens;
- non-game shell visuals.
`),
    reference('phaser-programmatic-art', 'asset-licensing.md', `# Asset Licensing

Asset rules:

- Track source URL, author, license, and usage notes in \`public/assets/credits.md\`.
- Prefer original generated placeholders until real assets are chosen.
- Do not copy art from commercial games, anime, movies, or brands.
- Check whether a license allows commercial use and redistribution.
- Keep fonts self-hosted and licensed for web use.

When unsure, use generated/code-drawn placeholders and ask the human before importing external art.
`),
  );


  return files;
}
