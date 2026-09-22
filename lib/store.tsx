"use client";

import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import type { Intervention } from "@/data/types";
import { seedInterventions } from "@/data/interventions";
import { isOverdue } from "@/lib/format";

const AUTH_KEY = "paimana.auth";
const INTERVENTIONS_KEY = "paimana.interventions.v1";

interface AppState {
  authed: boolean;
  authReady: boolean;
  login: (email: string) => void;
  logout: () => void;
  interventions: Intervention[];
  addIntervention: (i: Omit<Intervention, "id" | "status" | "loggedDate">) => Intervention;
  resolveIntervention: (id: string, outcomeNote: string) => void;
}

const AppContext = createContext<AppState | null>(null);

function loadStoredInterventions(): Intervention[] | null {
  try {
    const raw = window.localStorage.getItem(INTERVENTIONS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Intervention[];
  } catch {
    return null;
  }
}

function withComputedStatus(list: Intervention[]): Intervention[] {
  return list.map((iv) =>
    iv.status === "Open" && isOverdue(iv.deadline) ? { ...iv, status: "Overdue" as const } : iv
  );
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [interventions, setInterventions] = useState<Intervention[]>(seedInterventions);

  // One-time hydration from localStorage on mount — this can only run on the
  // client (no window during SSR), so it can't be computed in the initial
  // state and must sync here instead of during render.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let nextAuthed = false;
    try {
      nextAuthed = window.localStorage.getItem(AUTH_KEY) === "1";
    } catch {
      // ignore - storage unavailable
    }
    const stored = loadStoredInterventions();

    setAuthed(nextAuthed);
    setAuthReady(true);
    setInterventions(withComputedStatus(stored ?? seedInterventions));
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  function persistInterventions(list: Intervention[]) {
    setInterventions(list);
    try {
      window.localStorage.setItem(INTERVENTIONS_KEY, JSON.stringify(list));
    } catch {
      // ignore - storage unavailable (private browsing, etc.)
    }
  }

  const value = useMemo<AppState>(
    () => ({
      authed,
      authReady,
      login: (email: string) => {
        try {
          window.localStorage.setItem(AUTH_KEY, "1");
          window.localStorage.setItem("paimana.user", email);
        } catch {
          // ignore
        }
        setAuthed(true);
      },
      logout: () => {
        try {
          window.localStorage.removeItem(AUTH_KEY);
        } catch {
          // ignore
        }
        setAuthed(false);
      },
      interventions,
      addIntervention: (i) => {
        const newIv: Intervention = {
          ...i,
          id: `iv-${Date.now()}`,
          status: "Open",
          loggedDate: new Date().toISOString().slice(0, 10),
        };
        persistInterventions(withComputedStatus([newIv, ...interventions]));
        return newIv;
      },
      resolveIntervention: (id, outcomeNote) => {
        persistInterventions(
          interventions.map((iv) => (iv.id === id ? { ...iv, status: "Resolved", outcomeNote } : iv))
        );
      },
    }),
    [authed, authReady, interventions]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
