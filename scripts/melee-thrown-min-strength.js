import {
  MS_MODULE_ID,
  getMinimumStrengthShortfall
} from "./helpers/minimum-strength.js";

Hooks.on(
  "swadeCalculateDefaultAttackMods",
  (
    sourceToken,
    targetToken,
    skill,
    item,
    isRangedAttack,
    isMeleeAttack,
    additionalMods,
    bestNonStackingMods
  ) => {
    if (!game.settings.get(MS_MODULE_ID, "enforceMeleeThrownMinStrPenalties")) return;
    if (!item || item.type !== "weapon") return;
    if (!item.system?.isMelee || (!isMeleeAttack && !isRangedAttack)) return;

    const actor = item.actor ?? sourceToken?.actor;
    if (!actor) return;

    const shortfall = getMinimumStrengthShortfall(actor, item);
    if (shortfall <= 0) return;

    additionalMods.push({
      label: "Minimum Strength (Weapon)",
      value: -shortfall
    });
  }
);
