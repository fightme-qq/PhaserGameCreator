import type { GeneratedFile, ProjectOptions } from '../types';
import { getSkillNames } from './skillNames';

export function rootDocs(options: ProjectOptions): GeneratedFile[] {
  const skillNames = getSkillNames(options);
  return [
    {
      path: 'START_HERE.md',
      content: `# Start Here

You opened a generated Phaser game repository.

If you are a human:

1. Open this folder in Codex, Claude Code, Gemini CLI, or another coding agent.
2. Tell the agent your game idea.
3. Run:

\`\`\`bash
npm install
npm run agent:audit
npm run dev
\`\`\`

4. Open the local URL printed by Vite.

If you are an AI coding agent:

1. Read \`AGENTS.md\` first.
2. Read \`AGENT_WORKFLOW.md\`.
3. Run \`npm run agent:audit\` if dependencies are installed.
4. Read \`docs/game-design-intake.md\`, \`docs/first-playable-contract.md\`, \`docs/validation-matrix.md\`, and \`docs/quality-gates.md\`.
5. Read \`skills/README.md\`.
6. Pick the right skill from \`skills/_meta/task-map.md\`.
7. Check \`templates/modules/\` before inventing common systems from scratch.
8. Before changing code, explain which skill you are using and why.
9. Keep this repo Phaser-focused. Do not convert it into a generic web app.

## What This Project Is

- Game title: ${options.title}
- Engine: Phaser
- Language: TypeScript
- Build tool: Vite
- Primary target: ${options.target === 'mobile' ? 'mobile-first browser game' : 'desktop-first browser game'}
- Yandex Games publish pack: ${options.includeYandexGames ? 'included' : 'not included'}
- Generated skills: ${skillNames.length}

## First Useful Agent Prompts

\`\`\`text
Use phaser-project-architect. My game idea is: [describe game]. Turn it into a first playable loop.
\`\`\`

\`\`\`text
Use phaser-scene-workflow. Replace the template guide with real gameplay for this idea: [describe game].
\`\`\`

\`\`\`text
Use the phaser-input-mobile-desktop and phaser-responsive-layout skills to make this work well on phone and desktop.
\`\`\`
`,
    },
    {
      path: 'README.md',
      content: `# ${options.title}

Generated with Phaser Game Creator.

This repo is built to be opened by a coding agent. The agent should read \`AGENTS.md\`, then use the project-local skills in \`skills/\`.

## Run

\`\`\`bash
npm install
npm run agent:audit
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Smoke Tests

If this project includes Playwright smoke tests, install the browser once before running them:

\`\`\`bash
npx playwright install
npm run test:smoke
\`\`\`

On Linux CI, use \`npx playwright install --with-deps\` if the environment is missing browser dependencies.

## Project Shape

\`\`\`text
src/game/
  config/     Phaser configuration and constants
  scenes/     Boot, Preload, TemplateGuide, Game, UI scenes
  systems/    Gameplay systems with explicit boundaries
  entities/   Game objects and entity factories
  input/      Mobile/desktop input abstraction
  ui/         HUD and menu helpers
  state/      Runtime state and events
  assets/     Asset manifest and loader helpers
  save/       Local save/load helpers
  utils/      Small shared utilities
skills/       Project-local AI skills
\`\`\`

## Agent Entry Points

- \`AGENTS.md\`: operating instructions for AI agents.
- \`AGENT_WORKFLOW.md\`: required agent operating loop.
- \`CLAUDE.md\`: Claude Code entry instructions.
- \`GEMINI.md\`: Gemini CLI entry instructions.
- \`.github/copilot-instructions.md\`: GitHub Copilot instructions.
- \`.cursor/rules/phaser-game-creator.mdc\`: Cursor auto-applied rule.
- \`.ai/agent-entry.md\`: generic AI agent entry instructions.
- \`.ai/skill-manifest.json\`: machine-readable skill map.
- \`skills/README.md\`: what skills exist and when to use them.
- \`skills/_meta/task-map.md\`: task-to-skill routing table.
- \`skills/_meta/update-skills.md\`: how to keep skills current.
- \`docs/game-design-intake.md\`: how to parse vague game ideas.
- \`docs/first-playable-contract.md\`: what must be true before the first loop is done.
- \`docs/validation-matrix.md\`: checks before finishing work.
- \`docs/quality-gates.md\`: first playable, architecture, asset, mobile, and runtime gates.
- \`docs/release-checklist.md\`: public build readiness checklist.
- \`docs/mobile-checklist.md\`: phone and touch validation checklist.
- \`docs/asset-credits-policy.md\`: asset sourcing and copyright rules.
- \`docs/feature-recipes/\`: common implementation recipes.
- \`docs/genre-blueprints/\`: first playable blueprints by genre.
- \`docs/decisions/\`: short architecture and product decisions.
- \`templates/modules/\`: reusable TypeScript starting points for common game systems.
- \`scripts/agent-audit.mjs\`: prints a machine-friendly project snapshot for agents.
- \`docs/game-creator-guide.md\`: how to turn an idea into the first playable.
- \`docs/first-playable-loop.md\`: what "first playable" means.
- \`docs/idea-to-architecture.md\`: idea-to-module hints.
`,
    },
  ];
}

