import type { GeneratedFile, ProjectOptions } from './types';

const coreSkillNames = [
  'phaser-project-architect',
  'phaser-scene-workflow',
  'phaser-assets-pipeline',
  'phaser-input-mobile-desktop',
  'phaser-responsive-layout',
  'phaser-game-systems',
  'phaser-ui-hud',
  'phaser-gamefeel',
  'phaser-sprite-animation',
  'phaser-tilemaps-tiled',
  'phaser-audio-sfx',
  'phaser-debug-performance',
  'phaser-programmatic-art',
  'phaser-testing',
  'phaser-skill-pack-maintainer',
];

function getSkillNames(options: ProjectOptions): string[] {
  return options.includeYandexGames ? [...coreSkillNames, 'yandex-publish'] : coreSkillNames;
}

export function getProjectFiles(options: ProjectOptions): GeneratedFile[] {
  return [
    ...rootDocs(options),
    ...creatorGuideDocs(options),
    ...agentDocs(options),
    ...projectConfig(options),
    ...phaserSource(options),
    ...skillPack(options),
  ];
}

function creatorGuideDocs(options: ProjectOptions): GeneratedFile[] {
  return [
    {
      path: 'AGENT_WORKFLOW.md',
      content: `# Agent Operating Workflow

This is the main operating loop for any AI agent working in this repository.

Do not start by coding. Start by turning the user's idea into the smallest verified Phaser game loop.

## Required Loop

1. Read \`AGENTS.md\`, this file, \`skills/README.md\`, and \`skills/_meta/task-map.md\`.
2. Use \`docs/game-design-intake.md\` to extract or infer the game idea.
3. Use \`docs/first-playable-contract.md\` to define the first playable.
4. Choose the relevant skills from \`skills/_meta/task-map.md\`.
5. Inspect the current scenes, systems, input, assets, and tests.
6. Implement the smallest coherent change.
7. Validate against \`docs/validation-matrix.md\`.
8. Update docs, recipes, or decisions if the project shape changed.
9. Report what changed, which skills were used, and what was verified.

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
3. Add only the minimum architecture needed.
4. Keep the feature playable and testable before polishing it.

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

function rootDocs(options: ProjectOptions): GeneratedFile[] {
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
npm run dev
\`\`\`

4. Open the local URL printed by Vite.

If you are an AI coding agent:

1. Read \`AGENTS.md\` first.
2. Read \`AGENT_WORKFLOW.md\`.
3. Read \`docs/game-design-intake.md\`, \`docs/first-playable-contract.md\`, and \`docs/validation-matrix.md\`.
4. Read \`skills/README.md\`.
5. Pick the right skill from \`skills/_meta/task-map.md\`.
6. Before changing code, explain which skill you are using and why.
7. Keep this repo Phaser-focused. Do not convert it into a generic web app.

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
- \`docs/feature-recipes/\`: common implementation recipes.
- \`docs/genre-blueprints/\`: first playable blueprints by genre.
- \`docs/decisions/\`: short architecture and product decisions.
- \`docs/game-creator-guide.md\`: how to turn an idea into the first playable.
- \`docs/first-playable-loop.md\`: what "first playable" means.
- \`docs/idea-to-architecture.md\`: idea-to-module hints.
`,
    },
  ];
}

function agentDocs(options: ProjectOptions): GeneratedFile[] {
  const skillNames = getSkillNames(options);
  return [
    {
      path: 'AGENTS.md',
      content: `# Agent Instructions For ${options.title}

This repository is a Phaser mobile/desktop game project. Treat Phaser game development as the primary domain.

## First Read Order

1. \`START_HERE.md\`
2. \`AGENT_WORKFLOW.md\`
3. \`docs/game-design-intake.md\`
4. \`docs/first-playable-contract.md\`
5. \`docs/validation-matrix.md\`
6. \`docs/game-creator-guide.md\`
7. \`skills/README.md\`
8. \`skills/_meta/task-map.md\`
9. The specific \`skills/<skill-name>/SKILL.md\` for the task
10. Relevant source files under \`src/game/\`

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
4. Inspect existing files before editing.
5. Make the smallest coherent change.
6. Run the most relevant verification:
   - \`npm run build\`
   - \`npm run dev\`
   - \`npm run test:smoke\` if Playwright is enabled
7. Update \`docs/decisions/\` if architecture, scene flow, input strategy, scale mode, assets, publishing, or core rules changed.
8. Report what changed and what was verified.

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
            'docs/game-design-intake.md',
            'docs/first-playable-contract.md',
            'docs/validation-matrix.md',
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
          featureRecipes: 'docs/feature-recipes/',
          genreBlueprints: 'docs/genre-blueprints/',
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
3. \`docs/game-design-intake.md\`
4. \`docs/first-playable-contract.md\`
5. \`docs/validation-matrix.md\`
6. \`skills/README.md\`
7. \`skills/_meta/task-map.md\`
8. \`.ai/skill-manifest.json\`

## Project Facts

- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${options.target === 'mobile' ? 'mobile-first browser game' : 'desktop-first browser game'}
- Yandex Games pack: ${options.includeYandexGames ? 'enabled' : 'disabled'}

## Skill Rule

Before architecture, scene, input, layout, assets, UI, gamefeel, testing, publishing, or skill-maintenance work:

1. Follow \`AGENT_WORKFLOW.md\`.
2. Choose the matching skill from \`skills/_meta/task-map.md\`.
3. Read \`skills/<skill-name>/SKILL.md\`.
4. State which skill you are using.
5. Follow that skill's workflow.

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

function projectConfig(options: ProjectOptions): GeneratedFile[] {
  const scripts: Record<string, string> = {
    dev: 'vite --host 0.0.0.0',
    build: 'tsc && vite build',
    preview: 'vite preview --host 0.0.0.0',
  };

  const devDependencies: Record<string, string> = {
    typescript: '^5.7.3',
    vite: '^6.3.5',
  };

  if (options.includePlaywright) {
    scripts['test:smoke'] = 'playwright test';
    devDependencies['@playwright/test'] = '^1.52.0';
  }

  if (options.includeYandexGames) {
    scripts['build:yandex'] = 'npm run build && python scripts/make-yandex-zip.py';
    scripts['validate:yandex'] = 'npm run build && python scripts/validate-yandex-build.py';
  }

  return [
    {
      path: 'package.json',
      content: JSON.stringify(
        {
          name: options.slug,
          version: '0.1.0',
          private: true,
          type: 'module',
          scripts,
          dependencies: {
            phaser: '^3.90.0',
          },
          devDependencies,
        },
        null,
        2,
      ),
    },
    {
      path: 'index.html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${options.title}</title>
    ${options.includeYandexGames ? '<script src="/sdk.js"></script>' : ''}
    ${options.includePwa ? '<link rel="manifest" href="/manifest.webmanifest" />' : ''}
  </head>
  <body>
    <div id="game-root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    },
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
`,
    },
    {
      path: 'vite.config.ts',
      content: `import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  ${options.includeYandexGames ? "esbuild: {\n    drop: ['console', 'debugger'],\n  }," : ''}
});
`,
    },
    {
      path: 'src/style.css',
      content: `html,
body,
#game-root {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #10131a;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  touch-action: none;
}

canvas {
  display: block;
}

${options.includeYandexGames ? `* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
}

html,
body,
#game-root {
  position: fixed;
  overscroll-behavior: none;
}
` : ''}
`,
    },
    ...(options.includePlaywright
      ? [
          {
            path: 'playwright.config.ts',
            content: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev -- --port 4177',
    url: 'http://127.0.0.1:4177',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
`,
          },
          {
            path: 'tests/smoke.spec.ts',
            content: `import { expect, test } from '@playwright/test';

test('game canvas renders', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  const size = await canvas.evaluate((node) => ({
    width: (node as HTMLCanvasElement).width,
    height: (node as HTMLCanvasElement).height,
  }));
  expect(size.width).toBeGreaterThan(0);
  expect(size.height).toBeGreaterThan(0);
  await page.waitForTimeout(500);
});
`,
          },
        ]
      : []),
    ...(options.includeYandexGames
      ? [
          {
            path: 'scripts/make-yandex-zip.py',
            content: `import os
import zipfile

dist_dir = "dist"
output_zip = "yandex-game.zip"

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, _dirs, files in os.walk(dist_dir):
        for file in files:
            abs_path = os.path.join(root, file)
            rel_path = os.path.relpath(abs_path, dist_dir).replace(os.sep, "/")
            zf.write(abs_path, rel_path)

print(f"Created {output_zip}")
`,
          },
          {
            path: 'scripts/validate-yandex-build.py',
            content: `from pathlib import Path

dist = Path("dist")
html = dist / "index.html"
text = html.read_text(encoding="utf-8") if html.exists() else ""

checks = [
    ("index.html exists", html.exists()),
    ("SDK path /sdk.js present", 'src="/sdk.js"' in text),
    ("No CDN references", not any(x in text for x in ["googleapis", "cdnjs", "unpkg", "jsdelivr"])),
    ("No 100vh in index", "100vh" not in text),
]

failed = False
for label, ok in checks:
    print(("[PASS] " if ok else "[FAIL] ") + label)
    failed = failed or not ok

if failed:
    raise SystemExit(1)
`,
          },
          {
            path: 'docs/yandex-games.md',
            content: `# Yandex Games Publishing Notes

This project was generated with the optional Yandex Games pack.

## Commands

\`\`\`bash
npm run validate:yandex
npm run build:yandex
\`\`\`

## Blocking Rules

- Load the SDK with \`<script src="/sdk.js"></script>\`.
- Vite may warn that \`/sdk.js\` cannot be bundled because it is not \`type="module"\`; this is expected for the Yandex synchronous SDK script.
- Call \`LoadingAPI.ready()\` only after SDK init and Phaser boot are both done.
- Call \`GameplayAPI.start()\` when gameplay starts and \`GameplayAPI.stop()\` when gameplay pauses or ends.
- Handle \`game_api_pause\` and \`game_api_resume\`.
- Do not use external CDN links or remote fonts.
- Strip \`console\` and \`debugger\` from production builds.
- Use Python to create the ZIP on Windows so archive paths use forward slashes.
- Keep all visible text localized before submission.
`,
          },
        ]
      : []),
    ...(options.includePwa
      ? [
          {
            path: 'public/manifest.webmanifest',
            content: JSON.stringify(
              {
                name: options.title,
                short_name: options.title.slice(0, 12),
                start_url: '/',
                display: 'fullscreen',
                background_color: '#10131a',
                theme_color: '#10131a',
                orientation: 'any',
                icons: [],
              },
              null,
              2,
            ),
          },
          {
            path: 'docs/pwa-notes.md',
            content: `# PWA Notes

This project includes a starter \`public/manifest.webmanifest\`.

Before shipping:

- Add real icons.
- Decide whether offline caching is needed.
- Test install behavior on mobile and desktop.
- Keep orientation flexible unless the game design requires portrait or landscape.
`,
          },
        ]
      : []),
  ];
}

