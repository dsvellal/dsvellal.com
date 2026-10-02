import { capsuleHref, capsules, isResponsibleAi, monthShort, type Capsule } from './record';
import { profile } from '../data/profile';
import { beyondCards, introIds, overrides, type CardImage, type CardSpec, type Ground, type Slot, type Viz } from '../data/cards';

export type { CardSpec, Viz, Slot };

export const ERA_SLOT: Record<string, Slot> = {
  'philips-north-america': 'usa',
  'philips-india': 'india',
  'amazon-india': 'amazon',
  'exeter-india': 'exeter',
  'ibm-india': 'ibm',
};

export const SLOT_LABEL: Record<Slot, string> = {
  usa: 'Philips North America',
  india: 'Philips India',
  amazon: 'Amazon India',
  exeter: 'Exeter India',
  ibm: 'IBM India',
  beyond: 'Outside work',
};

/** Career spans on the 2007 to 2027 rail every card carries. */
export const RAIL: { slot: Slot; label: string; s: number; e: number }[] = [
  { slot: 'ibm', label: 'IBM', s: 2007.5, e: 2013.2 },
  { slot: 'exeter', label: 'Exeter', s: 2013.3, e: 2015.9 },
  { slot: 'amazon', label: 'Amazon', s: 2016.1, e: 2018.6 },
  { slot: 'india', label: 'Philips India', s: 2018.7, e: 2021.9 },
  { slot: 'usa', label: 'Philips USA', s: 2021.9, e: 2026.8 },
];

export const railX = (y: number) => ((y - 2007) / (2027 - 2007)) * 100;

/** Decimal year for a YYYY or YYYY-MM date, mid-year when the month is unknown. */
export function decimalYear(date: string): number {
  const [y, m] = date.replace(/^~/, '').split('-').map(Number);
  return y + ((m || 6) - 0.5) / 12;
}

/** The company I was at on a date, if any. */
export function slotAt(date: string): Slot | undefined {
  const y = decimalYear(date);
  return RAIL.find((e) => y >= e.s && y <= e.e)?.slot;
}

export const byNewest = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);

const IMAGE_KIND: Record<string, string> = { certificate: 'Certificate', document: 'Document', chat: 'Message', photo: 'Photo' };
const TIME_WORDS = /\b(day|days|week|weeks|month|months|year|years|min|minutes|hours|seconds)\b/i;

function parseNum(raw: string): { v: number; pct: boolean; plain: boolean } | null {
  const m = raw.trim().match(/^([~+]?)\s*([$€₹]|EUR\s?)?\s*([\d,]*\.?\d+)\s*([KMB])?(\+)?\s*(%|h|s)?$/i);
  if (!m) return null;
  const scale = { K: 1e3, M: 1e6, B: 1e9 }[(m[4] || '').toUpperCase() as 'K' | 'M' | 'B'] ?? 1;
  return { v: Number(m[3].replace(/,/g, '')) * scale, pct: m[6] === '%', plain: !m[2] && !m[4] && !m[6] && m[1] !== '+' };
}

function metricViz(c: Capsule): { viz: Viz[]; used: number } {
  const ms = c.metrics ?? [];
  const m0 = ms[0];
  if (!m0) return { viz: [], used: 0 };

  const ratio = m0.value.match(/^~?([\d.]+)\s*\/\s*(\d+)$/);
  if (ratio) return { viz: [{ type: 'meter', v: Number(ratio[1]), max: Number(ratio[2]) }], used: 1 };

  const change = m0.value.match(/^(.+?)\s+to\s+(.+)$/);
  if (change && !/\bper\b/.test(m0.label)) {
    const a = parseNum(change[1].split('-').pop() ?? '');
    const b = parseNum(change[2]);
    if (a && b) {
      const max = a.pct || b.pct ? 100 : Math.max(a.v, b.v);
      return {
        viz: [{ type: 'pairs', sets: [{ max, rows: [{ t: `Before: ${change[1]}`, v: a.v }, { t: `After: ${change[2]}`, v: b.v, hi: true }] }] }],
        used: 1,
      };
    }
  }

  const n = parseNum(m0.value);
  const countable = (x: typeof n, label: string) => x && x.plain && Number.isInteger(x.v) && x.v >= 1 && x.v <= 500 && !TIME_WORDS.test(label);
  if (countable(n, m0.label)) {
    const rows: { label?: string; n: number }[] = [{ n: n!.v }];
    let used = 1;
    const m1 = ms[1];
    const n1 = m1 ? parseNum(m1.value) : null;
    if (m1 && countable(n1, m1.label) && n!.v + n1!.v <= 120) {
      rows[0].label = `${m0.value} ${m0.label}`;
      rows.push({ label: `${m1.value} ${m1.label}`, n: n1!.v });
      used = 2;
    }
    return { viz: [{ type: 'units', rows }], used };
  }
  return { viz: [], used: 1 };
}

