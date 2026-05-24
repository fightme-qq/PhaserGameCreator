import type { GeneratedFile } from '../../types';

export function skill(name: string, description: string, body: string): GeneratedFile {
  return {
    path: `skills/${name}/SKILL.md`,
    content: `---
name: ${name}
description: ${description}
---

${body}
`,
  };
}

export function reference(skillName: string, fileName: string, content: string): GeneratedFile {
  return {
    path: `skills/${skillName}/references/${fileName}`,
    content,
  };
}
