import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { TechCategoryCard } from "@/components/sections/techstack/TechCategoryCard";
import { techCategories } from "@/content/tech-stack";

export function TechStack() {
  return (
    <Section id="tech-stack" heading="Tech Stack" align="start">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((category, index) => (
          <Reveal key={category.name} delay={index * 60} className="h-full">
            <TechCategoryCard category={category} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
