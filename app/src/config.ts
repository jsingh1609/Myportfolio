// =============================================================================
// Smart Study Planner Configuration
// =============================================================================
// All site content is configured here. Components render nothing when their
// primary config fields are empty strings or empty arrays.
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "Smart Study Planner - AI-Powered Study Schedule",
  description: "Plan smarter, study calmer. Generate personalized study schedules based on your subjects, priorities, and exam deadlines.",
  language: "en",
  keywords: "study planner, exam schedule, AI study, student productivity, study schedule generator",
  ogImage: "/images/hero-workspace.jpg",
  canonical: "https://smartstudy.planner",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "SmartStudy",
  brandSubname: "Planner",
  tagline: "AI-Powered Scheduling",
  navLinks: [
    { name: "Features", href: "#features", icon: "Sparkles" },
    { name: "How it works", href: "#how-it-works", icon: "BookOpen" },
    { name: "Build schedule", href: "#schedule", icon: "Calendar" },
    { name: "Testimonials", href: "#testimonials", icon: "Users" },
  ],
  ctaButtonText: "Get Started",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "SmartStudy",
  brandSubname: "Planner",
  yearText: "AI Powered",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "AI STUDY SCHEDULER",
  mainTitle: "Plan Smarter.\nStudy Calmer.\nAce Exams.",
  ctaButtonText: "Build My Schedule",
  ctaTarget: "#schedule",
  stats: [
    { value: 50, suffix: "K+", label: "Students" },
    { value: 98, suffix: "%", label: "Success Rate" },
    { value: 3, suffix: "x", label: "More Productive" },
  ],
  decorativeText: "STUDY SMARTER",
  backgroundImage: "/images/hero-workspace.jpg",
};

// -----------------------------------------------------------------------------
// Features Config
// -----------------------------------------------------------------------------
export interface Feature {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface FeatureQuote {
  text: string;
  attribution: string;
  prefix: string;
}

export interface FeaturesConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  features: Feature[];
  quote: FeatureQuote;
}

export const featuresConfig: FeaturesConfig = {
  scriptText: "WHY IT WORKS",
  subtitle: "FEATURES",
  mainTitle: "A plan that adapts to you.",
  features: [
    {
      id: "smart-priorities",
      name: "Smart Priorities",
      subtitle: "AI-Powered",
      description: "We weigh difficulty, deadlines, and your available hours—so you never cram blindly.",
      icon: "Brain",
    },
    {
      id: "balanced-days",
      name: "Balanced Days",
      subtitle: "Optimal Flow",
      description: "Study blocks, quick reviews, and built-in breaks that keep energy high.",
      icon: "Clock",
    },
    {
      id: "clear-progress",
      name: "Clear Progress",
      subtitle: "Track Everything",
      description: "See what's done, what's next, and how much time remains at a glance.",
      icon: "Target",
    },
  ],
  quote: {
    text: "The best study plan is the one you actually follow.",
    attribution: "SmartStudy Team",
    prefix: "Note:",
  },
};

// -----------------------------------------------------------------------------
// How It Works Config
// -----------------------------------------------------------------------------
export interface StepSlide {
  image: string;
  title: string;
  description: string;
  stepNumber: string;
}

export interface HowItWorksConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  locationTag: string;
  slides: StepSlide[];
}

export const howItWorksConfig: HowItWorksConfig = {
  scriptText: "THE PROCESS",
  subtitle: "HOW IT WORKS",
  mainTitle: "Three steps to a calm semester.",
  locationTag: "Start Today",
  slides: [
    {
      image: "/images/student-laptop.jpg",
      title: "Add your subjects",
      description: "Name, priority, and how much prep you think you need.",
      stepNumber: "Step 1",
    },
    {
      image: "/images/calendar-planner.jpg",
      title: "Set exam dates",
      description: "We map your timeline and protect review days.",
      stepNumber: "Step 2",
    },
    {
      image: "/images/student-reading.jpg",
      title: "Get your daily plan",
      description: "Tasks, reminders, and progress you can actually feel.",
      stepNumber: "Step 3",
    },
  ],
};

// -----------------------------------------------------------------------------
// Subject Input Config
// -----------------------------------------------------------------------------
export interface SubjectInputConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  image: string;
  ctaButtonText: string;
}

export const subjectInputConfig: SubjectInputConfig = {
  scriptText: "GET STARTED",
  subtitle: "ADD SUBJECTS",
  mainTitle: "What are you studying?",
  introText: "Add each subject with a priority. You can edit anytime. Start with the hardest subject first for best results.",
  image: "/images/student-laptop.jpg",
  ctaButtonText: "Continue to Dates",
};

