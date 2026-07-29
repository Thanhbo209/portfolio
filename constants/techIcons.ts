import { techCategories } from "@/content/tech-stack";

export interface TechIcon {
  logo: string;
  logoDark?: string;
}

const fromTechStack: Record<string, TechIcon> = Object.fromEntries(
  techCategories.flatMap((category) =>
    category.items.map((item) => [
      item.name,
      { logo: item.logo, logoDark: item.logoDark },
    ]),
  ),
);

// Technologies that appear in project tech lists but aren't part of the
// curated Tech Stack section (or are listed there under a slightly
// different name) — reusing the same real, already-sourced logo files.
const additionalIcons: Record<string, TechIcon> = {
  YOLOv8: { logo: "/tech/ultralytics.svg" },
  "React Router v7": { logo: "/tech/reactrouter.svg" },
};

// CVAT, Puter.js, and Zustand have no real brand mark in Simple Icons or
// devicon (verified earlier) — they're intentionally absent here rather
// than faked, and fall back to a neutral icon at the call site.
export const TECH_ICON_MAP: Record<string, TechIcon> = {
  ...fromTechStack,
  ...additionalIcons,
};
