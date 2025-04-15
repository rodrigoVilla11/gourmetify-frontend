"use client";

import { OrderItem } from "./PriceListTable";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/format";

interface Props {
  items: OrderItem[];
  providerName?: string;
}

export function WhatsAppPreview({ items, providerName }: Props) {
  const message = useMemo(() => {
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const header = `Hola ${providerName ?? ""} 👋🏼\n\nQuisiera hacerte un pedido para hoy ${date} a las ${time}:\n`;

    const body = items
      .map(
        (item) =>
          `• ${item.name} — ${item.quantity} ${item.unit} x ${formatCurrency(item.price)} = ${formatCurrency(item.quantity * item.price)}`
      )
      .join("\n");

    const total = items.reduce((sum, i) => sum + i.quantity * i.price, 0);

    const footer = `\n\n🧾 Total: ${formatCurrency(total)}\n\n¡Gracias! 🙌🏼`;

    return header + body + footer;
  }, [items, providerName]);

  return (
    <div className="mt-6 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted space-y-2">
      <h2 className="text-lg font-semibold text-primary mb-2">Mensaje para WhatsApp</h2>
      <textarea
        value={message}
        readOnly
        rows={items.length + 6}
        className="w-full text-sm p-3 border rounded resize-none bg-zinc-50 dark:bg-zinc-800"
      />
    </div>
  );
}
