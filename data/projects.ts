import type { Project } from "./types";

// Synthetic demonstration dataset. Not sourced from MoSPI, PAIMANA, or any
// government monitoring system. All project names, figures, and narratives
// below are illustrative and generated for demo purposes only.
export const projects: Project[] = [
  {
    "id": "trn-01",
    "name": "Delhi-Meerut Expressway Widening Phase II",
    "sector": "Transport & Logistics",
    "state": "Uttar Pradesh",
    "agency": "National Highways Authority of India (NHAI)",
    "ministry": "Ministry of Road Transport & Highways",
    "originalCost": 1840,
    "revisedCost": 2260,
    "expenditure": 1604.6,
    "physicalProgress": 52,
    "financialProgress": 74,
    "startDate": "2024-03-01",
    "anticipatedCompletion": "2027-03-01",
    "riskScore": 78,
    "riskBand": "High",
    "delayProbability": 0.74,
    "expectedDelayMonths": 14,
    "expectedCostOverrunPct": 22.8,
    "confidence": "High",
    "drivers": [
      {
        "factor": "Expenditure-physical progress imbalance",
        "impact": 26
      },
      {
        "factor": "Land acquisition delay",
        "impact": 20
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 18
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 9
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -6
      },
      {
        "factor": "Litigation / right-of-way dispute",
        "impact": 11
      }
    ],
    "delayDNA": "Funding-Starved Delay",
    "delayDNADescription": "Physical progress consistently outpaces fund disbursement, indicating the project is being slowed by delayed or inadequate release of sanctioned funds rather than execution capacity.",
    "similarProjectIds": [
      "pwr-01",
      "wtr-01"
    ],
    "dependencies": [
      {
        "projectId": "trn-02",
        "reason": "Shared land parcel corridor with adjoining widening package",
        "confirmed": true
      }
    ],
    "bottleneckAgency": "UP State Land Revenue Department",
    "bottleneckNote": "Compensation disbursal for 4 remaining village stretches has been pending for over 5 months, blocking contractor mobilisation on those chainages.",
    "history": [
      {
        "month": "2026-01",
        "physicalProgress": 19,
        "financialProgress": 31
      },
      {
        "month": "2026-02",
        "physicalProgress": 21.3,
        "financialProgress": 38.3
      },
      {
        "month": "2026-03",
        "physicalProgress": 26.5,
        "financialProgress": 44.5
      },
      {
        "month": "2026-04",
        "physicalProgress": 31.8,
        "financialProgress": 47.8
      },
      {
        "month": "2026-05",
        "physicalProgress": 33,
        "financialProgress": 52
      },
      {
        "month": "2026-06",
        "physicalProgress": 39.3,
        "financialProgress": 59.3
      },
      {
        "month": "2026-07",
        "physicalProgress": 44.5,
        "financialProgress": 62.5
      },
      {
        "month": "2026-08",
        "physicalProgress": 46.8,
        "financialProgress": 69.8
      },
      {
        "month": "2026-09",
        "physicalProgress": 52,
        "financialProgress": 76
      }
    ],
    "lastUpdated": "2026-09-03"
  },
  {
    "id": "trn-02",
    "name": "Chennai-Bengaluru Industrial Corridor Link Road",
    "sector": "Transport & Logistics",
    "state": "Tamil Nadu",
    "agency": "National Highways Authority of India (NHAI)",
    "ministry": "Ministry of Road Transport & Highways",
    "originalCost": 960,
    "revisedCost": 1050,
    "expenditure": 640.5,
    "physicalProgress": 58,
    "financialProgress": 60,
    "startDate": "2025-01-01",
    "anticipatedCompletion": "2027-07-01",
    "riskScore": 52,
    "riskBand": "Medium",
    "delayProbability": 0.44,
    "expectedDelayMonths": 5,
    "expectedCostOverrunPct": 9.4,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 32
      },
      {
        "factor": "Steady but below-target execution pace",
        "impact": 14
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 9
      },
      {
        "factor": "Monsoon/seasonal execution disruption",
        "impact": 8
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -6
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -5
      }
    ],
    "delayDNA": "Steady Creep",
    "delayDNADescription": "Progress has advanced steadily but persistently trails the sanctioned schedule by a near-constant margin, indicating a structural execution pace issue rather than a single blocking event.",
    "similarProjectIds": [
      "pwr-02",
      "wtr-03",
      "tel-03"
    ],
    "dependencies": [
      {
        "projectId": "trn-01",
        "reason": "Shared land parcel corridor with adjoining widening package",
        "confirmed": true
      }
    ],
    "bottleneckAgency": "Tamil Nadu Highways Department",
    "bottleneckNote": "Joint inspection sign-off for two overbridge sections has been queued for six weeks, delaying superstructure work release.",
    "history": [
      {
        "month": "2026-02",
        "physicalProgress": 23,
        "financialProgress": 22
      },
      {
        "month": "2026-03",
        "physicalProgress": 29.9,
        "financialProgress": 28.4
      },
      {
        "month": "2026-04",
        "physicalProgress": 33.7,
        "financialProgress": 31.9
      },
      {
        "month": "2026-05",
        "physicalProgress": 37.6,
        "financialProgress": 40.3
      },
      {
        "month": "2026-06",
        "physicalProgress": 44.4,
        "financialProgress": 42.7
      },
      {
        "month": "2026-07",
        "physicalProgress": 48.3,
        "financialProgress": 49.1
      },
      {
        "month": "2026-08",
        "physicalProgress": 52.1,
        "financialProgress": 54.6
      },
      {
        "month": "2026-09",
        "physicalProgress": 59,
        "financialProgress": 61
      }
    ],
    "lastUpdated": "2026-09-04"
  },
  {
    "id": "trn-03",
    "name": "Mumbai Coastal Road Northern Extension",
    "sector": "Transport & Logistics",
    "state": "Maharashtra",
    "agency": "Mumbai Metropolitan Region Development Authority",
    "ministry": "Ministry of Road Transport & Highways",
    "originalCost": 1420,
    "revisedCost": 1420,
    "expenditure": 1121.8,
    "physicalProgress": 81,
    "financialProgress": 79,
    "startDate": "2024-11-01",
    "anticipatedCompletion": "2027-01-01",
    "riskScore": 24,
    "riskBand": "Low",
    "delayProbability": 0.13,
    "expectedDelayMonths": 1,
    "expectedCostOverrunPct": 1.2,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Historical sector delay pattern",
        "impact": 38
      },
      {
        "factor": "Marine construction weather window constraint",
        "impact": 9
      },
      {
        "factor": "Strong recent physical progress momentum",
        "impact": -8
      },
      {
        "factor": "Consistent financial-physical alignment",
        "impact": -6
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -5
      },
      {
        "factor": "Dedicated nodal officer engagement",
        "impact": -4
      }
    ],
    "delayDNA": "Late Cliff",
    "delayDNADescription": "Progress has tracked close to schedule through most of the project, but similar projects in this cluster show sharp slippage in the final quarter, typically around testing, commissioning, or handover stages.",
    "similarProjectIds": [
      "pwr-03",
      "rail-03"
    ],
    "dependencies": [],
    "bottleneckAgency": "Maharashtra Coastal Zone Management Authority",
    "bottleneckNote": "Final CRZ clearance amendment for the interchange ramp is under review; low current impact but a known trigger for late-stage slippage in comparable coastal works.",
    "history": [
      {
        "month": "2026-03",
        "physicalProgress": 53,
        "financialProgress": 47
      },
      {
        "month": "2026-04",
        "physicalProgress": 55.8,
        "financialProgress": 54.2
      },
      {
        "month": "2026-05",
        "physicalProgress": 61.7,
        "financialProgress": 60.3
      },
      {
        "month": "2026-06",
        "physicalProgress": 67.5,
        "financialProgress": 63.5
      },
      {
        "month": "2026-07",
        "physicalProgress": 69.3,
        "financialProgress": 67.7
      },
      {
        "month": "2026-08",
        "physicalProgress": 76.2,
        "financialProgress": 74.8
      },
      {
        "month": "2026-09",
        "physicalProgress": 82,
        "financialProgress": 78
      }
    ],
    "lastUpdated": "2026-09-05"
  },
  {
    "id": "pwr-01",
    "name": "Talcher Super Thermal Power Expansion (Stage III)",
    "sector": "Power",
    "state": "Odisha",
    "agency": "NTPC Limited",
    "ministry": "Ministry of Power",
    "originalCost": 5200,
    "revisedCost": 6640,
    "expenditure": 4515.2,
    "physicalProgress": 47,
    "financialProgress": 66,
    "startDate": "2023-11-01",
    "anticipatedCompletion": "2027-05-01",
    "riskScore": 82,
    "riskBand": "High",
    "delayProbability": 0.79,
    "expectedDelayMonths": 18,
    "expectedCostOverrunPct": 27.7,
    "confidence": "High",
    "drivers": [
      {
        "factor": "Expenditure-physical progress imbalance",
        "impact": 27
      },
      {
        "factor": "Equipment supply chain delay",
        "impact": 19
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 17
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 11
      },
      {
        "factor": "Pending statutory/environmental clearance",
        "impact": 10
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -4
      }
    ],
    "delayDNA": "Funding-Starved Delay",
    "delayDNADescription": "Physical progress consistently outpaces fund disbursement, indicating the project is being slowed by delayed or inadequate release of sanctioned funds rather than execution capacity.",
    "similarProjectIds": [
      "trn-01",
      "coal-01"
    ],
    "dependencies": [
      {
        "projectId": "coal-01",
        "reason": "Coal linkage and rail evacuation feed this plant's fuel supply",
        "confirmed": true
      }
    ],
    "bottleneckAgency": "Boiler & Turbine OEM Consortium",
    "bottleneckNote": "Critical path boiler components are delayed at the fabrication yard; revised delivery pushes commissioning readiness by at least a year.",
    "history": [
      {
        "month": "2025-12",
        "physicalProgress": 13,
        "financialProgress": 26
      },
      {
        "month": "2026-01",
        "physicalProgress": 18.7,
        "financialProgress": 31.4
      },
      {
        "month": "2026-02",
        "physicalProgress": 21.3,
        "financialProgress": 33.9
      },
      {
        "month": "2026-03",
        "physicalProgress": 24,
        "financialProgress": 41.3
      },
      {
        "month": "2026-04",
        "physicalProgress": 29.7,
        "financialProgress": 42.8
      },
      {
        "month": "2026-05",
        "physicalProgress": 32.3,
        "financialProgress": 48.2
      },
      {
        "month": "2026-06",
        "physicalProgress": 35,
        "financialProgress": 52.7
      },
      {
        "month": "2026-07",
        "physicalProgress": 40.7,
        "financialProgress": 58.1
      },
      {
        "month": "2026-08",
        "physicalProgress": 43.3,
        "financialProgress": 60.6
      },
      {
        "month": "2026-09",
        "physicalProgress": 46,
        "financialProgress": 68
      }
    ],
    "lastUpdated": "2026-09-06"
  },
  {
    "id": "pwr-02",
    "name": "Rewa Ultra Mega Solar Park Grid Integration",
    "sector": "Power",
    "state": "Madhya Pradesh",
    "agency": "PowerGrid Corporation of India",
    "ministry": "Ministry of Power",
    "originalCost": 780,
    "revisedCost": 860,
    "expenditure": 541.8,
    "physicalProgress": 61,
    "financialProgress": 64,
    "startDate": "2025-05-01",
    "anticipatedCompletion": "2027-04-01",
    "riskScore": 47,
    "riskBand": "Medium",
    "delayProbability": 0.38,
    "expectedDelayMonths": 4,
    "expectedCostOverrunPct": 8.1,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 25
      },
      {
        "factor": "Steady but below-target execution pace",
        "impact": 13
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 9
      },
      {
        "factor": "Transmission tower right-of-way constraint",
        "impact": 9
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -5
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -4
      }
    ],
    "delayDNA": "Steady Creep",
    "delayDNADescription": "Progress has advanced steadily but persistently trails the sanctioned schedule by a near-constant margin, indicating a structural execution pace issue rather than a single blocking event.",
    "similarProjectIds": [
      "trn-02",
      "tel-03"
    ],
    "dependencies": [
      {
        "projectId": "pwr-03",
        "reason": "Shares grid substation upgrade with adjacent transmission strengthening works",
        "confirmed": false
      }
    ],
    "bottleneckAgency": "State Electricity Distribution Company",
    "bottleneckNote": "Way-leave permissions for 12 tower locations on private agricultural land are still pending farmer consent.",
    "history": [
      {
        "month": "2026-02",
        "physicalProgress": 27,
        "financialProgress": 23
      },
      {
        "month": "2026-03",
        "physicalProgress": 30,
        "financialProgress": 30.7
      },
      {
        "month": "2026-04",
        "physicalProgress": 36,
        "financialProgress": 37.4
      },
      {
        "month": "2026-05",
        "physicalProgress": 42,
        "financialProgress": 41.1
      },
      {
        "month": "2026-06",
        "physicalProgress": 44,
        "financialProgress": 45.9
      },
      {
        "month": "2026-07",
        "physicalProgress": 51,
        "financialProgress": 53.6
      },
      {
        "month": "2026-08",
        "physicalProgress": 57,
        "financialProgress": 57.3
      },
      {
        "month": "2026-09",
        "physicalProgress": 60,
        "financialProgress": 65
      }
    ],
    "lastUpdated": "2026-09-07"
  },
  {
    "id": "pwr-03",
    "name": "Eastern Region Transmission Strengthening Scheme",
    "sector": "Power",
    "state": "West Bengal",
    "agency": "PowerGrid Corporation of India",
    "ministry": "Ministry of Power",
    "originalCost": 640,
    "revisedCost": 655,
    "expenditure": 543.7,
    "physicalProgress": 86,
    "financialProgress": 84,
    "startDate": "2024-09-01",
    "anticipatedCompletion": "2026-12-01",
    "riskScore": 21,
    "riskBand": "Low",
    "delayProbability": 0.1,
    "expectedDelayMonths": 1,
    "expectedCostOverrunPct": 1.8,
    "confidence": "Low",
    "drivers": [
      {
        "factor": "Historical sector delay pattern",
        "impact": 22
      },
      {
        "factor": "Commissioning & testing dependency on grid shutdown window",
        "impact": 9
      },
      {
        "factor": "Strong recent physical progress momentum",
        "impact": -7
      },
      {
        "factor": "Consistent financial-physical alignment",
        "impact": -5
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -4
      },
      {
        "factor": "Sparse recent field reporting",
        "impact": 6
      }
    ],
    "delayDNA": "Late Cliff",
    "delayDNADescription": "Progress has tracked close to schedule through most of the project, but similar projects in this cluster show sharp slippage in the final quarter, typically around testing, commissioning, or handover stages.",
    "similarProjectIds": [
      "trn-03",
      "rail-03"
    ],
    "dependencies": [
      {
        "projectId": "pwr-02",
        "reason": "Shares grid substation upgrade with adjacent transmission strengthening works",
        "confirmed": false
      }
    ],
    "bottleneckAgency": "Regional Load Despatch Centre",
    "bottleneckNote": "Final line charging requires a coordinated grid shutdown window that has been rescheduled twice; reporting cadence from the field has thinned in recent months.",
    "history": [
      {
        "month": "2025-12",
        "physicalProgress": 67,
        "financialProgress": 64
      },
      {
        "month": "2026-01",
        "physicalProgress": 75,
        "financialProgress": 71.7
      },
      {
        "month": "2026-02",
        "physicalProgress": 80,
        "financialProgress": 76.3
      },
      {
        "month": "2026-03",
        "physicalProgress": 85,
        "financialProgress": 86
      }
    ],
    "lastUpdated": "2026-03-17"
  },
  {
    "id": "rail-01",
    "name": "Kharagpur-Adra Rail Line Doubling",
    "sector": "Railways",
    "state": "West Bengal",
    "agency": "Rail Vikas Nigam Limited (RVNL)",
    "ministry": "Ministry of Railways",
    "originalCost": 1120,
    "revisedCost": 1240,
    "expenditure": 682,
    "physicalProgress": 39,
    "financialProgress": 49,
    "startDate": "2025-03-01",
    "anticipatedCompletion": "2027-06-01",
    "riskScore": 58,
    "riskBand": "Medium",
    "delayProbability": 0.5,
    "expectedDelayMonths": 6,
    "expectedCostOverrunPct": 10.7,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Low physical progress vs elapsed time",
        "impact": 18
      },
      {
        "factor": "Land acquisition delay",
        "impact": 16
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 14
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 10
      },
      {
        "factor": "Agency capacity constraint",
        "impact": 6
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -6
      }
    ],
    "delayDNA": "Early Stall",
    "delayDNADescription": "Progress stalled within the first third of the project timeline, typically tied to land handover, approvals, or mobilisation delays, with limited recovery since.",
    "similarProjectIds": [
      "tel-01",
      "coal-02"
    ],
    "dependencies": [],
    "bottleneckAgency": "West Bengal Land & Land Reforms Department",
    "bottleneckNote": "Mobilisation on 3 of 9 sections has not started as land handover certificates remain unissued since project inception.",
    "history": [
      {
        "month": "2026-03",
        "physicalProgress": 9,
        "financialProgress": 13
      },
      {
        "month": "2026-04",
        "physicalProgress": 12.2,
        "financialProgress": 20.8
      },
      {
        "month": "2026-05",
        "physicalProgress": 18.3,
        "financialProgress": 27.7
      },
      {
        "month": "2026-06",
        "physicalProgress": 24.5,
        "financialProgress": 31.5
      },
      {
        "month": "2026-07",
        "physicalProgress": 26.7,
        "financialProgress": 36.3
      },
      {
        "month": "2026-08",
        "physicalProgress": 33.8,
        "financialProgress": 44.2
      },
      {
        "month": "2026-09",
        "physicalProgress": 40,
        "financialProgress": 48
      }
    ],
    "lastUpdated": "2026-09-09"
  },
  {
    "id": "rail-02",
    "name": "Delhi-Howrah High Speed Corridor Enabling Works",
    "sector": "Railways",
    "state": "Bihar",
    "agency": "Rail Vikas Nigam Limited (RVNL)",
    "ministry": "Ministry of Railways",
    "originalCost": 3100,
    "revisedCost": 3960,
    "expenditure": 2772,
    "physicalProgress": 44,
    "financialProgress": 69,
    "startDate": "2024-01-01",
    "anticipatedCompletion": "2027-09-01",
    "riskScore": 80,
    "riskBand": "High",
    "delayProbability": 0.77,
    "expectedDelayMonths": 16,
    "expectedCostOverrunPct": 27.7,
    "confidence": "High",
    "drivers": [
      {
        "factor": "Expenditure-physical progress imbalance",
        "impact": 28
      },
      {
        "factor": "Land acquisition delay",
        "impact": 19
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 16
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 10
      },
      {
        "factor": "Dependency project slippage",
        "impact": 9
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -2
      }
    ],
    "delayDNA": "Funding-Starved Delay",
    "delayDNADescription": "Physical progress consistently outpaces fund disbursement, indicating the project is being slowed by delayed or inadequate release of sanctioned funds rather than execution capacity.",
    "similarProjectIds": [
      "trn-01",
      "wtr-01"
    ],
    "dependencies": [
      {
        "projectId": "rail-01",
        "reason": "Shares signalling contractor mobilisation schedule",
        "confirmed": false
      }
    ],
    "bottleneckAgency": "Bihar State Land Acquisition Cell",
    "bottleneckNote": "Award finalisation for 2 districts has been stuck at the compensation-objection stage for over 8 months, holding up embankment works.",
    "history": [
      {
        "month": "2025-12",
        "physicalProgress": 9,
        "financialProgress": 24
      },
      {
        "month": "2026-01",
        "physicalProgress": 14.8,
        "financialProgress": 30
      },
      {
        "month": "2026-02",
        "physicalProgress": 17.6,
        "financialProgress": 33
      },
      {
        "month": "2026-03",
        "physicalProgress": 20.3,
        "financialProgress": 41
      },
      {
        "month": "2026-04",
        "physicalProgress": 26.1,
        "financialProgress": 43
      },
      {
        "month": "2026-05",
        "physicalProgress": 28.9,
        "financialProgress": 49
      },
      {
        "month": "2026-06",
        "physicalProgress": 31.7,
        "financialProgress": 54
      },
      {
        "month": "2026-07",
        "physicalProgress": 37.4,
        "financialProgress": 60
      },
      {
        "month": "2026-08",
        "physicalProgress": 40.2,
        "financialProgress": 63
      },
      {
        "month": "2026-09",
        "physicalProgress": 43,
        "financialProgress": 71
      }
    ],
    "lastUpdated": "2026-09-10"
  },
  {
    "id": "rail-03",
    "name": "Konkan Railway Electrification Phase III",
    "sector": "Railways",
    "state": "Karnataka",
    "agency": "Konkan Railway Corporation Limited",
    "ministry": "Ministry of Railways",
    "originalCost": 410,
    "revisedCost": 415,
    "expenditure": 352.8,
    "physicalProgress": 88,
    "financialProgress": 85,
    "startDate": "2025-01-01",
    "anticipatedCompletion": "2026-11-01",
    "riskScore": 18,
    "riskBand": "Low",
    "delayProbability": 0.08,
    "expectedDelayMonths": 0,
    "expectedCostOverrunPct": 0.9,
    "confidence": "Low",
    "drivers": [
      {
        "factor": "Historical sector delay pattern",
        "impact": 19
      },
      {
        "factor": "Overhead traction commissioning block dependency",
        "impact": 8
      },
      {
        "factor": "Strong recent physical progress momentum",
        "impact": -7
      },
      {
        "factor": "Consistent financial-physical alignment",
        "impact": -6
      },
      {
        "factor": "Sparse recent field reporting",
        "impact": 7
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -3
      }
    ],
    "delayDNA": "Late Cliff",
    "delayDNADescription": "Progress has tracked close to schedule through most of the project, but similar projects in this cluster show sharp slippage in the final quarter, typically around testing, commissioning, or handover stages.",
    "similarProjectIds": [
      "trn-03",
      "pwr-03"
    ],
    "dependencies": [],
    "bottleneckAgency": "Zonal Railway Operations Control",
    "bottleneckNote": "Remaining traction commissioning blocks depend on line-block windows that compete with regular traffic scheduling; field updates have been infrequent since the last quarter.",
    "history": [
      {
        "month": "2025-12",
        "physicalProgress": 71,
        "financialProgress": 65
      },
      {
        "month": "2026-01",
        "physicalProgress": 75,
        "financialProgress": 73.3
      },
      {
        "month": "2026-02",
        "physicalProgress": 82,
        "financialProgress": 80.7
      },
      {
        "month": "2026-03",
        "physicalProgress": 89,
        "financialProgress": 85
      }
    ],
    "lastUpdated": "2026-03-20"
  },
  {
    "id": "wtr-01",
    "name": "Polavaram Irrigation Project Canal Network",
    "sector": "Water Resources",
    "state": "Andhra Pradesh",
    "agency": "Central Water Commission",
    "ministry": "Ministry of Jal Shakti",
    "originalCost": 4200,
    "revisedCost": 5730,
    "expenditure": 3781.8,
    "physicalProgress": 41,
    "financialProgress": 63,
    "startDate": "2023-05-01",
    "anticipatedCompletion": "2027-07-01",
    "riskScore": 85,
    "riskBand": "High",
    "delayProbability": 0.81,
    "expectedDelayMonths": 20,
    "expectedCostOverrunPct": 36.4,
    "confidence": "High",
    "drivers": [
      {
        "factor": "Expenditure-physical progress imbalance",
        "impact": 27
      },
      {
        "factor": "Land acquisition delay",
        "impact": 21
      },
      {
        "factor": "Rehabilitation & resettlement dispute",
        "impact": 16
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 12
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 12
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -3
      }
    ],
    "delayDNA": "Funding-Starved Delay",
    "delayDNADescription": "Physical progress consistently outpaces fund disbursement, indicating the project is being slowed by delayed or inadequate release of sanctioned funds rather than execution capacity.",
    "similarProjectIds": [
      "trn-01",
      "rail-02"
    ],
    "dependencies": [],
    "bottleneckAgency": "State Rehabilitation & Resettlement Authority",
    "bottleneckNote": "Resettlement package disputes across 14 affected villages remain unresolved, halting canal alignment work in the lower reaches.",
    "history": [
      {
        "month": "2025-11",
        "physicalProgress": 11,
        "financialProgress": 22
      },
      {
        "month": "2025-12",
        "physicalProgress": 15.9,
        "financialProgress": 27.1
      },
      {
        "month": "2026-01",
        "physicalProgress": 17.8,
        "financialProgress": 29.2
      },
      {
        "month": "2026-02",
        "physicalProgress": 19.7,
        "financialProgress": 36.3
      },
      {
        "month": "2026-03",
        "physicalProgress": 24.6,
        "financialProgress": 37.4
      },
      {
        "month": "2026-04",
        "physicalProgress": 26.5,
        "financialProgress": 42.5
      },
      {
        "month": "2026-05",
        "physicalProgress": 28.4,
        "financialProgress": 46.6
      },
      {
        "month": "2026-06",
        "physicalProgress": 33.3,
        "financialProgress": 51.7
      },
      {
        "month": "2026-07",
        "physicalProgress": 35.2,
        "financialProgress": 53.8
      },
      {
        "month": "2026-08",
        "physicalProgress": 37.1,
        "financialProgress": 60.9
      },
      {
        "month": "2026-09",
        "physicalProgress": 42,
        "financialProgress": 62
      }
    ],
    "lastUpdated": "2026-09-12"
  },
  {
    "id": "wtr-02",
    "name": "Ken-Betwa Link Canal Phase I",
    "sector": "Water Resources",
    "state": "Madhya Pradesh",
    "agency": "National Water Development Agency",
    "ministry": "Ministry of Jal Shakti",
    "originalCost": 2100,
    "revisedCost": 2380,
    "expenditure": 833,
    "physicalProgress": 22,
    "financialProgress": 34,
    "startDate": "2025-07-01",
    "anticipatedCompletion": "2027-11-01",
    "riskScore": 74,
    "riskBand": "High",
    "delayProbability": 0.69,
    "expectedDelayMonths": 12,
    "expectedCostOverrunPct": 13.3,
    "confidence": "High",
    "drivers": [
      {
        "factor": "Low physical progress vs elapsed time",
        "impact": 22
      },
      {
        "factor": "Pending statutory/environmental clearance",
        "impact": 19
      },
      {
        "factor": "Forest & wildlife clearance dependency",
        "impact": 16
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 11
      },
      {
        "factor": "Agency capacity constraint",
        "impact": 8
      },
      {
        "factor": "Dedicated nodal officer engagement",
        "impact": -2
      }
    ],
    "delayDNA": "Early Stall",
    "delayDNADescription": "Progress stalled within the first third of the project timeline, typically tied to land handover, approvals, or mobilisation delays, with limited recovery since.",
    "similarProjectIds": [
      "tel-01",
      "coal-02"
    ],
    "dependencies": [],
    "bottleneckAgency": "National Tiger Conservation Authority",
    "bottleneckNote": "Wildlife clearance for the submergence zone remains sub judice, preventing mobilisation on the tunnel and canal head-works.",
    "history": [
      {
        "month": "2026-04",
        "physicalProgress": 5,
        "financialProgress": 9
      },
      {
        "month": "2026-05",
        "physicalProgress": 6.6,
        "financialProgress": 15.8
      },
      {
        "month": "2026-06",
        "physicalProgress": 11.2,
        "financialProgress": 21.6
      },
      {
        "month": "2026-07",
        "physicalProgress": 15.8,
        "financialProgress": 24.4
      },
      {
        "month": "2026-08",
        "physicalProgress": 16.4,
        "financialProgress": 28.2
      },
      {
        "month": "2026-09",
        "physicalProgress": 22,
        "financialProgress": 35
      }
    ],
    "lastUpdated": "2026-09-13"
  },
  {
    "id": "wtr-03",
    "name": "Renuka Multipurpose Dam Project",
    "sector": "Water Resources",
    "state": "Himachal Pradesh",
    "agency": "Himachal Pradesh Power Corporation Limited",
    "ministry": "Ministry of Jal Shakti",
    "originalCost": 690,
    "revisedCost": 745,
    "expenditure": 424.7,
    "physicalProgress": 49,
    "financialProgress": 55,
    "startDate": "2025-03-01",
    "anticipatedCompletion": "2027-05-01",
    "riskScore": 55,
    "riskBand": "Medium",
    "delayProbability": 0.47,
    "expectedDelayMonths": 6,
    "expectedCostOverrunPct": 8,
    "confidence": "Low",
    "drivers": [
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 16
      },
      {
        "factor": "Steady but below-target execution pace",
        "impact": 13
      },
      {
        "factor": "Inter-state water sharing coordination",
        "impact": 11
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 9
      },
      {
        "factor": "Sparse recent field reporting",
        "impact": 8
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -2
      }
    ],
    "delayDNA": "Steady Creep",
    "delayDNADescription": "Progress has advanced steadily but persistently trails the sanctioned schedule by a near-constant margin, indicating a structural execution pace issue rather than a single blocking event.",
    "similarProjectIds": [
      "trn-02",
      "pwr-02"
    ],
    "dependencies": [
      {
        "projectId": "wtr-01",
        "reason": "Same basin authority and shared inter-state water release protocol",
        "confirmed": false
      }
    ],
    "bottleneckAgency": "Inter-State Water Dispute Coordination Cell",
    "bottleneckNote": "Quarterly progress reporting from site has been irregular since the monsoon season, limiting field verification of the claimed progress figures.",
    "history": [
      {
        "month": "2025-11",
        "physicalProgress": 25,
        "financialProgress": 30
      },
      {
        "month": "2025-12",
        "physicalProgress": 32.8,
        "financialProgress": 37.3
      },
      {
        "month": "2026-01",
        "physicalProgress": 37.5,
        "financialProgress": 41.5
      },
      {
        "month": "2026-02",
        "physicalProgress": 42.3,
        "financialProgress": 50.8
      },
      {
        "month": "2026-03",
        "physicalProgress": 50,
        "financialProgress": 54
      }
    ],
    "lastUpdated": "2026-03-23"
  },
  {
    "id": "tel-01",
    "name": "BharatNet Phase III Odisha Rural Connectivity",
    "sector": "Telecommunications",
    "state": "Odisha",
    "agency": "Bharat Broadband Network Limited (BBNL)",
    "ministry": "Ministry of Communications",
    "originalCost": 540,
    "revisedCost": 585,
    "expenditure": 245.7,
    "physicalProgress": 33,
    "financialProgress": 40,
    "startDate": "2025-09-01",
    "anticipatedCompletion": "2027-05-01",
    "riskScore": 49,
    "riskBand": "Medium",
    "delayProbability": 0.4,
    "expectedDelayMonths": 5,
    "expectedCostOverrunPct": 7.5,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Low physical progress vs elapsed time",
        "impact": 17
      },
      {
        "factor": "Right-of-way permission delay across gram panchayats",
        "impact": 14
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 9
      },
      {
        "factor": "Agency capacity constraint",
        "impact": 8
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 6
      },
      {
        "factor": "Dedicated nodal officer engagement",
        "impact": -5
      }
    ],
    "delayDNA": "Early Stall",
    "delayDNADescription": "Progress stalled within the first third of the project timeline, typically tied to land handover, approvals, or mobilisation delays, with limited recovery since.",
    "similarProjectIds": [
      "rail-01",
      "wtr-02"
    ],
    "dependencies": [],
    "bottleneckAgency": "State Panchayati Raj Department",
    "bottleneckNote": "Trenching permissions across 60+ gram panchayats are being cleared individually, with no single-window approval in place yet.",
    "history": [
      {
        "month": "2026-04",
        "physicalProgress": 7,
        "financialProgress": 11
      },
      {
        "month": "2026-05",
        "physicalProgress": 10.4,
        "financialProgress": 18.6
      },
      {
        "month": "2026-06",
        "physicalProgress": 16.8,
        "financialProgress": 25.2
      },
      {
        "month": "2026-07",
        "physicalProgress": 23.2,
        "financialProgress": 28.8
      },
      {
        "month": "2026-08",
        "physicalProgress": 25.6,
        "financialProgress": 33.4
      },
      {
        "month": "2026-09",
        "physicalProgress": 33,
        "financialProgress": 41
      }
    ],
    "lastUpdated": "2026-09-15"
  },
  {
    "id": "tel-02",
    "name": "North-East Optical Fibre Backbone Upgrade",
    "sector": "Telecommunications",
    "state": "Assam",
    "agency": "Bharat Sanchar Nigam Limited (BSNL)",
    "ministry": "Ministry of Communications",
    "originalCost": 380,
    "revisedCost": 384,
    "expenditure": 307.2,
    "physicalProgress": 83,
    "financialProgress": 81,
    "startDate": "2025-05-01",
    "anticipatedCompletion": "2026-12-01",
    "riskScore": 26,
    "riskBand": "Low",
    "delayProbability": 0.14,
    "expectedDelayMonths": 1,
    "expectedCostOverrunPct": 1,
    "confidence": "Low",
    "drivers": [
      {
        "factor": "Historical sector delay pattern",
        "impact": 23
      },
      {
        "factor": "Hill-terrain last-mile laying constraint",
        "impact": 9
      },
      {
        "factor": "Strong recent physical progress momentum",
        "impact": -6
      },
      {
        "factor": "Sparse recent field reporting",
        "impact": 9
      },
      {
        "factor": "Consistent financial-physical alignment",
        "impact": -5
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -4
      }
    ],
    "delayDNA": "Late Cliff",
    "delayDNADescription": "Progress has tracked close to schedule through most of the project, but similar projects in this cluster show sharp slippage in the final quarter, typically around testing, commissioning, or handover stages.",
    "similarProjectIds": [
      "trn-03",
      "coal-03"
    ],
    "dependencies": [],
    "bottleneckAgency": "State Public Works (Roads) Department",
    "bottleneckNote": "Final hill-section splicing work depends on road-cutting permissions that are renewed seasonally; monitoring visits have been sparse this quarter.",
    "history": [
      {
        "month": "2026-01",
        "physicalProgress": 57,
        "financialProgress": 54
      },
      {
        "month": "2026-02",
        "physicalProgress": 67.3,
        "financialProgress": 64
      },
      {
        "month": "2026-03",
        "physicalProgress": 74.7,
        "financialProgress": 71
      },
      {
        "month": "2026-04",
        "physicalProgress": 82,
        "financialProgress": 83
      }
    ],
    "lastUpdated": "2026-04-25"
  },
  {
    "id": "tel-03",
    "name": "Village Wi-Fi Hotspot Rollout - Rajasthan",
    "sector": "Telecommunications",
    "state": "Rajasthan",
    "agency": "Bharat Broadband Network Limited (BBNL)",
    "ministry": "Ministry of Communications",
    "originalCost": 210,
    "revisedCost": 226,
    "expenditure": 131.1,
    "physicalProgress": 56,
    "financialProgress": 58,
    "startDate": "2025-07-01",
    "anticipatedCompletion": "2027-03-01",
    "riskScore": 44,
    "riskBand": "Medium",
    "delayProbability": 0.35,
    "expectedDelayMonths": 4,
    "expectedCostOverrunPct": 7.6,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 23
      },
      {
        "factor": "Steady but below-target execution pace",
        "impact": 12
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 8
      },
      {
        "factor": "Equipment supply chain delay",
        "impact": 8
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -4
      },
      {
        "factor": "Dedicated nodal officer engagement",
        "impact": -3
      }
    ],
    "delayDNA": "Steady Creep",
    "delayDNADescription": "Progress has advanced steadily but persistently trails the sanctioned schedule by a near-constant margin, indicating a structural execution pace issue rather than a single blocking event.",
    "similarProjectIds": [
      "trn-02",
      "pwr-02"
    ],
    "dependencies": [
      {
        "projectId": "tel-01",
        "reason": "Shared BBNL rollout vendor and equipment procurement batch",
        "confirmed": true
      }
    ],
    "bottleneckAgency": "State IT & Communications Department",
    "bottleneckNote": "Solar power unit procurement for off-grid hotspot sites is running behind the vendor's committed delivery schedule.",
    "history": [
      {
        "month": "2026-03",
        "physicalProgress": 21,
        "financialProgress": 21
      },
      {
        "month": "2026-04",
        "physicalProgress": 25,
        "financialProgress": 29
      },
      {
        "month": "2026-05",
        "physicalProgress": 32,
        "financialProgress": 36
      },
      {
        "month": "2026-06",
        "physicalProgress": 39,
        "financialProgress": 40
      },
      {
        "month": "2026-07",
        "physicalProgress": 42,
        "financialProgress": 45
      },
      {
        "month": "2026-08",
        "physicalProgress": 50,
        "financialProgress": 53
      },
      {
        "month": "2026-09",
        "physicalProgress": 57,
        "financialProgress": 57
      }
    ],
    "lastUpdated": "2026-09-17"
  },
  {
    "id": "coal-01",
    "name": "Talcher Coalfields Rail Evacuation Corridor",
    "sector": "Coal",
    "state": "Odisha",
    "agency": "Mahanadi Coalfields Limited (MCL)",
    "ministry": "Ministry of Coal",
    "originalCost": 2450,
    "revisedCost": 3170,
    "expenditure": 2028.8,
    "physicalProgress": 38,
    "financialProgress": 61,
    "startDate": "2024-05-01",
    "anticipatedCompletion": "2027-09-01",
    "riskScore": 79,
    "riskBand": "High",
    "delayProbability": 0.75,
    "expectedDelayMonths": 15,
    "expectedCostOverrunPct": 29.4,
    "confidence": "High",
    "drivers": [
      {
        "factor": "Expenditure-physical progress imbalance",
        "impact": 25
      },
      {
        "factor": "Forest & wildlife clearance dependency",
        "impact": 18
      },
      {
        "factor": "Land acquisition delay",
        "impact": 17
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 11
      },
      {
        "factor": "Milestone slippage vs DPR schedule",
        "impact": 11
      },
      {
        "factor": "Stable funding disbursement",
        "impact": -3
      }
    ],
    "delayDNA": "Funding-Starved Delay",
    "delayDNADescription": "Physical progress consistently outpaces fund disbursement, indicating the project is being slowed by delayed or inadequate release of sanctioned funds rather than execution capacity.",
    "similarProjectIds": [
      "pwr-01",
      "wtr-01"
    ],
    "dependencies": [
      {
        "projectId": "pwr-01",
        "reason": "Coal linkage and rail evacuation feed this plant's fuel supply",
        "confirmed": true
      }
    ],
    "bottleneckAgency": "State Forest Department",
    "bottleneckNote": "Stage-II forest clearance for the final 18km rail stretch has been pending at the regional office for over a year.",
    "history": [
      {
        "month": "2026-01",
        "physicalProgress": 9,
        "financialProgress": 22
      },
      {
        "month": "2026-02",
        "physicalProgress": 14.5,
        "financialProgress": 27.9
      },
      {
        "month": "2026-03",
        "physicalProgress": 17,
        "financialProgress": 30.8
      },
      {
        "month": "2026-04",
        "physicalProgress": 19.5,
        "financialProgress": 38.6
      },
      {
        "month": "2026-05",
        "physicalProgress": 25,
        "financialProgress": 40.5
      },
      {
        "month": "2026-06",
        "physicalProgress": 27.5,
        "financialProgress": 46.4
      },
      {
        "month": "2026-07",
        "physicalProgress": 30,
        "financialProgress": 51.3
      },
      {
        "month": "2026-08",
        "physicalProgress": 35.5,
        "financialProgress": 57.1
      },
      {
        "month": "2026-09",
        "physicalProgress": 38,
        "financialProgress": 60
      }
    ],
    "lastUpdated": "2026-09-03"
  },
  {
    "id": "coal-02",
    "name": "Mand-Raigarh Coal Block Development",
    "sector": "Coal",
    "state": "Chhattisgarh",
    "agency": "South Eastern Coalfields Limited (SECL)",
    "ministry": "Ministry of Coal",
    "originalCost": 1360,
    "revisedCost": 1520,
    "expenditure": 608,
    "physicalProgress": 27,
    "financialProgress": 37,
    "startDate": "2025-08-01",
    "anticipatedCompletion": "2027-06-01",
    "riskScore": 61,
    "riskBand": "Medium",
    "delayProbability": 0.53,
    "expectedDelayMonths": 7,
    "expectedCostOverrunPct": 11.8,
    "confidence": "Medium",
    "drivers": [
      {
        "factor": "Low physical progress vs elapsed time",
        "impact": 19
      },
      {
        "factor": "Pending statutory/environmental clearance",
        "impact": 16
      },
      {
        "factor": "Land acquisition delay",
        "impact": 12
      },
      {
        "factor": "Historical sector delay pattern",
        "impact": 10
      },
      {
        "factor": "Agency capacity constraint",
        "impact": 7
      },
      {
        "factor": "Dedicated nodal officer engagement",
        "impact": -3
      }
    ],
    "delayDNA": "Early Stall",
    "delayDNADescription": "Progress stalled within the first third of the project timeline, typically tied to land handover, approvals, or mobilisation delays, with limited recovery since.",
    "similarProjectIds": [
      "rail-01",
      "wtr-02"
    ],
    "dependencies": [],
    "bottleneckAgency": "State Environment Impact Assessment Authority",
    "bottleneckNote": "Environmental clearance amendment for the expanded mining lease boundary is still under public-hearing review.",
    "history": [
      {
        "month": "2026-04",
        "physicalProgress": 7,
        "financialProgress": 11
      },
      {
        "month": "2026-05",
        "physicalProgress": 9.2,
        "financialProgress": 18
      },
      {
        "month": "2026-06",
        "physicalProgress": 14.4,
        "financialProgress": 24
      },
      {
        "month": "2026-07",
        "physicalProgress": 19.6,
        "financialProgress": 27
      },
      {
        "month": "2026-08",
        "physicalProgress": 20.8,
        "financialProgress": 31
      },
      {
        "month": "2026-09",
        "physicalProgress": 27,
        "financialProgress": 38
      }
    ],
    "lastUpdated": "2026-09-04"
  },
  {
    "id": "coal-03",
    "name": "Jharia Coalfield Underground-to-Opencast Conversion",
    "sector": "Coal",
    "state": "Jharkhand",
    "agency": "Bharat Coking Coal Limited (BCCL)",
    "ministry": "Ministry of Coal",
    "originalCost": 890,
    "revisedCost": 905,
    "expenditure": 742.1,
    "physicalProgress": 85,
    "financialProgress": 82,
    "startDate": "2025-02-01",
    "anticipatedCompletion": "2026-11-01",
    "riskScore": 20,
    "riskBand": "Low",
    "delayProbability": 0.09,
    "expectedDelayMonths": 0,
    "expectedCostOverrunPct": 1.7,
    "confidence": "Low",
    "drivers": [
      {
        "factor": "Historical sector delay pattern",
        "impact": 18
      },
      {
        "factor": "Fire & subsidence zone safety clearance dependency",
        "impact": 8
      },
      {
        "factor": "Strong recent physical progress momentum",
        "impact": -7
      },
      {
        "factor": "Sparse recent field reporting",
        "impact": 8
      },
      {
        "factor": "Consistent financial-physical alignment",
        "impact": -4
      },
      {
        "factor": "Experienced contractor track record",
        "impact": -3
      }
    ],
    "delayDNA": "Late Cliff",
    "delayDNADescription": "Progress has tracked close to schedule through most of the project, but similar projects in this cluster show sharp slippage in the final quarter, typically around testing, commissioning, or handover stages.",
    "similarProjectIds": [
      "trn-03",
      "tel-02"
    ],
    "dependencies": [],
    "bottleneckAgency": "Directorate General of Mines Safety",
    "bottleneckNote": "Final safety sign-off for the subsidence-affected sector is pending re-inspection; site reporting has been thin since the last audit.",
    "history": [
      {
        "month": "2025-12",
        "physicalProgress": 61,
        "financialProgress": 58
      },
      {
        "month": "2026-01",
        "physicalProgress": 70.7,
        "financialProgress": 67
      },
      {
        "month": "2026-02",
        "physicalProgress": 77.3,
        "financialProgress": 73
      },
      {
        "month": "2026-03",
        "physicalProgress": 84,
        "financialProgress": 84
      }
    ],
    "lastUpdated": "2026-03-14"
  }
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export const sectors = Array.from(new Set(projects.map((p) => p.sector))).sort();
export const states = Array.from(new Set(projects.map((p) => p.state))).sort();