function phaserSource(options: ProjectOptions): GeneratedFile[] {
  return [
    {
      path: 'src/main.ts',
      content: `import Phaser from 'phaser';
import './style.css';
import { gameConfig } from './game/config/gameConfig';
${options.includeYandexGames ? "import { initYandexGames, registerPhaserGame } from './game/platform/yandexGames';" : ''}

${options.includeYandexGames ? 'void initYandexGames();\nconst game = new Phaser.Game(gameConfig);\nregisterPhaserGame(game);' : 'new Phaser.Game(gameConfig);'}
`,
    },
    ...(options.includeYandexGames
      ? [
          {
            path: 'src/game/platform/yandexGames.ts',
            content: `import Phaser from 'phaser';

type YandexSDK = {
  features?: {
    LoadingAPI?: { ready(): void };
    GameplayAPI?: { start(): void; stop(): void };
  };
  environment?: { i18n?: { lang?: string } };
  on?(event: string, callback: () => void): void;
};

declare global {
  interface Window {
    YaGames?: { init(): Promise<YandexSDK> };
    ysdk?: YandexSDK;
    __sdkDone?: boolean;
    __bootDone?: boolean;
    __phaserGame?: Phaser.Game;
    __trySignalReady?: () => void;
  }
}

window.__sdkDone = false;
window.__bootDone = false;

export function registerPhaserGame(game: Phaser.Game): void {
  window.__phaserGame = game;
}

export function signalPhaserBootReady(): void {
  window.__bootDone = true;
  window.__trySignalReady?.();
}

export function gameplayStart(): void {
  window.ysdk?.features?.GameplayAPI?.start();
}

export function gameplayStop(): void {
  window.ysdk?.features?.GameplayAPI?.stop();
}

export async function initYandexGames(): Promise<void> {
  window.__trySignalReady = () => {
    if (window.__sdkDone && window.__bootDone) {
      window.ysdk?.features?.LoadingAPI?.ready();
    }
  };

  window.setTimeout(() => {
    if (!window.__sdkDone) {
      window.__sdkDone = true;
      window.__trySignalReady?.();
    }
  }, 5000);

  try {
    if (window.YaGames) {
      const ysdk = await window.YaGames.init();
      window.ysdk = ysdk;
      void ysdk.environment?.i18n?.lang;

      ysdk.on?.('game_api_pause', () => {
        window.__phaserGame?.loop.sleep();
        gameplayStop();
      });

      ysdk.on?.('game_api_resume', () => {
        window.__phaserGame?.loop.wake();
        gameplayStart();
      });
    }
  } catch {
    // Local dev or SDK unavailable. Continue without blocking the game.
  } finally {
    window.__sdkDone = true;
    window.__trySignalReady?.();
  }
}
`,
          },
        ]
      : []),
    {
      path: 'src/game/config/gameConfig.ts',
      content: `import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { TemplateGuideScene } from '../scenes/TemplateGuideScene';
import { GameScene } from '../scenes/GameScene';
import { UIScene } from '../scenes/UIScene';
import { SceneKeys } from './sceneKeys';

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  backgroundColor: '#10131a',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  ${options.includeArcadePhysics ? "physics: {\n    default: 'arcade',\n    arcade: { debug: false },\n  }," : ''}
  scene: [BootScene, PreloadScene, TemplateGuideScene, GameScene, UIScene],
};
`,
    },
    {
      path: 'src/game/config/sceneKeys.ts',
      content: `export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  TemplateGuide: 'TemplateGuideScene',
  Game: 'GameScene',
  UI: 'UIScene',
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
`,
    },
    {
      path: 'src/game/config/gameEvents.ts',
      content: `export const GameEvents = {
  ScoreChanged: 'score-changed',
  BestScoreChanged: 'best-score-changed',
  GameplayStarted: 'gameplay-started',
  GameplayStopped: 'gameplay-stopped',
} as const;

export type GameEvent = (typeof GameEvents)[keyof typeof GameEvents];
`,
    },
    {
      path: 'src/game/assets/assetManifest.ts',
      content: `import Phaser from 'phaser';

export const AssetKeys = {
  // Add stable asset keys here.
} as const;

export type ImageAsset = {
  key: string;
  url: string;
};

export const imageAssets: ImageAsset[] = [];

export function loadImageManifest(scene: Phaser.Scene): void {
  for (const asset of imageAssets) {
    scene.load.image(asset.key, asset.url);
  }
}
`,
    },
    {
      path: 'src/game/scenes/BootScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
${options.includeYandexGames ? "import { signalPhaserBootReady } from '../platform/yandexGames';" : ''}

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  create(): void {
    ${options.includeYandexGames ? 'signalPhaserBootReady();' : ''}
    this.scene.start(SceneKeys.Preload);
  }
}
`,
    },
    {
      path: 'src/game/scenes/PreloadScene.ts',
      content: `import Phaser from 'phaser';
import { loadImageManifest } from '../assets/assetManifest';
import { SceneKeys } from '../config/sceneKeys';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preload);
  }

  preload(): void {
    loadImageManifest(this);
  }

  create(): void {
    this.scene.start(SceneKeys.Game);
  }
}
`,
    },
    {
      path: 'src/game/scenes/TemplateGuideScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';

const ideaPrompts = [
  'Make a one-button arcade game about dodging falling stars.',
  'Make a cozy card collection game with satisfying pack openings.',
  'Make a top-down arena game where the player survives for 60 seconds.',
  'Make a puzzle game about connecting energy nodes on a grid.',
  'Make an idle clicker where tiny machines build a strange factory.',
  'Make a tilemap adventure with one room, one key, and one locked door.',
];

export class TemplateGuideScene extends Phaser.Scene {
  private currentPrompt = 0;
  private promptText!: Phaser.GameObjects.Text;
  private spinHint!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.TemplateGuide);
  }

  create(): void {
    const { width, height } = this.scale;
    createTitleText(this, width / 2, height * 0.16, '${options.title}');

    this.add
      .text(width / 2, height * 0.27, 'Pick a prompt, open this repo with an agent, and build the first playable loop.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: '#b9c7e6',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add.rectangle(width / 2, height * 0.5, width * 0.72, height * 0.26, 0x151b26, 0.96);
    this.add.rectangle(width / 2, height * 0.5, width * 0.72, height * 0.26).setStrokeStyle(2, 0x33435f);

    this.promptText = this.add
      .text(width / 2, height * 0.47, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Arial, sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: width * 0.6 },
      })
      .setOrigin(0.5);

    this.spinHint = this.add
      .text(width / 2, height * 0.62, 'Click / tap / Space to spin ideas', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#7ee7c8',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.spinHint,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      duration: 850,
    });

    this.add
      .text(width / 2, height * 0.78, 'Press Enter to open the sandbox scene', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7d8aa5',
      })
      .setOrigin(0.5);

    this.input.on('pointerdown', () => this.spinPrompt());
    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());
    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start(SceneKeys.Game));
  }

  private spinPrompt(): void {
    this.currentPrompt = (this.currentPrompt + 1) % ideaPrompts.length;
    this.promptText.setText(ideaPrompts[this.currentPrompt]);

    this.tweens.add({
      targets: this.promptText,
      scale: { from: 0.96, to: 1 },
      alpha: { from: 0.55, to: 1 },
      duration: 160,
      ease: 'Sine.easeOut',
    });
  }
}
`,
    },
    {
      path: 'src/game/scenes/GameScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';
${options.includeYandexGames ? "import { gameplayStart, gameplayStop } from '../platform/yandexGames';" : ''}

const ideaPrompts = [
  'Make a one-button arcade game about dodging falling stars.',
  'Make a cozy card collection game with satisfying pack openings.',
  'Make a top-down arena game where the player survives for 60 seconds.',
  'Make a puzzle game about connecting energy nodes on a grid.',
  'Make an idle clicker where tiny machines build a strange factory.',
  'Make a tilemap adventure with one room, one key, and one locked door.',
];

export class GameScene extends Phaser.Scene {
  private currentPrompt = 0;
  private promptText!: Phaser.GameObjects.Text;
  private promptCard!: Phaser.GameObjects.Rectangle;

  constructor() {
    super(SceneKeys.Game);
  }

  create(): void {
    const { width, height } = this.scale;

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());

    this.drawBackground(width, height);

    this.add
      .text(72, 64, 'Phaser Game Creator', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7ee7c8',
      })
      .setOrigin(0, 0.5);

    createTitleText(this, 72, height * 0.24, '${options.title}').setOrigin(0, 0.5);

    this.add
      .text(74, height * 0.34, 'Agent workflow baked in: idea intake, first playable contract, skills, recipes, blueprints, validation.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: '#b8c6e6',
        wordWrap: { width: width * 0.42 },
      })
      .setOrigin(0, 0.5);

    const steps = [
      'Idea -> intake -> 3 loop options',
      'Contract -> build the smallest playable',
      'Validate -> replace sandbox with gameplay',
    ];

    const stepY = height * 0.48;
    steps.forEach((step, index) => {
      const y = stepY + index * 52;
      this.add.circle(84, y, 15, 0x26334a);
      this.add.text(84, y, String(index + 1), {
        fontFamily: 'Arial, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
      }).setOrigin(0.5);

      this.add.text(116, y, step, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#e4ebf8',
      }).setOrigin(0, 0.5);
    });

    const cardX = width * 0.69;
    const cardY = height * 0.43;
    const cardW = width * 0.42;
    const cardH = height * 0.48;
    this.promptCard = this.add.rectangle(cardX, cardY, cardW, cardH, 0x151b26, 0.97);
    this.promptCard.setStrokeStyle(2, 0x33435f);

    this.add
      .text(cardX - cardW / 2 + 34, cardY - cardH / 2 + 34, 'Prompt wheel', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7ee7c8',
      })
      .setOrigin(0, 0.5);

    this.promptText = this.add
      .text(cardX, cardY - 6, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Arial, sans-serif',
        fontSize: '30px',
        color: '#ffffff',
        align: 'left',
        wordWrap: { width: cardW - 72 },
      })
      .setOrigin(0.5);

    const spinHint = this.add
      .text(cardX, cardY + cardH / 2 - 46, 'Click / tap / Space to spin prompt ideas', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#7ee7c8',
      })
      .setOrigin(0.5);

    this.add
      .text(74, height - 62, 'Agent brain: AGENT_WORKFLOW.md  /  skills  /  recipes  /  blueprints  /  validation matrix', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '17px',
        color: '#7d8aa5',
      })
      .setOrigin(0, 0.5);

    this.tweens.add({
      targets: spinHint,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      duration: 850,
    });

    this.input.on('pointerdown', () => this.spinPrompt());
    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());

    ${options.includeYandexGames ? 'gameplayStart();' : ''}
  }

  shutdown(): void {
    ${options.includeYandexGames ? 'gameplayStop();' : ''}
  }

  update(): void {}

  private drawBackground(width: number, height: number): void {
    this.add.rectangle(width / 2, height / 2, width, height, 0x10131a);

    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x1a2231, 0.55);

    for (let x = 0; x <= width; x += 64) {
      graphics.lineBetween(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += 64) {
      graphics.lineBetween(0, y, width, y);
    }

    graphics.lineStyle(2, 0x26334a, 0.8);
    graphics.lineBetween(width * 0.53, 72, width * 0.53, height - 72);
  }

  private spinPrompt(): void {
    this.currentPrompt = (this.currentPrompt + 1) % ideaPrompts.length;
    this.promptText.setText(ideaPrompts[this.currentPrompt]);

    this.tweens.add({
      targets: this.promptText,
      scale: { from: 0.96, to: 1 },
      alpha: { from: 0.55, to: 1 },
      duration: 160,
      ease: 'Sine.easeOut',
    });
  }
}
`,
    },
    {
      path: 'src/game/scenes/UIScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';

type UIData = {
  title: string;
  status: string;
};

export class UIScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.UI);
  }

  create(data: UIData): void {
    this.add
      .text(24, 20, data.title, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#ffffff',
      })
      .setScrollFactor(0);

    this.add
      .text(24, 50, data.status, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#9fb2d8',
      })
      .setScrollFactor(0);
  }
}
`,
    },
    {
      path: 'src/game/input/PlayerInput.ts',
      content: `import Phaser from 'phaser';

export class PlayerInput {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private wasd: Record<string, Phaser.Input.Keyboard.Key> | undefined;
  private pointerTarget = new Phaser.Math.Vector2(0, 0);
  private pointerActive = false;

  constructor(private readonly scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard?.createCursorKeys();
    this.wasd = scene.input.keyboard?.addKeys('W,A,S,D') as
      | Record<string, Phaser.Input.Keyboard.Key>
      | undefined;

    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.pointerActive = true;
      this.pointerTarget.set(pointer.x, pointer.y);
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown) {
        this.pointerActive = true;
        this.pointerTarget.set(pointer.x, pointer.y);
      }
    });

    scene.input.on('pointerup', () => {
      this.pointerActive = false;
    });
  }

  getMovementVector(): Phaser.Math.Vector2 {
    const vector = new Phaser.Math.Vector2(0, 0);

    if (this.cursors?.left.isDown || this.wasd?.A.isDown) vector.x -= 1;
    if (this.cursors?.right.isDown || this.wasd?.D.isDown) vector.x += 1;
    if (this.cursors?.up.isDown || this.wasd?.W.isDown) vector.y -= 1;
    if (this.cursors?.down.isDown || this.wasd?.S.isDown) vector.y += 1;

    if (vector.lengthSq() > 0) {
      return vector.normalize();
    }

    if (!this.pointerActive) {
      return vector;
    }

    const camera = this.scene.cameras.main;
    const center = new Phaser.Math.Vector2(camera.centerX, camera.centerY);
    return this.pointerTarget.clone().subtract(center).normalize();
  }
}
`,
    },
    {
      path: 'src/game/save/SaveSystem.ts',
      content: `export type SaveData = {
  version: number;
  bestScore: number;
};

const defaultSave: SaveData = {
  version: 1,
  bestScore: 0,
};

export class SaveSystem {
  constructor(private readonly namespace: string) {}

  load(): SaveData {
    const raw = localStorage.getItem(this.key);
    if (!raw) return defaultSave;

    try {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      return { ...defaultSave, ...parsed, version: defaultSave.version };
    } catch {
      return defaultSave;
    }
  }

  save(data: SaveData): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  private get key(): string {
    return \`\${this.namespace}:save\`;
  }
}
`,
    },
    {
      path: 'src/game/ui/textStyles.ts',
      content: `import Phaser from 'phaser';

export function createTitleText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
): Phaser.GameObjects.Text {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '56px',
      color: '#ffffff',
      stroke: '#273043',
      strokeThickness: 8,
    })
    .setOrigin(0.5);
}
`,
    },
    {
      path: 'src/game/systems/.gitkeep',
      content: '',
    },
    {
      path: 'src/game/entities/.gitkeep',
      content: '',
    },
    {
      path: 'src/game/state/.gitkeep',
      content: '',
    },
    {
      path: 'src/game/utils/.gitkeep',
      content: '',
    },
    {
      path: 'public/assets/.gitkeep',
      content: '',
    },
    ...(options.includeTilemaps
      ? [
          {
            path: 'public/assets/tilemaps/.gitkeep',
            content: '',
          },
          {
            path: 'public/assets/tilesets/.gitkeep',
            content: '',
          },
          {
            path: 'src/game/tilemaps/tilemapPipeline.md',
            content: `# Tilemap Pipeline

Use this folder when the game needs Tiled/Phaser tilemaps.

Suggested convention:

- Export maps to \`public/assets/tilemaps/\`.
- Store tilesets under \`public/assets/tilesets/\`.
- Load maps from \`PreloadScene\`.
- Keep layer names stable: \`ground\`, \`collision\`, \`objects\`.
- Document collision/object layer rules near the map data.

When changing tilemaps, use the \`phaser-assets-pipeline\` and \`phaser-responsive-layout\` skills.
`,
          },
        ]
      : []),
  ];
}

