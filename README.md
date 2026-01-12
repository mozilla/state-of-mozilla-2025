# State of Mozilla 2025

A web application built with Astro, Svelte, and Tailwind CSS for Mozilla's 2025 state presentation.

## Tech Stack

- **Framework**: [Astro](https://astro.build) - Static site generator with component islands
- **UI Components**: [Svelte](https://svelte.dev) - Reactive UI framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- **Package Manager**: pnpm
- **Additional Libraries**: html2canvas for image capture functionality

## Project Structure

```text
/
├── public/              # Static assets
│   ├── fonts/          # Font files
│   ├── svg/            # SVG images
│   └── pdf/            # PDF documents
├── src/
│   ├── assets/         # Project assets
│   ├── components/     # Svelte and Astro components
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   ├── ProgressCard.svelte
│   │   ├── ProgressWatcher.svelte
│   │   └── ...
│   ├── layouts/        # Page layouts
│   │   └── Layout.astro
│   ├── pages/          # Route pages
│   │   ├── index.astro
│   │   ├── rebels.astro
│   │   ├── stakes.astro
│   │   ├── tools.astro
│   │   ├── ledger.astro
│   │   ├── manifesto.astro
│   │   └── roadmap.astro
│   ├── stores/         # Svelte stores
│   │   └── progressStore.js
│   └── styles/         # Global styles
│       └── global.css
├── astro.config.mjs    # Astro configuration
├── svelte.config.js    # Svelte configuration
├── tsconfig.json       # TypeScript configuration
└── package.json
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `pnpm install`  | Install dependencies                        |
| `pnpm dev`      | Start local dev server at `localhost:4321`  |
| `pnpm build`    | Build production site to `./dist/`          |
| `pnpm preview`  | Preview build locally before deploying      |
| `pnpm astro`    | Run Astro CLI commands                      |

## Development

1. Clone the repository
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Start the development server:
   ```sh
   pnpm dev
   ```
4. Open your browser at `http://localhost:4321`
