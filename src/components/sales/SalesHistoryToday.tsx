"use client";
import { Sale } from "@/data/salesHistory";

type Props = {
  sales: Sale[];
};

export function SalesHistoryToday({ sales }: Props) {
  const total = sales.reduce((acc, s) => acc + s.total, 0);

  return (
    <div className="bg-white border rounded-xl p-6 shadow-md mt-10">
      <h2 className="text-lg font-semibold mb-4">🧾 Historial de ventas del día</h2>

      {sales.length === 0 ? (
        <p className="text-sm text-gray-500">No hay ventas registradas hoy.</p>
      ) : (
        <>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Hora</th>
                <th>Cliente</th>
                <th>Tipo</th>
                <th>Total</th>
                <th>Pago</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => {
                const hora = new Date(sale.date).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <tr key={sale.id} className="border-b">
                    <td className="py-1">{hora}</td>
                    <td>{sale.customer}</td>
                    <td className="capitalize">{sale.type}</td>
                    <td>${sale.total.toFixed(2)}</td>
                    <td>{sale.paymentMethod}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="text-right font-bold text-primary">
            Total facturado hoy: ${total.toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}
