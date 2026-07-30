import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { Card } from "@/components/ui/Card";

const principles: string[] = [
  "Think in systems, not features.",
  "Build software people can maintain.",
  "Learn by building.",
  "Measure before optimizing.",
  "Ship. Iterate. Improve.",
];

export function EngineeringPrinciples() {
  return (
    <Card className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-foreground">
        Engineering Philosophy
      </h3>
      <ul className="flex flex-col gap-3">
        {principles.map((principle) => (
          <li
            key={principle}
            className="flex items-center gap-2.5 text-sm text-foreground"
          >
            <CheckCircleIcon
              className="size-4 shrink-0 text-primary"
              weight="regular"
            />
            <span>{principle}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
