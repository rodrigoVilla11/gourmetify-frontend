"use client";

import { useState } from "react";

type Props = {
  product: { id: number; name: string; stock: number };
  onUpdate: (id: number, newStock: number) => void;
  onClose: () => void;
};

export function EditStockModal({ product, onUpdate, onClose }: Props) {
  const [stock, setStock] = useState(product.stock.toString());

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold">Edit Stock — {product.name}</h2>

        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const parsed = parseInt(stock);
              if (!isNaN(parsed)) onUpdate(product.id, parsed);
              onClose();
            }}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
