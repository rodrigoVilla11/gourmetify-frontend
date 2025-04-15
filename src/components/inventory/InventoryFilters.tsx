"use client";

import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  unit: string;
  onUnitChange: (unit: string) => void;
  onlyLowStock: boolean;
  onToggleLowStock: () => void;
}

export function InventoryFilters({
  query,
  onQueryChange,
  unit,
  onUnitChange,
  onlyLowStock,
  onToggleLowStock,
}: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <Label>Buscar</Label>
        <Input
          placeholder="Buscar insumo..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="w-56"
        />
      </div>

      <div>
        <Label>Unidad</Label>
        <select
          value={unit}
          onChange={(e) => onUnitChange(e.target.value)}
          className="w-40 border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950"
        >
          <option value="">Todas</option>
          <option value="kg">Kilogramos</option>
          <option value="g">Gramos</option>
          <option value="l">Litros</option>
          <option value="ml">Mililitros</option>
          <option value="u">Unidades</option>
        </select>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <input
          type="checkbox"
          checked={onlyLowStock}
          onChange={onToggleLowStock}
          id="lowStock"
        />
        <Label htmlFor="lowStock">Solo stock bajo</Label>
      </div>
    </div>
  );
}
