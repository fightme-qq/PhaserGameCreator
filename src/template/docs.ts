import type { GeneratedFile, ProjectOptions } from '../types';
import { getSkillNames } from './skillNames';

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

export function rootDocs(options: ProjectOptions): GeneratedFile[] {
  const skillNames = getSkillNames(options);
  return [
    {
      path: 'START_HERE.md',
      content: `# Start Here

You opened a generated Phaser game repository.

If you are a human:

1. Open this folder in Codex, Claude Code, Gemini CLI, or another coding agent.
2. Tell the agent your game idea.
3. Run:

\`\`\`bash
npm install
npm run agent:audit
npm run dev
\`\`\`

4. Open the local URL printed by Vite.

If you are an AI coding agent:

1. Read \`AGENTS.md\` first.
2. Read \`AGENT_WORKFLOW.md\`.
3. Run \`npm run agent:audit\` if dependencies are installed.
4. Read \`docs/game-design-intake.md\`, \`docs/first-playable-contract.md\`, \`docs/validation-matrix.md\`, and \`docs/quality-gates.md\`.
5. Read \`skills/README.md\`.
6. Pick the right skill from \`skills/_meta/task-map.md\`.
7. Check \`templates/modules/\` before inventing common systems from scratch.
8. Before changing code, explain which skill you are using and why.
9. Keep this repo Phaser-focused. Do not convert it into a generic web app.

## What This Project Is

- Game title: ${options.title}
- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${options.target === 'mobile' ? 'mobile-first browser game' : 'desktop-first browser game'}
- Yandex Games publish pack: ${options.includeYandexGames ? 'included' : 'not included'}
- Generated skills: ${skillNames.length}

## First Useful Agent Prompts

\`\`\`text
Use phaser-project-architect. My game idea is: [describe game]. Turn it into a first playable loop.
\`\`\`

\`\`\`text
Use phaser-scene-workflow. Replace the template guide with real gameplay for this idea: [describe game].
\`\`\`

\`\`\`text
Use the phaser-input-mobile-desktop and phaser-responsive-layout skills to make this work well on phone and desktop.
\`\`\`
`,
    },
    {
      path: 'README.md',
      content: `# ${options.title}

Generated with Phaser Game Creator.

This repo is built to be opened by a coding agent. The agent should read \`AGENTS.md\`, then use the project-local skills in \`skills/\`.

## Run

\`\`\`bash
npm install
npm run agent:audit
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Project Shape

\`\`\`text
src/game/
  config/     Phaser configuration and constants
  scenes/     Boot, Preload, Menu, Game, UI scenes
  systems/    Gameplay systems with explicit boundaries
  entities/   Game objects and entity factories
  input/      Mobile/desktop input abstraction
  ui/         HUD and menu helpers
  state/      Runtime state and events
  assets/     Asset manifest and loader helpers
  save/       Local save/load helpers
  utils/      Small shared utilities
skills/       Project-local AI skills
\`\`\`

## Agent Entry Points

- \`AGENTS.md\`: operating instructions for AI agents.
- \`AGENT_WORKFLOW.md\`: required agent operating loop.
- \`CLAUDE.md\`: Claude Code entry instructions.
- \`GEMINI.md\`: Gemini CLI entry instructions.
- \`.github/copilot-instructions.md\`: GitHub Copilot instructions.
- \`.cursor/rules/phaser-game-creator.mdc\`: Cursor auto-applied rule.
- \`.ai/agent-entry.md\`: generic AI agent entry instructions.
- \`.ai/skill-manifest.json\`: machine-readable skill map.
- \`skills/README.md\`: what skills exist and when to use them.
- \`skills/_meta/task-map.md\`: task-to-skill routing table.
- \`skills/_meta/update-skills.md\`: how to keep skills current.
- \`docs/game-design-intake.md\`: how to parse vague game ideas.
- \`docs/first-playable-contract.md\`: what must be true before the first loop is done.
- \`docs/validation-matrix.md\`: checks before finishing work.
- \`docs/quality-gates.md\`: first playable, architecture, asset, mobile, and runtime gates.
- \`docs/release-checklist.md\`: public build readiness checklist.
- \`docs/mobile-checklist.md\`: phone and touch validation checklist.
- \`docs/asset-credits-policy.md\`: asset sourcing and copyright rules.
- \`docs/feature-recipes/\`: common implementation recipes.
- \`docs/genre-blueprints/\`: first playable blueprints by genre.
- \`docs/decisions/\`: short architecture and product decisions.
- \`templates/modules/\`: reusable TypeScript starting points for common game systems.
- \`scripts/agent-audit.mjs\`: prints a machine-friendly project snapshot for agents.
- \`docs/game-creator-guide.md\`: how to turn an idea into the first playable.
- \`docs/first-playable-loop.md\`: what "first playable" means.
- \`docs/idea-to-architecture.md\`: idea-to-module hints.
`,
    },
  ];
}

