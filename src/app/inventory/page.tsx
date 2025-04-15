"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { InventoryItem } from "@/data/inventory";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AdjustStockModal } from "@/components/inventory/AdjustStockModal";
import { InventoryFilters } from "@/components/inventory/InventoryFilters";
import { Button } from "@/components/ui/Button";

const initialItems: InventoryItem[] = [
  { id: 1, name: "Salmón fresco", stock: 3.2, unit: "kg", minimumStock: 2 },
  { id: 2, name: "Arroz para sushi", stock: 8, unit: "kg", minimumStock: 5 },
  { id: 3, name: "Palta", stock: 12, unit: "u", minimumStock: 10 },
  { id: 4, name: "Queso crema", stock: 4.5, unit: "kg" },
];

export default function InventoryPage() {
  const router = useRouter();
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [query, setQuery] = useState("");
  const [unit, setUnit] = useState("");
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesUnit = !unit || item.unit === unit;
      const matchesStock =
        !onlyLowStock || (item.minimumStock && item.stock < item.minimumStock);
      return matchesQuery && matchesUnit && matchesStock;
    });
  }, [items, query, unit, onlyLowStock]);

  const handleAdjustStock = (data: {
    itemId: number;
    type: "purchase" | "loss" | "return";
    quantity: number;
    reason: string;
  }) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== data.itemId) return item;
        const newStock =
          data.type === "purchase"
            ? item.stock + data.quantity
            : item.stock - data.quantity;
        return { ...item, stock: Math.max(0, newStock) };
      })
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Inventario</h1>
        <Button onClick={() => router.push("/inventory/adjustments")}>Ver historial</Button>
      </div>

      <InventoryFilters
        query={query}
        onQueryChange={setQuery}
        unit={unit}
        onUnitChange={setUnit}
        onlyLowStock={onlyLowStock}
        onToggleLowStock={() => setOnlyLowStock(!onlyLowStock)}
      />

      <InventoryTable
        items={filteredItems}
        onAdjust={(id) => {
          const item = items.find((i) => i.id === id);
          setSelectedItem(item ?? null);
          setShowModal(true);
        }}
      />

      <AdjustStockModal
        open={showModal}
        onClose={() => setShowModal(false)}
        item={selectedItem}
        onSubmit={handleAdjustStock}
      />
    </div>
  );
}