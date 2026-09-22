"use client";

import Link from "next/link";
import type { Project } from "@/data/types";
import { RiskBadge, ConfidenceBadge } from "@/components/ui";
import { ProjectTabs } from "@/components/ProjectTabs";
import { sectorColor } from "@/lib/colors";
import { crore, dateLabel } from "@/lib/format";

export function ProjectHeader({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <div>
        <Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          ← Command Center
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]"
              style={{ background: "var(--surface-2)" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: sectorColor(project.sector) }} />
              {project.sector}
            </span>
            <span className="text-xs text-[var(--text-muted)]">ID: {project.id}</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{project.name}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {project.state} · {project.agency} · {project.ministry}
          </p>
          <p className="mt-1 text-xs text-[var(--text-muted)]">
            {dateLabel(project.startDate)} → {dateLabel(project.anticipatedCompletion)} · Revised cost{" "}
            {crore(project.revisedCost)}
          </p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <RiskBadge band={project.riskBand} />
          <ConfidenceBadge level={project.confidence} />
        </div>
      </div>

      <ProjectTabs projectId={project.id} />
    </div>
  );
}
