import type { Icon } from "@phosphor-icons/react";
import {
  BrainIcon,
  CodeIcon,
  DatabaseIcon,
  HardDrivesIcon,
  LayoutIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

export type ProficiencyLevel =
  | "Advanced"
  | "Proficient"
  | "Working Knowledge"
  | "Learning";

export interface TechItem {
  name: string;
  logo: string;
  /** Theme-adaptive marks only: shown instead of `logo` under `dark:`. */
  logoDark?: string;
  proficiency: ProficiencyLevel;
  relatedProjects?: string[];
  relatedExperience?: string[];
}

export interface TechCategory {
  name: string;
  icon: Icon;
  items: TechItem[];
}

export const techCategories: TechCategory[] = [
  {
    name: "Languages",
    icon: CodeIcon,
    items: [
      {
        name: "TypeScript",
        logo: "/tech/typescript.svg",
        proficiency: "Advanced",
        relatedExperience: ["FlyRank AI"],
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "JavaScript",
        logo: "/tech/javascript.svg",
        proficiency: "Proficient",
        relatedProjects: ["AI Resume Analyzer"],
      },
      {
        name: "Python",
        logo: "/tech/python.svg",
        proficiency: "Advanced",
        relatedProjects: [
          "Retail Product Detection",
          "FinAI - Expense Intelligence Platform",
        ],
      },
      {
        name: "HTML",
        logo: "/tech/html5.svg",
        proficiency: "Proficient",
      },
      {
        name: "CSS",
        logo: "/tech/css.svg",
        proficiency: "Proficient",
      },
    ],
  },
  {
    name: "Frontend",
    icon: LayoutIcon,
    items: [
      {
        name: "React",
        logo: "/tech/react.svg",
        proficiency: "Advanced",
        relatedProjects: [
          "FinAI - Expense Intelligence Platform",
          "AI Resume Analyzer",
        ],
      },
      {
        name: "Next.js",
        logo: "/tech/nextdotjs.svg",
        logoDark: "/tech/nextdotjs-dark.svg",
        proficiency: "Proficient",
      },
      {
        name: "Tailwind CSS",
        logo: "/tech/tailwindcss.svg",
        proficiency: "Proficient",
        relatedProjects: ["AI Resume Analyzer"],
      },

      {
        name: "React Router",
        logo: "/tech/reactrouter.svg",
        proficiency: "Working Knowledge",
        relatedProjects: ["AI Resume Analyzer"],
      },
      {
        name: "Vite",
        logo: "/tech/vite.svg",
        proficiency: "Working Knowledge",
      },
    ],
  },
  {
    name: "Backend",
    icon: HardDrivesIcon,
    items: [
      {
        name: "Node.js",
        logo: "/tech/nodedotjs.svg",
        proficiency: "Advanced",
        relatedExperience: ["FlyRank AI"],
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "Express",
        logo: "/tech/express.svg",
        logoDark: "/tech/express-dark.svg",
        proficiency: "Proficient",
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "FastAPI",
        logo: "/tech/fastapi.svg",
        proficiency: "Proficient",
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "JSON Web Tokens",
        logo: "/tech/jsonwebtokens.svg",
        proficiency: "Working Knowledge",
      },
    ],
  },
  {
    name: "Database",
    icon: DatabaseIcon,
    items: [
      {
        name: "PostgreSQL",
        logo: "/tech/postgresql.svg",
        proficiency: "Advanced",
        relatedExperience: ["FlyRank AI"],
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "Prisma",
        logo: "/tech/prisma.svg",
        logoDark: "/tech/prisma-dark.svg",
        proficiency: "Proficient",
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "MongoDB",
        logo: "/tech/mongodb.svg",
        proficiency: "Working Knowledge",
      },
      {
        name: "Redis",
        logo: "/tech/redis.svg",
        proficiency: "Working Knowledge",
      },
    ],
  },
  {
    name: "AI / Machine Learning",
    icon: BrainIcon,
    items: [
      {
        name: "YOLOv8",
        logo: "/tech/ultralytics.svg",
        proficiency: "Advanced",
        relatedProjects: ["Retail Product Detection"],
      },
      {
        name: "NumPy",
        logo: "/tech/numpy.svg",
        proficiency: "Proficient",
        relatedProjects: ["Retail Product Detection"],
      },
      {
        name: "Pandas",
        logo: "/tech/pandas.svg",
        proficiency: "Proficient",
        relatedProjects: ["Retail Product Detection"],
      },
      {
        name: "OpenCV",
        logo: "/tech/opencv.svg",
        proficiency: "Proficient",
        relatedProjects: ["Retail Product Detection"],
      },
      {
        name: "Claude (Anthropic)",
        logo: "/tech/anthropic.svg",
        logoDark: "/tech/anthropic-dark.svg",
        proficiency: "Working Knowledge",
        relatedProjects: ["AI Resume Analyzer"],
      },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: WrenchIcon,
    items: [
      {
        name: "Git",
        logo: "/tech/git.svg",
        proficiency: "Advanced",
      },
      {
        name: "GitHub",
        logo: "/tech/github.svg",
        logoDark: "/tech/github-dark.svg",
        proficiency: "Advanced",
      },
      {
        name: "Docker",
        logo: "/tech/docker.svg",
        proficiency: "Proficient",
        relatedExperience: ["FlyRank AI"],
        relatedProjects: ["FinAI - Expense Intelligence Platform"],
      },
      {
        name: "Postman",
        logo: "/tech/postman.svg",
        proficiency: "Working Knowledge",
      },
    ],
  },
];
