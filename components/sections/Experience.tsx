import { Newsreader } from "next/font/google";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ExperienceItem } from "@/components/sections/experience/ExperienceItem";
import { experiences } from "@/content/experience";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--font-role-title",
  display: "swap",
});

export function Experience() {
  return (
    <Section id="experience" heading="Experience" align="start">
      <div className={`${newsreader.variable} mt-10`}>
        <ol className="flex flex-col gap-10">
          {experiences.map((entry, index) => (
            <Reveal key={entry.id} delay={index * 60}>
              <ExperienceItem
                entry={entry}
                isLast={index === experiences.length - 1}
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
