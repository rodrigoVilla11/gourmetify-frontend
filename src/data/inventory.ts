export type InventoryItem = {
    id: number;
    name: string;
    stock: number;
    unit: "kg" | "g" | "l" | "ml" | "u"; // unidad
    minimumStock?: number;
  };
  
  export type InventoryAdjustment = {
    id: number;
    itemId: number;
    type: "purchase" | "loss" | "return";
    quantity: number;
    reason: string;
    date: string; // ISO
  };

  export const inventoryItems: InventoryItem[] = [
    { id: 1, name: "Salmón fresco", stock: 3.2, unit: "kg" },
    { id: 2, name: "Arroz para sushi", stock: 8, unit: "kg" },
    { id: 3, name: "Palta", stock: 12, unit: "u" },
  ];
  
  export const inventoryAdjustments: InventoryAdjustment[] = [
    {
      id: 1,
      itemId: 1,
      type: "purchase",
      quantity: 2,
      reason: "Compra mayorista",
      date: "2025-04-01T10:00:00",
    },
    {
      id: 2,
      itemId: 3,
      type: "loss",
      quantity: 1,
      reason: "Producto dañado",
      date: "2025-04-02T12:30:00",
    },
    {
      id: 3,
      itemId: 2,
      type: "return",
      quantity: 0.5,
      reason: "Devolución a proveedor",
      date: "2025-04-03T09:15:00",
    },
  ];
  