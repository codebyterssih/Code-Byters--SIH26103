"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/lib/store";

export function ProjectTabs({ projectId }: { projectId: string }) {
  const pathname = usePathname();
  const { interventions } = useAppState();
  const hasResolved = interventions.some((iv) => iv.projectId === projectId && iv.status === "Resolved");

  const tabs = [
    { href: `/project/${projectId}`, label: "Overview" },
    { href: `/project/${projectId}/dependencies`, label: "Dependencies" },
    { href: `/simulate/${projectId}`, label: "What-If Simulation" },
    { href: `/project/${projectId}/intervene`, label: "Intervention Plan" },
    ...(hasResolved ? [{ href: `/project/${projectId}/outcome`, label: "Outcome" }] : []),
  ];

  return (
    <nav className="flex flex-wrap gap-1 border-b border-[var(--border-hairline)]">
      {tabs.map((t) => {
        const active = pathname === t.href;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`-mb-px whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium ${
              active
                ? "border-[var(--series-1)] text-[var(--series-1)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
