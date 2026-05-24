import type { GeneratedFile, ProjectOptions } from '../types';

export function skillPack(options: ProjectOptions): GeneratedFile[] {
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
