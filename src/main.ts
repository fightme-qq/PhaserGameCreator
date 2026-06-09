import JSZip from 'jszip';
import { getProjectFiles } from './projectTemplate';
import type { ProjectOptions } from './types';
import { downloadBlob, slugifyProjectName, titleFromName } from './utils';
import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');
const themeStorageKey = 'phaser-game-creator-theme';
const darkTheme = 'dark';

if (!app) {
  throw new Error('App root not found');
}

function getSavedTheme(): string | null {
  try {
    return window.localStorage.getItem(themeStorageKey);
  } catch {
    return null;
  }
}

function saveTheme(theme: string): void {
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch {
    // Theme still changes for this session when storage is unavailable.
  }
}

function applyTheme(theme: string): void {
  document.documentElement.dataset.theme = theme;
}

applyTheme(getSavedTheme() === darkTheme ? darkTheme : 'light');

const heroHighlights = [
  {
    id: 'architecture',
    eyebrow: 'Architecture',
    title: 'Built as a full stack, not a blank starter.',
    summary:
      'EventBus, SaveManager with slots, GameState, scene flow, and an asset manifest are already part of the ZIP.',
    detail:
      'The generated project already wires scene communication, save slots, runtime state, and asset loading rules so an agent can start from structure instead of scaffolding.',
  },
  {
    id: 'production',
    eyebrow: 'Production',
    title: 'Ready for real release work.',
    summary:
      'Vitest, Playwright smoke tests, Yandex Games checks, spritesheet guidance, and cache-busting rules are included.',
    detail:
      'The archive is set up to catch regressions, validate builds, and keep release-ready habits visible from day one, including mobile and desktop smoke coverage.',
  },
  {
    id: 'skills',
    eyebrow: 'AI skills',
    title: 'The repo also teaches the agent how to think.',
    summary:
      'A local skill pack covers physics, camera, economy, save migrations, UI taste, and publishing paths.',
    detail:
      'Instead of a generic prompt dump, the ZIP ships with project-local skills that route an agent to the right workflow when the task is about gameplay, UI, input, or release prep.',
  },
] as const;

const heroChips = [
  {
    id: 'eventbus',
    label: 'EventBus + GameState',
    detail: 'Scene messages, runtime state, and scoring live in named systems instead of being scattered across screens.',
  },
  {
    id: 'save',
    label: 'SaveManager with slots',
    detail: 'Players get multiple save slots and a clean path for versioned persistence and resets.',
  },
  {
    id: 'scenes',
    label: 'Scene transitions',
    detail: 'Boot, preload, guide, game, and UI scenes already have a transition pattern for handoff and fades.',
  },
  {
    id: 'phaser',
    label: 'Phaser + TypeScript',
    detail: 'The starter keeps the engine and typing choices fixed so the next agent can focus on game logic.',
  },
  {
    id: 'tests',
    label: 'Vitest unit tests',
    detail: 'Pure game logic can be checked without opening a browser, which helps catch balance and state bugs.',
  },
  {
    id: 'smoke',
    label: 'Playwright desktop/mobile smoke',
    detail: 'The archive validates that the rendered game boots on both desktop and mobile viewports.',
  },
  {
    id: 'taste',
    label: 'Visual taste + brandkit',
    detail: 'The generated repo includes local guidance for screens, hierarchy, and non-generic presentation.',
  },
  {
    id: 'sprites',
    label: 'Spritesheet optimization',
    detail: 'There is guidance for atlas shape, frame sizing, and asset hygiene before the game grows.',
  },
  {
    id: 'pool',
    label: 'Object pool templates',
    detail: 'Reusable runtime patterns are already documented so repeated objects stay cheap and tidy.',
  },
  {
    id: 'idle',
    label: 'Idle economy optional',
    detail: 'If the pack is enabled, the ZIP also includes idle economy systems, docs, and idle-focused skills.',
  },
  {
    id: 'yandex',
    label: 'Yandex Games optional',
    detail: 'If enabled, the archive adds publishing docs, SDK startup, and validation paths for Yandex Games.',
  },
] as const;

