"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export type EditStockModalProps = {
  open: boolean;
  onClose: () => void;
  stock: number;
  productName: string;
  onSave: (newStock: number) => void;
};

export function EditStockModal({ open, onClose, stock, productName, onSave }: EditStockModalProps) {
  const [newStock, setNewStock] = useState(stock);

  useEffect(() => {
    setNewStock(stock);
  }, [stock]);

  const handleSubmit = () => {
    onSave(newStock);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Editar stock</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Producto: <strong>{productName}</strong>
          </p>
          <Input
            type="number"
            value={newStock}
            onChange={(e) => setNewStock(parseInt(e.target.value))}
            min={0}
            placeholder="Cantidad"
          />
          <Button className="w-full" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
