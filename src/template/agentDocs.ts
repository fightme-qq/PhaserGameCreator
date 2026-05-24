import type { GeneratedFile, ProjectOptions } from '../types';
import { getSkillNames } from './skillNames';

export function agentDocs(options: ProjectOptions): GeneratedFile[] {
  const skillNames = getSkillNames(options);
  return [
    {
      path: 'AGENTS.md',
      content: `# Agent Instructions For ${options.title}

This repository is a Phaser mobile/desktop game project. Treat Phaser game development as the primary domain.

## First Read Order

1. \`START_HERE.md\`
2. \`AGENT_WORKFLOW.md\`
3. \`npm run agent:audit\` if dependencies are installed
4. \`docs/game-design-intake.md\`
5. \`docs/first-playable-contract.md\`
6. \`docs/validation-matrix.md\`
7. \`docs/quality-gates.md\`
8. \`docs/game-creator-guide.md\`
9. \`skills/README.md\`
10. \`skills/_meta/task-map.md\`
11. The specific \`skills/<skill-name>/SKILL.md\` for the task
12. Relevant source files under \`src/game/\`

## Core Rule

Follow \`AGENT_WORKFLOW.md\` before coding. Use the project-local skills before making architecture, scene, input, layout, UI, asset, gamefeel, or testing changes.

When starting a task, say which skill you are using:

\`\`\`text
Using phaser-scene-workflow because this changes scene lifecycle and transitions.
\`\`\`

## Skill Routing

- Architecture or folder boundaries: \`phaser-project-architect\`
- Boot/preload/menu/gameplay/UI scenes: \`phaser-scene-workflow\`
- Asset keys, loaders, manifests, atlases, audio: \`phaser-assets-pipeline\`
- Touch, pointer, keyboard, mouse, gamepad: \`phaser-input-mobile-desktop\`
- Mobile/desktop scaling, safe areas, orientation: \`phaser-responsive-layout\`
- Systems/entities/state/events/save: \`phaser-game-systems\`
- HUD, menu, dialogs, overlays: \`phaser-ui-hud\`
- Tweens, camera, particles, juice, audio feedback: \`phaser-gamefeel\`
- Spritesheets, texture atlases, frame animation, animation states: \`phaser-sprite-animation\`
- Tiled maps, tile layers, object layers, tile collisions: \`phaser-tilemaps-tiled\`
- Music, SFX, mute, mobile audio unlock, volume settings: \`phaser-audio-sfx\`
- Debug overlays, FPS, pools, low-end mobile performance: \`phaser-debug-performance\`
- Placeholder sprites, coded UI visuals, SVG/canvas art direction: \`phaser-programmatic-art\`
- Vite, Playwright, canvas smoke tests, Vitest: \`phaser-testing\`
- Updating or adding skills: \`phaser-skill-pack-maintainer\`
${options.includeYandexGames ? '- Yandex Games SDK, moderation, ads, localization, build ZIP: `yandex-publish`' : ''}
- Turning a new idea into the first playable: start with \`docs/game-creator-guide.md\`, then \`phaser-project-architect\`
- Vague idea intake: \`docs/game-design-intake.md\`
- First playable definition of done: \`docs/first-playable-contract.md\`
- Common feature implementation: \`docs/feature-recipes/\`
- Genre starting point: \`docs/genre-blueprints/\`
- Verification before final answer: \`docs/validation-matrix.md\`
- Quality gates before calling work done: \`docs/quality-gates.md\`
- Reusable module starting points: \`templates/modules/\`

## Project Boundaries

- Keep Phaser runtime code under \`src/game/\`.
- Keep pure game rules independent from Phaser when practical, so they can be unit-tested.
- Use pointer input as the cross-platform baseline.
- ${options.target === 'mobile' ? 'Prioritize touch ergonomics, safe areas, and phone viewport checks.' : 'Prioritize keyboard/mouse ergonomics, readable wide layouts, and desktop viewport checks.'}
- Add keyboard shortcuts for desktop ergonomics.
- Keep mobile layout readable and touch targets large enough.
- Do not add backend, multiplayer, React, Electron, Capacitor, or ECS unless the human explicitly asks.
${options.includeYandexGames ? '- Keep Yandex Games requirements in mind before any release build: no external CDN, SDK `/sdk.js`, LoadingAPI.ready, GameplayAPI pause/resume, localized text, and Python ZIP packaging.' : ''}

## Change Workflow

1. Follow \`AGENT_WORKFLOW.md\`.
2. Identify the task category.
3. Read the matching skill.
4. Check \`templates/modules/\` if the task needs a common system.
5. Inspect existing files before editing.
6. Make the smallest coherent change.
7. Run the most relevant verification:
   - \`npm run build\`
   - \`npm run dev\`
   - \`npm run agent:audit\`
   - \`npm run test:smoke\` if Playwright is enabled
8. Update \`docs/decisions/\` if architecture, scene flow, input strategy, scale mode, assets, publishing, or core rules changed.
9. Report what changed and what was verified.

## Skill Maintenance

Use \`skills/_meta/update-skills.md\` before editing skills. Skills should stay concise, task-triggered, and Phaser-specific.
`,
    },
    {
      path: 'CLAUDE.md',
      content: sharedAgentEntry('Claude Code', options, skillNames),
    },
    {
      path: 'GEMINI.md',
      content: sharedAgentEntry('Gemini CLI', options, skillNames),
    },
    {
      path: '.github/copilot-instructions.md',
      content: sharedAgentEntry('GitHub Copilot', options, skillNames),
    },
    {
      path: '.cursor/rules/phaser-game-creator.mdc',
      content: `---
description: Use project-local Phaser skills before changing this game.
globs:
  - "**/*"
alwaysApply: true
---

${sharedAgentEntry('Cursor', options, skillNames)}
`,
    },
    {
      path: '.ai/agent-entry.md',
      content: sharedAgentEntry('Any AI coding agent', options, skillNames),
    },
    {
      path: '.ai/skill-manifest.json',
      content: JSON.stringify(
        {
          projectType: 'phaser-mobile-desktop-game',
          generatedBy: 'Phaser Game Creator',
          primaryTarget: options.target,
          yandexGames: options.includeYandexGames,
          firstRead: [
            'AGENTS.md',
            'AGENT_WORKFLOW.md',
            'scripts/agent-audit.mjs',
            'docs/game-design-intake.md',
            'docs/first-playable-contract.md',
            'docs/validation-matrix.md',
            'docs/quality-gates.md',
            'docs/game-creator-guide.md',
            'docs/first-playable-loop.md',
            'skills/README.md',
            'skills/_meta/task-map.md',
            'skills/_meta/source-registry.md',
          ],
          agentOperatingLoop: 'AGENT_WORKFLOW.md',
          designIntake: 'docs/game-design-intake.md',
          firstPlayableContract: 'docs/first-playable-contract.md',
          validationMatrix: 'docs/validation-matrix.md',
          qualityGates: 'docs/quality-gates.md',
          featureRecipes: 'docs/feature-recipes/',
          genreBlueprints: 'docs/genre-blueprints/',
          moduleTemplates: 'templates/modules/',
          decisions: 'docs/decisions/',
          skills: skillNames.map((name) => ({
            name,
            path: `skills/${name}/SKILL.md`,
          })),
          routing: {
            architecture: 'phaser-project-architect',
            scenes: 'phaser-scene-workflow',
            assets: 'phaser-assets-pipeline',
            input: 'phaser-input-mobile-desktop',
            responsiveLayout: 'phaser-responsive-layout',
            systems: 'phaser-game-systems',
            ui: 'phaser-ui-hud',
            gamefeel: 'phaser-gamefeel',
            spriteAnimation: 'phaser-sprite-animation',
            tilemaps: 'phaser-tilemaps-tiled',
            audio: 'phaser-audio-sfx',
            debugPerformance: 'phaser-debug-performance',
            programmaticArt: 'phaser-programmatic-art',
            testing: 'phaser-testing',
            skillMaintenance: 'phaser-skill-pack-maintainer',
            ...(options.includeYandexGames ? { yandexPublishing: 'yandex-publish' } : {}),
          },
        },
        null,
        2,
      ),
    },
    {
      path: 'skills/README.md',
      content: `# Project Skills

These skills are local operating instructions for AI agents working on this Phaser game.

Agents should not treat these as passive docs. Pick a skill before changing code.

## Core Skills

${skillNames.map((name) => `- \`${name}\`: see \`skills/${name}/SKILL.md\``).join('\n')}

## How To Use

1. Read \`skills/_meta/task-map.md\`.
2. Open the matching \`SKILL.md\`.
3. Follow its workflow.
4. If a skill is missing or stale, use \`phaser-skill-pack-maintainer\`.

## Human Shortcut

Ask your agent:

\`\`\`text
Read AGENTS.md and skills/README.md. Then tell me which skill you would use for the next task.
\`\`\`
`,
    },
    {
      path: 'skills/_meta/task-map.md',
      content: `# Task Map

Use this map to choose the correct skill.

| Task | Skill |
| --- | --- |
| Plan project architecture, folders, boundaries | \`phaser-project-architect\` |
| Add or refactor scenes | \`phaser-scene-workflow\` |
| Load images, spritesheets, atlases, audio, fonts, tilemaps | \`phaser-assets-pipeline\` |
| Add touch, mouse, keyboard, pointer, gamepad controls | \`phaser-input-mobile-desktop\` |
| Fix mobile/desktop canvas size, safe area, orientation | \`phaser-responsive-layout\` |
| Add gameplay systems, entities, state, save, events | \`phaser-game-systems\` |
| Build HUD, menus, dialogs, overlays | \`phaser-ui-hud\` |
| Improve feel with tweens, camera, particles, audio feedback | \`phaser-gamefeel\` |
| Load, slice, animate, or debug spritesheets and texture atlases | \`phaser-sprite-animation\` |
| Build tile-based worlds, Tiled maps, collision layers, object spawns | \`phaser-tilemaps-tiled\` |
| Add music, SFX, mute/volume, mobile audio unlock | \`phaser-audio-sfx\` |
| Add debug overlays, FPS checks, object pools, mobile performance fixes | \`phaser-debug-performance\` |
| Create placeholder art, coded UI visuals, SVG/canvas effects without stock assets | \`phaser-programmatic-art\` |
| Add tests, smoke checks, build validation | \`phaser-testing\` |
| Update, add, or validate skills | \`phaser-skill-pack-maintainer\` |
${options.includeYandexGames ? '| Publish to Yandex Games, SDK, moderation, submission ZIP | `yandex-publish` |\n' : ''}

If multiple skills apply, start with architecture, then scene/input/layout, then implementation details.
`,
    },
    {
      path: 'skills/_meta/update-skills.md',
      content: `# Updating Skills

Skills are part of the repo's agent operating system. Keep them small, current, and Phaser-specific.

## Update Rules

- Keep \`SKILL.md\` concise.
- Put detailed notes in \`references/\` when a skill grows too large.
- Write descriptions so agents know exactly when to trigger the skill.
- Do not add generic web-app guidance unless it directly supports the Phaser game.
- Add examples only when they prevent repeated mistakes.

## Suggested Upstream Checks

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Anthropic skill creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
- Agent Skills spec: https://agentskills.io/specification.md

## Skill Edit Checklist

1. Does the skill still describe a Phaser game task?
2. Is the frontmatter description trigger-focused?
3. Are instructions actionable for a coding agent?
4. Did you update \`skills/README.md\` or \`skills/_meta/task-map.md\` if routing changed?
5. Can a new agent understand what to do without conversation history?
`,
    },
    {
      path: 'skills/_meta/source-registry.md',
      content: `# Source Registry For Agents

Use these sources when a task needs current Phaser or Agent Skills knowledge.

## Primary Sources

- Phaser official skills: https://github.com/phaserjs/phaser/tree/master/skills
- Phaser docs: https://docs.phaser.io/
- Phaser examples: https://github.com/phaserjs/examples
- Phaser Vite TypeScript template: https://github.com/phaserjs/template-vite-ts
- Agent Skills spec: https://agentskills.io/specification.md
- Anthropic skill creator: https://github.com/anthropics/skills/tree/main/skills/skill-creator
${options.includeYandexGames ? '- Yandex Games SDK docs: https://yandex.com/dev/games/doc/en/sdk/sdk-about\n- Yandex Games requirements: https://yandex.ru/dev/games/doc/ru/concepts/requirements' : ''}

## Update Policy

- Use official Phaser sources first for Phaser APIs.
- Use project-local skills first for repository workflow.
- When official sources disagree with local skills, update the local skill and explain why.
- Keep this project focused on Phaser mobile/desktop games.
- Do not introduce unrelated framework guidance into core skills.

## Version Notes

This generated project starts with Phaser 3 because the Phaser 3 ecosystem has broad examples and plugin support. If upgrading to Phaser 4, use the official Phaser migration skills/docs before changing APIs.
`,
    },
    {
      path: 'skills/_meta/agent-prompts.md',
      content: `# Agent Prompts

Use these prompts when opening this repo in Codex, Claude, Gemini, or another coding agent.

## First Session

\`\`\`text
Read START_HERE.md, AGENTS.md, AGENT_WORKFLOW.md, docs/game-design-intake.md, docs/first-playable-contract.md, docs/validation-matrix.md, skills/README.md, and skills/_meta/task-map.md. Then explain how this Phaser project is organized and which workflow you will follow.
\`\`\`

## Audit This Repo

\`\`\`text
Run npm run agent:audit, then summarize the available skills, scenes, recipes, blueprints, module templates, and validation commands.
\`\`\`

## Build First Playable

\`\`\`text
Use AGENT_WORKFLOW.md, docs/game-design-intake.md, docs/first-playable-contract.md, phaser-project-architect, phaser-scene-workflow, phaser-input-mobile-desktop, and phaser-responsive-layout. Propose and implement the smallest playable loop for this game.
\`\`\`

## From One Sentence

\`\`\`text
Use AGENT_WORKFLOW.md. My game idea is: [one sentence]. Infer missing details, propose 3 tiny first playable loops, recommend the smallest, then implement it.
\`\`\`

## Use A Genre Blueprint

\`\`\`text
Use docs/genre-blueprints/ and the matching Phaser skills. Turn this genre into the smallest first playable: [genre or reference].
\`\`\`

## Improve Mobile/Desktop Feel

\`\`\`text
Use phaser-input-mobile-desktop, phaser-responsive-layout, and phaser-gamefeel. Improve the controls and feedback for both phone and desktop.
\`\`\`

## Add Assets

\`\`\`text
Use phaser-assets-pipeline. Add the requested assets through the manifest and update preload usage without scattering asset keys.
\`\`\`

## Update Skills

\`\`\`text
Use phaser-skill-pack-maintainer. Check skills/_meta/source-registry.md and update the local skill pack while keeping it Phaser mobile/desktop focused.
\`\`\`
`,
    },
  ];
}

