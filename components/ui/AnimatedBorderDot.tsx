export function AnimatedBorderDot() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      <circle
        r="1.5"
        className="fill-foreground animate-border-travel motion-reduce:hidden"
        style={{ offsetPath: "path('M1 1 H99 V99 H1 Z')" }}
      />
    </svg>
  );
}
