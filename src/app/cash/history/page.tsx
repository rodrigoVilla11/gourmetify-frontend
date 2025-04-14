"use client";

import { useMemo, useState } from "react";
import { cashSessions, CashSession } from "@/data/cash";
import { SessionCard } from "@/components/cash/SessionCard";
import { SessionDetailModal } from "@/components/cash/SessionDetailModal";

export default function CashHistoryPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [responsible, setResponsible] = useState("");
  const [shift, setShift] = useState("");

  const [selectedSession, setSelectedSession] = useState<CashSession | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const responsables = Array.from(
    new Set(cashSessions.map((s) => s.responsible))
  );

  const filtered = useMemo(() => {
    return cashSessions.filter((s) => {
      const sessionDate = s.date;

      const matchStart = !startDate || sessionDate >= startDate;
      const matchEnd = !endDate || sessionDate <= endDate;
      const matchResp = !responsible || s.responsible === responsible;
      const matchShift = !shift || s.shift === shift;

      return matchStart && matchEnd && matchResp && matchShift;
    });
  }, [startDate, endDate, responsible, shift]);

  return (
    <div className="p-4 md:p-8 space-y-8">
      <h1 className="text-2xl font-bold text-primary">Historial de Cajas Cerradas</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-end text-sm">
        <div>
          <label className="block font-medium mb-1">Desde</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Hasta</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Turno</label>
          <select
            value={shift}
            onChange={(e) => setShift(e.target.value)}
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
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">Todos</option>
            {responsables.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de sesiones */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <p className="italic text-muted-foreground">
            No hay sesiones para mostrar.
          </p>
        ) : (
          filtered
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((session) => (
              <SessionCard
                key={session.id}
                session={session}
                onViewDetail={() => {
                  setSelectedSession(session);
                  setModalOpen(true);
                }}
              />
            ))
        )}
      </div>

      <SessionDetailModal
        session={selectedSession}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedSession(null);
        }}
      />
    </div>
  );
}
