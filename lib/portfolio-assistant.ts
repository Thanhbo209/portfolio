import { externalLinks } from "@/constants/navigation";
import { projects } from "@/content/projects";

function findProjectUrl(slug: string): string {
  return projects.find((project) => project.slug === slug)?.githubUrl ?? "#projects";
}

function findExternalHref(label: string): string {
  return externalLinks.find((link) => link.label === label)?.href ?? "#";
}

export interface FollowUpAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface AssistantTopic {
  id: string;
  keywords: string[];
  response: string;
  actions: FollowUpAction[];
}

const GITHUB_HREF = findExternalHref("GitHub");
const LINKEDIN_HREF = findExternalHref("LinkedIn");

// The keyword-matching engine this file exports (findResponse) is the only
// thing the UI calls - AssistantTopic's shape (a response string + follow-up
// actions) is deliberately what a real LLM endpoint would also return, so
// swapping the matching logic for an async API call later doesn't require
// touching any component, only this file's internals.
export const ASSISTANT_TOPICS: AssistantTopic[] = [
  {
    id: "internship",
    keywords: ["intern", "internship", "flyrank", "current job", "current position", "current role"],
    response:
      "I'm currently an AI Backend Engineering Intern at FlyRank AI. I build backend services and REST APIs with TypeScript, Node.js, and PostgreSQL to support AI-powered applications, including document ingestion pipelines and AI API integrations. My work also covers production-ready features like authentication, background jobs, and containerized workflows with Docker. It's given me hands-on experience shipping AI features in a real production environment.",
    actions: [
      { label: "Learn More", href: "#experience" },
      { label: "Resume", href: "/resume" },
      { label: "LinkedIn", href: LINKEDIN_HREF, external: true },
    ],
  },
  {
    id: "projects",
    keywords: ["project", "projects", "built", "portfolio project", "what have you built"],
    response:
      "I've built three projects spanning computer vision, backend AI, and full-stack development. Retail Product Detection uses YOLOv8 for shelf-image object detection. FinAI is an expense-intelligence platform that parses natural-language transactions through a Node.js and Python pipeline. AI Resume Analyzer is a serverless app that uses Claude Sonnet to score resumes. Each one reflects a different part of how I like to build: practical, end-to-end, and grounded in real use cases.",
    actions: [
      { label: "View Projects", href: "#projects" },
      { label: "GitHub", href: GITHUB_HREF, external: true },
    ],
  },
  {
    id: "finai",
    keywords: ["finai", "expense", "expense intelligence"],
    response:
      "FinAI is a natural-language expense tracker I built - you describe a transaction in plain text, and it parses the amount, category, and merchant through a tiered Node.js and Python resolution pipeline. It's built with TypeScript, Express, PostgreSQL, Prisma, FastAPI, and React, containerized with Docker. It was a good exercise in designing a multi-stage pipeline that falls back gracefully when the fast path can't confidently parse something.",
    actions: [
      { label: "View Project", href: findProjectUrl("finai-expense-intelligence"), external: true },
      { label: "GitHub", href: GITHUB_HREF, external: true },
    ],
  },
  {
    id: "resume-analyzer",
    keywords: ["resume analyzer", "resume scoring", "resume analysis"],
    response:
      "AI Resume Analyzer is a serverless app built on Puter.js, using its hosted Claude Sonnet integration to score resumes and give AI feedback. It's built with React Router v7, Tailwind CSS, and Zustand for state. Building it fully serverless meant designing around Puter.js's own hosting and auth model rather than a traditional backend.",
    actions: [
      { label: "View Project", href: findProjectUrl("ai-resume-analyzer"), external: true },
      { label: "GitHub", href: GITHUB_HREF, external: true },
    ],
  },
  {
    id: "retail-detection",
    keywords: ["retail", "yolo", "yolov8", "object detection", "computer vision"],
    response:
      "Retail Product Detection is a one-class object detection pipeline built with YOLOv8, covering the full flow from shelf-image annotation in CVAT to inference. It uses Python, OpenCV, Pandas, and NumPy for the data and training pipeline. It was my introduction to the practical side of computer vision - annotation quality matters as much as model choice.",
    actions: [
      { label: "View Project", href: findProjectUrl("retail-product-detection"), external: true },
      { label: "GitHub", href: GITHUB_HREF, external: true },
    ],
  },
  {
    id: "ai",
    keywords: ["ai", "artificial intelligence", "llm", "machine learning", "ai experience", "ai technologies"],
    response:
      "AI runs through most of what I build: integrating LLM APIs and document ingestion pipelines at FlyRank AI, using YOLOv8 for computer vision in my retail detection project, and using Claude Sonnet for AI-driven resume feedback. I focus on practical AI integration - wiring models into real pipelines and production systems - rather than research for its own sake. My current goal is to grow into a professional AI Engineer.",
    actions: [
      { label: "View Projects", href: "#projects" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    id: "skills",
    keywords: ["skill", "skills", "tech stack", "technology", "technologies", "stack", "languages"],
    response:
      "My core stack is TypeScript, Python, Node.js, FastAPI, and Next.js, backed by PostgreSQL and Docker for backend work, plus OpenAI and LangGraph for AI integration. I work across the full stack, but backend and AI engineering are where I spend most of my time. You can see the complete breakdown, organized by category, in the Tech Stack section.",
    actions: [
      { label: "View Tech Stack", href: "#tech-stack" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    id: "career-goals",
    keywords: ["goal", "goals", "looking for", "career", "opportunity", "opportunities", "hire", "hiring"],
    response:
      "I'm working toward becoming a professional AI Engineer, and I'm currently open to AI Engineering, Backend Engineering, and Full-Stack Engineering roles. I care most about production-oriented work - shipping real systems, not just prototypes - and continuing to grow my depth in AI integration and system design.",
    actions: [
      { label: "Contact Me", href: "#contact" },
      { label: "Resume", href: "/resume" },
    ],
  },
  {
    id: "portfolio",
    keywords: ["portfolio", "this site", "this website", "how was this built", "how was this made"],
    response:
      "This portfolio is built with Next.js (App Router) and React, in strict TypeScript, styled with Tailwind CSS v4. Animations run on Motion, and every section is a Server Component by default - client-side interactivity is isolated to the smallest possible pieces, like this card. It's also a demonstration piece in its own right: the code itself is meant to reflect how I approach architecture and maintainability.",
    actions: [{ label: "GitHub", href: GITHUB_HREF, external: true }],
  },
  {
    id: "resume",
    keywords: ["resume", "cv"],
    response:
      "You can view or download my full resume as a PDF, including my experience, education, and certifications in more detail than fits here.",
    actions: [{ label: "View Resume", href: "/resume" }],
  },
];

export const SUGGESTION_CHIPS: { label: string; topicId: string }[] = [
  { label: "Projects", topicId: "projects" },
  { label: "Internship", topicId: "internship" },
  { label: "AI Experience", topicId: "ai" },
  { label: "Skills", topicId: "skills" },
  { label: "Resume", topicId: "resume" },
  { label: "Portfolio", topicId: "portfolio" },
];

// Rotates in the input while it's empty - references real projects/work by
// name rather than the generic "RAG platform" example, which doesn't match
// anything in content/projects.ts.
export const PLACEHOLDER_EXAMPLES: string[] = [
  "Ask about FinAI...",
  "Ask about FlyRank AI...",
  "What AI projects have I built?",
  "How was this portfolio created?",
  "What technologies do I use?",
];

// The chat's opening message - shown as the first assistant bubble. The
// bulleted topic list this used to pair with is now redundant with
// SUGGESTION_CHIPS, which renders right below it in the chat UI.
export const GREETING_MESSAGE =
  "Hi! I'm Thanh's portfolio assistant. Ask me about his experience, technical skills, projects, or AI engineering work.";

export const FALLBACK_TOPIC: AssistantTopic = {
  id: "fallback",
  keywords: [],
  response:
    "I don't have a specific answer for that yet - I'm a simple keyword-matched assistant, not a full AI. Try asking about projects, the internship, AI experience, skills, or career goals.",
  actions: [
    { label: "Resume", href: "/resume" },
    { label: "Contact Me", href: "#contact" },
  ],
};

export function findResponse(query: string): AssistantTopic {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return FALLBACK_TOPIC;

  const match = ASSISTANT_TOPICS.find((topic) =>
    topic.keywords.some((keyword) => normalized.includes(keyword)),
  );
  return match ?? FALLBACK_TOPIC;
}

export function getTopicById(id: string): AssistantTopic | undefined {
  return ASSISTANT_TOPICS.find((topic) => topic.id === id);
}
