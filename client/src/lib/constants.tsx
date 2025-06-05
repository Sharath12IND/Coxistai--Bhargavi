export const COLORS = {
  primaryBg: '#0f0f1a',
  cardBg: '#21223a',
  accentBlue: '#3a86ff',
  mintGreen: '#06d6a0',
  textPrimary: '#ffffff',
  textSecondary: '#b0bec5'
} as const;

export const NAVIGATION_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'chat', label: 'SparkTutor', path: '/chat' },
  { id: 'notes', label: 'Notes Hub', path: '/notes' },
  { id: 'community', label: 'Community', path: '/community' },
  { id: 'college', label: 'College Finder', path: '/college' },
  { id: 'presentations', label: 'AI Presentations', path: '/presentations' },
  { id: 'calendar', label: 'Smart Calendar', path: '/calendar' },
  { id: 'code', label: 'CodeSpark', path: '/code' }
] as const;

export const MOCK_COLLEGE_DATA = [
  {
    id: 1,
    name: "Stanford University",
    location: "Stanford, CA",
    rank: 2,
    acceptanceRate: 4,
    avgSAT: 1520,
    students: "17K",
    matchScore: 96,
    logo: "SU",
    color: "from-red-500 to-red-600",
    description: "World-renowned for engineering and computer science programs. Strong alumni network in Silicon Valley.",
    tags: ["Computer Science", "Engineering"]
  },
  {
    id: 2,
    name: "MIT",
    location: "Cambridge, MA",
    rank: 1,
    acceptanceRate: 7,
    avgSAT: 1535,
    students: "11K",
    matchScore: 94,
    logo: "MIT",
    color: "from-blue-500 to-blue-600",
    description: "Leading institution in technology and innovation. Excellent research opportunities and entrepreneurship programs.",
    tags: ["Engineering", "Research"]
  },
  {
    id: 3,
    name: "University of Washington",
    location: "Seattle, WA",
    rank: 58,
    acceptanceRate: 56,
    avgSAT: 1420,
    students: "47K",
    matchScore: 89,
    logo: "UW",
    color: "from-purple-500 to-purple-600",
    description: "Strong computer science and engineering programs. Located in the heart of the tech industry.",
    tags: ["Computer Science", "Large Campus"]
  }
];

export const MOCK_NOTES_DATA = [
  {
    id: 1,
    title: "Calculus Derivatives",
    lastEdited: "2 hours ago",
    tags: ["Math", "Calculus"],
    content: `# Calculus Derivatives

## Definition
The derivative of a function measures the rate at which the function's value changes with respect to changes in its input. It represents the slope of the tangent line to the function's graph at any given point.

## Basic Formula
f'(x) = lim(h→0) [f(x+h) - f(x)] / h

## Common Derivatives
- d/dx(x^n) = nx^(n-1)
- d/dx(sin x) = cos x
- d/dx(cos x) = -sin x
- d/dx(e^x) = e^x

## Chain Rule
For composite functions: d/dx[f(g(x))] = f'(g(x)) · g'(x)`,
    active: true
  },
  {
    id: 2,
    title: "Organic Chemistry Basics",
    lastEdited: "yesterday",
    tags: ["Chemistry"],
    content: "Basic organic chemistry concepts...",
    active: false
  },
  {
    id: 3,
    title: "World War II Timeline",
    lastEdited: "3 days ago",
    tags: ["History"],
    content: "World War II historical timeline...",
    active: false
  }
];

export const MOCK_COMMUNITY_DATA = [
  {
    id: 1,
    title: "Weekly Study Group: Advanced Calculus",
    content: "Join us every Wednesday at 7 PM EST for collaborative problem-solving sessions. This week we're covering integration techniques...",
    author: "Math Tutor Mike",
    avatar: "MT",
    category: "Study Groups",
    isPinned: true,
    replies: 23,
    views: 156,
    timeAgo: "2 hours ago"
  },
  {
    id: 2,
    title: "Need help with organic chemistry mechanisms",
    content: "I'm struggling to understand SN1 vs SN2 reactions. Can someone explain the key differences and when each occurs?",
    author: "Jessica Liu",
    avatar: "J",
    category: "Q&A",
    isPinned: false,
    replies: 7,
    views: 42,
    timeAgo: "4 hours ago"
  },
  {
    id: 3,
    title: "Complete Physics Formulas Sheet - Mechanics",
    content: "Comprehensive formula sheet covering kinematics, dynamics, energy, and momentum. Perfect for exam prep!",
    author: "David Park",
    avatar: "D",
    category: "Shared Notes",
    isPinned: false,
    downloads: 89,
    likes: 24,
    timeAgo: "6 hours ago"
  }
];
