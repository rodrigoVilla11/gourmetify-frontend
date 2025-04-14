"use client";

import { CashSession } from "@/data/cash";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import html2pdf from "html2pdf.js";
import { useRef } from "react";

interface Props {
  session: CashSession | null;
  open: boolean;
  onClose: () => void;
}

export function SessionDetailModal({ session, open, onClose }: Props) {
  const pdfRef = useRef<HTMLDivElement>(null);

  if (!session) return null;

  const ingresos = session.movements
    .filter((m) => m.type === "income")
    .reduce((sum, m) => sum + m.amount, 0);

  const egresos = session.movements
    .filter((m) => m.type === "expense")
    .reduce((sum, m) => sum + m.amount, 0);

  const saldoFinal = session.openingBalance + ingresos - egresos;

  const handleExportPDF = () => {
    if (pdfRef.current) {
      html2pdf()
        .from(pdfRef.current)
        .set({
          margin: 0.5,
          filename: `cierre-caja-${session.date}-${session.shift}.pdf`,
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Detalle de Caja — {session.date} ({session.shift})
          </DialogTitle>
        </DialogHeader>

        <div ref={pdfRef} className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Responsable</p>
              <p className="font-medium">{session.responsible}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Saldo Inicial</p>
              <p className="font-medium">
                {formatCurrency(session.openingBalance)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Ingresos</p>
              <p className="text-green-700 font-medium">
                {formatCurrency(ingresos)}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Egresos</p>
              <p className="text-red-600 font-medium">
                {formatCurrency(egresos)}
              </p>
            </div>
            <div className="col-span-2 sm:col-span-4">
              <p className="text-muted-foreground">Saldo Final</p>
              <p className="text-primary font-bold text-lg">
                {formatCurrency(saldoFinal)}
              </p>
            </div>
          </div>

          <div className="border-t pt-4 text-sm">
            <h4 className="font-semibold text-primary mb-2">Movimientos</h4>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted">
                  <th className="text-left">Hora</th>
                  <th className="text-left">Tipo</th>
                  <th className="text-left">Descripción</th>
                  <th className="text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {session.movements.map((m) => (
                  <tr key={m.id} className="border-t">
                    <td className="py-2">
                      {new Date(m.date).toLocaleTimeString()}
                    </td>
                    <td
                      className={`py-2 capitalize font-medium ${
                        m.type === "income"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {m.type === "income" ? "Ingreso" : "Egreso"}
                    </td>
                    <td className="py-2">{m.description}</td>
                    <td className="py-2 text-right font-semibold">
                      {formatCurrency(m.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={handleExportPDF}>
            📄 Exportar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
