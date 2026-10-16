import Image from "next/image";
import { Newsreader } from "next/font/google";

import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { techCategories, type TechItem } from "@/content/tech-stack";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  display: "swap",
});

function TechIcon({ item }: { item: TechItem }) {
  return (
    <li className="group relative flex items-center gap-1.5">
      <div className="relative flex items-center justify-center">
        {/* CSS-only hover/focus tooltip: square, zero radius */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 border border-border bg-popover px-2 py-1 text-xs text-popover-foreground opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 whitespace-nowrap"
        >
          {item.name}
        </span>

        {item.logoDark ? (
          <>
            <Image
              src={item.logo}
              alt={item.name}
              width={32}
              height={32}
              className="size-7 object-contain opacity-80 transition-opacity duration-150 group-hover:opacity-100 md:size-8 dark:hidden"
            />
            <Image
              src={item.logoDark}
              alt={item.name}
              width={32}
              height={32}
              className="hidden size-7 object-contain opacity-80 transition-opacity duration-150 group-hover:opacity-100 md:size-8 dark:block"
            />
          </>
        ) : (
          <Image
            src={item.logo}
            alt={item.name}
            width={32}
            height={32}
            className="size-7 object-contain opacity-80 transition-opacity duration-150 group-hover:opacity-100 md:size-8"
          />
        )}
      </div>

      {item.showLabel && (
        <span className="select-none font-sans text-xs text-muted-foreground">
          {item.name}
        </span>
      )}
    </li>
  );
}

export function TechStack() {
  return (
    <Section id="tech-stack" heading="Tech Stack" align="start">
      <Reveal className="mt-6">
        <div className="flex flex-col">
          {techCategories.map((category, index) => {
            const isLast = index === techCategories.length - 1;

            return (
              <div
                key={category.name}
                className={`grid grid-cols-1 items-start gap-y-3 py-5 sm:py-6 md:grid-cols-[10rem_1fr] md:items-center md:gap-x-8 ${
                  !isLast ? "border-b border-border" : ""
                }`}
              >
                <h3
                  className={`${newsreader.className} text-base font-normal text-foreground md:text-lg`}
                >
                  {category.name}
                </h3>

                <ul
                  role="list"
                  className="flex  flex-wrap items-center gap-x-5 gap-y-4"
                >
                  {category.items.map((item) => (
                    <TechIcon key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
