"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, getProject } from "@/data/projects";
import { useAppState } from "@/lib/store";
import { dateLabel } from "@/lib/format";
import { Card, SectionHeading, RiskBadge, EmptyState } from "@/components/ui";
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

const dnaTypes = ["Funding-Starved Delay", "Early Stall", "Steady Creep", "Late Cliff"] as const;

const bottleneckCategories: { label: string; keywords: string[] }[] = [
  { label: "Land acquisition & R&R", keywords: ["land", "resettlement", "rehabilitation", "revenue department", "right-of-way"] },
  { label: "Statutory & environmental clearance", keywords: ["clearance", "forest", "wildlife", "environmental", "crz", "safety"] },
  { label: "Funding & financial", keywords: ["expenditure", "fund", "disbursement", "financial"] },
  { label: "Contractor & supply chain", keywords: ["contractor", "equipment", "supply chain", "oem", "vendor", "fabrication"] },
  { label: "Inter-agency coordination", keywords: ["coordination", "inter-state", "dependency", "grid", "shutdown", "despatch"] },
];

function classifyBottleneck(text: string): string {
  const lower = text.toLowerCase();
  for (const cat of bottleneckCategories) {
    if (cat.keywords.some((k) => lower.includes(k))) return cat.label;
  }
  return "Other";
}

export default function MemoryPage() {
  const { interventions } = useAppState();
  const [query, setQuery] = useState("");

  const dnaData = useMemo(
    () =>
      dnaTypes.map((dna) => {
        const matches = projects.filter((p) => p.delayDNA === dna);
        const sectorSet = Array.from(new Set(matches.map((p) => p.sector)));
        return { dna, count: matches.length, sectors: sectorSet, matches };
      }),
    []
  );

  const bottleneckData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      const cat = classifyBottleneck(`${p.bottleneckAgency} ${p.bottleneckNote}`);
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const resolvedLessons = useMemo(() => {
    const list = interventions.filter((iv) => iv.status === "Resolved" && iv.outcomeNote);
    if (!query.trim()) return list;
    const q = query.trim().toLowerCase();
    return list.filter((iv) => {
      const project = getProject(iv.projectId);
      return (
        iv.action.toLowerCase().includes(q) ||
        iv.outcomeNote?.toLowerCase().includes(q) ||
        project?.name.toLowerCase().includes(q)
      );
    });
  }, [interventions, query]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Institutional Memory</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Recurring delay patterns and bottlenecks observed across the portfolio, plus lessons from
          resolved interventions.
        </p>
      </div>

      <section>
        <SectionHeading eyebrow="Patterns" title="Delay DNA across the portfolio" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {dnaData.map((d) => (
            <Card key={d.dna} className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">{d.dna}</h3>
                <span className="text-sm font-semibold tabular-nums text-[var(--text-secondary)]">{d.count}</span>
              </div>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                Seen in: {d.sectors.join(", ") || "—"}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {d.matches.map((p) => (
                  <Link
                    key={p.id}
                    href={`/project/${p.id}`}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(p.sector) }} />
                    {p.id}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="Recurring bottleneck categories" />
        <Card className="p-4">
          <div style={{ height: Math.max(180, bottleneckData.length * 42) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bottleneckData} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--gridline)" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="label"
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
                  formatter={(value) => [`${value} project${Number(value) > 1 ? "s" : ""}`, "Count"]}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22} fill="var(--series-1)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>

      <section>
        <SectionHeading
          eyebrow="Lessons learned"
          title="Outcomes from resolved interventions"
          action={
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lessons…"
              className="rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
            />
          }
        />
        {resolvedLessons.length === 0 ? (
          <EmptyState title="No resolved interventions yet" body="Lessons from resolved interventions will appear here as they're logged in the Resolution Tracker." />
        ) : (
          <div className="space-y-3">
            {resolvedLessons.map((iv) => {
              const project = getProject(iv.projectId);
              return (
                <Card key={iv.id} className="p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    {project && (
                      <Link
                        href={`/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(project.sector) }} />
                        {project.name}
                      </Link>
                    )}
                    {project && <RiskBadge band={project.riskBand} size="sm" />}
                  </div>
                  <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">{iv.action}</p>
                  <p className="mt-1.5 rounded-md bg-[var(--surface-2)] px-2.5 py-1.5 text-sm text-[var(--text-secondary)]">
                    {iv.outcomeNote}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-muted)]">Resolved · logged {dateLabel(iv.loggedDate)}</p>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
