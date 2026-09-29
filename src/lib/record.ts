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

const plain = (d: string) => d.replace(/^~/, '');
const byNewestDate = (a: Capsule, b: Capsule) => plain(b.date).localeCompare(plain(a.date)) || a.id.localeCompare(b.id);

export async function capsules(): Promise<Capsule[]> {
  return (await getCollection('record')).map((e) => e.data).sort(byNewestDate);
}

export async function eras(): Promise<Era[]> {
  return (await getCollection('record-summaries')).map((e) => e.data).sort((a, b) => b.order - a.order);
}

export const newestFirst = (list: Capsule[]) => [...list].sort(byNewestDate);

export const isBeyond = (x: { lane: string }) => x.lane === 'beyond';
export const section = (x: { lane: string }) =>
  isBeyond(x) ? { label: 'Socials', href: '/socials' } : { label: 'Impact', href: '/impact' };
/** Where an era sits, for titles: "at IBM India", or "outside work" for the social lane. */
export const atEra = (era: Era) => (isBeyond(era) ? 'outside work' : `at ${era.label}`);

export const eraHref = (era: Era) => (isBeyond(era) ? '/socials' : `/impact/${era.slug}`);
export const yearHref = (era: Era, year: string) => `${eraHref(era)}/${year}`;
export const monthHref = (era: Era, year: string, month: string) => `${yearHref(era, year)}/${month}`;

export function capsuleHref(c: Capsule): string | undefined {
  if (c.tier !== 'public') return undefined;
  return `${isBeyond(c) ? '/socials' : '/impact'}/c/${c.id}`;
}

/** Public capsule page, or the month (or year) page that lists a line-tier capsule. */
export function capsuleOrListHref(c: Capsule): string {
  const base = isBeyond(c) ? '/socials' : `/impact/${c.era}`;
  return capsuleHref(c) ?? (c.month ? `${base}/${c.year}/${c.month}` : `${base}/${c.year}`);
}

/** Link for a record entry by id; fails the build when the id is not in the public record. */
export async function recordHref(id: string): Promise<string> {
  const c = (await capsules()).find((x) => x.id === id);
  if (!c) throw new Error(`Unknown record id: ${id}`);
  return capsuleOrListHref(c);
}

/** Where a claim's evidence lives: its record entry, or a page named in the claim. */
export async function claimHref(c: { capsule?: string; href?: string }): Promise<string | undefined> {
  return c.capsule ? recordHref(c.capsule) : c.href;
}

/** Static paths for public capsule pages in one lane, with newer and older neighbours in the same era. */
export async function capsulePaths(lane: 'work' | 'beyond') {
  const all = await capsules();
  const eraList = await eras();
  return all
    .filter((c) => c.tier === 'public' && c.lane === lane)
    .map((c) => {
      const siblings = all.filter((s) => s.era === c.era && s.tier === 'public');
      const i = siblings.findIndex((s) => s.id === c.id);
      return {
        params: { id: c.id },
        props: {
          capsule: c,
          eraLabel: eraList.find((e) => e.slug === c.era)?.label ?? c.company,
          prev: siblings[i - 1],
          next: siblings[i + 1],
        },
      };
    });
}

/** Redirect paths from a retired Socials address (/social, /beyond-work) to the current pages. */
export async function socialsRedirectPaths() {
  const era = (await eras()).find((e) => e.lane === 'beyond');
  const paths: { params: { path: string | undefined }; props: { to: string } }[] = [
    { params: { path: undefined }, props: { to: '/socials' } },
  ];
  for (const layer of era?.year_layers ?? []) {
    paths.push({ params: { path: layer.year }, props: { to: yearHref(era!, layer.year) } });
    for (const month of layer.months) {
      paths.push({ params: { path: `${layer.year}/${month}` }, props: { to: monthHref(era!, layer.year, month) } });
    }
  }
  for (const c of await capsules()) {
    const to = c.lane === 'beyond' ? capsuleHref(c) : undefined;
    if (to) paths.push({ params: { path: `c/${c.id}` }, props: { to } });
  }
  return paths;
}

/** Split "1,150 TPS fraud check at launch" into a big value and its label. */
export function splitNumber(item: string): { value: string; label: string } {
  const m = item.match(/^((?:Rs|₹|\$|€|~)?\s?[\d.,]+(?:st|nd|rd|th)?\s?(?:K|M|B|%|x)?\+?)\s+(.*)$/);
  return m ? { value: m[1].replace(/^Rs\s?/, '₹'), label: m[2] } : { value: '', label: item };
}
