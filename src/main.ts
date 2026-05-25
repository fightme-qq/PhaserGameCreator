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
      <div class="nav-pill">Static ZIP generator</div>
    </header>

    <section class="stage">
      <div class="statement">
        <p class="eyebrow">Agent-ready game repository</p>
        <h1>Best skills for Phaser games.</h1>
        <p class="lead">
          Generate a complete Phaser starter repo with AGENTS.md, local AI skills, source maps,
          validation notes, and a project structure that Codex, Claude, or Gemini can understand immediately.
        </p>

        <div class="skill-wall" aria-label="Included sources and systems">
          <span>Anthropic Skill Creator</span>
          <span>Phaser Official Skills</span>
          <span>Agent Skills Spec</span>
          <span>Phaser + TypeScript</span>
          <span>Vite Template</span>
          <span>Playwright Smoke Tests</span>
          <span>Mobile/Desktop Input</span>
          <span>Responsive Layout</span>
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
        <div class="next-action">
          <strong>Next:</strong> unzip, open the folder in your coding agent, then paste:
          <code>Read START_HERE.md, AGENTS.md, and NEXT_AGENT_TASK.md. Guide me to the smallest first playable.</code>
        </div>
      </form>
    </section>

    <section class="flow">
      <article>
        <span>Open</span>
        <strong>Drop the archive into an agent workspace.</strong>
        <p>The repo tells the agent where to start and which local skills to use.</p>
      </article>
      <article>
        <span>Build</span>
        <strong>Work through Phaser-specific skills.</strong>
        <p>Architecture, scenes, assets, input, layout, UI, gamefeel, and tests are routed explicitly.</p>
      </article>
      <article>
        <span>Ship</span>
        <strong>Add Yandex publishing when needed.</strong>
        <p>The optional pack adds SDK and moderation knowledge without cluttering every project.</p>
      </article>
    </section>

    <section class="payload">
      <div class="payload-head">
        <div>
          <p class="eyebrow">Archive contents</p>
          <h2>Agent operating system + Phaser starter</h2>
        </div>
        <span id="file-count">0 files</span>
      </div>
      <div class="tree" id="file-tree"></div>
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
        path.startsWith('src/game/platform/') ||
        path.startsWith('src/game/scenes/') ||
        path.startsWith('src/game/input/') ||
        path === 'package.json'
      );
    })
    .slice(0, 42);

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
