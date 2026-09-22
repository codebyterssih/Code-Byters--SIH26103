"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { getProject, projects } from "@/data/projects";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Card, SectionHeading, RiskBadge, EstimateNotice, EmptyState } from "@/components/ui";
import { sectorColor } from "@/lib/colors";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function DependenciesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProject(id);

  const reverseDeps = useMemo(
    () =>
      project
        ? projects
            .filter((p) => p.id !== project.id)
            .map((p) => ({
              project: p,
              link: p.dependencies.find((d) => d.projectId === project.id),
            }))
            .filter((r) => r.link)
        : [],
    [project]
  );

  if (!project) {
    return <EmptyState title="Project not found" body={`No project with id "${id}" exists in this dataset.`} />;
  }

  const forwardDeps = project.dependencies
    .map((d) => ({ dep: d, project: getProject(d.projectId) }))
    .filter((d): d is { dep: typeof d.dep; project: NonNullable<typeof d.project> } => Boolean(d.project));

  const cascadeData = reverseDeps.map((r) => {
    const factor = r.link!.confirmed ? 0.5 : 0.25;
    const monthsAdded = Math.round(project.expectedDelayMonths * factor * 10) / 10;
    return {
      name: r.project.name.length > 28 ? r.project.name.slice(0, 26) + "…" : r.project.name,
      fullName: r.project.name,
      monthsAdded,
      confirmed: r.link!.confirmed,
    };
  });

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />

      <section>
        <SectionHeading eyebrow="Coupling check" title="This project depends on" />
        {forwardDeps.length === 0 ? (
          <EmptyState title="No upstream dependencies tagged" body="This project isn't flagged as coupled to any other project in the dataset." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {forwardDeps.map(({ dep, project: p }) => (
              <Card key={p.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/project/${p.id}`} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] hover:underline">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(p.sector) }} />
                    {p.name}
                  </Link>
                  <RiskBadge band={p.riskBand} size="sm" />
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{dep.reason}</p>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    dep.confirmed
                      ? "bg-[var(--status-good-bg)] text-[var(--status-good)]"
                      : "bg-[var(--surface-2)] text-[var(--text-muted)]"
                  }`}
                >
                  {dep.confirmed ? "Confirmed coupling" : "Potential coupling — unconfirmed"}
                </span>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeading eyebrow="Coupling check" title="Projects that depend on this one" />
        {reverseDeps.length === 0 ? (
          <EmptyState title="No downstream dependents" body="No other project in the dataset is flagged as coupled to this one." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {reverseDeps.map((r) => (
              <Card key={r.project.id} className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/project/${r.project.id}`}
                    className="flex items-center gap-1.5 text-sm font-semibold text-[var(--text-primary)] hover:underline"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(r.project.sector) }} />
                    {r.project.name}
                  </Link>
                  <RiskBadge band={r.project.riskBand} size="sm" />
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">{r.link!.reason}</p>
                <span
                  className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.link!.confirmed
                      ? "bg-[var(--status-good-bg)] text-[var(--status-good)]"
                      : "bg-[var(--surface-2)] text-[var(--text-muted)]"
                  }`}
                >
                  {r.link!.confirmed ? "Confirmed coupling" : "Potential coupling — unconfirmed"}
                </span>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeading eyebrow="Cascade impact" title="If this project slips further" />
        <div className="mb-3">
          <EstimateNotice>
            Cascade figures below are a simplified propagation model — a fraction of this project&apos;s
            own expected delay, larger for confirmed couplings than unconfirmed ones. They illustrate
            exposure, not a certified schedule impact on the dependent projects.
          </EstimateNotice>
        </div>
        {cascadeData.length === 0 ? (
          <EmptyState title="No cascade exposure" body="No downstream projects are coupled to this one, so there is nothing to propagate." />
        ) : (
          <Card className="p-4">
            <div style={{ height: Math.max(180, cascadeData.length * 48) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cascadeData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                  <CartesianGrid stroke="var(--gridline)" horizontal={false} />
                  <XAxis
                    type="number"
                    unit=" mo"
                    tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--baseline)" }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={200}
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
                    formatter={(value, _name, item) => [`~${value} months (estimate)`, item.payload.confirmed ? "Confirmed coupling" : "Potential coupling"]}
                    labelFormatter={(_, item) => item?.[0]?.payload?.fullName ?? ""}
                  />
                  <Bar dataKey="monthsAdded" radius={[0, 4, 4, 0]} maxBarSize={22} fill="var(--series-1)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
