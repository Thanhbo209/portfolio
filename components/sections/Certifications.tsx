import { Newsreader } from "next/font/google";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CertificationRow } from "@/components/sections/certifications/CertificationRow";
import { certificationProviders } from "@/content/certifications";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--font-role-title",
  display: "swap",
});

/** Flatten providers → individual certs, sorted newest-first (stable). */
function flatCerts() {
  return certificationProviders
    .flatMap((provider) =>
      provider.certifications.map((cert) => ({ cert, provider })),
    )
    .sort((a, b) => b.cert.issueDate.localeCompare(a.cert.issueDate));
}

export function Certifications() {
  const rows = flatCerts();

  return (
    <Section id="certifications" heading="Certifications" align="start">
      <div className={`${newsreader.variable} mt-6`}>
        <Reveal>
          <ol className="flex flex-col">
            {rows.map(({ cert, provider }) => (
              <CertificationRow
                key={`${provider.name}-${cert.title}`}
                certification={cert}
                provider={provider}
              />
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
