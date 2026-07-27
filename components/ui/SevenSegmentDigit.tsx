import { cn } from "@/lib/utils";

// Segment order: a (top), b (top-right), c (bottom-right), d (bottom),
// e (bottom-left), f (top-left), g (middle). "1" = lit.
const SEGMENTS_BY_DIGIT: Record<string, string> = {
  "0": "1111110",
  "1": "0110000",
  "2": "1101101",
  "3": "1111001",
  "4": "0110011",
  "5": "1011011",
  "6": "1011111",
  "7": "1110000",
  "8": "1111111",
  "9": "1111011",
};

// Percentage-based insets so each digit scales with its container's own
// height/aspect-ratio class instead of a fixed pixel size.
const SEGMENT_POSITION: string[] = [
  "top-0 left-[15%] right-[15%] h-[10%]", // a
  "top-[8%] right-0 w-[10%] h-[42%]", // b
  "bottom-[8%] right-0 w-[10%] h-[42%]", // c
  "bottom-0 left-[15%] right-[15%] h-[10%]", // d
  "bottom-[8%] left-0 w-[10%] h-[42%]", // e
  "top-[8%] left-0 w-[10%] h-[42%]", // f
  "top-[45%] left-[15%] right-[15%] h-[10%]", // g
];

interface SevenSegmentDigitProps {
  digit: string;
}

export function SevenSegmentDigit({ digit }: SevenSegmentDigitProps) {
  const segments = SEGMENTS_BY_DIGIT[digit] ?? "0000000";

  return (
    <div className="relative aspect-[3/5] h-8 shrink-0 sm:h-11 lg:h-16">
      {SEGMENT_POSITION.map((position, index) => (
        <span
          key={index}
          className={cn(
            "absolute rounded-full transition-colors duration-150 motion-reduce:transition-none",
            position,
            segments[index] === "1" ? "bg-foreground" : "bg-muted",
          )}
        />
      ))}
    </div>
  );
}
