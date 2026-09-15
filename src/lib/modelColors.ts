/**
 * Automatic colour-coding for agent models.
 *
 * Design goals:
 *   1. **Zero maintenance** — adding a new agent to a dev-log entry gives it a
 *      distinct colour with no code change anywhere.
 *   2. **No collisions** — two models must never share a hue, so a badge's colour
 *      is always an unambiguous identifier.
 *   3. **Stable** — a model keeps its colour as the log grows, so readers build
 *      up a mental colour→agent mapping over time.
 *
 * Strategy: hues are pinned for known models, then every remaining model is
 * assigned in *first-appearance order* from a curated palette (via
 * `registerModels`, called once at build time with the full entry set). This is
 * deterministic and collision-free, unlike pure hashing, and appending new
 * entries never re-colours existing ones because order is stable and
 * append-only. Beyond the palette we fall back to golden-ratio hue rotation,
 * which keeps generating maximally-spaced colours indefinitely.
 */

/** Curated, well-spaced hues that read clearly on the dark solar theme. */
const MODEL_PALETTE: readonly number[] = [
  38, // amber
  265, // violet
  190, // cyan
  345, // rose
  135, // green
  215, // blue
  300, // magenta
  95, // lime
  15, // coral
  170, // teal
  240, // indigo
  55, // gold
  325, // fuchsia
  200, // sky
  115, // spring
  280, // purple
];

/** 360 / φ — successive multiples land far apart on the colour wheel. */
const GOLDEN_ANGLE = 137.507764;

export interface ModelDefinition {
  /** Human-facing name. */
  label: string;
  /** Vendor / family, shown in the badge tooltip. */
  family?: string;
  /** Optional pinned hue (0–360). Omit to auto-assign. */
  hue?: number;
}

/**
 * Optional metadata for known models. Registering a model here only buys you a
 * nicer label, a vendor name and (if you want it) a specific hue — unknown ids
 * still work and still get a unique colour automatically.
 */
export const MODEL_REGISTRY: Record<string, ModelDefinition> = {
  'claude-haiku': { label: 'Claude Haiku', family: 'Anthropic', hue: 190 },
  'claude-sonnet': { label: 'Claude Sonnet', family: 'Anthropic', hue: 265 },
  'claude-opus': { label: 'Claude Opus', family: 'Anthropic', hue: 38 },
  'claude-sonnet-4.5': { label: 'Claude Sonnet 4.5', family: 'Anthropic', hue: 280 },
  'claude-opus-4.6': { label: 'Claude Opus 4.6', family: 'Anthropic', hue: 345 },
  'gpt-5': { label: 'GPT-5', family: 'OpenAI', hue: 135 },
  'gpt-5-codex': { label: 'GPT-5 Codex', family: 'OpenAI', hue: 115 },
  'gemini-3-pro': { label: 'Gemini 3 Pro', family: 'Google', hue: 215 },
};

/** Hues reserved by pinned registry entries — never auto-assigned. */
const PINNED_HUES = new Set(
  Object.values(MODEL_REGISTRY)
    .map((definition) => definition.hue)
    .filter((hue): hue is number => typeof hue === 'number')
);

/** Auto-assigned hues, keyed by model id. Populated by `registerModels`. */
const assigned = new Map<string, number>();

/** Hues already handed out, to guarantee uniqueness. */
const usedHues = new Set<number>(PINNED_HUES);

/** Two hues closer than this are too similar to tell apart at badge size. */
const MIN_HUE_SEPARATION = 12;

function isDistinct(hue: number): boolean {
  for (const used of usedHues) {
    const delta = Math.abs(hue - used);
    if (Math.min(delta, 360 - delta) < MIN_HUE_SEPARATION) return false;
  }
  return true;
}

/** Next free, visually distinct hue: palette first, then golden-angle rotation. */
function nextHue(): number {
  for (const hue of MODEL_PALETTE) {
    if (isDistinct(hue)) return hue;
  }
  // Palette exhausted — keep spiralling the colour wheel.
  for (let i = 1; i <= 720; i++) {
    const hue = Math.round((i * GOLDEN_ANGLE) % 360);
    if (isDistinct(hue)) return hue;
  }
  // Pathological case (hundreds of models): accept a near-duplicate.
  return Math.round((usedHues.size * GOLDEN_ANGLE) % 360);
}

/**
 * Assign colours to every model id, in order. Call once per page with the full,
 * date-sorted entry set so assignment is deterministic across builds. Safe to
 * call repeatedly — already-assigned models keep their hue.
 */
export function registerModels(ids: Iterable<string>): void {
  for (const id of ids) {
    if (MODEL_REGISTRY[id]?.hue !== undefined || assigned.has(id)) continue;
    const hue = nextHue();
    assigned.set(id, hue);
    usedHues.add(hue);
  }
}

/** Turn `claude-opus-4.6` into `Claude Opus 4.6` for unregistered ids. */
function prettifyModelId(id: string): string {
  return id
    .split(/[-_/\s]+/)
    .filter(Boolean)
    .map((part) =>
      /^(gpt|ai|llm|xai)$/i.test(part)
        ? part.toUpperCase()
        : /^\d/.test(part)
          ? part
          : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join(' ');
}

export interface ModelStyle {
  id: string;
  label: string;
  family?: string;
  hue: number;
  /** Inline custom properties consumed by the `.dl-model` badge styles. */
  cssVars: string;
}

/**
 * Resolve a model id to its label and colour. Falls back to assigning a hue on
 * the spot if `registerModels` has not seen this id yet, so it is never unstyled.
 */
export function getModelStyle(id: string): ModelStyle {
  const definition = MODEL_REGISTRY[id];
  if (definition?.hue === undefined && !assigned.has(id)) registerModels([id]);
  const hue = definition?.hue ?? assigned.get(id) ?? 38;

  return {
    id,
    label: definition?.label ?? prettifyModelId(id),
    family: definition?.family,
    hue,
    cssVars: [
      `--model-h:${hue}`,
      `--model-fg:hsl(${hue} 82% 74%)`,
      `--model-bg:hsl(${hue} 70% 55% / 0.13)`,
      `--model-border:hsl(${hue} 75% 62% / 0.42)`,
      `--model-dot:hsl(${hue} 85% 65%)`,
    ].join(';'),
  };
}
