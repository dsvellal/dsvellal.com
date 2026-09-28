import { getCollection, type CollectionEntry } from 'astro:content';
import { formatDate, monthLong } from './record';

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
