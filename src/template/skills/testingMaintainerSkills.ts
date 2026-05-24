import type { GeneratedFile } from '../../types';
import { reference, skill } from './helpers';

export function testingMaintainerSkills(): GeneratedFile[] {
  const files: GeneratedFile[] = [];

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


  return files;
}
