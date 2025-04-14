"use client";

import { useState, useEffect } from "react";
import { salesHistory } from "@/data/salesHistory";

interface Props {
  value: {
    range: string;
    startDate: string;
    endDate: string;
    shift: string;
    responsible: string;
  };
  onChange: (value: Props["value"]) => void;
}

export function DashboardFilters({ value, onChange }: Props) {
  const [local, setLocal] = useState(value);

  // Extraemos responsables únicos del historial de ventas
  const responsables = Array.from(
    new Set(salesHistory.map((s) => s.responsible))
  ).sort();

  useEffect(() => {
    onChange(local);
  }, [local]);

  return (
    <div className="flex flex-wrap items-end gap-4 text-sm">
      <div>
        <label className="block font-medium mb-1">Rango de fechas</label>
        <select
          value={local.range}
          onChange={(e) =>
            setLocal((prev) => ({ ...prev, range: e.target.value }))
          }
          className="border rounded px-3 py-2"
        >
          <option value="all">Todo el tiempo</option>
          <option value="today">Hoy</option>
          <option value="last7">Últimos 7 días</option>
          <option value="month">Este mes</option>
          <option value="custom">Personalizado</option>
        </select>
      </div>

      {local.range === "custom" && (
        <>
          <div>
            <label className="block font-medium mb-1">Desde</label>
            <input
              type="date"
              value={local.startDate}
              onChange={(e) =>
                setLocal((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Hasta</label>
            <input
              type="date"
              value={local.endDate}
              onChange={(e) =>
                setLocal((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="border rounded px-3 py-2"
            />
          </div>
        </>
      )}

      <div>
        <label className="block font-medium mb-1">Turno</label>
        <select
          value={local.shift}
          onChange={(e) =>
            setLocal((prev) => ({ ...prev, shift: e.target.value }))
          }
          className="border rounded px-3 py-2"
        >
          <option value="">Todos</option>
          <option value="morning">Mañana</option>
          <option value="afternoon">Tarde</option>
          <option value="night">Noche</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-1">Responsable</label>
        <select
          value={local.responsible}
          onChange={(e) =>
            setLocal((prev) => ({ ...prev, responsible: e.target.value }))
          }
          className="border rounded px-3 py-2"
        >
          <option value="">Todos</option>
          {responsables.map((resp) => (
            <option key={resp} value={resp}>
              {resp}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