// -----------------------------------------------------------------------------
// Exam Timeline Config
// -----------------------------------------------------------------------------
export interface TimelineEvent {
  date: string;
  title: string;
  subject: string;
}

export interface ExamTimelineConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  image: string;
  events: TimelineEvent[];
}

export const examTimelineConfig: ExamTimelineConfig = {
  scriptText: "DEADLINES",
  subtitle: "EXAM TIMELINE",
  mainTitle: "Map your deadlines.",
  introText: "We protect review days and warn you if the plan gets tight.",
  image: "/images/calendar-planner.jpg",
  events: [
    { date: "Mar 12", title: "Calculus Midterm", subject: "Math" },
    { date: "Mar 26", title: "Physics Quiz", subject: "Physics" },
    { date: "Apr 09", title: "Chemistry Final", subject: "Chemistry" },
    { date: "Apr 22", title: "Literature Essay", subject: "Literature" },
  ],
};

// -----------------------------------------------------------------------------
// Dashboard Config
// -----------------------------------------------------------------------------
export interface DashboardConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  backgroundImage: string;
  badgeText: string;
  generateButtonText: string;
  microcopy: string;
}

export const dashboardConfig: DashboardConfig = {
  scriptText: "YOUR PLAN",
  subtitle: "DASHBOARD",
  mainTitle: "Your Study Plan",
  backgroundImage: "/images/workspace-topdown.jpg",
  badgeText: "AI-powered schedule",
  generateButtonText: "Generate Schedule",
  microcopy: "Takes your subjects, exams, and hours into account.",
};

// -----------------------------------------------------------------------------
// Daily Focus Config
// -----------------------------------------------------------------------------
export interface Task {
  id: string;
  title: string;
  duration: string;
  subject: string;
  completed: boolean;
}

export interface DailyFocusConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  dateText: string;
  progressText: string;
  image: string;
  tasks: Task[];
  viewFullWeekText: string;
}

export const dailyFocusConfig: DailyFocusConfig = {
  scriptText: "TODAY",
  subtitle: "DAILY FOCUS",
  mainTitle: "Your Tasks",
  dateText: "Monday, March 10",
  progressText: "2 of 3 completed",
  image: "/images/student-reading.jpg",
  tasks: [
    { id: "1", title: "Calculus problem set", duration: "45 min", subject: "Math", completed: true },
    { id: "2", title: "Physics formula review", duration: "30 min", subject: "Physics", completed: true },
    { id: "3", title: "Read essay draft", duration: "20 min", subject: "Literature", completed: false },
  ],
  viewFullWeekText: "View full week",
};

// -----------------------------------------------------------------------------
// Testimonials Config
// -----------------------------------------------------------------------------
export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface TestimonialsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  testimonials: Testimonial[];
}

export const testimonialsConfig: TestimonialsConfig = {
  scriptText: "REVIEWS",
  subtitle: "TESTIMONIALS",
  mainTitle: "Students actually stick to it.",
  testimonials: [
    {
      name: "Ava L.",
      role: "Biology Major",
      text: "I used to cram. Now I just follow the daily plan. My grades improved and I'm less stressed.",
      rating: 5,
      avatar: "/images/avatar-1.jpg",
    },
    {
      name: "Marcus T.",
      role: "Engineering Student",
      text: "The balance between subjects stopped my burnout. I actually enjoy studying now.",
      rating: 5,
      avatar: "/images/avatar-2.jpg",
    },
    {
      name: "Riley S.",
      role: "Pre-Med Student",
      text: "It's like a personal tutor for my calendar. The AI suggestions are surprisingly accurate.",
      rating: 5,
      avatar: "/images/avatar-3.jpg",
    },
  ],
};

// -----------------------------------------------------------------------------
// Footer / CTA Config
// -----------------------------------------------------------------------------
export interface FooterConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  inputPlaceholder: string;
  buttonText: string;
  footerText: string;
  privacyText: string;
  termsText: string;
  supportText: string;
}

export const footerConfig: FooterConfig = {
  scriptText: "JOIN NOW",
  subtitle: "GET STARTED",
  mainTitle: "Ready for a calmer semester?",
  introText: "Join 50,000+ students planning smarter.",
  inputPlaceholder: "Enter your email",
  buttonText: "Get Early Access",
  footerText: "© 2024 SmartStudy Planner",
  privacyText: "Privacy",
  termsText: "Terms",
  supportText: "Support",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Back to top",
};
