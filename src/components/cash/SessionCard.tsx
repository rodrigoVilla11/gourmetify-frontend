"use client";

import { CashSession } from "@/data/cash";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";

interface Props {
  session: CashSession;
  onViewDetail?: (id: number) => void; // para abrir modal o navegar
}

export function SessionCard({ session, onViewDetail }: Props) {
  const ingresos = session.movements
    .filter((m) => m.type === "income")
    .reduce((sum, m) => sum + m.amount, 0);

  const egresos = session.movements
    .filter((m) => m.type === "expense")
    .reduce((sum, m) => sum + m.amount, 0);

  const saldoFinal = session.openingBalance + ingresos - egresos;

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-primary">
            {session.date} — {capitalize(session.shift)}
          </h3>
          <p className="text-sm text-muted-foreground">
            Responsable: {session.responsible}
          </p>
        </div>
        <Button size="sm" onClick={() => onViewDetail?.(session.id)}>
          Ver Detalle
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Saldo Inicial</p>
          <p className="font-medium">{formatCurrency(session.openingBalance)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Ingresos</p>
          <p className="font-medium text-green-700">
            {formatCurrency(ingresos)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Egresos</p>
          <p className="font-medium text-red-700">
            {formatCurrency(egresos)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Saldo Final</p>
          <p className="font-bold text-primary">{formatCurrency(saldoFinal)}</p>
        </div>
      </div>
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
