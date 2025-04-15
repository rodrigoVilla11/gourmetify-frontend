"use client";

import { useMemo, useState } from "react";
import { inventoryItems, inventoryAdjustments } from "@/data/inventory";
import { AdjustmentFilters } from "@/components/inventory/AdjustmentFilters";
import { AdjustmentHistoryTable } from "@/components/inventory/AdjustmentHistoryTable";

export default function InventoryAdjustmentsPage() {
  const [productId, setProductId] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const filtered = useMemo(() => {
    return inventoryAdjustments.filter((a) => {
      const matchProduct = !productId || a.itemId === Number(productId);
      const matchType = !type || a.type === type;

      const adjDate = a.date.split("T")[0];
      const matchFrom = !from || adjDate >= from;
      const matchTo = !to || adjDate <= to;

      return matchProduct && matchType && matchFrom && matchTo;
    });
  }, [productId, type, from, to]);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Historial de Ajustes de Inventario</h1>

      <AdjustmentFilters
        productId={productId}
        onProductChange={setProductId}
        type={type}
        onTypeChange={setType}
        from={from}
        onFromChange={setFrom}
        to={to}
        onToChange={setTo}
        products={inventoryItems}
      />

      <AdjustmentHistoryTable
        adjustments={filtered}
        items={inventoryItems}
      />
    </div>
  );
}
