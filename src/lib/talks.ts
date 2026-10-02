import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate, monthLong, monthShort } from './record';
import { ERA_SLOT, RAIL, SLOT_LABEL, type CardSpec, type Slot, type Viz } from './cards';
import { TOPICS, type TopicDef } from '../data/talks';

export type Talk = CollectionEntry<'talks'>['data'];

const byNewest = (a: Talk, b: Talk) => b.date.localeCompare(a.date) || b.session_no - a.session_no;

export async function talks(): Promise<Talk[]> {
  return (await getCollection('talks')).map((e) => e.data).sort(byNewest);
}

export const talkHref = (t: Pick<Talk, 'id'>) => `/talks/t/${t.id}`;
export const talkEraHref = (era: string) => `/talks/${era}`;
export const talkYearHref = (era: string, year: string) => `/talks/${era}/${year}`;
export const talkMonthHref = (era: string, year: string, month: string) => `/talks/${era}/${year}/${month}`;

export const talkDate = (t: Talk) => t.date_label ?? formatDate(t.date);

const ROLE_LABELS: Record<Talk['role'], string> = {
  speaker: 'Speaker',
  'co-presenter': 'Co-presenter',
  judge: 'Judge',
  organizer: 'Organizer',
  program: 'Program lead',
};
export const roleLabel = (t: Talk) => ROLE_LABELS[t.role];

export const ratingText = (r: { value: number; scale: number }) =>
  `${Number.isInteger(r.value) ? r.value : r.value.toFixed(1)} out of ${r.scale}`;

/** Talks grouped by year (newest first), each year's months newest first. */
export function yearsOf(list: Talk[]) {
  const years = [...new Set(list.map((t) => t.year))].sort((a, b) => b.localeCompare(a));
  return years.map((year) => {
    const inYear = list.filter((t) => t.year === year);
    const months = [...new Set(inYear.map((t) => t.month).filter((m): m is string => Boolean(m)))].sort((a, b) =>
      b.localeCompare(a),
    );
    return { year, talks: inYear, months: months.map((m) => ({ month: m, label: monthLong(m), talks: inYear.filter((t) => t.month === m) })) };
  });
}

/** Talks linked to each record capsule, newest first. */
export async function talksByRecord(): Promise<Map<string, Talk[]>> {
  const map = new Map<string, Talk[]>();
  for (const t of await talks()) {
    if (!t.record_capsule) continue;
    map.set(t.record_capsule, [...(map.get(t.record_capsule) ?? []), t]);
  }
  return map;
}

export function reachOf(list: Talk[]) {
  const people = list.reduce((n, t) => n + (Number((t.attendees ?? '').replace(/[^\d]/g, '')) || 0), 0);
  const responses = list.reduce((n, t) => n + (t.feedback && !t.feedback.shared_form ? t.feedback.responses : 0), 0);
  return { people, responses, withFeedback: list.filter((t) => t.feedback).length };
}

/** The session's own rating, or the first rating on its feedback form. */
export const ratingOf = (t: Talk) =>
  t.rating ?? (t.feedback?.ratings[0] ? { value: t.feedback.ratings[0].average, scale: t.feedback.ratings[0].scale } : null);

const headcount = (t: Talk) => Number((t.attendees ?? '').replace(/[^\d]/g, '')) || 0;

export interface TopicGroup extends TopicDef {
  /** Newest first. */
  sessions: Talk[];
}

/** Every talk sorted into its topic from data/talks.ts. */
export async function topicGroups(): Promise<TopicGroup[]> {
  const all = await talks();
  const byTopic = new Map<string, Talk[]>(TOPICS.map((d) => [d.id, []]));
  for (const t of all) {
    const hits = TOPICS.filter((d) => d.match.test(t.title));
    if (hits.length !== 1) {
      throw new Error(`Talk ${t.id} matches ${hits.length ? hits.map((h) => h.id).join(' and ') : 'no topic'} in data/talks.ts.`);
    }
    byTopic.get(hits[0].id)!.push(t);
  }
  return TOPICS.map((d) => {
    const sessions = byTopic.get(d.id)!;
    if (!sessions.length) throw new Error(`Topic ${d.id} in data/talks.ts matches no talk.`);
    return { ...d, sessions };
  });
}

export const topicHref = (g: TopicGroup) => (g.sessions.length > 1 ? `/talks/topic/${g.id}` : talkHref(g.sessions[0]));

export const fmtRating = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1));

export function topicStats(g: TopicGroup) {
  const s = g.sessions;
  const rated = s.flatMap((t) => {
    const r = ratingOf(t);
    return r ? [{ t, r }] : [];
  });
  const scale = rated.length && rated.every((x) => x.r.scale === rated[0].r.scale) ? rated[0].r.scale : 10;
  const points = rated.map(({ t, r }) => ({ t, v: (r.value / r.scale) * scale }));
  const counted = s.filter((t) => headcount(t) > 0);
  return {
    count: g.value && /^\d+$/.test(g.value) ? Number(g.value) : s.length,
    people: counted.reduce((n, t) => n + headcount(t), 0),
    counted: counted.length,
    points,
    scale,
    average: points.length ? points.reduce((n, p) => n + p.v, 0) / points.length : null,
    responses: s.reduce((n, t) => n + (t.feedback && !t.feedback.shared_form ? t.feedback.responses : 0), 0),
    withFeedback: s.filter((t) => t.feedback || ratingOf(t)).length,
    quotes: [...new Set(s.flatMap((t) => t.feedback?.quotes ?? []))],
  };
}