let activeHeroHighlight: (typeof heroHighlights)[number]['id'] = heroHighlights[0]?.id ?? 'architecture';
let selectedArchivePath = '';

app.innerHTML = `
  <section class="page">
    <header class="nav">
      <div class="brand">
        <span></span>
        <strong>Phaser Game Creator</strong>
      </div>
      <div class="nav-actions">
        <div class="nav-pill">Agent-ready Phaser archive</div>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-pressed="false">
          <span class="theme-toggle-icon" aria-hidden="true"></span>
          <span id="theme-toggle-label">Dark theme</span>
        </button>
      </div>
    </header>

    <section class="stage">
      <div class="statement">
        <p class="eyebrow">Production-minded Phaser starter</p>
        <h1>Best skills for Phaser games.</h1>
        <p class="lead">
          Generate a complete Phaser + TypeScript project with architecture, local skills, tests,
          scene communication, save slots, asset rules, and publishing checks already wired in.
        </p>

        <div class="hero-highlights" id="hero-highlights" aria-label="What this project includes"></div>
        <div class="hero-explainer" id="hero-explainer" aria-live="polite"></div>

        <div class="skill-wall" aria-label="Included sources and systems">
          <button class="skill-chip" data-chip="eventbus" type="button">
            <span class="skill-chip-label">EventBus + GameState</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="save" type="button">
            <span class="skill-chip-label">SaveManager with slots</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="scenes" type="button">
            <span class="skill-chip-label">Scene transitions</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="phaser" type="button">
            <span class="skill-chip-label">Phaser + TypeScript</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="tests" type="button">
            <span class="skill-chip-label">Vitest unit tests</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="smoke" type="button">
            <span class="skill-chip-label">Playwright desktop/mobile smoke</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="taste" type="button">
            <span class="skill-chip-label">Visual taste + brandkit skills</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="sprites" type="button">
            <span class="skill-chip-label">Spritesheet optimization guide</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="pool" type="button">
            <span class="skill-chip-label">Object pool templates</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="idle" type="button">
            <span class="skill-chip-label" id="idle-badge">Idle economy optional</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
          <button class="skill-chip" data-chip="yandex" type="button">
            <span class="skill-chip-label" id="yandex-badge">Yandex Games optional</span>
            <span class="skill-chip-info" aria-hidden="true">?</span>
          </button>
        </div>
      </div>

      <form class="console" id="creator-form">
        <div class="console-head">
          <span>New archive</span>
          <strong id="preview-title">my-phaser-game.zip</strong>
        </div>

        <label class="field">
          <span>Game name</span>
          <input id="project-name" name="projectName" type="text" value="My Phaser Game" maxlength="64" autocomplete="off" />
        </label>

        <label class="field">
          <span>Game idea</span>
          <textarea id="game-idea" name="gameIdea" maxlength="600" rows="5" placeholder="Example: Vampire Survivors but with cats"></textarea>
        </label>

        <fieldset class="target-field">
          <legend>Primary target</legend>
          <div class="segments" role="radiogroup" aria-label="Primary target">
            <label class="segment">
              <input type="radio" name="target" value="mobile" checked />
              <span>
                <strong>Mobile</strong>
                <small>Touch, safe areas, phone checks</small>
              </span>
            </label>
            <label class="segment">
              <input type="radio" name="target" value="desktop" />
              <span>
                <strong>Desktop</strong>
                <small>Keyboard, mouse, wide checks</small>
              </span>
            </label>
          </div>
        </fieldset>

        <label class="publish-toggle">
          <input id="idle-pack" type="checkbox" />
          <span>
            <strong>Add Idle / Incremental Game Pack</strong>
            <small>Resources, producers, upgrades, offline progress, Phaser-ready AI skills</small>
          </span>
        </label>

        <label class="publish-toggle">
          <input id="yandex-games" type="checkbox" />
          <span>
            <strong>Add Yandex Games publish pack</strong>
            <small>SDK startup, moderation checklist, local skill, deploy ZIP script</small>
          </span>
        </label>

        <button class="primary" type="submit">Download Agent-Ready ZIP</button>
        <div class="validation-stack" aria-label="Validation included in the archive">
          <span>npm run test</span>
          <span>npm run build</span>
          <span>npm run test:smoke</span>
          <span>validate:yandex</span>
        </div>
        <div class="next-action">
          <strong>Next:</strong> unzip, open the folder in your coding agent, then ask normally:
          <code>Guide me to the smallest first playable.</code>
        </div>
      </form>
    </section>

    <section class="flow">
      <article>
        <span>Generate</span>
        <strong>Download a full working repo, not a prompt.</strong>
        <p>The ZIP contains source code, docs, tests, local skills, and agent instructions.</p>
      </article>
      <article>
        <span>Build</span>
          <strong>Agents are routed through Phaser-specific decisions.</strong>
          <p>Scenes, state, input, assets, UI polish, brand direction, gamefeel, and publishing each have local guidance.</p>
      </article>
      <article>
        <span>Verify</span>
        <strong>The archive tests itself after generation.</strong>
        <p>Unit checks, build checks, desktop/mobile smoke tests, and optional Yandex validation are included.</p>
      </article>
    </section>

    <section class="capabilities" aria-label="What the generated archive includes">
      <div class="capability-head">
        <p class="eyebrow">What the client gets</p>
        <h2>Useful work is already inside the ZIP</h2>
      </div>
      <div class="capability-grid">
        <article>
          <span>Architecture</span>
          <strong>EventBus, GameState, SaveManager, scene transitions</strong>
          <p>Starter code separates runtime state, persistence, UI events, and Phaser scene orchestration.</p>
        </article>
        <article>
          <span>Testing</span>
          <strong>Vitest + Playwright included</strong>
          <p>Generated projects verify pure logic, canvas boot, scene transition, and live update loop.</p>
        </article>
        <article>
          <span>Assets</span>
          <strong>Manifest-driven spritesheets and optimization rules</strong>
          <p>Frame dimensions, cache-busters, VRAM budgets, alpha checks, and alignment fixes are documented.</p>
        </article>
        <article>
          <span>Visual taste</span>
          <strong>HUD, menus, brandkit, and anti-generic UI checks</strong>
          <p>Local skills adapt premium design audit ideas to Phaser screens instead of generic landing-page polish.</p>
        </article>
        <article>
          <span>Idle games</span>
          <strong>Optional incremental economy architecture</strong>
          <p>Resources, producers, upgrades, achievements, temporary bonuses, offline progress, and balance tests can be generated.</p>
        </article>
        <article>
          <span>Publishing</span>
          <strong>Optional Yandex Games pack</strong>
          <p>SDK startup, loading readiness, pause/resume hooks, ZIP validation, and moderation notes are generated.</p>
        </article>
      </div>
    </section>

    <section class="payload">
      <div class="payload-head">
        <div>
          <p class="eyebrow">Archive contents</p>
          <h2>Inspect the generated structure</h2>
        </div>
        <span id="file-count">0 files</span>
      </div>
      <div class="payload-summary">
        <span>Explorer view</span>
        <span>File purpose only</span>
        <span>No source contents</span>
        <span>Private-ready layout</span>
      </div>
      <div class="archive-shell">
        <aside class="archive-tree" id="archive-tree" aria-label="Generated file explorer"></aside>
        <section class="archive-inspector" id="archive-inspector" aria-live="polite"></section>
      </div>
    </section>

    <section class="creator">
      <div>
        <strong>Ramazan Rizvanov</strong>
        <span>Game Designer · systems, progression, economy, player experience</span>
      </div>
      <div class="creator-links" aria-label="Creator links">
        <a href="https://www.linkedin.com/in/ramazan-rizvanov-639374296/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://t.me/zamazilo" target="_blank" rel="noreferrer">Telegram</a>
      </div>
    </section>
  </section>
`;

