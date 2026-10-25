import Image from "next/image";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr";

import type { Certification, CertificationProvider } from "@/content/certifications";

const MONTH_NAMES = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function formatMonthYear(iso: string): string {
  const [yearStr, monthStr] = iso.split("-");
  const monthIdx = parseInt(monthStr, 10) - 1;
  const monthName = MONTH_NAMES[monthIdx] ?? monthStr;
  return `${monthName} ${yearStr}`;
}

interface CertificationRowProps {
  certification: Certification;
  provider: Pick<CertificationProvider, "name" | "logo" | "logoDark">;
}

export function CertificationRow({
  certification,
  provider,
}: CertificationRowProps) {
  const displayDate = formatMonthYear(certification.issueDate);
  const visibleSkills = certification.skills?.slice(0, 3) ?? [];

  return (
    <li className="flex items-start justify-between gap-4 border-b border-border py-5 last:border-0">
      {/* Left cluster: logo + text */}
      <div className="flex items-start gap-4">
        {/* Logo tile – circular avatar; radius-ok: avatar */}
        <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-border bg-card">
          {provider.logo && (
            <Image
              src={provider.logo}
              alt=""
              fill
              sizes="36px"
              className="object-contain dark:opacity-90"
            />
          )}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5">
          <h3 className="font-[family-name:var(--font-role-title,var(--font-heading))] text-base font-normal tracking-tight text-foreground leading-snug">
            {certification.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {provider.name}
          </p>
          {visibleSkills.length > 0 && (
            <p className="text-sm text-muted-foreground/70">
              {visibleSkills.join(" · ")}
              {(certification.skills?.length ?? 0) > 3 && " · …"}
            </p>
          )}
        </div>
      </div>

      {/* Right cluster: date + verify link */}
      <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
        <time
          dateTime={certification.issueDate}
          className="text-sm tabular-nums text-muted-foreground whitespace-nowrap"
        >
          {displayDate}
        </time>
        {certification.verifyUrl && (
          <a
            href={certification.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${certification.title} credential (opens in a new tab)`}
            className="group inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
          >
            Verify
            <ArrowSquareOutIcon
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
              weight="regular"
            />
          </a>
        )}
      </div>
    </li>
  );
}
