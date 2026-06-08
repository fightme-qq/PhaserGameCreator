import type { GeneratedFile } from '../types';
import { reference, skill } from './skills/helpers';

export function idleGameSkills(): GeneratedFile[] {
  return [
    skill(
      'phaser-idle-game-architect',
      'Use when the game is idle, incremental, clicker, factory, tycoon, automation, merge-idle, RPG-idle, collection-idle, offline-progress, resource-growth, prestige, or long-term economy driven.',
      `# Phaser Idle Game Architect

## Workflow

1. Read \`references/igm-handbook-derived-model.md\`.
2. Define the loop as resources -> production -> spending -> upgrades -> unlocks -> long-term growth.
3. Put idle rules in \`src/game/idle/\` and content in \`src/data/idleContent.ts\`.
4. Keep Phaser scenes thin. Scenes should render, route input, and call the idle systems.
5. Add or update unit tests before tuning numbers.
6. Use stable content IDs because saves depend on them.

## Rules

- Do not implement an idle game as a scene-local click counter.
- Do not tie production to frame rate; convert Phaser delta to seconds.
- Do not scatter resource changes through tweens, UI callbacks, and scene code.
- Every purchaseable thing should show cost, affordability, owned count, and next effect.
- Use typed effects/selectors/configs instead of an unreviewed string DSL.
`,
    ),
    reference('phaser-idle-game-architect', 'igm-handbook-derived-model.md', igmDerivedModel),
    skill(
      'phaser-idle-economy-balancer',
      'Use when tuning idle/incremental resource rates, cost curves, producer scaling, upgrade multipliers, bulk buy, requirements, milestones, or content pacing.',
      `# Phaser Idle Economy Balancer

## Workflow

1. Read \`references/idle-formulas.md\`.
2. Read \`references/idle-balancing-workflow.md\`.
3. List target time bands: 10 seconds, 1 minute, 5 minutes, 30 minutes, 2 hours, next day.
4. For each band, define expected unlocks and purchases.
5. Tune producer costs and output in \`src/data/idleContent.ts\`.
6. Add simulation-style unit tests for cost, production, upgrades, and offline caps.
7. Check that every visible purchase is reachable and useful.

## Rules

- The first active reward should happen immediately.
- The first producer should be reachable quickly.
- Exponential costs need compounding production, upgrades, or unlocks.
- Hidden counters are fine; hidden blockers are not.
- Bulk buy must use deterministic math and tests.
- Do not change economy numbers without naming the expected time-band impact.
`,
    ),
    reference('phaser-idle-economy-balancer', 'idle-formulas.md', idleFormulasReference),
    reference('phaser-idle-economy-balancer', 'idle-balancing-workflow.md', idleBalancingWorkflowReference),
    skill(
      'phaser-idle-ui-feedback',
      'Use when building Phaser idle HUDs, resource panels, producer cards, upgrade grids, achievement shelves, logs, toasts, number popups, temporary bonus visuals, or dense mobile/desktop economy UI.',
      `# Phaser Idle UI Feedback

## Workflow

1. Read the UI model from \`IdleEconomy.getUiModel()\` or a dedicated \`IdleUiModel\` helper.
2. Show resource current amounts and per-second rates.
3. Show producer owned count, next cost, affordability, and output.
4. Show upgrade cost, owned state, and a short effect summary.
5. Add clear feedback for gain, spend, unlock, achievement, shiny, save/load, and offline return.

## Rules

- Do not hide critical economy numbers only in tooltips.
- Keep dense idle UI readable on phone and desktop.
- Respect reduced motion for heavy particles, flashes, and pulsing bonuses.
- Use Phaser objects or a deliberate DOM overlay; do not mix both casually.
`,
    ),
    skill(
      'phaser-idle-offline-prestige',
      'Use when adding idle offline progress, return summaries, save migrations, reset/prestige loops, meta currency, daily rewards, or long-term retention systems.',
      `# Phaser Idle Offline Prestige

## Workflow

1. Confirm which resources can be earned offline.
2. Define an offline cap and document it in \`docs/IDLE_GAME_DESIGN.md\`.
3. Run migrations before offline simulation.
4. Simulate capped elapsed time deterministically.
5. Show a return summary to the player.
6. Add prestige only after the base economy loop has meaningful reset value.

## Rules

- Offline gains must be capped.
- Prestige must preserve settings and only reset intended economy state.
- Do not wipe save data without a migration or explicit player action.
- Test save/load/offline edge cases.
`,
    ),
  ];
}

export function idleGameProjectFiles(): GeneratedFile[] {
  return [
    {
      path: 'docs/IDLE_GAME_DESIGN.md',
      content: idleDesignDoc,
    },
    {
      path: 'docs/IDLE_BALANCE_CHECKLIST.md',
      content: idleBalanceChecklist,
    },
    {
      path: 'src/game/idle/idleTypes.ts',
      content: idleTypesSource,
    },
    {
      path: 'src/game/idle/IdleEconomy.ts',
      content: idleEconomySource,
    },
    {
      path: 'src/data/idleContent.ts',
      content: idleContentSource,
    },
    {
      path: 'tests/unit/IdleEconomy.test.ts',
      content: idleEconomyTestSource,
    },
    {
      path: 'tests/unit/IdleFormulaExamples.test.ts',
      content: idleFormulaExamplesTestSource,
    },
  ];
}

const igmDerivedModel = `# IGM Handbook Derived Model

Source: https://orteil.dashnet.org/igm/help.html

This reference adapts Idle Game Maker concepts to Phaser + TypeScript. Do not copy the IGM text DSL into this project unless the human explicitly asks for a DSL.

## Core Model

Idle games are systems of things and effects:

- resources: current amount, total earned, max seen, per-second flow;
- actions/buttons: active clicks or commands that trigger effects;
- buildings/producers: buyable passive production with scaling costs;
- upgrades: one-time purchases with passive modifiers or unlocks;
- achievements: milestones, optionally with passive effects;
- items: multiple owned instances, useful for equipment, cards, relics, workers;
- shinies: temporary random clickable bonuses;
- effects: typed operations such as gain, lose, multiply, show, hide, log, toast;
- conditions: requirements and if/else style gates;
- selectors: target one entity, all of a type, owned/unowned things, tags, or chained filters;
- expressions: amounts, earned totals, owned counts, max values, comparisons, math, randomness;
- layout: panels that display filtered groups with names, icons, costs, rates, owned counts, and tooltips.

## Phaser Translation

- Use TypeScript data and types, not scene-local counters.
- Keep content in \`src/data/idleContent.ts\`.
- Keep deterministic economy rules in \`src/game/idle/\`.
- Keep Phaser scenes responsible for rendering and input only.
- Use IDs as save keys. Never rename IDs after players have saves.
- Unit-test economy math because manual testing misses scaling bugs.

## Required Idle Loop

Every generated idle design should answer:

1. What is the first resource?
2. What active action creates early agency?
3. What producer automates growth?
4. What upgrade changes the economy rule?
5. What milestone proves progress?
6. What offline behavior is allowed?
7. What UI numbers must always be visible?
`;

