import { statSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import { Reveal } from "@/components/ui/Reveal";
import { ResumeViewer } from "@/features/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume",
  description: "Pham Viet Thanh's resume - preview or download as PDF.",
};

const RESUME_URL = "/resume/Thanh_Resume.pdf";

function getLastUpdated(): string {
  const filePath = path.join(
    process.cwd(),
    "public",
    "resume",
    "Thanh_Resume.pdf",
  );
  const { mtime } = statSync(filePath);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(mtime);
}

export default function ResumePage() {
  const lastUpdated = getLastUpdated();

  return (
    <div className="mx-auto flex max-w-full flex-col gap-8 px-6 py-16 lg:px-12">
      <Reveal>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            Resume
          </h1>
          <p className="text-base text-muted-foreground">
            A quick overview of my experience - preview it below or download the
            PDF.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </Reveal>

      <Reveal delay={80}>
        <ResumeViewer pdfUrl={RESUME_URL} />
      </Reveal>
    </div>
  );
}
