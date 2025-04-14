"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";

export type Category = {
  id: number;
  nombre: string;
  descripcion: string;
  activo: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CategoryModal({ open, onClose }: Props) {
  const [categorias, setCategorias] = useState<Category[]>([
    { id: 1, nombre: "Comida Rápida", descripcion: "Platos listos en pocos minutos", activo: true },
    { id: 2, nombre: "Bebidas", descripcion: "Gaseosas, jugos, etc.", activo: true },
  ]);

  const [form, setForm] = useState({ nombre: "", descripcion: "", activo: true });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!open) {
      setForm({ nombre: "", descripcion: "", activo: true });
      setEditIndex(null);
    }
  }, [open]);

  const handleSave = () => {
    if (editIndex !== null) {
      const updated = [...categorias];
      updated[editIndex] = { ...updated[editIndex], ...form };
      setCategorias(updated);
    } else {
      setCategorias((prev) => [
        ...prev,
        { id: Date.now(), ...form }
      ]);
    }
    setForm({ nombre: "", descripcion: "", activo: true });
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setForm(categorias[index]);
    setEditIndex(index);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gestionar Categorías</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Formulario */}
          <div className="space-y-3">
            <Input
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <Input
              placeholder="Descripción"
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={form.activo}
                onCheckedChange={(val) => setForm({ ...form, activo: val })}
              />
              <span>{form.activo ? "Activo" : "Inactivo"}</span>
            </div>
            <Button className="w-full" onClick={handleSave}>
              {editIndex !== null ? "Guardar cambios" : "Crear categoría"}
            </Button>
          </div>

          {/* Lista de categorías */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Categorías actuales</h3>
            <ul className="space-y-2 text-sm">
              {categorias.map((cat, idx) => (
                <li key={cat.id} className="flex justify-between items-center border rounded px-3 py-2">
                  <div>
                    <p className="font-medium">{cat.nombre}</p>
                    <p className="text-gray-500 text-xs">{cat.descripcion}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${cat.activo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {cat.activo ? "Activo" : "Inactivo"}
                    </span>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(idx)}>
                      Editar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
