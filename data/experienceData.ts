export type ExperienceItem = {
  period: string;
  current?: boolean;
  title: string;
  type: string;
  bullets: string[];
  tags: string[];
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "Jan 2024 – Present",
    current: true,
    title: "Self-Directed Website Developer",
    type: "Personal Development Experience",
    bullets: [
      "Built full-stack web applications using Next.js, React.js, and MongoDB (MERN stack)",
      "Developed dynamic and responsive UIs using TypeScript and modern React patterns (hooks, component-based architecture)",
      "Integrated frontend with backend APIs, managing state, data fetching, and application flow",
      "Continuously improved code quality through refactoring and adopting best practices",
    ],
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "Node.js"],
  },
  {
    period: "Sep 2023 – Present",
    current: true,
    title: "Software Engineering Student",
    type: "Academic Experience",
    bullets: [
      "Developed desktop, mobile, and web applications using .NET and Spring Boot",
      "Designed and implemented RESTful APIs for user authentication and data management",
      "Applied MVC architecture and structured backend logic for maintainable systems",
      "Collaborated in team-based projects using Git for version control and code integration",
    ],
    tags: [".NET", "Spring Boot", "REST API", "MVC", "Git"],
  },
];
