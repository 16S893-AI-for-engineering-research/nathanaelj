# Architecture & Design Decisions

## Framework Choice: Astro
- **Why:** Static site generation, markdown-first content, zero JS by default with islands architecture for interactive components
- **Key benefit:** Lightweight, fast, maintainable structure while supporting complex interactive elements when needed

## Content Strategy
- **Markdown files** for dev-log entries and content-heavy pages (DRY principle)
- **Astro components** for project pages to allow flexible embedded interactive content
- **Collections API** for organizing and querying content

## Styling
- **Tailwind CSS** for utility-first styling
- **Theme configuration:** Placeholder in `tailwind.config.mjs` - to be defined
- **CSS Modules** available if component-scoped styles needed

## Interactivity & Animations
- **Islands Architecture:** Interactive components only load JS where needed
- **React optional:** Available via `@astrojs/react` for complex interactive elements
- **Vanilla JS:** For lightweight animations and easter eggs
- **Animation approach:** TBD with theme design

## Deployment
- **Static hosting:** GitHub Pages via `16s893-ai-for-engineering-research.github.io/nathanaelj`
- **CI/CD:** GitHub Actions workflow for auto-deployment on push to `main`
- **Build output:** `dist/` directory

## Future Considerations
- **Dynamic routes:** `/projects/[slug].astro` ready for project sub-pages
- **Content expansion:** Easy to add new markdown content types
- **Theme customization:** Theme system TBD - placeholder in Tailwind config
- **Easter eggs:** Can be added as isolated interactive components without bloating static output
