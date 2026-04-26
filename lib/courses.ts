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
    slug: 'channel-your-speaking-voice',
    title: 'Channel Your Speaking Voice',
    tagline: 'Activate the voice that commands a room and a movement.',
    description: 'Uncover and own your spoken voice — the tone, presence, and delivery that makes people stop, listen, and remember every word you say.',
    longDescription: `Your speaking voice is more than how you sound. It's the energetic signature you carry into every room, every stage, every conversation. This course helps you excavate it, own it, and amplify it.

You'll leave with a fully activated speaking voice, a clear point of view you can articulate in seconds, and the presence to hold any room — from a podcast mic to a stadium stage.`,
    price: 297,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_SPEAKING_VOICE,
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
      'Own your vocal presence in any setting — podcast, stage, or Zoom',
      'Build a personal speaking vocabulary that makes your brand unmistakable',
      'Develop your signature story and the framework that carries it',
      'Activate your S.E.L.L. positioning in spoken form',
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
        title: 'Module 2 — Voice Architecture',
        lessons: [
          { slug: 'message-anatomy', title: 'Anatomy of a Magnetic Message', duration: '25 min', preview: false, description: 'Deconstruct what makes spoken messages land and stick.' },
          { slug: 'sell-framework', title: 'The S.E.L.L. Framework Deep Dive', duration: '35 min', preview: false, description: 'Apply the four-part framework to your spoken voice.' },
          { slug: 'positioning-statement', title: 'Craft Your Positioning Statement', duration: '20 min', preview: false, description: 'Write — then speak — the one sentence that encapsulates your brand.' },
          { slug: 'message-testing', title: 'Message Testing & Refinement', duration: '15 min', preview: false, description: 'Real-world methods to pressure-test your spoken message.' },
        ],
      },
      {
        title: 'Module 3 — Presence & Activation',
        lessons: [
          { slug: 'voice-vs-tone', title: 'Voice vs. Tone: Knowing the Difference', duration: '18 min', preview: false, description: 'Understand how to adapt tone without losing your voice.' },
          { slug: 'language-ecosystem', title: 'Building Your Language Ecosystem', duration: '28 min', preview: false, description: 'Create a personal dictionary of phrases, metaphors, and story seeds.' },
          { slug: 'platform-translation', title: 'Speaking Across Platforms', duration: '22 min', preview: false, description: 'How your voice adapts from podcast to stage to sales call.' },
        ],
      },
    ],
  },
  {
    slug: 'channel-your-writing-voice',
    title: 'Channel Your Writing Voice',
    tagline: 'Write with the authority and distinctiveness that makes your words impossible to ignore.',
    description: 'Find and fully inhabit your written voice — the one that sounds unmistakably like you and draws readers into your world from the very first sentence.',
    longDescription: `Most experts write the way they think they're supposed to write — formal, careful, hedged. This course helps you break that pattern and find the written voice that is entirely, unapologetically yours.

You'll leave with a writing voice that is clear, magnetic, and consistent across every format: emails, essays, social posts, book chapters, and sales pages.`,
    price: 197,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_WRITING_VOICE,
    category: 'course',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1587691592099-24045742c181?w=800&q=80',
    instructor: 'Michele Parad',
    duration: '6 weeks',
    students: 628,
    lessons: 28,
    level: 'All Levels',
    featured: true,
    outcomes: [
      'Write in a voice that is unmistakably yours across every format',
      'Develop a signature writing style your readers recognize instantly',
      'Craft emails, essays, and posts that convert without feeling salesy',
      'Build a personal writing ritual that keeps the words flowing',
      'Translate your speaking voice into the written word',
    ],
    modules: [
      {
        title: 'Module 1 — Excavating Your Writing Voice',
        lessons: [
          { slug: 'writing-welcome', title: 'Welcome & Your Writing Journey', duration: '10 min', preview: true, description: 'What it means to have a writing voice and how we find yours.' },
          { slug: 'voice-archaeology', title: 'Voice Archaeology', duration: '28 min', preview: true, description: 'Excavate the influences, rhythms, and instincts that shape your natural voice.' },
          { slug: 'permission-to-sound-like-you', title: 'Permission to Sound Like You', duration: '22 min', preview: false, description: 'Release the "professional writing" mask and write like the person you actually are.' },
        ],
      },
      {
        title: 'Module 2 — Writing With Authority',
        lessons: [
          { slug: 'sentence-level-voice', title: 'Sentence-Level Voice Work', duration: '30 min', preview: false, description: 'The micro-decisions — rhythm, word choice, punctuation — that make a voice distinct.' },
          { slug: 'structure-and-flow', title: 'Structure & Flow', duration: '25 min', preview: false, description: 'How to organize ideas so they build, land, and resonate.' },
          { slug: 'writing-for-formats', title: 'Writing Across Formats', duration: '20 min', preview: false, description: 'Email, essay, social, long-form — the same voice, different containers.' },
        ],
      },
      {
        title: 'Module 3 — The Writing Practice',
        lessons: [
          { slug: 'ritual-and-rhythm', title: 'Ritual & Rhythm', duration: '18 min', preview: false, description: 'Build the conditions that make writing feel natural and sustainable.' },
          { slug: 'editing-your-voice', title: 'Editing Without Erasing Yourself', duration: '22 min', preview: false, description: 'How to polish your writing without scrubbing out what makes it yours.' },
        ],
      },
    ],
  },
  {
    slug: 'syb-book-companion-transmissions',
    title: 'Sell Your Brilliance Book Companion Transmissions',
    tagline: 'Go deeper into the book — lesson by lesson, transmission by transmission.',
    description: 'A series of intimate audio and video transmissions that bring the Sell Your Brilliance book to life, with guided exercises, expanded teachings, and direct access to Michele.',
    longDescription: `The book gave you the map. These transmissions walk you through the territory.

Each session goes deeper into a chapter of Sell Your Brilliance — expanding the concepts, guiding you through the exercises, and offering Michele's direct teaching on what it actually takes to apply the framework to your life and work.

This is the book, activated.`,
    price: 297,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_BOOK_COMPANION,
    category: 'course',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80',
    instructor: 'Michele Parad',
    duration: 'Self-paced',
    students: 312,
    lessons: 24,
    level: 'All Levels',
    featured: true,
    outcomes: [
      'Fully integrate the S.E.L.L. framework into your daily work',
      'Complete every exercise in the book with guided support',
      'Hear Michele\'s expanded teaching behind each chapter',
      'Leave with a completed brilliance map you can act on immediately',
      'Access a community of readers doing the work alongside you',
    ],
    modules: [
      {
        title: 'Part 1 — See Your Brilliance',
        lessons: [
          { slug: 'transmission-welcome', title: 'Welcome Transmission', duration: '12 min', preview: true, description: 'An orientation to how these transmissions work and how to use them with the book.' },
          { slug: 'chapter-1-transmission', title: 'Chapter 1: The Hummingbird Brain', duration: '28 min', preview: true, description: 'Expanded teaching on why your cross-disciplinary mind is an asset, not a liability.' },
          { slug: 'chapter-2-transmission', title: 'Chapter 2: Excavating Your Brilliance', duration: '35 min', preview: false, description: 'Guided excavation exercise with Michele walking you through each step.' },
        ],
      },
      {
        title: 'Part 2 — Express Your Brilliance',
        lessons: [
          { slug: 'chapter-3-transmission', title: 'Chapter 3: The S.E.L.L. Framework', duration: '40 min', preview: false, description: 'Deep dive into all four parts of the framework with real examples.' },
          { slug: 'chapter-4-transmission', title: 'Chapter 4: Your Signature Message', duration: '32 min', preview: false, description: 'How to craft and test your signature message in real time.' },
          { slug: 'chapter-5-transmission', title: 'Chapter 5: Voice Activation', duration: '28 min', preview: false, description: 'Bringing your speaking and writing voice into alignment.' },
        ],
      },
      {
        title: 'Part 3 — Sell Your Brilliance',
        lessons: [
          { slug: 'chapter-6-transmission', title: 'Chapter 6: Building Your Ecosystem', duration: '30 min', preview: false, description: 'How everything you\'ve built connects into a coherent influence system.' },
          { slug: 'chapter-7-transmission', title: 'Chapter 7: The Long Game', duration: '25 min', preview: false, description: 'On legacy, sustainability, and why your brilliance compounds over time.' },
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
  return courses.filter(c => c.featured && c.category === 'course')
}

export function getCoursesByCategory(category: 'course' | 'retreat'): Course[] {
  return courses.filter(c => c.category === category)
}

// Mock enrolled courses for dashboard
export const enrolledCourses = [
  {
    course: courses[0], // Channel Your Speaking Voice
    progress: 68,
    lastLesson: 'message-anatomy',
    lastModule: 'Module 2 — Voice Architecture',
    enrolledAt: '2024-11-15',
  },
  {
    course: courses[2], // SYB Book Companion Transmissions
    progress: 22,
    lastLesson: 'chapter-2-transmission',
    lastModule: 'Part 1 — See Your Brilliance',
    enrolledAt: '2025-01-08',
  },
]
