import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function coreRuntimeSkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

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


  return files;
}
