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
    label: "Building real-world projects",
  },
  {
    label: "REST APIs & authentication",
  },
  {
    label: "Git, GitHub & collaborative workflow",
  },
  {
    label: "Advanced Next.js patterns",
    highlight: true,
  },
  {
    label: "Loading...",
  },
];
