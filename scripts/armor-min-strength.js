import {
  MS_MODULE_ID,
  getMinimumStrengthShortfall
} from "./helpers/minimum-strength.js";

const EQUIPPED = 3;

function getEquippedArmor(actor) {
  if (!actor?.items) return [];

  return actor.items.filter(
    item =>
      item.type === "armor" &&
      Number(item.system?.equipStatus ?? 0) >= EQUIPPED
  );
}

function getArmorMinimumStrengthPenalty(actor) {
  let penalty = 0;
  for (const armor of getEquippedArmor(actor)) {
    penalty += getMinimumStrengthShortfall(actor, armor);
  }
  return penalty;
}

Hooks.on("swadePreRollAttribute", (actor, attribute, roll, modifiers) => {
  if (!game.settings.get(MS_MODULE_ID, "enforceArmorMinStrPenalties")) return;
  if (attribute !== "agility") return;

  const penalty = getArmorMinimumStrengthPenalty(actor);
  if (penalty <= 0) return;

  modifiers.push({
    label: "Minimum Strength (Armor)",
    value: -penalty
  });
});

Hooks.on("swadePreRollSkill", (actor, skill, roll, modifiers) => {
  if (!game.settings.get(MS_MODULE_ID, "enforceArmorMinStrPenalties")) return;
  if (skill?.system?.attribute !== "agility") return;

  const penalty = getArmorMinimumStrengthPenalty(actor);
  if (penalty <= 0) return;

  modifiers.push({
    label: "Minimum Strength (Armor)",
    value: -penalty
  });
});

Hooks.on("swadeActorPrepareDerivedData", actor => {
  if (!game.settings.get(MS_MODULE_ID, "enforceArmorMinStrPenalties")) return;

  const penalty = getArmorMinimumStrengthPenalty(actor);
  if (penalty <= 0) return;

  const pace = actor.system?.pace;
  if (!pace) return;

  for (const key of ["ground", "fly", "swim", "burrow"]) {
    const current = Number(pace[key]);
    if (!Number.isFinite(current)) continue;
    pace[key] = Math.max(1, current - penalty);
  }
});
