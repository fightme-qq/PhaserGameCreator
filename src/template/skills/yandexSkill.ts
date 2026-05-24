import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function yandexSkill(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

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

  return files;
}
