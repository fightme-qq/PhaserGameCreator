import type { GeneratedFile, ProjectOptions } from '../types';

export function qualityDocs(options: ProjectOptions): GeneratedFile[] {
  return [

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

## Visual Taste Gate

- HUD, menu, pause, win, fail, and restart states are readable on phone and desktop.
- One visual language is used across gameplay, HUD, menus, and overlays.
- Critical information is not hidden by particles, glows, backgrounds, or decorative panels.
- Buttons and interactive UI have hover/active/focus/disabled or touch-equivalent states where relevant.
- Text does not clip, wrap awkwardly, or sit below readable contrast.
- Motion supports feedback, reward, danger, navigation, or state change; it is not constant noise.
- Reduced-motion settings are respected for heavy shake, flash, particles, and looping effects.
- The UI avoids generic AI tells: random purple/blue glow, equal-card filler rows, meaningless pills, and cards inside cards.

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
  ];
}
