"use client";

import { use, useMemo } from "react";
import { getProject } from "@/data/projects";
import type { HistoryPoint } from "@/data/types";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Card, SectionHeading, EmptyState } from "@/components/ui";
import { useAppState } from "@/lib/store";
import { dateLabel, pct } from "@/lib/format";

function closestHistoryPoint(history: HistoryPoint[], dateStr: string): HistoryPoint {
  const targetMonth = dateStr.slice(0, 7);
  let best = history[0];
  for (const h of history) {
    if (h.month <= targetMonth) best = h;
  }
  return best;
}

export default function OutcomePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProject(id);
  const { interventions } = useAppState();

  const resolved = useMemo(
    () =>
      project
        ? interventions
            .filter((iv) => iv.projectId === project.id && iv.status === "Resolved")
            .sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime())
        : [],
    [interventions, project]
  );

  if (!project) {
    return <EmptyState title="Project not found" body={`No project with id "${id}" exists in this dataset.`} />;
  }

  const current = project.history[project.history.length - 1];

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />

      <section>
        <SectionHeading eyebrow="Outcome verification" title="Resolved interventions" />
        {resolved.length === 0 ? (
          <EmptyState title="No resolved interventions yet" body="Once an intervention for this project is marked resolved in the Tracker, its outcome will appear here." />
        ) : (
          <div className="space-y-4">
            {resolved.map((iv) => {
              const atLog = closestHistoryPoint(project.history, iv.loggedDate);
              const physDelta = Math.round((current.physicalProgress - atLog.physicalProgress) * 10) / 10;
              const finDelta = Math.round((current.financialProgress - atLog.financialProgress) * 10) / 10;
              return (
                <Card key={iv.id} className="p-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{iv.action}</p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    {iv.owner} · Logged {dateLabel(iv.loggedDate)} · Deadline {dateLabel(iv.deadline)}
                  </p>
                  {iv.outcomeNote && (
                    <p className="mt-2 rounded-md bg-[var(--surface-2)] px-2.5 py-1.5 text-sm text-[var(--text-secondary)]">
                      {iv.outcomeNote}
                    </p>
                  )}

                  <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-2">
                    <div className="rounded-md border border-[var(--border-hairline)] p-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                        Physical progress since log
                      </div>
                      <div
                        className={`mt-1 text-lg font-semibold tabular-nums ${
                          physDelta >= 0 ? "text-[var(--status-good)]" : "text-[var(--status-critical)]"
                        }`}
                      >
                        {physDelta >= 0 ? "+" : ""}
                        {physDelta} pts
                      </div>
                      <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {pct(atLog.physicalProgress)} → {pct(current.physicalProgress)}
                      </div>
                    </div>
                    <div className="rounded-md border border-[var(--border-hairline)] p-3">
                      <div className="text-xs font-medium uppercase tracking-wide text-[var(--text-muted)]">
                        Financial progress since log
                      </div>
                      <div
                        className={`mt-1 text-lg font-semibold tabular-nums ${
                          finDelta >= 0 ? "text-[var(--status-good)]" : "text-[var(--status-critical)]"
                        }`}
                      >
                        {finDelta >= 0 ? "+" : ""}
                        {finDelta} pts
                      </div>
                      <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                        {pct(atLog.financialProgress)} → {pct(current.financialProgress)}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-[var(--text-muted)]">
                    Reflects overall project movement since the log date — it does not isolate this
                    intervention&apos;s individual effect from other concurrent factors.
                  </p>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
