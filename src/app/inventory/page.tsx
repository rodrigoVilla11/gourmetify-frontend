"use client";

import { StockAdjustmentForm } from "@/components/inventory/StockAdjustmentForm";
import { products } from "@/data/products";
import { stockHistory } from "@/data/stockHistroy";
import { useState } from "react";

export default function InventoryPage() {
  const [filterProduct, setFilterProduct] = useState("");
  const [filterReason, setFilterReason] = useState("");

  const getProductName = (id: number) =>
    products.find((p) => p.id === id)?.name || "Unknown";

  const filteredHistory = stockHistory.filter((item) => {
    const matchProduct = filterProduct ? item.productId.toString() === filterProduct : true;
    const matchReason = filterReason ? item.reason === filterReason : true;
    return matchProduct && matchReason;
  });

  
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Inventory Management</h1>

      <section>
        <h2 className="text-lg font-semibold mb-2">Adjust Stock</h2>
        <StockAdjustmentForm />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Stock Movement History</h2>

        <div className="flex gap-4 flex-wrap text-sm mb-4">
          <label>
            Product:
            <select
              value={filterProduct}
              onChange={(e) => setFilterProduct(e.target.value)}
              className="ml-1 border rounded px-2 py-1"
            >
              <option value="">All</option>
              {products.map((p) => (
                <option key={p.id} value={p.id.toString()}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Reason:
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="ml-1 border rounded px-2 py-1"
            >
              <option value="">All</option>
              <option value="purchase">Purchase</option>
              <option value="loss">Loss</option>
              <option value="return">Return</option>
              <option value="manual">Manual</option>
            </select>
          </label>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="text-gray-500 italic">
            No stock movements recorded yet.
          </p>
        ) : (
          <div className="overflow-auto">
            <table className="w-full text-sm border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Product</th>
                  <th className="px-3 py-2">Qty</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2">Responsible</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-3 py-2">
                      {new Date(item.date).toLocaleString()}
                    </td>
                    <td className="px-3 py-2">
                      {getProductName(item.productId)}
                    </td>
                    <td className="px-3 py-2">
                      {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
                    </td>
                    <td className="px-3 py-2 capitalize">{item.reason}</td>
                    <td className="px-3 py-2">{item.responsible}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
