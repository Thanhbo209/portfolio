import Image from "next/image";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr";

import { AnimatedBorderDot } from "@/components/ui/AnimatedBorderDot";

export function IntroBlock() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-[200px_1fr]">
      <div className="relative aspect-square rotate-4 !rounded-full w-full max-w-[200px] overflow-hidden rounded-md">
        <Image
          src="/portrait/portrait1.jpg"
          alt="Portrait of Thanh Pham"
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-base font-semibold text-foreground">
            Pham Viet Thanh
          </p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCapIcon className="size-4 shrink-0" weight="regular" />
            <span>B.S. Software Engineering, HUFLIT (Expected 2027)</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <AnimatedBorderDot />

          <p className="text-sm leading-7 text-muted-foreground">
            Backend & AI engineer focused on{" "}
            <strong className="text-foreground">TypeScript</strong>,{" "}
            <strong className="text-foreground">Python</strong>,{" "}
            <strong className="text-foreground">Node.js</strong>,{" "}
            <strong className="text-foreground">FastAPI</strong>, and{" "}
            <strong className="text-foreground">PostgreSQL</strong>. Building
            production-ready APIs, LLM applications, Dockerized systems, CI/CD
            pipelines, and continuously learning system design and distributed
            systems.
          </p>
        </div>
      </div>
    </div>
  );
}
