import { externalLinks } from "@/constants/navigation";

function getExternalLink(label: string) {
  const link = externalLinks.find((item) => item.label === label);
  if (!link) {
    throw new Error(`Missing external link: ${label}`);
  }
  return link;
}

// Row 1 of the Contact section — Email is deliberately excluded here since
// it's already surfaced as the "Email Me" CTA and the Contact group inside
// the Hiring Information card below.
export const contactMethods = externalLinks.filter(
  (link) => link.label !== "Email",
);

export interface HiringInfo {
  contact: {
    emailHref: string;
    location: string;
    linkedinHref: string;
  };
  availability: {
    status: string;
    roles: string[];
  };
  languages: {
    name: string;
    detail?: string;
  }[];
}

export const hiringInfo: HiringInfo = {
  contact: {
    emailHref: getExternalLink("Email").href,
    location: "Ho Chi Minh City, Vietnam",
    linkedinHref: getExternalLink("LinkedIn").href,
  },
  availability: {
    status: "Open to full-time opportunities",
    roles: ["AI Engineering", "Backend Engineering", "Full-Stack Engineering"],
  },
  languages: [
    { name: "Vietnamese" },
    { name: "English", detail: "TOEIC 870" },
  ],
};
