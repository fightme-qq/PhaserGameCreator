# Idle Skills Implementation Plan

This plan upgrades the optional Idle / Incremental Game Pack with stronger skill guidance, formula references, and implementation checks.

## Goals

- Make the generated idle skills useful for real idle, clicker, incremental, factory, tycoon, RPG-idle, and automation games.
- Keep each `SKILL.md` concise and procedural, following the local `skill-creator` guidance.
- Move heavier math, source notes, and examples into `references/` files so Codex loads them only when needed.
- Preserve the current architecture: deterministic idle logic in `src/game/idle/`, content in `src/data/idleContent.ts`, Phaser scenes as UI/input only.

## Source Base

Use these as the main research backbone:

- The Math of Idle Games, Part I: https://www.gamedeveloper.com/design/the-math-of-idle-games-part-i
- The Math of Idle Games, Part III: https://www.gamedeveloper.com/design/the-math-of-idle-games-part-iii
- Quest for Progress - The Math and Design of Idle Games: https://media.gdcvault.com/gdceurope2016/presentations/Pecorella_Anthony_Quest%20for%20Progress.pdf
- Numbers Getting Bigger: https://code.tutsplus.com/numbers-getting-bigger-the-design-and-math-of-incremental-games--cms-24023a
- Idle Game Maker handbook: https://orteil.dashnet.org/igm/help.html
- Idle Game Maker old docs: https://orteil.dashnet.org/experiments/idlegamemaker/help
- Bunny Clicker source: https://orteil.dashnet.org/igm/games/bunnyclicker.txt
- Incremental scaling discussion: https://www.reddit.com/r/incremental_games/comments/dps22f/how_should_i_scale_purchases_in_an_incremental/
- Idle Idol balancing notes: https://www.gamedeveloper.com/design/balancing-tips-how-we-managed-math-on-idle-idol

## Skill-Creator Rules For This Work

- Keep `SKILL.md` files short: trigger, workflow, rules, validation.
- Put large formula catalogs and examples in `references/`.
- Avoid copying long source text; summarize and cite.
- Prefer checklists and small examples over long explanations.
- Keep degrees of freedom intentional:
  - High freedom for game loop design and content themes.
  - Medium freedom for balancing workflow and formula selection.
  - Low freedom for save rules, bulk-buy math, offline caps, and tests.

## Target Files

- `src/template/idleGamePack.ts`
- `src/template/phaserSource.ts`
- `scripts/validate-generated.ts`
- generated files under:
  - `skills/phaser-idle-game-architect/`
  - `skills/phaser-idle-economy-balancer/`
  - `skills/phaser-idle-ui-feedback/`
  - `skills/phaser-idle-offline-prestige/`
  - `docs/IDLE_GAME_DESIGN.md`
  - `docs/IDLE_BALANCE_CHECKLIST.md`
  - `tests/unit/IdleEconomy.test.ts`
  - `tests/unit/IdleFormulaExamples.test.ts`

## Implementation Steps

1. [x] Upgrade `phaser-idle-game-architect`.
   - Add a clearer content model from Idle Game Maker: resources, clickables/actions, producers/buildings, upgrades, achievements, shinies, effects, selectors, layout.
   - Add save-ID rules: never rename IDs after saves exist; derived values such as current price should not be stored.
   - Keep the main skill short and point to `references/igm-handbook-derived-model.md`.

2. [x] Upgrade `phaser-idle-economy-balancer`.
   - Add references for cost curves, production curves, multipliers, bulk-buy, max-affordable, and simulation timelines.
   - Include formula choices:
     - `nextCost = ceil(baseCost * costScale ** owned)`
     - `production = owned * baseProduction * multipliers`
     - geometric bulk cost as an optional optimized path
     - sum-of-rounded-costs as the default deterministic path
   - Add decision rules for `costScale` ranges, when formulas are good, and when handcrafted milestone costs are better.

