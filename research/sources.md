# Phaser Mobile/Desktop Game Creator Research

This document tracks sources for a generator that creates Phaser game projects and companion Agent Skills. The scope is intentionally narrow: Phaser games for mobile and desktop browser targets, with optional wrappers for installable mobile/desktop builds.

## Product Direction

Build a Phaser-first modular generator, not a universal project generator.

The generator should create:

- a Phaser + TypeScript + Vite project;
- a mobile/desktop-ready source layout;
- Phaser-specific skills and references;
- optional game modules selected by capability, not by genre;
- validation tooling that proves the game starts and renders.

The generator should not optimize for generic web apps, backend platforms, office docs, MCP servers, or non-Phaser engines in the first version.

## Source Roles

- `mirror-skill`: sync an upstream skill folder into a local source cache.
- `derive-skill`: create our own concise skill from upstream docs, examples, and local rules.
- `reference`: keep links or extracted notes for a generated skill to consult.
- `template`: use as a scaffold or scaffold inspiration.
- `optional-module`: enable only when the user chooses that capability.

## Tier 0: Required Sources

### Phaser Official Skills

Source: https://github.com/phaserjs/phaser/tree/master/skills

This is the most important Phaser source. It already divides Phaser knowledge by systems rather than game genres.

High-priority skills:

- `game-setup-and-config`
- `scenes`
- `loading-assets`
- `input-keyboard-mouse-touch`
- `scale-and-responsive`
- `game-object-components`
- `events-system`
- `data-manager`
- `physics-arcade`
- `physics-matter`
- `cameras`
- `tweens`
- `time-and-timers`
- `audio-and-sound`
- `particles`
- `tilemaps`
- `groups-and-containers`
- `text-and-bitmaptext`
- `animations`
- `sprites-and-images`
- `debugging-and-troubleshooting`
- `v3-to-v4-migration`
- `v4-new-features`

Use:

- Mirror these into a local source cache.
- Derive our own generated skills that map these systems into project folders and coding workflows.
- Keep Phaser 3/4 compatibility notes because official templates and external examples can target different major versions.

### Anthropic Skills

Source: https://github.com/anthropics/skills

Use only for skill format and skill quality, not as a broad source pack.

Relevant skills:

- `skill-creator`: how to structure and validate generated skills.
- `frontend-design`: useful for menus, HUD, launcher/editor UI, and responsive control panels.
- `webapp-testing`: useful for dev-server and browser validation workflows.

Use:

- Treat `skill-creator` as the skill factory rulebook.
- Keep generated `SKILL.md` files concise and trigger-focused.
- Put detailed Phaser notes under `references/`, not in giant skill bodies.

### Agent Skills Specification

Sources:

- https://agentskills.io/specification.md
- https://agentskills.io/skill-creation/best-practices.md
- https://agentskills.io/skill-creation/using-scripts.md
- https://agentskills.io/skill-creation/optimizing-descriptions.md
- https://agentskills.io/skill-creation/evaluating-skills.md

Use:

- Validate generated skill layout.
- Keep descriptions reliable for triggering.
- Put deterministic repeated tasks into scripts.

## Tier 1: Official Phaser Project Sources

### Create Phaser Game App

Source: https://phaser.io/tutorials/create-game-app

Use as the official reference for creating projects interactively. Phaser recommends Vite when starting with the create game app.

Use:

- Study its choices and template list.
- Prefer official Phaser templates over older community boilerplates.
- Consider invoking it from our generator only if it is deterministic enough for our workflow.

### Phaser Vite TypeScript Template

Source: https://github.com/phaserjs/template-vite-ts

Use as the default scaffold candidate. It provides Phaser, Vite, TypeScript, hot reload, build scripts, `public/assets`, and `src/game/scenes`.

Use:

- Clone or degit as the base.
- Layer our architecture on top: systems, entities, state, UI, content, input, save, testing.
- Keep Vite and TypeScript as defaults.

### Phaser Vite JavaScript Template

Source: https://github.com/phaserjs/template-vite

Use as a fallback for JavaScript-only projects. The first version should still default to TypeScript.

Use:

- Reference for simpler scaffold shape.
- Do not make JS the default unless the user explicitly asks.

### Phaser Examples

Source: https://github.com/phaserjs/examples

Use as the practical behavior corpus.

Use:

- Index examples by Phaser system: input, physics, cameras, tweens, particles, tilemaps, audio, loader, animation.
- Link generated skills to relevant example groups.
- Use examples to build sample module demos.

### Phaser Docs And API

Sources:

- https://docs.phaser.io/
- https://github.com/phaserjs/phaser

Use:

- Prefer official docs for API correctness.
- Use source code when docs and examples disagree.
- Create `references/phaser-versioning.md` to track Phaser 3 vs Phaser 4 differences.

## Tier 2: Mobile/Desktop Fundamentals

### Phaser Scale Manager

Source: https://docs.phaser.io/phaser/concepts/scale-manager

Use for responsive canvas, parent sizing, fullscreen, resize behavior, and mobile/desktop viewport rules.

