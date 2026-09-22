// Palette tokens for PAIMANA. Values mirror the CSS custom properties defined
// in app/globals.css (light + dark), duplicated here as plain hex/var strings
// for use inside chart libraries (Recharts) that read color props directly.
// Keep the two in sync if either changes.

import type { RiskBand } from "@/data/types";

export const sectorPalette = [
  "var(--series-1)", // blue
  "var(--series-2)", // orange
  "var(--series-3)", // aqua
  "var(--series-4)", // yellow
  "var(--series-5)", // magenta
  "var(--series-6)", // green
] as const;

export const sectorOrder = [
  "Transport & Logistics",
  "Power",
  "Railways",
  "Water Resources",
  "Telecommunications",
  "Coal",
] as const;

export function sectorColor(sector: string): string {
  const idx = sectorOrder.indexOf(sector as (typeof sectorOrder)[number]);
  return sectorPalette[idx >= 0 ? idx : 0];
}

export const statusColor = {
  good: "var(--status-good)",
  warning: "var(--status-warning)",
  serious: "var(--status-serious)",
  critical: "var(--status-critical)",
} as const;

export function riskBandColor(band: RiskBand): string {
  if (band === "High") return statusColor.critical;
  if (band === "Medium") return statusColor.warning;
  return statusColor.good;
}

export function riskBandTextClass(band: RiskBand): string {
  if (band === "High") return "text-[var(--status-critical)]";
  if (band === "Medium") return "text-[var(--status-warning-ink)]";
  return "text-[var(--status-good)]";
}

export function riskBandBgClass(band: RiskBand): string {
  if (band === "High") return "bg-[var(--status-critical-bg)] text-[var(--status-critical)] border-[var(--status-critical)]/30";
  if (band === "Medium") return "bg-[var(--status-warning-bg)] text-[var(--status-warning-ink)] border-[var(--status-warning-ink)]/30";
  return "bg-[var(--status-good-bg)] text-[var(--status-good)] border-[var(--status-good)]/30";
}

export const interventionStatusColor = {
  Open: statusColor.warning,
  Overdue: statusColor.critical,
  Resolved: statusColor.good,
} as const;
