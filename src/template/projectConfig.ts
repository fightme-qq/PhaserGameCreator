import type { GeneratedFile, ProjectOptions } from '../types';

export function projectConfig(options: ProjectOptions): GeneratedFile[] {
  const scripts: Record<string, string> = {
    'agent:audit': 'node scripts/agent-audit.mjs',
    dev: 'vite --host 0.0.0.0',
    build: 'tsc && vite build',
    test: 'vitest run tests/unit',
    preview: 'vite preview --host 0.0.0.0',
  };

  const devDependencies: Record<string, string> = {
    typescript: '^5.7.3',
    vite: '^6.3.5',
    vitest: '^4.1.7',
  };

  if (options.includePlaywright) {
    scripts['test:smoke'] = 'playwright test';
    devDependencies['@playwright/test'] = '^1.52.0';
  }

  if (options.includeYandexGames) {
    scripts['build:yandex'] = 'npm run build && python scripts/make-yandex-zip.py';
    scripts['validate:yandex'] = 'npm run build && python scripts/validate-yandex-build.py';
  }

  return [
    {
      path: 'package.json',
      content: JSON.stringify(
        {
          name: options.slug,
          version: '0.1.0',
          private: true,
          type: 'module',
          scripts,
          dependencies: {
            phaser: '^3.90.0',
          },
          devDependencies,
        },
        null,
        2,
      ),
    },
    {
      path: 'index.html',
      content: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>${options.title}</title>
    ${options.includeYandexGames ? '<script src="/sdk.js"></script>' : ''}
    ${options.includePwa ? '<link rel="manifest" href="/manifest.webmanifest" />' : ''}
  </head>
  <body>
    <div id="game-root"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
`,
    },
    {
      path: 'tsconfig.json',
      content: `{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
`,
    },
    {
      path: 'vite.config.ts',
      content: `import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  ${options.includeYandexGames ? "esbuild: {\n    drop: ['console', 'debugger'],\n  }," : ''}
});
`,
    },
    {
      path: 'src/style.css',
      content: `html,
body,
#game-root {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow: hidden;
  background: #10131a;
}

body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  touch-action: none;
}

canvas {
  display: block;
}

${options.includeYandexGames ? `* {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  user-select: none;
}

html,
body,
#game-root {
  position: fixed;
  overscroll-behavior: none;
}
` : ''}
`,
    },
    ...(options.includePlaywright
      ? [
          {
            path: 'playwright.config.ts',
            content: `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  webServer: {
    command: 'npm run dev -- --port 4177',
    url: 'http://127.0.0.1:4177',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://127.0.0.1:4177',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
});
`,
          },
          {
            path: 'tests/smoke.spec.ts',
            content: `import { expect, test } from '@playwright/test';

test('game canvas renders', async ({ page }) => {
  await page.goto('/');
  const canvas = page.locator('canvas');
  await expect(canvas).toBeVisible();
  const size = await canvas.evaluate((node) => ({
    width: (node as HTMLCanvasElement).width,
    height: (node as HTMLCanvasElement).height,
  }));
  expect(size.width).toBeGreaterThan(0);
  expect(size.height).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => Boolean(window.__phaserGame)), { timeout: 15_000 }).toBe(true);
  await expect
    .poll(() => page.evaluate(() => window.__phaserGame?.scene.isActive('TemplateGuideScene') ?? false), {
      timeout: 15_000,
    })
    .toBe(true);

  await page.keyboard.press('Enter');
  await expect
    .poll(() => page.evaluate(() => window.__phaserGame?.scene.isActive('GameScene') ?? false), {
      timeout: 15_000,
    })
    .toBe(true);

  await expect
    .poll(() =>
      page.evaluate(() => {
        const scene = window.__phaserGame?.scene.getScene('GameScene') as unknown as
          | { getDebugSnapshot?: () => { elapsedMs: number; phase: string } }
          | undefined;

        return scene?.getDebugSnapshot?.().elapsedMs ?? 0;
      }),
      { timeout: 15_000 },
    )
    .toBeGreaterThan(0);

  const gameState = await page.evaluate(() => {
    const scene = window.__phaserGame?.scene.getScene('GameScene') as unknown as
      | { getDebugSnapshot?: () => { elapsedMs: number; phase: string } }
      | undefined;

    return scene?.getDebugSnapshot?.();
  });

  expect(gameState?.phase).toBe('playing');
  expect(gameState?.elapsedMs).toBeGreaterThan(0);
});
`,
          },
          {
            path: 'tests/types.d.ts',
            content: `import type Phaser from 'phaser';

declare global {
  interface Window {
    __phaserGame?: Phaser.Game;
  }
}

export {};
`,
          },
        ]
      : []),
    {
      path: 'tests/unit/GameState.test.ts',
      content: `import { describe, expect, it } from 'vitest';
import { GameState } from '../../src/game/state/GameState';

