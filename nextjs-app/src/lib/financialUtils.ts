/**
 * Formats a number as Indian Rupee string with locale formatting.
 * e.g. 1234567 → "₹12,34,567"
 */
export function formatINR(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

/**
 * Formats a large number into compact Lakhs/Crores notation for axis labels.
 * e.g. 1234567 → "₹12.3L"  |  12345678 → "₹1.2Cr"
 */
export function formatCompact(value: number): string {
  if (value >= 10_000_000) {
    return `₹${(value / 10_000_000).toFixed(1)}Cr`;
  }
  if (value >= 100_000) {
    return `₹${(value / 100_000).toFixed(1)}L`;
  }
  if (value >= 1_000) {
    return `₹${(value / 1_000).toFixed(1)}K`;
  }
  return `₹${value}`;
}

/**
 * Clamps a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
