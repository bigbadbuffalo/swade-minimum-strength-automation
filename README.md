# SWADE Minimum Strength Automation

A Foundry VTT module for **Savage Worlds Adventure Edition (SWADE)** that automates selected Minimum Strength rules and related house-rule options.

## Compatibility

Currently developed and tested with:

- **Foundry Virtual Tabletop:** Version 14
- **Savage Worlds Adventure Edition:** Version 6.0.4

Earlier versions are not currently supported or tested.

# World Settings

All automation is optional and disabled by default.

## Enforce Strength-Limited Weapon Damage

Enforces the SWADE rule that a Strength-based melee or thrown weapon's base damage die cannot exceed the wielder's **actual Strength die**.

Examples:

```text
Strength d4 + Str+d8 weapon → d4+d4
Strength d6 + Str+d10+2 weapon → d6+d6+2
```

This affects only the weapon's base damage die. Raise damage, Conviction, other bonus dice, and fixed-damage weapons are unaffected.

## Enforce Armor Minimum Strength Penalties

When enabled, equipped armor applies the normal Minimum Strength penalties for each die step the wearer is below the item's Minimum Strength:

- −1 Pace
- −1 Agility
- −1 to Agility-linked skill rolls

Penalties from multiple equipped armor items are cumulative. Pace cannot be reduced below 1.

Armor-derived roll penalties are labeled **Minimum Strength (Armor)**.

## Enforce Ranged Weapon Minimum Strength Penalties

When enabled, attacks with pure ranged weapons suffer **−1 per die step** the wielder is below the weapon's Minimum Strength.

Melee and thrown weapons are excluded. Weapon-derived roll penalties are labeled **Minimum Strength (Weapon)**.

## Enforce Melee & Thrown Weapon Minimum Strength Penalties

When enabled, melee and thrown weapon attacks suffer **−1 per die step** the wielder is below the weapon's Minimum Strength.

This is an **optional house rule**, separate from the normal SWADE ranged-weapon Minimum Strength attack penalty. Thrown melee weapons use this setting rather than the pure-ranged setting, preventing the two penalties from stacking on the same attack.

## Enforce Melee & Thrown Weapon Minimum Strength Restrictions

Partially automates the SWADE rule that a wielder below a melee/thrown weapon's Minimum Strength loses its positive weapon abilities.

For a readied weapon whose Minimum Strength is not met, the module currently suppresses:

- positive weapon Parry
- positive weapon AP

Stored and merely Carried weapons retain their normal displayed statistics. Suppression affects prepared data only and does not rewrite the stored weapon item; meeting Minimum Strength again or unreadying the weapon restores the values on the next actor preparation cycle.

The module deliberately does **not** infer or suppress Reach, free-form Notes abilities, or custom/module-owned properties. Those remain manual.

# Effective Minimum Strength Bonuses

Abilities such as **Brawny** or **Soldier** may allow a character to count Strength as higher for Minimum Strength purposes without actually increasing the Strength die.

Use the additive Active Effect flag:

```text
Attribute Key: flags.swade-minimum-strength-automation.minStrBonus
Change Mode:   Add
Effect Value:  1
```

A value of `1` means one die step higher for Minimum Strength purposes. Multiple effects stack normally.

This effective-Minimum-Strength bonus is used by armor penalties, ranged attack penalties, melee/thrown attack penalties, and melee/thrown restriction checks. It does **not** increase actual Strength and therefore does not increase the Strength-limited weapon damage cap.

# Scope

The module intentionally automates only Minimum Strength behavior that can be implemented cleanly and predictably from structured SWADE data.

It does not attempt to interpret arbitrary weapon Notes or decide whether a GM permits a situational positive ability while Minimum Strength is unmet.

# Installation

## Manifest Installation

In Foundry VTT:

1. Open **Add-on Modules**.
2. Select **Install Module**.
3. Paste the manifest URL into the **Manifest URL** field.
4. Select **Install**.

```text
https://github.com/bigbadbuffalo/swade-minimum-strength-automation/releases/latest/download/module.json
```

After installation, enable **SWADE Minimum Strength Automation** from **Manage Modules** inside your SWADE world.

# Requirements

This module requires the **Savage Worlds Adventure Edition (SWADE)** game system.

No additional Foundry modules are required.

# License

This is an unofficial module for use with Foundry Virtual Tabletop and Savage Worlds Adventure Edition.

Foundry Virtual Tabletop and Savage Worlds Adventure Edition are the property of their respective owners.
