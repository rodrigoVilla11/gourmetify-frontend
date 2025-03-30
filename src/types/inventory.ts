export type StockAdjustment = {
    id: number;
    productId: number;
    quantity: number; // positivo (ingreso) o negativo (egreso)
    reason: "purchase" | "loss" | "return" | "manual";
    responsible: string;
    date: string;
  };
  