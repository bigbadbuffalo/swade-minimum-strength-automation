export const MS_MODULE_ID = "swade-minimum-strength-automation";

export function traitDieToSteps(die) {
  if (!die) return null;

  const sides = Number(die.sides);
  const modifier = Number(die.modifier ?? 0);

  if (!Number.isFinite(sides)) return null;

  return ((sides - 4) / 2) + modifier;
}

export function minimumStrengthToSteps(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "object") {
    const sides = Number(value.sides ?? value.die ?? value.value);
    const modifier = Number(value.modifier ?? value.mod ?? 0);

    if (!Number.isFinite(sides)) return null;

    return traitDieToSteps({ sides, modifier });
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;
    return traitDieToSteps({ sides: value, modifier: 0 });
  }

  const text = String(value).trim().toLowerCase();

  if (!text || text === "na" || text === "n/a" || text === "-") {
    return null;
  }

  const match = text.match(/^d?(\d+)(?:\s*([+-])\s*(\d+))?$/);
  if (!match) return null;

  const sides = Number(match[1]);
  let modifier = 0;

  if (match[2] && match[3]) {
    modifier = Number(match[3]);
    if (match[2] === "-") modifier *= -1;
  }

  return traitDieToSteps({ sides, modifier });
}

export function getActualStrengthSteps(actor) {
  const die = actor?.system?.attributes?.strength?.die;
  return traitDieToSteps(die);
}

export function getMinimumStrengthBonus(actor) {
  const value = Number(
    actor?.getFlag(MS_MODULE_ID, "minStrBonus") ?? 0
  );

  return Number.isFinite(value) ? value : 0;
}

export function getEffectiveMinimumStrengthSteps(actor) {
  const actual = getActualStrengthSteps(actor);
  if (actual === null) return null;
  return actual + getMinimumStrengthBonus(actor);
}

export function getItemMinimumStrengthSteps(item) {
  if (!item) return null;
  return minimumStrengthToSteps(item.system?.minStr);
}

export function getMinimumStrengthShortfall(actor, item) {
  const effectiveStrength = getEffectiveMinimumStrengthSteps(actor);
  const minimumStrength = getItemMinimumStrengthSteps(item);

  if (effectiveStrength === null || minimumStrength === null) return 0;

  return Math.max(0, minimumStrength - effectiveStrength);
}
