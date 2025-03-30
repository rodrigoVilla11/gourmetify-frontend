import { CashSession } from "./cash";

export const closedCashSessions: CashSession[] = [
  {
    id: 1,
    date: "2025-03-28",
    shift: "morning",
    responsible: "Carla",
    openingBalance: 10000,
    closed: true,
    movements: [
      { id: 1, type: "income", description: "Sale T-001", amount: 4500, date: "2025-03-28T10:10:00" },
      { id: 2, type: "expense", description: "Purchase supplies", amount: 1200, date: "2025-03-28T11:00:00" },
    ],
  },
  {
    id: 2,
    date: "2025-03-27",
    shift: "night",
    responsible: "Pedro",
    openingBalance: 8000,
    closed: true,
    movements: [
      { id: 1, type: "income", description: "Sale T-004", amount: 7600, date: "2025-03-27T21:00:00" },
    ],
  },
];
