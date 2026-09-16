import Cover from './Cover.astro';
import Content from './Content.astro';
import Quote from './Quote.astro';
import Closing from './Closing.astro';

/**
 * Maps a slide's `layout` field to the component that renders it.
 *
 * To add a new layout: create `<Name>.astro` in this folder (follow one of
 * the existing files as a template — each takes `{ slide, index, total,
 * chrome }`), add its variant to `PresentationSlide` in
 * `src/lib/presentations.ts`, and register it here.
 */
export const LAYOUTS = {
  cover: Cover,
  content: Content,
  quote: Quote,
  closing: Closing,
};
