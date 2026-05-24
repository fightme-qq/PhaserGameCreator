import type { GeneratedFile, ProjectOptions } from '../types';

export function phaserSource(options: ProjectOptions): GeneratedFile[] {
  return [
    {
      path: 'src/main.ts',
      content: `import Phaser from 'phaser';
import './style.css';
import { gameConfig } from './game/config/gameConfig';
${options.includeYandexGames ? "import { initYandexGames, registerPhaserGame } from './game/platform/yandexGames';" : ''}

${options.includeYandexGames ? 'void initYandexGames();\nconst game = new Phaser.Game(gameConfig);\nregisterPhaserGame(game);' : 'new Phaser.Game(gameConfig);'}
`,
    },
    ...(options.includeYandexGames
      ? [
          {
            path: 'src/game/platform/yandexGames.ts',
            content: `import Phaser from 'phaser';

type YandexSDK = {
  features?: {
    LoadingAPI?: { ready(): void };
    GameplayAPI?: { start(): void; stop(): void };
  };
  environment?: { i18n?: { lang?: string } };
  on?(event: string, callback: () => void): void;
};

declare global {
  interface Window {
    YaGames?: { init(): Promise<YandexSDK> };
    ysdk?: YandexSDK;
    __sdkDone?: boolean;
    __bootDone?: boolean;
    __phaserGame?: Phaser.Game;
    __trySignalReady?: () => void;
  }
}

window.__sdkDone = false;
window.__bootDone = false;

export function registerPhaserGame(game: Phaser.Game): void {
  window.__phaserGame = game;
}

export function signalPhaserBootReady(): void {
  window.__bootDone = true;
  window.__trySignalReady?.();
}

export function gameplayStart(): void {
  window.ysdk?.features?.GameplayAPI?.start();
}

export function gameplayStop(): void {
  window.ysdk?.features?.GameplayAPI?.stop();
}

export async function initYandexGames(): Promise<void> {
  window.__trySignalReady = () => {
    if (window.__sdkDone && window.__bootDone) {
      window.ysdk?.features?.LoadingAPI?.ready();
    }
  };

  window.setTimeout(() => {
    if (!window.__sdkDone) {
      window.__sdkDone = true;
      window.__trySignalReady?.();
    }
  }, 5000);

  try {
    if (window.YaGames) {
      const ysdk = await window.YaGames.init();
      window.ysdk = ysdk;
      void ysdk.environment?.i18n?.lang;

      ysdk.on?.('game_api_pause', () => {
        window.__phaserGame?.loop.sleep();
        gameplayStop();
      });

      ysdk.on?.('game_api_resume', () => {
        window.__phaserGame?.loop.wake();
        gameplayStart();
      });
    }
  } catch {
    // Local dev or SDK unavailable. Continue without blocking the game.
  } finally {
    window.__sdkDone = true;
    window.__trySignalReady?.();
  }
}
`,
          },
        ]
      : []),
    {
      path: 'src/game/config/gameConfig.ts',
      content: `import Phaser from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { TemplateGuideScene } from '../scenes/TemplateGuideScene';
import { GameScene } from '../scenes/GameScene';
import { UIScene } from '../scenes/UIScene';
import { SceneKeys } from './sceneKeys';

export const GAME_WIDTH = 1280;
export const GAME_HEIGHT = 720;

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game-root',
  backgroundColor: '#10131a',
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: false,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  ${options.includeArcadePhysics ? "physics: {\n    default: 'arcade',\n    arcade: { debug: false },\n  }," : ''}
  scene: [BootScene, PreloadScene, TemplateGuideScene, GameScene, UIScene],
};
`,
    },
    {
      path: 'src/game/config/sceneKeys.ts',
      content: `export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  TemplateGuide: 'TemplateGuideScene',
  Game: 'GameScene',
  UI: 'UIScene',
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
`,
    },
    {
      path: 'src/game/config/gameEvents.ts',
      content: `export const GameEvents = {
  ScoreChanged: 'score-changed',
  BestScoreChanged: 'best-score-changed',
  GameplayStarted: 'gameplay-started',
  GameplayStopped: 'gameplay-stopped',
} as const;

export type GameEvent = (typeof GameEvents)[keyof typeof GameEvents];
`,
    },
    {
      path: 'src/game/assets/assetManifest.ts',
      content: `import Phaser from 'phaser';

export const AssetKeys = {
  // Add stable asset keys here.
} as const;

export type ImageAsset = {
  key: string;
  url: string;
};

export const imageAssets: ImageAsset[] = [];

export function loadImageManifest(scene: Phaser.Scene): void {
  for (const asset of imageAssets) {
    scene.load.image(asset.key, asset.url);
  }
}
`,
    },
    {
      path: 'src/game/scenes/BootScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
${options.includeYandexGames ? "import { signalPhaserBootReady } from '../platform/yandexGames';" : ''}

export class BootScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  create(): void {
    ${options.includeYandexGames ? 'signalPhaserBootReady();' : ''}
    this.scene.start(SceneKeys.Preload);
  }
}
`,
    },
    {
      path: 'src/game/scenes/PreloadScene.ts',
      content: `import Phaser from 'phaser';
import { loadImageManifest } from '../assets/assetManifest';
import { SceneKeys } from '../config/sceneKeys';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preload);
  }

  preload(): void {
    loadImageManifest(this);
  }

  create(): void {
    this.scene.start(SceneKeys.Game);
  }
}
`,
    },
    {
      path: 'src/game/scenes/TemplateGuideScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';

const ideaPrompts = [
  'Make a one-button arcade game about dodging falling stars.',
  'Make a cozy card collection game with satisfying pack openings.',
  'Make a top-down arena game where the player survives for 60 seconds.',
  'Make a puzzle game about connecting energy nodes on a grid.',
  'Make an idle clicker where tiny machines build a strange factory.',
  'Make a tilemap adventure with one room, one key, and one locked door.',
];

export class TemplateGuideScene extends Phaser.Scene {
  private currentPrompt = 0;
  private promptText!: Phaser.GameObjects.Text;
  private spinHint!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.TemplateGuide);
  }

  create(): void {
    const { width, height } = this.scale;
    createTitleText(this, width / 2, height * 0.16, '${options.title}');

    this.add
      .text(width / 2, height * 0.27, 'Pick a prompt, open this repo with an agent, and build the first playable loop.', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '24px',
        color: '#b9c7e6',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add.rectangle(width / 2, height * 0.5, width * 0.72, height * 0.26, 0x151b26, 0.96);
    this.add.rectangle(width / 2, height * 0.5, width * 0.72, height * 0.26).setStrokeStyle(2, 0x33435f);

    this.promptText = this.add
      .text(width / 2, height * 0.47, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Arial, sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: width * 0.6 },
      })
      .setOrigin(0.5);

    this.spinHint = this.add
      .text(width / 2, height * 0.62, 'Click / tap / Space to spin ideas', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#7ee7c8',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: this.spinHint,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      duration: 850,
    });

    this.add
      .text(width / 2, height * 0.78, 'Press Enter to open the sandbox scene', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7d8aa5',
      })
      .setOrigin(0.5);

    this.input.on('pointerdown', () => this.spinPrompt());
    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());
    this.input.keyboard?.once('keydown-ENTER', () => this.scene.start(SceneKeys.Game));
  }

  private spinPrompt(): void {
    this.currentPrompt = (this.currentPrompt + 1) % ideaPrompts.length;
    this.promptText.setText(ideaPrompts[this.currentPrompt]);

    this.tweens.add({
      targets: this.promptText,
      scale: { from: 0.96, to: 1 },
      alpha: { from: 0.55, to: 1 },
      duration: 160,
      ease: 'Sine.easeOut',
    });
  }
}
`,
    },
    {
      path: 'src/game/scenes/GameScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';
${options.includeYandexGames ? "import { gameplayStart, gameplayStop } from '../platform/yandexGames';" : ''}

const ideaPrompts = [
  'Make a one-button arcade game about dodging falling stars.',
  'Make a cozy card collection game with satisfying pack openings.',
  'Make a top-down arena game where the player survives for 60 seconds.',
  'Make a puzzle game about connecting energy nodes on a grid.',
  'Make an idle clicker where tiny machines build a strange factory.',
  'Make a tilemap adventure with one room, one key, and one locked door.',
];

export class GameScene extends Phaser.Scene {
  private currentPrompt = 0;
  private promptText!: Phaser.GameObjects.Text;
  private promptIndexText!: Phaser.GameObjects.Text;
  private promptAccent!: Phaser.GameObjects.Arc;
  private copyStatusText!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Game);
  }

  create(): void {
    const { width, height } = this.scale;

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());

    this.drawBackground(width, height);

    this.add
      .text(72, 58, 'PHASER GAME CREATOR', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '15px',
        color: '#7ee7c8',
      })
      .setOrigin(0, 0.5);

    createTitleText(this, 70, 138, '${options.title}').setOrigin(0, 0.5).setDepth(4);

    this.add
      .text(74, 210, 'A clean agent workspace: audit the repo, choose a loop, build with skills, validate before done.', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '22px',
        color: '#d8e2f8',
        wordWrap: { width: 540 },
      })
      .setOrigin(0, 0.5);

    this.drawWorkflowPanel(72, 276, 540, 204);
    this.drawSkillMatrix(72, 512);
    const promptPanel = { x: 680, y: 92, width: 528, height: 520 };
    this.drawPromptConsole(promptPanel.x, promptPanel.y, promptPanel.width, promptPanel.height);

    this.promptText = this.add
      .text(promptPanel.x + promptPanel.width / 2, promptPanel.y + 228, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '32px',
        color: '#ffffff',
        align: 'left',
        wordWrap: { width: 376 },
      })
      .setOrigin(0.5);

    this.promptIndexText = this.add
      .text(promptPanel.x + promptPanel.width - 152, promptPanel.y + 40, 'PROMPT 01 / 06', {
        fontFamily: 'Consolas, monospace',
        fontSize: '14px',
        color: '#7ee7c8',
      })
      .setOrigin(0, 0.5);

    this.copyStatusText = this.add
      .text(promptPanel.x + promptPanel.width / 2, promptPanel.y + promptPanel.height - 74, 'Space spins ideas. Copy sends this prompt to your clipboard.', {
        fontFamily: 'Consolas, monospace',
        fontSize: '13px',
        color: '#8c98b4',
        align: 'center',
        wordWrap: { width: 408 },
      })
      .setOrigin(0.5);

    const buttonY = promptPanel.y + promptPanel.height - 168;
    const spinButton = this.createButton(promptPanel.x + 152, buttonY, 188, 48, 'SPIN IDEA', 0x7ee7c8, () => this.spinPrompt());
    const copyButton = this.createButton(promptPanel.x + 376, buttonY, 224, 48, 'COPY PROMPT', 0xffc857, () => void this.copyPrompt());

    this.add
      .text(72, height - 52, 'AGENT BRAIN // agent:audit / skills / recipes / blueprints / module templates / quality gates', {
        fontFamily: 'Consolas, monospace',
        fontSize: '15px',
        color: '#8c98b4',
      })
      .setOrigin(0, 0.5);

    this.tweens.add({
      targets: [spinButton, copyButton],
      y: '+=2',
      repeat: -1,
      yoyo: true,
      duration: 1400,
      ease: 'Sine.easeInOut',
    });

    this.tweens.add({
      targets: this.promptAccent,
      scale: 1.08,
      alpha: 0.55,
      yoyo: true,
      repeat: -1,
      duration: 1180,
      ease: 'Sine.easeInOut',
    });

    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());

    ${options.includeYandexGames ? 'gameplayStart();' : ''}
  }

  shutdown(): void {
    ${options.includeYandexGames ? 'gameplayStop();' : ''}
  }

  update(): void {}

  private drawBackground(width: number, height: number): void {
    this.add.rectangle(width / 2, height / 2, width, height, 0x0c1017);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x111824, 0.9);
    graphics.fillRect(0, 0, width, height);

    graphics.lineStyle(1, 0x1b2637, 0.46);

    for (let x = 0; x <= width; x += 56) {
      graphics.lineBetween(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += 56) {
      graphics.lineBetween(0, y, width, y);
    }

    graphics.fillStyle(0x7ee7c8, 0.045);
    graphics.fillCircle(width * 0.2, height * 0.15, 270);
    graphics.fillStyle(0xffc857, 0.04);
    graphics.fillCircle(width * 0.82, height * 0.72, 310);
  }

  private drawPanel(x: number, y: number, width: number, height: number, accent = 0x33435f): void {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x121925, 0.96);
    graphics.fillRoundedRect(x, y, width, height, 10);
    graphics.lineStyle(2, accent, 0.95);
    graphics.strokeRoundedRect(x, y, width, height, 10);
    graphics.lineStyle(1, 0x7ee7c8, 0.26);
    graphics.lineBetween(x + 20, y + 20, x + width - 20, y + 20);
  }

  private drawWorkflowPanel(x: number, y: number, width: number, height: number): void {
    this.drawPanel(x, y, width, height, 0x2f4565);
    this.add.text(x + 24, y + 32, 'AGENT OPERATING LOOP', {
      fontFamily: 'Consolas, monospace',
      fontSize: '13px',
      color: '#7ee7c8',
    });

    const steps = [
      ['01', 'AUDIT', 'repo snapshot'],
      ['02', 'INTAKE', '3 loop options'],
      ['03', 'BUILD', 'skills + templates'],
      ['04', 'VERIFY', 'quality gates'],
    ];

    steps.forEach((step, index) => {
      const itemX = x + 24 + index * 126;
      const itemY = y + 102;
      this.add.rectangle(itemX + 50, itemY, 100, 92, 0x172235, 0.96).setStrokeStyle(1, 0x415779, 0.9);
      this.add.text(itemX + 14, itemY - 30, step[0], {
        fontFamily: 'Consolas, monospace',
        fontSize: '14px',
        color: '#ffc857',
      });
      this.add.text(itemX + 14, itemY - 5, step[1], {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '16px',
        color: '#ffffff',
      });
      this.add.text(itemX + 14, itemY + 22, step[2], {
        fontFamily: 'Consolas, monospace',
        fontSize: '11px',
        color: '#8d9bb7',
        wordWrap: { width: 76 },
      });

      if (index < steps.length - 1) {
        this.add.line(0, 0, itemX + 102, itemY, itemX + 122, itemY, 0x7ee7c8, 0.42).setOrigin(0);
      }
    });
  }

  private drawSkillMatrix(x: number, y: number): void {
    this.drawPanel(x, y, 540, 126, 0x263a55);
    this.add.text(x + 22, y + 32, 'LOADED AGENT PACK', {
      fontFamily: 'Consolas, monospace',
      fontSize: '13px',
      color: '#7ee7c8',
    });

    const chips = ['15 skills', '14 recipes', '8 templates', '5 blueprints', 'quality gates', 'Yandex-ready option'];
    chips.forEach((chip, index) => {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const chipX = x + 24 + col * 166;
      const chipY = y + 66 + row * 40;
      this.add.rectangle(chipX + 70, chipY, 140, 27, 0x1a2536, 0.96).setStrokeStyle(1, 0x415779, 0.85);
      this.add.text(chipX + 14, chipY, chip, {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '13px',
        color: '#e8eefc',
      }).setOrigin(0, 0.5);
    });
  }

  private drawPromptConsole(x: number, y: number, width: number, height: number): void {
    this.drawPanel(x, y, width, height, 0x4c6389);

    this.promptAccent = this.add.circle(x + width - 58, y + 54, 20, 0x7ee7c8, 0.18);
    this.add.circle(x + width - 58, y + 54, 7, 0x7ee7c8, 0.92);

    this.add.text(x + 34, y + 40, 'PROMPT DRUM', {
      fontFamily: 'Consolas, monospace',
      fontSize: '15px',
      color: '#7ee7c8',
    });

    this.add.text(x + 34, y + 78, 'Pick one seed prompt, copy it, and paste it into Codex, Claude, Gemini, or Cursor.', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '18px',
      color: '#aebbdd',
      wordWrap: { width: width - 80 },
    });

    this.add.rectangle(x + width / 2, y + 228, width - 72, 182, 0x0e141f, 0.82).setStrokeStyle(1, 0x263a55);
    this.add.line(0, 0, x + 58, y + height - 106, x + width - 58, y + height - 106, 0xffc857, 0.34).setOrigin(0);
  }

  private createButton(
    x: number,
    y: number,
    width: number,
    height: number,
    label: string,
    accent: number,
    onClick: () => void,
  ): Phaser.GameObjects.Container {
    const container = this.add.container(x, y);
    const background = this.add.rectangle(0, 0, width, height, 0x172235, 0.98).setStrokeStyle(2, accent, 0.9);
    const text = this.add
      .text(0, 0, label, {
        fontFamily: 'Consolas, monospace',
        fontSize: '16px',
        color: '#ffffff',
      })
      .setOrigin(0.5);

    container.add([background, text]);
    container.setSize(width, height);
    container.setInteractive({ useHandCursor: true });
    container.on('pointerover', () => {
      background.setFillStyle(0x20304a, 1);
      text.setColor('#7ee7c8');
    });
    container.on('pointerout', () => {
      background.setFillStyle(0x172235, 0.98);
      text.setColor('#ffffff');
    });
    container.on('pointerdown', onClick);

    return container;
  }

  private async copyPrompt(): Promise<void> {
    const prompt = ideaPrompts[this.currentPrompt];

    try {
      await navigator.clipboard.writeText(prompt);
      this.copyStatusText.setText('Copied. Paste this into your agent to start the first playable loop.');
      this.copyStatusText.setColor('#7ee7c8');
    } catch {
      this.copyStatusText.setText('Copy blocked by browser. Select the prompt text manually or use HTTPS/local permissions.');
      this.copyStatusText.setColor('#ffc857');
    }

    this.tweens.add({
      targets: this.copyStatusText,
      scale: { from: 1.04, to: 1 },
      duration: 180,
      ease: 'Sine.easeOut',
    });
  }

  private spinPrompt(): void {
    this.currentPrompt = (this.currentPrompt + 1) % ideaPrompts.length;
    this.promptText.setText(ideaPrompts[this.currentPrompt]);
    this.promptIndexText.setText('PROMPT ' + String(this.currentPrompt + 1).padStart(2, '0') + ' / 06');

    this.tweens.add({
      targets: this.promptText,
      scale: { from: 0.96, to: 1 },
      alpha: { from: 0.55, to: 1 },
      duration: 160,
      ease: 'Sine.easeOut',
    });

    this.tweens.add({
      targets: this.promptAccent,
      scale: { from: 1.25, to: 1 },
      alpha: { from: 0.85, to: 0.18 },
      duration: 260,
      ease: 'Sine.easeOut',
    });
  }
}
`,
    },
    {
      path: 'src/game/scenes/UIScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';

type UIData = {
  title: string;
  status: string;
};

export class UIScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.UI);
  }

  create(data: UIData): void {
    this.add
      .text(24, 20, data.title, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '22px',
        color: '#ffffff',
      })
      .setScrollFactor(0);

    this.add
      .text(24, 50, data.status, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#9fb2d8',
      })
      .setScrollFactor(0);
  }
}
`,
    },
    {
      path: 'src/game/input/PlayerInput.ts',
      content: `import Phaser from 'phaser';

export class PlayerInput {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  private wasd: Record<string, Phaser.Input.Keyboard.Key> | undefined;
  private pointerTarget = new Phaser.Math.Vector2(0, 0);
  private pointerActive = false;

  constructor(private readonly scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard?.createCursorKeys();
    this.wasd = scene.input.keyboard?.addKeys('W,A,S,D') as
      | Record<string, Phaser.Input.Keyboard.Key>
      | undefined;

    scene.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      this.pointerActive = true;
      this.pointerTarget.set(pointer.x, pointer.y);
    });

    scene.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (pointer.isDown) {
        this.pointerActive = true;
        this.pointerTarget.set(pointer.x, pointer.y);
      }
    });

    scene.input.on('pointerup', () => {
      this.pointerActive = false;
    });
  }

  getMovementVector(): Phaser.Math.Vector2 {
    const vector = new Phaser.Math.Vector2(0, 0);

    if (this.cursors?.left.isDown || this.wasd?.A.isDown) vector.x -= 1;
    if (this.cursors?.right.isDown || this.wasd?.D.isDown) vector.x += 1;
    if (this.cursors?.up.isDown || this.wasd?.W.isDown) vector.y -= 1;
    if (this.cursors?.down.isDown || this.wasd?.S.isDown) vector.y += 1;

    if (vector.lengthSq() > 0) {
      return vector.normalize();
    }

    if (!this.pointerActive) {
      return vector;
    }

    const camera = this.scene.cameras.main;
    const center = new Phaser.Math.Vector2(camera.centerX, camera.centerY);
    return this.pointerTarget.clone().subtract(center).normalize();
  }
}
`,
    },
    {
      path: 'src/game/save/SaveSystem.ts',
      content: `export type SaveData = {
  version: number;
  bestScore: number;
};

const defaultSave: SaveData = {
  version: 1,
  bestScore: 0,
};

export class SaveSystem {
  constructor(private readonly namespace: string) {}

  load(): SaveData {
    const raw = localStorage.getItem(this.key);
    if (!raw) return defaultSave;

    try {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      return { ...defaultSave, ...parsed, version: defaultSave.version };
    } catch {
      return defaultSave;
    }
  }

  save(data: SaveData): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  private get key(): string {
    return \`\${this.namespace}:save\`;
  }
}
`,
    },
    {
      path: 'src/game/ui/textStyles.ts',
      content: `import Phaser from 'phaser';

export function createTitleText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string,
): Phaser.GameObjects.Text {
  return scene.add
    .text(x, y, text, {
      fontFamily: 'Arial, sans-serif',
      fontSize: '56px',
      color: '#ffffff',
      stroke: '#273043',
      strokeThickness: 8,
    })
    .setOrigin(0.5);
}
`,
    },
    {
      path: 'src/game/systems/.gitkeep',
      content: '',
    },
    {
      path: 'src/game/entities/.gitkeep',
      content: '',
    },
    {
      path: 'src/game/state/.gitkeep',
      content: '',
    },
    {
      path: 'src/game/utils/.gitkeep',
      content: '',
    },
    {
      path: 'public/assets/.gitkeep',
      content: '',
    },
    ...(options.includeTilemaps
      ? [
          {
            path: 'public/assets/tilemaps/.gitkeep',
            content: '',
          },
          {
            path: 'public/assets/tilesets/.gitkeep',
            content: '',
          },
          {
            path: 'src/game/tilemaps/tilemapPipeline.md',
            content: `# Tilemap Pipeline

Use this folder when the game needs Tiled/Phaser tilemaps.

Suggested convention:

- Export maps to \`public/assets/tilemaps/\`.
- Store tilesets under \`public/assets/tilesets/\`.
- Load maps from \`PreloadScene\`.
- Keep layer names stable: \`ground\`, \`collision\`, \`objects\`.
- Document collision/object layer rules near the map data.

When changing tilemaps, use the \`phaser-assets-pipeline\` and \`phaser-responsive-layout\` skills.
`,
          },
        ]
      : []),
  ];
}

