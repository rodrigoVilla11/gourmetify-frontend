"use client";

import { formatCurrency } from "@/lib/format";

export interface Movement {
  id: string;
  type: "ingreso" | "egreso";
  concept: string;
  amount: number;
}

interface Props {
  movements: Movement[];
  title?: string;
}

export function MovementTable({ movements, title = "Movimientos del turno" }: Props) {
  if (!movements.length) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted">
            <th className="text-left font-medium">Tipo</th>
            <th className="text-left font-medium">Concepto</th>
            <th className="text-right font-medium">Monto</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((m) => (
            <tr key={m.id} className="border-t">
              <td
                className={`py-2 text-left font-medium ${
                  m.type === "ingreso" ? "text-blue-700" : "text-red-700"
                }`}
              >
                {m.type === "ingreso" ? "Ingreso" : "Egreso"}
              </td>
              <td className="py-2 text-left text-gray-800">{m.concept}</td>
              <td className="py-2 text-right font-semibold">
                {formatCurrency(m.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
