"use client";

import { use, useMemo, useState, FormEvent } from "react";
import { getProject } from "@/data/projects";
import { ProjectHeader } from "@/components/ProjectHeader";
import { Card, SectionHeading, InterventionStatusBadge, EmptyState } from "@/components/ui";
import { useAppState } from "@/lib/store";
import { dateLabel } from "@/lib/format";

function suggestActionFor(factor: string): string {
  const f = factor.toLowerCase();
  if (f.includes("expenditure") || f.includes("fund")) {
    return "Reconcile utilisation certificates and request expedited fund release from the finance wing.";
  }
  if (f.includes("land acquisition") || f.includes("resettlement") || f.includes("rehabilitation")) {
    return "Convene a district-level land acquisition / R&R review with the Collector's office.";
  }
  if (f.includes("milestone") || f.includes("execution pace")) {
    return "Review the contractor's work plan and enforce a revised milestone schedule with penalty clauses.";
  }
  if (f.includes("clearance") || f.includes("environmental") || f.includes("forest") || f.includes("wildlife")) {
    return "Escalate the pending clearance status directly with the competent authority.";
  }
  if (f.includes("litigation") || f.includes("right-of-way") || f.includes("dispute")) {
    return "Engage the state legal cell to expedite dispute resolution.";
  }
  if (f.includes("contractor") || f.includes("equipment") || f.includes("supply chain")) {
    return "Conduct a contractor performance review and evaluate additional resource deployment.";
  }
  if (f.includes("reporting")) {
    return "Restore the monthly field reporting cadence and schedule a site verification visit.";
  }
  if (f.includes("coordination") || f.includes("inter-state") || f.includes("dependency")) {
    return "Convene an inter-agency coordination meeting to align on the shared schedule.";
  }
  if (f.includes("capacity")) {
    return "Assess implementing-agency staffing and consider deputing additional project management support.";
  }
  return `Review and address: ${factor}.`;
}

export default function IntervenePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = getProject(id);
  const { interventions, addIntervention } = useAppState();

  const [action, setAction] = useState("");
  const [owner, setOwner] = useState("");
  const [deadline, setDeadline] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const projectInterventions = useMemo(
    () => (project ? interventions.filter((iv) => iv.projectId === project.id) : []),
    [interventions, project]
  );

  const overdueCount = projectInterventions.filter((iv) => iv.status === "Overdue").length;

  const suggestions = useMemo(() => {
    if (!project) return [];
    return [...project.drivers]
      .filter((d) => d.impact > 0)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3)
      .map((d) => ({ driver: d, action: suggestActionFor(d.factor) }));
  }, [project]);

  if (!project) {
    return <EmptyState title="Project not found" body={`No project with id "${id}" exists in this dataset.`} />;
  }

  const escalation = getEscalation(project.riskBand, overdueCount);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!project || !action.trim() || !owner.trim() || !deadline) return;
    addIntervention({ projectId: project.id, action: action.trim(), owner: owner.trim(), deadline });
    setAction("");
    setOwner("");
    setDeadline("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />

      <section>
        <SectionHeading eyebrow="Decision support" title="Suggested escalation level" />
        <Card
          className="p-4 border-l-4"
          style={{ borderLeftColor: `var(--status-${escalation.tone})` }}
        >
          <div className="text-sm font-semibold" style={{ color: `var(--status-${escalation.tone}${escalation.tone === "warning" ? "-ink" : ""})` }}>
            {escalation.title}
          </div>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{escalation.body}</p>
        </Card>
      </section>

      <section>
        <SectionHeading eyebrow="Intervention plan" title="Recommended actions" />
        {suggestions.length === 0 ? (
          <EmptyState title="No risk-increasing drivers to act on" body="This project has no positive-impact risk drivers flagged." />
        ) : (
          <div className="space-y-3">
            {suggestions.map(({ driver, action: suggested }) => (
              <Card key={driver.factor} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                    {driver.factor}
                  </span>
                  <span className="text-xs font-medium text-[var(--status-critical)]">+{driver.impact} risk</span>
                </div>
                <p className="mt-1.5 text-sm text-[var(--text-primary)]">{suggested}</p>
                <button
                  onClick={() => setAction(suggested)}
                  className="mt-2 text-xs font-medium text-[var(--series-1)] hover:underline"
                >
                  Use this as the logged action ↓
                </button>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section>
        <SectionHeading eyebrow="Log" title="Log a new intervention" />
        <Card className="p-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="action" className="mb-1 block text-sm font-medium text-[var(--text-primary)]">
                Action
              </label>
              <textarea
                id="action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                rows={2}
                required
                placeholder="Describe the intervention to be taken…"
                className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
              />
            </div>
            <div>
              <label htmlFor="owner" className="mb-1 block text-sm font-medium text-[var(--text-primary)]">
                Owner
              </label>
              <input
                id="owner"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
                placeholder="Name / designation"
                className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
              />
            </div>
            <div>
              <label htmlFor="deadline" className="mb-1 block text-sm font-medium text-[var(--text-primary)]">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
                className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
              />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <button
                type="submit"
                className="rounded-md bg-[var(--series-1)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Log intervention
              </button>
              {submitted && <span className="text-sm text-[var(--status-good)]">Logged — see it in the Resolution Tracker.</span>}
            </div>
          </form>
        </Card>
      </section>

      <section>
        <SectionHeading eyebrow="Log" title="Interventions logged for this project" />
        {projectInterventions.length === 0 ? (
          <EmptyState title="No interventions logged yet" body="Actions logged above will appear here and in the Resolution Tracker." />
        ) : (
          <div className="space-y-2">
            {projectInterventions.map((iv) => (
              <Card key={iv.id} className="p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{iv.action}</p>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      {iv.owner} · Deadline {dateLabel(iv.deadline)} · Logged {dateLabel(iv.loggedDate)}
                    </p>
                    {iv.outcomeNote && <p className="mt-1 text-xs text-[var(--text-muted)]">{iv.outcomeNote}</p>}
                  </div>
                  <InterventionStatusBadge status={iv.status} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function getEscalation(riskBand: string, overdueCount: number) {
  if (riskBand === "High" && overdueCount >= 1) {
    return {
      tone: "critical" as const,
      title: "Recommend Ministry / Secretary-level review",
      body: `This project is High risk with ${overdueCount} overdue intervention${overdueCount > 1 ? "s" : ""}. Standard practice suggests raising visibility beyond the implementing agency.`,
    };
  }
  if (riskBand === "High") {
    return {
      tone: "warning" as const,
      title: "Recommend Zonal / Regional Head review",
      body: "This project is High risk. Close tracking at the regional office level is advisable even though no interventions are currently overdue.",
    };
  }
  if (riskBand === "Medium" && overdueCount >= 1) {
    return {
      tone: "warning" as const,
      title: "Recommend Circle / Divisional Head follow-up",
      body: `${overdueCount} intervention${overdueCount > 1 ? "s are" : " is"} overdue on this Medium-risk project. A follow-up at the divisional level is suggested before it escalates further.`,
    };
  }
  return {
    tone: "good" as const,
    title: "No escalation needed at this time",
    body: "Routine monitoring is sufficient given the current risk band and intervention status. Revisit if the risk score or overdue count changes.",
  };
}
