const MS_MODULE_ID = "swade-minimum-strength-automation";
const SETTING = "enforceStrengthDamageLimit";

Hooks.on("swadeRollDamage", (actor, item, roll, modifiers, options) => {
  if (!game.settings.get(MS_MODULE_ID, SETTING)) return;
  if (!actor || !item || !roll) return;

  const damageFormula = String(
    options?.dmgOverride ??
    item.system?.damage ??
    ""
  );

  if (!/@(?:str|strength)\b/i.test(damageFormula)) return;

  const strengthSides = Number(
    actor.system?.attributes?.strength?.die?.sides
  );

  if (!Number.isFinite(strengthSides) || strengthSides < 1) return;

  const Die = foundry.dice.terms.Die;
  const baseDamageLabel = game.i18n.localize("SWADE.BaseDamage");

  const weaponDamageDie = roll.dice.find(
    term => term instanceof Die && term.flavor === baseDamageLabel
  );

  if (!weaponDamageDie) return;

  const weaponFaces = Number(weaponDamageDie.faces);
  if (!Number.isFinite(weaponFaces) || weaponFaces <= strengthSides) return;

  weaponDamageDie.faces = strengthSides;
  roll.resetFormula();
});
