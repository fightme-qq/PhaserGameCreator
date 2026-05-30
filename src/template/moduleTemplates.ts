import type { GeneratedFile } from '../types';

export function moduleTemplates(): GeneratedFile[] {
  return [

    {
      path: 'templates/modules/README.md',
      content: `# Module Templates

These files are reusable starting points for agents.

They are intentionally outside \`src/\` so they do not compile until copied or adapted.

Use them when a feature needs a common system shape:

- \`InputActions.ts\`: action-based input snapshot.
- \`TimerSystem.ts\`: countdown/count-up loop.
- \`HealthSystem.ts\`: health, damage, invulnerability.
- \`ObjectPool.ts\`: reusable object lifecycle.
- \`PhaserSpritePool.ts\`: Phaser Group-based sprite recycling.
- \`DebugOverlay.ts\`: development-only text overlay.
- \`AudioManager.ts\`: music/SFX volume and unlock shape.
- \`AnimationStateMachine.ts\`: animation state transitions.

Before copying a template:

1. Pick the matching skill.
2. Rename types and events to match the game.
3. Keep only the code needed for the first playable.
4. Add validation notes after testing.
`,
    },
    {
      path: 'templates/modules/InputActions.ts',
      content: `export type InputActions = {
  moveX: number;
  moveY: number;
  primary: boolean;
  secondary: boolean;
  confirm: boolean;
  cancel: boolean;
};

export const emptyInputActions: InputActions = {
  moveX: 0,
  moveY: 0,
  primary: false,
  secondary: false,
  confirm: false,
  cancel: false,
};

export function normalizeAxis(value: number): number {
  if (Math.abs(value) < 0.15) {
    return 0;
  }

  return Math.max(-1, Math.min(1, value));
}
`,
    },
    {
      path: 'templates/modules/TimerSystem.ts',
      content: `export class TimerSystem {
  private remainingMs: number;
  private finished = false;

  constructor(durationMs: number) {
    this.remainingMs = durationMs;
  }

  get remaining(): number {
    return Math.max(0, this.remainingMs);
  }

  get isFinished(): boolean {
    return this.finished;
  }

  reset(durationMs: number): void {
    this.remainingMs = durationMs;
    this.finished = false;
  }

  update(deltaMs: number): boolean {
    if (this.finished) {
      return false;
    }

    this.remainingMs -= deltaMs;

    if (this.remainingMs <= 0) {
      this.remainingMs = 0;
      this.finished = true;
      return true;
    }

    return false;
  }
}
`,
    },
    {
      path: 'templates/modules/HealthSystem.ts',
      content: `export class HealthSystem {
  private current: number;
  private invulnerableMs = 0;

  constructor(private readonly maxHealth: number) {
    this.current = maxHealth;
  }

  get health(): number {
    return this.current;
  }

  get isDead(): boolean {
    return this.current <= 0;
  }

  reset(): void {
    this.current = this.maxHealth;
    this.invulnerableMs = 0;
  }

  update(deltaMs: number): void {
    this.invulnerableMs = Math.max(0, this.invulnerableMs - deltaMs);
  }

  damage(amount: number, invulnerabilityMs = 500): boolean {
    if (this.invulnerableMs > 0 || this.isDead) {
      return false;
    }

    this.current = Math.max(0, this.current - amount);
    this.invulnerableMs = invulnerabilityMs;
    return true;
  }

  heal(amount: number): void {
    this.current = Math.min(this.maxHealth, this.current + amount);
  }
}
`,
    },
    {
      path: 'templates/modules/ObjectPool.ts',
      content: `export type Poolable = {
  active: boolean;
  reset(): void;
};

export class ObjectPool<T extends Poolable> {
  private readonly items: T[] = [];

  constructor(
    private readonly createItem: () => T,
    private readonly maxSize: number,
  ) {}

  acquire(): T | undefined {
    const inactive = this.items.find((item) => !item.active);

    if (inactive) {
      inactive.reset();
      inactive.active = true;
      return inactive;
    }

    if (this.items.length >= this.maxSize) {
      return undefined;
    }

    const item = this.createItem();
    item.active = true;
    this.items.push(item);
    return item;
  }

  release(item: T): void {
    item.active = false;
  }

  get activeCount(): number {
    return this.items.filter((item) => item.active).length;
  }
}
`,
    },
    {
      path: 'templates/modules/PhaserSpritePool.ts',
      content: `import Phaser from 'phaser';

export type PhaserSpritePoolConfig = {
  defaultKey: string;
  maxSize: number;
  classType?: typeof Phaser.GameObjects.Sprite;
  runChildUpdate?: boolean;
};

export class PhaserSpritePool<TSprite extends Phaser.GameObjects.Sprite = Phaser.GameObjects.Sprite> {
  private readonly group: Phaser.GameObjects.Group;

  constructor(
    scene: Phaser.Scene,
    private readonly config: PhaserSpritePoolConfig,
  ) {
    this.group = scene.add.group({
      classType: config.classType ?? Phaser.GameObjects.Sprite,
      defaultKey: config.defaultKey,
      maxSize: config.maxSize,
      runChildUpdate: config.runChildUpdate ?? false,
    });
  }

  prewarm(count = this.config.maxSize): void {
    const repeat = Math.max(0, Math.min(count, this.config.maxSize) - 1);

    if (repeat < 0) {
      return;
    }

    this.group.createMultiple({
      key: this.config.defaultKey,
      repeat,
      active: false,
      visible: false,
    });
  }

  acquire(x: number, y: number, frame?: string | number): TSprite | undefined {
    const sprite = this.group.get(x, y, this.config.defaultKey, frame) as TSprite | null;

    if (!sprite) {
      return undefined;
    }

    sprite.setActive(true);
    sprite.setVisible(true);
    sprite.setPosition(x, y);

    return sprite;
  }

  release(sprite: TSprite): void {
    this.group.killAndHide(sprite);
  }

  get children(): TSprite[] {
    return this.group.getChildren() as TSprite[];
  }

  get activeCount(): number {
    return this.group.countActive(true);
  }

  get freeCount(): number {
    return this.group.getTotalFree();
  }
}
`,
    },
    {
      path: 'templates/modules/DebugOverlay.ts',
      content: `import Phaser from 'phaser';

export class DebugOverlay {
  private text: Phaser.GameObjects.Text;
  private visible = false;

  constructor(scene: Phaser.Scene) {
    this.text = scene.add
      .text(12, 12, '', {
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#7ee7c8',
        backgroundColor: 'rgba(0,0,0,0.55)',
        padding: { x: 8, y: 6 },
      })
      .setScrollFactor(0)
      .setDepth(10000)
      .setVisible(false);
  }

  toggle(): void {
    this.visible = !this.visible;
    this.text.setVisible(this.visible);
  }

  update(lines: string[]): void {
    if (!this.visible) {
      return;
    }

    this.text.setText(lines.join('\\n'));
  }

  destroy(): void {
    this.text.destroy();
  }
}
`,
    },
    {
      path: 'templates/modules/AudioManager.ts',
      content: `import Phaser from 'phaser';

export class AudioManager {
  private unlocked = false;
  private music?: Phaser.Sound.BaseSound;
  private musicVolume = 0.6;
  private sfxVolume = 0.8;
  private muted = false;

  constructor(private readonly scene: Phaser.Scene) {}

  unlockOnFirstGesture(): void {
    if (this.unlocked) {
      return;
    }

    this.scene.input.once('pointerdown', () => {
      this.unlocked = true;
    });
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.scene.sound.mute = muted;
  }

  playMusic(key: string): void {
    if (this.music?.isPlaying) {
      this.music.stop();
    }

    this.music = this.scene.sound.add(key, { loop: true, volume: this.musicVolume });
    this.music.play();
  }

  playSfx(key: string): void {
    if (this.muted) {
      return;
    }

    this.scene.sound.play(key, { volume: this.sfxVolume });
  }
}
`,
    },
    {
      path: 'templates/modules/AnimationStateMachine.ts',
      content: `import Phaser from 'phaser';

export type AnimationState = {
  key: string;
  priority: number;
  interruptible: boolean;
};

export class AnimationStateMachine {
  private current?: AnimationState;

  constructor(private readonly sprite: Phaser.GameObjects.Sprite) {}

  play(next: AnimationState): void {
    if (this.current?.key === next.key) {
      return;
    }

    if (this.current && !this.current.interruptible && next.priority < this.current.priority) {
      return;
    }

    this.current = next;
    this.sprite.play(next.key, true);
  }

  clearIf(key: string): void {
    if (this.current?.key === key) {
      this.current = undefined;
    }
  }
}
`,
    },
  ];
}
