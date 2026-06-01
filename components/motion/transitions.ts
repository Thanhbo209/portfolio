export const spring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 25,
};

export const smooth = {
  duration: 0.5,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export const slow = {
  duration: 0.8,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

export const snappy = {
  type: "spring" as const,
  stiffness: 500,
  damping: 30,
};

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
};

export const viewportHalf = {
  once: true,
  amount: 0.3 as const,
};
