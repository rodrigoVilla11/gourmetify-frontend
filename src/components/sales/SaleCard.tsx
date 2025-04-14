"use client";

import { salesHistory } from "@/data/salesHistory";

type Sale = typeof salesHistory[0];

interface SaleCardProps {
  sale: Sale;
  onView: () => void;
}

export default function SaleCard({ sale, onView }: SaleCardProps) {
  return (
    <li className="flex justify-between items-center bg-white dark:bg-zinc-900 px-4 py-3 rounded-xl shadow-sm ring-1 ring-muted">
      <div>
        <p className="font-medium text-sm text-primary">{sale.id}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(sale.date).toLocaleString()} — {sale.responsible}
        </p>
      </div>
      <div className="flex gap-6 items-center">
        <span className="font-bold text-green-700 dark:text-green-400">
          ${sale.total}
        </span>
        <button
          onClick={onView}
          className="text-sm text-blue-600 hover:underline"
        >
          Ver
        </button>
      </div>
    </li>
  );
}
