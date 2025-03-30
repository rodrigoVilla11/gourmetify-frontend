"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Props = {
  data: { shift: string; total: number }[];
};

export function SalesByShiftChart({ data }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-sm text-gray-600 font-medium mb-4">Sales by Shift</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="shift" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4f46e5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
