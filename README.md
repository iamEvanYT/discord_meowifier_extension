# Discord Meowifier Extension

A fun browser extension that transforms Discord messages into cute, cat-themed language! Mentions become kitty references, role mentions become kittens, and all message text is meowified.

## Features

- Replaces @mentions with `@kitty :3`
- Replaces role mentions with `@kittens <3`
- Replaces emoji images with a custom cat SVG
- Transforms all message text into variations of "meow" (preserving punctuation and case)
- Works on both existing and new messages in Discord web

## How It Works

The extension injects a content script (`content.js`) into Discord web pages. It observes the DOM for new messages and modifies their content in real time, applying the meowification logic.

## Installation

1. Clone or download this repository.
2. Open your browser's extensions page:
   - **Chrome:** `chrome://extensions/`
   - **Firefox:** `about:addons`
3. Enable "Developer mode" (Chrome) or "Debug mode" (Firefox).
4. Click "Load unpacked" (Chrome) or "Load Temporary Add-on" (Firefox).
5. Select the project folder (`discord_meowifier_extension`).
6. Open Discord in your browser and enjoy the meows!

## Files

- `manifest.json` — Extension manifest file
- `content.js` — Main content script that performs the meowification
- `discord-kitty.png` — Cat image asset (used for the extension icon or emoji replacement)

## Development

- The script only runs on `discord.com`.
- All DOM changes are handled via a MutationObserver for real-time updates.
- To modify the meowification logic, edit `content.js`.

## License

MIT

---

Enjoy your meowified Discord experience! 😺
