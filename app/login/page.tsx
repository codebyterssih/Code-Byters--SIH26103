"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter any email and password to continue — this demo does not verify credentials.");
      return;
    }
    login(email.trim());
    router.push("/");
  }

  return (
    <div className="flex min-h-[75vh] flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--series-1)] text-lg font-bold text-white">
              P
            </span>
            <h1 className="text-xl font-semibold text-[var(--text-primary)]">PAIMANA</h1>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Project Risk &amp; Delay Intelligence — demo workspace
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-[var(--border-hairline)] bg-[var(--surface-1)] p-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-[var(--text-primary)]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@ministry.gov.in"
                  autoComplete="username"
                  className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1 block text-sm font-medium text-[var(--text-primary)]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-md border border-[var(--border-hairline)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--series-1)]"
                />
              </div>
              {error && <p className="text-sm text-[var(--status-critical)]">{error}</p>}
              <button
                type="submit"
                className="w-full rounded-md bg-[var(--series-1)] px-3 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
            Demo mode — any email and password combination signs you in. No real authentication or
            user data is involved.
          </p>
        </div>
      </div>
    </div>
  );
}
