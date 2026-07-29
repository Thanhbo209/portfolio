export interface Certification {
  title: string;
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  certificateImage?: string;
  skills?: string[];
}

export interface CertificationProvider {
  name: string;
  logo?: string;
  logoDark?: string;
  certifications: Certification[];
}

export const certificationProviders: CertificationProvider[] = [
  {
    name: "Google",
    logo: "/tech/google.svg",
    certifications: [
      {
        title: "Google AI Essentials",
        issueDate: "Jul 2026",
        verifyUrl:
          "https://www.credly.com/badges/06f70cad-1b25-4e37-9ef6-c0aad402b72d/linked_in_profile",
        certificateImage: "/certs/google/gg-ai-essentials.png",
        skills: ["Prompt Engineering", "AI Productivity"],
      },
    ],
  },
  {
    name: "Anthropic",
    logo: "/tech/anthropic.jpg",
    certifications: [
      {
        title: "Claude Code 101",
        issueDate: "Jul 2026",
        verifyUrl: "https://verify.skilljar.com/c/7uptcnob27fa",
        certificateImage: "/certs/anthropic/anthropic.svg",
        skills: [
          "Claude Code",
          "Agentic Workflows",
          "Prompt Engineering",
          "Context Management",
        ],
      },
    ],
  },
  {
    name: "FreeCodeCamp",
    logo: "/companies/freecodecamp.png",
    certifications: [
      {
        title: "Python Certificate",
        issueDate: "Jul 2026",
        verifyUrl: "https://verify.skilljar.com/c/7uptcnob27fa",
        certificateImage: "/tech/python.svg",
        skills: [
          "Python",
          "Data Structure & Algorithms",
          "OOP",
          "Fundamentals",
        ],
      },
    ],
  },
  {
    name: "IIG Vietnam",
    logo: "/tech/iig.jpg",
    certifications: [
      {
        title: "TOEIC Listening & Reading (Score: 870)",
        issueDate: "Jun 2026",
        skills: ["Professional English Proficiency"],
      },
    ],
  },
];
