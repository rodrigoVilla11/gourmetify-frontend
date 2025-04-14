// components/sales/DiscountForm.tsx
"use client";
import React from "react";

type Props = {
  discount: number;
  surcharge: number;
  isPercentage: boolean;
  setDiscount: (value: number) => void;
  setSurcharge: (value: number) => void;
  setIsPercentage: (value: boolean) => void;
};

export function DiscountForm({
  discount,
  surcharge,
  isPercentage,
  setDiscount,
  setSurcharge,
  setIsPercentage,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mt-6">
      <div>
        <label className="text-sm font-medium">Descuento</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Ej: 10 o 500"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Recargo</label>
        <input
          type="number"
          value={surcharge}
          onChange={(e) => setSurcharge(parseFloat(e.target.value))}
          className="w-full px-3 py-2 border rounded-md text-sm"
          placeholder="Ej: 5 o 200"
        />
      </div>
      <div className="md:col-span-2 flex items-center gap-3 mt-2">
        <input
          type="checkbox"
          checked={isPercentage}
          onChange={(e) => setIsPercentage(e.target.checked)}
          className="accent-primary"
        />
        <span className="text-sm">Aplicar como porcentaje (%)</span>
      </div>
    </div>
  );
}
