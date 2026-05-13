export const courses = [
  {
    id: 'security-guard-training',
    title: 'Security Guard Training',
    duration: '40 hours',
    level: 'Beginner',
    category: 'Core Training',
    outcome: 'Security career readiness',
    format: 'In-person / to be confirmed',
    schedule: 'Contact admissions',
    price: 'Contact us for pricing',
    image: '/course-images/security-guard-training.jpg',
    imageAlt: 'Security training students reviewing professional site procedures',
    shortDescription:
      'Core security guard preparation focused on patrol procedures, report writing, emergency response, and professional conduct.',
    learn: [
      'Security guard roles, responsibilities, and ethics',
      'Access control, patrol methods, and observation techniques',
      'Incident reporting and professional communication',
      'Emergency response, conflict awareness, and public safety basics',
    ],
    audience: [
      'New students starting a security career',
      'Applicants preparing for entry-level security roles',
      'Workers who need structured professional security training',
    ],
    requirements: [
      'Valid government-issued identification',
      'Basic English or French communication skills',
      'Commitment to attendance, participation, and professional conduct',
    ],
    featured: true,
  },
  {
    id: 'first-aid-cpr-level-c',
    title: 'First Aid & CPR (Level C)',
    duration: '16 hours',
    level: 'Certification',
    category: 'Certification',
    outcome: 'Emergency response readiness',
    format: 'In-person / to be confirmed',
    schedule: 'Contact admissions',
    price: 'Contact us for pricing',
    image: '/course-images/first-aid-cpr-level-c.jpg',
    imageAlt: 'First aid and CPR training equipment prepared for class',
    shortDescription:
      'Practical first aid and CPR training for workplace safety, emergency care, and security-sector readiness.',
    learn: [
      'Primary assessment and emergency scene safety',
      'Adult, child, and infant CPR fundamentals',
      'AED awareness and basic life support actions',
      'Response steps for bleeding, shock, burns, and sudden illness',
    ],
    audience: [
      'Security students and active security personnel',
      'Workers who need first aid and CPR readiness',
      'Anyone seeking practical emergency response skills',
    ],
    requirements: [
      'Comfort participating in hands-on practice',
      'Ability to kneel and perform CPR practice activities',
      'No prior medical training required',
    ],
    featured: true,
  },
  {
    id: 'loss-prevention',
    title: 'Loss Prevention',
    duration: '20 hours',
    level: 'Intermediate',
    category: 'Specialized Training',
    outcome: 'Retail and site risk awareness',
    format: 'In-person / to be confirmed',
    schedule: 'Contact admissions',
    price: 'Contact us for pricing',
    image: '/course-images/loss-prevention.jpg',
    imageAlt: 'Retail environment used for loss prevention training context',
    shortDescription:
      'Retail and site-focused training for identifying risks, preventing theft, documenting incidents, and working safely with teams.',
    learn: [
      'Retail risk awareness and prevention strategy',
      'Observation, documentation, and evidence handling basics',
      'Professional communication with staff and customers',
      'Safe escalation and incident response procedures',
    ],
    audience: [
      'Security guards moving into retail or commercial sites',
      'Loss prevention candidates',
      'Supervisors who support front-line security teams',
    ],
    requirements: [
      'Basic security training recommended',
      'Professional communication skills',
      'Understanding of workplace safety expectations',
    ],
    featured: true,
  },
  {
    id: 'security-supervisor',
    title: 'Security Supervisor Essentials',
    duration: '24 hours',
    level: 'Advanced',
    category: 'Leadership',
    outcome: 'Supervisor readiness',
    format: 'In-person / to be confirmed',
    schedule: 'Contact admissions',
    price: 'Contact us for pricing',
    image: '/course-images/security-supervisor.jpg',
    imageAlt: 'Security supervisor planning team operations in a training setting',
    shortDescription:
      'Leadership training for shift leads and supervisors responsible for team readiness, site procedures, and client communication.',
    learn: [
      'Team briefings, post orders, and shift accountability',
      'Performance coaching and professional standards',
      'Client communication and incident escalation',
      'Operational planning for high-risk or busy sites',
    ],
    audience: [
      'Experienced guards preparing for supervisor roles',
      'Current shift leads who want stronger management skills',
      'Site coordinators and operations support staff',
    ],
    requirements: [
      'Prior security experience recommended',
      'Comfort leading small teams',
      'Strong written and verbal communication',
    ],
    featured: false,
  },
  {
    id: 'conflict-de-escalation',
    title: 'Conflict De-escalation',
    duration: '12 hours',
    level: 'Professional development',
    category: 'Professional Development',
    outcome: 'Safer communication under pressure',
    format: 'In-person / to be confirmed',
    schedule: 'Contact admissions',
    price: 'Contact us for pricing',
    image: '/course-images/conflict-de-escalation.jpg',
    imageAlt: 'Professional group training focused on communication skills',
    shortDescription:
      'Scenario-based communication training for reducing tension, improving safety, and handling difficult interactions professionally.',
    learn: [
      'Recognizing escalation cues and safety risks',
      'Calm communication and boundary-setting techniques',
      'Maintaining professionalism under pressure',
      'Documenting and reporting difficult incidents',
    ],
    audience: [
      'Security guards and front-line staff',
      'Customer-facing employees',
      'Teams working in public, retail, or event environments',
    ],
    requirements: [
      'No prior security experience required',
      'Willingness to participate in practical scenarios',
      'Respectful classroom participation',
    ],
    featured: false,
  },
  {
    id: 'emergency-response',
    title: 'Emergency Response Procedures',
    duration: '18 hours',
    level: 'Intermediate',
    category: 'Specialized Training',
    outcome: 'Site emergency readiness',
    format: 'In-person / to be confirmed',
    schedule: 'Contact admissions',
    price: 'Contact us for pricing',
    image: '/course-images/emergency-response.jpg',
    imageAlt: 'Emergency response training context with medical and safety equipment',
    shortDescription:
      'Training for responding to site emergencies, evacuations, alarms, hazards, and coordination with emergency services.',
    learn: [
      'Emergency action planning and site familiarization',
      'Evacuation support and crowd movement basics',
      'Alarm response, hazard awareness, and communication chains',
      'Coordinating with supervisors and emergency responders',
    ],
    audience: [
      'Security staff assigned to commercial or public sites',
      'Students preparing for higher-responsibility posts',
      'Teams that need consistent emergency response procedures',
    ],
    requirements: [
      'Basic security training recommended',
      'Ability to follow written site procedures',
      'Professional communication under pressure',
    ],
    featured: false,
  },
];

export function getCourseById(courseId) {
  return courses.find((course) => course.id === courseId);
}

export function getFeaturedCourses() {
  return courses.filter((course) => course.featured);
}

export function getCourseCategories() {
  return ['All', ...Array.from(new Set(courses.map((course) => course.category)))];
}
