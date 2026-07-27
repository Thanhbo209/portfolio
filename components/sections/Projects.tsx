import { Section } from "@/components/layout/Section";

// Shows featured projects only. "View All" (→ /projects) is deferred until
// that listing route exists — see AGENTS.md §4 and the refactor plan's Risks.
export function Projects() {
  return (
    <Section id="projects" heading="Featured Projects">
      <p className="text-base text-muted-foreground">
        This page is coming soon.
      </p>
    </Section>
  );
}
