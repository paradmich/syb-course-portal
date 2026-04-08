export type Lesson = {
  slug: string
  title: string
  duration: string
  preview: boolean
  description: string
}

export type Module = {
  title: string
  lessons: Lesson[]
}

export type Course = {
  slug: string
  title: string
  tagline: string
  description: string
  longDescription: string
  price: number
  stripePriceId?: string       // set in Stripe Dashboard → Products → Price ID
  stripePaymentLink?: string   // optional: direct Stripe Payment Link URL
  originalPrice?: number
  category: 'course' | 'retreat'
  badge?: string
  image: string
  instructor: string
  duration: string
  students: number
  lessons: number
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels'
  outcomes: string[]
  modules: Module[]
  featured?: boolean
}

export const courses: Course[] = [
  {
    slug: 'channel-your-voice',
    title: 'Channel Your Voice & Message',
    tagline: 'Find the words that make you unforgettable.',
    description: 'Clarify your unique voice, craft your signature message, and build the language ecosystem that makes your work instantly recognizable.',
    longDescription: `Most experts struggle to articulate what makes them different — not because they lack depth, but because they've never been given the right framework to excavate it. This course is the excavation.

You'll emerge with a crystal-clear voice, a signature message that magnetizes your ideal clients, and a language system you can pull from for every piece of content, every pitch, and every conversation.`,
    price: 497,
    originalPrice: 697,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CHANNEL_VOICE,  // e.g. price_1ABC...
    category: 'course',
    badge: 'Most Popular',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    instructor: 'Michele Parad',
    duration: '6 weeks',
    students: 1240,
    lessons: 32,
    level: 'All Levels',
    featured: true,
    outcomes: [
      'Articulate your unique point of view with clarity and confidence',
      'Write a signature bio that stops people in their tracks',
      'Build a personal vocabulary that makes your brand unmistakable',
      'Create messaging pillars for every platform and format',
      'Develop your S.E.L.L. framework positioning statement',
    ],
    modules: [
      {
        title: 'Module 1 — The Identity Excavation',
        lessons: [
          { slug: 'welcome', title: 'Welcome & Orientation', duration: '8 min', preview: true, description: 'An overview of the journey ahead and how to get the most from this course.' },
          { slug: 'your-brilliance-baseline', title: 'Your Brilliance Baseline', duration: '22 min', preview: true, description: 'Map where you are today and where your voice wants to go.' },
          { slug: 'the-hummingbird-brain', title: 'The Hummingbird Brain Advantage', duration: '18 min', preview: false, description: 'How your cross-disciplinary thinking is your greatest asset.' },
          { slug: 'identity-audit', title: 'Identity Audit Exercise', duration: '30 min', preview: false, description: 'A guided workbook session to surface your core identity threads.' },
        ],
      },
      {
        title: 'Module 2 — Signature Message Architecture',
        lessons: [
          { slug: 'message-anatomy', title: 'Anatomy of a Magnetic Message', duration: '25 min', preview: false, description: 'Deconstruct what makes messages stick and spread.' },
          { slug: 'sell-framework', title: 'The S.E.L.L. Framework Deep Dive', duration: '35 min', preview: false, description: 'Apply the four-part framework to your own work.' },
          { slug: 'positioning-statement', title: 'Craft Your Positioning Statement', duration: '20 min', preview: false, description: 'Write the one sentence that encapsulates your entire brand.' },
          { slug: 'message-testing', title: 'Message Testing & Refinement', duration: '15 min', preview: false, description: 'Real-world methods to pressure-test your message.' },
        ],
      },
      {
        title: 'Module 3 — Voice Activation',
        lessons: [
          { slug: 'voice-vs-tone', title: 'Voice vs. Tone: Knowing the Difference', duration: '18 min', preview: false, description: 'Understand how to adapt tone without losing your voice.' },
          { slug: 'language-ecosystem', title: 'Building Your Language Ecosystem', duration: '28 min', preview: false, description: 'Create a personal dictionary of phrases, metaphors, and story seeds.' },
          { slug: 'platform-translation', title: 'Platform Translation Guide', duration: '22 min', preview: false, description: 'How your voice adapts from email to stage to social.' },
        ],
      },
    ],
  },
  {
    slug: 'build-your-signature-course',
    title: 'Build Your Signature Course',
    tagline: 'Turn your expertise into a scalable course that sells while you sleep.',
    description: 'Design, build, and launch a premium course that packages your knowledge into a transformative learning experience your students rave about.',
    longDescription: `You have knowledge worth sharing — but knowledge alone doesn't make a course sell. This program walks you through the complete system for creating a premium online course: from curriculum architecture to launch strategy.

No more guessing what to include or how to structure it. You'll leave with a fully built course and a launch plan ready to execute.`,
    price: 997,
    originalPrice: 1297,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SIGNATURE_COURSE,
    category: 'course',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?w=800&q=80',
    instructor: 'Michele Parad',
    duration: '10 weeks',
    students: 628,
    lessons: 48,
    level: 'Intermediate',
    featured: true,
    outcomes: [
      'Design a curriculum that delivers real transformation (not just information)',
      'Record professional-quality video without expensive gear',
      'Build your course on the right platform for your audience',
      'Price your course with confidence',
      'Launch with a proven 30-day sequence that generates momentum',
    ],
    modules: [
      {
        title: 'Module 1 — Curriculum Architecture',
        lessons: [
          { slug: 'course-welcome', title: 'Welcome & Your Roadmap', duration: '10 min', preview: true, description: 'Your complete journey from idea to launched course.' },
          { slug: 'transformation-vs-information', title: 'Transformation vs. Information', duration: '28 min', preview: true, description: 'The mindset shift that separates mediocre courses from bestsellers.' },
          { slug: 'learning-outcomes', title: 'Defining Powerful Learning Outcomes', duration: '22 min', preview: false, description: 'How to write outcomes that sell the course before students even enroll.' },
          { slug: 'module-mapping', title: 'Module Mapping Workshop', duration: '40 min', preview: false, description: 'Build your complete module and lesson structure.' },
        ],
      },
      {
        title: 'Module 2 — Content Creation',
        lessons: [
          { slug: 'video-without-fear', title: 'Video Without Fear', duration: '25 min', preview: false, description: 'Simple setups that look professional on any budget.' },
          { slug: 'script-vs-outline', title: 'Script vs. Outline: Finding Your Style', duration: '15 min', preview: false, description: 'How to be authentic on camera while staying on point.' },
          { slug: 'workbook-design', title: 'Designing Companion Workbooks', duration: '20 min', preview: false, description: 'The assets that make your course sticky and refund-proof.' },
        ],
      },
      {
        title: 'Module 3 — Platform & Tech',
        lessons: [
          { slug: 'platform-comparison', title: 'Platform Comparison Guide', duration: '30 min', preview: false, description: 'Kajabi vs. Teachable vs. Podia vs. building your own.' },
          { slug: 'pricing-strategy', title: 'Pricing Strategy Deep Dive', duration: '25 min', preview: false, description: 'How to price for value, not time.' },
        ],
      },
      {
        title: 'Module 4 — Launch',
        lessons: [
          { slug: 'launch-sequence', title: 'The 30-Day Launch Sequence', duration: '35 min', preview: false, description: 'A day-by-day plan for your course launch.' },
          { slug: 'sales-page-masterclass', title: 'Sales Page Masterclass', duration: '40 min', preview: false, description: 'Write every section of your sales page with fill-in-the-blank templates.' },
        ],
      },
    ],
  },
  {
    slug: 'build-your-virtual-summit',
    title: 'Build Your Virtual Summit',
    tagline: 'Host a summit that grows your list, builds authority, and generates revenue.',
    description: 'The complete playbook for producing a high-impact virtual summit — from speaker sourcing to tech stack to post-summit monetization.',
    longDescription: `A well-run virtual summit is the fastest way to 10x your email list, build relationships with top experts in your space, and establish yourself as a category leader — all at once.

This course teaches you everything: the strategy, the logistics, the tech, and the revenue model that makes summits one of the highest-ROI events you can run.`,
    price: 797,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_VIRTUAL_SUMMIT,
    category: 'course',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    instructor: 'Michele Parad',
    duration: '8 weeks',
    students: 312,
    lessons: 38,
    level: 'Advanced',
    featured: false,
    outcomes: [
      'Plan and produce a 3–5 day virtual summit from scratch',
      'Recruit A-list speakers who actually show up',
      'Build a summit tech stack for under $100/month',
      'Generate revenue before the summit even starts',
      'Convert summit attendees into course buyers',
    ],
    modules: [
      {
        title: 'Module 1 — Summit Strategy',
        lessons: [
          { slug: 'summit-overview', title: 'The Summit Opportunity', duration: '20 min', preview: true, description: 'Why summits work and how to pick the right format for your goals.' },
          { slug: 'summit-theme', title: 'Choosing Your Summit Theme', duration: '18 min', preview: false, description: 'Pick a theme that attracts speakers and converts attendees.' },
          { slug: 'revenue-model', title: 'Summit Revenue Models', duration: '25 min', preview: false, description: 'All-access passes, sponsorships, backend offers — pick your mix.' },
        ],
      },
      {
        title: 'Module 2 — Speaker & Logistics',
        lessons: [
          { slug: 'speaker-outreach', title: 'Speaker Outreach Templates', duration: '22 min', preview: false, description: 'The exact emails that get a 60%+ acceptance rate.' },
          { slug: 'interview-framework', title: 'Interview Framework', duration: '28 min', preview: false, description: 'How to run interviews that produce shareable, valuable content.' },
          { slug: 'tech-stack', title: 'Summit Tech Stack Guide', duration: '30 min', preview: false, description: 'The exact tools to run a professional summit on a lean budget.' },
        ],
      },
    ],
  },
  {
    slug: 'voice-activation-retreat-hawaii',
    title: 'Voice Activation Retreat — Hawaii',
    tagline: 'Five transformative days to find, own, and amplify your voice.',
    description: 'An intimate immersive retreat in Hawaii for established experts ready to step fully into their authority and build the body of work they were born to create.',
    longDescription: `This is not a vacation with workshops. This is a full-body transformation in one of the most powerful landscapes on Earth.

Over five days in Hawaii, you'll work alongside Michele and a small cohort of extraordinary women to excavate your voice, architect your signature message, and leave with a clear roadmap for the next chapter of your work.

Spaces are limited to 12 participants.`,
    price: 5997,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_HAWAII_RETREAT,
    category: 'retreat',
    badge: 'Limited Seats',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    instructor: 'Michele Parad',
    duration: '5 days',
    students: 48,
    lessons: 0,
    level: 'All Levels',
    featured: true,
    outcomes: [
      'Emerge with your signature voice fully activated',
      'Leave with your complete messaging framework',
      'Build deep relationships with a curated cohort of peers',
      'Experience daily embodiment and integration practices',
      'Return home with a 90-day action plan',
    ],
    modules: [],
  },
  {
    slug: 'writing-retreat-santa-fe',
    title: 'Writing Retreat — Santa Fe',
    tagline: 'Write the book, program, or body of work that\'s been living inside you.',
    description: 'A focused four-day writing retreat in the high desert of Santa Fe for thought leaders ready to finally get their ideas on paper.',
    longDescription: `The ideas are there. The expertise is there. What's missing is the space, the structure, and the community of peers who hold you accountable.

This retreat gives you all three. In the creative landscape of Santa Fe, you'll write — deeply and prolifically — while receiving real-time feedback, editorial guidance, and the energy of a room full of brilliant women doing the same.`,
    price: 3997,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SANTAFE_RETREAT,
    category: 'retreat',
    image: 'https://images.unsplash.com/photo-1533105045747-a6b52e4f6f35?w=800&q=80',
    instructor: 'Michele Parad',
    duration: '4 days',
    students: 32,
    lessons: 0,
    level: 'All Levels',
    featured: false,
    outcomes: [
      'Write 10,000+ words of high-quality content in four days',
      'Receive editorial feedback from Michele and peers',
      'Leave with a complete content or book outline',
      'Build writing habits that last beyond the retreat',
    ],
    modules: [],
  },
]

export function getCourse(slug: string): Course | undefined {
  return courses.find(c => c.slug === slug)
}

export function getFeaturedCourses(): Course[] {
  return courses.filter(c => c.featured)
}

export function getCoursesByCategory(category: 'course' | 'retreat'): Course[] {
  return courses.filter(c => c.category === category)
}

// Mock enrolled courses for dashboard
export const enrolledCourses = [
  {
    course: courses[0], // Channel Your Voice
    progress: 68,
    lastLesson: 'message-anatomy',
    lastModule: 'Module 2 — Signature Message Architecture',
    enrolledAt: '2024-11-15',
  },
  {
    course: courses[1], // Build Your Signature Course
    progress: 22,
    lastLesson: 'transformation-vs-information',
    lastModule: 'Module 1 — Curriculum Architecture',
    enrolledAt: '2025-01-08',
  },
]
