import type { GeneratedFile, ProjectOptions } from '../types';

export function creatorGuideDocs(options: ProjectOptions): GeneratedFile[] {
  return [
    {
      path: 'AGENT_WORKFLOW.md',
      content: `# Agent Operating Workflow

This is the main operating loop for any AI agent working in this repository.

Do not start by coding. Start by turning the user's idea into the smallest verified Phaser game loop.

## Required Loop

1. Read \`AGENTS.md\`, this file, \`skills/README.md\`, and \`skills/_meta/task-map.md\`.
2. Run \`npm run agent:audit\` when dependencies are available.
3. Use \`docs/game-design-intake.md\` to extract or infer the game idea.
4. Use \`docs/first-playable-contract.md\` to define the first playable.
5. Choose the relevant skills from \`skills/_meta/task-map.md\`.
6. Inspect the current scenes, systems, input, assets, templates, and tests.
7. Implement the smallest coherent change.
8. Validate against \`docs/validation-matrix.md\` and \`docs/quality-gates.md\`.
9. Update docs, recipes, templates, or decisions if the project shape changed.
10. Report what changed, which skills were used, and what was verified.

## If The User Gives Only A Vague Idea

Do not block. Propose three tiny first playable loops and recommend the smallest one.

Each proposal must include:

- core action;
- goal;
- failure or pressure;
- feedback moment;
- primary input;
- scenes/modules touched;
- validation path.

## If The User Asks For A Feature

1. Find the closest recipe in \`docs/feature-recipes/\`.
2. Pick the matching skill.
3. Check \`templates/modules/\` for a reusable starting point.
4. Add only the minimum architecture needed.
5. Keep the feature playable and testable before polishing it.

## If The User Asks For A Genre

1. Find the closest blueprint in \`docs/genre-blueprints/\`.
2. Build the first playable loop from that blueprint.
3. Do not build the full game design document before the loop works.

## Decisions

When a change affects architecture, scene flow, input strategy, scale mode, asset pipeline, publishing, or core gameplay rules, add a short note under \`docs/decisions/\`.

Use this format:

\`\`\`md
# Decision: short title

Date: YYYY-MM-DD

## Context

What problem was being solved.

## Decision

What was chosen.

## Consequences

What this makes easier or harder.
\`\`\`
`,
    },
    {
      path: 'docs/game-creator-guide.md',
      content: `# Game Creator Guide

This repository is a foundation for a Phaser game, not a finished game.

The first screen is an idea sandbox. Replace it after the first playable loop is designed.

## What To Do First

1. Read \`AGENT_WORKFLOW.md\`.
2. Extract the idea with \`docs/game-design-intake.md\`.
3. Define the loop with \`docs/first-playable-contract.md\`.
4. Use \`phaser-project-architect\` to map scenes and modules.
5. Replace the sandbox with real gameplay only after the loop is clear.

## Useful First Prompts

\`\`\`text
Use phaser-project-architect. My game idea is: [describe idea]. Turn it into a first playable loop and project architecture.
\`\`\`

\`\`\`text
Use phaser-scene-workflow and phaser-game-systems. Replace the template guide with the first real gameplay scene.
\`\`\`

\`\`\`text
Use phaser-input-mobile-desktop and phaser-responsive-layout. Design controls for ${options.target === 'mobile' ? 'a mobile-first' : 'a desktop-first'} version of this game.
\`\`\`

## Do Not Start With

- A large content system.
- Multiplayer.
- Backend.
- Complex editor integration.
- A full economy.
- Many scenes.

Start with one action, one goal, one feedback moment, and one way to restart or continue.
`,
    },
    {
      path: 'docs/game-design-intake.md',
      content: `# Game Design Intake

Use this file to turn a human's rough idea into a buildable Phaser task.

## Extract These Facts

- Game fantasy: what the player imagines doing.
- Core action: the main verb, such as move, jump, dodge, swap, shoot, collect, choose.
- Camera: fixed, top-down, side-view, board, card/table, scrolling.
- Primary target: ${options.target === 'mobile' ? 'mobile-first' : 'desktop-first'}.
- Input: pointer, touch, keyboard, mouse, gamepad.
- Goal: what success means in the first loop.
- Pressure: timer, enemy, obstacle, limited moves, risk, puzzle constraint.
- Feedback: what should feel good immediately.
- Restart: how the player tries again.

## If Details Are Missing

Infer a small version and continue.

Default assumptions:

- Use Phaser 3 with TypeScript and Vite.
- Keep runtime code under \`src/game/\`.
- Use pointer input as a shared baseline.
- Add keyboard support for desktop actions.
- Use touch-safe controls for mobile actions.
- Start with generated/code-drawn placeholder art.
- Add real assets only when sources and licenses are known.

## Output Format For The Agent

\`\`\`md
## Parsed Idea

- Fantasy:
- Core action:
- Camera:
- Target:
- Input:
- Goal:
- Pressure:
- Feedback:
- Restart:

## Recommended First Playable

One paragraph.

## Skills To Use

- skill-name: reason
\`\`\`
`,
    },
    {
      path: 'docs/first-playable-loop.md',
      content: `# First Playable Loop

A first playable loop is the smallest version of the game that proves the idea.

It should include:

- one player action;
- one goal;
- one state change;
- one feedback moment;
- one restart/continue path;
- one verification path.

## Examples

Arcade:

- Action: move and dodge.
- Goal: survive 30 seconds.
- Feedback: hit flash and camera shake.
- State: score/time.

Puzzle:

- Action: select/swap/drag.
- Goal: solve one board.
- Feedback: match/clear animation.
- State: moves remaining.

Card/collection:

- Action: choose/play/open.
- Goal: resolve one turn or open one pack.
- Feedback: reveal animation.
- State: hand/collection/save.

Platformer:

- Action: move and jump.
- Goal: reach one marker.
- Feedback: landing/jump effects.
- State: checkpoint/restart.
`,
    },
    {
      path: 'docs/first-playable-contract.md',
      content: `# First Playable Contract

The first playable is done only when the player can understand, act, receive feedback, and try again.

## Required

- Player can perform the core action.
- There is one clear goal.
- There is one obstacle, risk, timer, enemy, puzzle constraint, or failure pressure.
- The game responds with visible feedback.
- The loop has win, lose, restart, or continue behavior.
- The scene works on ${options.target === 'mobile' ? 'mobile-first and desktop fallback' : 'desktop-first and mobile fallback'} viewports.
- The code builds with \`npm run build\`.
- Smoke tests or manual validation confirm canvas visibility and interaction.

## Not Required Yet

- full menu flow;
- many levels;
- final art;
- full economy;
- backend;
- multiplayer;
- deep progression;
- complex editor tooling.

## Replacement Rule

The generated sandbox should be replaced only when the first playable loop exists. Do not replace it with a prettier static screen.

## Definition Of Done

\`\`\`text
I can start the game, perform the main action, see feedback, hit success/failure pressure, and restart or continue.
\`\`\`
`,
    },
    {
      path: 'docs/validation-matrix.md',
      content: `# Validation Matrix

Use this before calling a gameplay task done.

| Area | Check | Command Or Method |
| --- | --- | --- |
| TypeScript/Vite | Project builds | \`npm run build\` |
| Local run | Dev server starts | \`npm run dev\` |
| Canvas | Canvas exists and is visible | browser or Playwright |
| Scene | Correct scene reaches interactive state | browser or Playwright |
| Desktop input | Keyboard/mouse path works | manual or Playwright |
| Mobile input | Pointer/touch path works | mobile viewport/manual |
| Layout | Text/HUD does not clip | desktop + phone viewport |
| Feedback | Core action has readable feedback | manual play |
| Restart | Player can retry or continue | manual/playwright |
| Console | No runtime console errors | browser or Playwright |
${options.includeYandexGames ? '| Yandex | SDK path, no CDN, packaging rules | `npm run validate:yandex` |\n' : ''}

## Reporting Format

\`\`\`md
## Verification

- npm run build: pass/fail
- npm run test:smoke: pass/fail/not available
- Desktop viewport: pass/fail/not checked
- Mobile viewport: pass/fail/not checked
- Notes:
\`\`\`
`,
    },
    {
      path: 'docs/quality-gates.md',
      content: `# Quality Gates

Use these gates before calling the project ready for a user, test build, or release.

## First Playable Gate

- Core action works.
- One goal exists.
- One pressure/failure condition exists.
- Feedback is visible and readable.
- Restart or continue path exists.
- Sandbox has been replaced only by real gameplay, not a static page.

## Architecture Gate

- Game code stays under \`src/game/\`.
- Scene lifecycle code stays in scenes.
- Reusable rules move to \`systems/\`, \`entities/\`, \`input/\`, \`state/\`, \`save/\`, or \`ui/\`.
- No "everything in one Scene" implementation.
- New architecture decisions are recorded in \`docs/decisions/\`.

## Mobile/Desktop Gate

- Pointer/touch path works.
- Keyboard/mouse path works when relevant.
- Text and HUD fit phone and desktop viewports.
- No accidental page scroll, text selection, or context menu on the game canvas.
- Touch controls do not cover critical gameplay.

## Asset Gate

- Assets are loaded through manifest/helper patterns.
- No copyrighted assets are added without explicit permission.
- Third-party assets are recorded in \`public/assets/credits.md\`.
- Runtime assets are self-hosted, not loaded from CDN.

## Runtime Gate

- \`npm run build\` passes.
- No console errors during startup.
- Restart does not duplicate listeners, timers, enemies, audio, or UI.
- Debug overlays are disabled or clearly development-only.
${options.includeYandexGames ? '\n## Yandex Gate\n\n- `npm run validate:yandex` passes.\n- `/sdk.js` remains in `index.html`.\n- No external CDN references are introduced.\n- Gameplay pause/resume and audio behavior account for platform events.\n' : ''}
`,
    },
    {
      path: 'docs/release-checklist.md',
      content: `# Release Checklist

This is not required for a first playable, but use it before sharing a public build.

## Build

- \`npm run build\` passes.
- Production preview has no blank canvas.
- Asset paths work after build.
- No development-only logs or debug overlays are visible.

## Gameplay

- Start, play, win/lose, and restart work.
- Player can understand the goal without chat history.
- Main action has feedback.
- Controls work on the selected target and a fallback target.

## Content And Legal

- \`public/assets/credits.md\` lists external assets.
- Placeholder assets are clearly original/generated.
- No brand/copyrighted game art was copied.
- Fonts and sounds are licensed for the intended use.

## Agent Handoff

- README commands are current.
- New systems are documented.
- Decisions are recorded when architecture changed.
- Validation notes are included in the final agent response.
`,
    },
    {
      path: 'docs/mobile-checklist.md',
      content: `# Mobile Checklist

Use this for mobile-first work and for desktop games that should still run on phones.

- Canvas is visible and centered.
- Touch input can perform the core action.
- Controls are reachable and not on unsafe edges.
- HUD text is readable.
- No browser scrollbars.
- No long-tap selection.
- No right-click/context menu surprises.
- Audio starts only after a user gesture.
- Resize/orientation changes do not leave stale UI positions.
- Effects and particles do not overwhelm low-end devices.
`,
    },
    {
      path: 'docs/asset-credits-policy.md',
      content: `# Asset Credits Policy

Agents must not import questionable assets just to make the prototype look finished.

## Allowed By Default

- Code-drawn placeholders.
- User-provided assets.
- Assets with a clear license allowing the intended use.
- Self-authored SVG/Canvas/Phaser Graphics placeholders.

## Not Allowed Without Explicit Permission

- Commercial game sprites.
- Movie/anime/brand art.
- Random images from search results.
- Fonts or sounds without usage rights.

## Credits Format

Record assets in \`public/assets/credits.md\`:

\`\`\`md
| Asset | Source | Author | License | Notes |
| --- | --- | --- | --- | --- |
| player-placeholder.svg | generated in repo | project | original | replace before final art |
\`\`\`
`,
    },
    {
      path: 'docs/agent-self-audit.md',
      content: `# Agent Self Audit

Run this mentally at the start of a new session.

## Repository Facts

- Engine: Phaser
- Language: TypeScript
- Build: Vite
- Target: ${options.target === 'mobile' ? 'mobile-first' : 'desktop-first'}
- Local skills: \`skills/\`
- Main workflow: \`AGENT_WORKFLOW.md\`

## Check Before Editing

- What scene currently starts the game?
- Is the sandbox still present?
- Which skill matches the task?
- Are assets real, generated, or missing?
- Is Yandex publishing enabled? ${options.includeYandexGames ? 'Yes.' : 'No.'}
- Are Playwright smoke tests enabled? ${options.includePlaywright ? 'Yes.' : 'No.'}
- What command validates this change?

## Output

Before editing, state:

\`\`\`text
Using [skill] because [reason]. I checked [files]. I will validate with [command/check].
\`\`\`
`,
    },
    {
      path: 'docs/idea-to-architecture.md',
      content: `# Idea To Architecture

Use this guide to translate a game idea into modules. These are not hard presets; they are starting hints.

## Top-Down Movement

- \`entities/player\`
- \`input/PlayerInput\`
- \`systems/movement\`
- optional \`physics-arcade\`
- camera follow if world is larger than screen

## Platformer

- Arcade physics
- player jump/movement actions
- collision layers or platforms
- restart/checkpoint state

## Puzzle

- board/grid system
- pure rules under \`systems/\`
- UI feedback under \`ui/\`
- save progress if level-based

## Card Or Collection Game

- card data under \`content/\`
- deck/hand/collection systems
- save collection state
- UI card components
- reveal/gamefeel animations

## Idle Or Clicker

- economy system
- timers
- save upgrades/progress
- offline progress if desired
- readable HUD

## Tilemap Adventure

- tilemap asset pipeline
- map/object layer conventions
- grid or free movement
- collision/object systems

## When Unsure

Ask the agent to propose three possible first playable loops, then choose the smallest one.
`,
    },
    {
      path: 'docs/feature-recipes/README.md',
      content: `# Feature Recipes

Recipes are short implementation paths for common Phaser features.

Use them with skills:

- architecture first when a feature changes structure;
- scene/input/layout skills for runtime behavior;
- asset/gamefeel/testing skills for finish and validation.

Do not treat recipes as mandatory abstractions. They are rails for agents.
`,
    },
    {
      path: 'docs/feature-recipes/add-player.md',
      content: `# Recipe: Add Player

Use skills:

- \`phaser-scene-workflow\`
- \`phaser-input-mobile-desktop\`
- \`phaser-sprite-animation\` if animated
- \`phaser-debug-performance\` if tuning physics

Steps:

1. Define the core player action.
2. Add or update an entity/factory under \`src/game/entities/\` when setup repeats.
3. Route raw input through \`src/game/input/\`.
4. Keep movement/update logic small and readable.
5. Add visible feedback for action, hit, pickup, or failure.
6. Validate desktop and mobile input paths.
`,
    },
    {
      path: 'docs/feature-recipes/add-enemy.md',
      content: `# Recipe: Add Enemy

Use skills:

- \`phaser-game-systems\`
- \`phaser-scene-workflow\`
- \`phaser-gamefeel\`

Steps:

1. Pick one behavior: patrol, chase, flee, orbit, shoot, block, or wander.
2. Add the enemy as an entity or factory.
3. Put behavior rules in a system if more than one enemy uses them.
4. Add one consequence: damage, pushback, lose condition, score change, or timer pressure.
5. Add readable feedback for contact or defeat.
6. Validate restart/cleanup so enemies do not duplicate across scene restarts.
`,
    },
    {
      path: 'docs/feature-recipes/add-collectible.md',
      content: `# Recipe: Add Collectible

Use skills:

- \`phaser-assets-pipeline\`
- \`phaser-game-systems\`
- \`phaser-gamefeel\`

Steps:

1. Define what the collectible changes: score, timer, health, unlock, inventory, progress.
2. Add an asset key or generated placeholder.
3. Spawn it from a scene, system, or tilemap object layer.
4. On collect, update state and hide/destroy/recycle it.
5. Add feedback: tween, sound, particle, score popup, or camera nudge.
6. Validate collection cannot trigger twice accidentally.
`,
    },
    {
      path: 'docs/feature-recipes/add-timer-score.md',
      content: `# Recipe: Add Timer Or Score

Use skills:

- \`phaser-game-systems\`
- \`phaser-ui-hud\`
- \`phaser-testing\`

Steps:

1. Keep score/time in state or a small gameplay system.
2. Display it through HUD/UI, not buried in world objects.
3. Decide what happens at zero, target score, or best score.
4. Persist best score only after the loop works.
5. Validate text fits on phone and desktop.
`,
    },
    {
      path: 'docs/feature-recipes/add-touch-controls.md',
      content: `# Recipe: Add Touch Controls

Use skills:

- \`phaser-input-mobile-desktop\`
- \`phaser-responsive-layout\`
- \`phaser-ui-hud\`

Steps:

1. Map touch to actions, not scene-specific flags.
2. Use pointer/tap for simple actions.
3. Use virtual buttons or joystick only for repeated/continuous actions.
4. Keep controls away from safe-area edges.
5. Make desktop keyboard/mouse still work.
6. Validate with mobile viewport and real touch if available.
`,
    },
    {
      path: 'docs/feature-recipes/add-pause-restart.md',
      content: `# Recipe: Add Pause And Restart

Use skills:

- \`phaser-scene-workflow\`
- \`phaser-ui-hud\`
- \`phaser-audio-sfx\`

Steps:

1. Decide whether pause is a scene overlay or state inside gameplay.
2. Freeze gameplay timers, physics, input, and spawns.
3. Keep restart cleanup deterministic.
4. Stop duplicated event listeners on shutdown.
5. Pause/resume audio and platform gameplay APIs when publishing requires it.
6. Validate restart several times in one browser session.
`,
    },
    {
      path: 'docs/feature-recipes/add-health-damage.md',
      content: `# Recipe: Add Health And Damage

Use skills:

- \`phaser-game-systems\`
- \`phaser-gamefeel\`
- \`phaser-ui-hud\`

Steps:

1. Store health in state or a small system, not directly on random sprites.
2. Define damage sources and invulnerability timing.
3. Add hit feedback: flash, knockback, sound, or brief camera effect.
4. Update HUD through events or explicit state reads.
5. Define zero-health behavior: fail, respawn, restart, or game over.
6. Validate damage cannot trigger every frame unless intended.
`,
    },
    {
      path: 'docs/feature-recipes/add-win-lose-state.md',
      content: `# Recipe: Add Win And Lose State

Use skills:

- \`phaser-game-systems\`
- \`phaser-scene-workflow\`
- \`phaser-ui-hud\`

Steps:

1. Define one win condition and one lose condition.
2. Keep state transitions explicit: playing, won, lost, restarting.
3. Stop timers, spawns, and input side effects when the run ends.
4. Show a simple result message or overlay.
5. Provide restart/continue input.
6. Validate that win/lose cannot fire repeatedly.
`,
    },
    {
      path: 'docs/feature-recipes/add-camera-follow.md',
      content: `# Recipe: Add Camera Follow

Use skills:

- \`phaser-responsive-layout\`
- \`phaser-scene-workflow\`
- \`phaser-debug-performance\`

Steps:

1. Confirm the world is larger than the viewport.
2. Set world and camera bounds.
3. Follow the player or target with sensible lerp/deadzone.
4. Keep HUD in a UI scene or screen-space layer.
5. Test resize and mobile viewport.
6. Add camera shake/fade only after follow feels stable.
`,
    },
    {
      path: 'docs/feature-recipes/add-projectiles.md',
      content: `# Recipe: Add Projectiles

Use skills:

- \`phaser-game-systems\`
- \`phaser-debug-performance\`
- \`phaser-gamefeel\`

Steps:

1. Define projectile owner, speed, lifetime, damage, and collision targets.
2. Use a group or object pool for repeated shots.
3. Reset velocity, active state, visibility, tint, and timers on reuse.
4. Disable projectiles when offscreen or after collision.
5. Add readable firing/hit feedback.
6. Validate no unbounded projectile growth occurs.
`,
    },
    {
      path: 'docs/feature-recipes/add-save-progress.md',
      content: `# Recipe: Add Save Progress

Use skills:

- \`phaser-game-systems\`
- \`phaser-testing\`

Steps:

1. Save only meaningful data: settings, best score, unlocks, level progress.
2. Include a schema version once the save has more than one field.
3. Handle missing, malformed, or old saves gracefully.
4. Never store Phaser objects.
5. Add a reset path for development.
6. Validate reload behavior in the browser.
`,
    },
    {
      path: 'docs/feature-recipes/add-main-menu.md',
      content: `# Recipe: Add Main Menu

Use skills:

- \`phaser-scene-workflow\`
- \`phaser-ui-hud\`
- \`phaser-audio-sfx\`

Steps:

1. Add a MenuScene only when the first playable needs entry choices.
2. Keep buttons large enough for touch and readable on desktop.
3. Start gameplay through explicit scene transition.
4. Avoid complex settings/progression before the loop works.
5. Validate menu -> game -> restart/menu flow.
`,
    },
    {
      path: 'docs/feature-recipes/add-audio.md',
      content: `# Recipe: Add Audio

Use skills:

- \`phaser-audio-sfx\`
- \`phaser-assets-pipeline\`
- \`phaser-gamefeel\`

Steps:

1. Add audio files under \`public/assets/audio/\`.
2. Register keys through the asset manifest.
3. Unlock audio after user gesture.
4. Separate music and SFX volume.
5. Add mute if audio becomes persistent.
6. Validate mobile browser behavior.
`,
    },
    {
      path: 'docs/feature-recipes/add-tilemap-level.md',
      content: `# Recipe: Add Tilemap Level

Use skills:

- \`phaser-tilemaps-tiled\`
- \`phaser-assets-pipeline\`
- \`phaser-responsive-layout\`

Steps:

1. Put Tiled JSON in \`public/assets/tilemaps/\`.
2. Put tilesets in \`public/assets/tilesets/\`.
3. Load map and tileset keys from preload/manifest.
4. Create stable layers: ground, decor, collision, objects.
5. Spawn player/items from object layer names.
6. Set world/camera bounds and validate collision debug.
`,
    },
    {
      path: 'docs/genre-blueprints/README.md',
      content: `# Genre Blueprints

Blueprints help agents choose a first playable shape from a vague idea.

Use a blueprint only as a starting point. The first playable still must follow \`docs/first-playable-contract.md\`.
`,
    },
    {
      path: 'docs/genre-blueprints/top-down-arena.md',
      content: `# Blueprint: Top-Down Arena

Best for: survival, dodging, simple shooters, collection arenas.

First playable:

- Player moves in 2D.
- One enemy or hazard creates pressure.
- One collectible or timer creates goal.
- HUD shows time, score, health, or objective.
- Restart after hit, timeout, or success.

Skills:

- \`phaser-input-mobile-desktop\`
- \`phaser-game-systems\`
- \`phaser-gamefeel\`
- \`phaser-debug-performance\`
`,
    },
    {
      path: 'docs/genre-blueprints/platformer.md',
      content: `# Blueprint: Platformer

Best for: jumping, obstacle courses, side-view action.

First playable:

- Player moves and jumps.
- One platform/collision shape exists.
- One hazard or gap creates failure.
- One marker, coin, or door creates success.
- Camera and body tuning feel stable.

Skills:

- \`phaser-input-mobile-desktop\`
- \`phaser-responsive-layout\`
- \`phaser-sprite-animation\`
- \`phaser-tilemaps-tiled\` if using tile levels
`,
    },
    {
      path: 'docs/genre-blueprints/puzzle-grid.md',
      content: `# Blueprint: Puzzle Grid

Best for: match, swap, path, sliding, logic, board puzzles.

First playable:

- Board initializes deterministically.
- Player can select, drag, swap, rotate, or place.
- One rule resolves the move.
- Win/fail/move-limit state exists.
- Feedback makes valid/invalid actions obvious.

Skills:

- \`phaser-game-systems\`
- \`phaser-input-mobile-desktop\`
- \`phaser-ui-hud\`
- \`phaser-testing\`
`,
    },
    {
      path: 'docs/genre-blueprints/runner.md',
      content: `# Blueprint: Endless Runner

Best for: one-button action, lane switching, jump/dodge games.

First playable:

- World or obstacles move consistently.
- Player has one or two actions.
- Obstacles spawn with readable timing.
- Score or distance increases.
- Collision ends the run and allows restart.

Skills:

- \`phaser-game-systems\`
- \`phaser-input-mobile-desktop\`
- \`phaser-debug-performance\`
- \`phaser-gamefeel\`
`,
    },
    {
      path: 'docs/genre-blueprints/card-collection.md',
      content: `# Blueprint: Card Or Collection Game

Best for: packs, deck choices, turn prototypes, collection reveals.

First playable:

- Player makes one choice: open, draw, play, select, or resolve.
- A small data set drives cards/items.
- UI communicates rarity/state/result.
- Save stores collection or best outcome only after the loop works.
- Reveal feedback is the main feel moment.

Skills:

- \`phaser-ui-hud\`
- \`phaser-game-systems\`
- \`phaser-gamefeel\`
- \`phaser-programmatic-art\`
`,
    },
    {
      path: 'docs/decisions/README.md',
      content: `# Decisions

Add short decision notes here when the project direction changes.

Create files like:

\`\`\`text
docs/decisions/2026-05-24-scale-mode.md
docs/decisions/2026-05-24-first-playable-loop.md
\`\`\`

Keep each note short: context, decision, consequences.
`,
    },
    {
      path: 'templates/modules/README.md',
      content: `# Module Templates

These files are reusable starting points for agents.

They are intentionally outside \`src/\` so they do not compile until copied or adapted.

Use them when a feature needs a common system shape:

- \`InputActions.ts\`: action-based input snapshot.
- \`GameState.ts\`: small runtime state container.
- \`TimerSystem.ts\`: countdown/count-up loop.
- \`HealthSystem.ts\`: health, damage, invulnerability.
- \`ObjectPool.ts\`: reusable object lifecycle.
- \`DebugOverlay.ts\`: development-only text overlay.
- \`AudioManager.ts\`: music/SFX volume and unlock shape.
- \`AnimationStateMachine.ts\`: animation state transitions.

Before copying a template:

1. Pick the matching skill.
2. Rename types and events to match the game.
3. Keep only the code needed for the first playable.
4. Add validation notes after testing.
`,
    },
    {
      path: 'templates/modules/InputActions.ts',
      content: `export type InputActions = {
  moveX: number;
  moveY: number;
  primary: boolean;
  secondary: boolean;
  confirm: boolean;
  cancel: boolean;
};

export const emptyInputActions: InputActions = {
  moveX: 0,
  moveY: 0,
  primary: false,
  secondary: false,
  confirm: false,
  cancel: false,
};

export function normalizeAxis(value: number): number {
  if (Math.abs(value) < 0.15) {
    return 0;
  }

  return Math.max(-1, Math.min(1, value));
}
`,
    },
    {
      path: 'templates/modules/GameState.ts',
      content: `export type RunPhase = 'ready' | 'playing' | 'won' | 'lost';

export type GameStateSnapshot = {
  phase: RunPhase;
  score: number;
  bestScore: number;
  elapsedMs: number;
};

export class GameState {
  private snapshot: GameStateSnapshot = {
    phase: 'ready',
    score: 0,
    bestScore: 0,
    elapsedMs: 0,
  };

  get value(): GameStateSnapshot {
    return { ...this.snapshot };
  }

  start(): void {
    this.snapshot.phase = 'playing';
    this.snapshot.score = 0;
    this.snapshot.elapsedMs = 0;
  }

  addScore(amount: number): void {
    this.snapshot.score += amount;
    this.snapshot.bestScore = Math.max(this.snapshot.bestScore, this.snapshot.score);
  }

  update(deltaMs: number): void {
    if (this.snapshot.phase === 'playing') {
      this.snapshot.elapsedMs += deltaMs;
    }
  }

  finish(phase: Extract<RunPhase, 'won' | 'lost'>): void {
    this.snapshot.phase = phase;
  }
}
`,
    },
    {
      path: 'templates/modules/TimerSystem.ts',
      content: `export class TimerSystem {
  private remainingMs: number;
  private finished = false;

  constructor(durationMs: number) {
    this.remainingMs = durationMs;
  }

  get remaining(): number {
    return Math.max(0, this.remainingMs);
  }

  get isFinished(): boolean {
    return this.finished;
  }

  reset(durationMs: number): void {
    this.remainingMs = durationMs;
    this.finished = false;
  }

  update(deltaMs: number): boolean {
    if (this.finished) {
      return false;
    }

    this.remainingMs -= deltaMs;

    if (this.remainingMs <= 0) {
      this.remainingMs = 0;
      this.finished = true;
      return true;
    }

    return false;
  }
}
`,
    },
    {
      path: 'templates/modules/HealthSystem.ts',
      content: `export class HealthSystem {
  private current: number;
  private invulnerableMs = 0;

  constructor(private readonly maxHealth: number) {
    this.current = maxHealth;
  }

  get health(): number {
    return this.current;
  }

  get isDead(): boolean {
    return this.current <= 0;
  }

  reset(): void {
    this.current = this.maxHealth;
    this.invulnerableMs = 0;
  }

  update(deltaMs: number): void {
    this.invulnerableMs = Math.max(0, this.invulnerableMs - deltaMs);
  }

  damage(amount: number, invulnerabilityMs = 500): boolean {
    if (this.invulnerableMs > 0 || this.isDead) {
      return false;
    }

    this.current = Math.max(0, this.current - amount);
    this.invulnerableMs = invulnerabilityMs;
    return true;
  }

  heal(amount: number): void {
    this.current = Math.min(this.maxHealth, this.current + amount);
  }
}
`,
    },
    {
      path: 'templates/modules/ObjectPool.ts',
      content: `export type Poolable = {
  active: boolean;
  reset(): void;
};

export class ObjectPool<T extends Poolable> {
  private readonly items: T[] = [];

  constructor(
    private readonly createItem: () => T,
    private readonly maxSize: number,
  ) {}

  acquire(): T | undefined {
    const inactive = this.items.find((item) => !item.active);

    if (inactive) {
      inactive.reset();
      inactive.active = true;
      return inactive;
    }

    if (this.items.length >= this.maxSize) {
      return undefined;
    }

    const item = this.createItem();
    item.active = true;
    this.items.push(item);
    return item;
  }

  release(item: T): void {
    item.active = false;
  }

  get activeCount(): number {
    return this.items.filter((item) => item.active).length;
  }
}
`,
    },
    {
      path: 'templates/modules/DebugOverlay.ts',
      content: `import Phaser from 'phaser';

export class DebugOverlay {
  private text: Phaser.GameObjects.Text;
  private visible = false;

  constructor(scene: Phaser.Scene) {
    this.text = scene.add
      .text(12, 12, '', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#7ee7c8',
        backgroundColor: 'rgba(0,0,0,0.55)',
        padding: { x: 8, y: 6 },
      })
      .setScrollFactor(0)
      .setDepth(10000)
      .setVisible(false);
  }

  toggle(): void {
    this.visible = !this.visible;
    this.text.setVisible(this.visible);
  }

  update(lines: string[]): void {
    if (!this.visible) {
      return;
    }

    this.text.setText(lines.join('\\n'));
  }

  destroy(): void {
    this.text.destroy();
  }
}
`,
    },
    {
      path: 'templates/modules/AudioManager.ts',
      content: `import Phaser from 'phaser';

export class AudioManager {
  private unlocked = false;
  private music?: Phaser.Sound.BaseSound;
  private musicVolume = 0.6;
  private sfxVolume = 0.8;
  private muted = false;

  constructor(private readonly scene: Phaser.Scene) {}

  unlockOnFirstGesture(): void {
    if (this.unlocked) {
      return;
    }

    this.scene.input.once('pointerdown', () => {
      this.unlocked = true;
    });
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.scene.sound.mute = muted;
  }

  playMusic(key: string): void {
    if (this.music?.isPlaying) {
      this.music.stop();
    }

    this.music = this.scene.sound.add(key, { loop: true, volume: this.musicVolume });
    this.music.play();
  }

  playSfx(key: string): void {
    if (this.muted) {
      return;
    }

    this.scene.sound.play(key, { volume: this.sfxVolume });
  }
}
`,
    },
    {
      path: 'templates/modules/AnimationStateMachine.ts',
      content: `import Phaser from 'phaser';

export type AnimationState = {
  key: string;
  priority: number;
  interruptible: boolean;
};

export class AnimationStateMachine {
  private current?: AnimationState;

  constructor(private readonly sprite: Phaser.GameObjects.Sprite) {}

  play(next: AnimationState): void {
    if (this.current?.key === next.key) {
      return;
    }

    if (this.current && !this.current.interruptible && next.priority < this.current.priority) {
      return;
    }

    this.current = next;
    this.sprite.play(next.key, true);
  }

  clearIf(key: string): void {
    if (this.current?.key === key) {
      this.current = undefined;
    }
  }
}
`,
    },
    {
      path: 'docs/agent-start-prompts.md',
      content: `# Agent Start Prompts

Use these prompts when you want the agent to begin real game work.

## Architecture

\`\`\`text
Use phaser-project-architect. My idea is: [describe game]. Propose the smallest first playable loop, the scene plan, and the modules needed.
\`\`\`

## Replace Template Guide

\`\`\`text
Use phaser-scene-workflow. Replace TemplateGuideScene with the first real menu/gameplay flow for this idea: [describe game].
\`\`\`

## Controls

\`\`\`text
Use phaser-input-mobile-desktop. Design controls for this game on mobile and desktop: [describe action].
\`\`\`

## Layout

\`\`\`text
Use phaser-responsive-layout. Make the first playable scene work on phone and desktop viewports.
\`\`\`

## Feel

\`\`\`text
Use phaser-gamefeel. Add feedback to the core action without overbuilding the game.
\`\`\`
`,
    },
  ];
}

