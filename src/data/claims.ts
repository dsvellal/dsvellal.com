// Single source of truth for every number and quote on the site.
// Review status and evidence for each id are kept in the private archive.

export interface Change {
  from: number;
  to: number;
  /** Top of the scale both bars are drawn against; defaults to the larger value. */
  max?: number;
}

export interface Claim {
  id: string;
  value: string;
  label: string;
  /** Shorter label for tight spaces such as the hero. */
  short?: string;
  context: string;
  year?: string;
  /** My part in the result, in a few words. */
  role?: string;
  /** Public record entry that holds the evidence. */
  capsule?: string;
  /** Where to read more when no record entry holds the evidence. */
  href?: string;
  change?: Change;
}

export interface Quote {
  id: string;
  text: string;
  name?: string;
  role: string;
  company: string;
  year: string;
  context?: string;
  capsule?: string;
}

const claimList: Claim[] = [
  {
    id: 'years-experience',
    value: '19 years',
    label: 'building and leading software engineering',
    short: 'at IBM, Exeter, Amazon and Philips',
    context: 'Since 2007, across IBM, Exeter, Amazon and Philips.',
    year: '2007 to now',
    href: '/impact',
  },
  {
    id: 'traceability-effort',
    value: '~75%',
    label: 'less traceability and validation work per release (estimated)',
    context: 'Systems engineers estimated at the first demo that it could cut about 40 hours to about 10. Not yet measured.',
    year: '2026',
    role: 'Conceived and guided',
    href: '/work/ai-in-regulated-software',
  },
  {
    id: 'traceability-hours',
    value: '40h to 10h',
    label: 'estimated validation effort per release',
    context: 'Estimate by systems engineers at the first demo, not a measured result.',
    year: '2026',
    role: 'Conceived and guided',
    href: '/work/ai-in-regulated-software',
    change: { from: 40, to: 10 },
  },
  {
    id: 'traceability-adoption',
    value: '14',
    label: 'businesses running the AI traceability platform in production',
    short: 'businesses run the AI traceability platform I conceived',
    context: 'Grew from a first pilot business in early 2026.',
    year: '2026',
    role: 'Conceived and guided',
    capsule: '2026-09-traceability-platform-14-businesses',
  },
  {
    id: 'platform-nps',
    value: '10/10',
    label: 'NPS for the platform, from two businesses',
    context: 'Reported by the program leader, who called each score a bull\'s eye.',
    year: '2026',
    role: 'Led',
    capsule: '2026-05-nps-10-two-businesses',
  },
  {
    id: 'ai-issues-triaged',
    value: '~3,000',
    label: 'issues triaged with AI on live Ultrasound data',
    context: 'A defect-triage proof of concept I coordinated across engineering, architecture, infrastructure and test experts.',
    year: '2026',
    role: 'Coordinated',
    capsule: '2026-06-triage-poc-3000-issues',
  },
  {
    id: 'ai-people-trained',
    value: '1,000+',
    label: 'engineers, managers and analysts in AI sessions in 2026',
    short: 'people I trained in AI in 2026',
    context: 'From January to September 2026: 12 Philips University courses, 13 sessions requested by teams across the company, and 2 at Innovation Impact Week.',
    year: '2026',
    role: 'Taught',
    capsule: '2026-ai-sessions-27',
  },
  {
    id: 'ai-sessions-rating',
    value: '8.7 / 10',
    label: 'average participant rating',
    context: 'Across 22 scored sessions in 2026.',
    year: '2026',
    capsule: '2026-ai-sessions-27',
  },
  {
    id: 'copilot-reach',
    value: '4,103',
    label: 'people saw the announcement of my AI-assisted coding course',
    context: 'Views of the Philips University announcement, not attendees.',
    year: '2025',
    role: 'Created the course',
    capsule: '2025-02-copilot-session-4103-views',
  },
  {
    id: 'pu-learners',
    value: '492',
    label: 'learners in the 2025 Philips University program I led',
    context: '33 sessions, rated 8.9 out of 10 on average. I taught 23 of them.',
    year: '2025',
    role: 'Led',
    capsule: '2025-philips-university-program',
  },
  {
    id: 'trainers-trained',
    value: '34',
    label: 'trainers trained so teams could lead their own AI adoption',
    context: 'One team that took the class went on to lead its own AI work and speed up releases.',
    year: '2025',
    role: 'Trained',
    capsule: '2025-06-copilot-train-the-trainer',
  },
  {
    id: 'ai-confidence',
    value: '4.5 to 7.6',
    label: 'self-rated AI confidence out of 10, after a three-day workshop',
    context: 'One engineering team, surveyed before and after.',
    year: '2025',
    role: 'Designed and taught',
    capsule: '2025-12-plymouth-genai-workshop',
    change: { from: 4.5, to: 7.6, max: 10 },
  },
  {
    id: 'ai-portfolio-potential',
    value: '€3.5M a year',
    label: 'potential efficiencies across a portfolio of 8 AI initiatives, one of them mine',
    context: 'Reported by an internal innovation program as potential annual value. It is not realized savings, and not mine alone.',
    year: '2026',
    role: 'Led one of eight',
  },
  {
    id: 'developers-platform',
    value: '4,500+',
    label: 'developers reached by shared engineering platforms and standards',
    context: 'By 2023, across business units and global hubs.',
    year: '2023',
  },
  {
    id: 'cycle-time',
    value: '~60%',
    label: 'shorter release time in the continuous value delivery program I led',
    context: 'Result for the participating teams.',
    year: 'By 2022',
    role: 'Led',
  },
  {
    id: 'infra-savings',
    value: '~$300K',
    label: 'in infrastructure savings',
    context: 'From automation work with US engineering teams.',
    year: 'By 2023',
    role: 'Directed',
  },
  {
    id: 'quality-defects',
    value: '37 to 0.11',
    label: 'customer defects per 100 exams in a global quality program',
    context: 'The app rating rose from 2.3 to 4.5 over the same program. I set its KPIs and oversaw implementation.',
    year: 'By 2022',
    role: 'Set KPIs and oversaw',
    change: { from: 37, to: 0.11 },
  },
  {
    id: 'app-rating',
    value: '2.3 to 4.5',
    label: 'app store rating on the same product',
    context: 'Same program and product as the defect result.',
    year: 'By 2022',
    role: 'Set KPIs and oversaw',
    change: { from: 2.3, to: 4.5, max: 5 },
  },
  {
    id: 'craftsmanship-score',
    value: '67 to 78',
    label: 'average craftsmanship assessment score',
    context: 'Across the assessment program I was accountable for.',
    year: 'By 2022',
    role: 'Accountable',
    capsule: '2022-craftsmanship-assessment-67-to-78',
    change: { from: 67, to: 78, max: 100 },
  },
  {
    id: 'craftsmanship-projects',
    value: '138',
    label: 'projects in the 2023 State of Software Craftsmanship report I lead-authored',
    context: 'Part of a program reaching over 80% of the company software engineers. Published 2024.',
    year: '2023',
    role: 'Lead author',
    capsule: '2023-state-of-software-craftsmanship-report',
  },
  {
    id: 'test-coverage',
    value: '63% to 86%',
    label: 'unit-test coverage in six months, with no extra people',
    context: 'On an identity management product, recorded in my 2019 review.',
    year: '2019',
    role: 'Led',
    capsule: '2019-03-idm-devops-progress-to-chief-architect',
    change: { from: 63, to: 86, max: 100 },
  },
  {
    id: 'scanner-setup',
    value: 'Months to minutes',
    label: 'to connect a project to the required security scanner',
    context: 'Reusable workflows made it self-service for any product team.',
    year: '2022',
    role: 'Led',
    capsule: '2022-innersource-adoption-carrier-businesses',
  },
  {
    id: 'sprint-completion',
    value: '50-60% to 85%',
    label: 'sprint task completion after a process change I designed',
    context: 'Recognized with an Amazon spot award.',
    year: '2017',
    role: 'Designed',
    capsule: '2017-11-spot-award-process-improvement',
    // Top of the starting range, so the bars understate the change.
    change: { from: 60, to: 85, max: 100 },
  },
  {
    id: 'techdebt-savings',
    value: '~€2.1M',
    label: 'realized savings from a technical debt and resource optimization program in 2021',
    short: 'realized savings in 2021, from a program I coached',
    context: 'I was lead coach for the program across teams.',
    year: '2021',
    role: 'Lead coach',
    capsule: '2021-tech-debt-savings-program',
  },
  {
    id: 'techdebt-opportunity',
    value: '~€3.45M',
    label: 'further savings identified',
    context: 'Identified in 2021 as future savings, not realized.',
    year: '2021',
    role: 'Lead coach',
    capsule: '2021-tech-debt-savings-program',
  },
  {
    id: 'team-scope',
    value: 'Across Philips',
    label: 'supervisory leadership of software competency experts in India and North America',
    context: 'Throughout my Philips career, with responsibilities for delegation, timelines, hiring recommendations and annual performance reviews.',
  },
  {
    id: 'engineers-mentored',
    value: '30+',
    label: 'engineers mentored who went on to senior technical leadership roles',
    context: 'Mentoring alongside my role.',
  },
  {
    id: 'candidate-nps',
    value: '+18%',
    label: 'candidate NPS after redesigning senior hiring',
    context: 'Asked by the India site leader to fix senior hiring. Hiring-manager NPS rose 15%.',
    year: '2021',
    role: 'Led',
    capsule: '2021-senior-hiring-redesign',
  },
  {
    id: 'amazon-interviews',
    value: '68',
    label: 'interviews in 16 months at Amazon',
    context: 'Later a global hiring bar-raiser at Philips.',
    year: '2017 to 2018',
  },
  {
    id: 'talks-count',
    value: '150+',
    label: 'talks, workshops and training sessions since 2010',
    context: 'At IBM, Exeter, Amazon and Philips, and at more than 25 colleges.',
    href: '/talks',
  },
  {
    id: 'pu-program',
    value: '33',
    label: 'training sessions in the 2025 Philips University skill-building program I led',
    context: '492 learners, 8.9 out of 10 average rating. I taught 23 of them myself.',
    year: '2025',
    capsule: '2025-philips-university-program',
  },
  {
    id: 'talks-attendees',
    value: '5,000+',
    label: 'people in those sessions',
    context: 'Counting only sessions with a recorded headcount; most internal sessions record feedback responses only.',
    href: '/talks',
  },
  {
    id: 'patents',
    value: '1 + 1',
    label: 'granted US patent and published US application',
    context: 'US 8,560,487 B2 and US 2015/0095117 A1, from IBM.',
    capsule: '2013-us-patent-granted',
  },
  {
    id: 'patent-citations',
    value: '27',
    label: 'later patents cite my granted US patent',
    context: 'US 8,560,487 B2, from my time at IBM. It also has 8 non-patent citations.',
    year: '2013',
    capsule: '2013-us-patent-granted',
  },
  {
    id: 'cto-award',
    value: '~30',
    label: 'people worldwide named for the CTO Outstanding Technical Achievement Award in 2021, and I was one',
    context: 'Cited for teaching coding to compliance officers and for a data-driven hiring framework.',
    year: '2021',
    capsule: '2021-02-cto-outstanding-achievement-award',
  },
  {
    id: 'book-drive',
    value: '₹9.6 lakh+',
    label: 'raised for books for rural schools over 9 community drives',
    context: 'Grew from ₹37,500 in 2015 to ₹2.35 lakh in 2026, with colleagues and friends contributing.',
    capsule: '2026-book-drive',
  },
];

