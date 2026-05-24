import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function architectureSkills(): GeneratedFile[] {
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


  return files;
}
