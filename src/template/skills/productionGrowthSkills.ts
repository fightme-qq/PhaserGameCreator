import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function productionGrowthSkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

  files.push(
    skill('phaser-progression-economy', 'Use when designing or implementing Phaser progression and economy systems: XP, levels, upgrades, coins, shops, unlockables, wave scaling, difficulty curves, reward pacing, temporary per-run upgrades, persistent meta progression, and save boundaries.', `# Phaser Progression Economy

## Workflow

1. Read \`references/progression-models.md\` before adding XP, coins, upgrades, shops, or unlocks.
2. Decide what is temporary per run and what is persistent across sessions.
3. Keep progression state in \`state/\` and persistence in \`save/\`.
4. Start with one reward source and one reward sink.
5. Add UI only after the progression event works.
6. Validate restart, reload, and balance edge cases.

## Rules

- Do not add a full economy before the first playable loop works.
- Do not persist temporary run upgrades unless the design explicitly needs it.
- Keep reward numbers in data/config, not scattered in scenes.
- Make progression readable: the player should know why a reward happened.
`),
    reference('phaser-progression-economy', 'progression-models.md', `# Progression Models

Simple run-based model:

- Enemies grant XP.
- Every 100 XP triggers level up.
- Level-up upgrades are temporary for the current run.
- Coins are persistent meta currency.
- Save only coins, unlocks, settings, and best score.

Level-based model:

- Completing levels unlocks the next level.
- Stars or medals are persistent.
- Power upgrades are optional and data-driven.

Economy checklist:

- Reward source: enemy, collectible, timer, level complete, pack open, puzzle solve.
- Reward sink: upgrade, shop item, unlock, retry, cosmetic, level gate.
- Pacing: early rewards frequent, later rewards slower.
- Difficulty: enemy count, speed, health, spawn rate, timer pressure.
- Save boundary: settings/progress only, not live gameplay objects.
`),
  );

  files.push(
    skill('phaser-accessibility-localization', 'Use when improving Phaser browser game accessibility or localization: keyboard-only support, remappable controls, touch-friendly buttons, color contrast, font size, reduced motion, readable HUD text, language string tables, locale fallback, and avoiding hardcoded UI text.', `# Phaser Accessibility Localization

## Workflow

1. Read \`references/accessibility-localization-checklist.md\`.
2. Keep controls usable with keyboard/mouse and touch when the target requires both.
3. Put player-facing UI strings behind a small text table once screens grow beyond prototypes.
4. Respect reduced motion for heavy shake, flash, particles, and transitions.
5. Check contrast and text size on phone and desktop.
6. Validate that important actions are not touch-only or keyboard-only unless platform scope says so.

## Rules

- Do not bury essential actions behind tiny buttons.
- Do not rely on color alone for critical state.
- Do not hardcode large amounts of UI text in scene logic.
- Keep localization simple: stable keys, default locale, fallback locale.
`),
    reference('phaser-accessibility-localization', 'accessibility-localization-checklist.md', `# Accessibility And Localization Checklist

Accessibility:

- Keyboard path exists for core gameplay and menus.
- Touch targets are large enough for mobile.
- Text is readable at phone and desktop sizes.
- Important UI has sufficient contrast.
- Reduced motion can limit shake, flashes, and heavy particles.
- Controls are documented in UI only when the game needs it.
- Error/game-over/restart states are reachable without precision input.

Localization:

- Player-facing strings use keys after the prototype grows.
- Default locale exists.
- Missing string falls back safely.
- Font supports chosen languages.
- Text boxes can fit longer translated strings.
- RTL support is not required unless requested.
`),
  );

  files.push(
    skill('phaser-release-platforms', 'Use when preparing a Phaser web game for release or platform targeting: itch.io, GitHub Pages, Netlify, Vercel, Yandex Games, CrazyGames, Poki-style portals, Telegram Mini Apps, PWA, fullscreen, orientation, safe area, asset paths, save storage, analytics placeholders, SDK boundaries, and build constraints.', `# Phaser Release Platforms

## Workflow

1. Read \`references/platform-targets.md\` before adding platform code or release config.
2. Identify the target platform and whether a project-specific integration pack exists.
3. Keep SDK calls behind \`src/game/platform/\` adapters.
4. Verify asset paths, fullscreen/orientation, safe areas, storage, and audio policies.
5. Build static output and test it locally before packaging.
6. Treat unsupported platforms as optional targets, not guaranteed integrations.

## Rules

- Do not scatter platform SDK calls through scenes.
- Do not promise a portal integration unless the SDK boundary is implemented.
- Avoid runtime CDNs unless the platform explicitly requires its own SDK path.
- Keep release notes clear about what is configured and what remains a placeholder.
`),
    reference('phaser-release-platforms', 'platform-targets.md', `# Platform Targets

Generic static hosting:

- GitHub Pages, Netlify, Vercel, itch.io.
- Check base path, asset URLs, HTTPS, and static output.

Game portals:

- Yandex Games: use the optional Yandex pack when enabled.
- CrazyGames/Poki-style portals: treat SDK as optional until adapter exists.
- Ads, pause/resume, leaderboard, and analytics need platform boundaries.

Telegram Mini Apps:

- Requires viewport/safe-area attention and SDK boundary.
- Save strategy may differ from plain localStorage.

PWA:

- Requires manifest, icons, service worker, offline strategy.
- Do not add by default for the first playable.

Release checklist:

- Build command passes.
- Game works from built \`dist/\`.
- No broken asset paths.
- Orientation and fullscreen behavior are intentional.
- Save/settings work after reload.
- Audio starts only after user gesture.
- Analytics calls are no-op placeholders unless configured.
`),
  );

  files.push(
    skill('phaser-ai-art-asset-brief', 'Use when planning game art assets for a Phaser project without generating the art directly: sprite lists, sizes, animation frames, style guide, palette, naming convention, export format, atlas plan, placeholder fallback, UI icons, tilesets, VFX sprites, and asset handoff briefs for image generators or artists.', `# Phaser AI Art Asset Brief

## Workflow

1. Read \`references/asset-brief-template.md\`.
2. List only the assets needed for the current playable slice first.
3. Define sizes, frame counts, naming, palette, and export format.
4. Separate runtime sprites, UI icons, backgrounds, VFX, tiles, and promotional art.
5. Include placeholder fallback names so coding can continue without final art.
6. Record asset ownership and licensing in \`public/assets/credits.md\` when assets are added.

## Rules

- Do not generate assets from copyrighted game art or brand references.
- Keep gameplay readability above decorative detail.
- Prefer small consistent spritesheets/atlases over many loose files when content grows.
- Keep briefs specific enough for an artist or image tool to produce usable files.
`),
    reference('phaser-ai-art-asset-brief', 'asset-brief-template.md', `# Asset Brief Template

Output:

- Style: pixel-inspired, clean vector, toy-like, tactical, paper/card, etc.
- Palette: 4-8 core colors plus UI neutrals.
- Camera/view: top-down, side-view, isometric-like, fixed board, card table.
- Sprite list:
  - \`player_idle_32x32.png\`
  - \`player_run_32x32_6frames.png\`
  - \`slime_idle_32x32_4frames.png\`
  - \`coin_spin_16x16_6frames.png\`
- UI list:
  - buttons, hearts, coin icon, upgrade icons, pause/restart icons.
- VFX list:
  - hit spark, pickup burst, level-up burst, dust puff.
- Tiles/backgrounds:
  - tile size, tileset dimensions, collision readability.
- Export:
  - PNG spritesheets or texture atlas JSON.
  - Lowercase kebab-case filenames.
  - Transparent background for sprites/UI.
- Placeholder fallback:
  - generated geometric textures or simple coded sprites until final art exists.
`),
  );

  return files;
}
