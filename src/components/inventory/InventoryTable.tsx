"use client";

import { InventoryItem } from "@/data/inventory"; // Asegurate de tener este archivo
import { Button } from "@/components/ui/Button";
import { formatUnit } from "@/lib/format";

interface Props {
  items: InventoryItem[];
  onAdjust?: (itemId: number) => void;
}

export function InventoryTable({ items, onAdjust }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h2 className="text-lg font-semibold text-primary mb-4">Stock Actual</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted border-b">
            <th className="text-left font-medium py-2">Insumo</th>
            <th className="text-right font-medium py-2">Stock</th>
            <th className="text-right font-medium py-2">Mínimo</th>
            {onAdjust && <th className="text-right py-2"></th>}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const isLow = item.minimumStock && item.stock < item.minimumStock;

            return (
              <tr key={item.id} className="border-t">
                <td className="py-2">{item.name}</td>
                <td className={`py-2 text-right font-medium ${isLow ? "text-red-600" : "text-primary"}`}>
                  {item.stock} {formatUnit(item.unit)}
                </td>
                <td className="py-2 text-right text-muted-foreground">
                  {item.minimumStock ?? "-"} {formatUnit(item.unit)}
                </td>
                {onAdjust && (
                  <td className="py-2 text-right">
                    <Button size="sm" onClick={() => onAdjust(item.id)}>
                      Ajustar
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
