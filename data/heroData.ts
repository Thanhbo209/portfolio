import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const HERO_DESCRIPTION = `
I’m a Software Engineering student focused on building practical full-stack applications with clean user interfaces and reliable backend logic.

Through personal projects, I’ve practiced working with REST APIs, authentication, databases, frontend interfaces, and production-oriented application structure.

I’m also learning AI Engineering step by step, especially how backend systems can connect with AI workflows and intelligent product features.
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
    href: "https://www.linkedin.com/in/phmthanh/",
    icon: Linkedin,
    bgColor: "bg-blue-500/80",
  },
  {
    label: "Email",
    href: "mailto:thanhagar123@gmail.com",
    icon: Mail,
    bgColor: "bg-red-600/90",
  },
];
