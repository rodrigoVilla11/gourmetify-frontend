"use client";

import { useState } from "react";
import { salesHistory } from "@/data/salesHistory";
import { CashSummary } from "@/components/cash/CashSummary";
import { MovementTable, Movement } from "@/components/cash/MovementTable";
import { MovementForm } from "@/components/cash/MovementForm";
import { CloseCashModal } from "@/components/cash/CloseCashModal";
import { v4 as uuidv4 } from "uuid";

export default function CashPage() {
  const [manualMovements, setManualMovements] = useState<Movement[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);

  const currentSales = salesHistory.slice(-5); // simulación ventas actuales

  const totalVentas = currentSales.reduce((sum, s) => sum + s.total, 0);
  const totalIngresos = manualMovements
    .filter((m) => m.type === "ingreso")
    .reduce((sum, m) => sum + m.amount, 0);
  const totalEgresos = manualMovements
    .filter((m) => m.type === "egreso")
    .reduce((sum, m) => sum + m.amount, 0);
  const saldoFinal = totalVentas + totalIngresos - totalEgresos;

  const handleSaveMovement = (movement: Omit<Movement, "id">) => {
    setManualMovements((prev) => [
      ...prev,
      { ...movement, id: uuidv4() },
    ]);
    setShowForm(false);
  };

  const handleCerrarCaja = () => {
    // Acá guardarías la sesión (DB, archivo, etc)
    console.log("Caja cerrada:", {
      ventas: currentSales,
      movimientos: manualMovements,
      resumen: { totalVentas, totalIngresos, totalEgresos, saldoFinal },
    });
    setManualMovements([]);
    setShowCloseModal(false);
  };

  return (
    <div className="space-y-10 p-4 md:p-8">
      <CashSummary
        currentSales={currentSales}
        manualMovements={manualMovements}
        onCloseCash={() => setShowCloseModal(true)}
        onNewMovement={() => setShowForm(true)}
      />

      {manualMovements.length > 0 && (
        <MovementTable movements={manualMovements} />
      )}

      {showForm && (
        <MovementForm
          onSave={handleSaveMovement}
          onCancel={() => setShowForm(false)}
        />
      )}

      <CloseCashModal
        open={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        onConfirm={handleCerrarCaja}
        resumen={{
          totalVentas,
          totalIngresos,
          totalEgresos,
          saldoFinal,
        }}
      />
    </div>
  );
}
