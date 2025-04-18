"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface Props {
  query: string;
  status: string;
  onQueryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function OrderFilters({ query, status, onQueryChange, onStatusChange }: Props) {
  return (
    <div className="flex flex-wrap gap-4 items-end text-sm mb-6">
      <div>
        <Label className="mb-1 block">Buscar cliente</Label>
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Ej. Juan"
          className="w-48"
        />
      </div>

      <div>
        <Label className="mb-1 block">Estado</Label>
        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-40 border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950 border-gray-300 dark:border-zinc-700"
        >
          <option value="">Todos</option>
          <option value="pending">Pendientes</option>
          <option value="preparing">En preparación</option>
          <option value="ready">Listos</option>
          <option value="delivered">Entregados</option>
        </select>
      </div>
    </div>
  );
}
