# Deeper Source Pass

Date: 2026-05-24

Scope: Phaser mobile/desktop web games, generated project architecture, local agent skills, and optional publishing packs.

## New Findings

### Phaser 4 Skills Are Also Distributed With Phaser

Source:

- https://app.unpkg.com/phaser@4.1.0/files/skills/game-setup-and-config/SKILL.md
- https://github.com/phaserjs/phaser/tree/master/skills
- https://phaser.io/phaser4

Finding:

Phaser skills are not only visible in the GitHub repository. They are also available inside the Phaser npm package through unpkg paths. This is useful for a source-sync feature because we can pin to an npm package version instead of scraping GitHub.

Implication:

- Add a future `sync-phaser-skills` source mode:
  - GitHub `master` for latest source.
  - npm/unpkg `phaser@x.y.z/skills/...` for pinned versions.
- Keep generated projects Phaser 3 by default for plugin/example compatibility.
- Add a `phaser-version-strategy` reference/skill because Phaser 4 is now important and has different renderer/features.

### Phaser Official Template Set Is Bigger Than Vite TS

Sources:

- https://github.com/phaserjs/template-vite-ts
- https://github.com/phaserjs/template-vite
- https://phaser.io/tutorials/create-game-app
- https://phaser.io/news/2024/03/phaser-3-and-react-typescript-template
- https://phaser.io/news/2024/03/official-phaser-3-and-svelte-template

Finding:

The Vite TypeScript template should stay default, but Phaser also has official React and Svelte templates. These should not enter core because the current product is not a generic web-app generator, but they are useful for optional future UI-heavy games or editor dashboards.

Implication:

- Keep default: Phaser + Vite + TypeScript.
- Add future optional module: `web-ui-bridge`, only when the game explicitly needs complex DOM UI.
- Do not add React/Svelte to generated projects by default.

### Phaser Learn, Sandbox, And Launcher Are Useful For Beginner Onboarding

Sources:

- https://phaser.io/learn
- https://phaser.io/news/2025/04/make-a-2d-game-in-5-mins-with-no-experience

Finding:

Phaser positions Launcher/Sandbox/tutorials as beginner-friendly tools. Our generated repo should mimic that clarity: a person opening the archive should immediately see what to run, what to ask the agent, and where the game code lives.

Implication:

- Keep `START_HERE.md` and `AGENTS.md` as first-class generated files.
- Add a future `docs/first-playable-loop.md` template.
- Add a future `skill`: `phaser-beginner-onboarding`, if the repo becomes education-focused.

### Phaser Editor v5 Is More Useful Than Expected

Sources:

- https://docs.phaser.io/phaser-editor
- https://docs.phaser.io/phaser-editor/next/scene-editor/intro
- https://docs.phaser.io/phaser-editor/next/scene-editor/add-object

Finding:

Phaser Editor v5 includes Asset Pack Editor, Scene Editor, Animations Editor, prefabs, user components, script nodes, tilemaps, Arcade physics, filters, Spine animations, particle emitters, and VS Code integration. The Scene Editor compiles scene data into readable Phaser code, which is agent-friendly.

Implication:

- Add optional future module: `phaser-editor-compatible`.
- Add generated conventions for:
  - asset pack files,
  - scene editor output folder,
  - generated code ownership comments,
  - agent rule: do not casually overwrite editor-generated files.
- Not core MVP unless the user selects editor compatibility.

### rexUI / rex Plugins Are The Main Phaser UI Source

Sources:

- https://github.com/rexrainbow/phaser3-rex-notes
- https://rexrainbow.github.io/phaser3-rex-notes/docs/site/ui-overview/
- https://phaser.discourse.group/t/phaser-3-rexui-plugins/384

Finding:

rexUI covers many UI patterns Phaser does not provide as first-class UI widgets: dialogs, tabs, tables, menus, textboxes, sliders, labels, sizers, grid tables, and layout containers. There is also Phaser 4-oriented documentation/package naming (`phaser4-rex-plugins`).

Implication:

