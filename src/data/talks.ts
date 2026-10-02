// Talk topics for the /talks page. Each session in src/content/talks belongs to exactly one topic,
// matched on its title; lib/talks.ts fails the build when a session matches none or several.

export type Subject = 'ai' | 'quality' | 'delivery' | 'hiring' | 'students' | 'community';

export const SUBJECTS: { id: Subject; title: string; note: string }[] = [
  {
    id: 'ai',
    title: 'AI in software engineering',
    note: 'Using AI for coding, requirements, traceability and testing under IEC 62304, with people making the final call.',
  },
  {
    id: 'quality',
    title: 'Code quality and craft',
    note: 'Quality gates at the developer desk, technical debt you can see, and design that lasts.',
  },
  {
    id: 'delivery',
    title: 'Delivery and engineering practice',
    note: 'DORA metrics, continuous value delivery and agile ways of working, used to manage, not to keep score.',
  },
  {
    id: 'hiring',
    title: 'Hiring and team culture',
    note: 'Sessions that raised the bar for interviewers and hiring managers.',
  },
  {
    id: 'students',
    title: 'For students',
    note: 'Interviews, careers, learning habits and the technology behind everyday products, at engineering colleges.',
  },
  {
    id: 'community',
    title: 'Conferences, judging and community',
    note: 'Panels, hackathons, contest judging, and yoga sessions outside engineering.',
  },
];

export interface TopicDef {
  id: string;
  title: string;
  subject: Subject;
  /** Who the sessions were for, as a noun phrase: "Philips University learners". */
  who: string;
  match: RegExp;
  /** Curated headline: `value` replaces the session count, `what` the "sessions for ..." line. */
  value?: string;
  what?: string;
}

