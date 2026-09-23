import type { Presentation } from '@lib/presentations';

/**
 * Presentations — the single source of truth for /presentations and
 * /presentations/<slug>.
 *
 * To add a presentation: append a `Presentation` object below (order does
 * not matter — the site sorts by date). Each slide is one entry in
 * `slides:`, typed by `layout`. Available layouts live in
 * `src/components/presentations/slides/index.ts`; add a new one there if
 * you need a shape these four don't cover.
 */
export const presentations: Presentation[] = [
  {
    slug: 'placeholder-presentation',
    title: 'Placeholder Presentation',
    date: '2026-09-15',
    summary:
      'A placeholder deck demonstrating the presentation format — swap this out for your first real project presentation.',
    slides: [
      {
        layout: 'cover',
        kicker: '16.S897 · AI Agents for Engineering Research',
        title: 'Placeholder Presentation',
        subtitle:
          'A stand-in deck showing how presentations are authored, rendered and presented on this site.',
      },
      {
        layout: 'content',
        kicker: 'Agenda',
        title: 'What this deck demonstrates',
        bullets: [
          'A cover slide with a kicker, title and subtitle',
          'A content slide with a title and a bulleted list',
          'A quote slide for a pull-quote or a key claim',
          'A closing slide for next steps or a call to action',
        ],
      },
      {
        layout: 'content',
        kicker: 'How it works',
        title: 'Slides are data, not documents',
        bullets: [
          'Each deck is one entry in src/data/presentations.ts',
          'Every slide picks a layout from components/presentations/slides/',
          'Slides size themselves in cqw units, so the same markup renders as a card thumbnail or full screen',
          'The viewer is plain HTML plus one small inline script — no client framework',
        ],
      },
      {
        layout: 'content',
        kicker: 'Controls',
        title: 'Presenting a deck',
        bullets: [
          '→ / ↓ / Space / click the right side to advance',
          '← / ↑ / click the left side to go back',
          'Home and End jump to the first or last slide',
          'F toggles native fullscreen; Esc or the ✕ button exits',
        ],
      },
      {
        layout: 'quote',
        quote: 'Replace this deck with real slides once the project is underway.',
        attribution: 'Nathanael Jenkins',
      },
      {
        layout: 'closing',
        kicker: 'Next',
        title: 'Real slides coming soon',
        body: 'This placeholder will be replaced by an actual project presentation — the format and viewer are already in place.',
      },
    ],
  },
];
