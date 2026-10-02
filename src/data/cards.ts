// Visual cards for the Impact page and the landing introduction.
// Entries without an override get a card built from their record fields in lib/cards.ts.

export type Slot = 'usa' | 'india' | 'amazon' | 'exeter' | 'ibm' | 'beyond';
export type Ground = 'paper' | 'ink' | 'accent';

export type Viz =
  | { type: 'units'; rows: { label?: string; n: number; m?: number; o?: number }[] }
  | { type: 'pairs'; sets: { title?: string; max: number; rows: { t: string; v: number; hi?: boolean; out?: boolean }[] }[] }
  | { type: 'meter'; label?: string; v: number; max: number }
  | { type: 'bars'; caption?: string; h?: number; items: { x: string; v: number; t?: string; sub?: string; hi?: boolean }[] }
  | { type: 'cum'; caption: string; labels: string[]; values: number[] }
  | { type: 'ladder'; steps: { w: string; t: string; hi?: boolean }[] }
  | { type: 'waffle'; marked: number; caption: string }
  | { type: 'grade'; scale: string[]; from: string; to: string }
  | { type: 'lolli'; min: number; max: number; points: { x: string; v: number; sub?: string; hi?: boolean }[] }
  | { type: 'strokes'; n: number; caption: string }
  | { type: 'stats'; items: { v: string; l: string }[] }
  | { type: 'quote'; text: string; who: string }
  | { type: 'story'; rows: { k: string; v: string }[] }
  | { type: 'wall'; imgs: { src: string; alt: string }[] };

export interface CardImage {
  src: string;
  alt: string;
  pos?: string;
}

export interface CardSpec {
  id: string;
  slot: Slot;
  /** YYYY-MM, used for ordering. */
  date: string;
  when: string;
  ground: Ground;
  value?: string;
  what?: string;
  /** Headline for cards without a big number. */
  head?: string;
  viz: Viz[];
  img?: CardImage | null;
  title?: string;
  note?: string;
  chips?: string[];
  /** Highlighted first evidence chip, such as the responsible-AI marker. */
  mark?: string;
  href: string;
  /** Extra rail pins (YYYY or YYYY-MM) and companies, for cards that span several sessions. */
  pins?: string[];
  slots?: Slot[];
  /** Dateline label in place of the single company name. */
  where?: string;
  /** Footer link text. */
  go?: string;
}

export type CardOverride = Partial<Omit<CardSpec, 'id' | 'slot' | 'href' | 'date'>>;

const img = (file: string, alt: string, pos?: string): CardImage => ({ src: `/record/published/${file}`, alt, pos });

const scrum = (hi: string): Viz => ({
  type: 'lolli',
  min: 4,
  max: 5,
  points: [
    { x: 'Nov 16', sub: '28 people', v: 4.12, hi: hi === 'Nov 16' },
    { x: 'Dec 16', sub: '31', v: 4.47, hi: hi === 'Dec 16' },
    { x: 'Oct 17', sub: '21', v: 4.6, hi: hi === 'Oct 17' },
    { x: 'Jul 18', sub: 'Top trainer', v: 4.57, hi: hi === 'Jul 18' },
  ],
});

const ibmRoles = (hi: string): Viz => ({
  type: 'ladder',
  steps: [
    { w: 'Mar 2011', t: 'Promoted to Staff Software Engineer', hi: hi === 'Mar 2011' },
    { w: 'Dec 2010', t: 'Promoted, and made worldwide lead for a product component', hi: hi === 'Dec 2010' },
    { w: 'Oct 2008', t: 'Component owner', hi: hi === 'Oct 2008' },
    { w: 'Jul 2007', t: 'Joined as Associate Software Engineer', hi: hi === 'Jul 2007' },
  ],
});

const hackdays = (hi: string): Viz => ({
  type: 'ladder',
  steps: [
    { w: '2012', t: 'Advisory council, Hackday X', hi: hi === '2012' },
    { w: '2011', t: 'Advisory council, Hackday 9', hi: hi === '2011' },
    { w: '2010', t: 'India-wide lead, Hackday 8, and first place for implementation', hi: hi === '2010' },
    { w: '2009', t: 'India coordinator, Hackday 7', hi: hi === '2009' },
    { w: '2008', t: 'Event coordinator, worldwide Hackday 6', hi: hi === '2008' },
  ],
});

