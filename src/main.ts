import JSZip from 'jszip';
import { getProjectFiles } from './projectTemplate';
import type { ProjectOptions } from './types';
import { downloadBlob, slugifyProjectName, titleFromName } from './utils';
import './styles.css';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root not found');
}

app.innerHTML = `
  <section class="page">
    <header class="nav">
      <div class="brand">
        <span></span>
        <strong>Phaser Game Creator</strong>
      </div>
      <div class="nav-pill">Agent-ready Phaser archive</div>
    </header>

    <section class="stage">
      <div class="statement">
        <p class="eyebrow">Production-minded Phaser starter</p>
        <h1>Best skills for Phaser games.</h1>
        <p class="lead">
          Generate a complete Phaser + TypeScript project with architecture, local skills, tests,
          scene communication, save slots, asset rules, and publishing checks already wired in.
        </p>

        <div class="skill-wall" aria-label="Included sources and systems">
          <span>EventBus + GameState</span>
          <span>SaveManager with slots</span>
          <span>Scene transitions</span>
          <span>Phaser + TypeScript</span>
          <span>Vitest unit tests</span>
          <span>Playwright desktop/mobile smoke</span>
          <span>Visual taste + brandkit skills</span>
          <span>Spritesheet optimization guide</span>
          <span>Object pool templates</span>
          <span id="yandex-badge">Yandex Games optional</span>
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
        <span>Local agent skills</span>
        <span>Phaser runtime skeleton</span>
        <span>Unit and smoke tests</span>
        <span>Asset and publishing docs</span>
      </div>
      <div class="tree" id="file-tree"></div>
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
const yandexGames = document.querySelector<HTMLInputElement>('#yandex-games')!;
const previewTitle = document.querySelector<HTMLHeadingElement>('#preview-title')!;
const fileCount = document.querySelector<HTMLSpanElement>('#file-count')!;
const fileTree = document.querySelector<HTMLDivElement>('#file-tree')!;
const yandexBadge = document.querySelector<HTMLSpanElement>('#yandex-badge')!;

function readOptions(): ProjectOptions {
  const title = titleFromName(projectName.value);
  return {
    projectName: projectName.value,
    gameIdea: gameIdea.value,
    slug: slugifyProjectName(projectName.value),
    title,
    target: document.querySelector<HTMLInputElement>('input[name="target"]:checked')?.value === 'desktop' ? 'desktop' : 'mobile',
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
  yandexBadge.classList.toggle('active', options.includeYandexGames);

  const importantFiles = files
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
        path.startsWith('scripts/') ||
        path.startsWith('tests/') ||
        path.startsWith('src/game/assets/') ||
        path.startsWith('src/game/config/') ||
        path.startsWith('src/game/events/') ||
        path.startsWith('src/game/save/') ||
        path.startsWith('src/game/platform/') ||
        path.startsWith('src/game/scenes/') ||
        path.startsWith('src/game/state/') ||
        path.startsWith('src/game/input/') ||
        path === 'package.json'
      );
    })
    .slice(0, 64);

  fileTree.innerHTML = importantFiles.map((path) => `<div>${escapeHtml(path)}</div>`).join('');
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

yandexGames.addEventListener('change', renderPreview);

renderPreview();
