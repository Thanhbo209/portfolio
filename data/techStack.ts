export type TechCategory = "frontend" | "backend" | "database" | "tool" | "ide";

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
    title: "Frontend",
    category: "frontend",
    items: [
      { name: "TypeScript", icon: "/tech/typescript.png" },
      { name: "JavaScript", icon: "/tech/JavaScript.svg" },
      { name: "ReactJS", icon: "/tech/react.png" },
      { name: "Next.js", icon: "/tech/nextjs2.png" },
      { name: "Tailwind CSS", icon: "/tech/tailwind2.png" },
    ],
  },

  {
    title: "Backend",
    category: "backend",
    items: [
      { name: "Node.js", icon: "/tech/nodejs.png" },
      {
        name: "Express.js",
        iconLight: "/tech/expressjs-dark.svg",
        iconDark: "/tech/expressjs-light.svg",
        icon: "/tech/expressjs-dark.svg",
      },
      { name: "Java", icon: "/tech/Java.svg" },
      { name: "Spring", icon: "/tech/Spring.svg" },
    ],
  },

  {
    title: "Database",
    category: "database",
    items: [
      { name: "MongoDB", icon: "/tech/mongodb.svg" },
      { name: "PostgreSQL", icon: "/tech/PostgresSQL.svg" },
      { name: "SupaBase", icon: "/tech/supabase.svg" },
    ],
  },

  {
    title: "Tools",
    category: "tool",
    items: [{ name: "Git", icon: "/tech/Git.svg" }],
  },
];
