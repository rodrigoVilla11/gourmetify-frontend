"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

type CartItemType = {
  id: number;
  quantity: number;
  type: "product" | "combo";
};

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItemType[];
  total: number;
  subtotal?: number;
  discount?: number;
  surcharge?: number;
  shippingCost?: number;
  notes?: string;
  isPercentage?: boolean;
  customer?: string;
  paymentMethod?: string;
  onConfirm: () => void;
};


export function TicketPreviewModal({
  open,
  onClose,
  items,
  total,
  subtotal,
  surcharge,
  discount,
  shippingCost,
  notes,
  isPercentage,
  customer,
  paymentMethod,
  onConfirm,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-6">
        <DialogHeader>
          <DialogTitle>🎫 Vista previa del ticket</DialogTitle>
        </DialogHeader>
  
        <div className="text-sm text-gray-700 space-y-1">
          {customer && (
            <p>
              <span className="font-medium">Cliente:</span> {customer}
            </p>
          )}
          {paymentMethod && (
            <p>
              <span className="font-medium">Método de pago:</span> {paymentMethod}
            </p>
          )}
          {notes && (
            <p>
              <span className="font-medium">Notas:</span> {notes}
            </p>
          )}
        </div>
  
        {/* Detalle de items */}
        <ul className="divide-y text-sm border rounded-md overflow-hidden">
          {items.map((item, index) => (
            <li key={index} className="py-2 px-3 flex justify-between">
              <span>
                {item.type === "product" ? "🧾 Producto" : "🎁 Combo"} #{item.id}
              </span>
              <span>x{item.quantity}</span>
            </li>
          ))}
        </ul>
  
        {/* Totales */}
        <div className="text-sm text-gray-700 space-y-1">
          {typeof subtotal === "number" && (
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
          )}
          {typeof discount === "number" && discount > 0 && (
            <p className="text-green-700">
              - Descuento: ${discount.toFixed(2)}{" "}
              {isPercentage && <span>(%)</span>}
            </p>
          )}
          {typeof surcharge === "number" && surcharge > 0 && (
            <p className="text-red-700">
              + Recargo: ${surcharge.toFixed(2)}{" "}
              {isPercentage && <span>(%)</span>}
            </p>
          )}
          {typeof shippingCost === "number" && shippingCost > 0 && (
            <p>+ Envío: ${shippingCost.toFixed(2)}</p>
          )}
          <p className="text-lg font-bold text-right pt-2">
            Total: <span className="text-primary">${total.toFixed(2)}</span>
          </p>
        </div>
  
        {/* Botones */}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={onConfirm}>Confirmar venta</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
  
}
