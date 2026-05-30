import type { ProjectOptions } from '../types';

const coreSkillNames = [
  'phaser-game-design-interviewer',
  'phaser-first-playable-builder',
  'phaser-feature-slicer',
  'phaser-refactor-guardian',
  'phaser-error-recovery-debugger',
  'phaser-version-docs-sync',
  'phaser-state-machine-patterns',
  'phaser-physics-collision-designer',
  'phaser-camera-level-design',
  'phaser-content-pipeline',
  'phaser-save-schema-migrations',
  'phaser-progression-economy',
  'phaser-accessibility-localization',
  'phaser-release-platforms',
  'phaser-ai-art-asset-brief',
  'phaser-visual-taste',
  'phaser-ui-redesign-auditor',
  'phaser-brandkit-brief',
  'phaser-project-architect',
  'phaser-scene-workflow',
  'phaser-assets-pipeline',
  'phaser-input-mobile-desktop',
  'phaser-responsive-layout',
  'phaser-game-systems',
  'phaser-ui-hud',
  'phaser-gamefeel',
  'phaser-sprite-animation',
  'phaser-tilemaps-tiled',
  'phaser-audio-sfx',
  'phaser-debug-performance',
  'phaser-programmatic-art',
  'phaser-testing',
  'phaser-generator-feedback-reporter',
  'phaser-skill-pack-maintainer',
];

export function getSkillNames(options: ProjectOptions): string[] {
  return options.includeYandexGames ? [...coreSkillNames, 'yandex-publish'] : coreSkillNames;
}
