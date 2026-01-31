export type LearningStep = {
  label: string;
  highlight?: boolean;
};

export const LEARNING_STEPS: LearningStep[] = [
  {
    label: "Core web concepts (HTML, CSS)",
  },
  {
    label: "JavaScript & TypeScript fundamentals",
  },
  {
    label: "React & Tailwind CSS (component-based)",
  },
  {
    label: "Node.js & Express.js",
  },
  {
    label: "REST APIs & authentication",
  },
  {
    label: "Building real-world projects",
  },
  {
    label: "Git, GitHub & collaborative workflow",
  },
  {
    label: "Advanced Next.js patterns",
  },
  {
    label: "Caching",
  },
  {
    label: "Databases (SQL & NoSQL)",
  },
  {
    label: "CI/CD",
  },
  {
    label: "And More...",
    highlight: true,
  },
];
