"use client";

import { useState, useEffect } from "react";
import { activeCashSession, CashMovement, CashSession } from "@/data/cash";
import { CashSessionInfo } from "@/components/cash/CashSessionInfo";
import { CashSummary } from "@/components/cash/CashSummary";
import { CashForm } from "@/components/cash/CashForm";
import { CashList } from "@/components/cash/CashList";
import { CashSalesSummary } from "@/components/cash/CashSalesSummary";
import { useAuth } from "@/contexts/AuthContext";
import { products } from "@/data/products";

export default function CashPage() {
  const { user } = useAuth();
  const [session, setSession] = useState<CashSession>({
    ...activeCashSession,
    responsible: user.name, // 👈 setea responsable automáticamente
  });

  const isClosed = session.closed ?? false;

  // En caso de que el usuario cambie mientras estás en la vista
  useEffect(() => {
    if (!session.closed) {
      setSession((prev) => ({ ...prev, responsible: user.name }));
    }
  }, [user.name]);

  const handleAddMovement = (movement: Omit<CashMovement, "id" | "date">) => {
    const newMovement: CashMovement = {
      ...movement,
      id: session.movements.length + 1,
      date: new Date().toISOString(),
    };
  
    // 👇 Si es un egreso con producto y cantidad, actualizamos el inventario
    if (
      newMovement.type === "expense" &&
      newMovement.productId &&
      typeof newMovement.quantity === "number"
    ) {
        const productIndex = products.findIndex((p) => p.id === Number(newMovement.productId));

      if (productIndex >= 0) {
        products[productIndex].stock = Math.max(
          0,
          products[productIndex].stock - newMovement.quantity
        );
      }
    }
  
    setSession((prev) => ({
      ...prev,
      movements: [newMovement, ...prev.movements],
    }));
  };
  
  return (
    <div className="space-y-8 print-container">
      <h2 className="text-2xl font-bold print-heading">Cash Register</h2>

      {isClosed && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-xl shadow no-print">
          <strong>This cash session is closed.</strong> No more changes can be made.
        </div>
      )}

      <CashSessionInfo
        session={session}
        onUpdate={setSession}
        disabled={isClosed}
      />

      <CashSalesSummary movements={session.movements} />

      <CashSummary
        movements={session.movements}
        openingBalance={session.openingBalance}
      />

      <CashForm onAdd={handleAddMovement} disabled={isClosed} />

      <CashList movements={session.movements} />

      <div className="flex gap-4">
        {!isClosed && (
          <button
            onClick={() => setSession((prev) => ({ ...prev, closed: true }))}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition no-print"
          >
            Close Cash Session
          </button>
        )}

        {isClosed && (
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition no-print"
          >
            Export / Print
          </button>
        )}
      </div>
    </div>
  );
}