describe('GameState', () => {
  it('starts with saved best score and resets run score', () => {
    const state = new GameState(12);

    expect(state.value).toEqual({
      phase: 'ready',
      score: 0,
      bestScore: 12,
      elapsedMs: 0,
    });

    expect(state.start()).toEqual({
      phase: 'playing',
      score: 0,
      bestScore: 12,
      elapsedMs: 0,
    });
  });

  it('tracks elapsed time only while playing', () => {
    const state = new GameState();

    state.update(1000);
    expect(state.value.elapsedMs).toBe(0);

    state.start();
    state.update(250);
    state.update(750);

    expect(state.value.elapsedMs).toBe(1000);
  });

  it('reports score and best score changes', () => {
    const state = new GameState(2);
    state.start();

    expect(state.addScore(1)).toEqual({ score: 1, bestScore: 2, bestChanged: false });
    expect(state.addScore(2)).toEqual({ score: 3, bestScore: 3, bestChanged: true });
  });
});
`,
    },
    {
      path: 'tests/unit/SaveManager.test.ts',
      content: `import { beforeEach, describe, expect, it } from 'vitest';
import { SaveManager, type SaveData } from '../../src/game/save/SaveManager';

class MemoryStorage implements Storage {
  private readonly values = new Map<string, string>();

  get length(): number {
    return this.values.size;
  }

  clear(): void {
    this.values.clear();
  }

  getItem(key: string): string | null {
    return this.values.get(key) ?? null;
  }

  key(index: number): string | null {
    return Array.from(this.values.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.values.delete(key);
  }

  setItem(key: string, value: string): void {
    this.values.set(key, value);
  }
}

describe('SaveManager', () => {
  let storage: MemoryStorage;
  let saves: SaveManager;

  beforeEach(() => {
    storage = new MemoryStorage();
    saves = new SaveManager('test-game', storage);
  });

  it('returns safe defaults for empty and corrupted saves', () => {
    expect(saves.load()).toEqual({
      version: 1,
      bestScore: 0,
      settings: {
        musicVolume: 0.8,
        sfxVolume: 0.8,
        reducedMotion: false,
      },
    });

    storage.setItem('test-game:save:slot-1', '{bad json');
    expect(saves.load().bestScore).toBe(0);
  });

  it('saves and lists independent slots', () => {
    const data: SaveData = {
      version: 1,
      bestScore: 42,
      settings: {
        musicVolume: 0.5,
        sfxVolume: 0.25,
        reducedMotion: true,
      },
    };

    saves.save(data, 'slot-2');

    expect(saves.load('slot-1').bestScore).toBe(0);
    expect(saves.load('slot-2')).toEqual(data);
    expect(saves.listSlots().find((entry) => entry.slot === 'slot-2')?.updatedAt).toBeDefined();
  });

  it('migrates old plain save data and fills missing settings', () => {
    storage.setItem('test-game:save:slot-1', JSON.stringify({ version: 0, bestScore: 7 }));

    expect(saves.load()).toEqual({
      version: 1,
      bestScore: 7,
      settings: {
        musicVolume: 0.8,
        sfxVolume: 0.8,
        reducedMotion: false,
      },
    });
  });

  it('can reset a slot', () => {
    saves.save(saves.load());
    expect(storage.length).toBe(1);

    saves.reset();
    expect(storage.length).toBe(0);
  });
});
`,
    },
    {
      path: 'scripts/agent-audit.mjs',
      content: `import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function listDirs(relativePath) {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    return [];
  }

