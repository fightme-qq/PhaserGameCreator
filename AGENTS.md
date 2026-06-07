# Agent Instructions For Phaser Game Creator

This repository is not a Phaser game. It is a Vite + TypeScript web app that generates ZIP archives containing agent-ready Phaser game projects.

The main product is the generated project structure: Phaser source files, docs, local skills, agent instructions, validation scripts, and optional packs such as Idle / Incremental and Yandex Games publishing.

## Project Map

- `src/main.ts`: browser UI, form state, ZIP creation, download behavior.
- `src/projectTemplate.ts`: combines generated file groups into one archive.
- `src/template/agentDocs.ts`: generated `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, skill index, task map, and agent-facing metadata.
- `src/template/rootDocs.ts`: generated `START_HERE.md`, `GAME_BRIEF.md`, workflow docs, and human onboarding docs.
- `src/template/phaserSource.ts`: generated Phaser runtime source files.
- `src/template/projectConfig.ts`: generated package scripts, test configs, build configs, and validation helpers.
- `src/template/skillPack.ts`: generated skill bundle assembly.
- `src/template/skillNames.ts`: generated skill name list.
- `src/template/skills/*.ts`: generated Phaser skill definitions and references.
- `src/template/idleGamePack.ts`: optional idle/incremental systems, docs, and skills.
- `src/template/skills/yandexSkill.ts`: optional Yandex Games publishing skill.
- `scripts/validate-generated.ts`: generates sample projects and runs install, unit tests, build, and smoke checks.

## Core Rule

When changing this repository, keep the distinction clear:

- changes to this repo affect the generator UI or generated archive templates;
- changes inside generated output must be made by editing the templates under `src/template/`;
- do not treat this repository as the generated Phaser game itself.

## Skill Authoring Rule

This repository is a skill factory for Phaser game projects.

When adding, editing, renaming, or reorganizing generated skills, use the `skill-creator` guidance first. Treat every generated `skills/<name>/SKILL.md` as a real Codex skill:

- keep each skill concise and task-triggered;
- put trigger conditions in the skill description/frontmatter;
- move long supporting material into `references/`;
- avoid generic docs that do not help an agent act;
- update the skill name list, skill pack assembly, generated `skills/README.md`, and generated `skills/_meta/task-map.md` together;
- validate generated projects after changing skills.

The most relevant files for skill work are:

- `src/template/agentDocs.ts`
- `src/template/skillPack.ts`
- `src/template/skillNames.ts`
- `src/template/skills/*.ts`
- `src/template/skills/helpers.ts`
- `src/template/idleGamePack.ts`

## Change Workflow

1. Inspect the existing template and generated-output pattern before editing.
2. Make the smallest coherent generator/template change.
3. If generated files change, check a fresh generated project rather than only reading the TypeScript template.
4. Run the most relevant verification:
   - `npm run build`
   - `npm run validate:generated`
5. If full validation is too slow or blocked, report exactly which step was not verified.

## Local Notes

- The app uses Vite and TypeScript without a frontend framework.
- ZIP generation uses `jszip`.
- The generated projects are intended to be opened by coding agents, so project instructions and skill routing are part of the product surface.
- Keep generated docs practical, short, and action-oriented.
