# AGENTS.md — Agent Guidelines & Site Context

This file provides system context, architectural guidelines, and instruction rules for AI agents working on this project.

---

## 1. Project Overview & Architecture

This repository contains the portfolio website for **16.S893 (AI Agents for Engineering Research)** at MIT.

### Core Stack
- **Framework:** [Astro](https://astro.build) — Static site generator with Islands Architecture.
- **Styling:** [Tailwind CSS](https://tailwindcss.com) with custom color and font extensions.
- **Language:** TypeScript (`.ts`) and Astro components (`.astro`).
- **Base Path Resolution:** Use `resolvePath('/path')` from `@lib/paths` or `../lib/paths` for links and assets to support base URL routing on GitHub Pages.
- **Deployment:** Deployed statically to GitHub Pages via GitHub Actions.

### Directory Layout
```
src/
├── components/   # Reusable UI components (header, footer, interactive graphics)
├── content/      # Markdown & MDX content collections (devlog, etc.)
├── data/         # TypeScript data files (project, devlog, presentations data)
├── layouts/      # Base layouts (BaseLayout.astro)
├── lib/          # Helper utilities and domain logic
├── pages/        # Astro routes (index, about, project, dev-log)
└── styles/       # Global CSS (globals.css, project.css, presentations.css)
```

### Theme System
- **Colors:** Primary dark palette (`void`), solar golden accent (`solar`), flame orange (`flame`), ember red (`ember`).
- **Typography:**
  - `font-display`: `Playfair Display`, serif (tall line-height title font).
  - `font-sans`: `Sora`, sans-serif.
  - `font-mono`: `IBM Plex Mono`, monospace.

---

## 2. Rules & Best Practices for AI Agents

When modifying code or creating content in this repository, strictly adhere to the following rules:

### Response Style
- **Concise Answers:** Provide clear, short, and direct responses without unnecessary fluff.

### Web Design & Aesthetics
- **Design Aesthetic:** Aim for unique, unusual, but practical and simple web designs.
- **NO Rounded Corners:** Do **NOT** use boxes with rounded corners (avoid `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full` on cards/boxes, or `border-radius`). Keep box corners sharp and clean.
- **Minimal Text:** Keep text on pages to a minimum unless explicitly instructed otherwise. Focus on core user-requested text without adding miscellaneous intro paragraphs, decorative callouts, or filler.

### Spacing & Scripting (Margins & Padding)
- **Careful Spacing:** Pay close attention to padding and margins across screen sizes.
- **Use Scripting for Calculations:** Do not guess padding or margin values where precise alignment is needed. Use scripting (e.g. Node or Bash execution) to calculate bounding boxes, text line heights, grid layouts, or spacing metrics where helpful.
- **Tall Font Protection:** The title display font (`Playfair Display`) is tall and can get cropped at the top or bottom if line-height or vertical padding is tight. Always ensure sufficient vertical padding and line height for titles without applying excessively large margins.
