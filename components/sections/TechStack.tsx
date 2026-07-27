import { Section } from "@/components/layout/Section";
import { TechCategoryCard } from "@/components/sections/techstack/TechCategoryCard";
import { techCategories } from "@/content/tech-stack";

export function TechStack() {
  return (
    <Section id="tech-stack" heading="Tech Stack" align="start">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {techCategories.map((category) => (
          <TechCategoryCard key={category.name} category={category} />
        ))}
      </div>
    </Section>
  );
}
