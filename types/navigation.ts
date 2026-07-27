import type { Icon } from "@phosphor-icons/react";
import type { ElementType } from "react";

export interface NavItem {
  label: string;
  id: string;
  icon: Icon;
}

export interface ExternalLink {
  label: string;
  href: string;
  icon: ElementType;
  description?: string;
}
