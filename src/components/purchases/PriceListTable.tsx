"use client";

import { useState } from "react";
import { PriceListItem } from "./PriceListUploader";
import { Input } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/format";

export interface OrderItem extends PriceListItem {
  quantity: number;
}

interface Props {
  items: PriceListItem[];
  onChange: (selected: OrderItem[]) => void;
}

export function PriceListTable({ items, onChange }: Props) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleChange = (id: string, value: number) => {
    const updated = { ...quantities, [id]: value };
    setQuantities(updated);

    const selected = items
      .filter((i) => updated[i.id] && updated[i.id] > 0)
      .map((i) => ({
        ...i,
        quantity: updated[i.id],
      }));

    onChange(selected);
  };

  return (
    <div className="mt-6 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h2 className="text-lg font-semibold text-primary mb-4">Productos disponibles</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted border-b">
            <th className="text-left py-2">Producto</th>
            <th className="text-left py-2">Proveedor</th>
            <th className="text-left py-2">Unidad</th>
            <th className="text-right py-2">Precio</th>
            <th className="text-right py-2">Cantidad</th>
            <th className="text-right py-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const qty = quantities[item.id] || 0;
            const subtotal = qty * item.price;

            return (
              <tr key={item.id} className="border-t">
                <td className="py-2">{item.name}</td>
                <td className="py-2 text-muted-foreground">{item.provider}</td>
                <td className="py-2">{item.unit}</td>
                <td className="py-2 text-right">{formatCurrency(item.price)}</td>
                <td className="py-2 text-right">
                  <Input
                    type="number"
                    min="0"
                    value={qty}
                    onChange={(e) => handleChange(item.id, parseFloat(e.target.value))}
                    className="w-20 text-right"
                  />
                </td>
                <td className="py-2 text-right font-medium text-primary">
                  {subtotal > 0 ? formatCurrency(subtotal) : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
