import type { GeneratedFile, ProjectOptions } from '../types';
import { idleGameSkills } from './idleGamePack';
import { advancedGameplaySkills } from './skills/advancedGameplaySkills';
import { architectureSkills } from './skills/architectureSkills';
import { coreRuntimeSkills } from './skills/coreRuntimeSkills';
import { designWorkflowSkills } from './skills/designWorkflowSkills';
import { gameplayStructureSkills } from './skills/gameplayStructureSkills';
import { productionGrowthSkills } from './skills/productionGrowthSkills';
import { testingMaintainerSkills } from './skills/testingMaintainerSkills';
import { visualTasteSkills } from './skills/visualTasteSkills';
import { yandexSkill } from './skills/yandexSkill';

export function skillPack(options: ProjectOptions): GeneratedFile[] {
  return [
    ...designWorkflowSkills(),
    ...gameplayStructureSkills(),
    ...productionGrowthSkills(),
    ...architectureSkills(),
    ...coreRuntimeSkills(),
    ...advancedGameplaySkills(),
    ...visualTasteSkills(),
    ...testingMaintainerSkills(),
    ...(options.includeIdlePack ? idleGameSkills() : []),
    ...(options.includeYandexGames ? yandexSkill() : []),
  ];
}
