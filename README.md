# 16.S897 — AI Agents for Engineering Research

[![Deploy to GitHub Pages](https://github.com/16S893-AI-for-engineering-research/nathanaelj/actions/workflows/deploy.yml/badge.svg)](https://github.com/16S893-AI-for-engineering-research/nathanaelj/actions/workflows/deploy.yml)

Personal portfolio site for MIT's *16.S897 — AI Agents for Engineering Research*.

🌐 **Live site:** <https://16s897-ai-for-engineering-research.github.io/nathanaelj/>

---

## Stack

- **Framework:** [Astro](https://astro.build) (static site, islands architecture)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Language:** TypeScript + `.astro` components
- **Hosting:** GitHub Pages via GitHub Actions

---

## Getting Started

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

### Build

```bash
npm run build
```

### Deploy

Pushes to `main` trigger the GitHub Actions workflow, which builds the site and publishes it to GitHub Pages.

---

## Project Structure

```
src/
├── pages/            # Astro routes (index, about, projects, dev-log)
│   ├── index.astro
│   ├── about.astro
│   ├── projects/
│   │   ├── index.astro
│   │   └── [slug].astro
│   └── dev-log.astro
├── content/          # Markdown / MDX content collections
│   ├── projects/
│   └── dev-logs/
├── components/       # Reusable UI components
│   ├── layout/       # Header, Footer, BaseLayout
│   ├── common/       # Shared UI primitives
│   └── interactive/  # Client-side islands (React, etc.)
├── data/             # TypeScript data files
├── layouts/          # Page layouts
├── lib/              # Utilities and helpers
└── styles/           # Global CSS
```

---

## Further Reading

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for architectural decisions and design patterns, and [`AGENTS.md`](./AGENTS.md) for AI agent guidelines when contributing to this repo.
