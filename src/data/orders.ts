export type Order = {
    id: string;
    customer: string;
    phone?: string;
    address?: string;
    origin: "web" | "whatsapp" | "phone" | "in-store";
    status: "pending" | "preparing" | "ready" | "delivered";
    products: {
      id: number;
      name: string;
      quantity: number;
      price: number;
    }[];
    total: number;
    createdAt: string;
    notes?: string;
    responsible?: string;
  };
  