// Who has vouched for me, and from where they stood. Quotes come from claims.ts and the public record.

export type Relationship = 'above' | 'beside' | 'led' | 'learner';
export type Employer = 'IBM' | 'Exeter' | 'Amazon' | 'Philips' | 'Outside work';

export const RELATIONSHIPS: { id: Relationship; label: string; badge: string; note: string }[] = [
  { id: 'above', label: 'Above me', badge: 'Above me', note: 'Managers, senior leaders and awards' },
  { id: 'beside', label: 'Beside me', badge: 'Beside me', note: 'Peers, partners and colleagues' },
  { id: 'led', label: 'People I led or hired', badge: 'Led or hired by me', note: 'Direct reports, team members and hires' },
  { id: 'learner', label: 'Learners and hosts', badge: 'Learner or host', note: 'Participants, candidates and the people who invited me' },
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

/** What a voice praises. lib/endorsements.ts sorts each voice into one of these. */
export type Praise = 'teaching' | 'people' | 'quality' | 'ai' | 'delivery' | 'leadership';

export const PRAISES: { id: Praise; label: string; note: string }[] = [
  { id: 'leadership', label: 'Leadership and influence', note: 'Vision, initiative and bringing people along.' },
  { id: 'ai', label: 'Responsible AI', note: 'AI in regulated medical software, from coaching to tools in daily use.' },
  { id: 'delivery', label: 'Delivery and ownership', note: 'Shipping, owning problems and following through.' },
  { id: 'people', label: 'Hiring and growing people', note: 'Interviewing, the hiring bar, mentoring and careers.' },
  { id: 'quality', label: 'Quality and engineering craft', note: 'Code, tests, reviews and the habits behind them.' },
  { id: 'teaching', label: 'Teaching and coaching', note: 'Sessions, workshops and one-to-one help, in the words of the people in the room.' },
];

export interface PrintItem {
  /** YYYY or YYYY-MM. */
  date: string;
  publication: string;
  issuer: string;
  what: string;
  kind: string;
  /** Public copy of the publication: the original page, or an Internet Archive copy when the original is gone. */
  href?: string;
  hrefLabel?: string;
  /** Record entry with the details. */
  record?: string;
}

/** Publications by others that mention my work. */
export const citedBy: PrintItem[] = [
  {
    date: '2020',
    publication: 'News 24 Kannada',
    issuer: 'Television news',
    what: 'Covered the IAS training scholarship interviews where I sat on the selection panel.',
    kind: 'Media',
    href: 'https://www.facebook.com/thenews24kannada/videos/374991837199387/',
    hrefLabel: 'Watch the segment',
    record: '2020-ias-scholarship-panel',
  },
  {
    date: '2020-10',
    publication: 'Quality function newsletter, October 2020',
    issuer: 'Philips',
    what: 'Its accolades page thanks the Software Center of Excellence team, me included, for its first virtual conference, which drew more than 100 people from businesses worldwide.',
    kind: 'Company',
  },
  {
    date: '2017-12',
    publication: 'Config, December 2017',
    issuer: 'Vemana Institute of Technology',
    what: 'Reports my October 2017 placement seminar for students.',
    kind: 'College',
    href: 'https://web.archive.org/web/20240517222938/https://vemanait.edu.in/pdf/config5-dec-2017.pdf',
    hrefLabel: 'Archived copy',
    record: '2017-10-vemana-placement-talk',
  },
  {
    date: '2016-11',
    publication: 'Self Assessment Report, Information Science and Engineering',
    issuer: 'New Horizon College of Engineering',
    what: 'Lists my seminar on SOLID principles, run with the college chapter of the Computer Society of India.',
    kind: 'College',
    href: 'https://web.archive.org/web/20211202132804/https://newhorizonindia.edu/nhengineering/information-science-engineering/wp-content/uploads/2020/05/SAR-ISE-2018.pdf',
    hrefLabel: 'Archived copy',
    record: '2016-11-nhce-solid-principles-talk',
  },
  {
    date: '2015-12',
    publication: 'MCA department newsletter',
    issuer: 'BMS Institute of Technology',
    what: 'Covers my seminar "Web technologies and us".',
    kind: 'College',
    record: '2015-12-bmsit-web-technologies-talk',
  },
  {
    date: '2014-08',
    publication: 'AGRATHA, Volume 2',
    issuer: 'BMS Institute of Technology, MCA department',
    what: 'Covers my inauguration address on building a successful IT career.',
    kind: 'College',
    record: '2014-08-bmsit-inauguration-career-talk',
  },
  {
    date: '2013-09',
    publication: 'MCA seminars list',
    issuer: 'MVJ College of Engineering',
    what: 'Lists my seminar on Struts and Hibernate.',
    kind: 'College',
  },
  {
    date: '2013-07',
    publication: 'BMSIT newsletter, Volume 1, Issue 1',
    issuer: 'BMS Institute of Technology',
    what: 'Reports that I judged its student project proposal contest.',
    kind: 'College',
    record: '2013-07-bmsit-project-contest-judge',
  },
  {
    date: '2011-07',
    publication: "Regional general manager's monthly report",
    issuer: 'IBM',
    what: "Calls out my co-leadership of the T2E Challenge across Karnataka's engineering colleges.",
    kind: 'Company',
    record: '2011-07-rgm-report-t2e',
  },
  {
    date: '2011-07',
    publication: 'University Relations newsletter',
    issuer: 'IBM',
    what: 'A special mention for my work on the T2E Challenge.',
    kind: 'Company',
    record: '2011-07-university-relations-newsletter',
  },
  {
    date: '2011-06',
    publication: 'CSI Communications, June 2011',
    issuer: 'Computer Society of India',
    what: 'Reports the IBM T2E Challenge workshop at RV College of Engineering, which I co-led.',
    kind: 'Professional body',
    href: 'https://web.archive.org/web/20220130033922/http://csi-india.org.in/communications/CSIC%20June%202011.pdf',
    hrefLabel: 'Archived copy',
  },
];

/** Papers, patents, articles and newsletters I wrote or edited. */
export const published: PrintItem[] = [
  {
    date: '2015',
    publication: 'US 2015/0095117 A1, "Managing key performance indicators"',
    issuer: 'US patent application, IBM',
    what: 'Published patent application.',
    kind: 'Patent',
    href: 'https://patents.justia.com/patent/20150095117',
    hrefLabel: 'Patent record',
  },
  {
    date: '2014-07',
    publication: 'TExeter Times',
    issuer: 'Exeter',
    what: "Edited five issues of the company's internal tech newsletter, 2014 to 2015.",
    kind: 'Newsletter',
    record: '2014-07-launched-texeter-times',
  },
  {
    date: '2013',
    publication: 'US 8,560,487 B2, "Determining and conveying user availability"',
    issuer: 'US patent, IBM',
    what: 'Granted patent, since cited by 27 other patents.',
    kind: 'Patent',
    href: 'https://patents.justia.com/patent/8560487',
    hrefLabel: 'Patent record',
    record: '2013-us-patent-granted',
  },
  {
    date: '2012-10',
    publication: 'IPCOM000222905, "Gesture based human identification protocol"',
    issuer: 'IP.com prior-art database',
    what: 'Published technical disclosure.',
    kind: 'Disclosure',
    href: 'https://priorart.ip.com/IPCOM/000222905',
    hrefLabel: 'Disclosure',
    record: '2012-10-ipcom-gesture-disclosure',
  },
  {
    date: '2012-06',
    publication: 'US 2012/0150789 A1',
    issuer: 'US patent application, IBM',
    what: 'The published application for the user-availability patent.',
    kind: 'Patent',
    href: 'https://patents.justia.com/patent/20120150789',
    hrefLabel: 'Patent record',
    record: '2012-06-patent-application-published',
  },
  {
    date: '2010-01',
    publication: '"Visual Project Dependency Management Tool"',
    issuer: 'CCT-2010 national conference, RV College of Engineering',
    what: 'Paper I presented.',
    kind: 'Paper',
    record: '2010-01-cct-2010-paper',
  },
  {
    date: '2009-11',
    publication: 'YogaVani',
    issuer: 'Yogashree, Bengaluru',
    what: 'Edited four issues of the monthly yoga newsletter, November 2009 to February 2010.',
    kind: 'Newsletter',
  },
  {
    date: '2009-09',
    publication: '"Visual Component Dependency Management"',
    issuer: '2009 Asia Pacific QSE Symposium, Beijing',
    what: 'Paper I presented.',
    kind: 'Paper',
  },
  {
    date: '2009',
    publication: '"Introducing IBM LotusLive", "Introducing IBM LotusLive Engage" and "Introducing IBM SmartCloud Meetings"',
    issuer: 'IBM developerWorks',
    what: 'Three articles I co-wrote.',
    kind: 'Articles',
    record: '2009-developerworks-lotuslive',
  },
];
