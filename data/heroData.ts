import { Github, Linkedin, Mail } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const HERO_DESCRIPTION = `
 I’m a Information Technology student with a strong interest in building clean user interfaces and solid backend logic 

 Through personal projects, I’ve learned how frontend and backend work together to create smooth user experiences

 I’m currently seeking an Intern/Fresher Web Developer position where I can learn fast, grow my skills, and contribute to real-world projects
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
