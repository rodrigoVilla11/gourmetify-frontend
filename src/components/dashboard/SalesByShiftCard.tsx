"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  data: { shift: string; total: number }[];
}

export function SalesByShiftChart({ data }: Props) {
  const shiftLabels: Record<string, string> = {
    morning: "Mañana",
    afternoon: "Tarde",
    night: "Noche",
    unknown: "Otro",
  };

  const displayData = data.map((item) => ({
    ...item,
    shift: shiftLabels[item.shift] || item.shift,
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h3 className="text-lg font-semibold mb-4 text-primary">Ventas por Turno</h3>
      <div className="w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={displayData}>
            <XAxis dataKey="shift" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="total" fill="#144336" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
