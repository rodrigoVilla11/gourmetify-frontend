"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { stockHistory } from "@/data/stockHistroy";

export function StockAdjustmentForm() {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState<"purchase" | "loss" | "return" | "manual">("manual");
  const { user } = useAuth(); // si usás contexto de auth

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Number(productId);
    const qty = parseInt(quantity);
    if (!id || isNaN(qty)) return;

    // Actualizar stock del producto
    const index = products.findIndex((p) => p.id === id);
    if (index >= 0) {
      products[index].stock += qty;
    }

    // Agregar al historial
    stockHistory.unshift({
      id: stockHistory.length + 1,
      productId: id,
      quantity: qty,
      reason,
      responsible: user?.name || "Unknown",
      date: new Date().toISOString(),
    });

    // Reset form
    setProductId("");
    setQuantity("");
    setReason("manual");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
        required
      >
        <option value="">Select product</option>
        {products.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name} — Stock: {p.stock}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity (use negative for loss)"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
        required
      />

      <select
        value={reason}
        onChange={(e) => setReason(e.target.value as any)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option value="purchase">Purchase</option>
        <option value="return">Return</option>
        <option value="loss">Loss</option>
        <option value="manual">Manual</option>
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Adjust Stock
      </button>
    </form>
  );
}