const form = document.querySelector<HTMLFormElement>('#creator-form')!;
const projectName = document.querySelector<HTMLInputElement>('#project-name')!;
const gameIdea = document.querySelector<HTMLTextAreaElement>('#game-idea')!;
const idlePack = document.querySelector<HTMLInputElement>('#idle-pack')!;
const yandexGames = document.querySelector<HTMLInputElement>('#yandex-games')!;
const previewTitle = document.querySelector<HTMLHeadingElement>('#preview-title')!;
const fileCount = document.querySelector<HTMLSpanElement>('#file-count')!;
const archiveTree = document.querySelector<HTMLDivElement>('#archive-tree')!;
const archiveInspector = document.querySelector<HTMLDivElement>('#archive-inspector')!;
const idleBadge = document.querySelector<HTMLSpanElement>('#idle-badge')!;
const yandexBadge = document.querySelector<HTMLSpanElement>('#yandex-badge')!;
const heroHighlightsRoot = document.querySelector<HTMLDivElement>('#hero-highlights')!;
const heroExplainer = document.querySelector<HTMLDivElement>('#hero-explainer')!;
const skillWall = document.querySelector<HTMLDivElement>('.skill-wall')!;
const themeToggle = document.querySelector<HTMLButtonElement>('#theme-toggle')!;
const themeToggleLabel = document.querySelector<HTMLSpanElement>('#theme-toggle-label')!;

