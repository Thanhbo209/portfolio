const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatMonthYear(iso: string): string {
  const [yearStr, monthStr] = iso.split("-");
  const monthIdx = parseInt(monthStr, 10) - 1;
  const monthName = MONTH_NAMES[monthIdx] ?? monthStr;
  return `${monthName} ${yearStr}`;
}

/**
 * Formats a structured start/end range into a consistent human-readable string.
 * Example: formatDateRange("2026-06", "present") -> "Jun 2026 – Present"
 * Example: formatDateRange("2024-11", "2027-07", true) -> "Nov 2024 – Jul 2027 (Expected)"
 */
export function formatDateRange(
  start: string,
  end: string | "present",
  expected?: boolean,
): string {
  const formattedStart = formatMonthYear(start);
  const formattedEnd =
    end.toLowerCase() === "present" ? "Present" : formatMonthYear(end);
  const suffix = expected ? " (Expected)" : "";
  return `${formattedStart} \u2013 ${formattedEnd}${suffix}`;
}
