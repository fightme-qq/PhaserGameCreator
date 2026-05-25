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
    this.scene.start(SceneKeys.TemplateGuide);
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

    const startText = this.add
      .text(width / 2, height * 0.78, 'Press Enter or tap here to open the sandbox scene', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#7d8aa5',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.input.on('pointerdown', () => this.spinPrompt());
    startText.on('pointerdown', () => this.scene.start(SceneKeys.Game));
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
import { PlayerInput } from '../input/PlayerInput';
${options.includeYandexGames ? "import { gameplayStart, gameplayStop } from '../platform/yandexGames';" : ''}

export class GameScene extends Phaser.Scene {
  private inputModel!: PlayerInput;
  private player!: Phaser.GameObjects.Arc;
  private readonly playerSpeed = 260;

  constructor() {
    super(SceneKeys.Game);
  }

  create(): void {
    const { width, height } = this.scale;

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());

    this.drawBackground(width, height);
    this.inputModel = new PlayerInput(this);
    this.player = this.add.circle(width / 2, height / 2 + 52, 18, 0x7ee7c8, 1);
    this.player.setStrokeStyle(4, 0x20304a, 1);

    createTitleText(this, width / 2, 132, '${options.title}');

    this.add
      .text(width / 2, 224, 'Sandbox scene: replace this with the first playable loop.', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '22px',
        color: '#d8e2f8',
        align: 'center',
        wordWrap: { width: 720 },
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 294, 'Move the marker with WASD / arrows, or drag/touch toward a direction. Keep new gameplay in systems, entities, input, state, and UI instead of growing this scene.', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '18px',
        color: '#aebbdd',
        align: 'center',
        wordWrap: { width: 760 },
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, height - 82, 'Use phaser-first-playable-builder before replacing this sandbox.', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '16px',
        color: '#7ee7c8',
        align: 'center',
      })
      .setOrigin(0.5);

    this.scene.launch(SceneKeys.UI, {
      title: 'First playable sandbox',
      status: 'TemplateGuideScene is onboarding; GameScene is the gameplay workspace.',
    });

    ${options.includeYandexGames ? 'gameplayStart();' : ''}
  }

  shutdown(): void {
    this.scene.stop(SceneKeys.UI);
    ${options.includeYandexGames ? 'gameplayStop();' : ''}
  }

  update(_time: number, delta: number): void {
    const movement = this.inputModel.getMovementVector();

    if (movement.lengthSq() === 0) {
      return;
    }

    const distance = this.playerSpeed * (delta / 1000);
    const nextX = Phaser.Math.Clamp(this.player.x + movement.x * distance, 32, this.scale.width - 32);
    const nextY = Phaser.Math.Clamp(this.player.y + movement.y * distance, 96, this.scale.height - 32);
    this.player.setPosition(nextX, nextY);
  }

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

