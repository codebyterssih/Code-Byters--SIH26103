import type { ReactNode, CSSProperties } from "react";
import type { RiskBand, Confidence } from "@/data/types";
import { riskBandBgClass, interventionStatusColor } from "@/lib/colors";

export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`rounded-xl border bg-[var(--surface-1)] border-[var(--border-hairline)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-4">
      <div>
        {eyebrow && (
          <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)] mb-1">
            {eyebrow}
          </div>
        )}
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function RiskBadge({ band, size = "md" }: { band: RiskBand; size?: "sm" | "md" }) {
  const cls = riskBandBgClass(band);
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${cls} ${pad}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {band} risk
    </span>
  );
}

export function ConfidenceBadge({ level, size = "md" }: { level: Confidence; size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  const dots = level === "High" ? 3 : level === "Medium" ? 2 : 1;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--surface-2)] text-[var(--text-secondary)] font-medium ${pad}`}
      title={`${level} confidence prediction`}
    >
      <span className="flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${i < dots ? "bg-[var(--text-secondary)]" : "bg-[var(--gridline)]"}`}
          />
        ))}
      </span>
      {level} confidence
    </span>
  );
}

export function InterventionStatusBadge({ status }: { status: "Open" | "Overdue" | "Resolved" }) {
  const color = interventionStatusColor[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-sm font-medium"
      style={{ color, borderColor: `color-mix(in srgb, ${color} 30%, transparent)`, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}

export function StatTile({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  tone?: "good" | "warning" | "critical";
}) {
  const toneClass =
    tone === "good"
      ? "text-[var(--status-good)]"
      : tone === "warning"
        ? "text-[var(--status-warning-ink)]"
        : tone === "critical"
          ? "text-[var(--status-critical)]"
          : "text-[var(--text-primary)]";
  return (
    <Card className="p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{label}</div>
      <div className={`mt-1.5 text-2xl font-semibold tabular-nums ${toneClass}`}>{value}</div>
      {sub && <div className="mt-1 text-xs text-[var(--text-secondary)]">{sub}</div>}
    </Card>
  );
}

export function ProgressBar({
  value,
  colorVar = "var(--series-1)",
  height = 8,
}: {
  value: number;
  colorVar?: string;
  height?: number;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className="w-full rounded-full bg-[var(--gridline)] overflow-hidden"
      style={{ height }}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full"
        style={{ width: `${clamped}%`, background: colorVar }}
      />
    </div>
  );
}

export function EstimateNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-[var(--status-warning)]/30 bg-[var(--status-warning-bg)] px-3.5 py-2.5 text-sm text-[var(--status-warning-ink)]">
      <svg viewBox="0 0 20 20" className="h-4 w-4 flex-shrink-0 mt-0.5" fill="currentColor" aria-hidden>
        <path d="M10 1.5a1 1 0 01.894.553l8 16A1 1 0 0118 19.5H2a1 1 0 01-.894-1.447l8-16A1 1 0 0110 1.5zm0 5.5a.75.75 0 00-.75.75v4a.75.75 0 001.5 0v-4A.75.75 0 0010 7zm0 7.5a.9.9 0 100 1.8.9.9 0 000-1.8z" />
      </svg>
      <div>
        <span className="font-semibold">Model estimate, not a guarantee.</span>{" "}
        {children ??
          "This projection is generated from historical patterns and simplified assumptions. Treat it as a planning input, not a certified outcome."}
      </div>
    </div>
  );
}

export function SyntheticDataBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`w-full border-t border-[var(--border-hairline)] bg-[var(--surface-1)] text-[var(--text-muted)] ${compact ? "text-xs px-4 py-2" : "text-xs px-6 py-3"}`}
    >
      Synthetic demonstration data — not sourced from MoSPI, PAIMANA, or any government monitoring
      system. Figures, names, and narratives are illustrative and generated for demo purposes only.
    </div>
  );
}

export function EmptyState({ title, body }: { title: string; body?: string }) {
  return (
    <Card className="p-8 text-center">
      <div className="text-sm font-medium text-[var(--text-primary)]">{title}</div>
      {body && <div className="mt-1 text-sm text-[var(--text-secondary)]">{body}</div>}
    </Card>
  );
}
