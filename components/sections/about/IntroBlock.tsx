import Image from "next/image";
import {
  BriefcaseIcon,
  GraduationCapIcon,
} from "@phosphor-icons/react/dist/ssr";

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
          <p className="text-base font-semibold text-foreground">Thanh Pham</p>
          <div className="flex items-center gap-2 text-muted-foreground">
            <BriefcaseIcon className="size-4 shrink-0" weight="regular" />
            <span>AI Backend Engineering Intern @ FlyRank AI</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <GraduationCapIcon className="size-4 shrink-0" weight="regular" />
            <span>B.S. Software Engineering, HUFLIT (Expected 2027)</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-muted-foreground">
          <p>
            I&apos;m a software engineering student at HUFLIT, currently working
            as an AI Backend Engineering Intern at FlyRank AI, where I build
            backend services and AI-integrated tools.
          </p>
          <p>
            I&apos;m comfortable working across the stack, from REST API design
            and data modeling to React-based interfaces, with a growing depth in
            AI engineering fundamentals.
          </p>
          <p>
            I care about backend architecture and production-ready software, and
            I&apos;m building toward a long-term focus in AI engineering.
          </p>
        </div>
      </div>
    </div>
  );
}
