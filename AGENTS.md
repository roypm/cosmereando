# Cosmereando — Agent Instructions

## Source of truth

- Product and design decisions: `DECISIONES.md`.
- Coding standards: `DIRECTRICES_CODIGO.md`.

Read both files before making changes that affect the product, architecture or code style.

## Project

- This is a static Astro website.
- Use TypeScript, standard CSS and JSON content.
- Keep all code, comments, names and technical messages in English.
- Use UTF-8 for source files, JSON, HTML and text resources.
- Reuse existing components, utilities and styles before creating new ones.
- Do not duplicate existing functionality.
- Keep the project buildable after every coherent change.
- Before changing code, inspect the existing implementation and its surrounding dependencies.
- Refactor conflicting or obsolete code instead of layering patches on top of it.

## Development workflow

- Use Node.js version defined in `.nvmrc`.
- Use pnpm as the package manager.
- Work directly on `develop` for normal development.
- Organize commits by feature or section.
- Use Conventional Commits in English.
- Do not push directly to `main`.
- `main` contains stable, deployable code.

## Validation

Run the project checks before accepting relevant changes:

```bash
pnpm check
```

Before publishing, also review accessibility manually and run:

```bash
pnpm audit
```

Errors must be fixed before integration. Warnings must be reviewed and documented when they represent a real issue.

## Implementation rules

- Prefer simple solutions over unnecessary abstractions.
- Keep data functions pure and access JSON through typed functions.
- Keep visible interface text in translation JSON files.
- Use semantic HTML, accessible names, visible keyboard focus and descriptive image alt text.
- Keep JavaScript progressive: essential navigation and content should not depend on it when possible.
- Update documentation in the same feature or commit when behavior changes.
