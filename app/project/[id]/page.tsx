"use client";

import { use } from "react";
import Link from "next/link";
import { getProject } from "@/data/projects";
import { crore, pct, probPct, monthLabel } from "@/lib/format";
import { sectorColor } from "@/lib/colors";
import { Card, SectionHeading, StatTile, RiskBadge, EmptyState } from "@/components/ui";
import { ProjectHeader } from "@/components/ProjectHeader";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ReferenceLine,
  LineChart,
  Line,
  Legend,
} from "recharts";

const tooltipStyle = {
  background: "var(--surface-1)",
  border: "1px solid var(--border-hairline)",
  borderRadius: 8,
  fontSize: 12,
  color: "var(--text-primary)",
};

export default function ProjectOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProject(id);

  if (!project) {
    return (
      <EmptyState title="Project not found" body={`No project with id "${id}" exists in this dataset.`} />
    );
  }

  const driverData = [...project.drivers]
    .sort((a, b) => b.impact - a.impact)
    .map((d) => ({ ...d }));

  const similar = project.similarProjectIds
    .map((sid) => getProject(sid))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />

      <section>
        <SectionHeading eyebrow="Prediction" title="Risk &amp; delay forecast" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatTile
            label="Risk score"
            value={`${project.riskScore}/100`}
            tone={project.riskBand === "High" ? "critical" : project.riskBand === "Medium" ? "warning" : "good"}
          />
          <StatTile label="Delay probability" value={probPct(project.delayProbability)} />
          <StatTile label="Expected delay" value={`+${project.expectedDelayMonths} mo`} />
          <StatTile label="Expected cost overrun" value={pct(project.expectedCostOverrunPct, 1)} />
        </div>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Original cost</div>
            <div className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-primary)]">
              {crore(project.originalCost)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">Revised cost</div>
            <div className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-primary)]">
              {crore(project.revisedCost)}
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
              Expenditure to date
            </div>
            <div className="mt-1 text-lg font-semibold tabular-nums text-[var(--text-primary)]">
              {crore(project.expenditure)}
            </div>
          </Card>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Cause" title="What's driving this score" />
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-4 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--status-critical)" }} />
              Increases risk
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: "var(--status-good)" }} />
              Reduces risk
            </span>
          </div>
          <div style={{ height: Math.max(220, driverData.length * 38) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={driverData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--gridline)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="factor"
                  width={260}
                  tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--baseline)" }}
                  tickLine={false}
                />
                <ReferenceLine x={0} stroke="var(--baseline)" />
                <Tooltip
                  cursor={{ fill: "var(--surface-2)" }}
                  contentStyle={tooltipStyle}
                  formatter={(value) => [`${Number(value) > 0 ? "+" : ""}${value}`, "Impact"]}
                />
                <Bar dataKey="impact" radius={4} maxBarSize={18}>
                  {driverData.map((d) => (
                    <Cell key={d.factor} fill={d.impact >= 0 ? "var(--status-critical)" : "var(--status-good)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-lg border border-[var(--border-hairline)] bg-[var(--surface-2)] p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
              Bottleneck agency
            </div>
            <div className="mt-1 text-sm font-medium text-[var(--text-primary)]">{project.bottleneckAgency}</div>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{project.bottleneckNote}</p>
          </div>
        </Card>
      </section>

      <section>
        <SectionHeading eyebrow="Delay DNA" title={project.delayDNA} />
        <Card className="p-4">
          <p className="text-sm text-[var(--text-secondary)]">{project.delayDNADescription}</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={project.history} margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tickFormatter={monthLabel}
                  tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--baseline)" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                  axisLine={{ stroke: "var(--baseline)" }}
                  tickLine={false}
                  width={32}
                />
                <Tooltip labelFormatter={(v) => monthLabel(v as string)} contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
                <Line
                  type="monotone"
                  dataKey="physicalProgress"
                  name="Physical progress"
                  stroke="var(--series-1)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="financialProgress"
                  name="Financial progress"
                  stroke="var(--series-2)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {project.confidence === "Low" && (
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              Reporting history for this project is sparse — treat the trend above as indicative rather
              than precise.
            </p>
          )}
        </Card>
      </section>

      <section>
        <SectionHeading eyebrow="Precedent" title="Similar projects" />
        {similar.length === 0 ? (
          <EmptyState title="No similar projects tagged" body="This project has no linked precedent cases in the dataset." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <Link key={p.id} href={`/project/${p.id}`}>
                <Card className="h-full p-4 transition-shadow hover:shadow-md">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]"
                      style={{ background: "var(--surface-2)" }}
                    >
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(p.sector) }} />
                      {p.sector}
                    </span>
                    <RiskBadge band={p.riskBand} size="sm" />
                  </div>
                  <h3 className="mt-2.5 line-clamp-2 text-sm font-semibold text-[var(--text-primary)]">{p.name}</h3>
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">{p.state}</div>
                  <div className="mt-2 text-xs font-medium text-[var(--text-muted)]">{p.delayDNA}</div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
