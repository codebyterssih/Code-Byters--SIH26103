"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getProject } from "@/data/projects";
import type { Intervention } from "@/data/types";
import { useAppState } from "@/lib/store";
import { dateLabel, isOverdue } from "@/lib/format";
import { Card, StatTile, InterventionStatusBadge, RiskBadge, EmptyState } from "@/components/ui";
import { sectorColor } from "@/lib/colors";

type StatusFilter = "All" | "Open" | "Overdue" | "Resolved";

export default function TrackerPage() {
  const { interventions, resolveIntervention } = useAppState();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [query, setQuery] = useState("");
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [outcomeDraft, setOutcomeDraft] = useState("");

  const counts = useMemo(
    () => ({
      Open: interventions.filter((i) => i.status === "Open").length,
      Overdue: interventions.filter((i) => i.status === "Overdue").length,
      Resolved: interventions.filter((i) => i.status === "Resolved").length,
    }),
    [interventions]
  );

  const filtered = useMemo(() => {
    return interventions
      .filter((iv) => statusFilter === "All" || iv.status === statusFilter)
      .filter((iv) => {
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        const project = getProject(iv.projectId);
        return (
          iv.action.toLowerCase().includes(q) ||
          iv.owner.toLowerCase().includes(q) ||
          project?.name.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const rank = { Overdue: 0, Open: 1, Resolved: 2 };
        if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      });
  }, [interventions, statusFilter, query]);

  function startResolve(iv: Intervention) {
    setResolvingId(iv.id);
    setOutcomeDraft("");
  }

  function confirmResolve(id: string) {
    resolveIntervention(id, outcomeDraft.trim() || "Marked resolved — no outcome note provided.");
    setResolvingId(null);
    setOutcomeDraft("");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--text-primary)]">Resolution Tracker</h1>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Every intervention logged across the portfolio, in one place.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatTile label="Total logged" value={interventions.length} />
        <StatTile label="Open" value={counts.Open} tone="warning" />
        <StatTile label="Overdue" value={counts.Overdue} tone={counts.Overdue > 0 ? "critical" : "good"} />
        <StatTile label="Resolved" value={counts.Resolved} tone="good" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search action, owner, project…"
          className="rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-1.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
        />
        <div className="flex gap-1">
          {(["All", "Overdue", "Open", "Resolved"] as StatusFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                statusFilter === s
                  ? "bg-[var(--series-1)]/10 text-[var(--series-1)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No interventions match these filters" />
      ) : (
        <div className="space-y-3">
          {filtered.map((iv) => {
            const project = getProject(iv.projectId);
            const overdue = iv.status !== "Resolved" && isOverdue(iv.deadline);
            return (
              <Card key={iv.id} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    {project && (
                      <Link
                        href={`/project/${project.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(project.sector) }} />
                        {project.name}
                        {project && <RiskBadge band={project.riskBand} size="sm" />}
                      </Link>
                    )}
                    <p className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">{iv.action}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {iv.owner} · Deadline {dateLabel(iv.deadline)}
                      {overdue && iv.status !== "Overdue" ? " (past due)" : ""} · Logged {dateLabel(iv.loggedDate)}
                    </p>
                    {iv.outcomeNote && (
                      <p className="mt-2 rounded-md bg-[var(--surface-2)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)]">
                        {iv.outcomeNote}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-shrink-0 flex-col items-end gap-2">
                    <InterventionStatusBadge status={iv.status} />
                    {iv.status !== "Resolved" && resolvingId !== iv.id && (
                      <button
                        onClick={() => startResolve(iv)}
                        className="text-xs font-medium text-[var(--series-1)] hover:underline"
                      >
                        Mark resolved
                      </button>
                    )}
                  </div>
                </div>

                {resolvingId === iv.id && (
                  <div className="mt-3 rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] p-3">
                    <label htmlFor={`outcome-${iv.id}`} className="mb-1 block text-xs font-medium text-[var(--text-primary)]">
                      Outcome note
                    </label>
                    <textarea
                      id={`outcome-${iv.id}`}
                      value={outcomeDraft}
                      onChange={(e) => setOutcomeDraft(e.target.value)}
                      rows={2}
                      placeholder="What happened as a result of this intervention?"
                      className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => confirmResolve(iv.id)}
                        className="rounded-md bg-[var(--series-1)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                      >
                        Confirm resolved
                      </button>
                      <button
                        onClick={() => setResolvingId(null)}
                        className="rounded-md border border-[var(--border-hairline)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
