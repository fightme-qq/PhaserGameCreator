import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function gameplayStructureSkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push(
    skill('phaser-state-machine-patterns', 'Use when gameplay objects or game flow have multiple behavior modes in a Phaser game: player states, enemy AI states, boss phases, game states, animation-independent behavior states, or when code is accumulating booleans like isAttacking/isDead/isHurt/canMove; design a small explicit state machine before adding more flags.', `# Phaser State Machine Patterns

## Workflow

1. Read \`references/state-machine-template.md\` before adding behavior modes.
2. Use a state machine when an object has more than three meaningful behavior modes.
3. Name states by behavior, not by animation frame.
4. Define allowed transitions before writing update logic.
5. Keep state entry/exit side effects explicit.
6. Validate one transition path at a time.

## Rules

- Do not add many boolean flags when states are mutually exclusive.
- Keep animation state machines separate from gameplay state machines unless the behavior is tiny.
- Use events or explicit methods for transitions that affect UI, score, save, or scene flow.
- Keep state objects small enough to understand during debugging.
`),
    reference('phaser-state-machine-patterns', 'state-machine-template.md', `# State Machine Template

Use this shape for small gameplay state machines:

\`\`\`ts
type PlayerState = 'idle' | 'move' | 'attack' | 'hurt' | 'dead';

type Transition = {
  from: PlayerState;
  to: PlayerState;
  reason: string;
};
\`\`\`

Checklist:

- States are mutually exclusive.
- Entry actions are clear: start timer, play animation, set velocity, emit event.
- Exit actions are clear: clear timer, remove tint, reset input lock.
- Transitions are guarded: cannot attack while dead, cannot move during hurt, etc.
- One-shot states transition through completion events or timers.

Common state sets:

- Player: \`idle\`, \`move\`, \`attack\`, \`hurt\`, \`dead\`.
- Enemy: \`spawn\`, \`patrol\`, \`chase\`, \`attack\`, \`stunned\`, \`dead\`.
- Game: \`menu\`, \`playing\`, \`paused\`, \`won\`, \`lost\`.
- Boss: \`intro\`, \`phase1\`, \`phase2\`, \`enraged\`, \`defeated\`.
`),
  );

  files.push(
    skill('phaser-physics-collision-designer', 'Use before adding or changing Phaser physics and collisions: Arcade Physics, Matter.js, manual hitboxes, grid movement, overlap-only pickups, tilemap collision, projectile collision, platformer controllers, or dense collision scenes; choose the simplest collision model and separate visual sprites from physics bodies.', `# Phaser Physics Collision Designer

## Workflow

1. Read \`references/collision-model-selection.md\`.
2. Choose the collision model before adding bodies to objects.
3. Use overlap for pickups, triggers, and soft detection.
4. Use collider for walls, floors, solid obstacles, and blocking bodies.
5. Separate visual sprite concerns from physics body tuning.
6. Add debug visualization before tuning complex collisions.

## Rules

- Do not enable physics on everything by default.
- Do not use full sprite bounds when a smaller body feels better.
- Do not build complex platformer physics without a dedicated controller.
- Consider Matter.js only when Arcade Physics limitations become a real blocker.
- Keep collision consequences in systems or scene wiring, not scattered callbacks.
`),
    reference('phaser-physics-collision-designer', 'collision-model-selection.md', `# Collision Model Selection

Use Arcade Physics when:

- movement is arcade/simple;
- bodies are mostly rectangles/circles;
- you need fast overlap/collider checks;
- the game is top-down, arena, runner, shooter, or simple platformer.

Use Matter.js when:

- stable complex bodies matter;
- shapes are rotated or compound;
- physics simulation is the gameplay.

Use manual hitboxes when:

- attacks need precise active frames;
- collisions are event-like, not physical pushes;
- you need deterministic simple rectangles/circles.

Use grid movement when:

- the game is tile/turn based;
- collision is by cell occupancy.

Rules by object:

- Pickups: overlap-only.
- Walls/floors: collider.
- Projectiles: overlap or collider depending on whether they bounce/block.
- Characters: stable body size independent from animation frames.
- Tilemaps: collision layer plus object layer for spawns/triggers.
`),
  );

  files.push(
    skill('phaser-camera-level-design', 'Use when designing or changing Phaser camera and level structure: camera follow, deadzone, lerp, bounds, zoom, screen shake, world size, spawn points, restart positions, tilemap object layers, arenas, platformers, room-based levels, safe areas, or HUD separation.', `# Phaser Camera Level Design

## Workflow

1. Read \`references/camera-level-checklist.md\`.
2. Identify the level shape: arena, side-view platformer, scrolling runner, room-based, or fixed puzzle board.
3. Set world bounds before camera follow.
4. Set camera bounds before adding deadzones or shake.
5. Keep HUD in a screen-space UI scene when the world camera moves or shakes.
6. Validate spawn, restart, and resize behavior.

## Rules

- Do not add camera follow to a world smaller than the viewport unless there is a reason.
- Do not let the camera show outside intended level bounds.
- Keep restart position and spawn points explicit.
- Add screen shake only after baseline camera motion feels stable.
- Test phone and desktop framing when zoom changes.
`),
    reference('phaser-camera-level-design', 'camera-level-checklist.md', `# Camera And Level Checklist

Level shape:

- Arena: bounded rectangle, camera often fixed or light follow, enemies spawn around edges.
- Platformer: side-view world, camera follows player, deadzone helps avoid jitter.
- Runner: camera often fixed; world or obstacles move.
- Room-based: camera snaps or transitions between rooms.
- Puzzle board: fixed camera; UI must not cover board.

Camera setup:

- Physics world bounds match intended level.
- Camera bounds match visible world limits.
- Follow target exists before follow starts.
- Deadzone and lerp are tuned after movement.
- Zoom preserves readability on mobile and desktop.
- Shake/fade does not affect HUD unless intentional.

Level data:

- Player spawn exists.
- Restart spawn is deterministic.
- Enemy/item spawn points are named.
- Object layers use stable names.
- Debug overlay can show camera scroll/zoom and spawn points.
`),
  );

  files.push(
    skill('phaser-content-pipeline', 'Use when adding or scaling Phaser gameplay content as data instead of hardcoding it in scenes: enemies, items, waves, levels, cards, dialogues, upgrades, spawn tables, balance values, or content definitions under src/game/data; keep content editable without breaking scene code.', `# Phaser Content Pipeline

## Workflow

1. Read \`references/content-as-data.md\` before adding repeatable content.
2. Move repeated definitions into \`src/game/data/\`.
3. Keep scenes and systems reading definitions by stable ids.
4. Validate data at creation boundaries when missing ids would crash gameplay.
5. Add only the data needed for the current playable slice.
6. Keep balance numbers near content definitions, not scattered through scenes.

## Rules

- Do not hardcode many enemies, waves, items, or levels directly in \`GameScene\`.
- Keep content data serializable when practical.
- Keep asset keys and content ids stable.
- Avoid premature external editors; TypeScript data files are enough for most prototypes.
`),
    reference('phaser-content-pipeline', 'content-as-data.md', `# Content As Data

Suggested folders:

\`\`\`text
src/game/data/enemies.ts
src/game/data/items.ts
src/game/data/levels.ts
src/game/data/waves.ts
src/game/data/upgrades.ts
src/game/data/dialogues.ts
\`\`\`

Example:

\`\`\`ts
export const enemyDefinitions = {
  slime: {
    hp: 3,
    speed: 70,
    damage: 1,
    rewardXp: 5,
  },
} as const;
\`\`\`

Rules:

- Systems consume definitions by id.
- Scenes wire content into the world.
- Entities build visuals/bodies from definitions.
- Save files store ids/progress, not full live objects.
- Add validation or fallback for unknown ids once content grows.
`),
  );

  files.push(
    skill('phaser-save-schema-migrations', 'Use before changing Phaser save data or settings persistence: localStorage schema versions, default save objects, migration from old versions, safe parse, corrupted save fallback, settings vs progress separation, reset flow, and avoiding direct localStorage outside save modules.', `# Phaser Save Schema Migrations

## Workflow

1. Read \`references/save-versioning.md\`.
2. Check the existing save module before adding persisted fields.
3. Add or update a versioned save type when structure changes.
4. Provide defaults for missing data.
5. Migrate old saves forward or reset safely with a clear fallback.
6. Validate fresh install, existing save, malformed save, and reset behavior.

## Rules

- Do not write direct \`localStorage\` calls throughout scenes or systems.
- Keep settings and player progress conceptually separate.
- Never persist Phaser objects, sprites, scenes, inputs, timers, or cameras.
- Save after meaningful player actions, not every frame.
- Keep temporary per-run upgrades out of persistent progress unless intended.
`),
    reference('phaser-save-schema-migrations', 'save-versioning.md', `# Save Versioning

Example:

\`\`\`ts
type SaveV2 = {
  version: 2;
  coins: number;
  unlockedLevels: string[];
  settings: {
    musicVolume: number;
    sfxVolume: number;
    reducedMotion: boolean;
  };
};
\`\`\`

Safe load flow:

1. Read raw string from storage.
2. If missing, return default save.
3. Parse in try/catch.
4. Check \`version\`.
5. Migrate known older versions.
6. If unknown or corrupted, return default save and keep the game playable.

Separate:

- Settings: audio volume, language, controls, reduced motion.
- Progress: coins, unlocks, best score, completed levels.
- Runtime: hp, position, active enemies, current temporary upgrades.
`),
  );

  return files;
}
