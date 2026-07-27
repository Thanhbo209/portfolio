import { Section } from "@/components/layout/Section";
import { ProjectsCarousel } from "@/components/sections/projects/ProjectsCarousel";
import { projects } from "@/content/projects";

// Shows featured projects only. "View All" (→ /projects) is deferred until
// that listing route exists — see AGENTS.md §4 and the refactor plan's Risks.
export function Projects() {
  return (
    <Section id="projects" heading="Featured Projects" align="start">
      <div className="mt-10">
        <ProjectsCarousel projects={projects} />
      </div>
    </Section>
  );
}
