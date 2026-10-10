# Repository Guidelines

## Project Structure & Module Organization

This repository is a React 19 admin interface built with Vite. Application code lives in `src/`: `pages/` contains route-level screens, `components/` contains shared UI and meal-specific components, `services/` handles data access, `atoms/` holds Jotai state, `hooks/` contains reusable hooks, and `config/` contains Firebase setup. Static files belong in `public/`; imported images and other source assets belong in `src/assets/`. There is currently no dedicated test directory.

## Build, Test, and Development Commands

- `npm install` installs dependencies from the lockfile.
- `npm run dev` starts the Vite development server with hot reload.
- `npm run build` creates the production bundle in `dist/`.
- `npm run preview` serves the built bundle locally for review.
- `npm run lint` runs ESLint across the repository.

No test runner or test script is configured yet. Run the lint and build commands before submitting changes; do not describe them as a substitute for automated tests.

## Coding Style & Naming Conventions

Use JavaScript modules and JSX, with two-space indentation and semicolons in keeping with the existing source. Name React components and page files in PascalCase (for example, `MealsSection.jsx`); use camelCase for hooks, services, and ordinary helpers (for example, `useUploadImage.js`, `mealService.js`). Keep route pages in `src/pages/`, reusable UI in `src/components/`, and data operations in `src/services/`. Follow nearby patterns for imports and Tailwind utility styling. ESLint configuration is in `eslint.config.js`.

## Testing Guidelines

There is no configured test framework, test script, or coverage requirement. For behavior changes, manually exercise the affected screen and its loading, empty, and error states where applicable, then run `npm run lint` and `npm run build`. If adding tests, first establish a consistent runner and document its command and file naming convention.

## Commit & Pull Request Guidelines

No useful Git commit history was available to infer an established commit convention. Use short, imperative commit subjects such as `Add meal image validation`. Pull requests should describe the user-visible change, note relevant implementation details, link related issues when available, and include screenshots for UI changes. Mention lint/build results and any known gaps.

## Security & Configuration

Firebase settings are read from `VITE_FIREBASE_*` environment variables in `src/config/firebase.js`. Keep real credentials in an untracked local `.env`; never commit secrets. When adding configuration, document the required variable names without publishing secret values.