const quoteList: Quote[] = [
  {
    id: 'q-nicholson-leader',
    text: 'Datta is a natural leader who inspires and motivates people across all levels, regardless of reporting lines, seniority, or team boundaries.',
    name: 'Rob Nicholson',
    role: 'Former head of worldwide Software Excellence, and my manager',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
    capsule: '2025-02-linkedin-recommendation-former-manager',
  },
  {
    id: 'q-nicholson-dora',
    text: 'His efforts have led to significant improvements in our DORA metrics for both traditional software and SaaS projects.',
    name: 'Rob Nicholson',
    role: 'Former head of worldwide Software Excellence, and my manager',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
    capsule: '2025-02-linkedin-recommendation-former-manager',
  },
  {
    id: 'q-qpm-vision',
    text: "Datta's communication and collaboration style is very positive and always looking for opportunities. It is simply lovely to collaborate with him. His vision is inspiring.",
    role: 'Quality Program Manager',
    company: 'Philips',
    year: '2026',
    capsule: '2026-09-traceability-platform-14-businesses',
  },
  {
    id: 'q-watson-influence',
    text: 'I discovered that Datta is a master of leading digital transformation through influence.',
    name: 'Ian Watson',
    role: 'Software Excellence colleague',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
    capsule: '2025-02-linkedin-recommendation-colleague',
  },
  {
    id: 'q-vieira-hired',
    text: 'I had the distinct professional experience of being hired by Datta, who subsequently became a valued colleague during my tenure at Philips. I recommend him for any software management position.',
    name: 'Fernando José Vieira',
    role: 'Principal engineer, hired by me',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
    capsule: '2025-05-linkedin-recommendation-engineer-hired',
  },
  {
    id: 'q-vieira-sponsorship',
    text: 'His ability to report on projects involving software development or CI/CD in a manner accessible to C-level executives consistently garnered substantial corporate sponsorship.',
    name: 'Fernando José Vieira',
    role: 'Principal engineer, hired by me',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
    capsule: '2025-05-linkedin-recommendation-engineer-hired',
  },
  {
    id: 'q-patient-safety-evp',
    text: 'Keep leading the way! Thank you for the collaboration!',
    role: 'Executive VP and Chief Patient Safety and Quality Officer',
    company: 'Philips',
    year: '2026',
    context: 'Public note to Datta and team on AI prompts for requirements compliance.',
  },
  {
    id: 'q-ultrasound',
    text: 'His domain expertise and structured approach transformed ambiguity into an actionable, transparent roadmap.',
    role: 'Systems Test Architect, Ultrasound',
    company: 'Philips',
    year: '2026',
  },
  {
    id: 'q-analytics',
    text: "These sessions are attended by 100-150 analysts across various organizations, and Datta's sessions have been the top recommended material this year.",
    role: 'Business Intelligence Lead, North America Analytics',
    company: 'Philips',
    year: '2026',
    capsule: '2026-06-analytics-community-series',
  },
  {
    id: 'q-architect-estimate',
    text: 'They guesstimated that it could reduce traceability efforts including validation from approximately 40 hours per release to around 10 hours.',
    role: 'Senior Software Architect',
    company: 'Philips',
    year: '2026',
  },
  {
    id: 'q-radiology-architect',
    text: 'Your deep ecosystem knowledge of software and technologies, combined with your remarkable cross-functional insight, truly stood out.',
    role: 'Software Architect, Radiology Informatics',
    company: 'Philips',
    year: '2024',
  },
];