function skillPack(options: ProjectOptions): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push(
    skill('phaser-project-architect', 'Use when planning or changing the architecture of a Phaser mobile/desktop game project: folders, scene boundaries, systems, entities, state, assets, save, UI, testing, optional modules, or Phaser version strategy.', `# Phaser Project Architect

## Workflow

1. Confirm the game remains Phaser-first and mobile/desktop browser-targeted.
2. Read \`references/folder-architecture.md\` before adding new top-level folders.
3. Read \`references/scene-system-boundaries.md\` before moving behavior between scenes, systems, entities, state, or save.
4. Read \`references/phaser-version-strategy.md\` before changing Phaser version or using Phaser 4-only APIs.
5. Read \`references/module-selection.md\` before adding ECS, rexUI, editor compatibility, publishing packs, wrappers, or plugins.
6. Keep scenes thin when possible; put reusable behavior in systems, entities, input, state, save, or UI helpers.
7. Update \`AGENTS.md\`, \`.ai/skill-manifest.json\`, or \`skills/_meta/task-map.md\` if architecture routing changes.

## Default Boundaries

- \`scenes/\`: Phaser lifecycle, scene transitions, orchestration.
- \`systems/\`: gameplay rules that are not tied to one display object.
- \`entities/\`: factories/classes for player, enemies, items, projectiles.
- \`input/\`: touch, pointer, keyboard, mouse, gamepad abstraction.
- \`ui/\`: HUD, menus, dialogs, reusable display helpers.
- \`state/\`: runtime data and cross-scene state.
- \`save/\`: local persistence and migrations.
- \`assets/\`: manifests, asset keys, loader helpers.
`),
    reference('phaser-project-architect', 'folder-architecture.md', `# Folder Architecture

Default generated layout:

\`\`\`text
src/game/
  config/     Phaser config, scene keys, game constants
  scenes/     Boot, preload, menu, gameplay, UI, pause, game over
  systems/    Reusable gameplay rules and services
  entities/   Display object factories/classes and entity composition
  input/      Pointer/keyboard/touch/gamepad abstraction
  ui/         HUD, menu, dialog, text, button helpers
  state/      Runtime state, score, progression, cross-scene data
  save/       Local persistence and save migrations
  assets/     Asset keys, manifests, loader helpers
  platform/   Optional platform adapters like Yandex Games
  utils/      Small pure helpers
\`\`\`

Rules:

- Add new folders only when a repeated responsibility appears.
- Keep Phaser runtime code under \`src/game/\`.
- Keep reusable pure logic separate from Phaser objects when practical.
- Do not add generic app folders like \`components/\`, \`pages/\`, or \`routes/\` unless a DOM UI framework is explicitly selected.
- Put generated or editor-owned files under a clearly named folder and document ownership.
`),
    reference('phaser-project-architect', 'scene-system-boundaries.md', `# Scene/System Boundaries

Scenes should:

- own Phaser lifecycle methods: \`preload\`, \`create\`, \`update\`;
- orchestrate scene transitions;
- create cameras, input models, display layers, and systems;
- connect systems to Phaser events.

Systems should:

- hold reusable rules that can outlive one scene;
- update gameplay behavior that is not just a single display object;
- expose explicit methods like \`start\`, \`stop\`, \`update\`, \`reset\`.

Entities should:

- build player/enemy/item/projectile display objects;
- hide repetitive sprite/body setup;
- avoid becoming global state containers.

State should:

- store runtime values shared across scenes;
- avoid direct Phaser dependencies when possible.

Save should:

- version persisted data;
- handle malformed saves;
- save after meaningful player actions.
`),
    reference('phaser-project-architect', 'phaser-version-strategy.md', `# Phaser Version Strategy

Default stance:

- Use Phaser 3 for generated projects until the user asks for Phaser 4.
- Reason: Phaser 3 has broad examples, plugins, templates, and community support.
- Keep awareness of Phaser 4 because official skills and npm package skills may include Phaser 4 patterns.

Before upgrading:

1. Check official Phaser skills: https://github.com/phaserjs/phaser/tree/master/skills
2. Check pinned npm package skills, for example: https://app.unpkg.com/phaser@4.1.0/files/skills/
3. Check current Phaser docs: https://docs.phaser.io/
4. Verify plugin compatibility, especially rex plugins, virtual joystick, editor workflows, and publishing SDK integration.

Rules:

- Do not mix Phaser 4-only APIs into a Phaser 3 project.
- Document version assumptions in \`README.md\` or a local reference if changed.
- Prefer source-compatible TypeScript patterns over relying on undocumented internals.
`),
    reference('phaser-project-architect', 'module-selection.md', `# Module Selection

Core modules are always present:

- scenes
- assets
- input
- responsive layout
- systems/entities/state/save
- UI/HUD
- gamefeel
- testing

Optional modules should be added only when the game needs them:

- Yandex Games: when publishing to Yandex.
- rexUI: when vanilla Phaser UI becomes too costly for menus/dialogs/lists.
- virtual controls: when mobile continuous movement needs joystick/buttons.
- tilemaps: when using Tiled or tile-based worlds.
- Phaser Editor compatibility: when using visual scene/asset workflows.
- ECS: only for entity-heavy or query-heavy simulations.
- PWA/wrappers: only for install/distribution needs.

Avoid by default:

- React/Svelte app shells.
- Backend or multiplayer stacks.
- Electron/Capacitor/Tauri.
- Generic web-app architecture.
`),
  );

  files.push(
    skill('phaser-scene-workflow', 'Use when creating, refactoring, debugging, or connecting Phaser scenes: boot, preload, menu, gameplay, UI overlay, pause, transitions, scene lifecycle, or scene communication.', `# Phaser Scene Workflow

## Workflow

1. Read \`references/scene-lifecycle.md\` before changing lifecycle methods.
2. Read \`references/default-scene-stack.md\` before adding or removing scenes.
3. Read \`references/scene-communication.md\` before passing data/events across scenes.
4. Keep loading in \`PreloadScene\` or asset helpers.
5. Keep persistent HUD/overlay UI in a separate scene when it must survive gameplay restarts.
6. Use explicit scene keys and central constants when the project grows.

## Default Scene Stack

- \`BootScene\`: quick startup decisions.
- \`PreloadScene\`: asset loading.
- \`TemplateGuideScene\`: explains how to turn the template into a real game.
- \`GameScene\`: sandbox placeholder for the first playable loop.
- \`UIScene\`: HUD/overlay.
`),
    reference('phaser-scene-workflow', 'scene-lifecycle.md', `# Scene Lifecycle

Common Phaser scene hooks:

- \`constructor\`: set scene key only.
- \`init(data)\`: receive scene data.
- \`preload\`: load assets only.
- \`create\`: create objects, systems, input, events.
- \`update(time, delta)\`: frame updates; keep it short.
- \`shutdown\`/events: clean up listeners and platform state.

Rules:

- Avoid asset loading in gameplay scenes unless streaming is intentional.
- Avoid creating keyboard/pointer listeners repeatedly without cleanup.
- Avoid long logic directly inside \`update\`; delegate to systems.
- Use \`scene.start\` for replacing a scene and \`scene.launch\` for overlays.
`),
    reference('phaser-scene-workflow', 'default-scene-stack.md', `# Default Scene Stack

Recommended base:

- \`BootScene\`: platform boot, early flags, redirects to preload.
- \`PreloadScene\`: asset loading and loader progress UI.
- \`TemplateGuideScene\`: generated onboarding scene; replace with real menu/gameplay once the first loop exists.
- \`GameScene\`: first playable or sandbox scene.
- \`UIScene\`: HUD overlay.

Optional:

- \`PauseScene\`: pause overlay.
- \`MenuScene\`: real game menu after the first playable is designed.
- \`GameOverScene\`: post-run summary.
- \`SettingsScene\`: controls/audio/language.
- \`LevelSelectScene\`: progression games.

Keep scene names stable because agent routing and tests often refer to them.
`),
    reference('phaser-scene-workflow', 'scene-communication.md', `# Scene Communication

Preferred options:

1. Pass simple data through \`scene.start(key, data)\` or \`scene.launch(key, data)\`.
2. Use Phaser events for short-lived notifications.
3. Use a small state module for cross-scene state.
4. Use save modules only for persisted data.

Avoid:

- Reading random properties from another scene.
- Global mutable objects without ownership.
- Circular scene dependencies.
- UI scene directly mutating gameplay internals.

For platform integrations like Yandex, use \`platform/\` adapters instead of scattering SDK calls across scenes.
`),
  );

  files.push(
    skill('phaser-assets-pipeline', 'Use when adding or changing Phaser assets: image keys, spritesheets, atlases, audio, fonts, tilemaps, preload order, asset manifests, no-CDN rules, or missing asset debugging.', `# Phaser Assets Pipeline

## Workflow

1. Read \`references/asset-manifest.md\` before adding keys.
2. Read \`references/loader-patterns.md\` before changing preload behavior.
3. Read \`references/texture-atlas.md\` before adding atlases/spritesheets.
4. Read \`references/tilemaps.md\` before adding Tiled maps.
5. Read \`references/no-cdn-self-hosting.md\` before adding fonts or external assets.
6. Add assets under \`public/assets/\`.
7. Reference assets by constants or manifest keys, not scattered strings.

## Rules

- Use predictable folders: \`images/\`, \`sprites/\`, \`audio/\`, \`fonts/\`, \`tilemaps/\`, \`atlases/\`.
- Keep asset names lowercase and hyphenated.
- Do not load large assets inside gameplay scenes unless there is a deliberate streaming strategy.
`),
    reference('phaser-assets-pipeline', 'asset-manifest.md', `# Asset Manifest

Use a manifest so asset keys are discoverable:

\`\`\`ts
export const ImageKeys = {
  player: 'player',
} as const;

export const imageAssets = [
  { key: ImageKeys.player, url: '/assets/images/player.png' },
];
\`\`\`

Rules:

- Keep keys stable.
- Do not duplicate string keys across scenes.
- Group by asset type: images, spritesheets, atlases, audio, fonts, tilemaps.
- Keep filenames lowercase and hyphenated.
- Add comments only for non-obvious export settings or ownership.
`),
    reference('phaser-assets-pipeline', 'loader-patterns.md', `# Loader Patterns

Load assets from \`PreloadScene\` by manifest helpers.

Use Phaser loader methods by type:

- \`load.image\`
- \`load.spritesheet\`
- \`load.atlas\`
- \`load.audio\`
- \`load.bitmapFont\`
- \`load.tilemapTiledJSON\`

Rules:

- Keep preload deterministic.
- Show progress only if it improves user experience.
- Avoid loading from remote URLs.
- If assets fail, check browser network tab, path, key, case sensitivity, and Vite public path.
`),
    reference('phaser-assets-pipeline', 'texture-atlas.md', `# Texture Atlases And Spritesheets

Use spritesheets for simple fixed-frame animation.
Use atlases for packed assets, UI pieces, and many sprites.

Suggested folders:

\`\`\`text
public/assets/sprites/
public/assets/atlases/
public/assets/images/
\`\`\`

Rules:

- Keep atlas JSON and image together.
- Keep frame names stable.
- Prefer TexturePacker/Aseprite export settings that are easy to reproduce.
- Document export settings if another tool must regenerate assets.
`),
    reference('phaser-assets-pipeline', 'tilemaps.md', `# Tilemaps

Use Tiled for map authoring when the game is tile/world based.

Suggested folders:

\`\`\`text
public/assets/tilemaps/
public/assets/tilesets/
\`\`\`

Rules:

- Keep layer names stable: \`ground\`, \`collision\`, \`objects\`, \`decor\`.
- Document collision and object-layer semantics.
- Load with \`load.tilemapTiledJSON\`.
- Keep tileset image paths compatible with Vite public assets.
`),
    reference('phaser-assets-pipeline', 'no-cdn-self-hosting.md', `# No CDN And Self-Hosting

For game portals, mobile browsers, and Yandex Games, avoid external dependencies at runtime.

Rules:

- Do not use Google Fonts links.
- Do not load libraries from CDN.
- Self-host fonts under \`public/assets/fonts/\` or \`public/fonts/\`.
- Use npm dependencies bundled by Vite instead of runtime CDN scripts.
- Yandex allows its own SDK path \`/sdk.js\`; do not treat that as a generic CDN exception.

This reduces blank-page failures, moderation issues, and regional network failures.
`),
  );

  files.push(
    skill('phaser-input-mobile-desktop', 'Use when implementing or debugging mobile and desktop controls in Phaser: pointer, touch, mouse, keyboard, drag, gestures, virtual buttons, virtual joystick, browser input gotchas, or gamepad support.', `# Phaser Input Mobile/Desktop

## Workflow

1. Read \`references/pointer-keyboard-touch.md\` before changing base input.
2. Read \`references/mobile-controls.md\` before adding touch UI.
3. Read \`references/virtual-joystick.md\` before adding joystick controls.
4. Read \`references/browser-input-gotchas.md\` before release or publishing.
5. Keep input reading in \`src/game/input/\`; scenes should ask input models for intent.
6. Test with mouse, touch viewport, and keyboard.

## Rules

- Do not scatter raw key checks across many scenes.
- Prefer action names like \`move\`, \`jump\`, \`confirm\`, \`cancel\`.
- Make touch targets large and reachable.
`),
    reference('phaser-input-mobile-desktop', 'pointer-keyboard-touch.md', `# Pointer, Keyboard, Touch

Default stance:

- Pointer input is the shared mobile/desktop baseline.
- Keyboard improves desktop ergonomics.
- Touch UI is needed for mobile actions that cannot be inferred from pointer/tap.

Pattern:

- Map raw inputs to intent/actions.
- Scenes read actions, not raw keys.
- Keep key names and pointer behavior centralized.

Desktop:

- Support WASD or arrows where movement exists.
- Avoid browser/OS hotkey conflicts like Ctrl+W, F5, Alt+F4.

Mobile:

- Do not rely on keyboard-only actions.
- Keep tap targets large.
- Avoid long-press selection/context menu.
`),
    reference('phaser-input-mobile-desktop', 'mobile-controls.md', `# Mobile Controls

Use touch controls when:

- movement is continuous;
- actions are repeated quickly;
- the player needs two-thumb control;
- pointer-to-move is not enough.

Rules:

- Keep controls away from safe-area edges.
- Avoid covering critical gameplay.
- Make controls visually clear but not visually dominant.
- Support one-handed play when game design allows.
- Test portrait and landscape if both are supported.
`),
    reference('phaser-input-mobile-desktop', 'virtual-joystick.md', `# Virtual Joystick

Add virtual joystick only when the game needs analog or continuous movement.

Possible sources:

- rex virtual joystick ecosystem.
- Phaser virtual joystick plugins.
- Custom pointer delta if the game is simple.

Before adding a plugin:

- Check Phaser 3/4 compatibility.
- Prefer npm/local code over CDN.
- Ensure generated agent docs mention ownership and setup.

Avoid joystick for simple tap, drag, puzzle, card, or turn-based games unless playtests show it is needed.
`),
    reference('phaser-input-mobile-desktop', 'browser-input-gotchas.md', `# Browser Input Gotchas

For mobile/desktop web games:

- Disable unwanted text selection in game containers.
- Disable context menu on canvas/root.
- Avoid browser scroll and swipe-to-refresh.
- Initialize audio only after user interaction.
- Do not capture reserved browser shortcuts.
- Test mouse, touch emulation, real touch if available, and keyboard.

For Yandex Games:

- Entire game must be gesture-controllable on mobile.
- Desktop should support keyboard/mouse by default.
- Long-tap must not trigger selection.
- Interaction must not trigger browser context menu.
`),
  );

  files.push(
    skill('phaser-responsive-layout', 'Use when changing Phaser scale, canvas sizing, orientation, fullscreen, safe areas, UI placement, FIT vs RESIZE, or mobile/desktop viewport behavior.', `# Phaser Responsive Layout

## Workflow

1. Read \`references/scale-manager.md\` before editing Phaser scale config.
2. Read \`references/fit-vs-resize.md\` before choosing scale mode.
3. Read \`references/safe-area-orientation.md\` before changing mobile layout.
4. Read \`references/mobile-desktop-checklist.md\` before finalizing layout.
5. Position UI relative to viewport/logical dimensions, not magic pixels.
6. Test phone, tablet, desktop, narrow laptop, and wide desktop viewports.

## Rules

- Default to \`Phaser.Scale.FIT\` and centered canvas for simple games.
- Use safe margins for mobile HUD.
- Keep text readable on desktop and mobile.
`),
    reference('phaser-responsive-layout', 'scale-manager.md', `# Phaser Scale Manager

Common scale modes:

- \`FIT\`: preserve logical size and aspect ratio; can letterbox.
- \`RESIZE\`: canvas follows viewport size; requires responsive world/UI logic.
- \`ENVELOP\`: fills but may crop.
- \`NONE\`: manual sizing.

Default generated projects use \`FIT\` because it is simpler for first playable loops.

Rules:

- Centralize scale config in \`src/game/config/gameConfig.ts\`.
- Avoid reading \`window.innerWidth\` everywhere.
- Use \`this.scale.width\` and \`this.scale.height\` in scenes.
- Listen for resize only in a dedicated layout helper/system when needed.
`),
    reference('phaser-responsive-layout', 'fit-vs-resize.md', `# FIT vs RESIZE

Use \`FIT\` when:

- fixed logical resolution is acceptable;
- the game is early prototype/MVP;
- letterboxing is acceptable.

Use \`RESIZE\` when:

- publishing rules require edge-to-edge play area;
- UI must use all available space;
- the game targets many aspect ratios.

If switching to \`RESIZE\`:

- Separate world camera and UI layout.
- Anchor HUD from real viewport size.
- Preserve sprite aspect ratio; do not stretch gameplay art.
- Test ultrawide, narrow laptop, phone portrait, phone landscape.

Yandex note:

- Yandex desktop moderation can dislike letterboxing. For Yandex builds, consider \`RESIZE\` plus camera/layout compensation.
`),
    reference('phaser-responsive-layout', 'safe-area-orientation.md', `# Safe Area And Orientation

Mobile rules:

- Leave margins for notches and browser UI.
- Avoid controls too close to screen edges.
- Use CSS \`viewport-fit=cover\` only when layout handles safe areas.
- Keep portrait/landscape decision explicit.

Suggested approach:

- Start orientation-flexible during development.
- Lock or recommend orientation only when gameplay requires it.
- Keep HUD anchors relative to viewport edges.
- Recompute layout on resize/orientation change.
`),
    reference('phaser-responsive-layout', 'mobile-desktop-checklist.md', `# Mobile/Desktop Layout Checklist

Before finishing layout changes:

- Canvas visible and not blank on desktop.
- Canvas visible and not blank on phone viewport.
- No browser scrollbars.
- No clipped HUD.
- Text fits inside UI elements.
- Touch controls do not cover critical gameplay.
- Desktop layout uses width well without stretching sprites.
- Mobile layout remains readable.
- Resize does not leave stale UI positions.
`),
  );

  files.push(
    skill('phaser-game-systems', 'Use when adding gameplay systems, entities, state, events, save data, progression, scoring, economy, ECS decisions, or cross-scene data flow in a Phaser game.', `# Phaser Game Systems

## Workflow

1. Read \`references/entities-systems-state.md\` before adding gameplay architecture.
2. Read \`references/events.md\` before adding cross-module events.
3. Read \`references/save-system.md\` before changing persistence.
4. Read \`references/when-to-use-ecs.md\` before adding ECS libraries.
5. Keep pure game rules independent from Phaser when practical.
6. Prefer simple events and explicit method calls before global state.

## Defaults

- Runtime-only data: \`state/\`.
- Persistent data: \`save/\`.
- Reusable gameplay behavior: \`systems/\`.
- Display object construction: \`entities/\`.
`),
    reference('phaser-game-systems', 'entities-systems-state.md', `# Entities, Systems, State

Use entities for:

- constructing sprites/containers/bodies;
- grouping display object setup;
- reusable actor factories.

Use systems for:

- collision consequences;
- spawning rules;
- scoring;
- timers/progression;
- enemy behavior orchestration;
- economy/balance logic.

Use state for:

- score, lives, level, selected character;
- runtime flags shared between scenes;
- data that should be testable.

Keep the scene responsible for wiring, not owning all logic.
`),
    reference('phaser-game-systems', 'events.md', `# Events

Use events when:

- UI needs to react to gameplay changes;
- systems should be decoupled;
- scene communication would otherwise become direct references.

Rules:

- Prefer named constants for event names as the project grows.
- Clean up listeners on scene shutdown.
- Do not use events for everything; direct method calls are clearer for close collaborators.
- Document event payload shape near the event constants.
`),
    reference('phaser-game-systems', 'save-system.md', `# Save System

Save data should:

- include a version number when it becomes nontrivial;
- handle missing/malformed localStorage data;
- save after meaningful player actions;
- avoid storing live Phaser objects;
- support migration if structure changes.

Good persisted data:

- best score;
- unlocked levels;
- settings;
- collected items;
- progress flags.

Bad persisted data:

- sprites, scenes, cameras, raw input objects;
- huge cached assets;
- transient animation state.
`),
    reference('phaser-game-systems', 'when-to-use-ecs.md', `# When To Use ECS

Do not default to ECS.

Consider ECS only when:

- there are many similar entities;
- systems query entities by component combinations;
- performance/data layout matters;
- class inheritance is becoming painful.

Optional sources:

- bitECS for data-oriented ECS.
- Miniplex for lighter TypeScript entity queries.

For most small Phaser games, simple systems plus entity factories are easier for agents and humans.
`),
  );

  files.push(
    skill('phaser-ui-hud', 'Use when building or changing in-game UI in Phaser: HUD, menus, dialogs, overlays, buttons, pause screen, responsive UI, text readability, or optional rexUI integration.', `# Phaser UI HUD

## Workflow

1. Read \`references/ui-scene.md\` before adding persistent HUD or overlays.
2. Read \`references/hud-layout.md\` before positioning UI.
3. Read \`references/rex-ui-optional.md\` before adding rexUI/plugins.
4. Decide whether UI belongs in gameplay scene or a separate overlay scene.
5. Keep buttons and touch targets large enough for mobile.
6. Keep UI state synchronized through explicit data/events.

## Rules

- Do not build DOM UI unless there is a specific reason.
- Prefer a dedicated \`UIScene\` for persistent HUD.
- Avoid text that overlaps gameplay-critical areas on mobile.
`),
    reference('phaser-ui-hud', 'ui-scene.md', `# UI Scene

Use a separate \`UIScene\` when:

- HUD should persist while gameplay restarts;
- overlays should not be affected by world camera movement;
- UI needs its own input priority;
- gameplay and UI logic are getting tangled.

Keep UI scenes:

- anchored to screen coordinates;
- updated from events/state;
- independent from direct gameplay object mutation when possible.
`),
    reference('phaser-ui-hud', 'hud-layout.md', `# HUD Layout

Rules:

- Anchor from viewport edges or center.
- Use safe margins on mobile.
- Keep text readable on dark and bright backgrounds.
- Keep touch buttons large and spaced.
- Avoid placing UI over core gameplay unless the game design expects it.
- Recompute positions on resize if using \`RESIZE\`.

HUD should show only useful state. Avoid debug labels in production.
`),
    reference('phaser-ui-hud', 'rex-ui-optional.md', `# rexUI Optional

rexUI is useful when vanilla Phaser UI becomes too expensive:

- dialogs;
- menus;
- tabs;
- scrollable lists;
- sliders;
- layout/sizer systems;
- grid tables.

Before adding:

- Check Phaser version compatibility.
- Prefer npm/local bundled code over CDN.
- Keep plugin setup documented.
- Avoid adding rexUI for a single simple button.
`),
  );

  files.push(
    skill('phaser-gamefeel', 'Use when improving Phaser game feel: camera shake, tweens, particles, hit stop, screen flash, sound cues, animation timing, impact feedback, reward moments, or procedural audio.', `# Phaser Gamefeel

## Workflow

1. Read \`references/tweens-camera-particles.md\` before adding visual feedback.
2. Read \`references/audio-feedback.md\` before adding sounds.
3. Read \`references/impact-patterns.md\` before tuning hit/reward moments.
4. Identify the player action or game event that needs feedback.
5. Layer feedback: motion, sound, visual effect, timing, camera.
6. Test feel on mobile and desktop, because input rhythm differs.

## Common Tools

- Tweens for motion and emphasis.
- Camera shake/flash for impact.
- Particles for reward and destruction.
- Short audio cues for confirmation.
- Brief pause or slow motion for major hits only.
`),
    reference('phaser-gamefeel', 'tweens-camera-particles.md', `# Tweens, Camera, Particles

Use tweens for:

- button press/release;
- item pickup;
- damage feedback;
- reward emphasis;
- menu transitions.

Use camera effects for:

- impact;
- major transitions;
- danger;
- success/failure.

Use particles for:

- collection;
- destruction;
- celebration;
- environmental motion.

Keep effects brief and readable. Too much feedback becomes noise.
`),
    reference('phaser-gamefeel', 'audio-feedback.md', `# Audio Feedback

Audio rules:

- Initialize audio after user interaction.
- Provide mute/volume if game has substantial audio.
- Use short cues for UI confirm, pickup, hit, fail, reward.
- Avoid long overlapping sounds for repeated actions.
- Mute/pause audio during platform pause and ads when publishing.

Procedural audio can reduce asset size for small games.
`),
    reference('phaser-gamefeel', 'impact-patterns.md', `# Impact Patterns

Small action:

- short tween;
- soft sound;
- tiny particle or color flash.

Damage/hit:

- brief sprite flash;
- small camera shake;
- knockback or squash;
- hit sound.

Major reward:

- stronger tween;
- particles;
- pitch/rhythm change;
- short pause before reward reveal.

Do not apply all effects everywhere. Pick a consistent feedback language.
`),
  );

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

  files.push(
    skill('phaser-testing', 'Use when adding or fixing tests for a Phaser Vite game: build validation, dev server checks, Playwright canvas smoke tests, mobile/desktop viewport checks, Vitest pure logic tests, or generated project validation.', `# Phaser Testing

## Workflow

1. Read \`references/vite-build.md\` before changing build config.
2. Read \`references/playwright-canvas-smoke.md\` before changing browser smoke tests.
3. Read \`references/mobile-desktop-viewports.md\` before validating layout/input.
4. Run \`npm run build\` after TypeScript or Vite changes.
5. Use Playwright smoke tests to verify the canvas renders.
6. Report what was verified and what was not.

## Smoke Test Goals

- Dev server starts.
- Canvas exists.
- Canvas is visible.
- Main scene reaches an interactive state.
- Mobile viewport does not break layout.
`),
    reference('phaser-testing', 'vite-build.md', `# Vite Build

Use:

\`\`\`bash
npm run build
npm run preview
\`\`\`

Check:

- TypeScript passes.
- Vite produces \`dist/\`.
- Public assets resolve.
- No unexpected external runtime URLs.

For publishing targets, platform packs may add stricter build validation.
`),
    reference('phaser-testing', 'playwright-canvas-smoke.md', `# Playwright Canvas Smoke

Minimum browser smoke test:

- Start dev server.
- Visit root route.
- Locate \`canvas\`.
- Assert canvas is visible.
- Assert width/height > 0.
- Wait briefly for scene creation.

Better tests:

- Check a visible menu/start text.
- Click/tap to enter gameplay.
- Verify the UI scene appears.
- Run desktop and mobile projects.
`),
    reference('phaser-testing', 'mobile-desktop-viewports.md', `# Mobile/Desktop Viewports

Test at least:

- Desktop Chrome.
- Pixel/Android-like phone.
- Narrow laptop viewport.
- Optional tablet viewport.

When input/layout changes:

- Verify pointer/touch path.
- Verify keyboard path.
- Verify text fits.
- Verify HUD does not clip.
- Verify canvas is not blank.
`),
  );

  files.push(
    skill('phaser-skill-pack-maintainer', 'Use when adding, editing, validating, syncing, or reorganizing this project-local Phaser skill pack, AGENTS.md, task maps, source registry, manifests, or agent onboarding docs.', `# Phaser Skill Pack Maintainer

## Workflow

1. Read \`references/skill-quality-rules.md\`.
2. Read \`references/source-sync.md\` before updating from upstream.
3. Read \`references/phaser-skill-sources.md\` before changing Phaser knowledge.
4. Keep every skill Phaser mobile/desktop focused.
5. Make descriptions trigger-focused.
6. Update \`skills/README.md\`, \`skills/_meta/task-map.md\`, \`.ai/skill-manifest.json\`, and agent entry files when routing changes.

## Rules

- Do not create giant skills.
- Move detailed API notes into \`references/\`.
- Prefer action-oriented instructions over background essays.
- A new agent must be able to understand the project without chat history.
`),
    reference('phaser-skill-pack-maintainer', 'skill-quality-rules.md', `# Skill Quality Rules

Good skills:

- have trigger-focused frontmatter descriptions;
- keep \`SKILL.md\` short and procedural;
- put detailed knowledge in \`references/\`;
- tell agents exactly when to open each reference;
- include validation steps;
- avoid generic advice.

Bad skills:

- repeat common model knowledge without project-specific value;
- become huge essays;
- omit routing updates;
- mention optional modules as if they are always installed.
`),
    reference('phaser-skill-pack-maintainer', 'source-sync.md', `# Source Sync

Primary upstreams:

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Phaser npm/unpkg skills for pinned versions.
- Phaser docs: https://docs.phaser.io/
- Anthropic skill-creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Agent Skills spec: https://agentskills.io/specification.md

When syncing:

- Record source and date in a reference or changelog-like note.
- Do not blindly overwrite local project rules.
- Preserve Phaser mobile/desktop focus.
- Update manifests and task maps.
`),
    reference('phaser-skill-pack-maintainer', 'phaser-skill-sources.md', `# Phaser Skill Sources

Use official Phaser sources first:

- GitHub skills directory.
- Phaser docs.
- Phaser examples.
- Phaser templates.
- npm/unpkg package skill files for pinned versions.

Optional audited sources:

- Phaser Editor docs.
- rexUI docs.
- publishing platform docs.
- community agent skills, only after manual review.

Keep community sources lower trust than official Phaser and platform documentation.
`),
  );

  if (options.includeYandexGames) {
    files.push(
      skill('yandex-publish', 'Prepare and validate a Phaser HTML5 game for Yandex Games publishing. Use when integrating the Yandex Games SDK, fixing moderation issues, adding ads/localization, validating requirements, creating promo materials, or building a Yandex submission ZIP.', `# Yandex Games Publish

## Workflow

1. Read \`docs/yandex-games.md\`.
2. Read \`references/sdk-startup.md\` before touching SDK initialization.
3. Read \`references/loading-gameplay-api.md\` before changing loading, scene boot, pause/resume, or gameplay state.
4. Read \`references/no-cdn-production.md\` before adding fonts/scripts/assets.
5. Read \`references/ads.md\` before adding interstitial, rewarded, or banner ads.
6. Read \`references/localization.md\` before adding visible text.
7. Read \`references/layout-input-requirements.md\` before changing canvas, CSS, input, or scaling.
8. Read \`references/promo-materials.md\` before preparing store media.
9. Read \`references/pre-submission-checklist.md\` before packaging.
10. Read \`references/windows-zip.md\` before creating ZIP on Windows.
11. Before upload, run:

\`\`\`bash
npm run validate:yandex
npm run build:yandex
\`\`\`

## Moderation Rules To Remember

- No browser scrollbars or swipe-to-refresh.
- No text selection, context menu, or long-tap selection during play.
- No \`console\` or \`debugger\` in production bundle.
- All SDK promises should have \`.catch()\` handlers.
- All visible text should be localized for selected languages.
- Rewarded ad buttons must clearly say the user watches an ad and what reward is given.
- On Windows, create ZIP with Python, not PowerShell, so ZIP entries use forward slashes.

## Files In This Project

- \`src/game/platform/yandexGames.ts\`: SDK init, pause/resume, LoadingAPI bridge.
- \`docs/yandex-games.md\`: release checklist.
- \`scripts/make-yandex-zip.py\`: upload ZIP creator.
- \`scripts/validate-yandex-build.py\`: starter validation checks.
`),
      reference('yandex-publish', 'sdk-startup.md', `# SDK Startup

Required:

- Load SDK synchronously in \`index.html\` with \`<script src="/sdk.js"></script>\`.
- Initialize with \`YaGames.init()\`.
- Store the SDK object on \`window.ysdk\`.
- Use a fallback path for local dev or SDK init failure.
- Do not block the game forever if SDK is unavailable.

Phaser startup pattern:

1. Start Phaser immediately.
2. Track \`__sdkDone\`.
3. Track \`__bootDone\`.
4. Call \`LoadingAPI.ready()\` only when both are true.

The generated file \`src/game/platform/yandexGames.ts\` contains the starter version of this bridge.
`),
      reference('yandex-publish', 'loading-gameplay-api.md', `# LoadingAPI And GameplayAPI

LoadingAPI:

- Call \`ysdk.features.LoadingAPI?.ready()\` when the game is loaded and ready.
- Must be called in success and fallback/error paths.
- Do not let Yandex loading overlay remain forever.

GameplayAPI:

- Call \`GameplayAPI.start()\` when active gameplay begins.
- Call \`GameplayAPI.stop()\` when gameplay pauses, ends, ads open, or blocking overlays appear.

Pause/resume:

- Subscribe to \`game_api_pause\`.
- Subscribe to \`game_api_resume\`.
- Actually pause/resume the Phaser loop.
- Mute/unmute audio if audio exists.

Verification:

- Use Yandex debug panel if available.
- Pause button must visibly freeze gameplay.
`),
      reference('yandex-publish', 'ads.md', `# Ads

Interstitial ads:

- Show only at logical pauses: between levels, restart, after game over acknowledgment.
- Never show during active gameplay.
- Pause gameplay and audio on ad open.
- Resume only after close/error handling.

Rewarded ads:

- Must be user-initiated.
- Button must clearly say the user watches an ad.
- Button must show the expected reward.
- Grant reward in the rewarded callback, not merely on close.
- Reward cannot be required for core progression.

Sticky banners:

- Use only through Yandex SDK.
- Check availability.
- Avoid covering gameplay or HUD.

All SDK promise chains should have \`.catch()\` handlers to avoid moderation-visible unhandled errors.
`),
      reference('yandex-publish', 'localization.md', `# Localization

Yandex requirements:

- Minimum English and Russian if those languages are selected.
- All visible text must be localized.
- Use \`ysdk.environment.i18n.lang\` for language detection.
- Read \`i18n.lang\` from the SDK object after \`YaGames.init()\`.
- Do not rely only on \`navigator.language\`.

Common missed text:

- HUD labels.
- Buttons.
- Tooltips.
- Floating combat text.
- Error messages.
- Upgrade names.
- Rewarded ad buttons.
- Promo/screenshot text.

Keep the game name consistent across game UI and draft materials.
`),
      reference('yandex-publish', 'layout-input-requirements.md', `# Layout And Input Requirements

Mobile:

- Fullscreen gameplay.
- Gesture controls; no keyboard-only actions.
- No long-tap selection.
- No browser scrollbars or swipe-to-refresh.
- Elements must not distort or overlap on resize.

Desktop:

- Keyboard/mouse control by default.
- Active game field should stretch appropriately.
- Avoid browser/OS hotkey conflicts.
- No context menu or text selection during game interaction.

CSS requirements:

- \`overflow: hidden\`.
- \`overscroll-behavior: none\`.
- \`touch-action: none\` for the game surface.
- \`user-select: none\`.
- Avoid \`100vh\` containers when browser chrome can cause overflow.
`),
      reference('yandex-publish', 'no-cdn-production.md', `# No CDN Production

Critical:

- Do not use Google Fonts CDN.
- Do not use cdnjs, unpkg, jsdelivr, cloudflare CDN scripts.
- Self-host fonts and assets.
- Bundle libraries with Vite.
- The allowed SDK script for Yandex is \`/sdk.js\`.

Why:

- External resources may be slow or blocked.
- Moderators can see blank loading if render-blocking resources fail.
- Yandex can reject games that fail to load reliably.
`),
      reference('yandex-publish', 'promo-materials.md', `# Promo Materials

Common materials:

- Cover image.
- Icon.
- Desktop screenshots.
- Mobile screenshots.
- Localized text materials.

Rules:

- Screenshots should show active gameplay, not loading/menu/game-over.
- No system UI, phone frame, browser chrome, or Yandex badges.
- EN screenshots should show English only.
- RU screenshots should show Russian only.
- Icons/covers should be polished branded art, not raw screenshots.
- Keep game name consistent across draft, in-game title, cover, and materials.
`),
      reference('yandex-publish', 'pre-submission-checklist.md', `# Pre-Submission Checklist

Before packaging:

- \`npm run build\` passes.
- \`npm run validate:yandex\` passes.
- No external CDN links.
- SDK path \`/sdk.js\` is present.
- \`LoadingAPI.ready()\` is reachable in all startup paths.
- \`GameplayAPI.start/stop\` are used.
- \`game_api_pause/resume\` handlers exist.
- No production \`console\` or \`debugger\`.
- No browser scrollbars.
- Context menu and text selection disabled.
- All visible text localized.
- Save/progress works after refresh if game has progression.
- Archive uncompressed size is within Yandex limits.
- ZIP contains \`index.html\` at root.
`),
      reference('yandex-publish', 'windows-zip.md', `# Windows ZIP

Do not use PowerShell \`Compress-Archive\` for Yandex upload ZIPs.

Reason:

- It can create entries with backslash paths like \`assets\\index.js\`.
- Yandex hosts on Linux-like systems expecting forward slashes.
- This can cause JS/assets 404 after upload.

Use:

\`\`\`bash
npm run build:yandex
\`\`\`

The generated Python script writes ZIP paths with forward slashes.

Verify:

\`\`\`bash
python -c "import zipfile; print(zipfile.ZipFile('yandex-game.zip').namelist()[:5])"
\`\`\`
`),
    );
  }

  return files;
}

function skill(name: string, description: string, body: string): GeneratedFile {
  return {
    path: `skills/${name}/SKILL.md`,
    content: `---
name: ${name}
description: ${description}
---

${body}
`,
  };
}

function reference(skillName: string, fileName: string, content: string): GeneratedFile {
  return {
    path: `skills/${skillName}/references/${fileName}`,
    content,
  };
}
