const MS_MODULE_ID = "swade-minimum-strength-automation";
const WELCOME_VERSION = 1;
const README_URL =
  "https://github.com/bigbadbuffalo/swade-minimum-strength-automation#readme";

Hooks.once("ready", async () => {
  if (!game.user?.isGM) return;

  const shownVersion = Number(
    game.settings.get(MS_MODULE_ID, "welcomeMessageVersion") ?? 0
  );

  if (shownVersion >= WELCOME_VERSION) return;

  const content = `
    <div class="swade-minimum-strength-automation-welcome">
      <h2>SWADE Minimum Strength Automation</h2>
      <p>
        This module adds optional Minimum Strength rules automation for SWADE.
      </p>
      <p><strong>Active Effect flag:</strong></p>
      <ul>
        <li><code>flags.swade-minimum-strength-automation.minStrBonus</code> — Effective Minimum Strength bonus in die steps</li>
      </ul>
      <p>
        Automation options are available under
        <strong>Configure Settings → SWADE Minimum Strength Automation</strong>.
      </p>
      <p>
        <a href="${README_URL}" target="_blank" rel="noopener noreferrer">
          View the README for setup instructions and rule scope
        </a>
      </p>
    </div>
  `;

  try {
    await ChatMessage.create({
      speaker: { alias: "SWADE Minimum Strength Automation" },
      content
    });

    await game.settings.set(
      MS_MODULE_ID,
      "welcomeMessageVersion",
      WELCOME_VERSION
    );
  } catch (error) {
    console.error(
      "SWADE Minimum Strength Automation | Could not create welcome message.",
      error
    );
  }
});
