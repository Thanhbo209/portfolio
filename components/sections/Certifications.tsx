import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProviderAccordion } from "@/components/sections/certifications/ProviderAccordion";
import { certificationProviders } from "@/content/certifications";

export function Certifications() {
  return (
    <Section id="certifications" heading="Certifications" align="start">
      <div className="mt-10 flex flex-col gap-4">
        {certificationProviders.map((provider, index) => (
          <Reveal key={provider.name} delay={index * 60}>
            <ProviderAccordion
              provider={provider}
              defaultOpen={index === 0}
            />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