function chips(c: Capsule): string[] {
  const out = [...new Set((c.images ?? []).map((i) => IMAGE_KIND[i.kind] ?? 'Image'))];
  const q = c.quotes?.length ?? 0;
  if (q) out.push(q === 1 ? '1 quote' : `${q} quotes`);
  if (c.type === 'Review') out.push('Performance review');
  return out.slice(0, 3);
}

const when = (c: Capsule) => (c.month ? `${monthShort(c.month)} ${c.year}` : c.year);
const dateKey = (c: Capsule) => {
  const d = c.date.replace(/^~/, '');
  return d.length >= 7 ? d.slice(0, 7) : d;
};

/** One card for a public record entry: the curated override if there is one, else a visual from its own fields. */
export function cardFor(c: Capsule): CardSpec {
  const o = overrides[c.id] ?? {};
  const base = metricViz(c);
  const ms = c.metrics ?? [];
  // Two unit rows already fill the chart space.
  const rest = base.used >= 2 ? [] : ms.slice(base.used).slice(0, 3);
  const quote = c.quotes?.[0];

  let viz: Viz[] = base.viz;
  let head: string | undefined;
  if (ms.length === 0 && quote) {
    head = c.title;
    viz = [{ type: 'quote', text: quote.text, who: `${quote.role}, ${quote.company}, ${quote.date.slice(0, 4)}` }];
  } else if (ms.length === 0) {
    head = c.title;
    viz = [
      {
        type: 'story',
        rows: [
          { k: 'Before', v: c.what_would_have_happened ?? '' },
          { k: 'The call', v: c.the_call ?? '' },
          { k: 'What changed', v: c.what_changed ?? '' },
        ].filter((r) => r.v && !/^not (applicable|in sources)/i.test(r.v)),
      },
    ];
  } else if (rest.length) {
    viz = [...viz, { type: 'stats', items: rest.map((m) => ({ v: m.value, l: m.label })) }];
  }

  const first: CardImage | undefined = c.images?.[0] ? { src: c.images[0].src, alt: c.images[0].alt } : undefined;
  // Dark ground for someone else's words; curated cards pick their own.
  const ground: Ground = o.ground ?? (viz[0]?.type === 'quote' && !o.viz ? 'ink' : 'paper');

  return {
    id: c.id,
    slot: ERA_SLOT[c.era] ?? 'beyond',
    date: dateKey(c),
    when: when(c),
    ground,
    value: o.value ?? (head ? undefined : ms[0]?.value),
    what: o.what ?? (head ? undefined : ms[0]?.label),
    head: o.value || o.what ? undefined : head,
    viz: o.viz ?? viz,
    img: o.img === undefined ? first : o.img ?? undefined,
    // A curated line already says what the entry title says.
    title: o.what || head ? undefined : c.title,
    note: o.note,
    chips: o.chips ?? chips(c),
    mark: isResponsibleAi(c) ? profile.aiMark : undefined,
    href: capsuleHref(c) ?? '/impact',
  };
}

export async function workCards(): Promise<CardSpec[]> {
  return (await capsules())
    .filter((c) => c.lane === 'work' && c.tier === 'public' && ERA_SLOT[c.era])
    .map(cardFor)
    .sort(byNewest);
}

/** The landing introduction, newest first. */
export async function introCards(): Promise<CardSpec[]> {
  const all = await capsules();
  const work = introIds.map((id) => {
    const c = all.find((x) => x.id === id);
    if (!c) throw new Error(`Unknown record id in the introduction: ${id}`);
    return cardFor(c);
  });
  return [...work, ...beyondCards].sort(byNewest);
}
