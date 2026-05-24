import type { ProjectOptions } from '../types';

const coreSkillNames = [
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
  'phaser-skill-pack-maintainer',
];

export function getSkillNames(options: ProjectOptions): string[] {
  return options.includeYandexGames ? [...coreSkillNames, 'yandex-publish'] : coreSkillNames;
}
