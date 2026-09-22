export type RiskBand = "Low" | "Medium" | "High";
export type Confidence = "Low" | "Medium" | "High";

export interface Driver {
  factor: string;
  impact: number; // e.g. +27, -6
}

export interface HistoryPoint {
  month: string; // "2025-01"
  physicalProgress: number;
  financialProgress: number;
}

export interface Dependency {
  projectId: string;
  reason: string; // "Same agency, same corridor"
  confirmed: boolean;
}

export interface Intervention {
  id: string;
  projectId: string;
  action: string;
  owner: string;
  deadline: string;
  status: "Open" | "Overdue" | "Resolved";
  loggedDate: string;
  outcomeNote?: string;
}

export interface Project {
  id: string;
  name: string;
  sector: string;
  state: string;
  agency: string;
  ministry: string;
  originalCost: number; // in crore
  revisedCost: number;
  expenditure: number;
  physicalProgress: number; // %
  financialProgress: number; // %
  startDate: string;
  anticipatedCompletion: string;
  riskScore: number; // 0-100
  riskBand: RiskBand;
  delayProbability: number; // 0-1
  expectedDelayMonths: number;
  expectedCostOverrunPct: number;
  confidence: Confidence;
  drivers: Driver[];
  delayDNA: string; // "Funding-Starved Delay", "Early Stall", "Steady Creep", "Late Cliff"
  delayDNADescription: string;
  similarProjectIds: string[];
  dependencies: Dependency[];
  bottleneckAgency: string;
  bottleneckNote: string;
  history: HistoryPoint[];
  lastUpdated: string;
}
