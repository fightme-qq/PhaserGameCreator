import type { GeneratedFile, ProjectOptions } from '../types';
import { advancedGameplaySkills } from './skills/advancedGameplaySkills';
import { architectureSkills } from './skills/architectureSkills';
import { coreRuntimeSkills } from './skills/coreRuntimeSkills';
import { testingMaintainerSkills } from './skills/testingMaintainerSkills';
import { yandexSkill } from './skills/yandexSkill';

export function skillPack(options: ProjectOptions): GeneratedFile[] {
  return [
    ...architectureSkills(),
    ...coreRuntimeSkills(),
    ...advancedGameplaySkills(),
    ...testingMaintainerSkills(),
    ...(options.includeYandexGames ? yandexSkill() : []),
  ];
}