export const TOPICS: TopicDef[] = [
  // AI in software engineering
  { id: 'iec-62304-ai', subject: 'ai', title: 'IEC 62304, and how AI helps you stay compliant', who: 'Philips University learners', match: /^62304 Standard/ },
  {
    id: 'copilot-coding',
    subject: 'ai',
    title: 'Coding with GitHub Copilot',
    who: 'Philips engineers, mostly through Philips University',
    match: /^(Code|Coding) with GitHub Copilot|^Leveraging Copilot|^Coding and developing agents/,
  },
  {
    id: 'prompt-engineering-analysts',
    subject: 'ai',
    title: 'Prompt and context engineering for analysts',
    who: 'the Philips North America analytics community',
    match: /^Prompt (and context )?engineering, part/,
  },
  { id: 'ai-awareness', subject: 'ai', title: 'Foundational AI awareness: context engineering', who: 'Philips University learners', match: /^Foundational AI awareness/ },
  {
    id: 'office-copilot',
    subject: 'ai',
    title: 'Office 365 Copilot for non-technical roles',
    who: 'Philips University learners in non-technical roles',
    match: /^Mastering Office 365/,
  },
  { id: 'ai-augmented-engineering', subject: 'ai', title: 'AI-augmented software engineering', who: 'Philips image-guided therapy engineers', match: /^AI-augmented software engineering/ },
  {
    id: 'genai-workshop',
    subject: 'ai',
    title: 'Hands-on GenAI for a device software team',
    who: 'one Philips device team in Plymouth, Minnesota',
    match: /^GenAI workshop day/,
  },
  {
    id: 'ai-requirements',
    subject: 'ai',
    title: 'AI for requirements, traceability and test generation',
    who: 'Philips engineering audiences',
    match: /^AI agent for requirements|^AI driven Golden traceability|^From vague to verified|^Second Innovation Impact Week/,
  },
  {
    id: 'ai-at-work',
    subject: 'ai',
    title: 'AI at work for Philips communities',
    who: 'Philips engineering, IT and operations communities',
    match: /^GROW 3\.0|^AI sessions in IGT-AI day|^IT Connect|^AI Session for LATAM/,
  },
  {
    id: 'tools-demo',
    subject: 'ai',
    title: 'Software tools demo, including GitHub Copilot',
    who: 'the Philips Innovation & Strategy launch event in Cambridge',
    match: /^Innovation & Strategy launch event/,
  },

  // Code quality and craft
  {
    id: 'tech-debt',
    subject: 'quality',
    title: 'Technical debt and CodeScene',
    who: 'Philips engineers and leaders',
    match: /^Tech debt: what|^CodeScene for technical debt|technical debt with CodeScene|^Prioritizing tech debt|^Obliterate your technical debt/,
  },
  { id: 'design-patterns', subject: 'quality', title: 'Design patterns', who: 'students and Exeter engineers', match: /design pattern|^Advanced DPs/i },
  { id: 'solid', subject: 'quality', title: 'SOLID principles', who: 'students and Philips engineers', match: /^SOLID principles/ },
  {
    id: 'clean-code',
    subject: 'quality',
    title: 'Clean code and test-driven development',
    who: 'Philips software teams in India',
    match: /^Clean code, clean test|^Unit testing workshop|^Behavior- and test-driven|^Live code with Behavior|^New hires: clean code/,
  },
  {
    id: 'coding-practice',
    subject: 'quality',
    title: 'A coding practice program, with dojos and pairing',
    who: 'Philips engineers in India',
    match: /^Coding practice initiative|^Code dojo|^Pair programming/,
  },
  {
    id: 'code-duplication',
    subject: 'quality',
    title: 'Finding and removing duplicate code',
    who: 'Philips software teams and the wider Philips software community',
    match: /code duplication/i,
  },
  {
    id: 'refactoring-workshops',
    subject: 'quality',
    title: 'Refactoring workshops',
    who: 'Philips software teams at several sites',
    match: /refactoring workshop/,
    value: '13',
    what: 'refactoring workshop sessions for Philips software teams at several sites',
  },
  {
    id: 'quality-tooling',
    subject: 'quality',
    title: 'Code quality tooling',
    who: 'Philips software teams',
    match: /^Crafting code quality: tooling|^Code quality tools training|^S101 architecture/,
  },
  { id: 'mutation-testing', subject: 'quality', title: 'Mutation testing', who: 'a Philips software team', match: /^Mutation testing/ },
  {
    id: 'back-to-basics',
    subject: 'quality',
    title: 'Back to basics: design, code, test and review patterns',
    who: 'Philips engineers in Bengaluru, in the room and online',
    match: /^#Back2Basics/,
  },
  { id: 'java-best-practices', subject: 'quality', title: 'Java best practices', who: 'Philips software teams in Bengaluru', match: /^Java best practices/ },
  {
    id: 'behaviour-metrics',
    subject: 'quality',
    title: 'Program behaviour metrics: tracking how code behaves, live',
    who: 'people at Philips India',
    match: /^Program behaviour metrics/,
  },
  { id: 'shift-left', subject: 'quality', title: 'Shift-left quality', who: 'Philips teams and The Developers Conference in Brazil', match: /shift-left|shifting left/i },
  {
    id: 'microservices-reliability',
    subject: 'quality',
    title: 'Microservices, reliability and design thinking',
    who: 'a Philips software team',
    match: /^Microservices, reliability/,
  },
  {
    id: 'dependency-tool',
    subject: 'quality',
    title: 'A visual dependency management tool',
    who: 'an IBM quality symposium and the CCT-2010 conference',
    what: 'presentations of a visual dependency management tool, at an IBM quality symposium and the CCT-2010 conference',
    match: /^Visual (component|project) dependency/,
  },

  // Delivery and engineering practice
  { id: 'dora', subject: 'delivery', title: 'DORA metrics for software leaders', who: 'Philips University learners and internal communities', match: /DORA/ },
  { id: 'cvd', subject: 'delivery', title: 'Leading continuous value delivery', who: 'Philips University learners', match: /^Leading Continuous Value Delivery/ },
  {
    id: 'agile',
    subject: 'delivery',
    title: 'Agile software development workshops',
    who: 'Amazon and Exeter engineers',
    match: /^EE (Scrum|Product Ownership) Workshop|^Adopting agile like practices/,
  },
  { id: 'github', subject: 'delivery', title: 'GitHub foundations', who: 'Philips software teams', match: /^GitHub (Foundational|foundational|Tech Talks|discussion)/ },
  { id: 'observability', subject: 'delivery', title: 'Observability for customer delight', who: 'people at a Philips global software excellence conference', match: /^Observability/ },
  {
    id: 'developer-experience',
    subject: 'delivery',
    title: 'Why great software companies obsess about developer experience',
    who: 'a Philips engineering audience',
    match: /^Why do great software companies/,
  },

  // Hiring and team culture
  { id: 'bar-raiser', subject: 'hiring', title: 'Bar-raiser interviewing', who: 'Philips hiring managers and interviewers', match: /^Bar-raiser training/ },
  {
    id: 'interviewer-skills',
    subject: 'hiring',
    title: 'Interviewer skills',
    who: 'Philips interviewers',
    match: /^Conducting interviews|^Interviewing: discussion|^Relooking at interviews|^Skill-raiser|^Interviewing tips|^Interviewing skills primer/,
  },
  { id: 'culture-workshop', subject: 'hiring', title: 'Cultural behaviours workshop', who: 'a Philips team', match: /^Cultural behaviours/ },

  // For students
  {
    id: 'interviews-careers',
    subject: 'students',
    title: 'Interviews and careers in IT',
    who: 'students at four colleges',
    match: /^Lessons from 50 failed|^Interviews: How to prepare|^How to prepare for (technical )?interviews|^Java and training towards placement|^Career Management in IT/,
  },
  { id: 'learning-attitude', subject: 'students', title: 'A learning attitude', who: 'students at BMSIT and SIT', match: /attitude towards learning|learning attitude/i },
  {
    id: 'presenting-writing',
    subject: 'students',
    title: 'Presenting and technical writing',
    who: 'students at SIT and Dr. AIT',
    match: /great presentation|think on your feet|^Technical writing and presentation|^Technical paper writing/,
  },
  { id: 'uncertainty', subject: 'students', title: 'Dealing with uncertainty', who: 'students at SIT and Pramti Hillview Academy', match: /uncertainty/ },
  { id: 'java-j2ee', subject: 'students', title: 'Java, J2EE, Struts and Hibernate', who: 'engineering students at four colleges', match: /J2EE|^Struts and Hibernate/ },
  {
    id: 'web-technologies',
    subject: 'students',
    title: 'Web technologies',
    who: 'students at three colleges and the Computer Society of India',
    match: /^Web 2\.0|^JavaScript and Ajax|^Web Technologies & Us/,
  },
  { id: 'social-networks', subject: 'students', title: 'How social networks work', who: 'students at BMSIT and SIT', match: /Social-net|^Social media and the world of microservices/ },
  { id: '4g', subject: 'students', title: '4G internet and associated technologies', who: 'students at MVJCE', match: /^4G Internet/ },
  { id: 'android', subject: 'students', title: 'Android application development', who: 'students at VVIET', match: /^Android application/ },
  { id: 'dotnet', subject: 'students', title: 'C# and .NET', who: 'students at Vemana Institute of Technology', match: /^C# & \.NET/ },
  { id: 'coding-before-coding', subject: 'students', title: 'Coding before coding', who: 'students at MVJCE', match: /^Coding before coding/ },
  { id: 't2e', subject: 'students', title: 'T2E Challenge workshops', who: 'students at ISiM and RVCE', match: /^T2E Challenge/ },

  // Conferences, judging and community
  {
    id: 'judging',
    subject: 'community',
    title: 'Judging contests and panels',
    who: 'colleges, a hackathon and a scholarship panel',
    what: 'judging roles at college contests, a hackathon and a scholarship panel',
    match: /^Project proposal contest|^Java programming contest|^Java Jizz|^Judge - Paper|^Hackathon finals|^Interview panellist/,
  },
  { id: 'hackdays', subject: 'community', title: 'IBM hackday briefings', who: 'IBM India Software Lab engineers', match: /Hackday/ },
  { id: 'developer-portal-hackathon', subject: 'community', title: 'USA developer portal hackathon', who: 'Philips US engineers in several cities', match: /^USA Developer Portal Hackathon/ },
  { id: 'developer-days', subject: 'community', title: 'Developer Days India 2024', who: 'people at Philips Innovation Campus, Bengaluru', match: /^Developer Days India/ },
  {
    id: 'developers-panel',
    subject: 'community',
    title: 'Developers are asked for more, more, more. How much is enough?',
    who: 'people at a Philips developer conference in Bengaluru',
    match: /^Fireside Chat/,
  },
  { id: 'ides-webinar', subject: 'community', title: 'IDEs: your next programming platform', who: 'the IBM Technical Experts Council', match: /^IDEs:/ },
  { id: 'ultrasound-forum', subject: 'community', title: 'Ultrasound virtualisation', who: 'a Philips Ultrasound innovation forum', match: /^Ultrasound virtualisation/ },
  { id: 'career-journey', subject: 'community', title: 'The journey so far, a career talk', who: 'an IBM audience', match: /^The journey so far/ },
  { id: 'yoga', subject: 'community', title: 'Yoga and stress management', who: 'a yoga course, a college and Exeter colleagues', match: /yoga/i },
];