const ym = (d: string) => d.replace(/^~/, '').split('-');

/** "Aug 2020", "May to Aug 2025" or "2011 to 2015". */
export function spanOf(g: TopicGroup): string {
  const [ly, lm] = ym(g.sessions[0].date);
  const [fy, fm] = ym(g.sessions[g.sessions.length - 1].date);
  if (fy !== ly) return `${fy} to ${ly}`;
  if (fm && lm && fm !== lm) return `${monthShort(fm)} to ${monthShort(lm)} ${ly}`;
  return lm ? `${monthShort(lm)} ${ly}` : ly;
}

export function slotsOf(g: TopicGroup): { slots: Slot[]; where: string } {
  const slots = [...new Set(g.sessions.map((t) => ERA_SLOT[t.era]).filter(Boolean))];
  const where =
    slots.length === 1
      ? SLOT_LABEL[slots[0]]
      : RAIL.filter((e) => slots.includes(e.slot))
          .map((e) => e.label)
          .join(', ');
  return { slots, where };
}

const sentenceCase = (f: string) => f.replace(/ ([A-Z])([a-z])/g, (_, a: string, b: string) => ` ${a.toLowerCase()}${b}`);

function mostCommon(list: string[]): string {
  const n = new Map<string, number>();
  for (const x of list) n.set(x, (n.get(x) ?? 0) + 1);
  return [...n.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

function ratingViz(st: ReturnType<typeof topicStats>): Viz {
  const pts = [...st.points].reverse();
  const vals = pts.map((p) => Number(p.v.toFixed(1)));
  const best = vals.indexOf(Math.max(...vals));
  let year = '';
  return {
    type: 'lolli',
    min: Math.max(0, Math.floor(Math.min(...vals)) - (st.scale >= 10 ? 1 : 0)),
    max: st.scale,
    points: pts.map((p, i) => {
      // A year label only where the year changes; a blank keeps the columns level.
      const x = p.t.year === year ? '\u00a0' : p.t.year;
      year = p.t.year;
      return { x, v: vals[i], hi: i === best };
    }),
  };
}

/** One Impact-style card for a talk topic: times taught for repeats, the strongest figure for one-offs. */
export function topicCard(g: TopicGroup): CardSpec {
  const s = g.sessions;
  const st = topicStats(g);
  const one = s.length === 1 ? s[0] : undefined;
  const { slots, where } = slotsOf(g);

  let value: string | undefined;
  let what: string | undefined;
  let head: string | undefined;
  let viz: Viz[] = [];

  if (!one) {
    value = g.value ?? String(st.count);
    what = g.what ?? `sessions for ${g.who}`;
    if (st.points.length >= 2) viz = [ratingViz(st)];
    else {
      const partial = st.withFeedback > 0 && st.withFeedback < st.count;
      const people = st.people ? `. ${st.people.toLocaleString('en-US')} people counted in ${st.counted} of them` : '';
      viz = [
        {
          type: 'units',
          rows: [
            {
              label: `One square per session${partial ? `. Orange: ${st.withFeedback} with participant feedback` : people}`,
              n: st.count,
              m: partial ? st.withFeedback : undefined,
            },
          ],
        },
      ];
    }
  } else {
    const r = ratingOf(one);
    const n = headcount(one);
    if (n) {
      value = one.attendees!;
      what = g.who;
      if (n > 100) viz = [{ type: 'units', rows: [{ label: 'One square per 10 people', n: Math.round(n / 10) }] }];
      else viz = [{ type: 'units', rows: [{ n }] }];
    } else if (r) {
      value = fmtRating(r.value);
      what = `out of ${r.scale}, rated by ${g.who}`;
      viz = [{ type: 'meter', label: 'Participant rating', v: r.value, max: r.scale }];
    } else if (one.feedback) {
      value = String(one.feedback.responses);
      what = `feedback responses from ${g.who}`;
    } else {
      head = g.title;
      viz = [
        {
          type: 'story',
          rows: [
            { k: 'Format', v: sentenceCase(one.format) },
            { k: 'Audience', v: one.audience },
            { k: 'My role', v: ROLE_LABELS[one.role] },
          ],
        },
      ];
    }
  }

  const roles = [...new Set(s.filter((t) => t.role !== 'speaker').map((t) => ROLE_LABELS[t.role]))];
  const q = st.quotes.length;
  const chips = [
    ...roles,
    q ? (q === 1 ? '1 quote' : `${q} quotes`) : st.withFeedback ? 'Feedback forms' : '',
    sentenceCase(mostCommon(s.map((t) => t.format))),
  ].filter(Boolean);

  return {
    id: `topic-${g.id}`,
    slot: slots[0] ?? 'beyond',
    slots,
    where,
    date: ym(s[0].date).slice(0, 2).join('-'),
    pins: s.map((t) => t.date.replace(/^~/, '')),
    when: spanOf(g),
    ground: 'paper',
    value,
    what,
    head,
    viz,
    title: head ? undefined : g.title,
    chips: chips.slice(0, 2),
    href: topicHref(g),
    go: one ? 'See the session' : g.value ? 'See the sessions' : `See the ${s.length} sessions`,
  };
}
