import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <div className="mx-auto px-6 py-6 lg:px-12">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground">
        Resume
      </h1>
      <p className="mt-1 text-base text-muted-foreground">
        This page is coming soon.
      </p>
    </div>
  );
}
