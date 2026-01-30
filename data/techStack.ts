export type TechStackItem = {
  name: string;
  icon: string;
  iconLight?: string;
  iconDark?: string;
};

export const TECH_STACK: TechStackItem[] = [
  {
    name: "TypeScript",
    icon: "/tech/typescript.png",
  },
  {
    name: "JavaScript",
    icon: "/tech/JavaScript.svg",
  },
  {
    name: "Java",
    icon: "/tech/Java.svg",
  },
  {
    name: "Spring",
    icon: "/tech/Spring.svg",
  },
  {
    name: "Node.js",
    icon: "/tech/nodejs.png",
  },
  {
    name: "Express.js",
    iconLight: "/tech/expressjs-dark.svg",
    iconDark: "/tech/expressjs-light.svg",
    icon: "/tech/expressjs-dark.svg", // fallback
  },
  {
    name: "ReactJS",
    icon: "/tech/react.png",
  },
  {
    name: "Next.js",
    icon: "/tech/nextjs2.png",
  },
  {
    name: "Tailwind CSS",
    icon: "/tech/tailwind2.png",
  },
  {
    name: "MongoDB",
    icon: "/tech/mongodb.svg",
  },
  {
    name: "PostgreSQL",
    icon: "/tech/PostgresSQL.svg",
  },
  {
    name: "SupaBase",
    icon: "/tech/supabase.svg",
  },
  {
    name: "Git",
    icon: "/tech/Git.svg",
  },
];
