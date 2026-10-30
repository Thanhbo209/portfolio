import { Section } from "@/components/layout/Section";

// Shows featured case studies only. "View All" (→ /case-studies) is deferred
// until that listing route exists — see AGENTS.md §4 and the refactor plan's Risks.
export function CaseStudies() {
  return (
    <Section id="case-studies" heading="Featured Case Studies">
      <p className="text-base text-muted-foreground">
        This page is coming soon.
      </p>
    </Section>
  );
}
