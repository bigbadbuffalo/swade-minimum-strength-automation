import {
  MS_MODULE_ID,
  getMinimumStrengthShortfall
} from "./helpers/minimum-strength.js";

const SETTING = "enforceMeleeThrownMinStrRestrictions";
const READIED_WEAPON_STATES = new Set([2, 3, 4, 5]);

function shouldRestrictWeapon(actor, item) {
  const equipStatus = Number(item?.system?.equipStatus ?? 0);

  return Boolean(
    actor &&
    item?.type === "weapon" &&
    item.system?.isMelee &&
    READIED_WEAPON_STATES.has(equipStatus) &&
    getMinimumStrengthShortfall(actor, item) > 0
  );
}

Hooks.on("swadeActorPrepareDerivedData", actor => {
  if (!game.settings.get(MS_MODULE_ID, SETTING)) return;

  for (const item of actor.items ?? []) {
    if (!shouldRestrictWeapon(actor, item)) continue;

    const weaponParry = Number(item.system?.parry ?? 0);
    if (Number.isFinite(weaponParry) && weaponParry > 0) {
      item.system.parry = 0;
    }

    const weaponAp = Number(item.system?.ap ?? 0);
    if (Number.isFinite(weaponAp) && weaponAp > 0) {
      item.system.ap = 0;
    }
  }
});
