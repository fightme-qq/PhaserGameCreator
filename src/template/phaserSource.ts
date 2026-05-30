import type { GeneratedFile, ProjectOptions } from '../types';

export function phaserSource(options: ProjectOptions): GeneratedFile[] {
  return [
    {
      path: 'src/main.ts',
      content: `import Phaser from 'phaser';
import './style.css';
import { gameConfig } from './game/config/gameConfig';
${options.includeYandexGames ? "import { initYandexGames, registerPhaserGame } from './game/platform/yandexGames';" : ''}

declare global {
  interface Window {
    __phaserGame?: Phaser.Game;
  }
}

${options.includeYandexGames ? 'void initYandexGames();\nconst game = new Phaser.Game(gameConfig);\nwindow.__phaserGame = game;\nregisterPhaserGame(game);' : 'const game = new Phaser.Game(gameConfig);\nwindow.__phaserGame = game;'}
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
  StatusChanged: 'status-changed',
  BestScoreChanged: 'best-score-changed',
  RunStateChanged: 'run-state-changed',
  GameplayStarted: 'gameplay-started',
  GameplayStopped: 'gameplay-stopped',
} as const;

export type GameEvent = (typeof GameEvents)[keyof typeof GameEvents];

export type GameEventPayloads = {
  [GameEvents.ScoreChanged]: { score: number; bestScore: number };
  [GameEvents.StatusChanged]: { status: string };
  [GameEvents.BestScoreChanged]: { bestScore: number };
  [GameEvents.RunStateChanged]: { phase: 'ready' | 'playing' | 'won' | 'lost' };
  [GameEvents.GameplayStarted]: { scene: string };
  [GameEvents.GameplayStopped]: { scene: string };
};
`,
    },
    {
      path: 'src/game/events/EventBus.ts',
      content: `import Phaser from 'phaser';
import type { GameEvent, GameEventPayloads } from '../config/gameEvents';

type GameEventHandler<TEvent extends GameEvent> = (payload: GameEventPayloads[TEvent]) => void;

class TypedEventBus {
  private readonly emitter = new Phaser.Events.EventEmitter();

  on<TEvent extends GameEvent>(event: TEvent, handler: GameEventHandler<TEvent>, context?: unknown): this {
    this.emitter.on(event, handler, context);
    return this;
  }

  once<TEvent extends GameEvent>(event: TEvent, handler: GameEventHandler<TEvent>, context?: unknown): this {
    this.emitter.once(event, handler, context);
    return this;
  }

  off<TEvent extends GameEvent>(event: TEvent, handler?: GameEventHandler<TEvent>, context?: unknown): this {
    this.emitter.off(event, handler, context);
    return this;
  }

  emit<TEvent extends GameEvent>(event: TEvent, payload: GameEventPayloads[TEvent]): boolean {
    return this.emitter.emit(event, payload);
  }

  removeAllListeners(event?: GameEvent): this {
    this.emitter.removeAllListeners(event);
    return this;
  }
}

export const eventBus = new TypedEventBus();
`,
    },
    {
      path: 'src/game/state/GameState.ts',
      content: `export type RunPhase = 'ready' | 'playing' | 'won' | 'lost';

export type GameStateSnapshot = {
  phase: RunPhase;
  score: number;
  bestScore: number;
  elapsedMs: number;
};

export type ScoreUpdate = {
  score: number;
  bestScore: number;
  bestChanged: boolean;
};

export class GameState {
  private snapshot: GameStateSnapshot;

  constructor(bestScore = 0) {
    this.snapshot = {
      phase: 'ready',
      score: 0,
      bestScore,
      elapsedMs: 0,
    };
  }

  get value(): GameStateSnapshot {
    return { ...this.snapshot };
  }

  start(): GameStateSnapshot {
    this.snapshot = {
      ...this.snapshot,
      phase: 'playing',
      score: 0,
      elapsedMs: 0,
    };

    return this.value;
  }

  update(deltaMs: number): void {
    if (this.snapshot.phase === 'playing') {
      this.snapshot.elapsedMs += deltaMs;
    }
  }

  addScore(amount: number): ScoreUpdate {
    this.snapshot.score += amount;

    const previousBest = this.snapshot.bestScore;
    this.snapshot.bestScore = Math.max(this.snapshot.bestScore, this.snapshot.score);

    return {
      score: this.snapshot.score,
      bestScore: this.snapshot.bestScore,
      bestChanged: this.snapshot.bestScore !== previousBest,
    };
  }

  finish(phase: Extract<RunPhase, 'won' | 'lost'>): GameStateSnapshot {
    this.snapshot.phase = phase;
    return this.value;
  }

  stop(): GameStateSnapshot {
    this.snapshot.phase = 'ready';
    return this.value;
  }
}
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

export type SpritesheetAsset = {
  key: string;
  url: string;
  frameWidth: number;
  frameHeight: number;
  margin?: number;
  spacing?: number;
};

export const imageAssets: ImageAsset[] = [];
export const spritesheetAssets: SpritesheetAsset[] = [];

export function loadAssetManifest(scene: Phaser.Scene): void {
  for (const asset of imageAssets) {
    scene.load.image(asset.key, asset.url);
  }

  for (const asset of spritesheetAssets) {
    scene.load.spritesheet(asset.key, asset.url, {
      frameWidth: asset.frameWidth,
      frameHeight: asset.frameHeight,
      margin: asset.margin,
      spacing: asset.spacing,
    });
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
import { loadAssetManifest } from '../assets/assetManifest';
import { SceneKeys } from '../config/sceneKeys';
import { startSceneWithFade } from './sceneTransitions';

export class PreloadScene extends Phaser.Scene {
  private progressBar!: Phaser.GameObjects.Rectangle;

  constructor() {
    super(SceneKeys.Preload);
  }

  preload(): void {
    const { width, height } = this.scale;

    this.add.rectangle(width / 2, height / 2, 420, 18, 0x1d2a3f, 1);
    this.progressBar = this.add.rectangle(width / 2 - 210, height / 2, 0, 18, 0x7ee7c8, 1).setOrigin(0, 0.5);

    this.add
      .text(width / 2, height / 2 - 44, 'Loading assets', {
        fontFamily: 'Arial, sans-serif',
        fontSize: '20px',
        color: '#d8e2f8',
      })
      .setOrigin(0.5);

    this.load.on(Phaser.Loader.Events.PROGRESS, (progress: number) => {
      this.progressBar.width = 420 * progress;
    });

    loadAssetManifest(this);
  }

  create(): void {
    this.progressBar.width = 420;
    startSceneWithFade(this, SceneKeys.TemplateGuide, {
      durationMs: 220,
      loadingText: 'Starting',
    });
  }
}
`,
    },
    {
      path: 'src/game/scenes/sceneTransitions.ts',
      content: `import Phaser from 'phaser';
import type { SceneKey } from '../config/sceneKeys';

export type FadeOptions = {
  durationMs?: number;
  color?: number;
};

export type SceneTransitionOptions = FadeOptions & {
  data?: object;
  loadingText?: string;
};

const defaultFadeMs = 260;
const defaultFadeColor = 0x000000;
const transitionFlag = 'scene-transition-active';

export function fadeInScene(scene: Phaser.Scene, options: FadeOptions = {}): void {
  const { r, g, b } = Phaser.Display.Color.IntegerToRGB(options.color ?? defaultFadeColor);
  scene.cameras.main.fadeIn(options.durationMs ?? defaultFadeMs, r, g, b);
}

export function startSceneWithFade(
  scene: Phaser.Scene,
  targetScene: SceneKey,
  options: SceneTransitionOptions = {},
): void {
  if (scene.registry.get(transitionFlag)) {
    return;
  }

  scene.registry.set(transitionFlag, true);
  scene.input.enabled = false;

  const durationMs = options.durationMs ?? defaultFadeMs;
  const { r, g, b } = Phaser.Display.Color.IntegerToRGB(options.color ?? defaultFadeColor);

  if (options.loadingText) {
    scene.add
      .text(scene.scale.width / 2, scene.scale.height / 2, options.loadingText, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '18px',
        color: '#d8e2f8',
      })
      .setOrigin(0.5)
      .setDepth(10000);
  }

  scene.cameras.main.fadeOut(durationMs, r, g, b);
  scene.time.delayedCall(durationMs, () => {
    scene.registry.set(transitionFlag, false);
    scene.scene.start(targetScene, options.data);
  });
}
`,
    },
    {
      path: 'src/game/scenes/TemplateGuideScene.ts',
      content: `import Phaser from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';
import { fadeInScene, startSceneWithFade } from './sceneTransitions';

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
  private transitioning = false;

  constructor() {
    super(SceneKeys.TemplateGuide);
  }

  create(): void {
    const { width, height } = this.scale;
    fadeInScene(this);
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
    startText.on('pointerdown', (pointer: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData) => {
      event.stopPropagation();
      this.startGame();
    });
    this.input.keyboard?.on('keydown-SPACE', () => this.spinPrompt());
    this.input.keyboard?.once('keydown-ENTER', () => this.startGame());
  }

  private spinPrompt(): void {
    if (this.transitioning) {
      return;
    }

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

  private startGame(): void {
    if (this.transitioning) {
      return;
    }

    this.transitioning = true;
    startSceneWithFade(this, SceneKeys.Game, {
      durationMs: 260,
      loadingText: 'Opening sandbox',
    });
  }
}
`,
    },
    {
      path: 'src/game/scenes/GameScene.ts',
      content: `import Phaser from 'phaser';
import { GameEvents } from '../config/gameEvents';
import { SceneKeys } from '../config/sceneKeys';
import { createTitleText } from '../ui/textStyles';
import { eventBus } from '../events/EventBus';
import { PlayerInput } from '../input/PlayerInput';
import { SaveManager, type SaveData } from '../save/SaveManager';
import { GameState } from '../state/GameState';
import { fadeInScene } from './sceneTransitions';
${options.includeYandexGames ? "import { gameplayStart, gameplayStop } from '../platform/yandexGames';" : ''}

export class GameScene extends Phaser.Scene {
  private inputModel!: PlayerInput;
  private player!: Phaser.GameObjects.Arc;
  private readonly saveManager = new SaveManager('${options.slug}');
  private saveData!: SaveData;
  private state!: GameState;
  private scoreTickMs = 0;
  private readonly playerSpeed = 260;

  constructor() {
    super(SceneKeys.Game);
  }

  create(): void {
    const { width, height } = this.scale;

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());

    this.saveData = this.saveManager.load();
    this.state = new GameState(this.saveData.bestScore);
    const startState = this.state.start();

    fadeInScene(this);
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
      score: startState.score,
      bestScore: startState.bestScore,
      phase: startState.phase,
    });

    eventBus.emit(GameEvents.GameplayStarted, { scene: SceneKeys.Game });
    eventBus.emit(GameEvents.RunStateChanged, { phase: startState.phase });
    eventBus.emit(GameEvents.StatusChanged, {
      status: 'Move around to see GameScene publish score events to UIScene.',
    });
    ${options.includeYandexGames ? 'gameplayStart();' : ''}
  }

  shutdown(): void {
    if (this.state && this.saveData) {
      const snapshot = this.state.stop();
      this.saveManager.save({ ...this.saveData, bestScore: snapshot.bestScore });
      eventBus.emit(GameEvents.RunStateChanged, { phase: snapshot.phase });
    }

    eventBus.emit(GameEvents.GameplayStopped, { scene: SceneKeys.Game });
    this.scene.stop(SceneKeys.UI);
    ${options.includeYandexGames ? 'gameplayStop();' : ''}
  }

  update(_time: number, delta: number): void {
    const movement = this.inputModel.getMovementVector();
    this.state.update(delta);

    if (movement.lengthSq() === 0) {
      return;
    }

    const distance = this.playerSpeed * (delta / 1000);
    const nextX = Phaser.Math.Clamp(this.player.x + movement.x * distance, 32, this.scale.width - 32);
    const nextY = Phaser.Math.Clamp(this.player.y + movement.y * distance, 96, this.scale.height - 32);
    this.player.setPosition(nextX, nextY);

    this.scoreTickMs += delta;

    if (this.scoreTickMs >= 1000) {
      this.scoreTickMs -= 1000;
      const scoreUpdate = this.state.addScore(1);
      eventBus.emit(GameEvents.ScoreChanged, {
        score: scoreUpdate.score,
        bestScore: scoreUpdate.bestScore,
      });

      if (scoreUpdate.bestChanged) {
        this.saveData = { ...this.saveData, bestScore: scoreUpdate.bestScore };
        eventBus.emit(GameEvents.BestScoreChanged, { bestScore: scoreUpdate.bestScore });
      }
    }
  }

  getDebugSnapshot(): { phase: string; score: number; bestScore: number; elapsedMs: number; playerX: number; playerY: number } {
    const state = this.state.value;

    return {
      phase: state.phase,
      score: state.score,
      bestScore: state.bestScore,
      elapsedMs: state.elapsedMs,
      playerX: this.player.x,
      playerY: this.player.y,
    };
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
import { GameEvents } from '../config/gameEvents';
import { SceneKeys } from '../config/sceneKeys';
import { eventBus } from '../events/EventBus';

type UIData = {
  title: string;
  status: string;
  score: number;
  bestScore: number;
  phase: 'ready' | 'playing' | 'won' | 'lost';
};

export class UIScene extends Phaser.Scene {
  private statusText!: Phaser.GameObjects.Text;
  private scoreText!: Phaser.GameObjects.Text;
  private bestScoreText!: Phaser.GameObjects.Text;
  private phaseText!: Phaser.GameObjects.Text;

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

    this.statusText = this.add
      .text(24, 50, data.status, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#9fb2d8',
      })
      .setScrollFactor(0);

    this.scoreText = this.add
      .text(24, 78, \`Score: \${data.score}\`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#7ee7c8',
      })
      .setScrollFactor(0);

    this.bestScoreText = this.add
      .text(24, 106, \`Best: \${data.bestScore}\`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#ffc857',
      })
      .setScrollFactor(0);

    this.phaseText = this.add
      .text(24, 134, \`State: \${data.phase}\`, {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        color: '#c4d3f1',
      })
      .setScrollFactor(0);

    eventBus.on(GameEvents.ScoreChanged, this.handleScoreChanged, this);
    eventBus.on(GameEvents.BestScoreChanged, this.handleBestScoreChanged, this);
    eventBus.on(GameEvents.RunStateChanged, this.handleRunStateChanged, this);
    eventBus.on(GameEvents.StatusChanged, this.handleStatusChanged, this);
    eventBus.on(GameEvents.GameplayStopped, this.handleGameplayStopped, this);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.removeEventListeners());
  }

  private handleScoreChanged(payload: { score: number; bestScore: number }): void {
    this.scoreText.setText(\`Score: \${payload.score}\`);
    this.bestScoreText.setText(\`Best: \${payload.bestScore}\`);
  }

  private handleBestScoreChanged(payload: { bestScore: number }): void {
    this.bestScoreText.setText(\`Best: \${payload.bestScore}\`);
  }

  private handleRunStateChanged(payload: { phase: 'ready' | 'playing' | 'won' | 'lost' }): void {
    this.phaseText.setText(\`State: \${payload.phase}\`);
  }

  private handleStatusChanged(payload: { status: string }): void {
    this.statusText.setText(payload.status);
  }

  private handleGameplayStopped(): void {
    this.removeEventListeners();
  }

  private removeEventListeners(): void {
    eventBus.off(GameEvents.ScoreChanged, this.handleScoreChanged, this);
    eventBus.off(GameEvents.BestScoreChanged, this.handleBestScoreChanged, this);
    eventBus.off(GameEvents.RunStateChanged, this.handleRunStateChanged, this);
    eventBus.off(GameEvents.StatusChanged, this.handleStatusChanged, this);
    eventBus.off(GameEvents.GameplayStopped, this.handleGameplayStopped, this);
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
      path: 'src/game/save/SaveManager.ts',
      content: `export type SaveData = {
  version: number;
  bestScore: number;
  settings: {
    musicVolume: number;
    sfxVolume: number;
    reducedMotion: boolean;
  };
};

export type SaveSlot = 'slot-1' | 'slot-2' | 'slot-3';

const defaultSave: SaveData = {
  version: 1,
  bestScore: 0,
  settings: {
    musicVolume: 0.8,
    sfxVolume: 0.8,
    reducedMotion: false,
  },
};

type SaveEnvelope = {
  updatedAt: string;
  data: SaveData;
};

export class SaveManager {
  constructor(
    private readonly namespace: string,
    private readonly storage: Storage = localStorage,
  ) {}

  load(slot: SaveSlot = 'slot-1'): SaveData {
    const raw = this.storage.getItem(this.keyForSlot(slot));
    if (!raw) return this.createDefaultSave();

    try {
      const parsed = JSON.parse(raw) as Partial<SaveEnvelope> & Partial<SaveData>;
      const data = parsed.data ?? parsed;
      return this.migrate(data);
    } catch {
      return this.createDefaultSave();
    }
  }

  save(data: SaveData, slot: SaveSlot = 'slot-1'): void {
    const migrated = this.migrate(data);
    const envelope: SaveEnvelope = {
      updatedAt: new Date().toISOString(),
      data: migrated,
    };

    this.storage.setItem(this.keyForSlot(slot), JSON.stringify(envelope));
  }

  listSlots(): Array<{ slot: SaveSlot; updatedAt: string | undefined; data: SaveData | undefined }> {
    return this.slots.map((slot) => {
      const raw = this.storage.getItem(this.keyForSlot(slot));

      if (!raw) {
        return { slot, updatedAt: undefined, data: undefined };
      }

      try {
        const envelope = JSON.parse(raw) as Partial<SaveEnvelope>;
        return {
          slot,
          updatedAt: envelope.updatedAt,
          data: envelope.data ? this.migrate(envelope.data) : undefined,
        };
      } catch {
        return { slot, updatedAt: undefined, data: undefined };
      }
    });
  }

  reset(slot: SaveSlot = 'slot-1'): void {
    this.storage.removeItem(this.keyForSlot(slot));
  }

  private migrate(data: Partial<SaveData> | undefined): SaveData {
    return {
      ...this.createDefaultSave(),
      ...data,
      version: defaultSave.version,
      settings: {
        ...defaultSave.settings,
        ...data?.settings,
      },
    };
  }

  private createDefaultSave(): SaveData {
    return {
      ...defaultSave,
      settings: { ...defaultSave.settings },
    };
  }

  private keyForSlot(slot: SaveSlot): string {
    return \`\${this.namespace}:save:\${slot}\`;
  }

  private get slots(): SaveSlot[] {
    return ['slot-1', 'slot-2', 'slot-3'];
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
    {
      path: 'public/assets/images/.gitkeep',
      content: '',
    },
    {
      path: 'public/assets/spritesheets/.gitkeep',
      content: '',
    },
    {
      path: 'public/assets/atlases/.gitkeep',
      content: '',
    },
    {
      path: 'public/assets/audio/.gitkeep',
      content: '',
    },
    {
      path: 'public/assets/fonts/.gitkeep',
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

