import { externalLinks } from "@/constants/navigation";

export const contactMethods = externalLinks;

export interface CurrentStatus {
  role: string;
  company: string;
  companyLogo?: string;
  employmentStatus: string;
  desiredOpportunities: string;
  location: string;
}

export const currentStatus: CurrentStatus = {
  role: "Backend AI Engineering Intern",
  company: "FlyRank AI",
  companyLogo: "/companies/flyrank-ai.jpg",
  employmentStatus: "Open to new opportunities",
  desiredOpportunities: "AI Engineering & Backend Development roles",
  location: "Ho Chi Minh City, Vietnam",
};

export const availabilityAreas: string[] = [
  "AI Engineering",
  "Backend Development",
  "Full-Stack Development",
  "Open Source Collaboration",
];