const idleFormulasReference = `# Idle Economy Formulas

Use these formulas before changing idle economy numbers.

## Cost Scaling

Next producer cost:

\`\`\`ts
nextCost = ceil(baseCost * costScale ** owned)
\`\`\`

Starter rule:

- costScale around 1.07-1.18 is gentle.
- costScale above 1.25 becomes steep quickly.
- If costs grow exponentially, production must compound through more producers, upgrades, prestige, or new layers.

Bulk cost with per-purchase rounding:

\`\`\`ts
bulkCost(count) = sum(ceil(baseCost * costScale ** (owned + i)) for i in 0..count-1)
\`\`\`

Use the sum in gameplay code unless you also test a geometric-series shortcut with the same rounding behavior.

## Production

Producer output:

\`\`\`ts
producerPerSecond = baseProductionPerSecond * upgradeMultiplier * prestigeMultiplier
resourcePerSecond = sum(owned * producerPerSecond for producers that output resource)
\`\`\`

Active action output:

\`\`\`ts
actionGain = baseGain * actionUpgradeMultiplier * prestigeMultiplier
\`\`\`

## Multipliers

Default stacking rule in this template is multiplicative:

\`\`\`ts
finalMultiplier = multiplierA * multiplierB * prestigeMultiplier
\`\`\`

Use additive bonuses only when intentionally designing flat upgrades:

\`\`\`ts
output = baseOutput + flatBonus
\`\`\`

Do not mix additive and multiplicative stacking without naming the order in tests.

## Affordability

Basic purchase:

\`\`\`ts
canBuy = requirementsMet && currentResource >= nextCost
\`\`\`

Max buy:

\`\`\`ts
while spent + nextCost <= currentResource:
  buy one
\`\`\`

For very large economies, replace the loop with a tested binary search or geometric formula.

## Offline Progress

Always cap offline simulation:

\`\`\`ts
elapsedSeconds = floor((now - savedAt) / 1000)
simulatedSeconds = min(elapsedSeconds, offlineCapSeconds)
gain = resourcePerSecond * simulatedSeconds
capReached = elapsedSeconds > simulatedSeconds
\`\`\`

Run save migrations before offline simulation.

## Prestige

Starter prestige formula:

\`\`\`ts
pendingPoints = floor(totalEarnedResource / divisor)
prestigeMultiplier = 1 + totalPrestigePoints * multiplierPerPoint
\`\`\`

Prestige should reset run state and preserve only intentional meta state: settings, meta currency, reset count, and optionally achievements.

## Typed Expressions

Use typed expressions instead of custom if-statements when a formula should remain data-driven.

Examples:

\`\`\`ts
{ kind: 'resourceEarned', resourceId: 'cookies' }
{ kind: 'producerOwned', producerId: 'oven' }
{ kind: 'multiply', values: [2, { kind: 'prestigePoints' }] }
{ kind: 'gte', left: { kind: 'resourceEarned', resourceId: 'cookies' }, right: 250 }
\`\`\`

Good expression uses:

- prestige point formulas;
- gates that combine resources, owned counts, and clicks;
- dynamic shiny rewards;
- content rules that should stay in data/config.

Bad expression uses:

- scene-specific rendering logic;
- deeply nested formulas with no tests;
- random balance changes without time-band intent.

## Time Bands

Tune with explicit bands:

- 10 seconds: first reward, readable feedback.
- 1 minute: first producer should be reachable.
- 5 minutes: first upgrade or automation change.
- 30 minutes: second mechanic or new content layer.
- 2 hours: offline cap and mid-session pacing.
- Next day: return summary, prestige or long-term goal.

## Anti-Patterns

- Exponential costs without compounding production.
- First automation later than the player has patience for.
- Hidden blockers with no locked reason.
- Dead producers that never become useful again.
- Offline gains without a cap.
- Prestige that resets too much or gives no meaningful multiplier.
`;

const idleBalancingWorkflowReference = `# Idle Balancing Workflow

Use this process when changing rates, costs, upgrades, unlocks, offline progress, or prestige.

## Step 1: Name The Loop

Write the loop in one line:

\`\`\`text
Click -> earn cookies -> buy ovens -> unlock upgrades -> collect bonuses -> prestige for permanent speed.
\`\`\`

If the loop cannot be written simply, do not tune numbers yet.

## Step 2: Define Time-Band Targets

Create a table before editing numbers:

| Band | Expected player state |
| --- | --- |
| 10 sec | understands first resource and action |
| 1 min | can buy first producer |
| 5 min | sees first upgrade and passive income |
| 30 min | has a new unlock, bonus, or decision |
| 2 hr | offline cap matters |
| next day | prestige or long-term goal is visible |

## Step 3: Simulate, Then Adjust

Prefer unit tests or small helper simulations over manual clicking.

Check:

- time to first producer;
- time to first upgrade;
- output after each upgrade;
- cost of buy 1, buy 10, buy max;
- offline gain after cap;
- pending prestige points after target session lengths.

## Step 4: Keep UI Truthful

Every purchasable item should expose:

- owned count;
- next cost;
- affordability;
- max affordable;
- production impact;
- locked reason if requirements are not met.

## Step 5: Preserve Design Intent In Tests

When changing formulas, add tests that encode intent:

- "first oven is reachable with 10 clicks";
- "buying 3 ovens costs 36 with ceil-per-purchase rounding";
- "offline progress caps at 2 hours";
- "prestige point gives +10% output".

## Step 6: Avoid Spreadsheet Drift

If a formula exists in a spreadsheet, mirror it in code comments or tests. The game is the source of truth at runtime.
`;

const idleDesignDoc = `# Idle Game Design

This project includes the optional Idle / Incremental Game Pack.

Use it for idle, incremental, clicker, factory, tycoon, RPG-idle, merge-idle, collection-idle, automation, prestige, and offline-progress games.

## Architecture

- \`src/data/idleContent.ts\`: data-driven resources, actions, producers, upgrades, achievements.
- \`src/game/idle/idleTypes.ts\`: stable TypeScript contracts.
- \`src/game/idle/IdleEconomy.ts\`: deterministic economy runtime.
- \`tests/unit/IdleEconomy.test.ts\`: baseline math and progression tests.
- \`tests/unit/IdleFormulaExamples.test.ts\`: executable examples for core idle formulas.
- \`skills/phaser-idle-economy-balancer/references/idle-formulas.md\`: formula reference.
- \`skills/phaser-idle-economy-balancer/references/idle-balancing-workflow.md\`: tuning workflow.

## Design Loop

1. Active action gives the first resource.
2. The first producer turns resource into passive income.
3. The first upgrade changes output or unlocks a new decision.
4. Achievements acknowledge progress.
5. Offline progress rewards returning players within a cap.
6. Temporary bonuses create timed high-attention moments.
7. Prestige resets convert long-term progress into permanent power.

## Phaser Integration

Phaser scenes should:

- call \`economy.clickAction(id)\` from pointer/keyboard input;
- call \`economy.tick(delta / 1000)\` from \`update\`;
- render values from \`economy.getUiModel()\`;
- save \`economy.toSaveData()\` through the project save system.
- render temporary bonuses from \`economy.getUiModel().shinies\`.
- preview and execute prestige through \`economy.getUiModel().prestige\` and \`economy.prestigeReset()\`.

Do not put idle math inside text labels, tweens, or scene event callbacks.

## Core Formulas

- Next cost: \`ceil(baseCost * costScale ** owned)\`
- Bulk cost: sum of rounded individual next costs
- Per-second output: \`sum(owned * baseOutput * multipliers)\`
- Offline simulated seconds: \`min(elapsedSeconds, offlineCapSeconds)\`
- Prestige pending points: \`floor(totalEarned / divisor)\`
`;

const idleBalanceChecklist = `# Idle Balance Checklist

Use this before calling an idle economy playable.

- First reward happens immediately.
- First producer is reachable within the first minute.
- First upgrade changes a meaningful rule.
- Costs, outputs, and multipliers live in data/config.
- Bulk buy math is deterministic.
- Temporary bonuses have duration, spawn rules, rewards, and reduced-motion friendly UI.
- Offline progress is capped and summarized.
- Prestige preview shows pending reward, reset count, and permanent multiplier.
- Save IDs are stable.
- Unit tests cover action gain, producer buying, passive production, upgrade effects, achievement unlock, and offline cap.
- Formula examples in \`tests/unit/IdleFormulaExamples.test.ts\` still pass after tuning.
`;

