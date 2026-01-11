import { PinContainer } from "@/components/ui/3d-pin";
import { projects } from "@/data/project";
import { ArrowDownRightFromSquareIcon } from "lucide-react";

const Projects = () => {
  return (
    <div className="py-20 bg-background">
      <h1 className="heading ">
        A small selection of{" "}
        <span className="text-sky-300">recent projects</span>
      </h1>

      <div className="flex flex-wrap items-center justify-center  p-4 gap-x-24 gap-y-8 mt-10">
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <div
            key={id}
            className="sm:h-164 h-100 lg:min-h-[32.5]  items-center flex justify-center sm:w-142.5 w-[80vw]"
          >
            <PinContainer title={link} href={link}>
              <div className="relative flex  items-center justify-center sm:w-142.5 w-[80vw] overflow-hidden h-[30vh] mb-10">
                <img
                  src={img}
                  alt={title}
                  className="z-10 absolute -bottom-28 rounded-md"
                />
              </div>
              <h1 className="font-bold lg:text-2xl text-foreground md:text-xl text-base line-clamp-1 mb-2">
                {title}
              </h1>

              <p className="lg:text-xl lg:font-thin text-foreground font-light text-sm line-clamp-2">
                {des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                <div className="flex items-center ">
                  {iconLists.map((icon, index) => (
                    <div
                      className="border border-white/20 rounded-full bg-black lg:w-10 w-8 h-8 flex justify-center items-center"
                      key={icon}
                      style={{ transform: `translateX(-${5 * index * 2}px)` }}
                    >
                      <img src={icon} alt={icon} className="p-2" />
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
    </div>
  );
};

export default Projects;
