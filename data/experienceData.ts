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
    period: "Sep 2023 – Present",
    current: true,
    title: "Software Engineering Student & Team Contributor",
    type: "Academic & Collaborative Experience",
    bullets: [
      "Collaborated cross-functionally with university peers on various full-stack applications, utilizing Git workflows including pull requests and actively participating in peer code reviews",
      "Applied structured software development life cycle (SDLC) practices by designing comprehensive test case tables covering integration and performance testing across team projects",
      "Actively learned and implemented enterprise software architecture principles, gaining practical academic experience integrating frontend user interfaces with backend business logic",
    ],
    tags: [
      "SDLC",
      "Git",
      "Software Testing",
      "Enterprise Architecture",
      "Code Reviews",
    ],
  },

  {
    period: "Present",
    current: true,
    title: "Software Engineering Intern Candidate",
    type: "Career Objective",
    bullets: [
      "Actively seeking Software Engineering Internship opportunities focused on backend or full-stack development",

      "Continuously strengthening problem-solving, data structures, algorithms, and scalable web application development skills",

      "Building production-oriented projects using React, Node.js, Express, MongoDB, and Python while practicing collaborative Git workflows",
    ],
    tags: [
      "Backend Development",
      "Full-Stack Development",
      "React",
      "Node.js",
      "Python",
    ],
  },
];