function renderThemeToggle(): void {
  const isDark = document.documentElement.dataset.theme === darkTheme;
  themeToggle.setAttribute('aria-pressed', String(isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  themeToggleLabel.textContent = isDark ? 'Light theme' : 'Dark theme';
}

type ArchiveFileInfo = {
  title: string;
  category: string;
  summary: string;
  detail: string;
  whenToOpen: string;
};

type ArchiveFileEntry = {
  path: string;
  info: ArchiveFileInfo;
};

const archiveCategoryOrder = [
  'Onboarding',
  'Agent instructions',
  'Skill map',
  'Runtime core',
  'Idle pack',
  'Publishing',
  'Testing',
  'Config',
  'Other',
] as const;

function describeArchiveFile(path: string): ArchiveFileInfo {
  const title = path.split('/').pop() ?? path;

  if (path === 'START_HERE.md') {
    return {
      title,
      category: 'Onboarding',
      summary: 'The first page for humans and agents.',
      detail: 'Explains what to open first and how to hand the repo to an AI coding agent without friction.',
      whenToOpen: 'Open this at the start of every fresh session.',
    };
  }

  if (path === 'GAME_BRIEF.md' || path === 'NEXT_AGENT_TASK.md' || path === 'README.md') {
    return {
      title,
      category: 'Onboarding',
      summary: 'Project brief and the next concrete task.',
      detail: 'Keeps the original idea, the first playable target, and the default next move in one place.',
      whenToOpen: 'Open this when you want the project goal or next task in plain language.',
    };
  }

  if (path === 'AGENTS.md' || path === 'CLAUDE.md' || path === 'GEMINI.md' || path === '.github/copilot-instructions.md' || path === '.cursor/rules/phaser-game-creator.mdc' || path === '.ai/agent-entry.md' || path === '.ai/skill-manifest.json') {
    return {
      title,
      category: 'Agent instructions',
      summary: 'Auto-loaded operating rules for the agent layer.',
      detail: 'These files tell different assistants how to read the repo, route tasks, and avoid generic web-app assumptions.',
      whenToOpen: 'Open this when the task is about workflow, context, or agent routing.',
    };
  }

  if (path.startsWith('skills/')) {
    return {
      title,
      category: 'Skill map',
      summary: 'Local skill documentation for task routing.',
      detail: 'Contains the generated skill pack, task map, and references that steer an agent toward the right workflow.',
      whenToOpen: 'Open this when the task is about skills, prompts, or agent guidance.',
    };
  }

  if (path.startsWith('src/game/idle/') || path.startsWith('src/data/idle') || path.startsWith('docs/IDLE')) {
    return {
      title,
      category: 'Idle pack',
      summary: 'Optional incremental economy systems and docs.',
      detail: 'Defines the idle/clicker systems, balance notes, and design guidance that get added only when the pack is enabled.',
      whenToOpen: 'Open this when the project includes idle, incremental, or clicker mechanics.',
    };
  }

  if (path.startsWith('src/game/platform/') || path.startsWith('docs/yandex') || path === 'scripts/make-yandex-zip.py') {
    return {
      title,
      category: 'Publishing',
      summary: 'Yandex Games publishing helpers and constraints.',
      detail: 'This group covers SDK boot, pause/resume handling, validation, and build packaging for the Yandex path.',
      whenToOpen: 'Open this when the target platform is Yandex Games or another portal build.',
    };
  }

  if (path.startsWith('tests/') || path === 'scripts/validate-generated.ts' || path === 'scripts/validate-yandex-build.py' || path === 'package.json') {
    return {
      title,
      category: 'Testing',
      summary: 'Tests and validation hooks for the generated repo.',
      detail: 'These files keep the generated project honest with unit checks, smoke tests, and release validation scripts.',
      whenToOpen: 'Open this when you want to verify that the repo still boots and behaves as expected.',
    };
  }

  if (path.startsWith('src/game/config/') || path.startsWith('src/game/events/') || path.startsWith('src/game/state/') || path.startsWith('src/game/assets/') || path.startsWith('src/game/scenes/') || path.startsWith('src/game/save/') || path.startsWith('src/game/input/') || path.startsWith('src/game/ui/') || path.startsWith('src/game/systems/') || path.startsWith('src/game/entities/') || path.startsWith('src/game/utils/')) {
    return {
      title,
      category: 'Runtime core',
      summary: 'Phaser runtime, state, scenes, and support systems.',
      detail: 'This is the gameplay foundation: configuration, events, scene flow, runtime state, and helpers that the game uses every frame.',
      whenToOpen: 'Open this when you are changing gameplay structure or runtime behavior.',
    };
  }

  if (path.startsWith('docs/') || path.startsWith('templates/')) {
    return {
      title,
      category: 'Config',
      summary: 'Documentation and reusable starter material.',
      detail: 'These files explain how to use the project, how the generator works, and what reusable modules are available.',
      whenToOpen: 'Open this when you need guidance, conventions, or shared module templates.',
    };
  }

  if (path.startsWith('.cursor/') || path.startsWith('.github/') || path.startsWith('.ai/')) {
    return {
      title,
      category: 'Agent instructions',
      summary: 'Repository metadata for coding assistants.',
      detail: 'These files give editor integrations and agents the right assumptions before they touch the codebase.',
      whenToOpen: 'Open this when the task is about repository automation or assistant behavior.',
    };
  }

  return {
    title,
    category: 'Other',
    summary: 'Supporting project file.',
    detail: 'A utility or config file that supports the generated starter without being part of the visible gameplay loop.',
    whenToOpen: 'Open this if the task touches build setup, tooling, or a file outside the main runtime.',
  };
}

function buildArchiveEntries(files: Array<{ path: string }>): ArchiveFileEntry[] {
  return files.map((file) => ({ path: file.path, info: describeArchiveFile(file.path) }));
}

function renderArchiveTree(entries: ArchiveFileEntry[]): void {
  const groupedEntries = new Map<string, ArchiveFileEntry[]>();

  for (const category of archiveCategoryOrder) {
    groupedEntries.set(category, []);
  }

  for (const entry of entries) {
    const bucket = groupedEntries.get(entry.info.category) ?? groupedEntries.get('Other')!;
    bucket.push(entry);
  }

  archiveTree.innerHTML = Array.from(groupedEntries.entries())
    .filter(([, items]) => items.length > 0)
    .map(
      ([category, items]) => `
        <section class="archive-folder">
          <div class="archive-folder-head">
            <strong>${escapeHtml(category)}</strong>
            <span>${items.length} files</span>
          </div>
          <div class="archive-file-list">
            ${items
              .map(
                (entry) => `
                  <button class="archive-file${entry.path === selectedArchivePath ? ' active' : ''}" type="button" data-archive-path="${escapeHtml(entry.path)}">
                    <span class="archive-file-name">${escapeHtml(entry.info.title)}</span>
                    <span class="archive-file-summary">${escapeHtml(entry.info.summary)}</span>
                  </button>
                `,
              )
              .join('')}
          </div>
        </section>
      `,
    )
    .join('');

  archiveTree.querySelectorAll<HTMLButtonElement>('[data-archive-path]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedArchivePath = button.dataset.archivePath ?? '';
      renderArchiveInspector(entries);
      renderArchiveTree(entries);
    });
  });
}