const idleTypesSource = `export type IdleResourceId = string;
export type IdleActionId = string;
export type IdleProducerId = string;
export type IdleUpgradeId = string;
export type IdleAchievementId = string;
export type IdleShinyId = string;

export type IdleCost = {
  resourceId: IdleResourceId;
  amount: number;
};

export type IdleEntityType = 'resource' | 'action' | 'producer' | 'upgrade' | 'achievement' | 'shiny';

export type IdleSelector = {
  id?: string;
  type?: IdleEntityType;
  tags?: string[];
  owned?: boolean;
  all?: boolean;
};

export type IdleNumberExpression =
  | number
  | { kind: 'resourceCurrent'; resourceId: IdleResourceId }
  | { kind: 'resourceEarned'; resourceId: IdleResourceId }
  | { kind: 'resourceMaxSeen'; resourceId: IdleResourceId }
  | { kind: 'producerOwned'; producerId: IdleProducerId }
  | { kind: 'actionClicks'; actionId: IdleActionId }
  | { kind: 'perSecond'; resourceId: IdleResourceId }
  | { kind: 'prestigePoints' }
  | { kind: 'add'; values: IdleNumberExpression[] }
  | { kind: 'multiply'; values: IdleNumberExpression[] }
  | { kind: 'subtract'; left: IdleNumberExpression; right: IdleNumberExpression }
  | { kind: 'divide'; left: IdleNumberExpression; right: IdleNumberExpression }
  | { kind: 'floor'; value: IdleNumberExpression }
  | { kind: 'ceil'; value: IdleNumberExpression }
  | { kind: 'min'; values: IdleNumberExpression[] }
  | { kind: 'max'; values: IdleNumberExpression[] };

export type IdleConditionExpression =
  | { kind: 'gte'; left: IdleNumberExpression; right: IdleNumberExpression }
  | { kind: 'lte'; left: IdleNumberExpression; right: IdleNumberExpression }
  | { kind: 'eq'; left: IdleNumberExpression; right: IdleNumberExpression }
  | { kind: 'and'; conditions: IdleConditionExpression[] }
  | { kind: 'or'; conditions: IdleConditionExpression[] }
  | { kind: 'not'; condition: IdleConditionExpression };

export type IdleEffect =
  | { kind: 'gain'; resourceId: IdleResourceId; amount: IdleNumberExpression }
  | { kind: 'lose'; resourceId: IdleResourceId; amount: IdleNumberExpression }
  | { kind: 'buyProducer'; producerId: IdleProducerId; count?: number }
  | { kind: 'buyUpgrade'; upgradeId: IdleUpgradeId };

export type IdleResourceDefinition = {
  id: IdleResourceId;
  name: string;
  tags?: string[];
  startAmount?: number;
  allowNegative?: boolean;
};

export type IdleActionDefinition = {
  id: IdleActionId;
  name: string;
  tags?: string[];
  resourceId: IdleResourceId;
  baseGain: number;
};

export type IdleRequirement =
  | { kind: 'resourceCurrentAtLeast'; resourceId: IdleResourceId; amount: number }
  | { kind: 'resourceEarnedAtLeast'; resourceId: IdleResourceId; amount: number }
  | { kind: 'producerOwnedAtLeast'; producerId: IdleProducerId; amount: number }
  | { kind: 'actionClicksAtLeast'; actionId: IdleActionId; amount: number }
  | { kind: 'upgradeOwned'; upgradeId: IdleUpgradeId }
  | { kind: 'expression'; condition: IdleConditionExpression };

export type IdleProducerDefinition = {
  id: IdleProducerId;
  name: string;
  tags?: string[];
  requirements?: IdleRequirement[];
  resourceId: IdleResourceId;
  baseCost: number;
  costScale: number;
  baseProductionPerSecond: number;
};

export type IdleUpgradeEffect =
  | { kind: 'multiplyActionGain'; actionId?: IdleActionId; selector?: IdleSelector; multiplier: number }
  | { kind: 'multiplyProducerOutput'; producerId?: IdleProducerId; selector?: IdleSelector; multiplier: number };

export type IdleUpgradeDefinition = {
  id: IdleUpgradeId;
  name: string;
  tags?: string[];
  requirements?: IdleRequirement[];
  cost: IdleCost;
  description: string;
  effects: IdleUpgradeEffect[];
};

export type IdleAchievementDefinition = {
  id: IdleAchievementId;
  name: string;
  tags?: string[];
  description: string;
  requirements: IdleRequirement[];
};

export type IdleShinyDefinition = {
  id: IdleShinyId;
  name: string;
  tags?: string[];
  description: string;
  requirements?: IdleRequirement[];
  spawnEverySeconds: number;
  durationSeconds: number;
  effects: IdleEffect[];
};

export type IdlePrestigeDefinition = {
  id: string;
  name: string;
  currencyName: string;
  requirements: IdleRequirement[];
  pointsExpression?: IdleNumberExpression;
  pointsPerEarnedResource?: {
    resourceId: IdleResourceId;
    divisor: number;
  };
  productionMultiplierPerPoint: number;
  preserveAchievements: boolean;
};

export type IdleContent = {
  resources: IdleResourceDefinition[];
  actions: IdleActionDefinition[];
  producers: IdleProducerDefinition[];
  upgrades: IdleUpgradeDefinition[];
  achievements: IdleAchievementDefinition[];
  shinies: IdleShinyDefinition[];
  prestige?: IdlePrestigeDefinition;
  offlineCapSeconds: number;
};

export type IdleResourceState = {
  current: number;
  earnedTotal: number;
  maxSeen: number;
};

export type IdleSaveData = {
  schemaVersion: number;
  savedAt: number;
  resources: Record<IdleResourceId, IdleResourceState>;
  actions: Record<IdleActionId, { clicks: number }>;
  producers: Record<IdleProducerId, { owned: number; maxSeen: number }>;
  upgrades: Record<IdleUpgradeId, boolean>;
  achievements: Record<IdleAchievementId, boolean>;
  shinies: Record<IdleShinyId, { clicks: number; active: boolean; remainingSeconds: number; spawnElapsedSeconds: number }>;
  prestige: {
    points: number;
    totalResets: number;
  };
};

export type IdleOfflineReport = {
  elapsedSeconds: number;
  simulatedSeconds: number;
  capReached: boolean;
  resourceGains: Record<IdleResourceId, number>;
  unlockedAchievementIds: IdleAchievementId[];
};

export type IdlePrestigePreview = {
  enabled: boolean;
  name: string;
  currencyName: string;
  points: number;
  totalResets: number;
  pendingPoints: number;
  multiplier: number;
  canPrestige: boolean;
  lockedReason: string | undefined;
};

export type IdleUiModel = {
  resources: Array<IdleResourceState & { id: IdleResourceId; name: string; perSecond: number }>;
  actions: Array<{ id: IdleActionId; name: string; gain: number; clicks: number }>;
  producers: Array<{
    id: IdleProducerId;
    name: string;
    owned: number;
    nextCost: number;
    bulk10Cost: number;
    maxAffordable: number;
    affordable: boolean;
    visible: boolean;
    lockedReason: string | undefined;
    productionPerSecond: number;
  }>;
  upgrades: Array<{
    id: IdleUpgradeId;
    name: string;
    description: string;
    owned: boolean;
    affordable: boolean;
    visible: boolean;
    lockedReason: string | undefined;
  }>;
  achievements: Array<{ id: IdleAchievementId; name: string; description: string; unlocked: boolean; visible: boolean }>;
  shinies: Array<{
    id: IdleShinyId;
    name: string;
    description: string;
    active: boolean;
    visible: boolean;
    remainingSeconds: number;
    clicks: number;
  }>;
  prestige: IdlePrestigePreview | undefined;
};
`;

