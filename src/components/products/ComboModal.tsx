"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

type Producto = {
  id: number;
  nombre: string;
};

export type Combo = {
  id?: number;
  nombre: string;
  productos: {
    id: number;
    nombre: string;
    cantidad: number;
  }[];
  precio: number;
  activo: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (combo: Combo) => void;
  combo?: Combo | null;
  productosDisponibles: Producto[];
};

export function ComboModal({ open, onClose, onSave, combo, productosDisponibles }: Props) {
  const [form, setForm] = useState<Combo>({
    nombre: "",
    productos: [],
    precio: 0,
    activo: true,
  });

  const [productoId, setProductoId] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(1);

  useEffect(() => {
    if (combo) setForm(combo);
    else setForm({ nombre: "", productos: [], precio: 0, activo: true });
  }, [combo]);

  const agregarProducto = () => {
    const producto = productosDisponibles.find(p => p.id === productoId);
    if (!producto || cantidad <= 0) return;

    if (form.productos.some(p => p.id === productoId)) return;

    setForm(prev => ({
      ...prev,
      productos: [...prev.productos, { id: producto.id, nombre: producto.nombre, cantidad }],
    }));

    setProductoId(0);
    setCantidad(1);
  };

  const quitarProducto = (id: number) => {
    setForm(prev => ({
      ...prev,
      productos: prev.productos.filter(p => p.id !== id),
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
          <DialogTitle>{combo ? "Editar combo" : "Nuevo combo"}</DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Nombre del combo"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />

        <div className="flex items-center gap-3">
          <Switch
            checked={form.activo}
            onCheckedChange={(val) => setForm({ ...form, activo: val })}
          />
          <span className={form.activo ? "text-green-600" : "text-red-600"}>
            {form.activo ? "Activo" : "Inactivo"}
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
                {p.nombre}
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
          {form.productos.map((p) => (
            <li key={p.id} className="flex justify-between border-b py-1 text-gray-800">
              <span>{p.nombre} x{p.cantidad}</span>
              <button onClick={() => quitarProducto(p.id)} className="text-red-500 text-xs">Quitar</button>
            </li>
          ))}
        </ul>

        <Input
          type="number"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: parseFloat(e.target.value) })}
          placeholder="Precio final del combo"
        />

        <Button className="w-full" onClick={handleSubmit}>
          Guardar combo
        </Button>
      </DialogContent>
    </Dialog>
  );
}
