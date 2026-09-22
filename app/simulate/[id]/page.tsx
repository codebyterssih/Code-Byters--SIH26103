"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { getProject } from "@/data/projects";
import type { Driver } from "@/data/types";
import { pct, probPct } from "@/lib/format";
import { Card, SectionHeading, EstimateNotice, EmptyState, ConfidenceBadge, RiskBadge } from "@/components/ui";
import { ProjectTabs } from "@/components/ProjectTabs";
import { sectorColor } from "@/lib/colors";
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
} from "recharts";

type LeverKey = "funding" | "clearance" | "contractor" | "oversight";

const leverConfig: { key: LeverKey; label: string; help: string; keywords: string[] }[] = [
  {
    key: "funding",
    label: "Accelerate fund disbursement",
    help: "Closes the gap between expenditure and physical progress.",
    keywords: ["expenditure", "fund"],
  },
  {
    key: "clearance",
    label: "Fast-track land & statutory clearances",
    help: "Targets land acquisition, forest/environmental clearance, litigation, and R&R drivers.",
    keywords: ["clearance", "land acquisition", "litigation", "right-of-way", "forest", "environmental", "resettlement", "rehabilitation", "wildlife"],
  },
  {
    key: "contractor",
    label: "Boost contractor & supply-chain capacity",
    help: "Targets milestone slippage, execution pace, and equipment/supply-chain drivers.",
    keywords: ["contractor", "milestone", "execution pace", "equipment", "supply chain"],
  },
  {
    key: "oversight",
    label: "Increase monitoring & coordination",
    help: "Targets agency capacity, reporting gaps, and inter-agency coordination drivers.",
    keywords: ["reporting", "capacity", "nodal", "coordination", "dependency"],
  },
];

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function simulate(
  baseRiskScore: number,
  baseDelayProb: number,
  baseDelayMonths: number,
  baseOverrun: number,
  drivers: Driver[],
  levers: Record<LeverKey, number>
) {
  let scoreReduction = 0;
  const adjustedDrivers = drivers.map((d) => {
    if (d.impact <= 0) return d;
    const factorLower = d.factor.toLowerCase();
    let maxLeverVal = 0;
    for (const lever of leverConfig) {
      if (lever.keywords.some((k) => factorLower.includes(k))) {
        maxLeverVal = Math.max(maxLeverVal, levers[lever.key]);
      }
    }
    if (maxLeverVal === 0) return d;
    const reduction = d.impact * (maxLeverVal / 100) * 0.6;
    scoreReduction += reduction;
    return { ...d, impact: round1(d.impact - reduction) };
  });

  const newScore = Math.max(8, Math.round(baseRiskScore - scoreReduction));
  const ratio = newScore / baseRiskScore;
  const newDelayProb = clamp(round1(baseDelayProb * ratio * 100) / 100, 0.03, 0.95);
  const newDelayMonths = Math.max(0, round1(baseDelayMonths * ratio));
  const newOverrun = Math.max(0, round1(baseOverrun * Math.sqrt(ratio)));

  return { newScore, newDelayProb, newDelayMonths, newOverrun, adjustedDrivers };
}

