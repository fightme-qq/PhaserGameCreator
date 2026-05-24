import type { GeneratedFile, ProjectOptions } from '../types';
import { agentPromptDocs } from './agentPromptDocs';
import { featureRecipes } from './featureRecipes';
import { genreBlueprints } from './genreBlueprints';
import { moduleTemplates } from './moduleTemplates';
import { qualityDocs } from './qualityDocs';

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
    ...qualityDocs(options),
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
    ...featureRecipes(),
    ...genreBlueprints(),
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
    ...moduleTemplates(),
    ...agentPromptDocs(),
  ];
}

