"use client";

import { useMemo } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import type { RiskBand } from "@/data/types";
import { Card, SectionHeading, StatTile, RiskBadge } from "@/components/ui";
import { sectorColor } from "@/lib/colors";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function bandFor(score: number): RiskBand {
  if (score >= 67) return "High";
  if (score >= 36) return "Medium";
  return "Low";
}

function baselineScore(p: (typeof projects)[number]): number {
  const start = new Date(p.startDate).getTime();
  const end = new Date(p.anticipatedCompletion).getTime();
  const now = Date.now();
  const elapsedFraction = end > start ? Math.min(1, Math.max(0, (now - start) / (end - start))) : 1;
  const expectedProgress = elapsedFraction * 100;
  const gap = expectedProgress - p.physicalProgress; // positive = behind schedule
  const score = 50 + gap * 1.3;
  return Math.round(Math.min(96, Math.max(4, score)));
}

export default function ComparePage() {
  const rows = useMemo(
    () =>
      projects
        .map((p) => {
          const baseline = baselineScore(p);
          const baselineBand = bandFor(baseline);
          return {
            project: p,
            baseline,
            baselineBand,
            aiScore: p.riskScore,
            aiBand: p.riskBand,
            agree: baselineBand === p.riskBand,
          };
        })
        .sort((a, b) => b.aiScore - a.aiScore),
    []
  );

  const agreementPct = Math.round((rows.filter((r) => r.agree).length / rows.length) * 100);
  const aiCaughtMore = rows.filter((r) => r.aiBand === "High" && r.baselineBand !== "High").length;
  const baselineOverstated = rows.filter((r) => r.baselineBand === "High" && r.aiBand !== "High").length;

  const chartData = rows.map((r) => ({
    name: r.project.id,
    fullName: r.project.name,
    Baseline: r.baseline,
    "AI Model": r.aiScore,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Model Lab</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Baseline heuristic vs. the multi-factor risk model, side by side across every tracked
          project.
        </p>
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        The baseline is a simple schedule-vs-physical-progress heuristic. The AI model score also
        factors in expenditure imbalance, sector history, contractor and clearance signals, and more
        — see each project&apos;s Cause tab for its specific drivers. Both are computed on the same
        synthetic dataset for illustration and are not benchmarked against real outcomes.
      </p>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Risk-band agreement" value={`${agreementPct}%`} />
        <StatTile
          label="High risk — AI only"
          value={aiCaughtMore}
          sub="Flagged by the full model, missed by the baseline"
          tone={aiCaughtMore > 0 ? "critical" : "good"}
        />
        <StatTile
          label="High risk — baseline only"
          value={baselineOverstated}
          sub="Baseline over-called, full model disagrees"
          tone={baselineOverstated > 0 ? "warning" : "good"}
        />
        <StatTile label="Projects compared" value={rows.length} />
      </div>

      <Card className="p-4">
        <SectionHeading title="Risk score by project" />
        <div style={{ height: Math.max(320, rows.length * 30) }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }} barGap={2}>
              <CartesianGrid stroke="var(--gridline)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={56}
                tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                axisLine={{ stroke: "var(--baseline)" }}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "var(--surface-2)" }}
                contentStyle={{
                  background: "var(--surface-1)",
                  border: "1px solid var(--border-hairline)",
                  borderRadius: 8,
                  fontSize: 12,
                  color: "var(--text-primary)",
                }}
                labelFormatter={(_, item) => item?.[0]?.payload?.fullName ?? ""}
              />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
              <Bar dataKey="Baseline" fill="var(--gridline)" radius={[0, 3, 3, 0]} maxBarSize={10} />
              <Bar dataKey="AI Model" fill="var(--series-1)" radius={[0, 3, 3, 0]} maxBarSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div>
        <SectionHeading title="Project-by-project comparison" />
        <div className="overflow-x-auto rounded-xl border border-[var(--border-hairline)]">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[var(--border-hairline)] bg-[var(--surface-2)] text-left text-xs uppercase tracking-wide text-[var(--text-muted)]">
                <th className="px-4 py-2.5 font-medium">Project</th>
                <th className="px-4 py-2.5 font-medium">Baseline</th>
                <th className="px-4 py-2.5 font-medium">AI model</th>
                <th className="px-4 py-2.5 font-medium">Agreement</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.project.id} className="border-b border-[var(--border-hairline)] last:border-0">
                  <td className="px-4 py-2.5">
                    <Link href={`/project/${r.project.id}`} className="inline-flex items-center gap-1.5 font-medium text-[var(--text-primary)] hover:underline">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(r.project.sector) }} />
                      {r.project.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-[var(--text-secondary)]">
                    {r.baseline} <span className="text-xs text-[var(--text-muted)]">({r.baselineBand})</span>
                  </td>
                  <td className="px-4 py-2.5 tabular-nums text-[var(--text-primary)]">
                    {r.aiScore} <RiskBadge band={r.aiBand} size="sm" />
                  </td>
                  <td className="px-4 py-2.5">
                    {r.agree ? (
                      <span className="text-[var(--status-good)]">Match</span>
                    ) : (
                      <span className="text-[var(--status-warning-ink)]">Differs</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
