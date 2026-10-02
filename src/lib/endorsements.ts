import { capsules, capsuleOrListHref, recordHref } from './record';
import { talks, talkHref } from './talks';
import { quote, quotes } from '../data/claims';
import { linkedinRecs, type Employer, type PrintItem, type Praise, type Relationship } from '../data/endorsements';

export interface Voice {
  id: string;
  /** Verbatim words, when they are public. */
  text?: string;
  who: string;
  /** What the record says about a recommendation whose text is not public. */
  summary?: string;
  company: string;
  employer: Employer;
  relationship: Relationship;
  praise: Praise;
  year: string;
  linkedin: boolean;
  href: string;
  /** False when the voice has no record entry and the link points back to the endorsements page. */
  recorded: boolean;
}

// First match wins, so the narrower subjects come before the broad ones.
const PRAISE_WORDS: [Praise, RegExp][] = [
  ['ai', /\b(ai|genai|copilot|llm|agents?|prompt\w*)\b/i],
  ['people', /\b(hir(e|ed|es|ing)|interview\w*|bar[- ]?raiser\w*|candidates?|mentor\w*|careers?)\b/i],
  ['teaching', /\b(sessions?|workshops?|train\w*|teach\w*|taught|class(es)?|course|presentation|presenter|talk|explain\w*|seminar|learn\w*|coach\w*)\b/i],
  ['quality', /\b(quality|code|coding|clean|tests?|testing|craft\w*|duplicat\w*|defects?|reviews?)\b/i],
  ['delivery', /\b(deliver\w*|launch\w*|releases?|deadline|ownership|owned|ship\w*|on time|customers?|production)\b/i],
  ['leadership', /\b(lead\w*|vision|inspir\w*|influenc\w*|strateg\w*|initiative|culture|role model)\b/i],
];

const THEME_PRAISE: Record<string, Praise> = {
  ai: 'ai',
  hiring: 'people',
  people: 'people',
  teaching: 'teaching',
  community: 'teaching',
  quality: 'quality',
  reliability: 'quality',
  delivery: 'delivery',
  cost: 'delivery',
  'fraud-risk': 'delivery',
  payments: 'delivery',
  catalog: 'delivery',
  leadership: 'leadership',
};

/** What a voice praises: its own words first, then the record entry's themes. */
function praiseOf(words: string, themes: string[], relationship: Relationship): Praise {
  for (const [p, re] of PRAISE_WORDS) if (re.test(words)) return p;
  for (const t of themes) if (THEME_PRAISE[t]) return THEME_PRAISE[t];
  return relationship === 'learner' ? 'teaching' : 'leadership';
}

/** Public words of a fitting length, from someone senior or close, score highest. */
export function voiceScore(v: Voice): number {
  const weight = { above: 3, beside: 2, led: 2, learner: 1 };
  return (
    (v.text ? 4 : -10) +
    weight[v.relationship] +
    (v.linkedin ? 2 : 0) +
    (v.text && v.text.length >= 60 && v.text.length <= 260 ? 2 : 0) +
    (Number(v.year) >= 2020 ? 1 : 0)
  );
}

/** The quote that leads a theme, recent first among equals. */
export function leadVoice(items: Voice[]): Voice | undefined {
  return [...items].sort((a, b) => voiceScore(b) - voiceScore(a) || b.year.localeCompare(a.year))[0];
}

/** The strongest quotes for cards. A card may cut a long quote, so long ones need a page that shows it whole. */
export function topVoices(items: Voice[], n: number): Voice[] {
  return items
    .filter((v) => v.text && (v.recorded || v.text.length <= 320))
    .sort((a, b) => voiceScore(b) - voiceScore(a) || b.year.localeCompare(a.year))
    .slice(0, n);
}

export const empKey = (e: string) => e.toLowerCase().replace(/\s+/g, '-');

export async function printLinks(item: PrintItem) {
  return { ...item, recordLink: item.record ? await recordHref(item.record) : undefined };
}

