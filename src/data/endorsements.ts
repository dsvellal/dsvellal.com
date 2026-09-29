// Who has vouched for me, and from where they stood. Quotes come from claims.ts and the public record.

export type Relationship = 'above' | 'beside' | 'led' | 'learner';
export type Employer = 'IBM' | 'Exeter' | 'Amazon' | 'Philips' | 'Outside work';

export const RELATIONSHIPS: { id: Relationship; label: string; note: string }[] = [
  { id: 'above', label: 'Above me', note: 'Managers, senior leaders and awards' },
  { id: 'beside', label: 'Beside me', note: 'Peers, partners and colleagues' },
  { id: 'led', label: 'People I led or hired', note: 'Direct reports, team members and hires' },
  { id: 'learner', label: 'Learners and hosts', note: 'Participants, candidates and the people who invited me' },
];

export const EMPLOYERS: Employer[] = ['IBM', 'Exeter', 'Amazon', 'Philips', 'Outside work'];

export interface LinkedInRec {
  record: string;
  employer: Employer;
  relationship: Relationship;
  year: string;
  /** Claims quote id, when the recommendation text is quoted on the site. */
  quote?: string;
  /** Another record that already quotes this recommendation. */
  quotedIn?: string;
}

// One entry per recommendation. The archive has two records for the 2014 professor; this keeps one.
export const linkedinRecs: LinkedInRec[] = [
  { record: '2012-04-linkedin-recommendation-first-manager', employer: 'IBM', relationship: 'above', year: '2012' },
  { record: '2012-04-linkedin-recommendation-master-inventor', employer: 'IBM', relationship: 'beside', year: '2012' },
  { record: '2012-06-linkedin-recommendation-teammate', employer: 'IBM', relationship: 'beside', year: '2012' },
  { record: '2013-01-linkedin-recommendation-co-inventor', employer: 'IBM', relationship: 'beside', year: '2013' },
  { record: '2013-12-linkedin-ibm-colleague', employer: 'IBM', relationship: 'beside', year: '2013' },
  {
    record: '2014-01-linkedin-professor',
    employer: 'Outside work',
    relationship: 'learner',
    year: '2014',
    quotedIn: '2012-02-mvit-j2ee-workshop',
  },
  { record: '2014-04-linkedin-ibm-manager', employer: 'IBM', relationship: 'above', year: '2014' },
  { record: '2015-10-linkedin-teammate', employer: 'Exeter', relationship: 'beside', year: '2015' },
  { record: '2015-11-linkedin-us-colleague', employer: 'Exeter', relationship: 'beside', year: '2015' },
  { record: '2015-11-linkedin-direct-report-2-5-years', employer: 'Exeter', relationship: 'led', year: '2015' },
  { record: '2015-11-linkedin-direct-report-3-years', employer: 'Exeter', relationship: 'led', year: '2015' },
  { record: '2017-04-linkedin-recommendation-teammate', employer: 'Amazon', relationship: 'beside', year: '2017' },
  { record: '2023-02-linkedin-recommendation-team-member', employer: 'Philips', relationship: 'led', year: '2023' },
  {
    record: '2025-02-linkedin-recommendation-former-manager',
    employer: 'Philips',
    relationship: 'above',
    year: '2025',
    quote: 'q-nicholson-leader',
  },
  {
    record: '2025-02-linkedin-recommendation-colleague',
    employer: 'Philips',
    relationship: 'beside',
    year: '2025',
    quote: 'q-watson-influence',
  },
  {
    record: '2025-05-linkedin-recommendation-engineer-hired',
    employer: 'Philips',
    relationship: 'led',
    year: '2025',
    quote: 'q-vieira-hired',
  },
];

/** The three recommendations shown beside the map, one from each side of me. */
export const trio = [
  { quote: 'q-nicholson-leader', relation: 'My manager' },
  { quote: 'q-watson-influence', relation: 'A peer' },
  { quote: 'q-vieira-sponsorship', relation: 'An engineer I hired' },
];
