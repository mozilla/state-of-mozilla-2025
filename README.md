# State of Mozilla 2025

A landing page for the State of Mozilla 2025 report with an email signup form and poster download.

## Features

- Email signup form to receive the State of Mozilla 2025 report
- Downloadable poster (PDF)
- Real-time clock display with timezone
- Responsive design using Tailwind CSS
- Mozilla branding and styling

## Tech Stack

- [Vite](https://vitejs.dev/) - Build tool and dev server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- Vanilla JavaScript

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- pnpm (or npm/yarn)

### Installation

```bash
pnpm install
```

### Development

Run the development server:

```bash
pnpm dev
```

The site will be available at `http://localhost:5173`

### Build

Build for production:

```bash
pnpm build
```

The built files will be in the `dist/` directory.

### Preview

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```
.
├── public/          # Static assets
│   ├── fonts/       # Font files
│   ├── img/         # Images
│   ├── pdf/         # Downloadable poster PDF
│   └── svg/         # SVG graphics
├── src/
│   ├── main.js      # Main JavaScript entry point
│   └── style.css    # Custom styles
├── index.html       # HTML entry point
├── package.json     # Dependencies and scripts
└── vite.config.js   # Vite configuration
```

## Privacy

User emails are collected only to send the State of Mozilla 2025 report link. See [Mozilla's Privacy Notice](https://www.mozilla.org/privacy/websites/) for more information.
