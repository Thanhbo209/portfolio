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
    name: "Node",
    icon: "/tech/nodejs.png",
  },
  {
    name: "Express.js",
    iconLight: "/tech/expressjs-dark.svg",
    iconDark: "/tech/expressjs-light.svg",
    icon: "/tech/expressjs-dark.svg", // fallback
  },
  {
    name: "React",
    icon: "/tech/react.png",
  },
  {
    name: "Next",
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
    name: "SupaBase",
    icon: "/tech/supabase.svg",
  },
];
