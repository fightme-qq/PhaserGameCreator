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
    this.drawBackground(width, height);

    const contentWidth = Math.min(width - 96, 1180);
    const left = (width - contentWidth) / 2;
    const right = left + contentWidth - 360;
    const top = 58;

    this.add.text(left, top, '${options.title}', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '44px',
      color: '#ffffff',
      fontStyle: 'bold',
      shadow: { offsetX: 0, offsetY: 3, color: '#000000', blur: 8, fill: true },
    });

    this.add.text(left, top + 58, '${options.includeIdlePack ? 'Idle starter preset with economy, producers, upgrades, offline progress, and tests.' : 'Agent-ready Phaser starter with scenes, state, save flow, tests, and skills.'}', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '19px',
      color: '#b9c7e6',
      wordWrap: { width: 700 },
    });

    this.add.rectangle(left, 178, 760, 300, 0x121a27, 0.96).setOrigin(0, 0).setStrokeStyle(1, 0x314766, 0.95);
    this.add.text(left + 30, 204, 'Prompt seed', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '18px',
      color: '#ffc857',
      fontStyle: 'bold',
    });

    this.promptText = this.add
      .text(left + 30, 254, ideaPrompts[this.currentPrompt], {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '30px',
        color: '#ffffff',
        lineSpacing: 8,
        wordWrap: { width: 690 },
      })
      .setOrigin(0, 0);

    this.spinHint = this.add
      .text(left + 30, 420, 'Click this card, tap anywhere, or press Space to spin ideas.', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '17px',
        color: '#7ee7c8',
        wordWrap: { width: 690 },
      })
      .setOrigin(0, 0);

    this.tweens.add({
      targets: this.spinHint,
      alpha: 0.58,
      yoyo: true,
      repeat: -1,
      duration: 850,
    });

    this.add.rectangle(right, 178, 360, 300, 0x151f2d, 0.96).setOrigin(0, 0).setStrokeStyle(1, 0x314766, 0.95);
    this.add.text(right + 26, 204, 'Next steps', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '18px',
      color: '#ffc857',
      fontStyle: 'bold',
    });
    this.add.text(right + 26, 246, '1. Open the starter scene.\\n2. Ask an agent to build the first playable loop.\\n3. Use the local Phaser skills and tests.', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '17px',
      color: '#d8e2f8',
      lineSpacing: 10,
      wordWrap: { width: 300 },
    });

    const startButton = this.add.rectangle(right + 26, 390, 308, 58, 0x2bbd91, 1).setOrigin(0, 0).setInteractive({ useHandCursor: true });
    const startText = this.add
      .text(right + 180, 419, 'Open starter scene', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '20px',
        color: '#061713',
        fontStyle: 'bold',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    this.add.text(left, 530, 'Keyboard: Space spins ideas, Enter opens the scene. Pointer/touch works on desktop and mobile.', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '16px',
      color: '#8fa2c4',
      wordWrap: { width: contentWidth },
    });

    this.input.on('pointerdown', () => this.spinPrompt());
    startButton.on('pointerdown', (pointer: Phaser.Input.Pointer, _localX: number, _localY: number, event: Phaser.Types.Input.EventData) => {
      event.stopPropagation();
      this.startGame();
    });
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
      loadingText: 'Opening starter scene',
    });
  }

  private drawBackground(width: number, height: number): void {
    this.add.rectangle(width / 2, height / 2, width, height, 0x0c1017);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x111824, 0.94);
    graphics.fillRect(0, 0, width, height);
    graphics.lineStyle(1, 0x26384f, 0.28);

    for (let x = 0; x <= width; x += 64) {
      graphics.lineBetween(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += 64) {
      graphics.lineBetween(0, y, width, y);
    }

    graphics.fillStyle(0x2bbd91, 0.055);
    graphics.fillCircle(width * 0.18, height * 0.22, 260);
    graphics.fillStyle(0xffc857, 0.052);
    graphics.fillCircle(width * 0.84, height * 0.7, 300);
  }
}
`,
    },
    {
      path: 'src/game/scenes/GameScene.ts',
      content: options.includeIdlePack ? idleGameSceneContent(options) : `import Phaser from 'phaser';
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
  idle?: unknown;
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

