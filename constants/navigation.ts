import {
  ArticleIcon,
  BriefcaseIcon,
  CertificateIcon,
  CodeIcon,
  EnvelopeSimpleIcon,
  FileTextIcon,
  FolderIcon,
  HouseIcon,
  NotebookIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";

import { EnvelopeIcon } from "@/components/ui/icons/EnvelopeIcon";
import { GithubIcon } from "@/components/ui/icons/GithubIcon";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import type { ExternalLink, NavItem } from "@/types/navigation";

// Fixed order per AGENTS.md §4.1 — do not resequence without updating that table first.
// `id` matches the corresponding <section id="..."> in app/page.tsx.
export const primaryNav: NavItem[] = [
  { label: "About", id: "about", icon: UserIcon },
  { label: "Overview", id: "overview", icon: HouseIcon },
  { label: "Experience", id: "experience", icon: BriefcaseIcon },
  { label: "Projects", id: "projects", icon: FolderIcon },
  { label: "Case Studies", id: "case-studies", icon: NotebookIcon },
  { label: "Tech Stack", id: "tech-stack", icon: CodeIcon },
  { label: "Certifications", id: "certifications", icon: CertificateIcon },
  { label: "Blog", id: "blog", icon: ArticleIcon },
  { label: "Contact", id: "contact", icon: EnvelopeSimpleIcon },
];

// Icon System (AGENTS.md §11): GitHub/LinkedIn/Email are monochrome/theme-adaptive
// local SVGs. Resume reuses the existing Phosphor FileTextIcon (not a section —
// opens/downloads the resume instead of scrolling the page).
export const externalLinks: ExternalLink[] = [
  {
    label: "Resume",
    href: "/resume",
    icon: FileTextIcon,
    description: "Download my full resume as a PDF",
  },
  {
    label: "GitHub",
    href: "https://github.com/Thanhbo209",
    icon: GithubIcon,
    description: "Explore my repositories and open-source work",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/phmthanh/",
    icon: LinkedinIcon,
    description: "Connect with me professionally",
  },
  {
    label: "Email",
    href: "mailto:thanhagar123@gmail.com",
    icon: EnvelopeIcon,
    description: "Send me a direct message",
  },
];
