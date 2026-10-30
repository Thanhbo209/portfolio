export type ExperienceEntry = {
  id: string;
  kind: "work" | "education";
  title: string;
  organization: string;
  employmentType?: string;
  location?: string;
  logo?: string;
  logoDark?: string;
  start: string; // ISO "YYYY-MM"
  end: string | "present";
  expected?: boolean;
  summary?: string; // max 2 sentences
  bullets: string[];
  technologies?: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    id: "flyrank-ai",
    kind: "work",
    title: "Backend AI Engineering Intern",
    organization: "FlyRank AI",
    employmentType: "Internship",
    location: "Remote",
    logo: "/companies/flyrank-ai.jpg",
    start: "2026-06",
    end: "present",
    summary:
      "Build backend services, REST APIs, and document ingestion pipelines to support AI-powered applications.",
    bullets: [
      "Build backend services and REST APIs with TypeScript, Node.js, and PostgreSQL to support AI-powered applications.",
      "Develop production-ready features - authentication, authorization, async background jobs, and containerized workflows with Docker.",
      "Apply AI engineering and AI-assisted development practices on a production-oriented capstone project.",
    ],
    technologies: [
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "React Flow",
      "AI Fluency",
      "Claude Code",
      "AI Agents",
    ],
  },
  {
    id: "acacy",
    kind: "work",
    title: "IT Labeling / Product Annotation Contributor",
    organization: "Acacy Co., Ltd.",
    employmentType: "Contributor",
    location: "On-site", // TODO(me): verify or remove location claim
    logo: "/companies/ACACY.png",
    start: "2026-05",
    end: "2026-06",
    summary:
      "Annotated and curated product images in CVAT for computer vision model training, applying consistency standards that reduced rework flagged during QA review.", // TODO(me): verify or remove "reduced rework" claim
    bullets: [
      // TODO(me): add 2-3 verifiable bullets
    ],
    technologies: ["CVAT"],
  },
  {
    id: "huflit",
    kind: "education",
    title: "Bachelor of Software Engineering",
    organization:
      "HCMC University of Foreign Languages and Information Technology",
    logo: "/school/huflit-logo.png",
    start: "2024-11",
    end: "2027-07",
    expected: true,
    bullets: [],
  },
];