function renderArchiveInspector(entries: ArchiveFileEntry[]): void {
  const selected = entries.find((entry) => entry.path === selectedArchivePath) ?? entries[0];

  if (!selected) {
    archiveInspector.innerHTML = '<p>No files found.</p>';
    return;
  }

  selectedArchivePath = selected.path;
  archiveInspector.innerHTML = `
    <p class="eyebrow">${escapeHtml(selected.info.category)}</p>
    <h3>${escapeHtml(selected.info.title)}</h3>
    <p class="archive-inspector-summary">${escapeHtml(selected.info.summary)}</p>
    <dl class="archive-inspector-grid">
      <div>
        <dt>What it does</dt>
        <dd>${escapeHtml(selected.info.detail)}</dd>
      </div>
      <div>
        <dt>When to open</dt>
        <dd>${escapeHtml(selected.info.whenToOpen)}</dd>
      </div>
      <div>
        <dt>Path</dt>
        <dd><code>${escapeHtml(selected.path)}</code></dd>
      </div>
    </dl>
  `;
}

function renderHeroHighlight(highlightId: string): void {
  const highlight = heroHighlights.find((entry) => entry.id === highlightId) ?? heroHighlights[0];

  if (!highlight) {
    return;
  }

  activeHeroHighlight = highlight.id;
  heroExplainer.innerHTML = `
    <strong>${escapeHtml(highlight.title)}</strong>
    <p>${escapeHtml(highlight.detail)}</p>
  `;

  for (const button of heroHighlightsRoot.querySelectorAll<HTMLButtonElement>('[data-highlight]')) {
    button.classList.toggle('active', button.dataset.highlight === highlight.id);
    button.setAttribute('aria-pressed', String(button.dataset.highlight === highlight.id));
  }
}