const idleEconomySource = `import type {
  IdleAchievementDefinition,
  IdleActionDefinition,
  IdleActionId,
  IdleContent,
  IdleConditionExpression,
  IdleEffect,
  IdleNumberExpression,
  IdleOfflineReport,
  IdlePrestigePreview,
  IdleProducerDefinition,
  IdleProducerId,
  IdleRequirement,
  IdleResourceId,
  IdleResourceState,
  IdleSaveData,
  IdleSelector,
  IdleShinyId,
  IdleUiModel,
  IdleUpgradeDefinition,
} from './idleTypes';

export class IdleEconomy {
  private readonly content: IdleContent;
  private readonly resources = new Map<IdleResourceId, IdleResourceState>();
  private readonly actionClicks = new Map<IdleActionId, number>();
  private readonly producerOwned = new Map<IdleProducerId, number>();
  private readonly producerMaxSeen = new Map<IdleProducerId, number>();
  private readonly upgradesOwned = new Set<string>();
  private readonly achievementsUnlocked = new Set<string>();
  private readonly shinyClicks = new Map<IdleShinyId, number>();
  private readonly activeShinies = new Map<IdleShinyId, number>();
  private readonly shinySpawnElapsed = new Map<IdleShinyId, number>();
  private prestigePoints = 0;
  private prestigeResets = 0;
  private savedAt: number;

  constructor(content: IdleContent, saveData?: IdleSaveData, now = Date.now()) {
    this.content = content;
    this.savedAt = saveData?.savedAt ?? now;

    for (const resource of content.resources) {
      this.resources.set(resource.id, saveData?.resources[resource.id] ?? {
        current: resource.startAmount ?? 0,
        earnedTotal: resource.startAmount ?? 0,
        maxSeen: resource.startAmount ?? 0,
      });
    }

    for (const action of content.actions) {
      this.actionClicks.set(action.id, saveData?.actions[action.id]?.clicks ?? 0);
    }

    for (const producer of content.producers) {
      this.producerOwned.set(producer.id, saveData?.producers[producer.id]?.owned ?? 0);
      this.producerMaxSeen.set(producer.id, saveData?.producers[producer.id]?.maxSeen ?? 0);
    }

    for (const upgrade of content.upgrades) {
      if (saveData?.upgrades[upgrade.id]) {
        this.upgradesOwned.add(upgrade.id);
      }
    }

    for (const achievement of content.achievements) {
      if (saveData?.achievements[achievement.id]) {
        this.achievementsUnlocked.add(achievement.id);
      }
    }

    for (const shiny of content.shinies) {
      const saved = saveData?.shinies[shiny.id];
      this.shinyClicks.set(shiny.id, saved?.clicks ?? 0);
      this.shinySpawnElapsed.set(shiny.id, saved?.spawnElapsedSeconds ?? 0);

      if (saved?.active && saved.remainingSeconds > 0) {
        this.activeShinies.set(shiny.id, saved.remainingSeconds);
      }
    }

    this.prestigePoints = saveData?.prestige?.points ?? 0;
    this.prestigeResets = saveData?.prestige?.totalResets ?? 0;

    this.validateContent();
    this.evaluateAchievements();
  }

  clickAction(actionId: IdleActionId): void {
    const action = this.getAction(actionId);
    this.actionClicks.set(actionId, (this.actionClicks.get(actionId) ?? 0) + 1);
    this.gainResource(action.resourceId, this.getActionGain(action));
    this.evaluateAchievements();
  }

  tick(seconds: number): void {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return;
    }

    for (const producer of this.content.producers) {
      const owned = this.producerOwned.get(producer.id) ?? 0;

      if (owned > 0) {
        this.gainResource(producer.resourceId, this.getProducerProduction(producer) * seconds);
      }
    }

    this.tickShinies(seconds);
    this.evaluateAchievements();
  }

  applyOfflineProgress(now: number): IdleOfflineReport {
    const elapsedSeconds = Math.max(0, Math.floor((now - this.savedAt) / 1000));
    const simulatedSeconds = Math.min(elapsedSeconds, this.content.offlineCapSeconds);
    const beforeResources = new Map(
      this.content.resources.map((resource) => [resource.id, this.getResource(resource.id).current]),
    );
    const beforeAchievements = new Set(this.achievementsUnlocked);

    this.tick(simulatedSeconds);
    this.savedAt = now;

    return {
      elapsedSeconds,
      simulatedSeconds,
      capReached: elapsedSeconds > simulatedSeconds,
      resourceGains: Object.fromEntries(
        this.content.resources.map((resource) => [
          resource.id,
          this.getResource(resource.id).current - (beforeResources.get(resource.id) ?? 0),
        ]),
      ),
      unlockedAchievementIds: Array.from(this.achievementsUnlocked).filter((id) => !beforeAchievements.has(id)),
    };
  }

  canBuyProducer(producerId: IdleProducerId): boolean {
    const producer = this.getProducer(producerId);
    return this.areRequirementsMet(producer.requirements) && this.getResource(producer.resourceId).current >= this.getProducerCost(producerId);
  }

  buyProducer(producerId: IdleProducerId): boolean {
    return this.buyProducerBulk(producerId, 1) > 0;
  }

  buyProducerBulk(producerId: IdleProducerId, count: number): number {
    const producer = this.getProducer(producerId);
    const safeCount = Math.max(0, Math.floor(count));

    if (safeCount <= 0) {
      return 0;
    }

    if (!this.areRequirementsMet(producer.requirements)) {
      return 0;
    }

    let purchased = 0;

    for (let index = 0; index < safeCount; index += 1) {
      const cost = this.getProducerCost(producerId);

      if (!this.spendResource(producer.resourceId, cost)) {
        break;
      }

      purchased += 1;
      this.producerOwned.set(producerId, (this.producerOwned.get(producerId) ?? 0) + 1);
    }

    const owned = this.producerOwned.get(producerId) ?? 0;
    this.producerOwned.set(producerId, owned);
    this.producerMaxSeen.set(producerId, Math.max(this.producerMaxSeen.get(producerId) ?? 0, owned));
    this.evaluateAchievements();

    return purchased;
  }

  buyMaxProducer(producerId: IdleProducerId): number {
    return this.buyProducerBulk(producerId, this.getMaxAffordableProducerCount(producerId));
  }

  canBuyUpgrade(upgradeId: string): boolean {
    const upgrade = this.getUpgrade(upgradeId);
    return (
      !this.upgradesOwned.has(upgrade.id) &&
      this.areRequirementsMet(upgrade.requirements) &&
      this.getResource(upgrade.cost.resourceId).current >= upgrade.cost.amount
    );
  }

  buyUpgrade(upgradeId: string): boolean {
    const upgrade = this.getUpgrade(upgradeId);

    if (!this.canBuyUpgrade(upgrade.id) || !this.spendResource(upgrade.cost.resourceId, upgrade.cost.amount)) {
      return false;
    }

    this.upgradesOwned.add(upgrade.id);
    this.evaluateAchievements();

    return true;
  }

  triggerShiny(shinyId: IdleShinyId): boolean {
    const shiny = this.getShiny(shinyId);

    if (!this.areRequirementsMet(shiny.requirements)) {
      return false;
    }

    this.activeShinies.set(shiny.id, shiny.durationSeconds);
    this.shinySpawnElapsed.set(shiny.id, 0);
    return true;
  }

  clickShiny(shinyId: IdleShinyId): boolean {
    const shiny = this.getShiny(shinyId);

    if (!this.activeShinies.has(shiny.id)) {
      return false;
    }

    this.shinyClicks.set(shiny.id, (this.shinyClicks.get(shiny.id) ?? 0) + 1);
    this.activeShinies.delete(shiny.id);
    this.applyEffects(shiny.effects);
    return true;
  }

  getPrestigePreview(): IdlePrestigePreview | undefined {
    const prestige = this.content.prestige;

    if (!prestige) {
      return undefined;
    }

    const pendingPoints = Math.max(
      0,
      Math.floor(
        this.evaluateNumber(
          prestige.pointsExpression ??
          {
            kind: 'divide',
            left: { kind: 'resourceEarned', resourceId: prestige.pointsPerEarnedResource?.resourceId ?? '' },
            right: prestige.pointsPerEarnedResource?.divisor ?? 1,
          },
        ),
      ),
    );

    return {
      enabled: true,
      name: prestige.name,
      currencyName: prestige.currencyName,
      points: this.prestigePoints,
      totalResets: this.prestigeResets,
      pendingPoints,
      multiplier: this.getPrestigeMultiplier(),
      canPrestige: pendingPoints > 0 && this.areRequirementsMet(prestige.requirements),
      lockedReason: this.getLockedReason(prestige.requirements),
    };
  }

  prestigeReset(): boolean {
    const prestige = this.content.prestige;
    const preview = this.getPrestigePreview();

    if (!prestige || !preview?.canPrestige) {
      return false;
    }

    const preservedAchievements = prestige.preserveAchievements ? new Set(this.achievementsUnlocked) : new Set<string>();
    this.prestigePoints += preview.pendingPoints;
    this.prestigeResets += 1;
    this.resetRunState();
    this.achievementsUnlocked.clear();

    for (const achievementId of preservedAchievements) {
      this.achievementsUnlocked.add(achievementId);
    }

    this.evaluateAchievements();
    return true;
  }

  getResource(resourceId: IdleResourceId): IdleResourceState {
    const resource = this.resources.get(resourceId);

    if (!resource) {
      throw new Error('Unknown idle resource: ' + resourceId);
    }

    return { ...resource };
  }

  getProducerCost(producerId: IdleProducerId): number {
    const producer = this.getProducer(producerId);
    const owned = this.producerOwned.get(producerId) ?? 0;
    return this.getProducerCostAtOwned(producer, owned);
  }

  getProducerBulkCost(producerId: IdleProducerId, count: number): number {
    const producer = this.getProducer(producerId);
    const owned = this.producerOwned.get(producerId) ?? 0;
    const safeCount = Math.max(0, Math.floor(count));
    let total = 0;

    for (let index = 0; index < safeCount; index += 1) {
      total += this.getProducerCostAtOwned(producer, owned + index);
    }

    return total;
  }

  getMaxAffordableProducerCount(producerId: IdleProducerId): number {
    const producer = this.getProducer(producerId);

    if (!this.areRequirementsMet(producer.requirements)) {
      return 0;
    }

    const available = this.getResource(producer.resourceId).current;
    let spent = 0;
    let count = 0;

    while (count < 1000) {
      const nextCost = this.getProducerCostAtOwned(producer, (this.producerOwned.get(producerId) ?? 0) + count);

      if (spent + nextCost > available) {
        break;
      }

      spent += nextCost;
      count += 1;
    }

    return count;
  }

  applyEffects(effects: IdleEffect[]): void {
    for (const effect of effects) {
      if (effect.kind === 'gain') {
        this.gainResource(effect.resourceId, this.evaluateNumber(effect.amount));
      } else if (effect.kind === 'lose') {
        this.spendResource(effect.resourceId, this.evaluateNumber(effect.amount));
      } else if (effect.kind === 'buyProducer') {
        this.buyProducerBulk(effect.producerId, effect.count ?? 1);
      } else {
        this.buyUpgrade(effect.upgradeId);
      }
    }

    this.evaluateAchievements();
  }

  resolveSelector(selector: IdleSelector): string[] {
    const entries = [
      ...this.content.resources.map((entry) => ({ id: entry.id, type: 'resource' as const, tags: entry.tags ?? [], owned: true })),
      ...this.content.actions.map((entry) => ({ id: entry.id, type: 'action' as const, tags: entry.tags ?? [], owned: true })),
      ...this.content.producers.map((entry) => ({
        id: entry.id,
        type: 'producer' as const,
        tags: entry.tags ?? [],
        owned: (this.producerOwned.get(entry.id) ?? 0) > 0,
      })),
      ...this.content.upgrades.map((entry) => ({
        id: entry.id,
        type: 'upgrade' as const,
        tags: entry.tags ?? [],
        owned: this.upgradesOwned.has(entry.id),
      })),
      ...this.content.achievements.map((entry) => ({
        id: entry.id,
        type: 'achievement' as const,
        tags: entry.tags ?? [],
        owned: this.achievementsUnlocked.has(entry.id),
      })),
      ...this.content.shinies.map((entry) => ({
        id: entry.id,
        type: 'shiny' as const,
        tags: entry.tags ?? [],
        owned: this.activeShinies.has(entry.id),
      })),
    ];

    return entries
      .filter((entry) => selector.all || !selector.id || entry.id === selector.id)
      .filter((entry) => !selector.type || entry.type === selector.type)
      .filter((entry) => selector.owned === undefined || entry.owned === selector.owned)
      .filter((entry) => !selector.tags || selector.tags.every((tag) => entry.tags.includes(tag)))
      .map((entry) => entry.id);
  }

  getUiModel(): IdleUiModel {
    return {
      resources: this.content.resources.map((resource) => ({
        id: resource.id,
        name: resource.name,
        ...this.getResource(resource.id),
        perSecond: this.getPerSecond(resource.id),
      })),
      actions: this.content.actions.map((action) => ({
        id: action.id,
        name: action.name,
        gain: this.getActionGain(action),
        clicks: this.actionClicks.get(action.id) ?? 0,
      })),
      producers: this.content.producers.map((producer) => ({
        id: producer.id,
        name: producer.name,
        owned: this.producerOwned.get(producer.id) ?? 0,
        nextCost: this.getProducerCost(producer.id),
        bulk10Cost: this.getProducerBulkCost(producer.id, 10),
        maxAffordable: this.getMaxAffordableProducerCount(producer.id),
        affordable: this.canBuyProducer(producer.id),
        visible: this.areRequirementsMet(producer.requirements),
        lockedReason: this.getLockedReason(producer.requirements),
        productionPerSecond: this.getProducerProduction(producer),
      })),
      upgrades: this.content.upgrades.map((upgrade) => ({
        id: upgrade.id,
        name: upgrade.name,
        description: upgrade.description,
        owned: this.upgradesOwned.has(upgrade.id),
        affordable: this.canBuyUpgrade(upgrade.id),
        visible: this.upgradesOwned.has(upgrade.id) || this.areRequirementsMet(upgrade.requirements),
        lockedReason: this.getLockedReason(upgrade.requirements),
      })),
      achievements: this.content.achievements.map((achievement) => ({
        id: achievement.id,
        name: achievement.name,
        description: achievement.description,
        unlocked: this.achievementsUnlocked.has(achievement.id),
        visible: this.achievementsUnlocked.has(achievement.id) || this.areRequirementsPartlyMet(achievement.requirements),
      })),
      shinies: this.content.shinies.map((shiny) => ({
        id: shiny.id,
        name: shiny.name,
        description: shiny.description,
        active: this.activeShinies.has(shiny.id),
        visible: this.activeShinies.has(shiny.id) || this.areRequirementsMet(shiny.requirements),
        remainingSeconds: this.activeShinies.get(shiny.id) ?? 0,
        clicks: this.shinyClicks.get(shiny.id) ?? 0,
      })),
      prestige: this.getPrestigePreview(),
    };
  }

  toSaveData(now = Date.now()): IdleSaveData {
    this.savedAt = now;

    return {
      schemaVersion: 1,
      savedAt: now,
      resources: Object.fromEntries(this.resources.entries()),
      actions: Object.fromEntries(Array.from(this.actionClicks.entries()).map(([id, clicks]) => [id, { clicks }])),
      producers: Object.fromEntries(
        this.content.producers.map((producer) => [
          producer.id,
          {
            owned: this.producerOwned.get(producer.id) ?? 0,
            maxSeen: this.producerMaxSeen.get(producer.id) ?? 0,
          },
        ]),
      ),
      upgrades: Object.fromEntries(this.content.upgrades.map((upgrade) => [upgrade.id, this.upgradesOwned.has(upgrade.id)])),
      achievements: Object.fromEntries(
        this.content.achievements.map((achievement) => [achievement.id, this.achievementsUnlocked.has(achievement.id)]),
      ),
      shinies: Object.fromEntries(
        this.content.shinies.map((shiny) => [
          shiny.id,
          {
            clicks: this.shinyClicks.get(shiny.id) ?? 0,
            active: this.activeShinies.has(shiny.id),
            remainingSeconds: this.activeShinies.get(shiny.id) ?? 0,
            spawnElapsedSeconds: this.shinySpawnElapsed.get(shiny.id) ?? 0,
          },
        ]),
      ),
      prestige: {
        points: this.prestigePoints,
        totalResets: this.prestigeResets,
      },
    };
  }

  private gainResource(resourceId: IdleResourceId, amount: number): void {
    const resource = this.resources.get(resourceId);

    if (!resource) {
      throw new Error('Unknown idle resource: ' + resourceId);
    }

    resource.current += amount;
    resource.earnedTotal += Math.max(0, amount);
    resource.maxSeen = Math.max(resource.maxSeen, resource.current);
  }

  private spendResource(resourceId: IdleResourceId, amount: number): boolean {
    const resource = this.resources.get(resourceId);

    if (!resource) {
      throw new Error('Unknown idle resource: ' + resourceId);
    }

    if (resource.current < amount) {
      return false;
    }

    resource.current -= amount;
    return true;
  }

  private getPerSecond(resourceId: IdleResourceId): number {
    return this.content.producers
      .filter((producer) => producer.resourceId === resourceId)
      .reduce((total, producer) => total + (this.producerOwned.get(producer.id) ?? 0) * this.getProducerProduction(producer), 0);
  }

  private getProducerCostAtOwned(producer: IdleProducerDefinition, owned: number): number {
    return Math.ceil(producer.baseCost * producer.costScale ** owned);
  }

  private getActionGain(action: IdleActionDefinition): number {
    return action.baseGain * this.getPrestigeMultiplier() * this.content.upgrades.reduce((multiplier, upgrade) => {
      if (!this.upgradesOwned.has(upgrade.id)) {
        return multiplier;
      }

      return upgrade.effects.reduce((current, effect) => {
        return this.effectTargetsAction(effect, action.id) ? current * effect.multiplier : current;
      }, multiplier);
    }, 1);
  }

  private getProducerProduction(producer: IdleProducerDefinition): number {
    return producer.baseProductionPerSecond * this.getPrestigeMultiplier() * this.content.upgrades.reduce((multiplier, upgrade) => {
      if (!this.upgradesOwned.has(upgrade.id)) {
        return multiplier;
      }

      return upgrade.effects.reduce((current, effect) => {
        return this.effectTargetsProducer(effect, producer.id) ? current * effect.multiplier : current;
      }, multiplier);
    }, 1);
  }

  private evaluateAchievements(): void {
    for (const achievement of this.content.achievements) {
      if (!this.achievementsUnlocked.has(achievement.id) && achievement.requirements.every((requirement) => this.meetsRequirement(requirement))) {
        this.achievementsUnlocked.add(achievement.id);
      }
    }
  }

  private meetsRequirement(requirement: IdleRequirement): boolean {
    if (requirement.kind === 'expression') {
      return this.evaluateCondition(requirement.condition);
    }

    if (requirement.kind === 'resourceCurrentAtLeast') {
      return this.getResource(requirement.resourceId).current >= requirement.amount;
    }

    if (requirement.kind === 'resourceEarnedAtLeast') {
      return this.getResource(requirement.resourceId).earnedTotal >= requirement.amount;
    }

    if (requirement.kind === 'producerOwnedAtLeast') {
      return (this.producerOwned.get(requirement.producerId) ?? 0) >= requirement.amount;
    }

    if (requirement.kind === 'actionClicksAtLeast') {
      return (this.actionClicks.get(requirement.actionId) ?? 0) >= requirement.amount;
    }

    return this.upgradesOwned.has(requirement.upgradeId);
  }

  private evaluateNumber(expression: IdleNumberExpression): number {
    if (typeof expression === 'number') {
      return expression;
    }

    if (expression.kind === 'resourceCurrent') return this.getResource(expression.resourceId).current;
    if (expression.kind === 'resourceEarned') return this.getResource(expression.resourceId).earnedTotal;
    if (expression.kind === 'resourceMaxSeen') return this.getResource(expression.resourceId).maxSeen;
    if (expression.kind === 'producerOwned') return this.producerOwned.get(expression.producerId) ?? 0;
    if (expression.kind === 'actionClicks') return this.actionClicks.get(expression.actionId) ?? 0;
    if (expression.kind === 'perSecond') return this.getPerSecond(expression.resourceId);
    if (expression.kind === 'prestigePoints') return this.prestigePoints;
    if (expression.kind === 'add') return expression.values.reduce<number>((total, value) => total + this.evaluateNumber(value), 0);
    if (expression.kind === 'multiply') return expression.values.reduce<number>((total, value) => total * this.evaluateNumber(value), 1);
    if (expression.kind === 'subtract') return this.evaluateNumber(expression.left) - this.evaluateNumber(expression.right);
    if (expression.kind === 'divide') {
      const divisor = this.evaluateNumber(expression.right);
      return divisor === 0 ? 0 : this.evaluateNumber(expression.left) / divisor;
    }
    if (expression.kind === 'floor') return Math.floor(this.evaluateNumber(expression.value));
    if (expression.kind === 'ceil') return Math.ceil(this.evaluateNumber(expression.value));
    if (expression.kind === 'min') return Math.min(...expression.values.map((value) => this.evaluateNumber(value)));

    return Math.max(...expression.values.map((value) => this.evaluateNumber(value)));
  }

  private evaluateCondition(condition: IdleConditionExpression): boolean {
    if (condition.kind === 'gte') return this.evaluateNumber(condition.left) >= this.evaluateNumber(condition.right);
    if (condition.kind === 'lte') return this.evaluateNumber(condition.left) <= this.evaluateNumber(condition.right);
    if (condition.kind === 'eq') return this.evaluateNumber(condition.left) === this.evaluateNumber(condition.right);
    if (condition.kind === 'and') return condition.conditions.every((entry) => this.evaluateCondition(entry));
    if (condition.kind === 'or') return condition.conditions.some((entry) => this.evaluateCondition(entry));

    return !this.evaluateCondition(condition.condition);
  }

  private areRequirementsMet(requirements: IdleRequirement[] | undefined): boolean {
    return !requirements || requirements.every((requirement) => this.meetsRequirement(requirement));
  }

  private areRequirementsPartlyMet(requirements: IdleRequirement[] | undefined): boolean {
    return !requirements || requirements.length === 0 || requirements.some((requirement) => this.meetsRequirement(requirement));
  }

  private getLockedReason(requirements: IdleRequirement[] | undefined): string | undefined {
    const missing = requirements?.find((requirement) => !this.meetsRequirement(requirement));

    if (!missing) {
      return undefined;
    }

    if (missing.kind === 'resourceCurrentAtLeast') {
      return 'Needs ' + missing.amount + ' current ' + missing.resourceId + '.';
    }

    if (missing.kind === 'expression') {
      return 'Needs formula condition.';
    }

    if (missing.kind === 'resourceEarnedAtLeast') {
      return 'Needs ' + missing.amount + ' earned ' + missing.resourceId + '.';
    }

    if (missing.kind === 'producerOwnedAtLeast') {
      return 'Needs ' + missing.amount + ' ' + missing.producerId + ' owned.';
    }

    if (missing.kind === 'actionClicksAtLeast') {
      return 'Needs ' + missing.amount + ' ' + missing.actionId + ' clicks.';
    }

    return 'Needs upgrade ' + missing.upgradeId + '.';
  }

  private effectTargetsAction(effect: IdleUpgradeDefinition['effects'][number], actionId: IdleActionId): boolean {
    if (effect.kind !== 'multiplyActionGain') {
      return false;
    }

    return effect.actionId === actionId || Boolean(effect.selector && this.resolveSelector(effect.selector).includes(actionId));
  }

  private effectTargetsProducer(effect: IdleUpgradeDefinition['effects'][number], producerId: IdleProducerId): boolean {
    if (effect.kind !== 'multiplyProducerOutput') {
      return false;
    }

    return effect.producerId === producerId || Boolean(effect.selector && this.resolveSelector(effect.selector).includes(producerId));
  }

  private getPrestigeMultiplier(): number {
    const prestige = this.content.prestige;
    return prestige ? 1 + this.prestigePoints * prestige.productionMultiplierPerPoint : 1;
  }

  private resetRunState(): void {
    this.resources.clear();
    this.actionClicks.clear();
    this.producerOwned.clear();
    this.producerMaxSeen.clear();
    this.upgradesOwned.clear();
    this.activeShinies.clear();
    this.shinySpawnElapsed.clear();

    for (const resource of this.content.resources) {
      this.resources.set(resource.id, {
        current: resource.startAmount ?? 0,
        earnedTotal: resource.startAmount ?? 0,
        maxSeen: resource.startAmount ?? 0,
      });
    }

    for (const action of this.content.actions) {
      this.actionClicks.set(action.id, 0);
    }

    for (const producer of this.content.producers) {
      this.producerOwned.set(producer.id, 0);
      this.producerMaxSeen.set(producer.id, 0);
    }

    for (const shiny of this.content.shinies) {
      this.shinySpawnElapsed.set(shiny.id, 0);
    }
  }

  private tickShinies(seconds: number): void {
    for (const shiny of this.content.shinies) {
      if (!this.areRequirementsMet(shiny.requirements)) {
        continue;
      }

      const activeRemaining = this.activeShinies.get(shiny.id);

      if (activeRemaining !== undefined) {
        const nextRemaining = activeRemaining - seconds;

        if (nextRemaining > 0) {
          this.activeShinies.set(shiny.id, nextRemaining);
        } else {
          this.activeShinies.delete(shiny.id);
        }

        continue;
      }

      const elapsed = (this.shinySpawnElapsed.get(shiny.id) ?? 0) + seconds;

      if (elapsed >= shiny.spawnEverySeconds) {
        this.triggerShiny(shiny.id);
      } else {
        this.shinySpawnElapsed.set(shiny.id, elapsed);
      }
    }
  }

  private getAction(actionId: IdleActionId): IdleActionDefinition {
    const action = this.content.actions.find((entry) => entry.id === actionId);

    if (!action) {
      throw new Error('Unknown idle action: ' + actionId);
    }

    return action;
  }

  private getProducer(producerId: IdleProducerId): IdleProducerDefinition {
    const producer = this.content.producers.find((entry) => entry.id === producerId);

    if (!producer) {
      throw new Error('Unknown idle producer: ' + producerId);
    }

    return producer;
  }

  private getUpgrade(upgradeId: string): IdleUpgradeDefinition {
    const upgrade = this.content.upgrades.find((entry) => entry.id === upgradeId);

    if (!upgrade) {
      throw new Error('Unknown idle upgrade: ' + upgradeId);
    }

    return upgrade;
  }

  private getShiny(shinyId: IdleShinyId) {
    const shiny = this.content.shinies.find((entry) => entry.id === shinyId);

    if (!shiny) {
      throw new Error('Unknown idle shiny: ' + shinyId);
    }

    return shiny;
  }

  private validateContent(): void {
    const ids = new Set<string>();
    const addId = (id: string): void => {
      if (ids.has(id)) {
        throw new Error('Duplicate idle content id: ' + id);
      }

      ids.add(id);
    };

    this.content.resources.forEach((entry) => addId(entry.id));
    this.content.actions.forEach((entry) => addId(entry.id));
    this.content.producers.forEach((entry) => addId(entry.id));
    this.content.upgrades.forEach((entry) => addId(entry.id));
    this.content.achievements.forEach((entry) => addId(entry.id));
    this.content.shinies.forEach((entry) => addId(entry.id));
  }
}
`;

