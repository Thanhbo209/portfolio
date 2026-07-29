import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoTileProps {
  src: string;
  alt: string;
  background: "black" | "white";
  size?: "sm" | "md";
  imageSize?: number;
  padding?: "p-1" | "p-1.5" | "p-2";
  className?: string;
}

// Third-party company/school logos need a fixed-color backdrop (not a
// theme-following one) to stay legible regardless of site theme — same
// rationale as the LinkedIn brand icon (AGENTS.md §12).
export function LogoTile({
  src,
  alt,
  background,
  size = "sm",
  imageSize = 32,
  padding,
  className,
}: LogoTileProps) {
  const resolvedPadding = padding ?? (size === "md" ? "p-2" : "p-1");

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md",
        size === "md" ? "size-12" : "size-10",
        background === "black" ? "bg-black" : "bg-white",
        resolvedPadding,
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={imageSize}
        height={imageSize}
        className="rounded-sm"
      />
    </div>
  );
}