  return fs
    .readdirSync(absolutePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listFiles(relativePath, extension) {
  const absolutePath = path.join(root, relativePath);

  if (!fs.existsSync(absolutePath)) {
    return [];
  }

  return fs
    .readdirSync(absolutePath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && (!extension || entry.name.endsWith(extension)))
    .map((entry) => entry.name)
    .sort();
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

const packageJson = readJson('package.json');
const manifest = exists('.ai/skill-manifest.json') ? readJson('.ai/skill-manifest.json') : undefined;
const skills = listDirs('skills').filter((name) => !name.startsWith('_'));
const scenes = listFiles('src/game/scenes', '.ts');
const templates = listFiles('templates/modules', '.ts');
const recipes = listFiles('docs/feature-recipes', '.md').filter((name) => name !== 'README.md');
const blueprints = listFiles('docs/genre-blueprints', '.md').filter((name) => name !== 'README.md');

const report = [
  '# Agent Audit',
  '',
  'Project: ' + (packageJson.name ?? 'unknown'),
  'Engine: Phaser',
  'Primary target: ' + (manifest?.primaryTarget ?? '${options.target}'),
  'Yandex Games: ' + (manifest?.yandexGames ? 'enabled' : 'disabled'),
  'Playwright smoke tests: ' + (packageJson.scripts?.['test:smoke'] ? 'enabled' : 'not enabled'),
  '',
  '## Required Startup',
  '- AGENTS.md: ' + (exists('AGENTS.md') ? 'present' : 'missing'),
  '- AGENT_WORKFLOW.md: ' + (exists('AGENT_WORKFLOW.md') ? 'present' : 'missing'),
  '- skills/_meta/task-map.md: ' + (exists('skills/_meta/task-map.md') ? 'present' : 'missing'),
  '- docs/first-playable-contract.md: ' + (exists('docs/first-playable-contract.md') ? 'present' : 'missing'),
  '- docs/validation-matrix.md: ' + (exists('docs/validation-matrix.md') ? 'present' : 'missing'),
  '- docs/quality-gates.md: ' + (exists('docs/quality-gates.md') ? 'present' : 'missing'),
  '',
  '## Current Structure',
  '- Skills: ' + skills.length + (skills.length ? ' (' + skills.join(', ') + ')' : ''),
  '- Scenes: ' + scenes.length + (scenes.length ? ' (' + scenes.join(', ') + ')' : ''),
  '- Module templates: ' + templates.length + (templates.length ? ' (' + templates.join(', ') + ')' : ''),
  '- Feature recipes: ' + recipes.length + (recipes.length ? ' (' + recipes.join(', ') + ')' : ''),
  '- Genre blueprints: ' + blueprints.length + (blueprints.length ? ' (' + blueprints.join(', ') + ')' : ''),
  '',
  '## Available Commands',
  ...Object.keys(packageJson.scripts ?? {}).sort().map((script) => '- npm run ' + script),
  '',
  '## Agent Reminder',
  '1. Follow AGENT_WORKFLOW.md.',
  '2. Pick skills from skills/_meta/task-map.md.',
  '3. Use templates/modules only as starting points.',
  '4. Validate with docs/validation-matrix.md and docs/quality-gates.md.',
].join('\\n');

console.log(report);
`,
    },
    ...(options.includeYandexGames
      ? [
          {
            path: 'scripts/make-yandex-zip.py',
            content: `import os
import zipfile

dist_dir = "dist"
output_zip = "yandex-game.zip"

with zipfile.ZipFile(output_zip, "w", zipfile.ZIP_DEFLATED) as zf:
    for root, _dirs, files in os.walk(dist_dir):
        for file in files:
            abs_path = os.path.join(root, file)
            rel_path = os.path.relpath(abs_path, dist_dir).replace(os.sep, "/")
            zf.write(abs_path, rel_path)

print(f"Created {output_zip}")
`,
          },
          {
            path: 'scripts/validate-yandex-build.py',
            content: `from pathlib import Path

dist = Path("dist")
html = dist / "index.html"
text = html.read_text(encoding="utf-8") if html.exists() else ""

checks = [
    ("index.html exists", html.exists()),
    ("SDK path /sdk.js present", 'src="/sdk.js"' in text),
    ("No CDN references", not any(x in text for x in ["googleapis", "cdnjs", "unpkg", "jsdelivr"])),
    ("No 100vh in index", "100vh" not in text),
]

failed = False
for label, ok in checks:
    print(("[PASS] " if ok else "[FAIL] ") + label)
    failed = failed or not ok

if failed:
    raise SystemExit(1)
`,
          },
          {
            path: 'docs/yandex-games.md',
            content: `# Yandex Games Publishing Notes

This project was generated with the optional Yandex Games pack.

## Commands

\`\`\`bash
npm run validate:yandex
npm run build:yandex
\`\`\`

## Blocking Rules

- Load the SDK with \`<script src="/sdk.js"></script>\`.
- Vite may warn that \`/sdk.js\` cannot be bundled because it is not \`type="module"\`; this is expected for the Yandex synchronous SDK script.
- Call \`LoadingAPI.ready()\` only after SDK init and Phaser boot are both done.
- Call \`GameplayAPI.start()\` when gameplay starts and \`GameplayAPI.stop()\` when gameplay pauses or ends.
- Handle \`game_api_pause\` and \`game_api_resume\`.
- Do not use external CDN links or remote fonts.
- Strip \`console\` and \`debugger\` from production builds.
- Use Python to create the ZIP on Windows so archive paths use forward slashes.
- Keep all visible text localized before submission.
`,
          },
        ]
      : []),
    ...(options.includePwa
      ? [
          {
            path: 'public/manifest.webmanifest',
            content: JSON.stringify(
              {
                name: options.title,
                short_name: options.title.slice(0, 12),
                start_url: '/',
                display: 'fullscreen',
                background_color: '#10131a',
                theme_color: '#10131a',
                orientation: 'any',
                icons: [],
              },
              null,
              2,
            ),
          },
          {
            path: 'docs/pwa-notes.md',
            content: `# PWA Notes

This project includes a starter \`public/manifest.webmanifest\`.

Before shipping:

- Add real icons.
- Decide whether offline caching is needed.
- Test install behavior on mobile and desktop.
- Keep orientation flexible unless the game design requires portrait or landscape.
`,
          },
        ]
      : []),
  ];
}

