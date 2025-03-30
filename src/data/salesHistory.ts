export type SaleItem = {
  id: number;
  type: "product" | "combo";
  quantity: number;
};

export type Sale = {
  id: string;
  date: string;
  total: number;
  items: SaleItem[];
  responsible: string;
  shift?: "morning" | "afternoon" | "night"; // nuevo campo opcional
};

export const salesHistory: Sale[] = [
  {
    id: "T-20250328-001",
    date: "2025-03-28T10:45:00",
    total: 8300,
    responsible: "Lucía",
    items: [
      { id: 1, type: "product", quantity: 2 },
      { id: 3, type: "combo", quantity: 1 },
    ],
  },
  {
    id: "T-20250328-002",
    date: "2025-03-28T12:20:00",
    total: 5600,
    responsible: "Santiago",
    items: [{ id: 2, type: "combo", quantity: 2 }],
  },
  {
    id: "T-20250327-007",
    date: "2025-03-27T19:10:00",
    total: 10100,
    responsible: "Admin",
    items: [
      { id: 4, type: "product", quantity: 1 },
      { id: 2, type: "combo", quantity: 3 },
    ],
  },
];

// Al final del archivo
export const addSaleToHistory = (sale: Sale) => {
  salesHistory.push(sale);
};