- Add optional module: `phaser-rex-ui`.
- Keep it optional because generated vanilla Phaser projects should not depend on plugin ecosystems by default.
- If selected, add a skill/reference for:
  - plugin installation via npm, not remote CDN,
  - UI scene integration,
  - mobile touch target sizing,
  - Phaser 3/4 compatibility checks.

### Virtual Joystick Should Be Its Own Optional Module

Sources:

- https://toolkit.cassino.dev/phaser-virtual-joystick/
- https://phaser.discourse.group/t/phaser-3-rexvirtualjoystick-plugin/385
- https://phaser.io/news/2019/03/phaser-backer-examples-march

Finding:

Mobile controls deserve more than a generic input abstraction. Virtual joystick support should be optional and explicit because not every game needs continuous mobile movement.

Implication:

- Add optional module: `phaser-virtual-controls`.
- Add skill hook under `phaser-input-mobile-desktop`:
  - use pointer events for simple games,
  - add joystick only for continuous movement/action games,
  - test touch target size and thumb reach.

### Publishing Packs Should Be Modular Like Yandex

Sources:

- Local `yandex.md`
- https://phaser.io/tutorials/creating-youtube-playables-with-phaser
- https://docs.crazygames.com/
- https://docs.crazygames.com/sdk/intro/
- https://sdk.poki.com/phaser.html
- https://developers.poki.com/guide/web-game-engines

Finding:

Yandex is not the only HTML5 game publishing target with SDK/events/ads/build requirements. Phaser has an official YouTube Playables tutorial. CrazyGames and Poki both document HTML5 SDK publishing, and Poki explicitly emphasizes small web-game download sizes.

Implication:

- Keep Yandex as the first optional publish pack because we already have a detailed local skill.
- Add future optional packs:
  - `youtube-playables-publish`
  - `crazygames-publish`
  - `poki-publish`
- Do not add them to core by default; publishing targets have conflicting SDK and packaging requirements.

### Existing Community Phaser Agent Skills Exist But Should Be Audited

Sources:

- https://terminalskills.io/skills/phaser
- https://eliteai.tools/agent-skills/phaser
- https://claudskills.com/skills/phaser-gamedev/

Finding:

There are community Phaser skills outside official Phaser. They may be useful for comparison, but the trust level is lower than official Phaser skills and Anthropic skill-creator.

Implication:

- Do not import community skills automatically.
- Add an audit task later: compare their trigger descriptions, workflows, and missing coverage against our generated skill pack.
- Only copy ideas after manual review and attribution.

## Recommended Additions To Generator

### Near-Term

1. Add `phaser-version-strategy` generated reference:
   - Phaser 3 default,
   - Phaser 4 awareness,
   - when to migrate,
   - how to sync official skills by version.

2. Add optional `Yandex Games` pack fully:
   - already started in app UI,
   - keep refining SDK integration and validation scripts from local `yandex.md`.

3. Add `docs/first-playable-loop.md` to generated archives:
   - beginner-friendly,
   - agent-friendly,
   - scoped to Phaser scenes/input/state.

4. Add `sources` badges in the site for:
   - Phaser Official Skills,
   - Anthropic Skill Creator,
   - Agent Skills Spec,
   - Yandex Games optional.

### Medium-Term

1. Add optional `phaser-editor-compatible`.
2. Add optional `phaser-rex-ui`.
3. Add optional `phaser-virtual-controls`.
4. Add optional publishing packs:
   - YouTube Playables,
   - CrazyGames,
   - Poki.

### Do Not Add To Core Yet

- React/Svelte templates.
- Multiplayer stacks.
- Electron/Capacitor/Tauri.
- ECS libraries.
- Community skills without audit.

## Research Questions For Next Pass

- What exact list of Phaser official skills exists in `phaser@latest/skills`, and can we programmatically index it from npm/unpkg?
- Should generated projects use `Phaser.Scale.FIT` by default or switch to `RESIZE` for Yandex/publishing targets?
- Can we create a unified `platform-adapter` interface so Yandex/CrazyGames/Poki/YouTube packs do not fight each other?
- Should the generated archive include pinned upstream source URLs in every skill frontmatter or in a central source registry only?
