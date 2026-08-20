# Cosmereando

Static multilingual Astro guide to Brandon Sanderson’s Cosmere.

## Development

Use the Node.js version in `.nvmrc` and pnpm:

```bash
source ~/.nvm/nvm.sh
nvm use
corepack enable
pnpm install
pnpm dev
pnpm check
```

The Astro scripts disable telemetry by default. This keeps local development
working even when the user configuration directory is unavailable; the site
does not use analytics or tracking.

The color theme follows the system preference by default. Use the theme button
in the top navigation to switch between light and dark mode; the preference is
stored locally in the browser.

## Locales

- English is served from the root paths: `/`, `/books`, `/sagas` and `/planets`.
- Spanish uses `/es/`.
- Catalan uses `/ca/`.

Visible interface text is stored in `src/data/translations/`. Shared catalogue and navigation data lives in `src/data/`. The sidebar is generated from `navigation.json`, `routes.json`, `works.json`, `sagas.json` and `planets.json`; adding an entry to those files makes it available after the next build.

### Adding a locale

1. Add the translated dictionary to `src/data/translations/`.
2. Add its metadata and translation import to `src/data/locales.ts`.
3. Run `pnpm check` to verify translation keys and generated routes.

The locale registry provides URL prefixes, language tags, Open Graph values,
the language switcher and translation loading from one place.
