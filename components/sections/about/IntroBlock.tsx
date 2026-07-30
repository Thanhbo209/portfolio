import Image from "next/image";
import { GraduationCapIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";

import { hiringInfo } from "@/content/contact";

export function IntroBlock() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
      <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-full sm:w-32">
        <Image
          src="/portrait/portrait1.jpg"
          alt="Portrait of Thanh Pham"
          fill
          sizes="128px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-xl font-semibold text-foreground sm:text-2xl">
          Pham Viet Thanh
        </p>
        <p className="text-base text-foreground">Backend & AI Engineer</p>

        <div className="mt-1 flex flex-col gap-1.5 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1.5">
          <div className="flex items-center gap-1.5">
            <MapPinIcon className="size-4 shrink-0" weight="regular" />
            <span>{hiringInfo.contact.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <GraduationCapIcon className="size-4 shrink-0" weight="regular" />
            <span>B.S. Software Engineering, HUFLIT (Expected 2027)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
