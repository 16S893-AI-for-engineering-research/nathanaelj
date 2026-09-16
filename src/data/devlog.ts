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
    slug: 'portfolio-setup',
    title: 'Portfolio Setup',
    date: '2026-09-10',
    summary:
      'Created this portfolio site using Astro + Tailwind with a custom lightning animation.',
    models: ['haiku-4.5'],
    metrics: {
      userMessages: 20,
      assistantMessages: 224,
      toolCalls: 194,
      totalCostUsd: 4.307,
    },
    description: {
      keyChanges: [
        'Scaffolded the site with **Astro** and styled it with **Tailwind CSS**',
        'Created `Home`, `About`, `Project`, and `Dev-log` pages',
        'Added custom **lightning animation** to the homepage',
        'Defined sunrise-inspired theme using **Tailwind CSS**',
      ],
      agentSuccesses: [
        'Initially had **good advice** on which framework(s) to use',
        'Followed instructions to implement a **lightweight site** using Astro',
      ],
      agentFailures: [
        'Had a weird moment where it decided to start making several (>7) markdown files with **developer notes** about setup/ next steps/ debugging/ troubleshooting, all **unprompted**. Had to stop it manually to get things under control.',
        'Models (I used Haiku mostly, with a brief adventure into Sonnet) struggled to understand some basic fundamentals of frontend design, particularly getting confused several times by **margins and padding**.',
        'Also struggled a lot with **geometry** for the lightning model, and reverted to giving it some research code for inspiration.',
        'Probably faster than I could\'ve managed myself, but the models made several **silly mistakes** (although I also didn\'t put much thought into my prompting and definitely could have improved that too).',
      ],
    },
  },


  {
    slug: 'portfolio-setup-completion',
    title: 'Adding Content',
    date: '2026-09-11',
    summary:
      'Fixed formatting issues, implemented 3 easter eggs, and added content to the About page.',
    models: ['haiku-4.5', 'sonnet-5', 'gemini-3.1-pro', 'sonnet-4.6'],
    metrics: {
      userMessages: 36,
      assistantMessages: 309,
      toolCalls: 271,
      totalCostUsd: 7.757,
    },
    description: {
      keyChanges: [
        'Fixed issues with the **lightning animation** on the homepage',
        'Fixed **formatting issues** with scrolling and layout',
        'Attempted to move pages into **markdown** for easy editing. Went back on that change after realizing it limited my control over the pages',
        'Fixed an issue with link paths in dev vs production modes, so that links work in dev and build',
        'Added three **easter eggs** (airplane cursor, lightning strike to cursor, and aircraft fly-by) using `gemini-3-1-pro` model',
        'Added content to the `About` page',
      ],
      agentSuccesses: [
        '(Eventually) solved formatting issues',
        'Helped brainstorm, and then implement, **easter eggs**',
        'Correctly implemented my idea for **markdown** pages, even though it was a bad idea on my part',
        'Constructed a good `About` page based on a one-paragraph description and some uploaded photos',
      ],
      agentFailures: [
        'Agents remained somewhat confused about formatting, especially **margins and padding**',
        'Implementing the targeted lightning strike easter egg took a long time because of margin/ padding confusion',
        'Writing on the `About` page had a **snarky tone** that I had to adjust manually'
      ],
    },
  },


  {
    slug: 'dev-log-restructure',
    title: 'Dev Log Restructure',
    date: '2026-09-15',
    summary:
      'Rebuilt the dev log to include metrics on agent calls and individual pages for each entry.',
    models: ['opus-5', 'sonnet-5'],
    metrics: {
      userMessages: 7,
      assistantMessages: 126,
      toolCalls: 140,
      totalCostUsd: 4.3257,
    },
    description: {
      keyChanges: [
        'Replaced the single hand-written dev-log page with a typed data layer in `src/data/devlog.ts`',
        'Added a summary list view including agent call statistics',
        'Added sorting/ filtering capabilities, and individual pages for each entry',
        'Restructured entry content into three sections: **key changes**, **agent successes** and **agent failures**.',
      ],
      agentSuccesses: [
        '`claude-opus-5` and `claude-sonnet-5` are **much more capable** than smaller models (`claude-haiku-4-5`), requiring only a few user messages',
        'Implemented **sorting and filtering** logic quickly',
        'Created a single `devlog.ts` file that makes it easy to add dev-log entries',
      ],
      agentFailures: [
        'These larger agents actually went too far \'above and beyond\', adding features that I did not ask for that **over-complicated** the page and had to be removed',
        'My wifi cut out a couple of times, interrupting our conversations',
        'Again, it took several attempts for the agent to understand and fix a relatively simple **padding issue**'
      ],
    },
  },
];
