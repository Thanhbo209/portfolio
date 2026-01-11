import { Button } from "@/components/ui/button";
import { HERO_SOCIALS } from "@/data/heroData";
import { Download } from "lucide-react";

const SocialMedia = () => {
  return (
    <div className="flex flex-col items-start justify-center gap-4 bg-accent/30 p-6 rounded-xl backdrop-blur-sm text-center">
      {/* Title */}
      <h3 className="text-sm uppercase tracking-wider text-primary/60">
        Social Media
      </h3>

      {/* Social Icons */}
      <div className="flex flex-wrap justify-center gap-4 mt-2">
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
                w-10 h-10
                rounded-lg
                text-white
                transition
                hover:text-white
                hover:scale-110
                ${social.bgColor || "bg-background/20"}
              `}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
        <Button className="rounded-md hover:scale-105 cursor-pointer">
          <Download />
          <p> Resume</p>
        </Button>
      </div>
    </div>
  );
};

export default SocialMedia;