function renderHeroHighlights(): void {
  heroHighlightsRoot.innerHTML = heroHighlights
    .map(
      (highlight) => `
        <button class="hero-highlight${highlight.id === activeHeroHighlight ? ' active' : ''}" type="button" data-highlight="${highlight.id}" aria-pressed="${String(highlight.id === activeHeroHighlight)}">
          <span class="hero-highlight-head">
            <span class="eyebrow">${escapeHtml(highlight.eyebrow)}</span>
            <span class="hero-highlight-question" aria-hidden="true">?</span>
          </span>
          <strong>${escapeHtml(highlight.title)}</strong>
          <p>${escapeHtml(highlight.summary)}</p>
        </button>
      `,
    )
    .join('');

  heroHighlightsRoot.querySelectorAll<HTMLButtonElement>('[data-highlight]').forEach((button) => {
    button.addEventListener('click', () => renderHeroHighlight(button.dataset.highlight ?? ''));
  });

  renderHeroHighlight(activeHeroHighlight);
}

function attachSkillWallExplainers(): void {
  skillWall.querySelectorAll<HTMLButtonElement>('.skill-chip').forEach((button) => {
    button.addEventListener('click', () => {
      const chipId = button.dataset.chip ?? '';
      const chip = heroChips.find((entry) => entry.id === chipId);

      if (!chip) {
        return;
      }

      heroExplainer.innerHTML = `
        <strong>${escapeHtml(chip.label)}</strong>
        <p>${escapeHtml(chip.detail)}</p>
      `;

      for (const chipButton of skillWall.querySelectorAll<HTMLButtonElement>('.skill-chip')) {
        chipButton.classList.toggle('active', chipButton.dataset.chip === chip.id);
      }
    });
  });
}

