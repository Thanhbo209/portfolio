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
  // content/projects.ts: add as the FIRST entry in the array
  {
    slug: "freight-rate-comparison-crm",
    title: "Freight Rate Comparison CRM",
    description:
      "Multi-tenant freight CRM that compares carrier costs against sell prices, ranks profit margin per shipment, and enforces role-based access.",

    thumbnail: "/project-banner/rate-compare.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "React",
      "Tailwind CSS",
      "Supabase",
    ],
    githubUrl: "https://github.com/Thanhbo209/Rate-Comparison-Customer-CRM",
    // liveUrl: "", // TODO(me): add if deployed (same URL as your resume's Live Site link)
  },
  {
    slug: "dsa-tracker",
    title: "DSA Tracker - Algorithmic Knowledge & AI Coaching",
    thumbnail: "/project-banner/dsa-tracker.png",
    description:
      "A full-stack algorithmic coaching platform and Chrome MV3 extension with automated LeetCode capture, resilient dual-model Gemini failover, and a 3-tier Knowledge Vault.",
    technologies: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "Google Gemini",
    ],
    githubUrl: "https://github.com/Thanhbo209/dsa-tracking",
    liveUrl: "https://dsa-tracking-six.vercel.app",
  },
  {
    slug: "retail-product-detection",
    title: "Retail Product Detection",
    thumbnail: "/project-banner/product-detection.png",
    description:
      "A one-class retail product detection pipeline built with YOLOv8, from shelf-image annotation to inference.",
    technologies: ["Python", "YOLOv8", "CVAT", "OpenCV", "Pandas", "NumPy"],
    githubUrl: "https://github.com/Thanhbo209/retail-product-detection",
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
