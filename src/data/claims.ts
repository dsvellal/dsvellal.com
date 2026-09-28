// Single source of truth for every number and quote on the site.
// Review status and evidence for each id are kept in the private archive.

export interface Claim {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface Quote {
  id: string;
  text: string;
  name?: string;
  role: string;
  company: string;
  year: string;
  context?: string;
}

const claimList: Claim[] = [
  {
    id: 'years-experience',
    value: '19 years',
    label: 'building and leading software engineering',
    context: 'Since 2007, across IBM, Exeter, Amazon and Philips.',
  },
  {
    id: 'traceability-effort',
    value: '~75%',
    label: 'less traceability and validation work per release (estimated)',
    context: 'Systems engineers estimated at the first demo that it could cut about 40 hours to about 10. Not yet measured.',
  },
  {
    id: 'traceability-hours',
    value: '40h to 10h',
    label: 'estimated validation effort per release',
    context: 'Estimate by systems engineers at the first demo, not a measured result.',
  },
  {
    id: 'traceability-adoption',
    value: '14',
    label: 'businesses using the traceability platform in production',
    context: 'Grew from a first pilot business in early 2026.',
  },
  {
    id: 'ai-people-trained',
    value: '1,000+',
    label: 'engineers, managers and analysts in AI sessions in 2026',
    context: 'From January to September 2026: 12 Philips University courses, 13 sessions requested by teams across the company, and 2 at Innovation Impact Week.',
  },
  {
    id: 'ai-sessions-rating',
    value: '8.7 / 10',
    label: 'average participant rating',
    context: 'Across 22 scored sessions in 2026.',
  },
  {
    id: 'developers-platform',
    value: '4,500+',
    label: 'developers reached by shared engineering platforms and standards',
    context: 'By 2023, across business units and global hubs.',
  },
  {
    id: 'cycle-time',
    value: '~60%',
    label: 'shorter release time in the continuous value delivery program I led',
    context: 'Result for the participating teams.',
  },
  {
    id: 'infra-savings',
    value: '~$300K',
    label: 'in infrastructure savings',
    context: 'From automation work with US engineering teams.',
  },
  {
    id: 'quality-defects',
    value: '37 to 0.11',
    label: 'customer defects per 100 exams in a global quality program',
    context: 'The app rating rose from 2.3 to 4.5 over the same program. I set its KPIs and oversaw implementation.',
  },
  {
    id: 'craftsmanship-projects',
    value: '138',
    label: 'projects in the 2023 State of Software Craftsmanship report I lead-authored',
    context: 'Part of a program reaching over 80% of the company software engineers. Published 2024.',
  },
  {
    id: 'techdebt-savings',
    value: '~€2M',
    label: 'realized savings from a technical debt and resource optimization program in 2021',
    context: 'I was lead coach for the program across teams.',
  },
  {
    id: 'techdebt-opportunity',
    value: '~€3M',
    label: 'further savings opportunity identified',
    context: 'Identified in 2021 as future savings, not revenue.',
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
  },
  {
    id: 'amazon-interviews',
    value: '68',
    label: 'interviews in 16 months at Amazon',
    context: 'Later a global hiring bar-raiser at Philips.',
  },
  {
    id: 'talks-count',
    value: '150+',
    label: 'talks, workshops and training sessions since 2010',
    context: 'At IBM, Exeter, Amazon and Philips, and at more than 25 colleges.',
  },
  {
    id: 'pu-program',
    value: '33',
    label: 'training sessions in the 2025 Philips University skill-building program I led',
    context: '492 learners, 8.9 out of 10 average rating. I taught 23 of them myself.',
  },
  {
    id: 'talks-attendees',
    value: '5,000+',
    label: 'people in those sessions',
    context: 'Counting only sessions with a recorded headcount; most internal sessions record feedback responses only.',
  },
  {
    id: 'patents',
    value: '1 + 1',
    label: 'granted US patent and published US application',
    context: 'US 8,560,487 B2 and US 2015/0095117 A1, from IBM.',
  },
  {
    id: 'book-drive',
    value: '₹9.6 lakh+',
    label: 'raised for books for rural schools over 9 community drives',
    context: 'Grew from ₹37,500 in 2015 to ₹2.35 lakh in 2026, with colleagues and friends contributing.',
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
  },
  {
    id: 'q-nicholson-dora',
    text: 'His efforts have led to significant improvements in our DORA metrics for both traditional software and SaaS projects.',
    name: 'Rob Nicholson',
    role: 'Former head of worldwide Software Excellence, and my manager',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
  },
  {
    id: 'q-qpm-vision',
    text: "Datta's communication and collaboration style is very positive and always looking for opportunities. It is simply lovely to collaborate with him. His vision is inspiring.",
    role: 'Quality Program Manager',
    company: 'Philips',
    year: '2026',
  },
  {
    id: 'q-watson-influence',
    text: 'I discovered that Datta is a master of leading digital transformation through influence.',
    name: 'Ian Watson',
    role: 'Software Excellence colleague',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
  },
  {
    id: 'q-vieira-hired',
    text: 'I had the distinct professional experience of being hired by Datta, who subsequently became a valued colleague during my tenure at Philips. I recommend him for any software management position.',
    name: 'Fernando José Vieira',
    role: 'Principal engineer, hired by me',
    company: 'Philips',
    year: '2025',
    context: 'Public LinkedIn recommendation.',
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
  years: string;
  employer: string;
  sessions: number;
  highlight: string;
}

// Delivered sessions with a dated source, counted from the private sessions log.
export const sessionsByEra: EraSessions[] = [
  {
    years: '2007 to 2013',
    employer: 'IBM',
    sessions: 12,
    highlight: 'A national conference paper, an IBM technical webinar, Hackday briefings, and my first college seminars.',
  },
  {
    years: '2013 to 2015',
    employer: 'Exeter',
    sessions: 20,
    highlight: 'Design patterns training for engineers at work, and 15 seminars and workshops at colleges.',
  },
  {
    years: '2016 to 2018',
    employer: 'Amazon',
    sessions: 10,
    highlight: 'Scrum and product ownership workshops rated up to 4.6 out of 5, alongside talks for students.',
  },
  {
    years: '2018 to 2021',
    employer: 'Philips India',
    sessions: 52,
    highlight: 'Clean code, unit testing and duplication workshops, seven bar-raiser training cohorts, and a 500-person conference panel.',
  },
  {
    years: '2021 to now',
    employer: 'Philips North America',
    sessions: 65,
    highlight: 'GitHub and Copilot courses, the 2025 Philips University program with 492 learners, and 27 AI sessions in 2026.',
  },
];
