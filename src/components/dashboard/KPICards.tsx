"use client";

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface KPICardsProps {
  totalSales: number;
  averageTicket: number;
  salesByUser: Record<string, number>;
  salesByShift: Record<string, number>;
}

export function KPICards({
  totalSales,
  averageTicket,
  salesByUser,
  salesByShift,
}: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card title="💲 Total Vendido">
        <p className="text-3xl font-bold text-green-700">
          ${totalSales.toLocaleString("es-AR")}
        </p>
      </Card>

      <Card title="📄 Ticket Promedio">
        <p className="text-3xl font-bold text-primary">
          ${Number(averageTicket).toLocaleString("es-AR")}
        </p>
      </Card>

      <Card title="👤 Ventas por Responsable">
        <ul className="text-sm mt-2 space-y-1">
          {Object.entries(salesByUser).map(([user, total], i) => (
            <li key={i} className="flex justify-between">
              <span className="text-muted-foreground">{user}</span>
              <span className="font-medium text-primary">
                ${total.toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>
      </Card>

      <Card title="⏰ Ventas por Turno">
        <ul className="text-sm mt-2 space-y-1">
          {Object.entries(salesByShift).map(([turno, total], i) => (
            <li key={i} className="flex justify-between">
              <span className="capitalize text-muted-foreground">{turno}</span>
              <span className="font-medium text-primary">
                ${total.toLocaleString("es-AR")}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