export default function SimulatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProject(id);

  const [levers, setLevers] = useState<Record<LeverKey, number>>({
    funding: 0,
    clearance: 0,
    contractor: 0,
    oversight: 0,
  });

  const result = useMemo(() => {
    if (!project) return null;
    return simulate(
      project.riskScore,
      project.delayProbability,
      project.expectedDelayMonths,
      project.expectedCostOverrunPct,
      project.drivers,
      levers
    );
  }, [project, levers]);

  if (!project || !result) {
    return <EmptyState title="Project not found" body={`No project with id "${id}" exists in this dataset.`} />;
  }

  const anyLeverActive = Object.values(levers).some((v) => v > 0);

  return (
    <div className="space-y-8">
      <div>
        <Link href={`/project/${project.id}`} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          ← {project.name}
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]"
            style={{ background: "var(--surface-2)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(project.sector) }} />
            {project.sector}
          </span>
          <RiskBadge band={project.riskBand} size="sm" />
          <ConfidenceBadge level={project.confidence} size="sm" />
        </div>
        <h1 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">What-If Simulation</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Explore how hypothetical interventions might shift {project.name}&apos;s risk profile.
        </p>
      </div>

      <ProjectTabs projectId={project.id} />

      <EstimateNotice>
        Sliders apply a simplified, illustrative reduction to the drivers each lever plausibly
        addresses. Real-world outcomes depend on execution quality, external approvals, and factors
        this model does not capture — use this to reason about direction and rough magnitude, not to
        commit to a revised date or budget.
      </EstimateNotice>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="p-4 lg:col-span-2">
          <SectionHeading title="Interventions" />
          <div className="space-y-5">
            {leverConfig.map((lever) => (
              <div key={lever.key}>
                <div className="mb-1 flex items-center justify-between">
                  <label htmlFor={lever.key} className="text-sm font-medium text-[var(--text-primary)]">
                    {lever.label}
                  </label>
                  <span className="text-sm tabular-nums text-[var(--text-secondary)]">{levers[lever.key]}%</span>
                </div>
                <input
                  id={lever.key}
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={levers[lever.key]}
                  onChange={(e) => setLevers((prev) => ({ ...prev, [lever.key]: Number(e.target.value) }))}
                  className="w-full accent-[var(--series-1)]"
                />
                <p className="mt-1 text-xs text-[var(--text-muted)]">{lever.help}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setLevers({ funding: 0, clearance: 0, contractor: 0, oversight: 0 })}
            disabled={!anyLeverActive}
            className="mt-4 rounded-md border border-[var(--border-hairline)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)] disabled:opacity-40"
          >
            Reset to baseline
          </button>
        </Card>

        <div className="space-y-4 lg:col-span-3">
          <SectionHeading title="Baseline vs. simulated outcome" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <ComparisonTile
              label="Risk score"
              before={`${project.riskScore}`}
              after={`${result.newScore}`}
              improved={result.newScore < project.riskScore}
            />
            <ComparisonTile
              label="Delay probability"
              before={probPct(project.delayProbability)}
              after={probPct(result.newDelayProb)}
              improved={result.newDelayProb < project.delayProbability}
            />
            <ComparisonTile
              label="Expected delay"
              before={`+${project.expectedDelayMonths}mo`}
              after={`+${result.newDelayMonths}mo`}
              improved={result.newDelayMonths < project.expectedDelayMonths}
            />
            <ComparisonTile
              label="Cost overrun"
              before={pct(project.expectedCostOverrunPct, 1)}
              after={pct(result.newOverrun, 1)}
              improved={result.newOverrun < project.expectedCostOverrunPct}
            />
          </div>

          <Card className="p-4">
            <SectionHeading title="Driver impact — baseline vs. simulated" />
            <div style={{ height: Math.max(220, project.drivers.length * 38) }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={result.adjustedDrivers
                    .map((d, i) => ({ ...d, baseline: project.drivers[i].impact }))
                    .sort((a, b) => b.baseline - a.baseline)}
                  layout="vertical"
                  margin={{ left: 8, right: 24, top: 4, bottom: 4 }}
                >
                  <CartesianGrid stroke="var(--gridline)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "var(--text-muted)", fontSize: 12 }} axisLine={{ stroke: "var(--baseline)" }} tickLine={false} />
                  <YAxis
                    type="category"
                    dataKey="factor"
                    width={230}
                    tick={{ fill: "var(--text-secondary)", fontSize: 12 }}
                    axisLine={{ stroke: "var(--baseline)" }}
                    tickLine={false}
                  />
                  <ReferenceLine x={0} stroke="var(--baseline)" />
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
                  <Bar dataKey="baseline" name="Baseline" radius={4} maxBarSize={10} fill="var(--gridline)" />
                  <Bar dataKey="impact" name="Simulated" radius={4} maxBarSize={10}>
                    {result.adjustedDrivers.map((d) => (
                      <Cell key={d.factor} fill={d.impact >= 0 ? "var(--status-critical)" : "var(--status-good)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ComparisonTile({
  label,
  before,
  after,
  improved,
}: {
  label: string;
  before: string;
  after: string;
  improved: boolean;
}) {
  const changed = before !== after;
  return (
    <Card className="p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-sm text-[var(--text-muted)] line-through">{changed ? before : ""}</span>
      </div>
      <div
        className={`text-xl font-semibold tabular-nums ${
          changed ? (improved ? "text-[var(--status-good)]" : "text-[var(--text-primary)]") : "text-[var(--text-primary)]"
        }`}
      >
        {after}
      </div>
      {!changed && <div className="mt-1 text-xs text-[var(--text-muted)]">baseline</div>}
    </Card>
  );
}
