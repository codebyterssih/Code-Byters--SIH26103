export function crore(value: number): string {
  const rounded = Math.round(value);
  return `₹${rounded.toLocaleString("en-IN")} Cr`;
}

export function pct(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

export function probPct(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export function monthLabel(month: string): string {
  const [y, m] = month.split("-").map(Number);
  const d = new Date(y, m - 1, 1);
  return d.toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
}

export function dateLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function monthYearLabel(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function isOverdue(deadline: string): boolean {
  return daysUntil(deadline) < 0;
}