Generator implications:

- Always generate a `scale` configuration.
- Always create a central responsive layout helper.
- Include mobile orientation and safe-area notes.
- Test at phone, tablet, and desktop viewport sizes.

### Phaser Input

Source: https://docs.phaser.io/phaser/concepts/input

Use for unified pointer input, keyboard, gamepad, mouse wheel, drag/drop, and multi-touch.

Generator implications:

- Always generate an input abstraction layer.
- Treat pointer events as the cross-platform default.
- Add keyboard bindings for desktop.
- Add touch controls only when the game needs continuous movement or mobile-only actions.
- Keep gamepad optional.

### PWA Web App Manifest

Source: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest

Use for installable web builds on mobile and desktop.

Generator implications:

- Optional `pwa` module.
- Generate manifest, icons, display mode, orientation hints, and theme/background color.
- Pair with a service worker only when offline/caching strategy is selected.

### Vite PWA

Source: https://github.com/vite-pwa/vite-plugin-pwa

Use if the generated project needs PWA support.

Generator implications:

- Optional `pwa-vite` module.
- Prefer generated config over hand-written service worker code for MVP.

### Capacitor

Source: https://github.com/ionic-team/capacitor

Use only when the user wants mobile app wrapping for iOS/Android beyond mobile browser/PWA.

Generator implications:

- Optional `mobile-wrapper-capacitor` module.
- Keep outside core MVP.
- Generate after the web game build is healthy.

### Electron

Source: https://github.com/electron/electron

Use only when the user wants desktop app wrapping.

Generator implications:

- Optional `desktop-wrapper-electron` module.
- Keep outside core MVP.
- Prefer browser/PWA desktop first, Electron later.

### Tauri

Source: https://github.com/tauri-apps/tauri

Use as a lighter desktop wrapper option when native desktop packaging matters.

Generator implications:

- Optional `desktop-wrapper-tauri` module.
- Do not include until the core Phaser web game scaffold is solid.

## Tier 3: Phaser Game Modules

### rexrainbow Phaser Plugins

Source: https://github.com/rexrainbow/phaser3-rex-notes

Use for Phaser UI widgets and utilities, especially when generated games need richer in-canvas menus, dialog boxes, scrollable panels, or virtual controls.

Generator implications:

- Optional `rex-ui` module.
- Check Phaser 3/4 compatibility before defaulting to it.

### Phaser Editor 2D

Source: https://github.com/PhaserEditor2D

Use only when the user wants editor-compatible asset or scene workflows.

Generator implications:

- Optional `phaser-editor-pipeline` module.
- Do not force editor-specific conventions into every project.

### Tiled

Source: https://github.com/mapeditor/tiled

Use for tilemap-based games.

Generator implications:

- Optional `tilemap-pipeline` module.
- Generate conventions for maps, tilesets, collision layers, and object layers.

### Grid Engine

Source: https://github.com/Annoraaq/grid-engine

Use for grid movement and RPG-like tile movement.

Generator implications:

- Optional `grid-movement` module.
- Pair with tilemaps.

### Aseprite

Source: https://github.com/aseprite/aseprite

Use for pixel-art animation workflows.

Generator implications:

- Optional `aseprite-pipeline` module.
- Generate import/export conventions for spritesheets and animation JSON.

### TexturePacker Phaser Guide

Source: https://www.codeandweb.com/texturepacker/tutorials/how-to-create-sprite-sheets-for-phaser3

Use for texture atlas pipeline guidance.

Generator implications:

- Optional `texture-atlas-pipeline` module.
- Generate predictable atlas paths and loader conventions.

## Tier 4: Architecture Choices

### Simple Phaser Objects And Systems

Use as the default architecture.

Generated folders:

- `src/game/config`
- `src/game/scenes`
- `src/game/systems`
- `src/game/entities`
- `src/game/ui`
- `src/game/input`
- `src/game/state`
- `src/game/assets`
- `src/game/audio`
- `src/game/content`
- `src/game/save`
- `src/game/utils`

Rule:

- Default to simple TypeScript classes and Phaser scene composition.
- Add ECS only when the game clearly needs many entities, query-heavy systems, or data-oriented simulation.

### bitECS

Source: https://github.com/NateTheGreatt/bitECS

Use only for performance-sensitive or entity-heavy games.

Generator implications:

- Optional `ecs-bitecs` module.
- Never default to ECS for small Phaser games.

### Miniplex

Source: https://github.com/hmans/miniplex

Use as a lighter ECS-style option for TypeScript projects.

Generator implications:

- Optional `ecs-miniplex` module.
- Better fit than heavy ECS when the game needs simple entity queries.

### EventEmitter3

Source: https://github.com/primus/eventemitter3

Use only if project-wide events need to live outside Phaser scenes.

Generator implications:

- Optional `event-bus` module.
- Prefer Phaser events by default.

## Tier 5: Testing And Validation

### Playwright

Source: https://github.com/microsoft/playwright

Use for generated project validation.

