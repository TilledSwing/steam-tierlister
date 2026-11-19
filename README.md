# Steam Tierlister

A [Millennium](https://github.com/SteamClientHomebrew/Millennium) plugin that adds a **Tierlists** tab to the Steam desktop client, so you can rank the games in your Steam library in TierMaker-style tier lists.

> **Status: early development.** Not ready for use yet. There is no release.

## Planned features
- A `Tierlists` tab in Steam's top navigation.
- Multiple independent tier lists with customizable tiers (names, colors, order).
- Drag-and-drop (and keyboard) placement of your Steam games, using their library cover art.
- Filters: installed, collections, tags, genres, price, release date, and more.
- Autosave, JSON import/export, and high-resolution PNG export.

## Requirements
- Windows with the Steam desktop client
- [Millennium](https://steambrew.app) installed

## Development
Requires [Bun](https://bun.sh) ≥ 1.0.

```bash
bun install
bun run check      # Biome lint + format check
bun run typecheck
bun run test
bun run build      # builds and installs into your local Millennium plugins folder
```

## Disclaimer
This is an unofficial, community project. It is not affiliated with or endorsed by Valve or Steam. Client modifications are not officially supported by Valve; use at your own risk.

## License
[MIT](LICENSE) © 2026 Nicholas Laurion. Third-party notices: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
