import { Button } from "@/components/ui/button";
import { HERO_SOCIALS } from "@/data/heroData";
import { Download } from "lucide-react";

const SocialMedia = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-3 sm:gap-4 border p-4 sm:p-6 rounded-xl backdrop-blur-3xl text-center shadow-md w-full">
      {/* Title */}
      <h3 className="text-xs sm:text-sm uppercase tracking-wider text-primary/60">
        Connect with me
      </h3>

      {/* Social Icons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 mt-1 sm:mt-2 w-full">
        {HERO_SOCIALS.map((social) => {
          const Icon = social.icon;

          return (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`
                flex items-center justify-center
                w-9 h-9 sm:w-10 sm:h-10
                rounded-lg
                text-white
                transition-all duration-200
                hover:text-white
                hover:scale-110
                active:scale-95
                ${social.bgColor || "bg-background/20"}
              `}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          );
        })}

        {/* Resume Button */}
        <Button
          asChild
          className="rounded-lghover:scale-105 active:scale-95 transition-all duration-200 text-xs sm:text-sm px-3 sm:px-4 py-2 h-9 sm:h-10"
        >
          <a href="/cv/Thanh_Resume.pdf" download className="flex">
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="ml-1 sm:ml-2">Resume (.pdf)</span>
          </a>
        </Button>
      </div>
    </div>
  );
};

export default SocialMedia;