function sharedAgentEntry(agentName: string, options: ProjectOptions, skillNames: string[]): string {
  return `# ${agentName} Instructions

This repository is a generated Phaser mobile/desktop game project. It includes a local skill pack. Use those skills before changing code.

## Immediate Startup

When opening this repository, assume these files are relevant even if the user did not mention them:

1. \`AGENTS.md\`
2. \`AGENT_WORKFLOW.md\`
3. \`scripts/agent-audit.mjs\`
4. \`docs/game-design-intake.md\`
5. \`docs/first-playable-contract.md\`
6. \`docs/validation-matrix.md\`
7. \`docs/quality-gates.md\`
8. \`skills/README.md\`
9. \`skills/_meta/task-map.md\`
10. \`templates/modules/\`
11. \`.ai/skill-manifest.json\`

## Project Facts

- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${options.target === 'mobile' ? 'mobile-first browser game' : 'desktop-first browser game'}
- Yandex Games pack: ${options.includeYandexGames ? 'enabled' : 'disabled'}

## Skill Rule

Before architecture, scene, input, layout, assets, UI, gamefeel, testing, publishing, or skill-maintenance work:

1. Follow \`AGENT_WORKFLOW.md\`.
2. Run \`npm run agent:audit\` when available.
3. Choose the matching skill from \`skills/_meta/task-map.md\`.
4. Read \`skills/<skill-name>/SKILL.md\`.
5. Check \`templates/modules/\` before writing common systems from scratch.
6. State which skill you are using.
7. Follow that skill's workflow.

## Available Skills

${skillNames.map((name) => `- \`${name}\` at \`skills/${name}/SKILL.md\``).join('\n')}

## Default Routing

- Architecture: \`phaser-project-architect\`
- Scenes: \`phaser-scene-workflow\`
- Assets: \`phaser-assets-pipeline\`
- Input: \`phaser-input-mobile-desktop\`
- Responsive layout: \`phaser-responsive-layout\`
- Systems/state/save/events: \`phaser-game-systems\`
- HUD/menus/overlays: \`phaser-ui-hud\`
- Game feel: \`phaser-gamefeel\`
- Spritesheets/atlases/animation states: \`phaser-sprite-animation\`
- Tilemaps/Tiled worlds: \`phaser-tilemaps-tiled\`
- Audio/music/SFX: \`phaser-audio-sfx\`
- Debug overlays/performance: \`phaser-debug-performance\`
- Programmatic placeholder art and coded visuals: \`phaser-programmatic-art\`
- Tests/build validation: \`phaser-testing\`
- Skills/docs updates: \`phaser-skill-pack-maintainer\`
${options.includeYandexGames ? '- Yandex Games publishing: `yandex-publish`' : ''}

Keep the project Phaser-focused. Do not add unrelated frameworks, backend services, wrappers, or publishing SDKs unless the user asks.
`;
}