const idleContentSource = `import type { IdleContent } from '../game/idle/idleTypes';

export const idleContent: IdleContent = {
  offlineCapSeconds: 60 * 60 * 2,
  resources: [
    {
      id: 'cookies',
      name: 'Cookies',
      tags: ['currency', 'bakery'],
      startAmount: 0,
    },
  ],
  actions: [
    {
      id: 'bakeCookie',
      name: 'Bake cookie',
      tags: ['active', 'bakery'],
      resourceId: 'cookies',
      baseGain: 1,
    },
  ],
  producers: [
    {
      id: 'oven',
      name: 'Oven',
      tags: ['producer', 'bakery'],
      resourceId: 'cookies',
      baseCost: 10,
      costScale: 1.15,
      baseProductionPerSecond: 0.2,
    },
  ],
  upgrades: [
    {
      id: 'betterHands',
      name: 'Better hands',
      tags: ['manual', 'bakery'],
      description: 'Doubles manual baking.',
      cost: { resourceId: 'cookies', amount: 25 },
      effects: [{ kind: 'multiplyActionGain', actionId: 'bakeCookie', multiplier: 2 }],
    },
    {
      id: 'hotterOvens',
      name: 'Hotter ovens',
      tags: ['producer', 'bakery'],
      description: 'Doubles oven output.',
      requirements: [{ kind: 'producerOwnedAtLeast', producerId: 'oven', amount: 1 }],
      cost: { resourceId: 'cookies', amount: 60 },
      effects: [{ kind: 'multiplyProducerOutput', producerId: 'oven', multiplier: 2 }],
    },
    {
      id: 'bakerySystems',
      name: 'Bakery systems',
      tags: ['producer', 'bakery', 'automation'],
      description: 'Doubles every bakery producer through a selector-based effect.',
      requirements: [{ kind: 'producerOwnedAtLeast', producerId: 'oven', amount: 3 }],
      cost: { resourceId: 'cookies', amount: 120 },
      effects: [
        {
          kind: 'multiplyProducerOutput',
          selector: { type: 'producer', tags: ['bakery'] },
          multiplier: 2,
        },
      ],
    },
  ],
  achievements: [
    {
      id: 'firstBake',
      name: 'First bake',
      tags: ['starter'],
      description: 'Bake your first cookie.',
      requirements: [{ kind: 'actionClicksAtLeast', actionId: 'bakeCookie', amount: 1 }],
    },
    {
      id: 'hundredCookies',
      name: 'Hundred cookies',
      tags: ['milestone'],
      description: 'Earn 100 cookies total.',
      requirements: [{ kind: 'resourceEarnedAtLeast', resourceId: 'cookies', amount: 100 }],
    },
    {
      id: 'tenOvens',
      name: 'Warm kitchen',
      tags: ['milestone', 'producer'],
      description: 'Own 10 ovens.',
      requirements: [{ kind: 'producerOwnedAtLeast', producerId: 'oven', amount: 10 }],
    },
  ],
  shinies: [
    {
      id: 'goldenCookie',
      name: 'Golden cookie',
      tags: ['bonus', 'bakery'],
      description: 'A temporary bonus. Click it before it fades to gain a cookie burst.',
      requirements: [{ kind: 'producerOwnedAtLeast', producerId: 'oven', amount: 1 }],
      spawnEverySeconds: 20,
      durationSeconds: 7,
      effects: [{ kind: 'gain', resourceId: 'cookies', amount: 25 }],
    },
  ],
  prestige: {
    id: 'bakeryLegacy',
    name: 'Bakery legacy',
    currencyName: 'Legacy crumbs',
    requirements: [{ kind: 'resourceEarnedAtLeast', resourceId: 'cookies', amount: 250 }],
    pointsExpression: {
      kind: 'floor',
      value: {
        kind: 'divide',
        left: { kind: 'resourceEarned', resourceId: 'cookies' },
        right: 250,
      },
    },
    productionMultiplierPerPoint: 0.1,
    preserveAchievements: true,
  },
};
`;

