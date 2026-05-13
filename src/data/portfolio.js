export const NAV_LINKS = [
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'contact',    label: 'Contact' },
];

export const FOOTER_LINKS = [
  { id: 'about',    label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'contact',  label: 'Contact' },
];

export const STATS = [
  { value: '1+', label: 'Years professional exp.' },
  { value: '5+', label: 'Systems built' },
  { value: 'CL', label: 'Graduated Cum Laude' },
  { value: '6',  label: 'Certifications' },
];

export const CERTIFICATIONS = [
  'Huawei Cloud Service Certification',
  'Database Foundations',
  'Database Systems',
  'SAP Business One Advanced (Implementation & Support)',
  'SAP Business One Basic (Logistics & Financial)',
  'Network Foundations',
];

export const SKILL_CATEGORIES = [
  {
    title: 'Languages',
    skills: ['PHP', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Frontend Frameworks',
    skills: ['Vue.js', 'React', 'Bootstrap', 'Tailwind CSS', 'Bulma', 'Buefy'],
  },
  {
    title: 'Backend & APIs',
    skills: ['Laravel', 'REST APIs', 'MySQL'],
  },
  {
    title: 'Tools & Workflow',
    skills: ['Git', 'GitHub', 'GitLab', 'Gitea', 'GitHub Desktop', 'Postman', 'VS Code', 'Vite'],
  },
];

export const EXPERIENCE = [
  {
    role: 'Junior System Developer',
    company: 'Wilcon Depot Inc.',
    location: 'Libis, Quezon City',
    period: 'Aug 2024 — Present',
    current: true,
    bullets: [
      'Developed and maintained full-stack web applications using Laravel, Vue, and MySQL.',
      'Built Auto Incentives and Provincial Billing Systems with approval workflows, CRUD functionalities, and automated email notifications.',
      'Engineered a Coupon Code Management System with workflow approvals, PDF batch generation, and QR scan API integrations.',
      'Designed a Tenant Management System with interactive unit mapping, auto-generated contracts, and payment monitoring workflows.',
      'Built a Count Schedule & Approval System featuring Infor API integration, bulk Excel upload automation, and multi-level approvals.',
    ],
  },
  {
    role: 'Full Stack Developer Intern',
    company: 'Nexbridge Technologies Inc.',
    location: 'Malolos, Bulacan',
    period: 'Feb 2024 — May 2024',
    current: false,
    bullets: [
      'Developed admin panel components for a Loan Management System: navigation tabs, dynamic data tables, CRUD across modules, and OTP auth.',
      'Designed and built authentication pages (login/register) for the Booque Monitoring System.',
      'Created responsive UI components and optimized database interactions.',
    ],
  },
];

export const PROJECTS = [
  {
    emoji: '🎫',
    name: 'Coupon Code Management System',
    description: 'End-to-end coupon lifecycle management with workflow approvals, PDF batch generation, QR scan API integrations, status reversal, and activity logging.',
    stack: ['Laravel', 'Vue.js', 'MySQL', 'REST API', 'PDF'],
  },
  {
    emoji: '🏢',
    name: 'Tenant Management System',
    description: 'Interactive floor unit mapping, auto-generated rental contracts, payment monitoring dashboard, and multi-step approval workflows.',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
  },
  {
    emoji: '📦',
    name: 'Count Schedule & Approval System',
    description: 'Inventory count scheduling per branch with Infor API auto-population, bulk Excel upload, multi-level approvals, and comprehensive transaction logs.',
    stack: ['Laravel', 'Vue.js', 'MySQL', 'Infor API', 'Excel'],
  },
  {
    emoji: '💰',
    name: 'Auto Incentives & Provincial Billing',
    description: 'Automated incentive calculation and provincial billing workflows with approval routing, CRUD operations, and email notification triggers.',
    stack: ['Laravel', 'Vue.js', 'MySQL', 'Email'],
  },
  {
    emoji: '🏦',
    name: 'Loan Management Admin Panel',
    description: 'Admin interface for loan operations featuring navigation tabs, dynamic data tables across multiple modules, and OTP authentication.',
    stack: ['Vue.js', 'MySQL', 'OTP Auth'],
  },
  {
    emoji: '📚',
    name: 'Booque Monitoring System',
    description: 'Authentication system (login & registration) with responsive UI and optimized backend queries for the Booque platform.',
    stack: ['Laravel', 'Vue.js', 'MySQL'],
  },
];

export const CONTACT_LINKS = [
  {
    label: 'Email',
    value: 'paoyojaspher@gmail.com',
    href: 'mailto:paoyojaspher@gmail.com',
    external: false,
    icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V4zm2 0l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    label: 'Phone',
    value: '+63 976 108 4219',
    href: 'tel:+639761084219',
    external: false,
    icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 3a1 1 0 011-1h1.5a1 1 0 011 .75l.5 2a1 1 0 01-.3.9L6 6.5a8 8 0 003.5 3.5l.85-.7a1 1 0 01.9-.3l2 .5a1 1 0 01.75 1V12a1 1 0 01-1 1C5.4 13 3 7.6 3 4V3z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jpaoyo',
    href: 'https://linkedin.com/in/jpaoyo',
    external: true,
    icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 5h2v7H3V5zm1-1.5A1.25 1.25 0 114 2a1.25 1.25 0 010 1.5zM7 5h1.9v1h.05A2.1 2.1 0 0111 5c2.1 0 2.5 1.4 2.5 3.2V12h-2V8.7c0-.8 0-1.9-1.15-1.9S9 7.7 9 8.6V12H7V5z" fill="currentColor"/></svg>',
  },
  {
    label: 'Location',
    value: 'Palangoy, Binangonan, Rizal',
    href: null,
    external: false,
    icon: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.24 2 3 4.24 3 7c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="currentColor"/></svg>',
  },
];
