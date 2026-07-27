import Image from "next/image";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import type { Certification } from "@/content/certifications";

interface CertificationItemProps {
  certification: Certification;
}

export function CertificationItem({ certification }: CertificationItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {certification.certificateImage && (
            <div className="relative size-12 shrink-0 overflow-hidden rounded-md">
              <Image
                src={certification.certificateImage}
                alt={`${certification.title} certificate`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-foreground">
              {certification.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {certification.issueDate}
            </p>
          </div>
        </div>
        {certification.verifyUrl && (
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-muted-foreground"
          >
            <ArrowSquareOutIcon className="size-4" weight="regular" />
            Verify Credential
          </a>
        )}
      </div>

      {certification.credentialId && (
        <p className="text-xs text-muted-foreground">
          Credential ID: {certification.credentialId}
        </p>
      )}

      {certification.skills && certification.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {certification.skills.map((skill) => (
            <Badge key={skill} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
