// Source-of-truth dictionary. `id.ts` is typed against this, so a missing key fails the build.
export default {
  nav: {
    tagline: '/ backend systems',
    sheets: [
      { code: '01', label: 'Overview', href: '#hero' },
      { code: '02', label: 'Tech stack', href: '#stack' },
      { code: '03', label: 'Experience', href: '#experience' },
      { code: '04', label: 'Practice', href: '#architecture' }
    ],
    pages: [
      { label: 'Projects', href: '/projects' },
      { label: 'Blog', href: '/blog' }
    ],
    dashboard: 'DASHBOARD',
    logout: 'Log out',
    downloadCv: 'Download CV',
    toLight: 'Switch to light mode',
    toDark: 'Switch to dark mode',
    switchLang: 'Bahasa Indonesia',
    toggleNav: 'Toggle navigation'
  },
  sheet: 'SHEET',
  hero: {
    caption: 'SYSTEM OVERVIEW — GENERAL ARRANGEMENT',
    location: 'Bandung, Indonesia · UTC+7 · remote',
    open: 'Open to senior IC roles',
    title: ['Backend systems,', 'drawn to spec.'],
    subtitle: 'SENIOR BACKEND ENGINEER · 10+ YEARS',
    bio: 'Ten years building fintech-grade marketplace and payment platforms on Ruby on Rails, Go, and PostgreSQL. Deep specialization in Stripe Connect infrastructure — split payments, escrow, subscriptions, automated payouts — owned end to end from technical design to production. Previously an Engineering Manager behind a system sustaining 1,000 TPS at 99.9% uptime; most recently took an early-stage rental and services marketplace from zero to launch. Now focused on hands-on senior IC work with distributed teams.',
    viewProjects: 'View projects',
    experienceLog: 'Experience log',
    scale: 'SCALE 1:1',
    stats: [
      { label: 'STATUS', value: 'running', running: true },
      { label: 'UPTIME', value: '99.99%', running: false },
      { label: 'PEAK TPS', value: '1,000', running: false },
      { label: 'p95 LATENCY', value: '<150ms', running: false }
    ]
  },
  stack: {
    title: 'Tech stack',
    note: 'Parts list — the tooling these systems are actually built on.',
    groups: [
      { code: 'INF · 01', title: 'Infrastructure', items: ['Docker / Docker Compose', 'Kubernetes', 'Terraform (IaC)', 'AWS / GCP', 'Nginx / Traefik'] },
      { code: 'LNG · 02', title: 'Languages', items: ['Ruby / Rails', 'Go', 'Node.js / NestJS', 'PHP / Laravel', 'JavaScript'] },
      { code: 'DAT · 03', title: 'Data storage', items: ['PostgreSQL', 'MySQL / SQL Server', 'Redis / Memcached', 'MongoDB', 'Prisma / ActiveRecord'] },
      { code: 'PRF · 04', title: 'Performance', items: ['Prometheus / Grafana', 'Distributed tracing', 'Load balancing', 'Query & index tuning', 'BullMQ / Sidekiq'] }
    ]
  },
  experience: {
    title: 'Experience',
    note: 'Elevation view — most recent position at the top.',
    items: [
      {
        period: 'Mar 2022 — Feb 2026',
        role: 'Senior Backend Developer',
        company: 'Virtual Spirit',
        current: false,
        description: [
          'Architected and led the backend development of a large-scale Property Rental System from scratch using Ruby on Rails and PostgreSQL.',
          'Led a team of backend developers, conducting code reviews via Git and providing technical mentorship to newcomers.',
          'Reduced system downtime by 20% through proactive troubleshooting and implementing automated monitoring.',
          'Optimized development workflow by breaking down complex business requirements into actionable technical tasks and leading daily scrum meetings.',
          'Developed custom Metaprogramming modules that significantly improved code efficiency and reduced boilerplate across the system.',
          'Managed end-to-end deployment cycles for staging and production environments, ensuring 99.9% system uptime.',
          'Collaborated cross-functionally with QA, Business Analysts, and Project Managers to ensure on-time delivery of critical features.'
        ],
        tags: ['Ruby on Rails', 'PostgreSQL', 'Metaprogramming', 'Git', 'CI/CD']
      },
      {
        period: 'Nov 2017 — Feb 2022',
        role: 'Backend Engineering Manager',
        company: 'PT Weyland Indonesia Perkasa',
        current: false,
        description: [
          'Managed backend engineering for high-transaction platforms, including Payment Point Online Bank (PPOB) and Food Delivery systems, utilizing Ruby on Rails and MySQL.',
          'Directed the end-to-end lifecycle of application development from initial skeleton design to production launch.',
          'Enhanced transaction reliability and efficiency through the strategic integration of third-party payment and service APIs.',
          'Bridged the gap between technical execution and business goals by reporting directly to the CTO and participating in strategic project discussions.',
          'Facilitated team growth through structured training programs for new developers and rigorous code quality audits.'
        ],
        tags: ['Ruby on Rails', 'MySQL', 'API Integration']
      },
      {
        period: 'Oct 2015 — Dec 2017',
        role: 'Backend Developer',
        company: 'Walden Global Services',
        current: false,
        description: [
          'Developed and maintained the Nutrifood Shipping Export & Import system using Ruby on Rails and SQL Server.',
          'Improved data management efficiency by implementing database best practices and optimizing complex SQL queries.',
          'Served as a technical lead for specific sprints, managing SOW estimations, milestones, and developer assignments.',
          'Authored core application skeletons and shared libraries to be utilized by the wider development team to ensure consistency.'
        ],
        tags: ['Ruby on Rails', 'SQL Server']
      },
      {
        period: 'Jan 2014 — Aug 2015',
        role: 'Backend Developer',
        company: 'Politeknik Piksi Ganesha',
        current: false,
        description: [
          'Built a comprehensive Certification Management System using Laravel and MySQL.',
          'Translated complex business requirements into functional product features while maintaining platform stability.'
        ],
        tags: ['Laravel', 'MySQL']
      }
    ]
  },
  practice: {
    title: 'How I build',
    note: 'Notes and standards applied across every drawing.',
    intro: 'I treat a backend like a set of drawings: explicit contracts, dimensions you can check, and a revision history anyone can read. Domain logic sits in interactors rather than models, money paths are idempotent by construction, and every service ships with the telemetry needed to prove it works.',
    principles: [
      { code: 'N1', title: 'Contracts before code', body: 'Interactor and organizer patterns keep domain logic out of models and controllers, so behaviour is testable in isolation.' },
      { code: 'N2', title: 'Money paths are idempotent', body: 'Webhook keys, outbox tables, and event-sourced ledgers — retries never double-charge or double-pay.' },
      { code: 'N3', title: 'Measured, not assumed', body: 'p95 budgets per endpoint, tracing on every hop, and dashboards that a non-engineer can read.' },
      { code: 'N4', title: 'Tests as a foundation', body: 'RSpec suites gated in CI on all payment and auth paths, built from the first commit rather than retrofitted.' }
    ],
    detail: 'detail B — request path',
    nodes: [
      { code: '01', label: 'edge / load balancer', meta: 'nginx · alb' },
      { code: '02', label: 'api service', meta: 'rails · go' },
      { code: '03', label: 'domain interactors', meta: 'idempotent' },
      { code: '04', label: 'queue & workers', meta: 'sidekiq · bullmq' },
      { code: '05', label: 'postgres + redis', meta: 'replica · cache' }
    ],
    observable: 'observable at every hop'
  },
  footer: {
    titleBlock: 'TITLE BLOCK',
    heading: 'Have a system that needs drawing up?',
    body: 'Available for senior backend and platform work with remote, cross-functional teams. Reviews, architecture audits, and payment-infrastructure builds included.',
    fields: [
      { label: 'DRAWN BY', value: 'Gilang Ramadan' },
      { label: 'DISCIPLINE', value: 'Backend / platform' },
      { label: 'SCALE', value: '1 : 1' },
      { label: 'DRAWING NO.', value: 'GR-BE-2026-01', accent: true },
      { label: 'REV', value: '03' },
      { label: 'SHEET', value: '1 of 1' }
    ],
    copyright: 'all drawings reserved',
    rev: 'Systems Blueprint · rev 03'
  },
  blog: {
    caption: 'REVISION LOG — FIELD NOTES',
    title: 'Blog',
    intro: 'Notes on software architecture, backend engineering, and building high-performance systems.',
    searchPlaceholder: 'Search entries by title, content, or tag',
    searchAria: 'Search entries',
    loadError: 'ERR — could not load posts:',
    entries: 'ENTRIES',
    latest: 'LATEST',
    sorted: 'SORTED NEWEST FIRST',
    minRead: 'MIN READ',
    views: 'VIEWS',
    readEntry: 'Read entry',
    noMatch: 'No entries match that search.',
    backHome: 'Return to sheet 01',
    seoTitle: 'Blog | Gilang Ramadan',
    seoDescription: 'Sharing thoughts on software architecture and backend engineering.',
    preview: 'PREVIEW — UNPUBLISHED DRAFT',
    back: 'Back to revision log',
    notFound: 'Entry not found',
    notFoundBody: 'this entry is not in the revision log',
    backToBlog: 'Back to blog',
    entry: 'ENTRY',
    edit: 'EDIT ENTRY',
    plate: 'PLATE',
    coverMissing: 'COVER IMAGE TO BE SUPPLIED',
    fig: 'FIG. 1',
    scale: 'SCALE NTS',
    drawnBy: 'DRAWN BY',
    authorBio: 'Fullstack engineer specialized in high-performance backend systems and modern frontend architectures.',
    onThisSheet: 'ON THIS SHEET',
    entryRecord: 'ENTRY RECORD',
    record: { entry: 'ENTRY', filed: 'FILED', status: 'STATUS', readTime: 'READ TIME', views: 'VIEWS', tags: 'TAGS', min: 'MIN' },
    prevSheet: 'PREVIOUS SHEET',
    nextSheet: 'NEXT SHEET'
  },
  projects: {
    caption: 'DRAWING INDEX — SELECTED WORKS',
    title: 'Projects',
    intro: 'Scalable systems, backend services, and full-stack platforms — each entry filed with its stack and year.',
    loadError: 'ERR — could not load projects:',
    empty: 'no drawings filed yet',
    totalSheets: 'TOTAL SHEETS',
    span: 'SPAN',
    discipline: 'DISCIPLINE · BACKEND / PLATFORM',
    rev: 'REV 03',
    plate: 'PLATE',
    details: 'Details',
    liveDemo: 'Live demo',
    sourceCode: 'Source code',
    backHome: 'Return to sheet 01',
    seoTitle: 'Projects | Gilang Ramadan',
    seoDescription: 'A collection of scalable systems, backend services, and full-stack applications.',
    back: 'Back to drawing index',
    notFound: 'Drawing not found',
    notFoundBody: 'this project is not in the drawing index',
    backToProjects: 'Back to projects',
    dwg: 'DWG',
    disciplineShort: 'BACKEND / PLATFORM',
    edit: 'EDIT PROJECT',
    screenshotMissing: 'SCREENSHOT TO BE SUPPLIED',
    fig: 'FIG. 1',
    scale: 'SCALE NTS',
    about: 'About the project',
    generalNotes: 'GENERAL NOTES',
    specification: 'SPECIFICATION',
    spec: { drawingNo: 'DRAWING NO.', sheet: 'SHEET', year: 'YEAR', discipline: 'DISCIPLINE', disciplineValue: 'Backend / platform', demo: 'DEMO', source: 'SOURCE', available: 'AVAILABLE' },
    technicalStack: 'TECHNICAL STACK',
    prevSheet: 'PREVIOUS SHEET',
    nextSheet: 'NEXT SHEET',
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    close: 'Close'
  }
}
