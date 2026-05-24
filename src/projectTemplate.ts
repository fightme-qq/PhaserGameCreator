import type { GeneratedFile, ProjectOptions } from './types';
import { agentDocs, creatorGuideDocs, rootDocs } from './template/docs';
import { phaserSource } from './template/phaserSource';
import { projectConfig } from './template/projectConfig';
import { skillPack } from './template/skillPack';

export function getProjectFiles(options: ProjectOptions): GeneratedFile[] {
  return [
    ...rootDocs(options),
    ...creatorGuideDocs(options),
    ...agentDocs(options),
    ...projectConfig(options),
    ...phaserSource(options),
    ...skillPack(options),
  ];
}
