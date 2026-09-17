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
    tagline: 'Aircraft Lightning Physics & Simulation Challenges',
    date: 'February 2025',
    summary:
      'Foundational physics of lightning attachment to aircraft, limitations of conventional finite-element simulations, and the motivation for new computational paradigms in plasma-structure interaction.',
    slug: '/project/background',
    stage: 'Phase 01',
    status: 'completed',
    graphicType: 'plasma',
  },
  {
    number: 2,
    title: 'Proposal',
    tagline: 'Autonomous AI Agents for High-Fidelity Plasma Modeling',
    date: 'February 2025',
    summary:
      'A multi-agent framework orchestrating mesh generation, boundary condition calibration, surrogate model training, and validation against experimental lightning strike telemetry.',
    slug: '/project/proposal',
    stage: 'Phase 02',
    status: 'completed',
    graphicType: 'agent',
  },
];
