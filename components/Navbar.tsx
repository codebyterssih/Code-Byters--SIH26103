"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "@/lib/store";

const links = [
  { href: "/", label: "Command Center" },
  { href: "/tracker", label: "Resolution Tracker" },
  { href: "/memory", label: "Institutional Memory" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { authed, logout } = useAppState();

  if (pathname === "/login") return null;

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--surface-1)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[var(--series-1)] text-white text-sm font-bold">
            P
          </span>
          <span className="hidden sm:inline">PAIMANA</span>
        </Link>
        <nav className="flex flex-1 items-center gap-1 overflow-x-auto">
          {links.map((l) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[var(--series-1)]/10 text-[var(--series-1)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-2)] hover:text-[var(--text-primary)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
        {authed && (
          <button
            onClick={() => {
              logout();
              router.push("/login");
            }}
            className="whitespace-nowrap rounded-md border border-[var(--border-hairline)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]"
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}
