import {
  BriefcaseIcon,
  ChatCircleIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  MapPinIcon,
  TranslateIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MotionAnchor } from "@/components/ui/MotionAnchor";
import { MotionLink } from "@/components/ui/MotionLink";
import { LinkedinIcon } from "@/components/ui/icons/LinkedinIcon";
import type { HiringInfo } from "@/content/contact";
import { buttonHover, buttonPressEffect } from "@/lib/motion/variants";

interface HiringInformationCardProps {
  info: HiringInfo;
}

export function HiringInformationCard({ info }: HiringInformationCardProps) {
  const emailAddress = info.contact.emailHref.replace("mailto:", "");

  return (
    <Card className="flex flex-col gap-6">
      <p className="text-sm font-medium text-muted-foreground">
        Hiring Information
      </p>

      <div className="grid grid-cols-1 gap-6 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        <div className="flex flex-col gap-3 sm:pr-6">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Contact
          </p>
          <a
            href={info.contact.emailHref}
            className="flex items-center gap-2 text-sm text-foreground transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
          >
            <EnvelopeSimpleIcon
              className="size-4 shrink-0 text-muted-foreground"
              weight="regular"
            />
            {emailAddress}
          </a>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <MapPinIcon
              className="size-4 shrink-0 text-muted-foreground"
              weight="regular"
            />
            {info.contact.location}
          </div>
          <a
            href={info.contact.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-foreground transition-colors duration-200 hover:text-muted-foreground motion-reduce:transition-none"
          >
            <LinkedinIcon className="size-4 shrink-0" />
            LinkedIn
          </a>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:px-6 sm:pt-0">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Availability
          </p>
          <div className="flex items-center gap-2 text-sm text-foreground">
            <BriefcaseIcon
              className="size-4 shrink-0 text-muted-foreground"
              weight="regular"
            />
            {info.availability.status}
          </div>
          <div className="flex flex-wrap gap-2">
            {info.availability.roles.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 sm:pl-6 sm:pt-0">
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Languages
          </p>
          {info.languages.map((language) => (
            <div
              key={language.name}
              className="flex items-center gap-2 text-sm text-foreground"
            >
              <TranslateIcon
                className="size-4 shrink-0 text-muted-foreground"
                weight="regular"
              />
              {language.name}
              {language.detail && ` (${language.detail})`}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
        <MotionAnchor
          href={info.contact.emailHref}
          whileHover={buttonHover}
          whileTap={buttonPressEffect}
          className="flex w-full items-center justify-center gap-2 bg-foreground px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-accent/90 hover:text-foreground sm:w-auto"
        >
          <ChatCircleIcon className="size-4" weight="regular" />
          Email Me
        </MotionAnchor>
        <MotionLink
          href="/resume"
          whileHover={buttonHover}
          whileTap={buttonPressEffect}
          className="flex w-full items-center justify-center gap-2 border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-muted-foreground sm:w-auto"
        >
          <DownloadSimpleIcon className="size-4" weight="regular" />
          Download Resume
        </MotionLink>
      </div>
    </Card>
  );
}
