"use client";
import React from "react";

type Props = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
};

export function PaymentSelect({ paymentMethod, setPaymentMethod }: Props) {
  return (
    <div className="max-w-sm">
      <label className="text-sm font-medium">Método de pago</label>
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
      >
        <option value="Efectivo">💵 Efectivo</option>
        <option value="Tarjeta">💳 Tarjeta</option>
        <option value="Transferencia">🪙 Transferencia / QR</option>
        <option value="Cripto">💲 Cripto (USDT)</option>
      </select>
    </div>
  );
}
