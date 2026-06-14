export type ExperienceItem = {
  period: string;
  current?: boolean;
  companyImage?: string;
  title: string;
  company?: string;
  location?: string;
  type: string;
  bullets: string[];
  tags: string[];
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Jun 2026 – Present",
    current: true,
    title: "Backend AI Engineering Intern",
    company: "FlyRank AI",
    location: "Remote",
    companyImage: "/companies/flyrank-ai.jpg",
    type: "AI Engineering Internship",
    bullets: [
      "Joining FlyRank AI as a Backend AI Engineering Intern, focusing on backend systems that support AI-powered organic growth and search visibility automation",
      "Preparing to contribute to AI backend workflows involving APIs, data processing, automation, and integration between AI services and product systems",
      "Continuing to strengthen production backend engineering skills across system design, API development, debugging, and AI-assisted development workflows",
    ],
    tags: [
      "Backend AI Engineering",
      "AI Systems",
      "APIs",
      "Automation",
      "Remote Internship",
    ],
  },

  {
    period: "May - June 2026",
    current: true,
    title: "IT Labeling / Product Annotation Contributor",
    company: "Acacy Co., Ltd.",
    location: "On-site",
    companyImage: "/companies/Acacy.jpg",
    type: "AI Data & Annotation Experience",
    bullets: [
      "Performed product annotation and labeling tasks to support computer vision and AI data workflows",
      "Reviewed visual product data with attention to labeling consistency, object boundaries, and dataset quality",
      "Gained practical exposure to the data preparation layer behind AI model training and evaluation pipelines",
    ],
    tags: [
      "Data Annotation",
      "Product Labeling",
      "Computer Vision",
      "Dataset Quality",
      "AI Data",
    ],
  },
];
