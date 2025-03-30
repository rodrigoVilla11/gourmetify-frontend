"use client";

import { useState } from "react";
import { products } from "@/data/products"; // Asegurate de importar tus productos

type MovementType = {
  type: "income" | "expense";
  description: string;
  amount: number;
  productId?: string;
  quantity?: number;
};

type Props = {
  onAdd: (movement: MovementType) => void;
  disabled?: boolean;
};

export function CashForm({ onAdd, disabled = false }: Props) {
  const [type, setType] = useState<"income" | "expense">("income");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled || !description.trim() || !amount) return;

    const base: MovementType = {
      type,
      description: description.trim(),
      amount: parseFloat(amount),
    };

    if (type === "expense" && productId && quantity) {
      base.productId = productId;
      base.quantity = parseInt(quantity);
    }

    onAdd(base);

    setDescription("");
    setAmount("");
    setProductId("");
    setQuantity("");
    setType("income");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <select
        value={type}
        onChange={(e) => setType(e.target.value as "income" | "expense")}
        className="w-full border rounded-lg px-3 py-2"
        disabled={disabled}
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
        required
        disabled={disabled}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
        required
        disabled={disabled}
      />

      {/* 👇 Solo si es un egreso */}
      {type === "expense" && (
        <>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            disabled={disabled}
          >
            <option value="">Select Product (optional)</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — Stock: {p.stock}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
            disabled={disabled || !productId}
            min={1}
          />
        </>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        disabled={disabled}
      >
        Add Movement
      </button>
    </form>
  );
}
