"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { CategoryModal } from "@/components/products/CategoryModal";

export type IngredienteSeleccionado = {
  id: number;
  nombre: string;
  unidad: string;
  cantidad: number;
  precioUnidad: number;
};

export type ProductFormData = {
  id?: number;
  nombre: string;
  categoria: string;
  stock: number;
  costo: number;
  precio: number;
  activo: boolean;
  ingredientes: IngredienteSeleccionado[];
  imagenes?: string[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProductFormData) => void;
  product?: ProductFormData | null;
};

const ingredientesDisponibles = [
  { id: 1, nombre: "Pan", unidad: "unidad", precioUnidad: 50 },
  { id: 2, nombre: "Carne", unidad: "g", precioUnidad: 1.5 },
  { id: 3, nombre: "Cheddar", unidad: "g", precioUnidad: 1 },
  { id: 4, nombre: "Lechuga", unidad: "hoja", precioUnidad: 0.5 },
  { id: 5, nombre: "Tomate", unidad: "rodaja", precioUnidad: 0.75 },
];
const categorias = [
  {
    id: 1,
    nombre: "Comida Rápida",
    descripcion: "Platos listos en pocos minutos",
    activo: true,
  },
  {
    id: 2,
    nombre: "Bebidas",
    descripcion: "Gaseosas, jugos, etc.",
    activo: true,
  },
];

export function ProductModal({ open, onClose, onSave, product }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    nombre: "",
    categoria: "",
    stock: 0,
    costo: 0,
    precio: 0,
    activo: true,
    ingredientes: [],
  });

  const [selectedIngredientId, setSelectedIngredientId] = useState<number>(0);
  const [selectedCantidad, setSelectedCantidad] = useState<number>(0);
  const [modalCategoriaOpen, setModalCategoriaOpen] = useState(false);
  // Calcular costo automáticamente
  useEffect(() => {
    const nuevoCosto = form.ingredientes.reduce(
      (acc, ing) => acc + ing.precioUnidad * ing.cantidad,
      0
    );
    setForm((prev) => ({ ...prev, costo: nuevoCosto }));
  }, [form.ingredientes]);

  useEffect(() => {
    if (product) setForm(product);
    else {
      setForm({
        nombre: "",
        categoria: "",
        stock: 0,
        costo: 0,
        precio: 0,
        activo: true,
        ingredientes: [],
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "nombre" || name === "categoria"
          ? value
          : parseFloat(value) || 0,
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
          <DialogTitle>
            {product ? "Editar producto" : "Nuevo producto"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Nombre del producto
            </label>
            <Input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Hamburguesa doble"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Categoría
            </label>
            <div className="flex gap-2">
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={form.categoria}
                onChange={(e) =>
                  setForm({ ...form, categoria: e.target.value })
                }
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.nombre}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setModalCategoriaOpen(true)}
              >
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Precio de venta
            </label>
            <Input
              name="precio"
              value={form.precio}
              onChange={handleChange}
              type="number"
              placeholder="Ej: 650"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Estado</label>
            <select
              name="activo"
              value={form.activo ? "true" : "false"}
              onChange={(e) =>
                setForm({ ...form, activo: e.target.value === "true" })
              }
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Costo automático (disabled) */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Costo calculado (automático)
            </label>
            <Input name="costo" value={form.costo.toFixed(2)} disabled />
          </div>

          {/* Ingredientes */}
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">
              Agregar ingredientes
            </label>
            <div className="flex gap-2">
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={selectedIngredientId}
                onChange={(e) =>
                  setSelectedIngredientId(Number(e.target.value))
                }
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
                  const ing = ingredientesDisponibles.find(
                    (i) => i.id === selectedIngredientId
                  );
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
                          precioUnidad: ing.precioUnidad,
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
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                >
                  <span>
                    {ing.nombre} — {ing.cantidad} {ing.unidad}
                  </span>
                  <button
                    className="text-sm text-red-500 hover:underline"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        ingredientes: prev.ingredientes.filter(
                          (_, idx) => idx !== i
                        ),
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
      <CategoryModal
        open={modalCategoriaOpen}
        onClose={() => setModalCategoriaOpen(false)}
      />
    </Dialog>
  );
}
