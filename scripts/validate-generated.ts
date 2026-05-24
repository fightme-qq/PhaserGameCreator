import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { getProjectFiles } from '../src/projectTemplate';
import type { ProjectOptions } from '../src/types';

const repoRoot = process.cwd();
const outRoot = join(repoRoot, '.generated-validation', `run-${Date.now()}`);

const cases: ProjectOptions[] = [
  {
    projectName: 'Validation Base',
    slug: 'validation-base',
    title: 'Validation Base',
    target: 'mobile',
    includeYandexGames: false,
    includePwa: false,
    includeArcadePhysics: true,
    includeTilemaps: false,
    includePlaywright: true,
  },
  {
    projectName: 'Validation Yandex',
    slug: 'validation-yandex',
    title: 'Validation Yandex',
    target: 'desktop',
    includeYandexGames: true,
    includePwa: false,
    includeArcadePhysics: true,
    includeTilemaps: false,
    includePlaywright: true,
  },
];

mkdirSync(outRoot, { recursive: true });

for (const testCase of cases) {
  const projectDir = join(outRoot, testCase.slug);
  generateProject(projectDir, testCase);
  validateStructure(projectDir, testCase);
  run('npm', ['install', '--ignore-scripts'], projectDir);
  run('npm', ['run', 'build'], projectDir);

  if (testCase.includeYandexGames) {
    run('npm', ['run', 'validate:yandex'], projectDir);
  }
}

console.log('Generated project validation passed.');

function generateProject(projectDir: string, options: ProjectOptions): void {
  for (const file of getProjectFiles(options)) {
    const absolutePath = join(projectDir, file.path);
    mkdirSync(dirname(absolutePath), { recursive: true });
    writeFileSync(absolutePath, file.content);
  }
}

function validateStructure(projectDir: string, options: ProjectOptions): void {
  const requiredFiles = [
    'START_HERE.md',
    'README.md',
    'AGENTS.md',
    'CLAUDE.md',
    'GEMINI.md',
    '.github/copilot-instructions.md',
    '.cursor/rules/phaser-game-creator.mdc',
    '.ai/agent-entry.md',
    '.ai/skill-manifest.json',
    'skills/README.md',
    'skills/_meta/task-map.md',
    'src/main.ts',
    'src/game/config/gameConfig.ts',
    'src/game/config/sceneKeys.ts',
    'src/game/config/gameEvents.ts',
    'src/game/assets/assetManifest.ts',
  ];

  for (const file of requiredFiles) {
    assertExists(projectDir, file);
  }

  const skillManifest = JSON.parse(readFile(projectDir, '.ai/skill-manifest.json')) as {
    skills: Array<{ path: string }>;
  };

  for (const skill of skillManifest.skills) {
    assertExists(projectDir, skill.path);
  }

  if (options.includeYandexGames) {
    assertExists(projectDir, 'skills/yandex-publish/SKILL.md');
    assertExists(projectDir, 'skills/yandex-publish/references/sdk-startup.md');
    assertExists(projectDir, 'docs/yandex-games.md');
    assertExists(projectDir, 'scripts/make-yandex-zip.py');
    assertExists(projectDir, 'src/game/platform/yandexGames.ts');
  }
}

function assertExists(projectDir: string, relativePath: string): void {
  const absolutePath = join(projectDir, relativePath);
  if (!existsSync(absolutePath)) {
    throw new Error(`Missing generated file: ${relativePath}`);
  }
}

function readFile(projectDir: string, relativePath: string): string {
  return readFileSync(join(projectDir, relativePath), 'utf8');
}

function run(command: string, args: string[], cwd: string): void {
  console.log(`> ${command} ${args.join(' ')} (${cwd})`);
  const executable = process.platform === 'win32' ? 'cmd.exe' : command;
  const executableArgs = process.platform === 'win32' ? ['/d', '/s', '/c', `${command} ${args.join(' ')}`] : args;

  execFileSync(executable, executableArgs, {
    cwd,
    stdio: 'inherit',
  });
}
