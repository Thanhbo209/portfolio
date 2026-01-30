"use client";
import { PinContainer } from "@/components/ui/3d-pin";
import { projects } from "@/data/project";
import { ArrowDownRightFromSquareIcon } from "lucide-react";
import Image from "next/image";

const Projects = () => {
  return (
    <section className="py-20 px-4" id="projects">
      <div className="text-center mb-16">
        <h2 className="text-sm uppercase tracking-wider text-primary/60 mb-3">
          Portfolio
        </h2>
        <h1 className="heading  lg:text-6xl font-bold text-foreground mb-4">
          My Small Collection Of <span className="text-blue-300">Projects</span>
        </h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          My recent work and side projects
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center  p-4 gap-x-24 gap-y-8">
        {projects.map(({ id, title, timeline, des, img, iconLists, link }) => (
          <div
            key={id}
            className="sm:h-164 h-100 lg:min-h-[32.5] max-lg:mt-30 items-center flex justify-center sm:w-142.5 w-[80vw]"
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex  items-center  justify-center sm:w-142.5 w-[80vw] overflow-hidden h-[32vh] mb-10">
                <Image
                  src={img}
                  alt={title}
                  className="z-10 absolute rounded-md"
                  width={1000}
                  height={1000}
                />
              </div>
              <div className="flex flex-col mb-2">
                <h1 className="font-bold lg:text-2xl text-foreground md:text-xl text-base line-clamp-1 mb-2">
                  {title}
                </h1>
                <span className="text-muted-foreground">{timeline}</span>{" "}
              </div>

              <p className="lg:text-xl lg:font-thin text-foreground font-light text-sm line-clamp-2">
                {des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center ">
                  {iconLists.map((icon, index) => (
                    <div
                      className="border-2 border-white/20 rounded-full bg-black lg:w-10 w-8 h-8 flex justify-center items-center"
                      key={icon}
                      style={{ transform: `translateX(-${5 * index * 2}px)` }}
                    >
                      <Image
                        src={icon}
                        alt={icon}
                        className="p-2"
                        height={90}
                        width={90}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-sky-400">
                    Live Site
                  </p>
                  <ArrowDownRightFromSquareIcon
                    className="ms-3"
                    color="#00d9ff"
                  />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
