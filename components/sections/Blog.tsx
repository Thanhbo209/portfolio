import { Section } from "@/components/layout/Section";

// Shows the latest posts only. "View All" (→ /blog) is deferred until that
// listing route exists — see AGENTS.md §4 and the refactor plan's Risks.
export function Blog() {
  return (
    <Section id="blog" heading="Latest Blog">
      <p className="text-base text-muted-foreground">
        This page is coming soon.
      </p>
    </Section>
  );
}
