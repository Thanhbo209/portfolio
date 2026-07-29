import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { AvailabilityCard } from "@/components/sections/contact/AvailabilityCard";
import { ContactMethodCard } from "@/components/sections/contact/ContactMethodCard";
import { CurrentStatusCard } from "@/components/sections/contact/CurrentStatusCard";
import {
  availabilityAreas,
  contactMethods,
  currentStatus,
} from "@/content/contact";

export function Contact() {
  return (
    <Section id="contact" heading="Let's Connect" align="start">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contactMethods.map((method, index) => (
          <Reveal key={method.label} delay={index * 60} className="h-full">
            <ContactMethodCard method={method} />
          </Reveal>
        ))}
        <Reveal delay={contactMethods.length * 60} className="h-full">
          <CurrentStatusCard status={currentStatus} />
        </Reveal>
        <Reveal delay={(contactMethods.length + 1) * 60} className="h-full">
          <AvailabilityCard areas={availabilityAreas} />
        </Reveal>
      </div>
    </Section>
  );
}