3. [x] Add or expand `idle-bulk-buy-and-simulation.md`.
   - Document per-purchase rounding versus geometric-series shortcuts.
   - Require tests for buy 1, buy 10, buy max, insufficient currency, and changed cost curves.
   - Add simulation bands: 10 seconds, 1 minute, 5 minutes, 30 minutes, 2 hours, next day.

4. [x] Add or expand `idle-prestige-and-offline.md`.
   - Cover prestige from lifetime currency versus max-run currency.
   - Include starter formulas:
     - `pending = floor(totalEarned / divisor)`
     - `pending = floor(k * sqrt(lifetimeCurrency / scale))`
     - `pending = floor(k * (lifetimeCurrency / scale) ** exponent)`
   - Explain when to use `sqrt`, fractional exponent, or `log`.
   - Keep offline progress capped, deterministic, migrated before simulation, and summarized in UI.

5. [x] Add `idle-big-numbers-and-notation.md`.
   - Define when JavaScript `number` is enough for starter projects.
   - Document future upgrade path to mantissa/exponent or a decimal/big-number library.
   - Add display rules for `K/M/B/T`, scientific notation, rounding, and stable save serialization.

6. [x] Strengthen generated docs.
   - `docs/IDLE_GAME_DESIGN.md`: mention formula source references and content layers.
   - `docs/IDLE_BALANCE_CHECKLIST.md`: add formula selection, big-number strategy, prestige target, and simulation table checks.

7. [x] Strengthen generated tests.
   - Keep existing tests for action gain, producer buying, production, upgrades, achievements, offline cap, save/load, shinies, and prestige.
   - Add tests for max-affordable edge cases and no-save of derived prices if implementation changes.
   - Add formula examples for geometric bulk cost only if runtime uses or exposes that path.

8. [~] Validate generated project output.
   - Run `npm run validate:generated` if available.
   - Run `npm run test`.
   - Run `npm run build`.
   - If Phaser idle scene changes visually, run local preview/smoke checks.

## Progress Notes

- Step 1 completed in `src/template/idleGamePack.ts`: architect skill now covers content model, save contracts, stable IDs, and derived-value rules.
- Step 2 completed in `src/template/idleGamePack.ts`: economy balancer now reads formula, workflow, bulk-buy, simulation, and big-number references.
- Step 3 completed in `src/template/idleGamePack.ts`: added `idle-bulk-buy-and-simulation.md`.
- Step 4 completed in `src/template/idleGamePack.ts`: added `idle-prestige-and-offline.md`.
- Step 5 completed in `src/template/idleGamePack.ts`: added `idle-big-numbers-and-notation.md`.
- Step 6 completed in `src/template/idleGamePack.ts`: generated idle docs now include reference map, skill hygiene, and stronger checklist items.
- Step 7 completed in `src/template/idleGamePack.ts`: generated idle tests now cover max-buy alignment, no derived values in saves, and compact notation examples.
- `scripts/validate-generated.ts` now checks every new generated reference file.
- Latest completed verification: `npm run build` and `npm run validate:generated` both passed after step 7.
- Final verification note: `npm run build` passed after the tracker update. A final `npm run validate:generated` rerun could not be completed because process execution in the shell began returning a system exit code before producing output; use the previous full green validation as the latest complete generated-project signal.

## Acceptance Criteria

- Idle pack still generates without changing the non-idle starter.
- Generated `SKILL.md` files stay short and actionable.
- Heavy research and formula material lives in reference markdown.
- Idle economy runtime remains deterministic and unit-tested.
- Skills guide Codex to simulate before tuning numbers.
- Prestige guidance includes both simple starter math and scalable formulas.
- Big-number limitations are explicit before users hit runaway values.

## Notes For Later Implementation

- Do not paste long copyrighted source excerpts into generated files.
- Keep source URLs in references as citations and summarize in our own words.
- If adding new generated reference files, update `scripts/validate-generated.ts`.
- If adding new runtime formula modes, update `IdleContent` types, `IdleEconomy`, and tests together.
