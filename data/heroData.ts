import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const HERO_DESCRIPTION = `
👉 Hey! I’m Thanh, a Software student passionate about creating web applications. 

👉 I enjoy experimenting with React, Next.js, and Tailwind CSS to build interactive and responsive projects.

👉 I love learning new technologies, solving problems creatively, and collaborating on meaningful projects.
`;

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  bgColor: string; // thêm màu background
};

export const HERO_SOCIALS: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Thanhbo209",
    icon: Github,
    bgColor: "bg-black",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/pham-thanh-49b4b4308/",
    icon: Linkedin,
    bgColor: "bg-blue-400/80",
  },
  {
    label: "Email",
    href: "mailto:your@email.com",
    icon: Mail,
    bgColor: "bg-red-400/70",
  },
];