const idleEconomyTestSource = `import { describe, expect, it } from 'vitest';
import { idleContent } from '../../src/data/idleContent';
import { IdleEconomy } from '../../src/game/idle/IdleEconomy';

describe('IdleEconomy', () => {
  it('gains resources from active actions and unlocks achievements', () => {
    const economy = new IdleEconomy(idleContent);

    economy.clickAction('bakeCookie');

    expect(economy.getResource('cookies').current).toBe(1);
    expect(economy.getUiModel().achievements.find((entry) => entry.id === 'firstBake')?.unlocked).toBe(true);
  });

  it('buys producers and applies passive production over time', () => {
    const economy = new IdleEconomy(idleContent);

    for (let i = 0; i < 10; i += 1) {
      economy.clickAction('bakeCookie');
    }

    expect(economy.buyProducer('oven')).toBe(true);
    economy.tick(10);

    expect(economy.getResource('cookies').current).toBeCloseTo(2);
    expect(economy.getUiModel().resources.find((entry) => entry.id === 'cookies')?.perSecond).toBeCloseTo(0.2);
  });

  it('calculates and buys producer batches deterministically', () => {
    const economy = new IdleEconomy(idleContent);

    for (let i = 0; i < 120; i += 1) {
      economy.clickAction('bakeCookie');
    }

    expect(economy.getProducerBulkCost('oven', 3)).toBe(36);
    expect(economy.buyProducerBulk('oven', 3)).toBe(3);

    const oven = economy.getUiModel().producers.find((entry) => entry.id === 'oven');
    expect(oven?.owned).toBe(3);
    expect(oven?.nextCost).toBe(16);
    expect(oven?.maxAffordable).toBeGreaterThan(0);
  });

  it('supports typed effects and selectors for future content rules', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 25 }]);
    expect(economy.buyUpgrade('betterHands')).toBe(true);
    expect(economy.resolveSelector({ type: 'upgrade', owned: true })).toEqual(['betterHands']);
    expect(economy.resolveSelector({ type: 'producer', tags: ['bakery'] })).toEqual(['oven']);
  });

  it('gates upgrades behind requirements and exposes locked reasons', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 200 }]);

    expect(economy.buyUpgrade('hotterOvens')).toBe(false);
    expect(economy.getUiModel().upgrades.find((entry) => entry.id === 'hotterOvens')?.lockedReason).toContain('oven');

    economy.buyProducer('oven');

    expect(economy.buyUpgrade('hotterOvens')).toBe(true);
  });

  it('applies selector-based producer modifiers', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 300 }]);
    economy.buyProducerBulk('oven', 3);

    expect(economy.buyUpgrade('bakerySystems')).toBe(true);

    const oven = economy.getUiModel().producers.find((entry) => entry.id === 'oven');
    expect(oven?.productionPerSecond).toBeCloseTo(0.4);
  });

  it('spawns and clicks temporary shiny bonuses', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 10 }]);
    economy.buyProducer('oven');
    economy.tick(20);

    expect(economy.getUiModel().shinies.find((entry) => entry.id === 'goldenCookie')?.active).toBe(true);
    expect(economy.clickShiny('goldenCookie')).toBe(true);
    expect(economy.getResource('cookies').current).toBeCloseTo(29);
    expect(economy.getUiModel().shinies.find((entry) => entry.id === 'goldenCookie')?.clicks).toBe(1);
  });

  it('expires unclicked shiny bonuses and saves shiny state', () => {
    const economy = new IdleEconomy(idleContent, undefined, 1000);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 10 }]);
    economy.buyProducer('oven');
    economy.triggerShiny('goldenCookie');
    economy.tick(8);

    expect(economy.getUiModel().shinies.find((entry) => entry.id === 'goldenCookie')?.active).toBe(false);

    economy.triggerShiny('goldenCookie');
    const restored = new IdleEconomy(idleContent, economy.toSaveData(2000), 3000);

    expect(restored.getUiModel().shinies.find((entry) => entry.id === 'goldenCookie')?.active).toBe(true);
  });

  it('previews and performs prestige resets while preserving meta progress', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 260 }]);

    expect(economy.getUiModel().prestige?.pendingPoints).toBe(1);
    expect(economy.prestigeReset()).toBe(true);

    const ui = economy.getUiModel();
    expect(ui.prestige?.points).toBe(1);
    expect(ui.prestige?.totalResets).toBe(1);
    expect(economy.getResource('cookies').current).toBe(0);
    expect(ui.actions.find((entry) => entry.id === 'bakeCookie')?.gain).toBeCloseTo(1.1);
  });

  it('round-trips prestige state through saves', () => {
    const economy = new IdleEconomy(idleContent, undefined, 1000);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 260 }]);
    economy.prestigeReset();

    const restored = new IdleEconomy(idleContent, economy.toSaveData(2000), 3000);

    expect(restored.getUiModel().prestige?.points).toBe(1);
    expect(restored.getUiModel().prestige?.multiplier).toBeCloseTo(1.1);
  });

  it('applies upgrade multipliers', () => {
    const economy = new IdleEconomy(idleContent);

    for (let i = 0; i < 25; i += 1) {
      economy.clickAction('bakeCookie');
    }

    expect(economy.buyUpgrade('betterHands')).toBe(true);
    economy.clickAction('bakeCookie');

    expect(economy.getResource('cookies').current).toBe(2);
  });

  it('caps offline progress', () => {
    const economy = new IdleEconomy(idleContent, undefined, 0);

    for (let i = 0; i < 10; i += 1) {
      economy.clickAction('bakeCookie');
    }

    economy.buyProducer('oven');
    const report = economy.applyOfflineProgress(60 * 60 * 6 * 1000);

    expect(report.elapsedSeconds).toBe(60 * 60 * 6);
    expect(report.simulatedSeconds).toBe(idleContent.offlineCapSeconds);
    expect(report.capReached).toBe(true);
    expect(report.resourceGains.cookies).toBeCloseTo(idleContent.offlineCapSeconds * 0.2);
    expect(report.unlockedAchievementIds).toContain('hundredCookies');
    expect(economy.getResource('cookies').current).toBeCloseTo(idleContent.offlineCapSeconds * 0.2);
  });

  it('round-trips save data', () => {
    const economy = new IdleEconomy(idleContent, undefined, 1000);

    economy.clickAction('bakeCookie');
    const save = economy.toSaveData(2000);
    const restored = new IdleEconomy(idleContent, save, 3000);

    expect(restored.getResource('cookies').current).toBe(1);
    expect(restored.toSaveData().actions.bakeCookie.clicks).toBe(1);
  });
});
`;

