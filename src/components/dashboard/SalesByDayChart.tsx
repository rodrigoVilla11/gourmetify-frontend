"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type Props = {
  data: { date: string; total: number }[];
};

export function SalesByDayChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow w-full">
      <h3 className="text-sm text-gray-600 font-medium mb-4">Sales - Last 7 Days</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#16a34a" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
