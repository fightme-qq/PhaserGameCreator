import type { GeneratedFile } from '../types';

export function featureRecipes(): GeneratedFile[] {
  return [

    {
      path: 'docs/feature-recipes/README.md',
      content: `# Feature Recipes

Recipes are short implementation paths for common Phaser features.

Use them with skills:

- architecture first when a feature changes structure;
- scene/input/layout skills for runtime behavior;
- asset/gamefeel/testing skills for finish and validation.

Do not treat recipes as mandatory abstractions. They are rails for agents.
`,
    },
    {
      path: 'docs/feature-recipes/add-player.md',
      content: `# Recipe: Add Player

Use skills:

- \`phaser-scene-workflow\`
- \`phaser-input-mobile-desktop\`
- \`phaser-sprite-animation\` if animated
- \`phaser-debug-performance\` if tuning physics

Steps:

1. Define the core player action.
2. Add or update an entity/factory under \`src/game/entities/\` when setup repeats.
3. Route raw input through \`src/game/input/\`.
4. Keep movement/update logic small and readable.
5. Add visible feedback for action, hit, pickup, or failure.
6. Validate desktop and mobile input paths.
`,
    },
    {
      path: 'docs/feature-recipes/add-enemy.md',
      content: `# Recipe: Add Enemy

Use skills:

- \`phaser-game-systems\`
- \`phaser-scene-workflow\`
- \`phaser-gamefeel\`

Steps:

1. Pick one behavior: patrol, chase, flee, orbit, shoot, block, or wander.
2. Add the enemy as an entity or factory.
3. Put behavior rules in a system if more than one enemy uses them.
4. Add one consequence: damage, pushback, lose condition, score change, or timer pressure.
5. Add readable feedback for contact or defeat.
6. Validate restart/cleanup so enemies do not duplicate across scene restarts.
`,
    },
    {
      path: 'docs/feature-recipes/add-collectible.md',
      content: `# Recipe: Add Collectible

Use skills:

- \`phaser-assets-pipeline\`
- \`phaser-game-systems\`
- \`phaser-gamefeel\`

Steps:

1. Define what the collectible changes: score, timer, health, unlock, inventory, progress.
2. Add an asset key or generated placeholder.
3. Spawn it from a scene, system, or tilemap object layer.
4. On collect, update state and hide/destroy/recycle it.
5. Add feedback: tween, sound, particle, score popup, or camera nudge.
6. Validate collection cannot trigger twice accidentally.
`,
    },
    {
      path: 'docs/feature-recipes/add-timer-score.md',
      content: `# Recipe: Add Timer Or Score

Use skills:

- \`phaser-game-systems\`
- \`phaser-ui-hud\`
- \`phaser-testing\`

Steps:

1. Keep score/time in state or a small gameplay system.
2. Display it through HUD/UI, not buried in world objects.
3. Decide what happens at zero, target score, or best score.
4. Persist best score only after the loop works.
5. Validate text fits on phone and desktop.
`,
    },
    {
      path: 'docs/feature-recipes/add-touch-controls.md',
      content: `# Recipe: Add Touch Controls

Use skills:

- \`phaser-input-mobile-desktop\`
- \`phaser-responsive-layout\`
- \`phaser-ui-hud\`

Steps:

1. Map touch to actions, not scene-specific flags.
2. Use pointer/tap for simple actions.
3. Use virtual buttons or joystick only for repeated/continuous actions.
4. Keep controls away from safe-area edges.
5. Make desktop keyboard/mouse still work.
6. Validate with mobile viewport and real touch if available.
`,
    },
    {
      path: 'docs/feature-recipes/add-pause-restart.md',
      content: `# Recipe: Add Pause And Restart

Use skills:

- \`phaser-scene-workflow\`
- \`phaser-ui-hud\`
- \`phaser-audio-sfx\`

Steps:

1. Decide whether pause is a scene overlay or state inside gameplay.
2. Freeze gameplay timers, physics, input, and spawns.
3. Keep restart cleanup deterministic.
4. Stop duplicated event listeners on shutdown.
5. Pause/resume audio and platform gameplay APIs when publishing requires it.
6. Validate restart several times in one browser session.
`,
    },
    {
      path: 'docs/feature-recipes/add-health-damage.md',
      content: `# Recipe: Add Health And Damage

Use skills:

- \`phaser-game-systems\`
- \`phaser-gamefeel\`
- \`phaser-ui-hud\`

Steps:

1. Store health in state or a small system, not directly on random sprites.
2. Define damage sources and invulnerability timing.
3. Add hit feedback: flash, knockback, sound, or brief camera effect.
4. Update HUD through events or explicit state reads.
5. Define zero-health behavior: fail, respawn, restart, or game over.
6. Validate damage cannot trigger every frame unless intended.
`,
    },
    {
      path: 'docs/feature-recipes/add-win-lose-state.md',
      content: `# Recipe: Add Win And Lose State

Use skills:

- \`phaser-game-systems\`
- \`phaser-scene-workflow\`
- \`phaser-ui-hud\`

Steps:

1. Define one win condition and one lose condition.
2. Keep state transitions explicit: playing, won, lost, restarting.
3. Stop timers, spawns, and input side effects when the run ends.
4. Show a simple result message or overlay.
5. Provide restart/continue input.
6. Validate that win/lose cannot fire repeatedly.
`,
    },
    {
      path: 'docs/feature-recipes/add-camera-follow.md',
      content: `# Recipe: Add Camera Follow

Use skills:

- \`phaser-responsive-layout\`
- \`phaser-scene-workflow\`
- \`phaser-debug-performance\`

Steps:

1. Confirm the world is larger than the viewport.
2. Set world and camera bounds.
3. Follow the player or target with sensible lerp/deadzone.
4. Keep HUD in a UI scene or screen-space layer.
5. Test resize and mobile viewport.
6. Add camera shake/fade only after follow feels stable.
`,
    },
    {
      path: 'docs/feature-recipes/add-projectiles.md',
      content: `# Recipe: Add Projectiles

Use skills:

- \`phaser-game-systems\`
- \`phaser-debug-performance\`
- \`phaser-gamefeel\`

Steps:

1. Define projectile owner, speed, lifetime, damage, and collision targets.
2. Use \`templates/modules/PhaserSpritePool.ts\` or a Phaser group with \`maxSize\` for repeated shots.
3. Reset velocity, active state, visibility, tint, and timers on reuse.
4. Disable projectiles when offscreen or after collision.
5. Add readable firing/hit feedback.
6. Validate no unbounded projectile growth occurs.
`,
    },
    {
      path: 'docs/feature-recipes/add-save-progress.md',
      content: `# Recipe: Add Save Progress

Use skills:

- \`phaser-game-systems\`
- \`phaser-testing\`

Steps:

1. Save only meaningful data: settings, best score, unlocks, level progress.
2. Use \`src/game/save/SaveManager.ts\` for slots, schema version, and safe defaults.
3. Handle missing, malformed, or old saves gracefully.
4. Never store Phaser objects.
5. Add a reset path for development.
6. Validate reload behavior in the browser.
`,
    },
    {
      path: 'docs/feature-recipes/add-main-menu.md',
      content: `# Recipe: Add Main Menu

Use skills:

- \`phaser-scene-workflow\`
- \`phaser-ui-hud\`
- \`phaser-audio-sfx\`

Steps:

1. Add a MenuScene only when the first playable needs entry choices.
2. Keep buttons large enough for touch and readable on desktop.
3. Start gameplay through \`src/game/scenes/sceneTransitions.ts\`.
4. Avoid complex settings/progression before the loop works.
5. Validate menu -> game -> restart/menu flow.
`,
    },
    {
      path: 'docs/feature-recipes/add-audio.md',
      content: `# Recipe: Add Audio

Use skills:

- \`phaser-audio-sfx\`
- \`phaser-assets-pipeline\`
- \`phaser-gamefeel\`

Steps:

1. Add audio files under \`public/assets/audio/\`.
2. Register keys through the asset manifest.
3. Unlock audio after user gesture.
4. Separate music and SFX volume.
5. Add mute if audio becomes persistent.
6. Validate mobile browser behavior.
`,
    },
    {
      path: 'docs/feature-recipes/add-tilemap-level.md',
      content: `# Recipe: Add Tilemap Level

Use skills:

- \`phaser-tilemaps-tiled\`
- \`phaser-assets-pipeline\`
- \`phaser-responsive-layout\`

Steps:

1. Put Tiled JSON in \`public/assets/tilemaps/\`.
2. Put tilesets in \`public/assets/tilesets/\`.
3. Load map and tileset keys from preload/manifest.
4. Create stable layers: ground, decor, collision, objects.
5. Spawn player/items from object layer names.
6. Set world/camera bounds and validate collision debug.
`,
    },
  ];
}
