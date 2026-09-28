export interface Talk {
  year: string;
  title: string;
  venue: string;
  format: string;
  detail?: string;
  featured?: boolean;
}

export const topics = [
  {
    title: 'AI in regulated engineering',
    body: 'Using AI for requirements, traceability and testing under IEC 62304, with people making the final call.',
  },
  {
    title: 'Engineering flow',
    body: 'DORA metrics and continuous value delivery as a management tool, not a scoreboard.',
  },
  {
    title: 'Craftsmanship and quality',
    body: 'Quality gates at the developer desk, technical debt you can see, and design that lasts.',
  },
  {
    title: 'Careers and learning',
    body: 'Interviewing, handling uncertainty, and building a learning habit. Mostly for students.',
  },
];

export const talks: Talk[] = [
  {
    year: '2026',
    title: 'IEC 62304: why it matters to you, and how AI can help you stay compliant',
    venue: 'Philips University',
    format: 'Course',
    detail: 'Recurring, rated up to 9.1 out of 10',
    featured: true,
  },
  {
    year: '2026',
    title: 'Prompt and context engineering, parts 1 to 3',
    venue: 'North America analytics community, Philips',
    format: 'Series',
    detail: '82 to 101 analysts per part, part 3 rated 10 out of 10',
  },
  {
    year: '2026',
    title: 'AI-augmented software engineering: testing, tech debt, prompt and context',
    venue: 'Philips image-guided therapy engineering',
    format: 'Series',
  },
  {
    year: '2025',
    title: 'Hands-on GenAI for software teams, three days in person',
    venue: 'Philips engineering site, Plymouth, Minnesota',
    format: 'Workshop',
    detail: 'Self-rated confidence rose from 4.5 to 7.6 out of 10',
    featured: true,
  },
  {
    year: '2025',
    title: 'Unlocking the future with AI',
    venue: 'Philips innovation engineering community',
    format: 'Technical session',
    detail: 'Rated 9.2 out of 10',
  },
  {
    year: '2025',
    title: 'Coding with GitHub Copilot, and leading continuous value delivery',
    venue: 'Philips University, recurring courses',
    format: 'Courses',
  },
  {
    year: '2024',
    title: 'SOLID principles series',
    venue: 'Philips software community',
    format: 'Talk series',
    detail: 'One talk rated 8.6 out of 10 across 37 responses',
    featured: true,
  },
  {
    year: '2023',
    title: 'Back to basics: design, code, test and review patterns',
    venue: 'Philips Innovation Campus, Bengaluru',
    format: 'Hands-on workshop',
    detail: 'About 50 engineers, in the room and online',
    featured: true,
  },
  {
    year: '2021',
    title: "Less work, more value: why everyone's shifting left",
    venue: 'The Developers Conference, Brazil (virtual)',
    format: 'Demo',
    detail: 'International developer conference',
    featured: true,
  },
  {
    year: '2021',
    title: 'Observability for customer delight',
    venue: 'Philips global software excellence conference',
    format: 'Workshop',
  },
  {
    year: '2020',
    title: 'Bar-raiser training for interviewers',
    venue: 'Philips India',
    format: 'Training',
    detail: 'Seven cohorts, 2020 to 2021',
  },
  {
    year: '2020',
    title: 'How to deal with uncertainty',
    venue: 'Siddaganga Institute of Technology, Tumakuru',
    format: 'Seminar',
  },
  {
    year: '2019',
    title: 'Developers are asked for more, more, more. How much is enough?',
    venue: 'Philips developer conference, Bengaluru',
    format: 'Panel',
    detail: 'About 500 attendees',
    featured: true,
  },
  {
    year: '2019',
    title: 'Clean code, clean test',
    venue: 'Philips India software teams',
    format: 'Two-day workshop',
  },
  {
    year: '2018',
    title: 'SOLID principles of programming',
    venue: 'RV College of Engineering, Bengaluru',
    format: 'Seminar',
  },
  {
    year: '2017',
    title: 'Scrum workshop',
    venue: 'Amazon engineering, India',
    format: 'Workshop',
    detail: 'Top presenter score, 4.6 out of 5',
  },
  {
    year: '2016',
    title: 'Lessons from 50 failed interviews',
    venue: 'BMS Institute of Technology, Bengaluru',
    format: 'Seminar',
  },
  {
    year: '2014',
    title: 'Design patterns: an introduction, and advanced patterns',
    venue: 'Exeter engineering training program',
    format: 'Training',
  },
  {
    year: '2013',
    title: 'Behind the scenes of social networks',
    venue: 'BMS Institute of Technology, Bengaluru',
    format: 'Seminar',
    detail: 'About 300 students',
  },
  {
    year: '2011',
    title: 'IDEs: your next programming platform',
    venue: 'IBM Technical Experts Council',
    format: 'Webinar',
  },
  {
    year: '2011',
    title: 'Evolution of design patterns',
    venue: 'New Horizon College of Engineering, Bengaluru',
    format: 'Seminar',
  },
  {
    year: '2010',
    title: 'Visual project dependency management',
    venue: 'National conference on computing, communication and technology',
    format: 'Paper presentation',
  },
];
