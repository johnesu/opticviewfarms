/**
 * Money is stored in minor units (kobo) everywhere. Formatting is the only
 * place where it becomes a human-readable string.
 */
const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const nairaWithKobo = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatNaira(minorUnits: number): string {
  const major = minorUnits / 100;
  return Number.isInteger(major) ? naira.format(major) : nairaWithKobo.format(major);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

export function discountedPercent(price: number, compareAt?: number): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