const idleFormulaExamplesTestSource = `import { describe, expect, it } from 'vitest';
import { idleContent } from '../../src/data/idleContent';
import { IdleEconomy } from '../../src/game/idle/IdleEconomy';

describe('Idle formula examples', () => {
  it('documents producer cost scaling with ceil-per-purchase rounding', () => {
    const baseCost = 10;
    const costScale = 1.15;

    expect(Math.ceil(baseCost * costScale ** 0)).toBe(10);
    expect(Math.ceil(baseCost * costScale ** 1)).toBe(12);
    expect(Math.ceil(baseCost * costScale ** 2)).toBe(14);
  });

  it('documents bulk cost as the sum of rounded individual purchases', () => {
    const economy = new IdleEconomy(idleContent);

    expect(economy.getProducerBulkCost('oven', 3)).toBe(10 + 12 + 14);
  });

  it('documents production as owned count times output times multipliers', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 100 }]);
    economy.buyProducerBulk('oven', 2);

    expect(economy.getUiModel().resources.find((entry) => entry.id === 'cookies')?.perSecond).toBeCloseTo(0.4);
  });

  it('documents offline cap math', () => {
    const economy = new IdleEconomy(idleContent, undefined, 0);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 10 }]);
    economy.buyProducer('oven');
    const report = economy.applyOfflineProgress(6 * 60 * 60 * 1000);

    expect(report.elapsedSeconds).toBe(6 * 60 * 60);
    expect(report.simulatedSeconds).toBe(idleContent.offlineCapSeconds);
    expect(report.capReached).toBe(true);
  });

  it('documents prestige multiplier math', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 250 }]);
    economy.prestigeReset();

    expect(economy.getUiModel().prestige?.multiplier).toBeCloseTo(1.1);
    expect(economy.getUiModel().actions.find((entry) => entry.id === 'bakeCookie')?.gain).toBeCloseTo(1.1);
  });

  it('documents typed number expressions in effects', () => {
    const economy = new IdleEconomy(idleContent);

    economy.applyEffects([
      {
        kind: 'gain',
        resourceId: 'cookies',
        amount: {
          kind: 'multiply',
          values: [2, { kind: 'resourceEarned', resourceId: 'cookies' }],
        },
      },
    ]);
    expect(economy.getResource('cookies').current).toBe(0);

    economy.clickAction('bakeCookie');
    economy.applyEffects([
      {
        kind: 'gain',
        resourceId: 'cookies',
        amount: {
          kind: 'multiply',
          values: [2, { kind: 'resourceEarned', resourceId: 'cookies' }],
        },
      },
    ]);

    expect(economy.getResource('cookies').current).toBe(3);
  });

  it('documents typed condition expressions in requirements', () => {
    const economy = new IdleEconomy({
      ...idleContent,
      upgrades: [
        ...idleContent.upgrades,
        {
          id: 'formulaGate',
          name: 'Formula gate',
          description: 'Unlocks from a typed condition expression.',
          cost: { resourceId: 'cookies', amount: 1 },
          requirements: [
            {
              kind: 'expression',
              condition: {
                kind: 'gte',
                left: { kind: 'resourceEarned', resourceId: 'cookies' },
                right: 5,
              },
            },
          ],
          effects: [{ kind: 'multiplyActionGain', actionId: 'bakeCookie', multiplier: 2 }],
        },
      ],
    });

    economy.applyEffects([{ kind: 'gain', resourceId: 'cookies', amount: 5 }]);

    expect(economy.buyUpgrade('formulaGate')).toBe(true);
  });
});
`;
