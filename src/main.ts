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
const archiveBlocks = [
  {
    id: 'onboarding',
    title: 'Start docs',
    count: '5 files',
    summary: 'Human-readable entry points for the generated project.',
    detail: 'Brief, first task, README, and start guide explain what to do after downloading the ZIP.',
    examples: ['START_HERE.md', 'GAME_BRIEF.md', 'NEXT_AGENT_TASK.md'],
  },
  {
    id: 'agents',
    title: 'Agent instructions',
    count: '8+ files',
    summary: 'Context files for Codex, Claude, Gemini, Cursor, and Copilot.',
    detail: 'They tell coding agents how to route work, which skills to use, and what not to break.',
    examples: ['AGENTS.md', 'CLAUDE.md', '.ai/skill-manifest.json'],
  },
  {
    id: 'skills',
    title: 'Local AI skills',
    count: '30+ skills',
    summary: 'Task-specific workflows for Phaser game development.',
    detail: 'Physics, camera, economy, save migrations, UI polish, asset work, testing, and publishing all get local guidance.',
    examples: ['skills/phaser-testing', 'skills/phaser-ui-hud', 'skills/phaser-progression-economy'],
  },
  {
    id: 'runtime',
    title: 'Phaser runtime',
    count: 'Core source',
    summary: 'The actual starter game architecture.',
    detail: 'Scene flow, EventBus, GameState, SaveManager, asset manifest, input, UI, and runtime helpers are already wired.',
    examples: ['src/game/scenes', 'src/game/state', 'src/game/save'],
  },
  {
    id: 'validation',
    title: 'Tests and checks',
    count: 'Unit + smoke',
    summary: 'Verification for generated projects.',
    detail: 'Vitest checks pure logic; Playwright confirms that the canvas boots on desktop and mobile.',
    examples: ['tests/unit', 'tests/smoke.spec.ts', 'npm run test:smoke'],
  },
  {
    id: 'optional',
    title: 'Optional packs',
    count: 'Idle / Yandex',
    summary: 'Extra systems only when the user enables them.',
    detail: 'Idle adds economy systems and balancing docs. Yandex adds SDK startup, platform checks, and release helpers.',
    examples: ['docs/IDLE_GAME_DESIGN.md', 'src/game/idle', 'docs/yandex-games.md'],
  },
] as const;

let selectedArchiveBlock: (typeof archiveBlocks)[number]['id'] = archiveBlocks[0]?.id ?? 'onboarding';

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

function renderArchiveBlocks(): void {
  archiveTree.innerHTML = archiveBlocks
    .map(
      (block) => `
        <button class="archive-block${block.id === selectedArchiveBlock ? ' active' : ''}" type="button" data-archive-block="${block.id}" aria-pressed="${String(block.id === selectedArchiveBlock)}">
          <span>
            <strong>${escapeHtml(block.title)}</strong>
            <small>${escapeHtml(block.count)}</small>
          </span>
          <p>${escapeHtml(block.summary)}</p>
        </button>
      `,
    )
    .join('');

  archiveTree.querySelectorAll<HTMLButtonElement>('[data-archive-block]').forEach((button) => {
    button.addEventListener('click', () => {
      selectedArchiveBlock = (button.dataset.archiveBlock as typeof selectedArchiveBlock) ?? 'onboarding';
      renderArchiveBlocks();
      renderArchiveInspector();
    });
  });
}

function renderArchiveInspector(): void {
  const selected = archiveBlocks.find((block) => block.id === selectedArchiveBlock) ?? archiveBlocks[0];

  if (!selected) {
    archiveInspector.innerHTML = '';
    return;
  }

  archiveInspector.innerHTML = `
    <p class="eyebrow">${escapeHtml(selected.count)}</p>
    <h3>${escapeHtml(selected.title)}</h3>
    <p class="archive-inspector-summary">${escapeHtml(selected.detail)}</p>
    <div class="archive-examples" aria-label="Examples">
      ${selected.examples.map((example) => `<code>${escapeHtml(example)}</code>`).join('')}
    </div>
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
  previewTitle.textContent = `${options.slug}.zip`;
  fileCount.textContent = `${files.length} files`;
  skillWall.querySelector<HTMLButtonElement>('[data-chip="idle"]')?.classList.toggle('active', options.includeIdlePack);
  skillWall.querySelector<HTMLButtonElement>('[data-chip="yandex"]')?.classList.toggle('active', options.includeYandexGames);
  idleBadge.classList.toggle('active', options.includeIdlePack);
  yandexBadge.classList.toggle('active', options.includeYandexGames);
  gameIdea.placeholder = options.includeIdlePack
    ? 'Example: Space bakery that bakes stars while offline'
    : 'Example: Vampire Survivors but with cats';
  renderArchiveBlocks();
  renderArchiveInspector();
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