export function agentDocs(options: ProjectOptions): GeneratedFile[] {
  const skillNames = getSkillNames(options);
  return [
    {
      path: 'AGENTS.md',
      content: `# Agent Instructions For ${options.title}

This repository is a Phaser mobile/desktop game project. Treat Phaser game development as the primary domain.

## First Read Order

1. \`START_HERE.md\`
2. \`AGENT_WORKFLOW.md\`
3. \`npm run agent:audit\` if dependencies are installed
4. \`docs/game-design-intake.md\`
5. \`docs/first-playable-contract.md\`
6. \`docs/validation-matrix.md\`
7. \`docs/quality-gates.md\`
8. \`docs/game-creator-guide.md\`
9. \`skills/README.md\`
10. \`skills/_meta/task-map.md\`
11. The specific \`skills/<skill-name>/SKILL.md\` for the task
12. Relevant source files under \`src/game/\`

## Core Rule

Follow \`AGENT_WORKFLOW.md\` before coding. Use the project-local skills before making architecture, scene, input, layout, UI, asset, gamefeel, or testing changes.

When starting a task, say which skill you are using:

\`\`\`text
Using phaser-scene-workflow because this changes scene lifecycle and transitions.
\`\`\`

## Skill Routing

- Architecture or folder boundaries: \`phaser-project-architect\`
- Boot/preload/menu/gameplay/UI scenes: \`phaser-scene-workflow\`
- Asset keys, loaders, manifests, atlases, audio: \`phaser-assets-pipeline\`
- Touch, pointer, keyboard, mouse, gamepad: \`phaser-input-mobile-desktop\`
- Mobile/desktop scaling, safe areas, orientation: \`phaser-responsive-layout\`
- Systems/entities/state/events/save: \`phaser-game-systems\`
- HUD, menu, dialogs, overlays: \`phaser-ui-hud\`
- Tweens, camera, particles, juice, audio feedback: \`phaser-gamefeel\`
- Spritesheets, texture atlases, frame animation, animation states: \`phaser-sprite-animation\`
- Tiled maps, tile layers, object layers, tile collisions: \`phaser-tilemaps-tiled\`
- Music, SFX, mute, mobile audio unlock, volume settings: \`phaser-audio-sfx\`
- Debug overlays, FPS, pools, low-end mobile performance: \`phaser-debug-performance\`
- Placeholder sprites, coded UI visuals, SVG/canvas art direction: \`phaser-programmatic-art\`
- Vite, Playwright, canvas smoke tests, Vitest: \`phaser-testing\`
- Updating or adding skills: \`phaser-skill-pack-maintainer\`
${options.includeYandexGames ? '- Yandex Games SDK, moderation, ads, localization, build ZIP: `yandex-publish`' : ''}
- Turning a new idea into the first playable: start with \`docs/game-creator-guide.md\`, then \`phaser-project-architect\`
- Vague idea intake: \`docs/game-design-intake.md\`
- First playable definition of done: \`docs/first-playable-contract.md\`
- Common feature implementation: \`docs/feature-recipes/\`
- Genre starting point: \`docs/genre-blueprints/\`
- Verification before final answer: \`docs/validation-matrix.md\`
- Quality gates before calling work done: \`docs/quality-gates.md\`
- Reusable module starting points: \`templates/modules/\`

## Project Boundaries

- Keep Phaser runtime code under \`src/game/\`.
- Keep pure game rules independent from Phaser when practical, so they can be unit-tested.
- Use pointer input as the cross-platform baseline.
- ${options.target === 'mobile' ? 'Prioritize touch ergonomics, safe areas, and phone viewport checks.' : 'Prioritize keyboard/mouse ergonomics, readable wide layouts, and desktop viewport checks.'}
- Add keyboard shortcuts for desktop ergonomics.
- Keep mobile layout readable and touch targets large enough.
- Do not add backend, multiplayer, React, Electron, Capacitor, or ECS unless the human explicitly asks.
${options.includeYandexGames ? '- Keep Yandex Games requirements in mind before any release build: no external CDN, SDK `/sdk.js`, LoadingAPI.ready, GameplayAPI pause/resume, localized text, and Python ZIP packaging.' : ''}

## Change Workflow

1. Follow \`AGENT_WORKFLOW.md\`.
2. Identify the task category.
3. Read the matching skill.
4. Check \`templates/modules/\` if the task needs a common system.
5. Inspect existing files before editing.
6. Make the smallest coherent change.
7. Run the most relevant verification:
   - \`npm run build\`
   - \`npm run dev\`
   - \`npm run agent:audit\`
   - \`npm run test:smoke\` if Playwright is enabled
8. Update \`docs/decisions/\` if architecture, scene flow, input strategy, scale mode, assets, publishing, or core rules changed.
9. Report what changed and what was verified.

## Skill Maintenance

Use \`skills/_meta/update-skills.md\` before editing skills. Skills should stay concise, task-triggered, and Phaser-specific.
`,
    },
    {
      path: 'CLAUDE.md',
      content: sharedAgentEntry('Claude Code', options, skillNames),
    },
    {
      path: 'GEMINI.md',
      content: sharedAgentEntry('Gemini CLI', options, skillNames),
    },
    {
      path: '.github/copilot-instructions.md',
      content: sharedAgentEntry('GitHub Copilot', options, skillNames),
    },
    {
      path: '.cursor/rules/phaser-game-creator.mdc',
      content: `---
description: Use project-local Phaser skills before changing this game.
globs:
  - "**/*"
alwaysApply: true
---

${sharedAgentEntry('Cursor', options, skillNames)}
`,
    },
    {
      path: '.ai/agent-entry.md',
      content: sharedAgentEntry('Any AI coding agent', options, skillNames),
    },
    {
      path: '.ai/skill-manifest.json',
      content: JSON.stringify(
        {
          projectType: 'phaser-mobile-desktop-game',
          generatedBy: 'Phaser Game Creator',
          primaryTarget: options.target,
          yandexGames: options.includeYandexGames,
          firstRead: [
            'AGENTS.md',
            'AGENT_WORKFLOW.md',
            'scripts/agent-audit.mjs',
            'docs/game-design-intake.md',
            'docs/first-playable-contract.md',
            'docs/validation-matrix.md',
            'docs/quality-gates.md',
            'docs/game-creator-guide.md',
            'docs/first-playable-loop.md',
            'skills/README.md',
            'skills/_meta/task-map.md',
            'skills/_meta/source-registry.md',
          ],
          agentOperatingLoop: 'AGENT_WORKFLOW.md',
          designIntake: 'docs/game-design-intake.md',
          firstPlayableContract: 'docs/first-playable-contract.md',
          validationMatrix: 'docs/validation-matrix.md',
          qualityGates: 'docs/quality-gates.md',
          featureRecipes: 'docs/feature-recipes/',
          genreBlueprints: 'docs/genre-blueprints/',
          moduleTemplates: 'templates/modules/',
          decisions: 'docs/decisions/',
          skills: skillNames.map((name) => ({
            name,
            path: `skills/${name}/SKILL.md`,
          })),
          routing: {
            architecture: 'phaser-project-architect',
            scenes: 'phaser-scene-workflow',
            assets: 'phaser-assets-pipeline',
            input: 'phaser-input-mobile-desktop',
            responsiveLayout: 'phaser-responsive-layout',
            systems: 'phaser-game-systems',
            ui: 'phaser-ui-hud',
            gamefeel: 'phaser-gamefeel',
            spriteAnimation: 'phaser-sprite-animation',
            tilemaps: 'phaser-tilemaps-tiled',
            audio: 'phaser-audio-sfx',
            debugPerformance: 'phaser-debug-performance',
            programmaticArt: 'phaser-programmatic-art',
            testing: 'phaser-testing',
            skillMaintenance: 'phaser-skill-pack-maintainer',
            ...(options.includeYandexGames ? { yandexPublishing: 'yandex-publish' } : {}),
          },
        },
        null,
        2,
      ),
    },
    {
      path: 'skills/README.md',
      content: `# Project Skills

These skills are local operating instructions for AI agents working on this Phaser game.

Agents should not treat these as passive docs. Pick a skill before changing code.

## Core Skills

${skillNames.map((name) => `- \`${name}\`: see \`skills/${name}/SKILL.md\``).join('\n')}

## How To Use

1. Read \`skills/_meta/task-map.md\`.
2. Open the matching \`SKILL.md\`.
3. Follow its workflow.
4. If a skill is missing or stale, use \`phaser-skill-pack-maintainer\`.

## Human Shortcut

Ask your agent:

\`\`\`text
Read AGENTS.md and skills/README.md. Then tell me which skill you would use for the next task.
\`\`\`
`,
    },
    {
      path: 'skills/_meta/task-map.md',
      content: `# Task Map

Use this map to choose the correct skill.

| Task | Skill |
| --- | --- |
| Plan project architecture, folders, boundaries | \`phaser-project-architect\` |
| Add or refactor scenes | \`phaser-scene-workflow\` |
| Load images, spritesheets, atlases, audio, fonts, tilemaps | \`phaser-assets-pipeline\` |
| Add touch, mouse, keyboard, pointer, gamepad controls | \`phaser-input-mobile-desktop\` |
| Fix mobile/desktop canvas size, safe area, orientation | \`phaser-responsive-layout\` |
| Add gameplay systems, entities, state, save, events | \`phaser-game-systems\` |
| Build HUD, menus, dialogs, overlays | \`phaser-ui-hud\` |
| Improve feel with tweens, camera, particles, audio feedback | \`phaser-gamefeel\` |
| Load, slice, animate, or debug spritesheets and texture atlases | \`phaser-sprite-animation\` |
| Build tile-based worlds, Tiled maps, collision layers, object spawns | \`phaser-tilemaps-tiled\` |
| Add music, SFX, mute/volume, mobile audio unlock | \`phaser-audio-sfx\` |
| Add debug overlays, FPS checks, object pools, mobile performance fixes | \`phaser-debug-performance\` |
| Create placeholder art, coded UI visuals, SVG/canvas effects without stock assets | \`phaser-programmatic-art\` |
| Add tests, smoke checks, build validation | \`phaser-testing\` |
| Update, add, or validate skills | \`phaser-skill-pack-maintainer\` |
${options.includeYandexGames ? '| Publish to Yandex Games, SDK, moderation, submission ZIP | `yandex-publish` |\n' : ''}

If multiple skills apply, start with architecture, then scene/input/layout, then implementation details.
`,
    },
    {
      path: 'skills/_meta/update-skills.md',
      content: `# Updating Skills

Skills are part of the repo's agent operating system. Keep them small, current, and Phaser-specific.

## Update Rules

- Keep \`SKILL.md\` concise.
- Put detailed notes in \`references/\` when a skill grows too large.
- Write descriptions so agents know exactly when to trigger the skill.
- Do not add generic web-app guidance unless it directly supports the Phaser game.
- Add examples only when they prevent repeated mistakes.

## Suggested Upstream Checks

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Anthropic skill creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Agent Skills spec: https://agentskills.io/specification.md

## Skill Edit Checklist

1. Does the skill still describe a Phaser game task?
2. Is the frontmatter description trigger-focused?
3. Are instructions actionable for a coding agent?
4. Did you update \`skills/README.md\` or \`skills/_meta/task-map.md\` if routing changed?
5. Can a new agent understand what to do without conversation history?
`,
    },
    {
      path: 'skills/_meta/source-registry.md',
      content: `# Source Registry For Agents

Use these sources when a task needs current Phaser or Agent Skills knowledge.

## Primary Sources

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Phaser docs: https://docs.phaser.io/
- Phaser examples: https://github.com/phaserjs/examples
- Phaser Vite TypeScript template: https://github.com/phaserjs/template-vite-ts
- Agent Skills spec: https://agentskills.io/specification.md
- Anthropic skill creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
${options.includeYandexGames ? '- Yandex Games SDK docs: https://yandex.com/dev/games/doc/en/sdk/sdk-about\n- Yandex Games requirements: https://yandex.ru/dev/games/doc/ru/concepts/requirements' : ''}

## Update Policy

- Use official Phaser sources first for Phaser APIs.
- Use project-local skills first for repository workflow.
- When official sources disagree with local skills, update the local skill and explain why.
- Keep this project focused on Phaser mobile/desktop games.
- Do not introduce unrelated framework guidance into core skills.

## Version Notes

This generated project starts with Phaser 3 because the Phaser 3 ecosystem has broad examples and plugin support. If upgrading to Phaser 4, use the official Phaser migration skills/docs before changing APIs.
`,
    },
    {
      path: 'skills/_meta/agent-prompts.md',
      content: `# Agent Prompts

Use these prompts when opening this repo in Codex, Claude, Gemini, or another coding agent.

## First Session

\`\`\`text
Read START_HERE.md, AGENTS.md, AGENT_WORKFLOW.md, docs/game-design-intake.md, docs/first-playable-contract.md, docs/validation-matrix.md, skills/README.md, and skills/_meta/task-map.md. Then explain how this Phaser project is organized and which workflow you will follow.
\`\`\`

## Audit This Repo

\`\`\`text
Run npm run agent:audit, then summarize the available skills, scenes, recipes, blueprints, module templates, and validation commands.
\`\`\`

## Build First Playable

\`\`\`text
Use AGENT_WORKFLOW.md, docs/game-design-intake.md, docs/first-playable-contract.md, phaser-project-architect, phaser-scene-workflow, phaser-input-mobile-desktop, and phaser-responsive-layout. Propose and implement the smallest playable loop for this game.
\`\`\`

## From One Sentence

\`\`\`text
Use AGENT_WORKFLOW.md. My game idea is: [one sentence]. Infer missing details, propose 3 tiny first playable loops, recommend the smallest, then implement it.
\`\`\`

## Use A Genre Blueprint

\`\`\`text
Use docs/genre-blueprints/ and the matching Phaser skills. Turn this genre into the smallest first playable: [genre or reference].
\`\`\`

## Improve Mobile/Desktop Feel

\`\`\`text
Use phaser-input-mobile-desktop, phaser-responsive-layout, and phaser-gamefeel. Improve the controls and feedback for both phone and desktop.
\`\`\`

## Add Assets

\`\`\`text
Use phaser-assets-pipeline. Add the requested assets through the manifest and update preload usage without scattering asset keys.
\`\`\`

## Update Skills

\`\`\`text
Use phaser-skill-pack-maintainer. Check skills/_meta/source-registry.md and update the local skill pack while keeping it Phaser mobile/desktop focused.
\`\`\`
`,
    },
  ];
}

