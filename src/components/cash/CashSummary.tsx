"use client";

import { useMemo } from "react";
import { salesHistory } from "@/data/salesHistory";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";

interface Movement {
  id: string;
  type: "ingreso" | "egreso";
  concept: string;
  amount: number;
}

interface Props {
  currentSales: typeof salesHistory;
  manualMovements: Movement[];
  onCloseCash: () => void;
  onNewMovement: () => void;
}

export function CashSummary({
  currentSales,
  manualMovements,
  onCloseCash,
  onNewMovement,
}: Props) {
  const totalSales = useMemo(
    () => currentSales.reduce((sum, s) => sum + s.total, 0),
    [currentSales]
  );

  const totalIngresos = useMemo(
    () =>
      manualMovements
        .filter((m) => m.type === "ingreso")
        .reduce((sum, m) => sum + m.amount, 0),
    [manualMovements]
  );

  const totalEgresos = useMemo(
    () =>
      manualMovements
        .filter((m) => m.type === "egreso")
        .reduce((sum, m) => sum + m.amount, 0),
    [manualMovements]
  );

  const saldoFinal = totalSales + totalIngresos - totalEgresos;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-primary">Caja actual</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="💸 Total Ventas">
          <p className="text-2xl font-bold text-green-700">
            {formatCurrency(totalSales)}
          </p>
        </Card>

        <Card title="➕ Ingresos Manuales">
          <p className="text-2xl font-bold text-blue-700">
            {formatCurrency(totalIngresos)}
          </p>
        </Card>

        <Card title="➖ Egresos Manuales">
          <p className="text-2xl font-bold text-red-700">
            {formatCurrency(totalEgresos)}
          </p>
        </Card>

        <Card title="🧾 Saldo Final del Turno">
          <p className="text-2xl font-bold text-primary">
            {formatCurrency(saldoFinal)}
          </p>
        </Card>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onNewMovement}>
          Registrar Movimiento
        </Button>
        <Button variant="default" onClick={onCloseCash}>
          Cerrar Caja
        </Button>
      </div>
    </div>
  );
}
