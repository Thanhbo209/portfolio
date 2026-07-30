"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CaretDownIcon, CertificateIcon } from "@phosphor-icons/react/dist/ssr";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CertificationItem } from "@/components/sections/certifications/CertificationItem";
import type { CertificationProvider } from "@/content/certifications";
import { TRANSITIONS } from "@/lib/motion/variants";

interface ProviderAccordionProps {
  provider: CertificationProvider;
  defaultOpen?: boolean;
}

export function ProviderAccordion({
  provider,
  defaultOpen = false,
}: ProviderAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="p-0">
      {/* `open`/`name` stay native so the browser keeps enforcing "only one
          open at a time" across siblings (including auto-closing this one
          when another is opened) with zero JS. `onToggle` just mirrors that
          native state into React so the content region below can animate
          height/opacity via Motion instead of the old CSS grid-rows trick. */}
      <details
        className="group"
        name="certifications-accordion"
        open={defaultOpen}
        onToggle={(event) => setIsOpen(event.currentTarget.open)}
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-6 transition-colors duration-200 hover:bg-accent/50 motion-reduce:transition-none [&::-webkit-details-marker]:hidden [&::marker]:hidden">
          <div className="flex items-center gap-3">
            <div className="flex size-15 shrink-0 items-center justify-center rounded-md p-1">
              {provider.logo ? (
                <>
                  <Image
                    src={provider.logo}
                    alt={`${provider.name} logo`}
                    width={100}
                    height={100}
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
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={TRANSITIONS.fast}
            className="flex shrink-0 text-muted-foreground"
          >
            <CaretDownIcon className="size-4" weight="bold" />
          </motion.span>
        </summary>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={TRANSITIONS.normal}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-3 px-6 pb-6">
                {provider.certifications.map((certification) => (
                  <CertificationItem
                    key={certification.title}
                    certification={certification}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </details>
    </Card>
  );
}
