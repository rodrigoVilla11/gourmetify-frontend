"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { CreateComboDto } from "@/types/Combo"; // Asegurate que esté bien importado

type Producto = {
  id: number;
  name: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (combo: CreateComboDto) => void;
  productosDisponibles: Producto[];
  combo?: CreateComboDto | null;
};

export function ComboModal({ open, onClose, onSave, productosDisponibles,  combo }: Props) {
  const [form, setForm] = useState<CreateComboDto>({
    name: "",
    price: 0,
    cost: 0, // este lo vas a calcular en el backend
    categoryId: 1, // podés poner un selector si lo deseas
    active: true,
    items: [],
  });

  const [productoId, setProductoId] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(1);
  
  useEffect(() => {
    if (open) {
      if (combo) {
        setForm(combo); // <-- usa el combo si viene
      } else {
        // reset si es nuevo
        setForm({
          name: "",
          price: 0,
          cost: 0,
          categoryId: 1,
          active: true,
          items: [],
        });
      }
      setProductoId(0);
      setCantidad(1);
    }
  }, [open, combo]);

  const agregarProducto = () => {
    if (productoId === 0 || cantidad <= 0) return;

    const yaExiste = form.items.some((i) => i.productId === productoId);
    if (yaExiste) return;

    setForm((prev) => ({
      ...prev,
      items: [...prev.items, { productId: productoId, quantity: cantidad }],
    }));

    setProductoId(0);
    setCantidad(1);
  };

  const quitarProducto = (productId: number) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.productId !== productId),
    }));
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-6">
        <DialogHeader>
          <DialogTitle>Nuevo combo</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Nombre del combo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <div className="flex items-center gap-3">
          <Switch
            checked={form.active}
            onCheckedChange={(val) => setForm({ ...form, active: val })}
          />
          <span className={form.active ? "text-green-600" : "text-red-600"}>
            {form.active ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={productoId}
            onChange={(e) => setProductoId(Number(e.target.value))}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value={0}>Seleccionar producto</option>
            {productosDisponibles.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <Input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            placeholder="Cantidad"
          />
        </div>

        <Button variant="outline" onClick={agregarProducto}>
          + Agregar producto
        </Button>

        <ul className="text-sm space-y-1">
          {form.items.map((item) => {
            const nombre = productosDisponibles.find((p) => p.id === item.productId)?.name || "Desconocido";
            return (
              <li key={item.productId} className="flex justify-between border-b py-1 text-gray-800">
                <span>{nombre} x{item.quantity}</span>
                <button
                  onClick={() => quitarProducto(item.productId)}
                  className="text-red-500 text-xs"
                >
                  Quitar
                </button>
              </li>
            );
          })}
        </ul>

        <Input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) })}
          placeholder="Precio final del combo"
        />

        <Button className="w-full" onClick={handleSubmit}>
          Guardar combo
        </Button>
      </DialogContent>
    </Dialog>
  );
}