const texeter = (hi: string): Viz => ({
  type: 'ladder',
  steps: [
    { w: 'Jun 2015', t: 'Named TExeter Thought Leader', hi: hi === 'Jun 2015' },
    { w: 'Dec 2014', t: 'Thanked for six months of leading it', hi: hi === 'Dec 2014' },
    { w: 'Jul 2014', t: 'Started the TExeter Thursday sessions', hi: hi === 'Jul 2014' },
  ],
});

const sessionsPerYear = (from: number, to: number, hi: number[], labels: number[]): Viz => ({
  type: 'bars',
  h: 28,
  items: talksByYear
    .filter(([y]) => y >= from && y <= to)
    .map(([y, v]) => ({ x: String(y), v, hi: hi.includes(y), t: labels.includes(y) ? String(v) : undefined })),
});

/** Delivered sessions a year with a dated source, from the sessions log. */
export const talksByYear: [number, number][] = [
  [2010, 2], [2011, 5], [2012, 4], [2013, 9], [2014, 9], [2015, 3], [2016, 4], [2017, 4], [2018, 5],
  [2019, 24], [2020, 19], [2021, 7], [2022, 1], [2023, 4], [2024, 5], [2025, 28], [2026, 26],
];

export const overrides: Record<string, CardOverride> = {
  // Philips, USA
  '2026-09-traceability-platform-adoption': {
    ground: 'ink',
    value: '4',
    what: 'businesses use the AI traceability platform I conceived, with two more planned for 2026',
    viz: [
      {
        type: 'units',
        rows: [
          { label: 'Pilot, early 2026: three businesses', n: 3 },
          { label: 'After the pilot: four, with two more planned (hollow)', n: 4, o: 2 },
        ],
      },
    ],
  },
  '2026-ai-sessions-27': {
    value: '1,007',
    what: 'people in my AI sessions from January to September 2026',
    viz: [{ type: 'cum', caption: 'Running total by month', labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S'], values: [15, 101, 238, 238, 248, 475, 514, 824, 1007] }],
    note: 'Teams asked for 13 of the 27 sessions. Rated 8.7 out of 10 on average.',
  },
  '2025-12-plymouth-genai-workshop': {
    ground: 'accent',
    what: 'self-rated AI confidence out of 10, before and after a three-day workshop I designed and taught',
    viz: [{ type: 'pairs', sets: [{ max: 10, rows: [{ t: 'Before: 4.5', v: 4.5 }, { t: 'After: 7.6', v: 7.6, hi: true }] }] }],
    note: 'One engineering team, surveyed before and after.',
  },
  '2026-06-analytics-community-series': {
    value: '8.87 to 10',
    what: 'rating out of 10 across a three-part AI series I ran for business analysts',
    viz: [
      {
        type: 'lolli',
        min: 8,
        max: 10,
        points: [
          { x: 'Part 1', sub: '82 people', v: 8.87 },
          { x: 'Part 2', sub: '101', v: 9.46 },
          { x: 'Part 3', sub: '84', v: 10, hi: true },
        ],
      },
    ],
    note: 'Their community lead called the sessions the top recommended material of the year.',
  },
  '2025-philips-university-program': {
    value: '492',
    what: 'learners in a 33-session program I led with Philips University, rated 8.9 out of 10',
    viz: [{ type: 'units', rows: [{ label: 'One square per session. Orange: the 23 I taught myself', n: 33, m: 23 }] }],
  },
  '2026-05-nps-10-two-businesses': {
    ground: 'accent',
    viz: [
      { type: 'meter', label: 'First business', v: 10, max: 10 },
      { type: 'meter', label: 'Second business', v: 10, max: 10 },
    ],
  },
  '2022-innersource-adoption-carrier-businesses': {
    viz: [{ type: 'pairs', sets: [{ title: 'Time to wire a project to the security scanner', max: 100, rows: [{ t: 'Before: months', v: 100 }, { t: 'After: minutes', v: 0.5, hi: true }] }] }],
  },
  '2022-craftsmanship-assessment-67-to-78': {
    ground: 'accent',
  },

  // Philips, India
  '2019-03-idm-devops-progress-to-chief-architect': {
    ground: 'accent',
    value: '63% to 86%',
    what: 'unit-test coverage on an identity management product in six months, with no extra people',
    viz: [{ type: 'pairs', sets: [{ max: 100, rows: [{ t: 'January: 63%', v: 63 }, { t: 'July: 86%', v: 86, hi: true }] }] }],
  },
  '2021-02-cto-outstanding-achievement-award': {
    ground: 'ink',
    value: '1 of ~30',
    what: 'people worldwide named for the CTO Outstanding Technical Achievement Award in 2021',
    viz: [{ type: 'units', rows: [{ label: 'About 30 named worldwide', n: 30, m: 1 }] }],
    note: 'Cited for teaching coding to compliance officers and for a data-driven hiring framework.',
  },
  '2021-tech-debt-savings-program': {
    value: '~\u20ac2.1M',
    what: 'realized in 2021 by a technical-debt program I coached as lead coach',
    viz: [
      {
        type: 'pairs',
        sets: [{ max: 3.45, rows: [{ t: 'Realized: ~\u20ac2.1M', v: 2.1, hi: true }, { t: 'Identified: ~\u20ac3.45M', v: 3.45, hi: true, out: true }] }],
      },
    ],
    note: 'The second figure was identified as future savings, not realized.',
  },
  '2021-senior-hiring-redesign': {
    what: 'candidate NPS after I redesigned senior hiring, with hiring-manager NPS up 15%',
    viz: [{ type: 'pairs', sets: [{ max: 20, rows: [{ t: 'Candidates: +18%', v: 18, hi: true }, { t: 'Managers: +15%', v: 15, hi: true }] }] }],
  },
  '2019-12-year-end-review-exceeds': {
    value: '5 to 24',
    what: 'talks and workshops a year, from 2018 to 2019, my first year in software excellence',
    viz: [sessionsPerYear(2016, 2021, [2019], [2018, 2019, 2020])],
    note: 'The 2019 review counted 235 people met across about 100 teams.',
  },
  '2019-09-jscpd-duplication-program': {
    ground: 'ink',
    value: '18,688',
    what: 'lines of duplicate code removed after teams adopted the analysis I introduced',
    viz: [{ type: 'strokes', n: 19, caption: 'Each line here stands for about 1,000 lines of code' }],
  },
  '2020-quality-at-desk-program': {
    value: 'F to B',
    what: 'code-quality rating for one product team after we moved quality checks to the developer\'s desk',
    viz: [{ type: 'grade', scale: ['F', 'E', 'D', 'C', 'B', 'A'], from: 'F', to: 'B' }],
    note: 'The same team halved internal defects per release. Three teams went live on quality gates.',
  },
  '2020-connect-program-scale': {
    value: '2,125',
    what: 'participants in my connect sessions over seven months of 2020, in 12 cities',
    viz: [
      {
        type: 'bars',
        h: 28,
        items: [
          { x: 'Feb', v: 263, t: '263' }, { x: 'Mar', v: 263 }, { x: 'Apr', v: 378, t: '378', hi: true },
          { x: 'May', v: 328 }, { x: 'Jun', v: 376 }, { x: 'Jul', v: 290 }, { x: 'Aug', v: 227, t: '227' },
        ],
      },
    ],
    note: 'Participants per month. Unique people ranged from 125 to 175 a month.',
  },
  '2020-08-bar-raiser-program-launch': {
    viz: [
      {
        type: 'units',
        rows: [
          { label: 'Seven cohorts of bar-raisers, 2020 to 2021', n: 7 },
          { label: 'Inducted in three regions: Brazil, North America, Europe', n: 3, m: 0 },
        ],
      },
    ],
  },

  // Amazon
  '2017-04-amazon-pay-one-account-check': {
    ground: 'ink',
    value: '20 to 1,150',
    what: 'transactions a second: what the fraud check was asked for, and what we built it for',
    viz: [{ type: 'pairs', sets: [{ max: 1150, rows: [{ t: 'Asked for: 20', v: 20 }, { t: 'Built for: 1,150', v: 1150, hi: true }] }] }],
    note: 'Amazon Pay India launched on 14 April 2017. I led the four-engineer effort from requirements to onboarding.',
  },
  '2018-08-highest-scoring-scrum-trainer': {
    value: '4.12 to 4.6',
    what: 'my feedback score out of 5 across the agile software development workshops I ran at Amazon',
    viz: [scrum('Jul 18')],
    note: 'About 90 engineers coached. In July 2018 I was the program\'s highest-scoring trainer.',
  },
  '2017-10-scrum-workshop-top-score': { value: '4.6 / 5', what: 'my feedback score at an agile software development workshop for 21 engineers, my highest', viz: [scrum('Oct 17')] },
  '2016-12-scrum-workshop-4-47': { value: '4.12 to 4.47', what: 'my feedback score out of 5, three weeks after my first agile software development workshop', viz: [scrum('Dec 16')] },
  '2018-01-gc-cpu-cut': {
    value: '17.7% to 2.4%',
    what: 'of a fraud service\'s CPU spent on garbage collection, after I changed its heap and collector',
    viz: [{ type: 'pairs', sets: [{ max: 17.7, rows: [{ t: 'Before: ~17.7%', v: 17.7 }, { t: 'After: ~2.4%', v: 2.4, hi: true }] }] }],
    note: 'The service then supported about 20% more transactions a second.',
  },
  '2017-07-bulk-investigation-reopen-tool': {
    value: '5,293',
    what: 'stalled fraud investigations put back in investigators\' hands by a bulk tool I built',
    viz: [{ type: 'waffle', marked: 89, caption: '89 in every 100 blocked investigations (5,293 of 5,927). The rest were already resolved or invalid.' }],
  },
  '2017-11-spot-award-process-improvement': {
    ground: 'accent',
    viz: [{ type: 'pairs', sets: [{ max: 100, rows: [{ t: 'Before: 50-60%', v: 60 }, { t: 'After: 85%', v: 85, hi: true }] }] }],
    note: 'The before bar uses the top of the range.',
  },
  '2018-03-prime-day-right-sizing': {
    what: 'a year saved by load-testing two fraud services and right-sizing them for Prime Day',
    viz: [{ type: 'units', rows: [{ label: '18 hosts removed, nine per service', n: 18 }] }],
  },
  '2016-08-catalog-hackathon-first-place': {
    ground: 'ink',
    value: '1st of 45',
    what: 'teams at the catalog organization\'s global hackathon, with three colleagues',
    viz: [{ type: 'units', rows: [{ label: '45 teams from Seattle, Cupertino, New York, London, Bengaluru and Chennai', n: 45, m: 1 }] }],
  },
  '2018-03-variable-comparison-tool': {
    viz: [{ type: 'pairs', sets: [{ title: 'Engineer effort per investigation', max: 100, rows: [{ t: 'Before', v: 100 }, { t: 'After: ~60% less', v: 40, hi: true }] }] }],
  },

  // Exeter
  '2014-08-release-3-3-2-9-hf4': {
    value: '400+',
    what: 'bug fixes shipped in one release, on its planned date, by the India team I led',
    viz: [{ type: 'units', rows: [{ label: 'One square per fix. Hollow: about 80 more queue items closed as not bugs', n: 400, o: 80 }] }],
    note: 'August 2014, for two US state health exchanges.',
  },
  '2015-07-us-review-thought-leader': {
    ground: 'ink',
    value: '3.5 / 4',
    what: 'the US delivery lead\'s rating of the India team I led: "Exceptional"',
    viz: [
      { type: 'meter', label: 'Team delivery, out of 4', v: 3.5, max: 4 },
      { type: 'units', rows: [{ label: 'Up to 20 engineers, with their hiring, reviews and mentoring', n: 20 }] },
    ],
  },
  '2015-06-texeter-thought-leader': { ground: 'accent', value: '6 months', what: 'from my idea for a cross-project knowledge series to a company-wide community', viz: [texeter('Jun 2015')] },
  '2014-12-texeter-six-month-letter': { viz: [texeter('Dec 2014')] },
  '2014-07-launched-texeter-thursday': { viz: [texeter('Jul 2014')], img: img('2014-12-texeter-six-month-letter-1.webp', 'Certificate: six months of TExeter') },

  // IBM
  '2013-us-patent-granted': {
    value: '27',
    what: 'later patents cite the US patent I was granted at IBM',
    viz: [
      {
        type: 'ladder',
        steps: [
          { w: '~2013', t: 'Granted: US 8,560,487 B2', hi: true },
          { w: '2012', t: 'Application published' },
          { w: '2010', t: 'Disclosure approved, then filed in December' },
        ],
      },
      { type: 'units', rows: [{ label: '27 patent citations, plus 8 non-patent (hollow)', n: 27, o: 8 }] },
    ],
    img: null,
  },
  '2011-03-promoted-staff-software-engineer': { ground: 'ink', value: 'Associate to Staff', what: 'engineer at IBM in under four years', viz: [ibmRoles('Mar 2011')] },
  '2010-12-promoted-worldwide-webcontainer-lead': { viz: [ibmRoles('Dec 2010')] },
  '2008-10-expeditor-component-owner': { viz: [ibmRoles('Oct 2008')] },
  '2010-hackday8-lead': {
    value: '5 Hackdays',
    what: 'from event coordinator to the advisory council of IBM India\'s lab-wide hackday',
    viz: [hackdays('2010')],
    img: img('2010-hackday8-best-implementation-1.webp', 'Certificate: Hackday 8 first place'),
  },
  '2011-03-vp-recognition-hackday-progress': { viz: [hackdays('2011')] },
};

/** Outside-work cards for the landing introduction. They have no Impact entry. */
export const beyondCards: CardSpec[] = [
  {
    id: 'book-drives',
    slot: 'beyond',
    date: '2026-01',
    when: '2015 to 2026',
    ground: 'ink',
    value: '\u20b937,500 to \u20b92.35 lakh',
    what: 'raised per book drive for rural schools, with colleagues and friends',
    viz: [
      {
        type: 'bars',
        h: 24,
        items: [
          { x: '15', v: 37500, t: '\u20b937,500' }, { x: '16', v: 25000 }, { x: '17', v: 69652 }, { x: '18', v: 75404 }, { x: '19', v: 63700 },
          { x: '22', v: 119617 }, { x: '23', v: 134954 }, { x: '25', v: 207429 }, { x: '26', v: 235218, t: '\u20b92.35 lakh', hi: true },
        ],
      },
    ],
    img: img('2015-book-drive-2.webp', 'Photo: 2015 book drive', 'center'),
    note: 'Nine drives, \u20b99.6 lakh+ in all. Contributions per drive grew from 9 to 22.',
    href: '/socials/c/2026-book-drive',
  },
  {
    id: 'student-ratings',
    slot: 'beyond',
    date: '2020-08',
    when: '2017 to 2020',
    ground: 'paper',
    value: '9.12 / 10',
    what: 'my average presenter rating from 128 engineering students, 2019 and 2020',
    viz: [
      {
        type: 'bars',
        h: 22,
        caption: 'Responses per college feedback form',
        items: [
          { x: '17', v: 18 }, { x: '17', v: 84, t: '84' }, { x: '17', v: 47 }, { x: '18', v: 57 }, { x: '18', v: 23 }, { x: '18', v: 58 },
          { x: '18', v: 19 }, { x: '19', v: 36 }, { x: '19', v: 18 }, { x: '19', v: 30, hi: true }, { x: '20', v: 61, hi: true }, { x: '20', v: 37, t: '37', hi: true },
        ],
      },
    ],
    note: '494 feedback responses from six colleges and one company session. Orange forms used a 10-point scale; the 5-point forms averaged 4.58.',
    href: '/talks',
  },
  {
    id: 'yoga',
    slot: 'beyond',
    date: '2011-05',
    when: '2009 to 2011',
    ground: 'accent',
    value: '3 in 19 months',
    what: 'yoga qualifications earned while working full time at IBM, the last two with distinction',
    viz: [
      {
        type: 'ladder',
        steps: [
          { w: 'May 2011', t: 'M.Sc. Yoga, first class with distinction', hi: true },
          { w: 'May 2010', t: 'PG Diploma in Yoga, first with distinction' },
          { w: 'Oct 2009', t: 'Yoga instructors\' course, S-VYASA' },
        ],
      },
    ],
    note: 'I am a certified yoga instructor and have taught it at a college and at work.',
    href: '/socials/2011/05',
  },
];

/** The landing introduction: record entries by id, plus the outside-work cards. Shown newest first. */
export const introIds = [
  '2026-09-traceability-platform-adoption',
  '2026-ai-sessions-27',
  '2025-12-plymouth-genai-workshop',
  '2021-tech-debt-savings-program',
  '2021-02-cto-outstanding-achievement-award',
  '2019-03-idm-devops-progress-to-chief-architect',
  '2018-08-highest-scoring-scrum-trainer',
  '2018-01-gc-cpu-cut',
  '2017-04-amazon-pay-one-account-check',
  '2015-07-us-review-thought-leader',
  '2014-08-release-3-3-2-9-hf4',
  '2013-us-patent-granted',
];
