export interface Project {
  slug: string;
  title: string;
  description: string;
  thumbnail?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "retail-product-detection",
    title: "Retail Product Detection",
    description:
      "A one-class retail product detection pipeline built with YOLOv8, from shelf-image annotation to inference.",
    technologies: ["Python", "YOLOv8", "CVAT", "OpenCV", "Pandas", "NumPy"],
    githubUrl: "https://github.com/Thanhbo209/retail-product-detection",
  },
  {
    slug: "finai-expense-intelligence",
    title: "FinAI - Expense Intelligence Platform",
    description:
      "A natural-language expense tracker that parses free-text transactions through a tiered Node.js and Python resolution pipeline.",
    technologies: [
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Python",
      "FastAPI",
      "React",
      "Docker",
    ],
    githubUrl: "https://github.com/Thanhbo209/finAI-assistant",
  },
  {
    slug: "ai-resume-analyzer",
    title: "AI Resume Analyzer",
    thumbnail: "/project-banner/resume-analyze.jpg",
    description:
      "A serverless resume-scoring app built on Puter.js, using its hosted Claude Sonnet integration for AI feedback.",
    technologies: [
      "JavaScript",
      "React Router v7",
      "Tailwind CSS",
      "Puter.js",
      "Zustand",
    ],
    githubUrl: "https://github.com/Thanhbo209/ai-powered-resume-tracking",
  },
];
