"use client";

import { InventoryItem } from "@/data/inventory";
import { Label } from "@/components/ui/Label";

interface Props {
  productId: string;
  onProductChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  from: string;
  to: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
  products: InventoryItem[];
}

export function AdjustmentFilters({
  productId,
  onProductChange,
  type,
  onTypeChange,
  from,
  to,
  onFromChange,
  onToChange,
  products,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <Label>Producto</Label>
        <select
          value={productId}
          onChange={(e) => onProductChange(e.target.value)}
          className="w-44 border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950"
        >
          <option value="">Todos</option>
          {products.map((p) => (
            <option key={p.id} value={p.id.toString()}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Tipo</Label>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          className="w-40 border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950"
        >
          <option value="">Todos</option>
          <option value="purchase">Ingreso</option>
          <option value="loss">Pérdida</option>
          <option value="return">Devolución</option>
        </select>
      </div>

      <div>
        <Label>Desde</Label>
        <input
          type="date"
          value={from}
          onChange={(e) => onFromChange(e.target.value)}
          className="w-36 border rounded px-3 py-2 text-sm"
        />
      </div>

      <div>
        <Label>Hasta</Label>
        <input
          type="date"
          value={to}
          onChange={(e) => onToChange(e.target.value)}
          className="w-36 border rounded px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