export const claims: Record<string, Claim> = Object.fromEntries(claimList.map((c) => [c.id, c]));
export const quotes: Record<string, Quote> = Object.fromEntries(quoteList.map((q) => [q.id, q]));

export function claim(id: string): Claim {
  const c = claims[id];
  if (!c) throw new Error(`Unknown claim id: ${id}`);
  return c;
}

export function quote(id: string): Quote {
  const q = quotes[id];
  if (!q) throw new Error(`Unknown quote id: ${id}`);
  return q;
}

export interface EraSessions {
  slug: string;
  years: string;
  employer: string;
  sessions: number;
  highlight: string;
}

// Delivered sessions with a dated source, counted from the private sessions log.
export const sessionsByEra: EraSessions[] = [
  {
    slug: 'ibm-india',
    years: '2007 to 2013',
    employer: 'IBM',
    sessions: 12,
    highlight: 'A national conference paper, an IBM technical webinar, Hackday briefings, and my first college seminars.',
  },
  {
    slug: 'exeter-india',
    years: '2013 to 2015',
    employer: 'Exeter',
    sessions: 20,
    highlight: 'Design patterns training for engineers at work, and 15 seminars and workshops at colleges.',
  },
  {
    slug: 'amazon-india',
    years: '2016 to 2018',
    employer: 'Amazon',
    sessions: 10,
    highlight: 'Scrum and product ownership workshops rated up to 4.6 out of 5, alongside talks for students.',
  },
  {
    slug: 'philips-india',
    years: '2018 to 2021',
    employer: 'Philips India',
    sessions: 52,
    highlight: 'Clean code, unit testing and duplication workshops, seven bar-raiser training cohorts, and a 500-person conference panel.',
  },
  {
    slug: 'philips-north-america',
    years: '2021 to now',
    employer: 'Philips North America',
    sessions: 65,
    highlight: 'GitHub and Copilot courses, the 2025 Philips University program with 492 learners, and 27 AI sessions in 2026.',
  },
];
