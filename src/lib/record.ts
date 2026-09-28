import { getCollection, type CollectionEntry } from 'astro:content';

export type Capsule = CollectionEntry<'record'>['data'];
export type Era = CollectionEntry<'record-summaries'>['data'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const TYPE_LABELS: Record<string, string> = {
  Role: 'Role',
  Project: 'Project',
  Recognition: 'Recognition',
  Talk: 'Talk',
  Program: 'Program',
  Credential: 'Credential',
  Hiring: 'Hiring',
  Community: 'Community',
  Writing: 'Writing',
  Review: 'Review',
};

export const THEME_LABELS: Record<string, string> = {
  ai: 'AI',
  quality: 'Quality',
  delivery: 'Delivery',
  reliability: 'Reliability',
  cost: 'Cost',
  people: 'People',
  hiring: 'Hiring',
  teaching: 'Teaching',
  'fraud-risk': 'Fraud and risk',
  payments: 'Payments',
  catalog: 'Catalog',
  community: 'Community',
  leadership: 'Leadership',
};

export const monthShort = (m: string) => MONTHS[Number(m) - 1] ?? m;
export const monthLong = (m: string) => MONTHS_LONG[Number(m) - 1] ?? m;

export function formatDate(date: string): string {
  const [y, m, d] = date.split('-');
  if (!m) return y;
  if (!d) return `${monthLong(m)} ${y}`;
  return `${Number(d)} ${monthLong(m)} ${y}`;
}

const byRank = (a: Capsule, b: Capsule) => b.total - a.total || a.date.localeCompare(b.date);
const plain = (d: string) => d.replace(/^~/, '');
const byDate = (a: Capsule, b: Capsule) => plain(a.date).localeCompare(plain(b.date)) || a.id.localeCompare(b.id);

export async function capsules(): Promise<Capsule[]> {
  return (await getCollection('record')).map((e) => e.data).sort(byDate);
}

export async function eras(): Promise<Era[]> {
  return (await getCollection('record-summaries')).map((e) => e.data).sort((a, b) => a.order - b.order);
}

export const ranked = (list: Capsule[]) => [...list].sort(byRank);

export function capsuleHref(c: Capsule): string | undefined {
  return c.tier === 'public' ? `/record/c/${c.id}` : undefined;
}

/** Split "1,150 TPS fraud check at launch" into a big value and its label. */
export function splitNumber(item: string): { value: string; label: string } {
  const m = item.match(/^((?:Rs|₹|\$|€|~)?\s?[\d.,]+(?:st|nd|rd|th)?\s?(?:K|M|B|%|x)?\+?)\s+(.*)$/);
  return m ? { value: m[1].replace(/^Rs\s?/, '₹'), label: m[2] } : { value: '', label: item };
}
