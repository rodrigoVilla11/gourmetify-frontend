export type PurchaseItem = {
  id: number;
  name: string;
  provider: string;
  unit: "kg" | "u" | "l" | "pack";
};

export const availableItems: PurchaseItem[] = [
  { id: 1, name: "Salmón fresco", provider: "Pescados S.A.", unit: "kg" },
  { id: 2, name: "Palta", provider: "Frutas Córdoba", unit: "u" },
  { id: 3, name: "Queso crema", provider: "Lácteos DelSur", unit: "kg" },
  { id: 4, name: "Alga nori", provider: "Sushi Proveedores", unit: "pack" },
];

export type PriceListItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  provider: string;
};
