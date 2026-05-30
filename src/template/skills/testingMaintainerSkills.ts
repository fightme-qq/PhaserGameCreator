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

  files.push(
    skill('phaser-generator-feedback-reporter', 'Use after a task initially failed, required rework, exposed missing generated guidance, or revealed that a better solution should be built into future Phaser Game Creator archives; produce concise generator feedback without editing the generator from inside this game project.', `# Phaser Generator Feedback Reporter

## Workflow

1. Read \`references/feedback-template.md\`.
2. Use this skill only after there is evidence: a failed attempt, a confusing agent route, a repeated manual fix, missing template code, missing validation, or a final solution that should have been generated up front.
3. Do not edit the generator from this game repository.
4. Capture the original request, what failed, what finally worked, and why the generated archive did not guide the agent well enough.
5. Classify the generator fix as skill, task map, template module, generated source, validation, docs, visual quality gate, or dependency/config.
6. Include a concrete verification plan for the next generated archive.
7. Give the human a copy-pasteable "Generator Feedback" block.

## Rules

- Do not produce feedback for normal feature work that succeeded cleanly.
- Do not blame the user; focus on missing generator support or missing validation.
- Do not request broad rewrites. Suggest the smallest generator improvement that would prevent the same issue.
- Include file paths from this game only as evidence, not as generator edit targets.
- If the issue is only game-specific design taste, say it should stay in the game and should not change the generator.
`),
    reference('phaser-generator-feedback-reporter', 'feedback-template.md', `# Generator Feedback Template

Use this exact structure when reporting a generator-level learning.

\`\`\`md
## Generator Feedback

### Trigger

- Original user task:
- First failed or weak result:
- Final working solution:

### Evidence From This Game

- Game folder:
- Relevant files:
- Commands/checks run:
- Error, symptom, or before/after behavior:

### Root Cause

What was missing or misleading in the generated archive?

Choose one or more:

- skill guidance missing or too vague;
- task-map routing missing;
- generated source default was weak;
- template module should exist;
- validation/test did not catch it;
- docs/quality gate missed it;
- dependency/config default was wrong;
- visual/gamefeel standard was too low;
- platform requirement was not encoded.

### Proposed Generator Fix

- Area to improve:
- Smallest useful change:
- Why this helps future generated games:

### Validation For Next Archive

- Generate a fresh archive with:
- Run:
- Manual check:
- Expected pass condition:

### Do Not Change

Anything that is specific to this one game and should not become a generator default.
\`\`\`

Good feedback is specific enough that the generator repository can be improved without reopening the whole game history.
`),
  );


  return files;
}
