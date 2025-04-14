"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: { date: string; total: number }[];
  title?: string;
}

export function SalesEvolutionChart({
  data,
  title = "Evolución de Ventas (por día)",
}: Props) {
  const formattedData = data.map((d) => ({
    ...d,
    label: d.date, // puede ser '04-12' por ejemplo
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <div className="w-full min-h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
