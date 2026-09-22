"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppState } from "@/lib/store";

// Client-side gate only — there is no backend/session to enforce this
// server-side. It exists to give the login flow a realistic feel in the
// demo, not to act as real access control.
export function AuthGate({ children }: { children: React.ReactNode }) {
  const { authed, authReady } = useAppState();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!authReady) return;
    if (!authed && pathname !== "/login") {
      router.replace("/login");
    }
  }, [authed, authReady, pathname, router]);

  if (pathname === "/login") return <>{children}</>;

  if (!authReady || !authed) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-sm text-[var(--text-muted)]">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
