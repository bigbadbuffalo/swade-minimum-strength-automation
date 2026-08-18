# Changelog

All notable changes to **SWADE Minimum Strength Automation** will be documented in this file.

## [Unreleased]

## [1.0.0] - 2026-08-17

### Added

- Split Minimum Strength automation out of **SWADE Weapon Properties** into a dedicated module.
- Added optional Strength-limited melee/thrown weapon damage enforcement.
- Added optional armor Minimum Strength penalties to Pace, Agility, and Agility-linked skill rolls.
- Added optional ranged weapon Minimum Strength attack penalties.
- Added optional melee/thrown Minimum Strength attack penalties as a house rule.
- Added partial melee/thrown positive-ability restriction automation that suppresses positive Parry and AP for readied weapons whose Minimum Strength is not met.
- Added `flags.swade-minimum-strength-automation.minStrBonus` for effective Minimum Strength bonuses such as Brawny or Soldier.
- Minimum Strength roll modifiers identify their source as **Minimum Strength (Armor)** or **Minimum Strength (Weapon)**.

### Notes

- Reach, free-form Notes abilities, and custom/module-owned weapon properties remain manual.
- Stored and merely Carried weapons retain normal Parry and AP display values; restriction suppression applies only to readied weapons.
- No compatibility shim is provided for the former `flags.swade-weapon-properties.minStrBonus` namespace because the split occurred before public release.

[Unreleased]: https://github.com/bigbadbuffalo/swade-minimum-strength-automation/compare/1.0.0...HEAD
[1.0.0]: https://github.com/bigbadbuffalo/swade-minimum-strength-automation/releases/tag/1.0.0
