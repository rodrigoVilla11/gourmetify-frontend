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
import { Ingredient } from "@/types/Ingredient";
import { Product, ProductIngredient } from "@/types/Product";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Product> & { ingredients: ProductIngredient[] }) => void;
  product?: Product | null;
  ingredientsDisponibles: Ingredient[];
  categorias: { id: number; name: string }[];
};

export function ProductModal({
  open,
  onClose,
  onSave,
  product,
  ingredientsDisponibles,
  categorias,
}: Props) {
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    categoryId: 0,
    price: 0,
    stock: 0,
    active: true,
    ingredients: [],
  });

  const [modalCategoriaOpen, setModalCategoriaOpen] = useState(false);
  const [selectedIngredientId, setSelectedIngredientId] = useState(0);
  const [selectedCantidad, setSelectedCantidad] = useState(0);

  useEffect(() => {
    if (product) {
      setForm({ ...product, ingredients: product.ingredients || [] });
    } else {
      setForm({
        name: "",
        categoryId: 0,
        price: 0,
        stock: 0,
        active: true,
        ingredients: [],
      });
    }
  }, [product]);

  const calcularCosto = () => {
    return (
      form.ingredients?.reduce(
        (acc, pi) => acc + pi.quantity * pi.ingredient.cost,
        0
      ) ?? 0
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "name"
        ? value
        : name === "categoryId"
        ? parseInt(value)
        : name === "active"
        ? value === "true"
        : parseFloat(value),
    }));
  };

  const handleAddIngredient = () => {
    const ingrediente = ingredientsDisponibles.find((i) => i.id === selectedIngredientId);
    if (!ingrediente || selectedCantidad <= 0) return;

    setForm((prev) => ({
      ...prev,
      ingredients: [
        ...(prev.ingredients || []),
        {
          id: Date.now(), // Temporal para React
          ingredient: ingrediente,
          quantity: selectedCantidad,
        },
      ],
    }));

    setSelectedCantidad(0);
    setSelectedIngredientId(0);
  };

  const handleRemoveIngredient = (index: number) => {
    setForm((prev) => ({
      ...prev,
      ingredients: (prev.ingredients || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    const finalPayload = {
      ...form,
      cost: calcularCosto(),
      ingredients: form.ingredients || [],
    };
    onSave(finalPayload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Editar producto" : "Nuevo producto"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm mb-1">Nombre</label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ej: Hamburguesa"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm mb-1">Categoría</label>
            <div className="flex gap-2">
              <select
                name="categoryId"
                className="w-full border px-3 py-2 text-sm rounded"
                value={form.categoryId}
                onChange={handleChange}
              >
                <option value={0}>Seleccionar categoría</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <Button size="sm" variant="outline" onClick={() => setModalCategoriaOpen(true)}>
                +
              </Button>
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm mb-1">Precio</label>
            <Input
              name="price"
              type="number"
              value={form.price ?? 0}
              onChange={handleChange}
              placeholder="Ej: 1500"
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm mb-1">Estado</label>
            <select
              name="active"
              className="w-full border px-3 py-2 text-sm rounded"
              value={form.active ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Costo calculado */}
          <div>
            <label className="block text-sm mb-1">Costo (automático)</label>
            <Input value={calcularCosto().toFixed(2)} disabled />
          </div>

          {/* Ingredientes */}
          <div className="space-y-2">
            <label className="block text-sm">Ingredientes</label>
            <div className="flex gap-2">
              <select
                className="flex-1 border rounded px-2 py-1 text-sm"
                value={selectedIngredientId}
                onChange={(e) => setSelectedIngredientId(parseInt(e.target.value))}
              >
                <option value={0}>Seleccionar</option>
                {ingredientsDisponibles.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.name} ({i.unit})
                  </option>
                ))}
              </select>
              <Input
                type="number"
                min={1}
                placeholder="Cantidad"
                value={selectedCantidad}
                onChange={(e) => setSelectedCantidad(Number(e.target.value))}
                className="w-24"
              />
              <Button variant="secondary" onClick={handleAddIngredient}>
                Agregar
              </Button>
            </div>

            <ul className="text-sm space-y-1">
              {form.ingredients?.map((pi, index) => (
                <li
                  key={pi.id}
                  className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded"
                >
                  <span>
                    {pi.ingredient.name} — {pi.quantity} {pi.ingredient.unit}
                  </span>
                  <button
                    className="text-xs text-red-600 hover:underline"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Quitar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <Button className="w-full mt-4" onClick={handleSubmit}>
            Guardar producto
          </Button>
        </div>
      </DialogContent>

      <CategoryModal open={modalCategoriaOpen} onClose={() => setModalCategoriaOpen(false)} />
    </Dialog>
  );
}
