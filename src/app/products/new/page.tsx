"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export type IngredienteSeleccionado = {
  id: number;
  nombre: string;
  unidad: string;
  cantidad: number;
};

export type ProductFormData = {
  id?: number;
  nombre: string;
  stock: number;
  costo: number;
  precio: number;
  activo: boolean;
  ingredientes: IngredienteSeleccionado[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  product?: ProductFormData | null;
};

const ingredientesDisponibles = [
  { id: 1, nombre: "Pan", unidad: "unidad" },
  { id: 2, nombre: "Carne", unidad: "g" },
  { id: 3, nombre: "Queso", unidad: "g" },
  { id: 4, nombre: "Lechuga", unidad: "hoja" },
  { id: 5, nombre: "Tomate", unidad: "rodaja" },
];

export function ProductModal({ open, onClose, onSave, product }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    nombre: "",
    stock: 0,
    costo: 0,
    precio: 0,
    activo: true,
    ingredientes: [],
  });

  const [selectedIngredientId, setSelectedIngredientId] = useState<number>(0);
  const [selectedCantidad, setSelectedCantidad] = useState<number>(0);

  useEffect(() => {
    if (product) setForm(product);
    else {
      setForm({ nombre: "", stock: 0, costo: 0, precio: 0, activo: true, ingredientes: [] });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "nombre" ? value : parseFloat(value) || 0,
    });
  };

  const handleSubmit = () => {
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{product ? "Editar producto" : "Nuevo producto"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Nombre del producto</label>
            <Input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Hamburguesa doble" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Precio de costo</label>
            <Input name="costo" value={form.costo} onChange={handleChange} type="number" placeholder="Ej: 320" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Precio de venta</label>
            <Input name="precio" value={form.precio} onChange={handleChange} type="number" placeholder="Ej: 650" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Stock inicial</label>
            <Input name="stock" value={form.stock} onChange={handleChange} type="number" placeholder="Ej: 100" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Estado</label>
            <select
              value={form.activo ? "true" : "false"}
              onChange={(e) => setForm({ ...form, activo: e.target.value === "true" })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Ingredientes */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Agregar ingredientes</label>
            <div className="flex gap-2">
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={selectedIngredientId}
                onChange={(e) => setSelectedIngredientId(Number(e.target.value))}
              >
                <option value="">Seleccionar</option>
                {ingredientesDisponibles.map((ing) => (
                  <option key={ing.id} value={ing.id}>
                    {ing.nombre} ({ing.unidad})
                  </option>
                ))}
              </select>
              <Input
                type="number"
                min="0"
                className="w-28"
                placeholder="Cantidad"
                value={selectedCantidad}
                onChange={(e) => setSelectedCantidad(Number(e.target.value))}
              />
              <Button
                variant="secondary"
                onClick={() => {
                  const ing = ingredientesDisponibles.find((i) => i.id === selectedIngredientId);
                  if (ing && selectedCantidad > 0) {
                    setForm((prev) => ({
                      ...prev,
                      ingredientes: [
                        ...prev.ingredientes,
                        {
                          id: ing.id,
                          nombre: ing.nombre,
                          unidad: ing.unidad,
                          cantidad: selectedCantidad,
                        },
                      ],
                    }));
                    setSelectedCantidad(0);
                    setSelectedIngredientId(0);
                  }
                }}
              >
                Agregar
              </Button>
            </div>

            <ul className="text-sm mt-2 space-y-1">
              {form.ingredientes.map((ing, i) => (
                <li key={i} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded">
                  <span>
                    {ing.nombre} — {ing.cantidad} {ing.unidad}
                  </span>
                  <button
                    className="text-sm text-red-500 hover:underline"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        ingredientes: prev.ingredientes.filter((_, idx) => idx !== i),
                      }))
                    }
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            Guardar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
