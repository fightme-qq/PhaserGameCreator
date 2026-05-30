import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function visualTasteSkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push(
    skill('phaser-visual-taste', 'Use when shaping or polishing the visual direction of a Phaser game: title screens, HUD, menus, cards, shops, upgrade choices, game-over screens, palettes, typography, motion density, art direction, and anti-generic UI checks before calling a screen finished.', `# Phaser Visual Taste

## Workflow

1. Read \`references/visual-direction-dials.md\`.
2. State the design read in one line: game genre, audience, platform, mood, and screen type.
3. Set three dials: visual variance, motion intensity, and information density.
4. Choose one visual language and keep it consistent across gameplay, HUD, menus, and overlays.
5. Improve hierarchy before decoration: goal, current state, danger, reward, and next action must read first.
6. Run the visual pre-flight before finishing.

## Rules

- Do not polish a static screen before the first playable loop works.
- Do not use generic purple/blue glow, random particles, or equal card rows as the default visual answer.
- Do not hide game-critical information behind tiny labels, low contrast, or decorative frames.
- Keep one accent color family unless the gameplay meaning requires multiple semantic colors.
- Use motion for state change, feedback, reward, danger, or navigation, not constant noise.
- Respect reduced motion for heavy shake, flashes, particles, and looping effects.
- Make phone readability and touch-safe spacing part of the visual design, not an afterthought.
`),
    reference('phaser-visual-taste', 'visual-direction-dials.md', `# Visual Direction Dials

Before polishing, define:

- Visual variance: 1 = conventional arcade clarity, 10 = highly art-directed and asymmetrical.
- Motion intensity: 1 = restrained transitions, 10 = cinematic animation and strong juice.
- Information density: 1 = airy title/pause screens, 10 = dense strategy HUD.

Suggested baselines:

- First playable: variance 4, motion 4, density 3.
- Arcade action: variance 5, motion 7, density 5.
- Puzzle: variance 4, motion 4, density 4.
- Card/collection: variance 6, motion 6, density 6.
- Cozy/mobile: variance 5, motion 3, density 3.
- Boss/action spectacle: variance 7, motion 8, density 5.

Visual language checklist:

- Palette: neutral base, one accent, semantic danger/success colors only where needed.
- Typography: readable at phone size, strong title hierarchy, tabular numbers for timers/scores.
- Shapes: one radius system for buttons, panels, cards, and chips.
- Surfaces: use panels only when they clarify hierarchy; avoid cards inside cards.
- Icons: consistent style and stroke/fill language.
- Motion: entrance, feedback, reward, fail, and transition behaviors have different jobs.
- Background: supports gameplay readability instead of competing with sprites and HUD.

Pre-flight:

- Goal, score/progress, health/danger, and restart/next action are immediately readable.
- No critical text clips on phone or desktop.
- Buttons have hover, active, focus, and disabled states where relevant.
- Menus can be navigated without pixel-perfect pointing.
- Game-over, win, pause, and empty states look intentionally designed.
- Effects do not reduce gameplay readability.
- The screen does not look like a generic web landing page pasted over a canvas.
`),
  );

  files.push(
    skill('phaser-ui-redesign-auditor', 'Use when improving an existing Phaser UI without changing gameplay logic; audit HUD, menus, overlays, cards, buttons, typography, spacing, colors, states, responsiveness, and interaction feedback before applying focused visual upgrades.', `# Phaser UI Redesign Auditor

## Workflow

1. Read \`references/ui-audit-checklist.md\`.
2. Inspect the current game screen, UI scene, HUD helpers, CSS, and Phaser text/button code.
3. List the visual problems before changing code.
4. Preserve working gameplay, routes, scene keys, save data, analytics hooks, and input behavior.
5. Apply upgrades in priority order: readability, hierarchy, states, spacing, palette, motion, final polish.
6. Validate on the selected target and its fallback viewport.

## Rules

- Do not rewrite gameplay systems to make a UI improvement.
- Do not silently rename scene keys, event names, save fields, or DOM IDs.
- Keep changes targeted and reviewable.
- Prefer project-local UI helpers and Phaser containers before inventing a new UI framework.
- If a screen is still missing gameplay state, design the empty/loading/locked state instead of faking success.
`),
    reference('phaser-ui-redesign-auditor', 'ui-audit-checklist.md', `# Phaser UI Audit Checklist

Audit in this order:

1. Readability
   - Text size holds up on phone and desktop.
   - Scores, timers, health, objectives, and prompts are not hidden by effects.
   - Contrast remains readable over the actual gameplay background.

2. Hierarchy
   - One primary action per menu or overlay.
   - Secondary actions are visually secondary.
   - HUD groups related values and avoids noisy labels.

3. States
   - Hover, active, focus, disabled, selected, locked, empty, loading, win, fail, and pause states exist when relevant.
   - Restart and continue affordances are obvious.

4. Layout
   - Safe areas are respected.
   - Touch targets are large enough.
   - Panels do not overlap the critical play area.
   - Text wraps intentionally and never clips.

5. Palette and surfaces
   - One accent family is used consistently.
   - Danger, success, reward, and disabled states are semantic.
   - Panels/cards exist only where they clarify grouping.
   - Shadows, glows, outlines, and particles do not fight gameplay.

6. Motion and feedback
   - Button presses feel tactile.
   - Reward and damage feedback are distinct.
   - Heavy flashes/shakes have reduced-motion fallbacks.
   - Looping animations do not distract from gameplay.

Common fixes:

- Replace tiny all-caps labels with clear sentence-case text.
- Use tabular numbers for timers, score, currency, and cooldowns.
- Add a scrim behind modal text when gameplay continues underneath.
- Pin repeated CTA positions so muscle memory works.
- Use spacing and dividers before adding more bordered boxes.
`),
  );

  files.push(
    skill('phaser-brandkit-brief', 'Use when planning a game identity or art direction before asset creation: logo concept, palette, typography mood, UI motifs, key art, app icon, capsule/banner, store imagery, sprite style, and implementation-friendly brand rules.', `# Phaser Brandkit Brief

## Workflow

1. Read \`references/brandkit-template.md\`.
2. Infer the game fantasy, player emotion, genre, audience, and platform.
3. Define one core metaphor that can guide logo, UI motifs, effects, and promotional art.
4. Produce a compact brandkit brief before generating or importing assets.
5. Keep asset requests implementation-friendly for Phaser: sizes, formats, atlas strategy, and fallback placeholders.
6. Record third-party or generated assets in \`public/assets/credits.md\` when they are added.

## Rules

- Do not copy logos, UI marks, sprites, or key art from existing games.
- Do not generate a random moodboard; every visual choice should support the game fantasy.
- Keep gameplay readability above brand decoration.
- Separate runtime assets from marketing assets.
- Give agents enough naming, sizing, and export detail to implement without guessing.
`),
    reference('phaser-brandkit-brief', 'brandkit-template.md', `# Game Brandkit Brief Template

Output:

- Game title:
- Genre and camera:
- Audience and platform:
- Player fantasy:
- Emotional promise:
- Core metaphor:
- Visual language:
- Palette:
  - canvas/background:
  - primary UI:
  - accent:
  - danger:
  - success/reward:
- Typography mood:
- Logo idea:
- UI motifs:
- Runtime asset style:
- Marketing asset style:

Runtime deliverables:

- title_logo.svg or title_logo.png;
- app_icon_512.png;
- hud icons at 32px or 64px;
- button states: normal, hover/focus, pressed, disabled;
- card/panel style if the game uses cards, inventory, upgrades, or shop UI;
- VFX sprites: hit, collect, reward, level-up, fail;
- placeholder fallback names for assets not ready yet.

Marketing deliverables:

- capsule/header image;
- store screenshot direction;
- social banner;
- key art prompt or artist brief;
- favicon if the game ships as a web page.

Implementation notes:

- Prefer PNG/WebP for raster art, SVG only for simple logos/icons that scale cleanly.
- Use lowercase kebab-case filenames.
- Use transparent backgrounds for sprites and UI icons.
- Group growing sprite sets into atlases.
- Keep source/credits in \`public/assets/credits.md\`.
`),
  );

  return files;
}
