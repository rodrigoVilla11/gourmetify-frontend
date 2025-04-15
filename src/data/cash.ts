// /src/data/cash.ts

export type CashMovement = {
    id: number;
    type: "income" | "expense";
    description: string;
    amount: number;
    date: string; // ISO format
    productId?: string; // 👈 opcional para afectar stock
    quantity?: number; 
  };
  
  export const initialCashMovements: CashMovement[] = [
    {
      id: 1,
      type: "income",
      description: "Sales of the day",
      amount: 18750,
      date: new Date().toISOString(),
    },
    {
      id: 2,
      type: "expense",
      description: "Purchase of coffee beans",
      amount: 3200,
      date: new Date().toISOString(),
    },
  ];
  
  export type CashSession = {
    id: number;
    date: string; // formato ISO
    shift: "morning" | "afternoon" | "night";
    responsible: string;
    openingBalance: number;
    movements: CashMovement[];
    closed?: boolean; 
  };
  export const activeCashSession: CashSession = {
    id: 1,
    date: new Date().toISOString().split("T")[0], // solo YYYY-MM-DD
    shift: "morning",
    responsible: "Admin",
    openingBalance: 5000,
    movements: [
      {
        id: 1,
        type: "income",
        description: "Sales of the day",
        amount: 18750,
        date: new Date().toISOString(),
      },
      {
        id: 2,
        type: "expense",
        description: "Purchase of coffee beans",
        amount: 3200,
        date: new Date().toISOString(),
      },
    ],
  };

  export const cashSessions: CashSession[] = [
    {
      id: 1,
      date: "2025-03-27",
      shift: "morning",
      responsible: "Lucas",
      openingBalance: 4000,
      movements: [
        { id: 1, type: "income", description: "Ventas turno mañana", amount: 12000, date: "2025-03-27T09:15:00" },
        { id: 2, type: "expense", description: "Panadería", amount: 1500, date: "2025-03-27T10:30:00" },
      ],
    },
    {
      id: 2,
      date: "2025-03-27",
      shift: "afternoon",
      responsible: "María",
      openingBalance: 5500,
      movements: [
        { id: 1, type: "income", description: "Ventas tarde", amount: 9700, date: "2025-03-27T14:10:00" },
        { id: 2, type: "expense", description: "Bebidas", amount: 2400, date: "2025-03-27T17:00:00" },
      ],
    },
  ];
  
  