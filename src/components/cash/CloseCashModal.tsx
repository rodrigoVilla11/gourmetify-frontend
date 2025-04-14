"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/format";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  resumen: {
    totalVentas: number;
    totalIngresos: number;
    totalEgresos: number;
    saldoFinal: number;
  };
}

export function CloseCashModal({ open, onClose, onConfirm, resumen }: Props) {
  const { totalVentas, totalIngresos, totalEgresos, saldoFinal } = resumen;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cierre de Caja</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-gray-700">Total Ventas:</span>{" "}
            {formatCurrency(totalVentas)}
          </p>
          <p>
            <span className="font-medium text-gray-700">Ingresos Manuales:</span>{" "}
            {formatCurrency(totalIngresos)}
          </p>
          <p>
            <span className="font-medium text-gray-700">Egresos Manuales:</span>{" "}
            {formatCurrency(totalEgresos)}
          </p>
          <hr className="my-2" />
          <p className="font-semibold text-primary">
            Saldo Final del Turno: {formatCurrency(saldoFinal)}
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={onConfirm}>
            Confirmar Cierre
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
