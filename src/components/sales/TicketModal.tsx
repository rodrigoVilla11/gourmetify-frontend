"use client";

import { Sale, salesHistory } from "@/data/salesHistory";
import { formatCurrency } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";

// Simulación de productos y combos (esto luego debería venir del store o backend)
const mockProducts = [
  { id: 1, name: "Gohan Clásico", price: 2500 },
  { id: 4, name: "Nigiri de Salmón", price: 3100 },
];

const mockCombos = [
  { id: 2, name: "Combo Fusión 15 piezas", price: 2800 },
  { id: 3, name: "Combo Clásico 10 piezas", price: 3300 },
];

function getItemDetails(item: { id: number; type: "product" | "combo" }) {
  if (item.type === "product") {
    const found = mockProducts.find((p) => p.id === item.id);
    return found
      ? { name: found.name, price: found.price }
      : { name: "Producto desconocido", price: 0 };
  } else {
    const found = mockCombos.find((c) => c.id === item.id);
    return found
      ? { name: found.name, price: found.price }
      : { name: "Combo desconocido", price: 0 };
  }
}

interface TicketModalProps {
  sale: Sale;
  open: boolean;
  onClose: () => void;
}

export default function TicketModal({ sale, open, onClose }: TicketModalProps) {
  const {
    id,
    date,
    shift,
    responsible,
    customer,
    paymentMethod,
    type,
    items,
    total,
  } = sale;

  const isDelivery = type === "delivery";
  const shippingCost = isDelivery ? sale.delivery.shippingCost : 0;

  const itemDetails = items.map((item) => {
    const { name, price } = getItemDetails(item);
    return {
      ...item,
      name,
      price,
      subtotal: price * item.quantity,
    };
  });

  const subtotal = itemDetails.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ticket #{id}</DialogTitle>
        </DialogHeader>

        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <span className="font-medium text-gray-700">Fecha:</span>{" "}
            {new Date(date).toLocaleString()}
          </p>
          <p>
            <span className="font-medium text-gray-700">Tipo:</span>{" "}
            {type === "delivery" ? "Delivery" : "Mostrador"}
          </p>
          <p>
            <span className="font-medium text-gray-700">Cliente:</span>{" "}
            {customer}
          </p>
          <p>
            <span className="font-medium text-gray-700">Responsable:</span>{" "}
            {responsible}
          </p>
          {shift && (
            <p>
              <span className="font-medium text-gray-700">Turno:</span> {shift}
            </p>
          )}
          <p>
            <span className="font-medium text-gray-700">Pago:</span>{" "}
            {paymentMethod}
          </p>
        </div>

        {isDelivery && (
          <div className="text-sm text-muted-foreground space-y-1 mt-4 border-t pt-3">
            <p className="font-semibold text-primary">Datos de envío:</p>
            <p>
              <span className="font-medium text-gray-700">Dirección:</span>{" "}
              {sale.delivery.address}
            </p>
            <p>
              <span className="font-medium text-gray-700">Teléfono:</span>{" "}
              {sale.delivery.phone}
            </p>
            <p>
              <span className="font-medium text-gray-700">Envío:</span>{" "}
              {formatCurrency(shippingCost)}
            </p>
          </div>
        )}

        <div className="mt-4 text-sm">
          <h4 className="font-semibold text-primary mb-2">Detalle de ítems:</h4>
          <ul className="divide-y divide-muted border rounded-md overflow-hidden">
            {itemDetails.map((item, i) => (
              <li
                key={i}
                className="flex justify-between px-3 py-2 bg-white dark:bg-zinc-900"
              >
                <div>
                  {item.quantity} x {item.name}
                  <span className="ml-2 text-xs text-muted-foreground">
                    (${formatCurrency(item.price)} c/u)
                  </span>
                </div>
                <div className="font-medium">
                  {formatCurrency(item.subtotal)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm mt-4 space-y-1">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          {isDelivery && (
            <div className="flex justify-between">
              <span>Envío:</span>
              <span>{formatCurrency(shippingCost)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-green-700 dark:text-green-400 pt-2 border-t">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