function idleGameSceneContent(options: ProjectOptions): string {
  return `import Phaser from 'phaser';
import { idleContent } from '../../data/idleContent';
import { GameEvents } from '../config/gameEvents';
import { SceneKeys } from '../config/sceneKeys';
import { eventBus } from '../events/EventBus';
import { IdleEconomy } from '../idle/IdleEconomy';
import type { IdleOfflineReport, IdleSaveData, IdleUiModel } from '../idle/idleTypes';
import { SaveManager, type SaveData } from '../save/SaveManager';
import { GameState } from '../state/GameState';
import { fadeInScene } from './sceneTransitions';
${options.includeYandexGames ? "import { gameplayStart, gameplayStop } from '../platform/yandexGames';" : ''}

export class GameScene extends Phaser.Scene {
  private readonly saveManager = new SaveManager('${options.slug}');
  private saveData!: SaveData;
  private state!: GameState;
  private economy!: IdleEconomy;
  private resourceText!: Phaser.GameObjects.Text;
  private statusText!: Phaser.GameObjects.Text;
  private producerText!: Phaser.GameObjects.Text;
  private upgradeTexts: Phaser.GameObjects.Text[] = [];
  private upgradeButtons: Phaser.GameObjects.Rectangle[] = [];
  private upgradeButtonLabels: Phaser.GameObjects.Text[] = [];
  private achievementText!: Phaser.GameObjects.Text;
  private shinyText!: Phaser.GameObjects.Text;
  private shinyButton!: Phaser.GameObjects.Rectangle;
  private prestigeText!: Phaser.GameObjects.Text;
  private autosaveMs = 0;
  private refreshMs = 0;

  constructor() {
    super(SceneKeys.Game);
  }

  create(): void {
    const { width, height } = this.scale;

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => this.shutdown());

    this.saveData = this.saveManager.load();
    this.state = new GameState(this.saveData.bestScore);
    this.state.start();
    this.economy = new IdleEconomy(idleContent, this.saveData.idle as IdleSaveData | undefined);
    const offlineReport = this.economy.applyOfflineProgress(Date.now());

    fadeInScene(this);
    this.drawBackground(width, height);
    const contentWidth = Math.min(width - 96, 1180);
    const left = (width - contentWidth) / 2;
    const right = left + contentWidth - 420;
    const top = 48;

    this.add.text(left, top, '${options.title}', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '42px',
      color: '#ffffff',
      fontStyle: 'bold',
      shadow: { offsetX: 0, offsetY: 3, color: '#000000', blur: 8, fill: true },
    });

    this.add
      .text(left, top + 54, 'Click, automate, upgrade, save, return later.', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '19px',
        color: '#b8c7e6',
        wordWrap: { width: 620 },
      })
      .setOrigin(0, 0);

    this.add.rectangle(left, 138, 560, 178, 0x111a27, 0.96).setOrigin(0, 0).setStrokeStyle(1, 0x29415f, 0.9);

    this.resourceText = this.add.text(left + 28, 160, '', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '27px',
      color: '#ffffff',
      lineSpacing: 8,
    });

    this.statusText = this.add.text(left + 28, 266, this.getOfflineStatus(offlineReport), {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '16px',
      color: '#9fb2d8',
      wordWrap: { width: 500 },
      lineSpacing: 5,
    });

    this.createActionButton(right, 138);
    this.createShinyPanel(right, 256);
    this.createProducerPanel(left, 344);
    this.createUpgradePanel(right, 344);
    this.createAchievementPanel(left, 628);
    this.createPrestigePanel(right, 628);
    this.refreshUi();

    eventBus.emit(GameEvents.GameplayStarted, { scene: SceneKeys.Game });
    eventBus.emit(GameEvents.RunStateChanged, { phase: 'playing' });
    eventBus.emit(GameEvents.StatusChanged, {
      status: 'Click Bake cookie, buy ovens, then add content in src/data/idleContent.ts.',
    });
    ${options.includeYandexGames ? 'gameplayStart();' : ''}
  }

  update(_time: number, delta: number): void {
    this.state.update(delta);
    this.economy.tick(delta / 1000);
    this.autosaveMs += delta;
    this.refreshMs += delta;

    if (this.refreshMs >= 250) {
      this.refreshMs = 0;
      this.refreshUi();
    }

    if (this.autosaveMs >= 5000) {
      this.autosaveMs = 0;
      this.persist();
    }
  }

  shutdown(): void {
    if (this.economy && this.state && this.saveData) {
      const snapshot = this.state.stop();
      this.persist(snapshot.bestScore);
      eventBus.emit(GameEvents.RunStateChanged, { phase: snapshot.phase });
    }

    eventBus.emit(GameEvents.GameplayStopped, { scene: SceneKeys.Game });
    ${options.includeYandexGames ? 'gameplayStop();' : ''}
  }

  getDebugSnapshot(): {
    phase: string;
    elapsedMs: number;
    cookies: number;
    cookiesPerSecond: number;
    ovens: number;
    shinyActive: boolean;
    prestigePoints: number;
  } {
    const ui = this.economy.getUiModel();
    const cookies = ui.resources.find((entry) => entry.id === 'cookies');
    const oven = ui.producers.find((entry) => entry.id === 'oven');
    const shiny = ui.shinies.find((entry) => entry.id === 'goldenCookie');

    return {
      phase: this.state.value.phase,
      elapsedMs: this.state.value.elapsedMs,
      cookies: cookies?.current ?? 0,
      cookiesPerSecond: cookies?.perSecond ?? 0,
      ovens: oven?.owned ?? 0,
      shinyActive: shiny?.active ?? false,
      prestigePoints: ui.prestige?.points ?? 0,
    };
  }

  private createActionButton(x: number, y: number): void {
    const button = this.add.rectangle(x, y, 420, 96, 0x2bbd91, 1).setOrigin(0, 0).setInteractive({ useHandCursor: true });
    const label = this.add.text(x + 210, y + 48, 'Bake cookie\\n+1 now', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '24px',
      color: '#061713',
      align: 'center',
      lineSpacing: 6,
    }).setOrigin(0.5);

    button.on('pointerdown', () => {
      this.economy.clickAction('bakeCookie');
      this.flashText(label);
      this.refreshUi();
    });

    this.input.keyboard?.on('keydown-SPACE', () => {
      this.economy.clickAction('bakeCookie');
      this.flashText(label);
      this.refreshUi();
    });
  }

  private createProducerPanel(x: number, y: number): void {
    this.add.rectangle(x, y, 560, 244, 0x151f2d, 0.96).setOrigin(0, 0).setStrokeStyle(1, 0x2d415c, 1);
    this.add.text(x + 24, y + 18, 'Production', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '18px',
      color: '#ffc857',
      fontStyle: 'bold',
    });
    this.producerText = this.add.text(x + 22, y + 20, '', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '17px',
      color: '#e6eefc',
      lineSpacing: 7,
      wordWrap: { width: 310 },
    });
    this.producerText.setY(y + 56);

    this.addIdleButton(x + 400, y + 54, 'Buy 1', () => {
      if (this.economy.buyProducer('oven')) {
        this.statusText.setText('Bought an oven. Passive production is now ticking in IdleEconomy.');
        this.refreshUi();
      }
    });

    this.addIdleButton(x + 400, y + 106, 'Buy 10', () => {
      const bought = this.economy.buyProducerBulk('oven', 10);
      if (bought > 0) {
        this.statusText.setText(\`Bought \${bought} ovens. Bulk buy is handled by IdleEconomy, not scene math.\`);
        this.refreshUi();
      }
    });

    this.addIdleButton(x + 400, y + 158, 'Max', () => {
      const bought = this.economy.buyMaxProducer('oven');
      if (bought > 0) {
        this.statusText.setText(\`Bought \${bought} ovens with max-buy.\`);
        this.refreshUi();
      }
    });
  }

  private createShinyPanel(x: number, y: number): void {
    this.shinyButton = this.add.rectangle(x, y, 420, 52, 0x7f5af0, 0.24).setOrigin(0, 0).setStrokeStyle(1, 0x7f5af0, 0.42);
    this.shinyText = this.add.text(x + 210, y + 26, '', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '16px',
      color: '#dcd4ff',
      align: 'center',
      wordWrap: { width: 370 },
    }).setOrigin(0.5);

    this.shinyButton.setInteractive({ useHandCursor: true });
    this.shinyButton.on('pointerdown', () => {
      if (this.economy.clickShiny('goldenCookie')) {
        this.statusText.setText('Golden cookie claimed. Temporary bonuses live in IdleEconomy.');
        this.flashText(this.shinyText);
        this.refreshUi();
      }
    });
  }

  private createUpgradePanel(x: number, y: number): void {
    this.add.rectangle(x, y, 420, 244, 0x151f2d, 0.96).setOrigin(0, 0).setStrokeStyle(1, 0x2d415c, 1);
    this.add.text(x + 22, y + 18, 'Upgrades', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '20px',
      color: '#ffc857',
    });

    const upgradeIds = idleContent.upgrades.map((upgrade) => upgrade.id);
    this.upgradeTexts = upgradeIds.map((id, index) => {
      const rowY = y + 58 + index * 62;
      const control = this.addIdleButton(x + 290, rowY - 3, 'Buy', () => {
        if (this.economy.buyUpgrade(id)) {
          this.statusText.setText('Upgrade purchased. The economy rule changed, not just the label.');
          this.refreshUi();
        }
      });
      this.upgradeButtons[index] = control.button;
      this.upgradeButtonLabels[index] = control.label;

      return this.add.text(x + 22, rowY, '', {
        fontFamily: 'Trebuchet MS, Arial, sans-serif',
        fontSize: '15px',
        color: '#d8e2f8',
        lineSpacing: 3,
        wordWrap: { width: 250 },
      });
    });
  }

  private createPrestigePanel(x: number, y: number): void {
    this.add.rectangle(x, y, 420, 92, 0x151f2d, 0.96).setOrigin(0, 0).setStrokeStyle(1, 0x7f5af0, 0.6);
    this.prestigeText = this.add.text(x + 22, y + 16, '', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '16px',
      color: '#dcd4ff',
      lineSpacing: 4,
      wordWrap: { width: 260 },
    });
    this.addIdleButton(x + 286, y + 25, 'Reset', () => {
      if (this.economy.prestigeReset()) {
        this.statusText.setText('Prestige reset complete. Meta progress is preserved in IdleEconomy.');
        this.refreshUi();
        this.persist();
      }
    });
  }

  private createAchievementPanel(x: number, y: number): void {
    this.add.rectangle(x, y, 560, 92, 0x151f2d, 0.9).setOrigin(0, 0).setStrokeStyle(1, 0x2d415c, 0.82);
    this.achievementText = this.add.text(x + 22, y + 16, '', {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '16px',
      color: '#c4d3f1',
      wordWrap: { width: 510 },
      lineSpacing: 5,
    });
  }

  private addIdleButton(
    x: number,
    y: number,
    text: string,
    onClick: () => void,
  ): { button: Phaser.GameObjects.Rectangle; label: Phaser.GameObjects.Text } {
    const button = this.add.rectangle(x, y, 104, 40, 0xffc857, 1).setOrigin(0, 0).setInteractive({ useHandCursor: true });
    const label = this.add.text(x + 52, y + 20, text, {
      fontFamily: 'Trebuchet MS, Arial, sans-serif',
      fontSize: '18px',
      color: '#191104',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    button.on('pointerdown', onClick);
    return { button, label };
  }

  private refreshUi(): void {
    const ui = this.economy.getUiModel();
    const cookies = ui.resources.find((entry) => entry.id === 'cookies');
    const action = ui.actions.find((entry) => entry.id === 'bakeCookie');
    const oven = ui.producers.find((entry) => entry.id === 'oven');
    const shiny = ui.shinies.find((entry) => entry.id === 'goldenCookie');
    const prestige = ui.prestige;

    if (cookies && action) {
      this.resourceText.setText([
        \`\${cookies.name}: \${this.formatNumber(cookies.current)}\`,
        \`Per second: \${this.formatNumber(cookies.perSecond)}\`,
        \`Manual bake: +\${this.formatNumber(action.gain)} | Clicks: \${action.clicks}\`,
      ]);
      eventBus.emit(GameEvents.ScoreChanged, {
        score: Math.floor(cookies.current),
        bestScore: Math.max(this.saveData.bestScore, Math.floor(cookies.maxSeen)),
      });
    }

    if (oven) {
      this.producerText.setText([
        \`\${oven.name}\`,
        \`Owned: \${oven.owned}\`,
        \`Next cost: \${this.formatNumber(oven.nextCost)} cookies\`,
        \`Buy 10 cost: \${this.formatNumber(oven.bulk10Cost)} cookies\`,
        \`Max affordable: \${oven.maxAffordable}\`,
        \`Output each: \${this.formatNumber(oven.productionPerSecond)}/s\`,
        \`Can buy: \${oven.affordable ? 'yes' : 'not yet'}\`,
      ]);
    }

    if (shiny) {
      const activeText = shiny.active
        ? \`\${shiny.name}: click now (+25) | \${Math.ceil(shiny.remainingSeconds)}s\`
        : shiny.visible
          ? \`\${shiny.name}: waiting for spawn | claimed \${shiny.clicks}\`
          : \`\${shiny.name}: unlock after first oven\`;
      this.shinyText.setText(activeText);
      this.shinyButton.setFillStyle(shiny.active ? 0x7f5af0 : 0x151f2d, shiny.active ? 0.92 : 0.55);
      this.shinyText.setColor(shiny.active ? '#ffffff' : '#b9c4dc');
    }

    for (const [index, upgrade] of ui.upgrades.entries()) {
      const target = this.upgradeTexts[index];
      if (!target) continue;
      const visibleLines = [
        \`\${upgrade.name} - \${upgrade.owned ? 'owned' : upgrade.affordable ? 'available' : upgrade.visible ? 'locked by cost' : 'hidden'}\`,
        upgrade.lockedReason ? \`Gate: \${upgrade.lockedReason}\` : '',
        upgrade.visible || upgrade.owned ? upgrade.description : '',
      ].filter(Boolean);
      target.setText(visibleLines);
      target.setAlpha(upgrade.owned ? 0.62 : upgrade.visible ? 1 : 0.42);

      const button = this.upgradeButtons[index];
      const label = this.upgradeButtonLabels[index];
      const buttonEnabled = upgrade.visible && !upgrade.owned;
      button?.setAlpha(buttonEnabled ? 1 : 0.26);
      label?.setAlpha(buttonEnabled ? 1 : 0.38);
    }

    if (prestige) {
      this.prestigeText.setText([
        \`\${prestige.name}: \${prestige.points} \${prestige.currencyName}\`,
        \`Pending: +\${prestige.pendingPoints} | Multiplier: x\${prestige.multiplier.toFixed(2)}\`,
        prestige.canPrestige ? 'Reset available.' : prestige.lockedReason ?? 'Earn more before reset.',
      ]);
    }

    this.achievementText.setText(this.formatAchievements(ui));
  }

  private persist(bestScore = this.saveData.bestScore): void {
    const cookies = this.economy.getResource('cookies');
    this.saveData = {
      ...this.saveData,
      bestScore: Math.max(bestScore, Math.floor(cookies.maxSeen)),
      idle: this.economy.toSaveData(),
    };
    this.saveManager.save(this.saveData);
  }

  private getOfflineStatus(report: IdleOfflineReport): string {
    if (report.simulatedSeconds <= 0) {
      return 'Offline progress is ready. Buy an oven, leave, and come back to see capped gains.';
    }

    const gainedCookies = report.resourceGains.cookies ?? 0;
    const unlocked = report.unlockedAchievementIds.length > 0
      ? \` Achievements: \${report.unlockedAchievementIds.join(', ')}.\`
      : '';
    const capText = report.capReached ? ' Offline cap reached.' : '';

    return \`While away: +\${this.formatNumber(gainedCookies)} cookies over \${Math.floor(report.simulatedSeconds / 60)} min.\${capText}\${unlocked}\`;
  }

  private formatAchievements(ui: IdleUiModel): string {
    const unlocked = ui.achievements.filter((entry) => entry.unlocked);
    const next = ui.achievements.find((entry) => !entry.unlocked);

    return [
      \`Achievements: \${unlocked.length}/\${ui.achievements.length}\`,
      ...unlocked.map((entry) => \`Unlocked: \${entry.name}\`),
      next ? \`Next: \${next.name} - \${next.description}\` : 'All starter achievements unlocked.',
    ].join('\\n');
  }

  private flashText(target: Phaser.GameObjects.Text): void {
    this.tweens.add({
      targets: target,
      scale: { from: 1.08, to: 1 },
      duration: 140,
      ease: 'Sine.easeOut',
    });
  }

  private formatNumber(value: number): string {
    if (value >= 1000) {
      return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }

    return value.toLocaleString('en-US', { maximumFractionDigits: 1 });
  }

  private drawBackground(width: number, height: number): void {
    this.add.rectangle(width / 2, height / 2, width, height, 0x0c1017);

    const graphics = this.add.graphics();
    graphics.fillStyle(0x111824, 0.92);
    graphics.fillRect(0, 0, width, height);
    graphics.lineStyle(1, 0x26384f, 0.42);

    for (let x = 0; x <= width; x += 64) {
      graphics.lineBetween(x, 0, x, height);
    }

    for (let y = 0; y <= height; y += 64) {
      graphics.lineBetween(0, y, width, y);
    }

    graphics.fillStyle(0x2bbd91, 0.06);
    graphics.fillCircle(width * 0.16, height * 0.22, 260);
    graphics.fillStyle(0xffc857, 0.055);
    graphics.fillCircle(width * 0.84, height * 0.66, 300);
  }
}
`;
}

