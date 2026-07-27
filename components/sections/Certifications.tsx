import { Section } from "@/components/layout/Section";
import { ProviderAccordion } from "@/components/sections/certifications/ProviderAccordion";
import { certificationProviders } from "@/content/certifications";

export function Certifications() {
  return (
    <Section id="certifications" heading="Certifications" align="start">
      <div className="mt-10 flex flex-col gap-4">
        {certificationProviders.map((provider, index) => (
          <ProviderAccordion
            key={provider.name}
            provider={provider}
            defaultOpen={index === 0}
          />
        ))}
      </div>
    </Section>
  );
}