const EMPLOYERS: Record<string, Employer> = { IBM: 'IBM', Exeter: 'Exeter', Amazon: 'Amazon', Philips: 'Philips' };
export const employerOf = (company: string): Employer => EMPLOYERS[company] ?? 'Outside work';

/** Where the speaker stood relative to me, read from the role as the record states it. */
export function relationshipOf(role: string): Relationship {
  const r = role.toLowerCase();
  if (/leadership team/.test(r)) return 'above';
  if (/hired by me|direct report|team member|trainee/.test(r)) return 'led';
  if (/participant|candidate|student|professor|attendee/.test(r)) return 'learner';
  if (/program manager|coordinator/.test(r)) return 'beside';
  if (/manager|head|director|executive|chief|leader|award|announcement|toastmasters/.test(r)) return 'above';
  return 'beside';
}

const firstUpper = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export async function voices(): Promise<Voice[]> {
  const all = await capsules();
  const byId = new Map(all.map((c) => [c.id, c]));
  const used = new Set<string>();
  const out: Voice[] = [];

  for (const rec of linkedinRecs) {
    const c = byId.get(rec.record);
    if (!c) throw new Error(`LinkedIn recommendation ${rec.record} is not in the public record`);
    const holder = rec.quotedIn ? byId.get(rec.quotedIn) : c;
    for (const q of [...(c.quotes ?? []), ...(holder?.quotes ?? [])]) used.add(q.text);
    for (const q of Object.values(quotes)) if (q.capsule === rec.record) used.add(q.text);
    const picked = rec.quote ? quote(rec.quote) : undefined;
    const recorded = holder?.quotes?.[0];
    const text = picked?.text ?? recorded?.text;
    const described = c.title.replace(/^.*?LinkedIn recommendation from (?:an? |the |my )?/i, '');
    out.push({
      id: `li-${rec.record}`,
      text,
      who: firstUpper(picked?.role ?? recorded?.role ?? described),
      summary: text ? undefined : c.title,
      company: picked?.company ?? recorded?.company ?? rec.employer,
      employer: rec.employer,
      relationship: rec.relationship,
      praise: praiseOf(text ?? c.title, [...c.themes, ...(holder?.themes ?? [])], rec.relationship),
      year: rec.year,
      linkedin: true,
      href: capsuleOrListHref(c),
      recorded: true,
    });
  }

  for (const q of Object.values(quotes)) {
    if (used.has(q.text)) continue;
    used.add(q.text);
    const c = q.capsule ? byId.get(q.capsule) : undefined;
    const relationship = relationshipOf(q.role);
    out.push({
      id: q.id,
      text: q.text,
      who: q.role,
      company: q.company,
      employer: employerOf(q.company),
      relationship,
      praise: praiseOf(q.text, c?.themes ?? [], relationship),
      year: q.year,
      linkedin: false,
      href: c ? capsuleOrListHref(c) : `/endorsements#${q.id}`,
      recorded: Boolean(c),
    });
  }

  for (const c of all) {
    (c.quotes ?? []).forEach((q, i) => {
      if (used.has(q.text)) return;
      used.add(q.text);
      const relationship = relationshipOf(q.role);
      out.push({
        id: `${c.id}-${i + 1}`,
        text: q.text,
        who: q.role,
        company: q.company,
        employer: employerOf(q.company),
        relationship,
        praise: praiseOf(q.text, c.themes, relationship),
        year: q.date.replace(/^~/, '').slice(0, 4),
        linkedin: false,
        href: capsuleOrListHref(c),
        recorded: true,
      });
    });
  }

  for (const t of await talks()) {
    (t.feedback?.quotes ?? []).forEach((text, i) => {
      if (used.has(text)) return;
      used.add(text);
      out.push({
        id: `${t.id}-feedback-${i + 1}`,
        text,
        who: `Participant, ${t.title}`,
        company: t.company,
        employer: employerOf(t.company),
        relationship: 'learner',
        praise: praiseOf(text, ['teaching'], 'learner'),
        year: t.year,
        linkedin: false,
        href: talkHref(t),
        recorded: true,
      });
    });
  }

  return out.sort((a, b) => b.year.localeCompare(a.year) || a.id.localeCompare(b.id));
}
