import Image from "next/image";
import Link from "next/link";

import { externalLinks } from "@/constants/navigation";

const HERO_SOCIAL_LABELS = ["GitHub", "LinkedIn", "Email"] as const;

export function AboutHero() {
  const socials = HERO_SOCIAL_LABELS.map((label) => {
    const link = externalLinks.find((item) => item.label === label);
    if (!link) throw new Error(`Missing hero social link: ${label}`);
    return link;
  });

  return (
    <div className="flex flex-col items-center justify-between gap-12 @4xl:flex-row @4xl:items-center @4xl:gap-16">
      {/* Left Column: Heading, Meta, Bio, CTAs, Socials */}
      <div className="order-2 flex w-full flex-1 flex-col items-start gap-6 text-left @4xl:order-1">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-normal tracking-tight text-foreground sm:text-6xl xl:text-7xl">
            Pham Viet Thanh
            <span className="text-brand" aria-hidden="true">
              .
            </span>
          </h1>

          <div className="flex flex-col gap-1.5">
            <p className="text-lg font-medium text-muted-foreground sm:text-xl">
              Backend & AI Engineer
            </p>
            <p className="text-sm text-muted-foreground">
              Ho Chi Minh City, Vietnam · B.S. Software Engineering, HUFLIT
              (Expected 2027)
            </p>
          </div>
        </div>

        <p className="max-w-[52ch] text-base leading-relaxed text-muted-foreground">
          Backend & AI Engineer passionate about building production-ready APIs,
          AI-powered applications, and scalable backend systems. Currently
          focused on{" "}
          <strong className="text-foreground">LLM applications</strong>,{" "}
          <strong className="text-foreground">distributed systems</strong>, and{" "}
          <strong className="text-foreground">software architecture</strong>.
        </p>

        {/* Buttons: 1px border, 0 radius */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#projects"
            className="inline-flex h-11 items-center justify-center border border-foreground bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View Projects
          </a>
          <Link
            href="/resume"
            className="inline-flex h-11 items-center justify-center border border-border bg-transparent px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Resume
          </Link>
        </div>

        {/* Social Row */}
        <div className="flex flex-wrap items-center gap-6 pt-2">
          {socials.map((link) => {
            const Icon = link.icon;
            const isMail = link.href.startsWith("mailto:");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isMail ? undefined : "_blank"}
                rel={isMail ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4 shrink-0" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Right Column: Portrait, Starburst, Sparkles */}
      <div className="order-1 flex w-full shrink-0 justify-center @4xl:order-2 @4xl:w-auto">
        <div className="relative size-40 sm:size-48 @4xl:size-56 xl:size-60">
          {/* Accent Starburst (16-point sharp SVG polygon in --brand, top-right) */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 -right-3 z-10 size-12 sm:size-14 text-brand drop-shadow-sm"
          >
            <polygon
              fill="currentColor"
              points="50.0,2.0 55.5,22.5 68.4,5.7 65.6,26.7 83.9,16.1 73.3,34.4 94.3,31.6 77.5,44.5 98.0,50.0 77.5,55.5 94.3,68.4 73.3,65.6 83.9,83.9 65.6,73.3 68.4,94.3 55.5,77.5 50.0,98.0 44.5,77.5 31.6,94.3 34.4,73.3 16.1,83.9 26.7,65.6 5.7,68.4 22.5,55.5 2.0,50.0 22.5,44.5 5.7,31.6 26.7,34.4 16.1,16.1 34.4,26.7 31.6,5.7 44.5,22.5"
            />
          </svg>

          {/* Sparkle 1: Top-left */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 left-2 size-4 text-foreground/40 animate-twinkle"
          >
            <polygon
              fill="currentColor"
              points="50.0,2.0 55.7,44.3 98.0,50.0 55.7,55.7 50.0,98.0 44.3,55.7 2.0,50.0 44.3,44.3"
            />
          </svg>

          {/* Sparkle 2: Mid-left */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -left-5 size-3.5 text-foreground/30 animate-twinkle [animation-delay:1.5s]"
          >
            <polygon
              fill="currentColor"
              points="50.0,2.0 55.7,44.3 98.0,50.0 55.7,55.7 50.0,98.0 44.3,55.7 2.0,50.0 44.3,44.3"
            />
          </svg>

          {/* Sparkle 3: Bottom-left */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2 -left-2 size-5 text-foreground/35 animate-twinkle [animation-delay:0.75s]"
          >
            <polygon
              fill="currentColor"
              points="50.0,2.0 55.7,44.3 98.0,50.0 55.7,55.7 50.0,98.0 44.3,55.7 2.0,50.0 44.3,44.3"
            />
          </svg>

          {/* Portrait circle with 3px ring and gap */}
          {/* radius-ok: avatar */}
          {/* radius-ok: avatar */}
          <div className="relative isolate aspect-square size-full overflow-hidden rounded-[50%] ring-3 ring-foreground/90 ring-offset-4 ring-offset-background">
            {" "}
            <Image
              src="/portrait/portrait1.jpg"
              alt="Portrait of Pham Viet Thanh"
              fill
              priority
              sizes="(min-width: 1024px) 240px, 160px"
              className="object-cover rounded-full! rotate-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
