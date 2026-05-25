import type { GeneratedFile, ProjectOptions } from '../types';
import { advancedGameplaySkills } from './skills/advancedGameplaySkills';
import { architectureSkills } from './skills/architectureSkills';
import { coreRuntimeSkills } from './skills/coreRuntimeSkills';
import { designWorkflowSkills } from './skills/designWorkflowSkills';
import { gameplayStructureSkills } from './skills/gameplayStructureSkills';
import { productionGrowthSkills } from './skills/productionGrowthSkills';
import { testingMaintainerSkills } from './skills/testingMaintainerSkills';
import { yandexSkill } from './skills/yandexSkill';

export function skillPack(options: ProjectOptions): GeneratedFile[] {
  return [
    ...designWorkflowSkills(),
    ...gameplayStructureSkills(),
    ...productionGrowthSkills(),
    ...architectureSkills(),
    ...coreRuntimeSkills(),
    ...advancedGameplaySkills(),
    ...testingMaintainerSkills(),
    ...(options.includeYandexGames ? yandexSkill() : []),
  ];
}
