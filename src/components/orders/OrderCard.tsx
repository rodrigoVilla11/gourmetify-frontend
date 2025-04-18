"use client";

import { Order } from "@/data/orders";
import { formatCurrency } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { MessageSquareText } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";

interface Props {
  order: Order;
  onNextStatus: (id: string) => void;
  dragHandleProps?: any;
  className?: string;
}

const statusLabels: Record<Order["status"], string> = {
  pending: "🕐 Pendiente",
  preparing: "👨‍🍳 En preparación",
  ready: "✅ Listo",
  delivered: "📦 Entregado",
};

function getMinutesAgo(dateStr: string): number {
  const now = new Date();
  const then = new Date(dateStr);
  return Math.floor((now.getTime() - then.getTime()) / 60000);
}

function getPriorityBorder(mins: number): string {
  if (mins < 10) return "border-green-400";
  if (mins < 20) return "border-yellow-400";
  return "border-red-400";
}

export const OrderCard = forwardRef<HTMLDivElement, Props>(
  ({ order, onNextStatus, dragHandleProps, className = "" }, ref) => {
    const minsAgo = getMinutesAgo(order.createdAt);
    const borderColor = getPriorityBorder(minsAgo);

    const handleWhatsApp = () => {
      const message = `Hola ${order.customer}, tu pedido está ${statusLabels[order.status].toLowerCase()}! Total: ${formatCurrency(order.total)}.`;
      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    };

    return (
      <div
        ref={ref}
        {...dragHandleProps}
        className={`bg-white dark:bg-zinc-900 rounded-xl shadow ring-2 ${borderColor} p-4 space-y-2 ${className}`}
      >
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-primary">{order.customer}</h2>
            <p className="text-sm text-muted-foreground">{statusLabels[order.status]}</p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>{new Date(order.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
            <p className="capitalize">{order.origin}</p>
          </div>
        </div>

        <ul className="text-sm pl-4 list-disc">
          {order.products.map((p, i) => (
            <li key={i}>{p.quantity}x {p.name}</li>
          ))}
        </ul>

        {order.notes && <p className="text-xs italic text-muted-foreground">Nota: {order.notes}</p>}

        <div className="flex justify-between items-center pt-2">
          <span className="text-lg font-bold text-green-700 dark:text-green-400">
            {formatCurrency(order.total)}
          </span>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" onClick={handleWhatsApp} title="Enviar por WhatsApp">
              <MessageSquareText className="w-4 h-4" />
            </Button>
            {order.status !== "delivered" && (
              <Button size="sm" onClick={() => onNextStatus(order.id)}>
                Avanzar estado
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

OrderCard.displayName = "OrderCard";
