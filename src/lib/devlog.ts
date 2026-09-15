/**
 * Dev-log domain logic: types, formatting and aggregation.
 *
 * The dev log is data-driven (see `src/data/devlog.ts`). Everything that renders
 * an entry — the list card, the modal, the standalone page — reads from the same
 * typed structures defined here, so adding a new entry never means touching markup.
 *
 * Model colour-coding lives in `src/lib/modelColors.ts` (it needs to see the full
 * entry set to guarantee distinct hues); this module stays data-free.
 */
import { getModelStyle, type ModelStyle } from './modelColors';

export type { ModelStyle } from './modelColors';
export { getModelStyle, MODEL_REGISTRY } from './modelColors';

/** Metrics captured from an agent session. `null` == not tracked / unknown. */
export interface DevLogMetrics {
  /** Number of messages I sent to the agent. */
  userMessages: number | null;
  /** Number of messages the agent sent back. */
  assistantMessages: number | null;
  /** Number of tool calls the agent made (reads, edits, bash, ...). */
  toolCalls: number | null;
  /** Total spend for the session, in USD. */
  totalCostUsd: number | null;
}

export interface DevLogEntry {
  /** URL-safe id — also used for deep links (`/dev-log/<slug>`, `#<slug>`). */
  slug: string;
  /** Short summary of the change. */
  title: string;
  /** ISO date, `YYYY-MM-DD`. Entries are sorted by this. */
  date: string;
  /** Single sentence shown in the list view. */
  summary: string;
  /** Model ids used in the session — see `MODEL_REGISTRY`. Free text is fine. */
  models: string[];
  metrics: DevLogMetrics;
  description: {
    keyChanges: string[];
    agentSuccesses: string[];
    agentFailures: string[];
  };
}

/* ------------------------------------------------------------------ *
 * Sorting, formatting & aggregation
 * ------------------------------------------------------------------ */

/** Every model referenced by the given entries, alphabetised, with styles. */
export function collectModels(entries: DevLogEntry[]): ModelStyle[] {
  const ids = new Set<string>();
  for (const entry of entries) entry.models.forEach((model) => ids.add(model));
  return [...ids].map(getModelStyle).sort((a, b) => a.label.localeCompare(b.label));
}

/** Newest first (the default view order). */
export function sortByDateDesc(entries: DevLogEntry[]): DevLogEntry[] {
  return [...entries].sort(
    (a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
  );
}

/** Parse `YYYY-MM-DD` as UTC so the displayed day never shifts by timezone. */
function parseISODate(date: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
}

export function formatDate(date: string): string {
  return parseISODate(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatDateLong(date: string): string {
  return parseISODate(date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** `null` renders as an em dash so unknown values read as deliberate. */
export function formatCount(value: number | null): string {
  return value === null ? '—' : value.toLocaleString('en-GB');
}

export function formatCost(value: number | null): string {
  if (value === null) return '—';
  return value >= 100
    ? `$${value.toFixed(0)}`
    : value >= 1
      ? `$${value.toFixed(2)}`
      : `$${value.toFixed(3)}`;
}

export interface DevLogTotals {
  entries: number;
  userMessages: number;
  assistantMessages: number;
  toolCalls: number;
  totalCostUsd: number;
  /** True when at least one entry is missing a metric (totals are lower bounds). */
  partial: boolean;
  models: number;
}

export function computeTotals(entries: DevLogEntry[]): DevLogTotals {
  const totals: DevLogTotals = {
    entries: entries.length,
    userMessages: 0,
    assistantMessages: 0,
    toolCalls: 0,
    totalCostUsd: 0,
    partial: false,
    models: collectModels(entries).length,
  };

  for (const { metrics } of entries) {
    const values = [
      metrics.userMessages,
      metrics.assistantMessages,
      metrics.toolCalls,
      metrics.totalCostUsd,
    ];
    if (values.some((value) => value === null)) totals.partial = true;
    totals.userMessages += metrics.userMessages ?? 0;
    totals.assistantMessages += metrics.assistantMessages ?? 0;
    totals.toolCalls += metrics.toolCalls ?? 0;
    totals.totalCostUsd += metrics.totalCostUsd ?? 0;
  }

  return totals;
}

/** Lowercased haystack used by the client-side keyword search. */
export function buildSearchIndex(entry: DevLogEntry): string {
  return [
    entry.title,
    entry.summary,
    entry.date,
    formatDate(entry.date),
    ...entry.models.map((model) => `${model} ${getModelStyle(model).label}`),
    ...entry.description.keyChanges,
    ...entry.description.agentSuccesses,
    ...entry.description.agentFailures,
  ]
    .join(' \u2022 ')
    .toLowerCase();
}

/* ------------------------------------------------------------------ *
 * Minimal inline markdown
 * ------------------------------------------------------------------ */

const ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Renders the inline subset we actually use in entry bullets:
 * `**bold**`, `*italic*`, `` `code` `` and `[label](href)`.
 * Input is escaped first, so entry text can never inject markup.
 */
export function renderInline(text: string): string {
  return text
    .replace(/[&<>"']/g, (char) => ESCAPE_MAP[char])
    .replace(/`([^`]+)`/g, '<code class="dl-code">$1</code>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>');
}
