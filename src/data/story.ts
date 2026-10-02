// How the landing page tells the story. Every number here is a claim id from claims.ts.

/** The one number under the headline, then a strip of three more. */
export const heroLead = 'ai-people-trained';
export const heroStrip = ['traceability-adoption', 'techdebt-savings', 'years-experience'];

export interface LadderStep {
  step: string;
  note: string;
  claims: string[];
}

export const adoptionLadder: LadderStep[] = [
  { step: 'Reached', note: 'People who saw the course', claims: ['copilot-reach'] },
  { step: 'Coached', note: 'People in the room', claims: ['pu-learners', 'ai-people-trained'] },
  { step: 'Teaching others', note: 'People who now run their own sessions', claims: ['trainers-trained'] },
  { step: 'Using it at work', note: 'AI in regulated engineering work', claims: ['traceability-adoption', 'ai-issues-triaged'] },
];

export interface Signal {
  text: string;
  year: string;
  where: 'philips' | 'beyond';
  capsule?: string;
  href?: string;
  /** Shown under the headline on the landing page. */
  seal?: boolean;
}

export const signals: Signal[] = [
  {
    text: 'CTO Outstanding Technical Achievement Award, one of about 30 worldwide',
    year: '2021',
    where: 'philips',
    capsule: '2021-02-cto-outstanding-achievement-award',
    seal: true,
  },
  {
    text: 'Presented the AI traceability platform to the Philips Executive Committee',
    year: '2026',
    where: 'philips',
    seal: true,
  },
  {
    text: 'Inventor on a US patent cited by 27 later patents',
    year: '2013',
    where: 'beyond',
    capsule: '2013-us-patent-granted',
    seal: true,
  },
  {
    text: 'Two businesses scored the AI platform 10 out of 10',
    year: '2026',
    where: 'philips',
    capsule: '2026-05-nps-10-two-businesses',
  },
  {
    text: '"Keep leading the way!" from the Executive VP and Chief Patient Safety and Quality Officer',
    year: '2026',
    where: 'philips',
    href: '/endorsements',
  },
  {
    text: 'The platform team was recognized as "Impact Makers" at a global town hall',
    year: '2026',
    where: 'philips',
  },
  {
    text: 'Named solution architect for the contextual intelligence layer in the 2027 resource model',
    year: '2026',
    where: 'philips',
    capsule: '2026-09-named-solution-architect',
  },
  {
    text: 'Speaker at The Developers Conference, Brazil',
    year: '2021',
    where: 'beyond',
    capsule: '2021-06-tdc-brazil-shift-left-talk',
  },
  {
    text: 'First of 45 teams at a global Amazon catalog hackathon',
    year: '2016',
    where: 'beyond',
    capsule: '2016-08-catalog-hackathon-first-place',
  },
  {
    text: 'Guest sessions at more than 25 colleges',
    year: '2010 to 2021',
    where: 'beyond',
    href: '/talks',
  },
  {
    text: 'Leadership Advisor recognition from Toastmasters International, District 82',
    year: '2013',
    where: 'beyond',
    capsule: '2013-11-toastmasters-leadership-advisor',
  },
];

export const readingPaths = [
  {
    href: '/impact#usa',
    title: 'Hiring for AI transformation',
    body: 'Start with the responsible use of AI in regulated medical software at Philips North America: the traceability platform, the coaching and the pilots.',
  },
  {
    href: '/impact/philips-north-america/2026',
    title: 'Working with me at Philips',
    body: 'See 2026 month by month: the platform, the pilots and the teaching.',
  },
  {
    href: '/talks',
    title: 'Planning an event',
    body: 'Talks, topics and participant ratings since 2010.',
  },
];
