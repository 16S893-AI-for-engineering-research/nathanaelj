/**
 * Presentations domain logic: types and small helpers.
 *
 * Presentations are data-driven, the same way the dev log is (see
 * `src/data/presentations.ts`). A presentation is just an ordered list of
 * typed slides — no markdown files, no build step. Everything that renders a
 * deck (the list card thumbnail, the full-screen deck view) reads from the
 * same `LAYOUTS` map in `src/components/presentations/slides/index.ts`, so
 * adding a slide layout means adding one component + one map entry, not
 * touching every page that shows a deck.
 *
 * Date formatting is intentionally re-used from the dev log so dates read
 * identically across the whole site.
 */
import { formatDate, formatDateLong } from './devlog';

export { formatDate, formatDateLong };

/** A single slide. Add a new layout by adding a variant here, a matching
 *  `.astro` component in `components/presentations/slides/`, and an entry
 *  in that folder's `LAYOUTS` map. */
export type PresentationSlide =
  | { layout: 'cover'; kicker?: string; title: string; subtitle?: string }
  | { layout: 'content'; kicker?: string; title: string; bullets: string[] }
  | { layout: 'quote'; quote: string; attribution?: string }
  | { layout: 'closing'; kicker?: string; title: string; body: string };

export interface Presentation {
  /** URL-safe id — used for the deck's route (`/presentations/<slug>`). */
  slug: string;
  title: string;
  /** ISO date, `YYYY-MM-DD`. Decks are sorted by this. */
  date: string;
  /** One or two sentences shown on the list card. */
  summary: string;
  slides: PresentationSlide[];
}

/** Newest first — the default order on the list page. */
export function sortByDateDesc(items: Presentation[]): Presentation[] {
  return [...items].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
  );
}
