import type { Icon } from "@phosphor-icons/react";
import {
  BrainIcon,
  CodeIcon,
  DatabaseIcon,
  HardDrivesIcon,
  LayoutIcon,
  WrenchIcon,
} from "@phosphor-icons/react/dist/ssr";

export interface TechItem {
  name: string;
  logo: string;
  /** Theme-adaptive marks only: shown instead of `logo` under `dark:`. */
  logoDark?: string;
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
      { name: "TypeScript", logo: "/tech/typescript.svg" },
      { name: "JavaScript", logo: "/tech/javascript.svg" },
      { name: "Python", logo: "/tech/python.svg" },
      { name: "HTML", logo: "/tech/html5.svg" },
      { name: "CSS", logo: "/tech/css.svg" },
    ],
  },
  {
    name: "Frontend",
    icon: LayoutIcon,
    items: [
      { name: "React", logo: "/tech/react.svg" },
      {
        name: "Next.js",
        logo: "/tech/nextdotjs.svg",
        logoDark: "/tech/nextdotjs-dark.svg",
      },
      { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg" },
      { name: "React Router", logo: "/tech/reactrouter.svg" },
      { name: "Vite", logo: "/tech/vite.svg" },
    ],
  },
  {
    name: "Backend",
    icon: HardDrivesIcon,
    items: [
      { name: "Node.js", logo: "/tech/nodedotjs.svg" },
      {
        name: "Express",
        logo: "/tech/express.svg",
        logoDark: "/tech/express-dark.svg",
      },
      { name: "FastAPI", logo: "/tech/fastapi.svg" },
      { name: "JSON Web Tokens", logo: "/tech/jsonwebtokens.svg" },
    ],
  },
  {
    name: "Database",
    icon: DatabaseIcon,
    items: [
      { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
      {
        name: "Prisma",
        logo: "/tech/prisma.svg",
        logoDark: "/tech/prisma-dark.svg",
      },
      { name: "MongoDB", logo: "/tech/mongodb.svg" },
      { name: "Redis", logo: "/tech/redis.svg" },
    ],
  },
  {
    name: "AI / Machine Learning",
    icon: BrainIcon,
    items: [
      { name: "YOLOv8", logo: "/tech/ultralytics.svg" },
      { name: "NumPy", logo: "/tech/numpy.svg" },
      { name: "Pandas", logo: "/tech/pandas.svg" },
      { name: "OpenCV", logo: "/tech/opencv.svg" },
    ],
  },
  {
    name: "DevOps & Tools",
    icon: WrenchIcon,
    items: [
      { name: "Git", logo: "/tech/git.svg" },
      {
        name: "GitHub",
        logo: "/tech/github.svg",
        logoDark: "/tech/github-dark.svg",
      },
      { name: "Docker", logo: "/tech/docker.svg" },
      { name: "Postman", logo: "/tech/postman.svg" },
      {
        name: "Claude/Agents",
        logo: "/tech/anthropic.svg",
      },
    ],
  },
];
