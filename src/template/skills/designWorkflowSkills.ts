import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function designWorkflowSkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push(
    skill('phaser-game-design-interviewer', 'Use before coding from a raw or vague Phaser game idea, especially requests like "make a game like X but with Y"; clarify genre, player goal, core loop, controls, camera, win/lose conditions, progression, platform, visual style, MVP scope, first playable requirements, backlog, risks, and suggested genre blueprint.', `# Phaser Game Design Interviewer

## Workflow

1. Read \`references/intake-template.md\` before responding to a vague idea.
2. Extract only the minimum design needed to build the first playable.
3. If details are missing, infer sensible defaults and mark them as assumptions.
4. Ask at most three blocking questions only when a wrong assumption would waste implementation work.
5. Output a clarified concept, MVP scope, first playable requirements, backlog, risks, and genre blueprint.
6. Hand off to \`phaser-first-playable-builder\` before implementation.

## Rules

- Do not start coding from a one-sentence idea.
- Keep design small enough to implement in one first playable pass.
- Prefer playable verbs and feedback over lore, menus, or meta systems.
- Treat genre references as inspiration, not copyrighted implementation plans.
`),
    reference('phaser-game-design-interviewer', 'intake-template.md', `# Game Design Intake Template

Minimum output:

- Clarified concept: one sentence.
- Genre: platformer, top-down arena, runner, puzzle grid, card/collection, or custom.
- Player goal: what the player tries to accomplish.
- Core loop: action -> challenge -> feedback -> progress -> fail/win -> restart.
- Controls: keyboard/mouse/touch/gamepad expectations.
- Camera: fixed, follow, arena, side-view, room-based, or scrolling.
- Win condition: one clear success condition.
- Lose condition: one clear failure condition.
- Progression: none, score, timer, waves, levels, upgrades, unlocks.
- Platform: mobile-first or desktop-first browser.
- Visual style: readable placeholder style first, real art later.
- MVP scope: what is included now.
- Backlog: what waits until after the first playable.
- Risks: unclear mechanics, asset needs, physics complexity, UI scope, performance.
- Suggested blueprint: nearest file under \`docs/genre-blueprints/\`.
`),
  );

  files.push(
    skill('phaser-first-playable-builder', 'Use before implementing a Phaser game loop or when turning an approved concept into the smallest playable version; define player action, challenge, feedback, score/progress, win/fail states, restart, required scenes/systems/entities, and validation before adding menus, polish, or broad content.', `# Phaser First Playable Builder

## Workflow

1. Read \`references/playable-loop-contract.md\`.
2. Start from \`docs/first-playable-contract.md\` if present.
3. Convert the concept into one playable loop: player action -> challenge -> feedback -> progress -> fail/win -> restart.
4. Identify the minimum files to edit before touching code.
5. Build gameplay before decorative menus, shops, long progression, or production art.
6. Validate the loop with build and smoke checks.

## Rules

- The first playable must include input, one challenge, feedback, one progress signal, win/fail, and restart.
- A pretty static screen is not a first playable.
- Use placeholders when assets are missing.
- Keep scope small enough that the game can be played and restarted in under one minute.
`),
    reference('phaser-first-playable-builder', 'playable-loop-contract.md', `# Playable Loop Contract

Required:

- Player action: move, jump, aim, tap, swap, collect, dodge, shoot, select, or similar.
- Challenge: enemy, timer, obstacle, hazard, puzzle rule, or resource pressure.
- Feedback: movement response, hit/collect effect, UI update, sound placeholder, or camera cue.
- Progress: score, count, health, timer, gems, distance, wave, or objective text.
- Win: one explicit success condition.
- Fail: one explicit failure condition.
- Restart: button, key, tap, or scene restart path.

Example:

- Idea: dungeon knight.
- Player action: WASD/touch movement.
- Challenge: avoid slimes.
- Progress: collect five gems.
- Fail: HP reaches 0.
- Win: all gems collected.
- Restart: visible restart control and keyboard/touch input.
`),
  );

  files.push(
    skill('phaser-feature-slicer', 'Use before implementing a broad Phaser feature request such as progression, upgrades, inventory, enemies, waves, shops, saves, bosses, new modes, or large UI; slice the request into small safe steps, target files, validation checks, and a first incremental implementation instead of coding the whole system at once.', `# Phaser Feature Slicer

## Workflow

1. Read \`references/slice-template.md\`.
2. Identify the smallest user-visible behavior that proves the feature.
3. Split the feature into ordered steps with one responsibility each.
4. Name target files and ownership boundaries for each step.
5. Choose the first step to implement now.
6. Add a smoke check or manual validation after each step.

## Rules

- Do not implement a full large system in one pass.
- Prefer data/state first, then event, then UI, then persistence.
- Keep each step revertible and testable.
- Delay save/load, balancing, animation polish, and content expansion until the core behavior works.
`),
    reference('phaser-feature-slicer', 'slice-template.md', `# Feature Slice Template

Output:

- Goal: one sentence.
- Smallest proof: what the player can do after step 1.
- Target files: likely files or folders.
- Boundaries: what belongs in scene, system, entity, UI, state, save, or data.
- Steps:
  1. Add state/data fields.
  2. Add gameplay event or pickup/action.
  3. Add consequence and feedback.
  4. Add UI display or selection.
  5. Add persistence only if needed.
  6. Add smoke/manual test.
- Deferred: content, tuning, polish, extra screens, platform integrations.

Example for upgrades:

1. Add \`xp\` and \`level\` runtime state.
2. Add XP pickup or enemy reward.
3. Emit level-up event at threshold.
4. Show one upgrade choice.
5. Save persistent unlocks later, not per-run temporary upgrades.
6. Validate level-up can happen once and restart resets run state.
`),
  );

  files.push(
    skill('phaser-refactor-guardian', 'Use before editing or refactoring Phaser code, especially GameScene, systems, entities, input, physics, UI, save, or generated project structure; identify target files, boundaries, where new logic belongs, risks of monolithic scene changes, magic numbers, mixed responsibilities, and validation before changing code.', `# Phaser Refactor Guardian

## Workflow

1. Read \`references/boundary-checklist.md\` before editing.
2. Identify target files and existing ownership boundaries.
3. Decide where new logic belongs: scene, system, entity, input, UI, state, save, data, or platform adapter.
4. Keep changes close to the requested behavior.
5. Avoid turning \`GameScene\` into the place for every rule.
6. Run the smallest relevant validation after the edit.

## Rules

- Do not mix UI logic into entities.
- Do not mix raw input polling with physics consequences across many files.
- Do not scatter direct \`localStorage\` calls outside save modules.
- Do not add repeated magic numbers when a named config/data field is clearer.
- Do not move unrelated code while fixing a local issue.
`),
    reference('phaser-refactor-guardian', 'boundary-checklist.md', `# Boundary Checklist

Before editing:

- Which files need to change?
- Which existing pattern is closest?
- Does this belong in:
  - \`scenes/\` for lifecycle and orchestration;
  - \`systems/\` for reusable gameplay rules;
  - \`entities/\` for sprite/body setup;
  - \`input/\` for raw input to intent;
  - \`ui/\` for HUD/menus/overlays;
  - \`state/\` for runtime values;
  - \`save/\` for persistence;
  - \`data/\` for tunable definitions?
- Is \`GameScene\` growing because it owns logic that could be a system?
- Are constants/data repeated?
- Are event listeners cleaned up on shutdown?
- Can the change be validated with build, smoke test, or quick manual play?
`),
  );

  files.push(
    skill('phaser-error-recovery-debugger', 'Use when a generated Phaser project does not build, launch, render the canvas, load assets, start a scene, respond to input, or passes TypeScript but fails at runtime; follow a diagnostic loop: build first, fix the first root error, inspect console/runtime, check blank canvas causes, rerun, and avoid speculative rewrites.', `# Phaser Error Recovery Debugger

## Workflow

1. Read \`references/debug-loop.md\`.
2. Run \`npm run build\` first for TypeScript/Vite errors.
3. Fix the first root cause, not every downstream error.
4. Rerun the same check.
5. If build passes but runtime fails, inspect browser console and scene lifecycle.
6. If canvas is blank, check scene registration, preload, asset paths, and game config.
7. Report the root cause and the verification command.

## Rules

- Do not guess from symptoms when logs are available.
- Do not rewrite architecture to fix a typo or asset path.
- Prefer one small fix per diagnostic cycle.
- Keep runtime debug helpers easy to remove or disable.
`),
    reference('phaser-error-recovery-debugger', 'debug-loop.md', `# Debug Loop

Build errors:

1. Run \`npm run build\`.
2. Read the first TypeScript or Vite error.
3. Open the referenced file.
4. Fix the root cause.
5. Rerun \`npm run build\`.

Runtime errors:

1. Start dev server.
2. Inspect browser console.
3. Check scene keys and scene order.
4. Check preload keys and asset URLs.
5. Check missing DOM container or Phaser config.
6. Check input listeners and scene restart cleanup.

Blank canvas checklist:

- Phaser game created.
- Canvas exists and has nonzero size.
- Scene is registered and started.
- Preload completed or failed visibly.
- Asset paths use Vite public paths correctly.
- No exception occurred during \`create()\`.
`),
  );

  files.push(
    skill('phaser-version-docs-sync', 'Use before relying on Phaser APIs, plugins, examples, migration advice, or docs-sensitive behavior; check package.json for the installed Phaser version, prefer local project patterns, use official Phaser docs/examples for exact API, avoid deprecated or Phaser 2/old Phaser 3 patterns, and document version assumptions.', `# Phaser Version Docs Sync

## Workflow

1. Read \`package.json\` before using uncertain Phaser APIs.
2. Read \`references/version-check.md\` before adding plugin or API-specific code.
3. Prefer patterns already used in this repository.
4. Use official Phaser docs/examples for exact API behavior when unsure.
5. Avoid Phaser 2 examples and old Phaser 3 snippets unless verified.
6. Document assumptions when changing Phaser version, plugins, physics engine, or scale mode.

## Rules

- Do not mix Phaser 4-only APIs into a Phaser 3 project.
- Do not add CDN examples from tutorials.
- Check plugin compatibility before installing or copying plugin setup.
- If docs and local patterns conflict, explain the choice and update local docs if needed.
`),
    reference('phaser-version-docs-sync', 'version-check.md', `# Version Check

Before using Phaser API:

- Check \`package.json\` for \`phaser\`.
- Check existing code under \`src/game/\`.
- Prefer official docs: https://docs.phaser.io/
- Prefer official examples: https://github.com/phaserjs/examples
- For Phaser package skills, check the installed package or official repo when available.

High-risk areas:

- physics engine setup;
- tilemap collision APIs;
- scale manager behavior;
- animation manager APIs;
- plugin registration;
- input and pointer APIs;
- loader file types.
`),
  );

  return files;
}
