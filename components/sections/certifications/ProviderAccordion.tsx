import Image from "next/image";
import { CaretDownIcon, CertificateIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CertificationItem } from "@/components/sections/certifications/CertificationItem";
import type { CertificationProvider } from "@/content/certifications";

interface ProviderAccordionProps {
  provider: CertificationProvider;
  defaultOpen?: boolean;
}

export function ProviderAccordion({
  provider,
  defaultOpen = false,
}: ProviderAccordionProps) {
  return (
    <Card className="p-0">
      <details className="group" name="certifications-accordion" open={defaultOpen}>
        <summary
          className="flex cursor-pointer list-none items-center justify-between gap-3 p-6 [&::-webkit-details-marker]:hidden [&::marker]:hidden"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md p-1">
              {provider.logo ? (
                <>
                  <Image
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    width={50}
                    height={50}
                    className={provider.logoDark ? "dark:hidden" : undefined}
                  />
                  {provider.logoDark && (
                    <Image
                      src={provider.logoDark}
                      alt={`${provider.name} logo`}
                      width={50}
                      height={50}
                      className="hidden dark:block"
                    />
                  )}
                </>
              ) : (
                <CertificateIcon
                  className="size-6 text-muted-foreground"
                  weight="regular"
                />
              )}
            </div>
            <span className="text-sm font-semibold text-foreground">
              {provider.name}
            </span>
            <Badge variant="outline">{provider.certifications.length}</Badge>
          </div>
          <CaretDownIcon
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            weight="bold"
          />
        </summary>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-open:grid-rows-[1fr] motion-reduce:transition-none">
          <div className="overflow-hidden">
            <div className="flex flex-col gap-3 px-6 pb-6">
              {provider.certifications.map((certification) => (
                <CertificationItem
                  key={certification.title}
                  certification={certification}
                />
              ))}
            </div>
          </div>
        </div>
      </details>
    </Card>
  );
}
