"use client";

import { InventoryAdjustment, InventoryItem } from "@/data/inventory";
import { formatCurrency } from "@/lib/format";

interface Props {
  adjustments: InventoryAdjustment[];
  items: InventoryItem[];
}

export function AdjustmentHistoryTable({ adjustments, items }: Props) {
  const getItemName = (id: number) =>
    items.find((i) => i.id === id)?.name ?? "—";

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h2 className="text-lg font-semibold text-primary mb-4">Historial de Ajustes</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted border-b">
            <th className="text-left py-2">Fecha</th>
            <th className="text-left py-2">Producto</th>
            <th className="text-left py-2">Tipo</th>
            <th className="text-right py-2">Cantidad</th>
            <th className="text-left py-2">Motivo</th>
          </tr>
        </thead>
        <tbody>
          {adjustments.map((adj) => (
            <tr key={adj.id} className="border-t">
              <td className="py-2 text-muted-foreground">
                {new Date(adj.date).toLocaleDateString()}
              </td>
              <td className="py-2">{getItemName(adj.itemId)}</td>
              <td
                className={`py-2 capitalize font-medium ${
                  adj.type === "purchase"
                    ? "text-green-700"
                    : adj.type === "loss"
                    ? "text-red-600"
                    : "text-orange-500"
                }`}
              >
                {adj.type === "purchase"
                  ? "Ingreso"
                  : adj.type === "loss"
                  ? "Pérdida"
                  : "Devolución"}
              </td>
              <td className="py-2 text-right">{adj.quantity}</td>
              <td className="py-2">{adj.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
