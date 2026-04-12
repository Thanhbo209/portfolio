export type TechCategory =
  | "language"
  | "frontend"
  | "backend"
  | "database"
  | "tool";

export type TechStackItem = {
  name: string;
  icon: string;
  iconLight?: string;
  iconDark?: string;
};

export type TechStackSection = {
  title: string;
  category: TechCategory;
  items: TechStackItem[];
};

export const TECH_STACK_SECTIONS: TechStackSection[] = [
  {
    title: "Programming Languages",
    category: "language",
    items: [
      { name: "TypeScript", icon: "/tech/typescript.png" },
      { name: "JavaScript", icon: "/tech/JavaScript.svg" },
      { name: "Java", icon: "/tech/Java.svg" },
      // { name: "Python", icon: "/tech/Python.svg" },
    ],
  },
  {
    title: "Frontend",
    category: "frontend",
    items: [
      { name: "React", icon: "/tech/react.png" },
      {
        name: "Next",
        iconLight: "/tech/Next.js-dark.svg",
        iconDark: "/tech/nextjs2.png",
        icon: "/tech/nextjs2.png",
      },
      { name: "Tailwind CSS", icon: "/tech/tailwind2.png" },
      { name: "HTML", icon: "/tech/HTML5.svg" },
      { name: "CSS", icon: "/tech/CSS3.svg" },
      { name: "Vite", icon: "/tech/vite.js.svg" },
    ],
  },
  {
    title: "Backend",
    category: "backend",
    items: [
      { name: "Node", icon: "/tech/nodejs.png" },
      {
        name: "Express",
        iconLight: "/tech/expressjs-dark.svg",
        iconDark: "/tech/expressjs-light.svg",
        icon: "/tech/expressjs-dark.svg",
      },
      { name: "Spring", icon: "/tech/spring.svg" },
    ],
  },
  {
    title: "Databases",
    category: "database",
    items: [
      { name: "MongoDB", icon: "/tech/mongodb.svg" },
      { name: "PostgreSQL", icon: "/tech/PostgresSQL.svg" },
      { name: "SupaBase", icon: "/tech/supabase.svg" },
      // { name: "MySQL", icon: "/tech/MySQL.svg" },
    ],
  },
  {
    title: "Tools",
    category: "tool",
    items: [
      { name: "Git", icon: "/tech/Git.svg" },
      { name: "Docker", icon: "/tech/Docker.svg" },
      {
        name: "AWS",
        iconLight: "/tech/AWS.svg",
        iconDark: "/tech/aws-light.svg",
        icon: "/tech/AWS.svg",
      },
      {
        name: "Vercel",
        iconLight: "/tech/Vercel.svg",
        iconDark: "/tech/Vercel-dark.png",
        icon: "/tech/Vercel.svg",
      },
      { name: "VS Code", icon: "/tech/Visual Studio Code (VS Code).svg" },
    ],
  },
];
