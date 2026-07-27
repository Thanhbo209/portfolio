import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

const principles: string[] = [
  "Build maintainable software.",
  "Solve real-world problems.",
  "Learn by building.",
  "Prioritize clean architecture and scalability.",
];

export function EngineeringPrinciples() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">
        Engineering Principles
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {principles.map((principle) => (
          <div
            key={principle}
            className="flex items-center gap-2 text-sm text-foreground"
          >
            <CheckCircleIcon
              className="size-4 shrink-0 text-primary"
              weight="regular"
            />
            <span>{principle}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
