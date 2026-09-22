"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { projects, sectors } from "@/data/projects";
import type { RiskBand } from "@/data/types";
import { crore, pct, probPct } from "@/lib/format";
import { sectorColor, riskBandColor } from "@/lib/colors";
import { Card, SectionHeading, RiskBadge, ConfidenceBadge, ProgressBar, StatTile, EmptyState } from "@/components/ui";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const riskBandOrder: RiskBand[] = ["High", "Medium", "Low"];

export default function CommandCenterPage() {
  const [sectorFilter, setSectorFilter] = useState<string>("All");
  const [riskFilter, setRiskFilter] = useState<string>("All");
  const [query, setQuery] = useState("");

  const kpis = useMemo(() => {
    const totalCost = projects.reduce((a, p) => a + p.revisedCost, 0);
    const highRisk = projects.filter((p) => p.riskBand === "High").length;
    const avgDelayProb = projects.reduce((a, p) => a + p.delayProbability, 0) / projects.length;
    const avgOverrun = projects.reduce((a, p) => a + p.expectedCostOverrunPct, 0) / projects.length;
    return { totalCost, highRisk, avgDelayProb, avgOverrun };
  }, []);

  const sectorData = useMemo(
    () =>
      sectors.map((s) => ({
        sector: s,
        count: projects.filter((p) => p.sector === s).length,
      })),
    []
  );

  const riskBandData = useMemo(
    () =>
      riskBandOrder.map((band) => ({
        band,
        count: projects.filter((p) => p.riskBand === band).length,
      })),
    []
  );

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (sectorFilter !== "All" && p.sector !== sectorFilter) return false;
      if (riskFilter !== "All" && p.riskBand !== riskFilter) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.state.toLowerCase().includes(q) && !p.agency.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [sectorFilter, riskFilter, query]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Command Center</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Portfolio-wide view across {projects.length} infrastructure projects being monitored for delay
          and cost-overrun risk.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Projects tracked" value={projects.length} />
        <StatTile label="Portfolio value" value={crore(kpis.totalCost)} />
        <StatTile
          label="High-risk projects"
          value={kpis.highRisk}
          tone={kpis.highRisk > 0 ? "critical" : "good"}
          sub={`of ${projects.length} total`}
        />
        <StatTile label="Avg. delay probability" value={probPct(kpis.avgDelayProb)} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <SectionHeading title="Projects by sector" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorData} layout="vertical" margin={{ left: 8, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--gridline)" horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="sector"
                  width={140}
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
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
                  {sectorData.map((d) => (
                    <Cell key={d.sector} fill={sectorColor(d.sector)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeading title="Projects by risk band" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskBandData} margin={{ left: 4, right: 16, top: 4, bottom: 4 }}>
                <CartesianGrid stroke="var(--gridline)" vertical={false} />
                <XAxis dataKey="band" tick={{ fill: "var(--text-secondary)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "var(--surface-2)" }}
                  contentStyle={{
                    background: "var(--surface-1)",
                    border: "1px solid var(--border-hairline)",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "var(--text-primary)",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} maxBarSize={64}>
                  {riskBandData.map((d) => (
                    <Cell key={d.band} fill={riskBandColor(d.band)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div>
        <SectionHeading
          title="All projects"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, state, agency…"
                className="rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
              />
              <select
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
                className="rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-2 py-1.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
              >
                <option value="All">All sectors</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-2 py-1.5 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
              >
                <option value="All">All risk bands</option>
                {riskBandOrder.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          }
        />

        {filtered.length === 0 ? (
          <EmptyState title="No projects match these filters" body="Try clearing the search or filters." />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
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
                  <div className="mt-1 text-xs text-[var(--text-secondary)]">
                    {p.state} · {p.agency}
                  </div>

                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
                        <span>Physical</span>
                        <span className="tabular-nums">{pct(p.physicalProgress)}</span>
                      </div>
                      <ProgressBar value={p.physicalProgress} colorVar="var(--series-1)" />
                    </div>
                    <div>
                      <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
                        <span>Financial</span>
                        <span className="tabular-nums">{pct(p.financialProgress)}</span>
                      </div>
                      <ProgressBar value={p.financialProgress} colorVar="var(--series-2)" />
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <ConfidenceBadge level={p.confidence} size="sm" />
                    <span className="text-xs text-[var(--text-secondary)]">
                      +{p.expectedDelayMonths}mo · {crore(p.revisedCost)}
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
