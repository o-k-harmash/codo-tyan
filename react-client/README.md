# React + TypeScript + Vite

This is a client-side application built with React and TypeScript, bundled using Vite.
The project is intentionally minimal and pragmatic, focusing on clarity, strict typing,
and consistent code style without premature architectural complexity.

## Tech Stack

### Core Technologies

- React 19
- TypeScript
- Vite
- Vitest
- React Router
- Tailwind CSS

### Code Quality & Tooling

- ESLint — JavaScript / TypeScript / React linting
- Prettier — code formatting
- Vitest — testing
- Stylelint — CSS and Tailwind linting
- TypeScript (strict mode)

## Requirements

- Node.js ≥ 18
- npm ≥ 9

## Installation

```bash
npm install
```

## Running the Project

### Development (HMR)

```bash
npm run dev
```

Runs the Vite development server with hot module replacement.

### Production Build

```bash
npm run build
```

Runs TypeScript type checking and creates a production-ready Vite build.

### Preview Production Build

```bash
npm run preview
```

## NPM Scripts (package.json)

| Script       | Description                         |
| ------------ | ----------------------------------- |
| dev          | Start development server            |
| build        | TypeScript check + production build |
| preview      | Preview production build            |
| lint         | Run JavaScript and CSS linters      |
| lint:fix     | Auto-fix JS, CSS and format code    |
| lint:js      | Run ESLint                          |
| lint:js:fix  | Run ESLint with auto-fix            |
| lint:css     | Run Stylelint                       |
| lint:css:fix | Run Stylelint with auto-fix         |
| test         | Run Vitest testing                  |
| format       | Run Prettier formatter              |

### Recomendations before commit

Before commit we are recommended to run:

```bash
npm run lint:fix
npm run test
```
