const MS_MODULE_ID = "swade-minimum-strength-automation";

function refreshWorldActors() {
  for (const actor of game.actors ?? []) {
    actor.reset();
    actor.prepareData();
    actor.render?.(false);
  }
}

Hooks.once("init", () => {
  /*
   * Keep the RAW options together and ordered by equipment category.
   * The optional melee/thrown attack penalty is registered last so it
   * can be visually separated as a project house rule in Settings.
   */
  game.settings.register(MS_MODULE_ID, "enforceMeleeThrownMinStrRestrictions", {
    name: "Enforce Melee & Thrown Weapon Minimum Strength Restrictions",
    hint: "Partially automates the SWADE rule that a wielder below a readied melee/thrown weapon's Minimum Strength loses its positive abilities. Currently suppresses positive weapon Parry bonuses and weapon AP. Reach, Notes-based abilities, and custom properties remain manual.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: refreshWorldActors
  });

  game.settings.register(MS_MODULE_ID, "enforceStrengthDamageLimit", {
    name: "Enforce Strength-Limited Weapon Damage",
    hint: "Enforces the SWADE rule that a Strength-based weapon's base damage die cannot exceed the wielder's actual Strength die. This affects damage only and does not enforce other Minimum Strength penalties.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MS_MODULE_ID, "enforceRangedMinStrPenalties", {
    name: "Enforce Ranged Weapon Minimum Strength Penalties",
    hint: "Applies a -1 attack penalty for each die step the wielder is below a ranged weapon's Minimum Strength. Melee and thrown weapons are excluded.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MS_MODULE_ID, "enforceArmorMinStrPenalties", {
    name: "Enforce Armor Minimum Strength Penalties",
    hint: "Applies the SWADE Minimum Strength penalties from equipped armor: -1 Pace, Agility, and Agility-linked skill rolls for each die step the wearer is below an item's Minimum Strength. Penalties from multiple armor items are cumulative.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: refreshWorldActors
  });

  game.settings.register(MS_MODULE_ID, "enforceMeleeThrownMinStrPenalties", {
    name: "Enforce Melee & Thrown Weapon Minimum Strength Penalties",
    hint: "HOUSE RULE: Applies the optional project rule that melee and thrown weapon attacks suffer -1 for each die step the wielder is below the weapon's Minimum Strength. This is not the normal SWADE melee/thrown Minimum Strength rule.",
    scope: "world",
    config: true,
    type: Boolean,
    default: false
  });

  game.settings.register(MS_MODULE_ID, "welcomeMessageVersion", {
    scope: "world",
    config: false,
    type: Number,
    default: 0
  });
});

/*
 * Foundry's setting registration API does not provide section headers.
 * Add a presentation-only divider immediately before the house-rule
 * setting. This does not alter the setting itself or its stored value.
 */
Hooks.on("renderSettingsConfig", (app, html) => {
  const root = html instanceof HTMLElement ? html : html?.[0];
  if (!root) return;

  const houseRuleInput = root.querySelector(
    `[name="${MS_MODULE_ID}.enforceMeleeThrownMinStrPenalties"]`
  );
  const houseRuleRow = houseRuleInput?.closest(".form-group");
  if (!houseRuleRow || root.querySelector(".swade-min-str-house-rule-divider")) {
    return;
  }

  const divider = document.createElement("div");
  divider.className = "swade-min-str-house-rule-divider";
  divider.innerHTML = `
    <hr>
    <p style="margin: 0.5rem 0; font-weight: 600;">
      House Rule
    </p>
    <p class="hint" style="margin-bottom: 0.75rem;">
      The option below is an optional house rule and is not part of the normal SWADE Minimum Strength rules.
    </p>
  `;

  houseRuleRow.before(divider);
});
