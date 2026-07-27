import Image from "next/image";

import type { TechItem } from "@/content/tech-stack";

interface TechItemRowProps {
  item: TechItem;
}

export function TechItemRow({ item }: TechItemRowProps) {
  return (
    <div className="flex items-center gap-2 rounded-md p-1.5 transition-colors duration-200 hover:bg-accent motion-reduce:transition-none">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md p-1">
        {item.logoDark ? (
          <>
            <Image
              src={item.logo}
              alt={`${item.name} logo`}
              width={40}
              height={40}
              className="dark:hidden"
            />
            <Image
              src={item.logoDark}
              alt={`${item.name} logo`}
              width={40}
              height={40}
              className="hidden dark:block"
            />
          </>
        ) : (
          <Image
            src={item.logo}
            alt={`${item.name} logo`}
            width={40}
            height={40}
          />
        )}
      </div>
      <span className="truncate text-sm text-foreground">{item.name}</span>
    </div>
  );
}
