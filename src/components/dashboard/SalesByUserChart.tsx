"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface Props {
  data: { user: string; total: number }[];
}

export function SalesByUserChart({ data }: Props) {
  const chartData = data.map((item) => ({
    user: item.user,
    total: item.total,
  }));

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h3 className="text-lg font-semibold mb-4 text-primary">Ventas por Responsable</h3>
      <div className="w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 0, right: 20, left: 20, bottom: 0 }}
          >
            <XAxis type="number" stroke="#888" />
            <YAxis dataKey="user" type="category" stroke="#888" />
            <Tooltip />
            <Bar dataKey="total" fill="#2563eb" radius={[0, 4, 4, 0]}>
              <LabelList dataKey="total" position="right" formatter={(v: any) => `$${v}`} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
