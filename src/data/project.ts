export interface ProjectMilestone {
  number: number;
  title: string;
  tagline: string;
  date: string;
  summary: string;
  slug: string;
  stage: string;
  status: 'completed' | 'in-progress' | 'planned';
  image?: string;
  graphicType?: 'plasma' | 'agent' | 'custom';
}

export const projectMilestones: ProjectMilestone[] = [
  {
    number: 1,
    title: 'Background',
    tagline: 'Aircraft Lightning Zoning',
    date: 'September 2026',
    summary:
      'Aircraft lightning attachment physics, zoning, and novel simulation tools. A primer for my project proposal.',
    slug: '/project/background',
    stage: 'Phase 01',
    status: 'completed',
    graphicType: 'plasma',
  },
  {
    number: 2,
    title: 'Proposal',
    tagline: 'Implementing Computational Models for Aircraft Lightning Zoning',
    date: 'September 2026',
    summary:
      '',
    slug: '/project/proposal',
    stage: 'Phase 02',
    status: 'completed',
  },
  {
    number: 3,
    title: 'Warm-up',
    tagline: 'Testing agent capabilities by reproducing simple results',
    date: 'September 2026',
    summary: '',
    slug: '/project/reproducing-work',
    stage: 'Phase 03',
    status: 'completed',
  },
];
