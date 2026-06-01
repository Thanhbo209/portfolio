import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 transform-gpu items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg text-sm font-semibold outline-none transition-[transform,background-color,border-color,color,box-shadow,filter] duration-300 ease-out before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:before:translate-x-full active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:translate-y-0 disabled:scale-100 disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg:not([class*='size-'])]:size-4 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-[#00d9ff] text-slate-950 shadow-md shadow-[#00d9ff]/15 hover:shadow-lg hover:shadow-[#00d9ff]/25 hover:brightness-110 hover:text-slate-950",
        primary:
          "border border-transparent bg-[#00d9ff] text-slate-950 shadow-md shadow-[#00d9ff]/15 hover:shadow-lg hover:shadow-[#00d9ff]/25 hover:brightness-110 hover:text-slate-950",
        destructive:
          "border border-destructive/20 bg-destructive text-white shadow-lg shadow-destructive/15 hover:bg-destructive/90 hover:shadow-destructive/25 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        danger:
          "border border-destructive/20 bg-destructive text-white shadow-lg shadow-destructive/15 hover:bg-destructive/90 hover:shadow-destructive/25 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-border/70 bg-background/75 text-foreground shadow-xs backdrop-blur hover:border-glow/40 hover:bg-accent/60 hover:text-accent-foreground hover:shadow-lg hover:shadow-glow/10 dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "border border-border/50 bg-secondary/90 text-secondary-foreground shadow-xs hover:border-glow/30 hover:bg-secondary hover:shadow-md",
        ghost:
          "text-foreground/75 before:via-foreground/5 hover:bg-accent/70 hover:text-foreground dark:hover:bg-accent/50",
        link: "rounded-md px-0 text-primary underline-offset-4 before:hidden hover:translate-y-0 hover:underline active:scale-100",
        glow:
          "border border-transparent bg-[#00d9ff] text-slate-950 shadow-lg shadow-glow/25 hover:shadow-xl hover:shadow-glow/35 hover:brightness-110 hover:text-slate-950",
        magnetic:
          "border border-glow/20 bg-foreground text-background shadow-lg shadow-foreground/10 hover:border-glow/40 hover:shadow-xl hover:shadow-glow/20",
        icon:
          "border border-border/60 bg-background/70 text-foreground shadow-xs backdrop-blur hover:border-glow/40 hover:bg-accent/70 hover:shadow-lg hover:shadow-glow/10",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5",
        lg: "h-12 px-6 text-base has-[>svg]:px-5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
