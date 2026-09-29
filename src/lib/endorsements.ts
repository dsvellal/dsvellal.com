import { capsules, capsuleOrListHref } from './record';
import { talks, talkHref } from './talks';
import { quote, quotes } from '../data/claims';
import { linkedinRecs, type Employer, type Relationship } from '../data/endorsements';

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
  year: string;
  linkedin: boolean;
  href: string;
  /** False when the voice has no record entry and the link points back to the endorsements page. */
  recorded: boolean;
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
    out.push({
      id: q.id,
      text: q.text,
      who: q.role,
      company: q.company,
      employer: employerOf(q.company),
      relationship: relationshipOf(q.role),
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
      out.push({
        id: `${c.id}-${i + 1}`,
        text: q.text,
        who: q.role,
        company: q.company,
        employer: employerOf(q.company),
        relationship: relationshipOf(q.role),
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
        year: t.year,
        linkedin: false,
        href: talkHref(t),
        recorded: true,
      });
    });
  }

  return out.sort((a, b) => b.year.localeCompare(a.year) || a.id.localeCompare(b.id));
}
