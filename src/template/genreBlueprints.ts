import type { GeneratedFile } from '../types';

export function genreBlueprints(): GeneratedFile[] {
  return [

    {
      path: 'docs/genre-blueprints/README.md',
      content: `# Genre Blueprints

Blueprints help agents choose a first playable shape from a vague idea.

Use a blueprint only as a starting point. The first playable still must follow \`docs/first-playable-contract.md\`.
`,
    },
    {
      path: 'docs/genre-blueprints/top-down-arena.md',
      content: `# Blueprint: Top-Down Arena

Best for: survival, dodging, simple shooters, collection arenas.

First playable:

- Player moves in 2D.
- One enemy or hazard creates pressure.
- One collectible or timer creates goal.
- HUD shows time, score, health, or objective.
- Restart after hit, timeout, or success.

Skills:

- \`phaser-input-mobile-desktop\`
- \`phaser-game-systems\`
- \`phaser-gamefeel\`
- \`phaser-debug-performance\`
`,
    },
    {
      path: 'docs/genre-blueprints/platformer.md',
      content: `# Blueprint: Platformer

Best for: jumping, obstacle courses, side-view action.

First playable:

- Player moves and jumps.
- One platform/collision shape exists.
- One hazard or gap creates failure.
- One marker, coin, or door creates success.
- Camera and body tuning feel stable.

Skills:

- \`phaser-input-mobile-desktop\`
- \`phaser-responsive-layout\`
- \`phaser-sprite-animation\`
- \`phaser-tilemaps-tiled\` if using tile levels
`,
    },
    {
      path: 'docs/genre-blueprints/puzzle-grid.md',
      content: `# Blueprint: Puzzle Grid

Best for: match, swap, path, sliding, logic, board puzzles.

First playable:

- Board initializes deterministically.
- Player can select, drag, swap, rotate, or place.
- One rule resolves the move.
- Win/fail/move-limit state exists.
- Feedback makes valid/invalid actions obvious.

Skills:

- \`phaser-game-systems\`
- \`phaser-input-mobile-desktop\`
- \`phaser-ui-hud\`
- \`phaser-testing\`
`,
    },
    {
      path: 'docs/genre-blueprints/runner.md',
      content: `# Blueprint: Endless Runner

Best for: one-button action, lane switching, jump/dodge games.

First playable:

- World or obstacles move consistently.
- Player has one or two actions.
- Obstacles spawn with readable timing.
- Score or distance increases.
- Collision ends the run and allows restart.

Skills:

- \`phaser-game-systems\`
- \`phaser-input-mobile-desktop\`
- \`phaser-debug-performance\`
- \`phaser-gamefeel\`
`,
    },
    {
      path: 'docs/genre-blueprints/card-collection.md',
      content: `# Blueprint: Card Or Collection Game

Best for: packs, deck choices, turn prototypes, collection reveals.

First playable:

- Player makes one choice: open, draw, play, select, or resolve.
- A small data set drives cards/items.
- UI communicates rarity/state/result.
- Save stores collection or best outcome only after the loop works.
- Reveal feedback is the main feel moment.

Skills:

- \`phaser-ui-hud\`
- \`phaser-game-systems\`
- \`phaser-gamefeel\`
- \`phaser-programmatic-art\`
`,
    },
  ];
}
