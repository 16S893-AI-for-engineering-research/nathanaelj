import { resolvePath } from '@lib/paths';

export const walkthroughs = [
  {
    title: 'Swept-stroke initial arcs: one-scale AR tortuosity and the initial-arcs VTP snapshot',
    file: 'swept-stroke-initial-arcs-one-scale-ar-tortuosity-and-the-in.html',
    devLogSlug: 'backlog-round-1',
  },
  {
    title: 'How the initial-attachment stage is parallelised, and where it is still serial',
    file: 'how-the-initial-attachment-stage-is-parallelised-and-where-i.html',
    devLogSlug: 'fiddling-1',
  },
  {
    title: 'Initial attachment: whole-cell corona integration and two bisection searches',
    file: 'initial-attachment-whole-cell-corona-integration-and-two-bis.html',
    devLogSlug: 'core-review',
  },
  {
    title: 'How the swept-stroke stage moves and rewrites an arc',
    file: 'how-the-swept-stroke-stage-moves-and-rewrites-an-arc.html',
    devLogSlug: 'core-review',
  },
  {
    title: 'How swept-stroke arc points find their velocity cell',
    file: 'how-swept-stroke-arc-points-find-their-velocity-cell.html',
    devLogSlug: 'core-review',
  },
  {
    title: 'Zoning mapping: what the code actually computes',
    file: 'zoning-mapping-what-the-code-actually-computes.html',
    devLogSlug: 'core-review',
  },
  {
    title: 'Continuous corona-volume integration: definition and measured accuracy',
    file: 'continuous-corona-volume-integration-definition-and-measured.html',
    devLogSlug: 'walkthru-cont-int',
  },
].map(({ file, ...walkthrough }) => ({
  ...walkthrough,
  href: resolvePath(`/walkthroughs/${file}`),
}));
