export interface FactNode {
  id: string;
  title: string;
  fact: string;
}

export const facts: FactNode[] = [
  {
    id: "toeic",
    title: "TOEIC 870",
    fact: "TOEIC Listening & Reading: 870",
  },
  {
    id: "education",
    title: "Education",
    fact: "B.S. Software Engineering, HUFLIT (Expected 2027)",
  },
  {
    id: "certification",
    title: "Certification",
    fact: "Google AI Essentials, Jul 2026",
  },
  {
    id: "internship",
    title: "Internship",
    fact: "Backend AI Engineering Intern, FlyRank AI, Jun 2026 - Present",
  },
  {
    id: "contributor",
    title: "Contributor",
    fact: "IT Labeling / Product Annotation Contributor, Acacy Co., Ltd.",
  },
];
