export interface TechItem {
  name: string;
  logo: string;
  /** Theme-adaptive marks only: shown instead of `logo` under `dark:`. */
  logoDark?: string;
  showLabel?: boolean;
}

export interface TechCategory {
  name: string;
  items: TechItem[];
}

export const techCategories: TechCategory[] = [
  {
    name: "Languages",
    items: [
      { name: "TypeScript", logo: "/tech/typescript.svg" },
      { name: "JavaScript", logo: "/tech/javascript.svg" },
      { name: "Python", logo: "/tech/python.svg" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", logo: "/tech/react.svg" },
      {
        name: "Next.js",
        logo: "/tech/nextdotjs.svg",
        logoDark: "/tech/nextdotjs-dark.svg",
      },
      { name: "Tailwind CSS", logo: "/tech/tailwindcss.svg" },
      {
        name: "React Router",
        logo: "/tech/reactrouter.svg",
        showLabel: true,
      },
      {
        name: "Vite",
        logo: "/tech/vite.svg",
        showLabel: true,
      },
      { name: "HTML", logo: "/tech/html5.svg" },
      { name: "CSS", logo: "/tech/css.svg" },
    ],
  },
  {
    name: "Backend",
    items: [
      { name: "Node.js", logo: "/tech/nodedotjs.svg" },
      {
        name: "Express",
        logo: "/tech/express.svg",
        logoDark: "/tech/expressjs-light.svg",
        showLabel: true,
      },
      { name: "FastAPI", logo: "/tech/fastapi.svg" },
    ],
  },
  {
    name: "Database",
    items: [
      { name: "PostgreSQL", logo: "/tech/postgresql.svg" },
      { name: "MongoDB", logo: "/tech/mongodb.svg" },
      { name: "SQLAlchemy", logo: "/tech/sqlalchemy.svg" },
      {
        name: "Prisma",
        logo: "/tech/prisma.svg",
        logoDark: "/tech/prisma-dark.svg",
        showLabel: true,
      },
      { name: "Redis", logo: "/tech/redis.svg" },
    ],
  },
  {
    name: "AI / Data",
    items: [
      { name: "PyTorch", logo: "/tech/PyTorch.svg" },
      { name: "Scikit-learn", logo: "/tech/scikitlearn.svg" },
      { name: "XGBoost", logo: "/tech/xgboost.svg" },
      { name: "NumPy", logo: "/tech/numpy.svg" },
      {
        name: "Pandas",
        logo: "/tech/pandas.svg",
        showLabel: true,
      },
      { name: "OpenCV", logo: "/tech/opencv.svg" },
    ],
  },
  {
    name: "DevOps & Tools",
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
        showLabel: true,
      },
    ],
  },
];
