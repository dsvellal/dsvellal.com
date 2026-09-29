// How the landing page tells the story. Every number here is a claim id from claims.ts.

export const heroProof = ['traceability-adoption', 'ai-people-trained', 'techdebt-savings', 'years-experience'];

export interface ArcStep {
  era: string;
  employer: string;
  years: string;
  /** Start and end as decimal years, used to size each column. */
  start: number;
  end: number;
  scope: string;
  milestone: string;
  capsule: string;
}

// Each step is a wider scope of work than the one before. The height is an order, not a measurement.
export const arc: ArcStep[] = [
  {
    era: 'ibm-india',
    employer: 'IBM',
    years: '2007 to 2013',
    start: 2007.5,
    end: 2013.2,
    scope: 'A product component, worldwide',
    milestone: 'Worldwide lead for an IBM product component',
    capsule: '2010-12-promoted-worldwide-webcontainer-lead',
  },
  {
    era: 'exeter-india',
    employer: 'Exeter',
    years: '2013 to 2015',
    start: 2013.3,
    end: 2015.9,
    scope: 'Delivery teams on two continents',
    milestone: 'Anchored a next-generation platform across three teams',
    capsule: '2015-10-anchored-next-gen-platform',
  },
  {
    era: 'amazon-india',
    employer: 'Amazon',
    years: '2016 to 2018',
    start: 2016.1,
    end: 2018.6,
    scope: 'Payments fraud checks for a national launch',
    milestone: 'Led the fraud check for the Amazon Pay India launch',
    capsule: '2017-04-amazon-pay-one-account-check',
  },
  {
    era: 'philips-india',
    employer: 'Philips India',
    years: '2018 to 2021',
    start: 2018.7,
    end: 2021.9,
    scope: 'Engineering practice across business units',
    milestone: 'Lead coach for a technical debt program that realized ~€2.1M',
    capsule: '2021-tech-debt-savings-program',
  },
  {
    era: 'philips-north-america',
    employer: 'Philips North America',
    years: '2021 to now',
    start: 2021.9,
    end: 2026.8,
    scope: 'AI and engineering practice across businesses',
    milestone: 'Took an AI traceability platform to 14 businesses',
    capsule: '2026-09-traceability-platform-14-businesses',
  },
];

export const arcThemes = [
  { id: 'quality', label: 'Quality' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'ai', label: 'AI' },
];

export interface LedgerGroup {
  group: string;
  rows: string[];
  /** How many rows the landing page shows; the Impact page shows them all. */
  lead: number;
}

export const ledger: LedgerGroup[] = [
  { group: 'Money', rows: ['techdebt-savings', 'techdebt-opportunity', 'infra-savings', 'ai-portfolio-potential'], lead: 2 },
  { group: 'Time', rows: ['cycle-time', 'traceability-hours', 'scanner-setup', 'ai-issues-triaged'], lead: 2 },
  { group: 'Quality', rows: ['quality-defects', 'craftsmanship-score', 'test-coverage', 'sprint-completion', 'candidate-nps'], lead: 2 },
  { group: 'Adoption', rows: ['traceability-adoption', 'platform-nps', 'ai-people-trained', 'trainers-trained'], lead: 2 },
];

export interface LadderStep {
  step: string;
  note: string;
  claims: string[];
}

export const adoptionLadder: LadderStep[] = [
  { step: 'Reached', note: 'People who saw the course', claims: ['copilot-reach'] },
  { step: 'Trained', note: 'People in the room', claims: ['pu-learners', 'ai-people-trained'] },
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
    href: '/work/ai-in-regulated-software',
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
    href: '/work/ai-in-regulated-software',
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
    href: '/work/ai-in-regulated-software',
    title: 'Hiring for AI transformation',
    body: 'Read the four case studies, starting with AI in regulated software.',
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
