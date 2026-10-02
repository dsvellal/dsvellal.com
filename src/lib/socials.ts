import { capsules, monthShort, type Capsule } from './record';
import { beyondCards, type CardSpec, type Viz } from '../data/cards';

export interface Activity {
  id: string;
  title: string;
  note: string;
  /** First match wins, in the order below. */
  match: RegExp;
  /** A card from data/cards.ts to start from. */
  base?: string;
  card?: (entries: Capsule[]) => Partial<CardSpec>;
}

const when = (c: Capsule) => {
  const [y, m] = c.date.replace(/^~/, '').split('-');
  return m ? `${monthShort(m)} ${y}` : y;
};
const count = (list: Capsule[], re: RegExp) => list.filter((c) => re.test(c.title)).length;

export const ACTIVITIES: Activity[] = [
  {
    id: 'book-drives',
    title: 'Book drives for rural schools',
    note: 'Nine drives since 2015, with colleagues and friends, for one-teacher village schools.',
    match: /book drive/i,
    base: 'book-drives',
  },
  {
    id: 'toastmasters',
    title: 'Toastmasters and leadership',
    note: 'Club awards, the Competent Communicator and Competent Leader ratings, and advising a new club.',
    match: /Toastmasters|Personality type/,
    card: (list) => {
      const bars = [
        { x: 'Best evaluator', v: count(list, /Best Evaluator/) },
        { x: 'Table topics', v: count(list, /Best Table Topics/) },
        { x: 'Best speaker', v: count(list, /Best Speaker/) },
      ];
      return {
        value: String(bars.reduce((n, b) => n + b.v, 0)),
        what: 'Toastmasters meeting awards in two years, then Leadership Advisor to a new club',
        viz: [{ type: 'bars', h: 22, items: bars.map((b) => ({ ...b, t: String(b.v), hi: b.x === 'Best evaluator' })) }],
        img: { src: '/record/published/2013-11-toastmasters-leadership-advisor-1.webp', alt: 'Certificate: Toastmasters Leadership Advisor' },
      };
    },
  },
  {
    id: 'yoga',
    title: 'Yoga',
    note: 'Three qualifications while working at IBM, then teaching it at a college and at work.',
    match: /yoga/i,
    base: 'yoga',
  },
  {
    id: 'colleges',
    title: 'Talks at colleges',
    note: 'Seminars, workshops and judging at engineering colleges.',
    match: /seminar|workshop|Judge|address|LinkedIn recommendation from a college|talk/i,
    base: 'student-ratings',
  },
  {
    id: 'giving',
    title: 'Giving back',
    note: 'Other ways I have helped, beyond the book drives.',
    match: /Diwali|blood|IAS/,
    card: (list) => ({
      value: String(list.length),
      what: 'more ways I gave back, beyond the book drives',
      viz: [{ type: 'ladder', steps: list.map((c, i) => ({ w: when(c), t: c.title.replace(/: Rs /, ': \u20b9'), hi: i === 0 })) }],
    }),
  },
  {
    id: 'writing',
    title: 'Personal blog',
    note: 'What I wrote about outside work, from 2007 to 2012.',
    match: /blog posts/,
    card: (list) => {
      const years = list
        .map((c) => c.title.match(/Wrote (\d+) personal blog posts in (\d{4})/))
        .filter((m): m is RegExpMatchArray => m !== null)
        .map((m) => ({ x: m[2], v: Number(m[1]) }))
        .sort((a, b) => a.x.localeCompare(b.x));
      const total = years.reduce((n, y) => n + y.v, 0);
      const viz: Viz = { type: 'bars', h: 26, items: years.map((y) => ({ ...y, t: String(y.v), hi: y.v === Math.max(...years.map((z) => z.v)) })) };
      return { value: String(total), what: `personal blog posts from ${years[0].x} to ${years[years.length - 1].x}`, viz: [viz] };
    },
  },
  {
    id: 'sport',
    title: 'Volleyball',
    note: 'Wins at Exeter Tarang.',
    match: /volleyball/i,
    card: (list) => ({
      value: '1st',
      what: `place in volleyball at Exeter Tarang, ${list.length === 2 ? 'two years running' : `${list.length} times`}`,
      viz: [{ type: 'ladder', steps: list.map((c, i) => ({ w: when(c), t: c.title, hi: i === 0 })) }],
    }),
  },
];

export interface ActivityGroup extends Activity {
  /** Newest first. */
  entries: Capsule[];
}

/** Every outside-work entry sorted into its activity. */
export async function activityGroups(): Promise<ActivityGroup[]> {
  const beyond = (await capsules()).filter((c) => c.lane === 'beyond');
  const byId = new Map<string, Capsule[]>(ACTIVITIES.map((a) => [a.id, []]));
  for (const c of beyond) {
    const a = ACTIVITIES.find((x) => x.match.test(c.title));
    if (!a) throw new Error(`Socials entry ${c.id} matches no activity in lib/socials.ts.`);
    byId.get(a.id)!.push(c);
  }
  return ACTIVITIES.map((a) => {
    const entries = byId.get(a.id)!;
    if (!entries.length) throw new Error(`Activity ${a.id} in lib/socials.ts matches no entry.`);
    return { ...a, entries };
  });
}

export const activityHref = (a: Pick<Activity, 'id'>) => `/socials/a/${a.id}`;

export function spanOfEntries(list: Capsule[]): string {
  const first = list[list.length - 1].date.replace(/^~/, '').slice(0, 4);
  const last = list[0].date.replace(/^~/, '').slice(0, 4);
  return first === last ? last : `${first} to ${last}`;
}

export function activityCard(a: ActivityGroup): CardSpec {
  const base = a.base ? beyondCards.find((c) => c.id === a.base) : undefined;
  if (a.base && !base) throw new Error(`Activity ${a.id} names an unknown card ${a.base}.`);
  const dates = a.entries.map((c) => c.date.replace(/^~/, ''));
  return {
    id: `activity-${a.id}`,
    slot: 'beyond',
    ground: 'paper',
    viz: [],
    ...base,
    ...a.card?.(a.entries),
    date: dates[0].slice(0, 7),
    pins: dates,
    slots: [],
    when: spanOfEntries(a.entries),
    // Curated cards with a note already name the activity and are full.
    title: base?.note ? undefined : a.title,
    href: activityHref(a),
    go: a.entries.length === 1 ? 'See the entry' : `See all ${a.entries.length}`,
  };
}