Generator implications:

- Add optional browser smoke tests.
- Verify dev server starts.
- Verify canvas exists and is nonblank.
- Test phone and desktop viewport sizes.

### Vitest

Source: https://github.com/vitest-dev/vitest

Use for pure TypeScript game logic.

Generator implications:

- Optional `unit-testing` module.
- Test content validation, save migrations, state machines, economy/balance functions, procedural generation.

### Vite

Source: https://github.com/vitejs/vite

Use as the default build tool through the official Phaser template.

Generator implications:

- Preserve Vite conventions.
- Generate `dev`, `build`, `preview`, and validation scripts.

## Tier 6: Design And Game Feel References

### Game Programming Patterns

Source: https://gameprogrammingpatterns.com/

Use as conceptual architecture background for game loop, state, command, component, and event queue patterns.

Use:

- Translate ideas into Phaser-specific conventions.
- Do not make it a generic architecture rabbit hole.

### Red Blob Games

Source: https://www.redblobgames.com/

Use for grid/pathfinding/map references.

Use:

- Optional `grid-pathfinding` reference.
- Useful for tile, hex, strategy, and map games.

### The Nature of Code

Source: https://natureofcode.com/

Use for motion, particles, steering, forces, procedural feel.

Use:

- Optional `procedural-motion` reference.

### easings.net

Source: https://easings.net/

Use for tween and animation tuning vocabulary.

Use:

- Reference from generated gamefeel and UI motion skills.

## Sources To Avoid In Core MVP

Avoid these as core dependencies for now:

- generic React app templates;
- backend-first game stacks;
- multiplayer servers;
- MCP/plugin builders;
- office/document skills;
- non-Phaser game engines;
- heavy Electron/Capacitor/Tauri integration before the web target is solid.

They can be revisited as optional modules later, but they should not shape the first generator.

## Suggested Generated Skill Pack

Core skills:

- `phaser-project-architect`: folder architecture, module selection, boundaries, Phaser version rules.
- `phaser-scene-workflow`: boot, preload, menu, gameplay, UI overlay, transitions.
- `phaser-assets-pipeline`: asset manifest, loader keys, atlases, audio, fonts, tilemaps.
- `phaser-input-mobile-desktop`: pointer-first input, keyboard, touch controls, gamepad optional.
- `phaser-responsive-layout`: scale manager, viewport rules, safe areas, fullscreen, orientation.
- `phaser-game-systems`: systems/entities/state/events/save boundaries.
- `phaser-ui-hud`: HUD, menus, dialogs, responsive in-canvas UI.
- `phaser-gamefeel`: camera, tweens, particles, audio cues, hit pause, feedback.
- `phaser-testing`: Vite dev server, Playwright canvas smoke tests, mobile/desktop viewports, Vitest logic tests.
- `phaser-skill-pack-maintainer`: sync upstream Phaser skills and validate generated skills.

Optional skills/modules:

- `phaser-arcade-physics`
- `phaser-matter-physics`
- `phaser-tilemap-pipeline`
- `phaser-grid-movement`
- `phaser-ecs`
- `phaser-pwa`
- `phaser-mobile-wrapper`
- `phaser-desktop-wrapper`
- `phaser-editor-pipeline`
- `phaser-card-collection`

## MVP Source Priority

First implementation should use only:

1. Phaser official skills as the system knowledge base.
2. Anthropic `skill-creator` plus Agent Skills spec as the skill-generation rules.
3. Phaser Vite TypeScript template or Create Phaser Game App as the scaffold base.
4. Phaser docs for input and scale manager.
5. Playwright smoke checks for mobile and desktop canvas validation.

Everything else should be optional and disabled by default.

First generated project should prove:

- desktop canvas renders;
- mobile viewport renders without broken scaling;
- pointer input works;
- keyboard input works on desktop;
- assets load through a manifest or centralized loader convention;
- at least one scene transition works;
- project-local skills are generated and triggerable by name/description.

## Open Research Questions

- Should official Phaser skills be mirrored into each generated project or kept once in a central source cache?
- Should the default generated project target Phaser 4 immediately, or keep a Phaser 3 mode because most community examples/plugins are still Phaser 3-focused?
- Should the MVP generator call `npm create @phaserjs/game@latest`, clone `template-vite-ts`, or maintain a local template snapshot?
- Should PWA support be default or optional?
- What is the minimum browser smoke test that catches blank canvas, wrong scaling, missing assets, and mobile viewport regressions?

## Second Research Pass

See `research/deeper-source-pass.md` for the newer source pass. Important additions:

- Phaser official skills can be read from GitHub and pinned npm/unpkg package versions.
- Phaser Editor v5 is valuable as an optional editor-compatible workflow.
- rexUI/rex plugins are the main optional source for rich in-canvas UI.
- Virtual joystick/mobile controls deserve their own optional module.
- Yandex should be the first publishing pack, with YouTube Playables, CrazyGames, and Poki as future packs.
- Community Phaser agent skills exist, but should be audited before any ideas are imported.
