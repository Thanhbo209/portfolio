import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/content/projects";

// Shows featured projects in a responsive 1 / 2 / 3 column grid.
// "View All" (→ /projects) is deferred until that listing route exists.
export function Projects() {
  return (
    <Section id="projects" heading="Featured Projects" align="start">
      <div className="mt-10 grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Reveal
            key={project.slug}
            delay={index * 60}
            className="flex h-full flex-col"
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