function readOptions(): ProjectOptions {
  const title = titleFromName(projectName.value);
  return {
    projectName: projectName.value,
    gameIdea: gameIdea.value,
    slug: slugifyProjectName(projectName.value),
    title,
    target: document.querySelector<HTMLInputElement>('input[name="target"]:checked')?.value === 'desktop' ? 'desktop' : 'mobile',
    includeIdlePack: idlePack.checked,
    includeYandexGames: yandexGames.checked,
    includePwa: false,
    includeArcadePhysics: true,
    includeTilemaps: false,
    includePlaywright: true,
  };
}

function renderPreview(): void {
  const options = readOptions();
  const files = getProjectFiles(options);
  const notableFiles = files
    .map((file) => file.path)
    .filter((path) => {
      return (
        path === 'START_HERE.md' ||
        path === 'GAME_BRIEF.md' ||
        path === 'NEXT_AGENT_TASK.md' ||
        path === 'AGENTS.md' ||
        path === 'CLAUDE.md' ||
        path === 'GEMINI.md' ||
        path.startsWith('.ai/') ||
        path.startsWith('.cursor/') ||
        path.startsWith('.github/') ||
        path.startsWith('skills/') ||
        path.startsWith('docs/yandex') ||
        path.startsWith('docs/IDLE') ||
        path.startsWith('scripts/') ||
        path.startsWith('tests/') ||
        path.startsWith('src/data/') ||
        path.startsWith('src/game/idle/') ||
        path.startsWith('src/game/assets/') ||
        path.startsWith('src/game/config/') ||
        path.startsWith('src/game/events/') ||
        path.startsWith('src/game/save/') ||
        path.startsWith('src/game/platform/') ||
        path.startsWith('src/game/scenes/') ||
        path.startsWith('src/game/state/') ||
        path.startsWith('src/game/input/') ||
        path.startsWith('src/game/ui/') ||
        path === 'package.json'
      );
    })
    .slice(0, 64);
  const archiveEntries = buildArchiveEntries(notableFiles.map((path) => ({ path })));
  previewTitle.textContent = `${options.slug}.zip`;
  fileCount.textContent = `${files.length} files`;
  skillWall.querySelector<HTMLButtonElement>('[data-chip="idle"]')?.classList.toggle('active', options.includeIdlePack);
  skillWall.querySelector<HTMLButtonElement>('[data-chip="yandex"]')?.classList.toggle('active', options.includeYandexGames);
  idleBadge.classList.toggle('active', options.includeIdlePack);
  yandexBadge.classList.toggle('active', options.includeYandexGames);
  gameIdea.placeholder = options.includeIdlePack
    ? 'Example: Space bakery that bakes stars while offline'
    : 'Example: Vampire Survivors but with cats';
  if (!selectedArchivePath || !archiveEntries.some((entry) => entry.path === selectedArchivePath)) {
    selectedArchivePath = archiveEntries[0]?.path ?? '';
  }

  renderArchiveTree(archiveEntries);
  renderArchiveInspector(archiveEntries);
}

async function createZip(options: ProjectOptions): Promise<Blob> {
  const zip = new JSZip();
  const root = zip.folder(options.slug);

  if (!root) {
    throw new Error('Could not create ZIP root folder');
  }

  for (const file of getProjectFiles(options)) {
    root.file(file.path, file.content);
  }

  return zip.generateAsync({ type: 'blob' });
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[char];
  });
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const options = readOptions();
  const blob = await createZip(options);
  downloadBlob(blob, `${options.slug}.zip`);
});

for (const input of [projectName, gameIdea, ...document.querySelectorAll<HTMLInputElement>('input[name="target"]')]) {
  input.addEventListener('input', renderPreview);
  input.addEventListener('change', renderPreview);
}

idlePack.addEventListener('change', renderPreview);
yandexGames.addEventListener('change', renderPreview);
themeToggle.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === darkTheme ? 'light' : darkTheme;
  applyTheme(nextTheme);
  saveTheme(nextTheme);
  renderThemeToggle();
});

renderThemeToggle();
renderHeroHighlights();
attachSkillWallExplainers();
renderPreview();
