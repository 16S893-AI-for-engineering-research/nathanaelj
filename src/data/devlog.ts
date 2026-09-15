import type { DevLogEntry } from '@lib/devlog';

/**
 * Dev-log entries — the single source of truth for /dev-log and /dev-log/<slug>.
 *
 * To add an entry, append an object below (order does not matter; the site sorts
 * by date). Use `null` for any metric you did not capture — it renders as "—"
 * and is excluded from totals rather than silently counted as zero.
 *
 * Bullet strings support inline `**bold**`, `*italic*`, `` `code` `` and
 * `[links](https://...)`.
 */
export const devLogEntries: DevLogEntry[] = [
  {
    slug: 'portfolio-setup-complete',
    title: 'Portfolio Setup Complete',
    date: '2026-09-10',
    summary:
      'Bootstrapped the portfolio in Astro + Tailwind with a custom lightning animation and three hidden easter eggs.',
    models: ['claude-haiku', 'claude-sonnet'],
    metrics: {
      // Session predates structured metric tracking — placeholders until recovered.
      userMessages: null,
      assistantMessages: null,
      toolCalls: null,
      totalCostUsd: null,
    },
    description: {
      keyChanges: [
        'Scaffolded the site with **Astro** and styled it with **Tailwind CSS**, choosing static generation with islands for the few interactive pieces.',
        'Built a bespoke **lightning animation** for the homepage hero, driven by a hand-rolled branching geometry routine.',
        'Laid out the core routes — Home, About Me, Project and Dev Log — on a shared `BaseLayout` with a fixed header and footer.',
        'Defined the sunrise/sunset "solar" theme (solar, flame, ember, void ramps) in `tailwind.config.mjs`.',
        'Hid **three easter eggs** across the site for anyone curious enough to click around.',
        'Wired up **GitHub Actions** to build and deploy to GitHub Pages on every push to `main`.',
      ],
      agentSuccesses: [
        'Gave genuinely useful, well-reasoned advice comparing **Astro** against other frameworks for a content-first portfolio.',
        'Scaffolded the project structure and boilerplate quickly — almost certainly faster than doing it by hand.',
        'Handled the Tailwind theme configuration and repetitive component wiring cleanly once the direction was set.',
      ],
      agentFailures: [
        'Went off the rails and started generating **7+ unprompted markdown files** of setup/next-steps/debugging/troubleshooting notes. Had to interrupt it manually to regain control.',
        'Struggled with frontend fundamentals — repeatedly confused **margins and padding**, needing several corrections for basic spacing.',
        'Could not work out the **geometry for the lightning model**; I ended up handing it research code as a reference to get a usable result.',
        'Overall a net speed-up, but littered with silly mistakes — though my prompting was fairly low-effort here, which surely did not help.',
      ],
    },
  },
  {
    slug: 'dev-log-restructure',
    title: 'Dev Log Restructure',
    date: '2026-09-15',
    summary:
      'Rebuilt the dev log as a searchable, sortable, data-driven index with per-entry detail pages and modals.',
    models: ['claude-opus-4.6'],
    metrics: {
      userMessages: 1,
      assistantMessages: null,
      toolCalls: null,
      totalCostUsd: null,
    },
    description: {
      keyChanges: [
        'Replaced the single hand-written dev-log page with a typed data layer in `src/data/devlog.ts` plus domain helpers in `src/lib/devlog.ts`.',
        'Added a summary list view showing title, date, one-line summary, user/assistant message counts, tool calls, total cost and models used.',
        'Each entry opens in an accessible **modal** (focus trap, `Esc` to close, scroll lock) with a matching standalone page at `/dev-log/<slug>` for deep links and no-JS fallback.',
        'Restructured entry content into three sections: **key changes**, **agent successes** and **agent failures**.',
        'Introduced an automatic **model colour-coding** scheme — pinned hues for known models, deterministic hashing into a curated palette for any new agent.',
        'Built a **search + filter toolbar**: keyword search, date range, model filter, and sorting by date (either direction) or total cost.',
      ],
      agentSuccesses: [
        'Read the existing codebase first and matched the established solar theme, `resolvePath` link handling and component conventions without being told.',
        'Designed the colour-assignment scheme to be genuinely future-proof rather than hardcoding a lookup table.',
        'Handled progressive enhancement properly — the list, detail pages and filters all degrade gracefully without JavaScript.',
      ],
      agentFailures: [
        '_Placeholder — to be filled in after reviewing the result._',
      ],
    },
  },
];
