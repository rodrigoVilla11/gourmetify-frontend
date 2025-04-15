"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { useState } from "react";
import { InventoryItem } from "@/data/inventory";

interface Props {
  open: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSubmit: (data: {
    itemId: number;
    type: "purchase" | "loss" | "return";
    quantity: number;
    reason: string;
  }) => void;
}

export function AdjustStockModal({ open, onClose, item, onSubmit }: Props) {
  const [type, setType] = useState<"purchase" | "loss" | "return">("purchase");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    const qty = parseFloat(quantity);
    if (!item || !qty || qty <= 0) return;

    onSubmit({
      itemId: item.id,
      type,
      quantity: qty,
      reason,
    });

    // Reset y cerrar
    setQuantity("");
    setReason("");
    setType("purchase");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajustar stock de: {item?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <Label>Tipo de ajuste</Label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950"
            >
              <option value="purchase">Compra / ingreso</option>
              <option value="loss">Pérdida / merma</option>
              <option value="return">Devolución</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Cantidad</Label>
            <Input
              type="number"
              step="0.01"
              placeholder={`Ej: 1.5 ${item?.unit ?? ""}`}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Motivo</Label>
            <Input
              placeholder="Ej: compra mayorista, producto vencido..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Guardar ajuste</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
