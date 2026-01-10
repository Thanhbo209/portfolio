import {
  Home,
  BookOpen,
  FolderGit2,
  GraduationCap,
  FileText,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Project", href: "/project", icon: FolderGit2 },
  { label: "Education", href: "/edu", icon: GraduationCap },
  { label: "My CV", href: "/mycv", icon: FileText },
];