function sharedAgentEntry(agentName: string, options: ProjectOptions, skillNames: string[]): string {
  return `# ${agentName} Instructions

This repository is a generated Phaser mobile/desktop game project. It includes a local skill pack. Use those skills before changing code.

## Immediate Startup

When opening this repository, assume these files are relevant even if the user did not mention them:

1. \`AGENTS.md\`
2. \`AGENT_WORKFLOW.md\`
3. \`scripts/agent-audit.mjs\`
4. \`docs/game-design-intake.md\`
5. \`docs/first-playable-contract.md\`
6. \`docs/validation-matrix.md\`
7. \`docs/quality-gates.md\`
8. \`skills/README.md\`
9. \`skills/_meta/task-map.md\`
10. \`templates/modules/\`
11. \`.ai/skill-manifest.json\`

## Project Facts

- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${options.target === 'mobile' ? 'mobile-first browser game' : 'desktop-first browser game'}
- Yandex Games pack: ${options.includeYandexGames ? 'enabled' : 'disabled'}

## Skill Rule

Before architecture, scene, input, layout, assets, UI, gamefeel, testing, publishing, or skill-maintenance work:

1. Follow \`AGENT_WORKFLOW.md\`.
2. Run \`npm run agent:audit\` when available.
3. Choose the matching skill from \`skills/_meta/task-map.md\`.
4. Read \`skills/<skill-name>/SKILL.md\`.
5. Check \`templates/modules/\` before writing common systems from scratch.
6. State which skill you are using.
7. Follow that skill's workflow.

## Available Skills

${skillNames.map((name) => `- \`${name}\` at \`skills/${name}/SKILL.md\``).join('\n')}

## Default Routing

- Architecture: \`phaser-project-architect\`
- Scenes: \`phaser-scene-workflow\`
- Assets: \`phaser-assets-pipeline\`
- Input: \`phaser-input-mobile-desktop\`
- Responsive layout: \`phaser-responsive-layout\`
- Systems/state/save/events: \`phaser-game-systems\`
- HUD/menus/overlays: \`phaser-ui-hud\`
- Game feel: \`phaser-gamefeel\`
- Spritesheets/atlases/animation states: \`phaser-sprite-animation\`
- Tilemaps/Tiled worlds: \`phaser-tilemaps-tiled\`
- Audio/music/SFX: \`phaser-audio-sfx\`
- Debug overlays/performance: \`phaser-debug-performance\`
- Programmatic placeholder art and coded visuals: \`phaser-programmatic-art\`
- Tests/build validation: \`phaser-testing\`
- Skills/docs updates: \`phaser-skill-pack-maintainer\`
${options.includeYandexGames ? '- Yandex Games publishing: `yandex-publish`' : ''}

Keep the project Phaser-focused. Do not add unrelated frameworks, backend services, wrappers, or publishing SDKs unless the user asks.
`;
}

