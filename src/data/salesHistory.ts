// Tipos de ítems vendidos
export type SaleItem = {
  id: number;
  type: "product" | "combo";
  quantity: number;
};

// Campos específicos para delivery
export type DeliveryData = {
  phone: string;
  address: string;
  shippingCost: number;
};


// Venta tipo "mostrador"
export type InStoreSale = {
  id: string;
  date: string;
  total: number;
  paymentMethod: string;
  customer: string;
  type: "mostrador";
  items: SaleItem[];
  responsible: string;
  shift?: "morning" | "afternoon" | "night";
};

// Venta tipo "delivery"
export type DeliverySale = {
  id: string;
  date: string;
  total: number;
  paymentMethod: string;
  customer: string;
  type: "delivery";
  items: SaleItem[];
  responsible: string;
  delivery: DeliveryData;
  shift?: "morning" | "afternoon" | "night";
};

// Unimos ambos con un tipo discriminado
export type Sale = InStoreSale | DeliverySale;


export const salesHistory: Sale[] = [
  {
    id: "T-20250328-001",
    date: "2025-04-05T10:45:00",
    total: 8300,
    responsible: "Lucía",
    paymentMethod: "Efectivo",
    customer: "Juan",
    type: "mostrador",
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
    type: "mostrador",
    customer: "Pedro",
    paymentMethod: "Efectivo",
    items: [{ id: 2, type: "combo", quantity: 2 }],
  },
  {
    id: "T-20250327-007",
    date: "2025-03-27T19:10:00",
    total: 10100,
    type: "mostrador",
    responsible: "Admin",
    paymentMethod: "Efectivo",
    customer: "Jazmin",
    items: [
      { id: 4, type: "product", quantity: 1 },
      { id: 2, type: "combo", quantity: 3 },
    ],
  },
  {
    id: "T-20250403-003",
    date: "2025-04-03T21:30:00",
    total: 4800,
    type: "delivery",
    responsible: "Mariana",
    paymentMethod: "Transferencia",
    customer: "Carlos",
    delivery: {
      phone: "351-4567890",
      address: "Av. Libertador 1234",
      shippingCost: 500,
    },
    items: [{ id: 1, type: "product", quantity: 2 }],
  },
];

// Al final del archivo
export const addSaleToHistory = (sale: Sale) => {
  salesHistory.push(sale);
};
