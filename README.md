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

## Project structure

```text
src/
├── assets/images/       Static visual assets
├── components/          Reusable Astro page and interface components
├── data/                JSON catalogue, typed accessors and validators
├── layouts/             Shared document layouts and metadata
├── pages/               English and localized static routes
└── styles/              Tokens, base, layout, component, page and responsive CSS
```

Shared catalogue data belongs in `src/data/*.json`. Visible interface text
belongs in all three translation dictionaries. Use stable English IDs and
slugs, then run `pnpm check` before accepting a content change.

### Adding catalogue content

1. Add the shared entry to the relevant JSON file.
2. Add every translated label and visible text to `en.json`, `es.json` and `ca.json`.
3. Add relationships such as `sagaId`, `worldId` or collection IDs only when the referenced entry exists.
4. Add or register the required image in `book-images.ts`, `planet-images.ts` or `image-credits.json`.
5. Run `pnpm format` and `pnpm check`.

The build validates duplicate IDs and slugs, translation parity, catalogue
relationships, image mappings and magic-system and planet profiles.

## Quality workflow

```bash
pnpm format        # Format Astro, TypeScript, JSON and CSS
pnpm format:check  # Verify formatting without changing files
pnpm lint          # Run CSS linting
pnpm typecheck     # Run Astro diagnostics
pnpm test          # Run Vitest tests
pnpm check         # Run the complete local quality gate
pnpm audit --prod  # Review production dependency vulnerabilities
```

Development happens on `develop`. Pull requests and pushes to `develop` run
the continuous-integration workflow. Only `main` deploys to GitHub Pages.

## Images and credits

Every published visual asset must be registered in
`src/data/image-credits.json`. Unverified third-party material is marked for
review and must not be treated as cleared for publication. The credits page
records authorship, source and licence information without implying ownership
of third-party material.

Cosmereando is an unofficial fan project and is not affiliated with Brandon
Sanderson, Dragonsteel or any publisher. Third-party book covers, artwork,
logos and text retain their original rights.
