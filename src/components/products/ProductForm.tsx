"use client";

import { useState } from "react";
import { initialCategories } from "@/data/categories"; // Podrías reemplazar por fetch real
import { CreateProductDto } from "@/types/Product"; // Usá el DTO real que definiste

type Props = {
  onCreate: (product: CreateProductDto) => void;
};

export function ProductForm({ onCreate }: Props) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    categoryId: "",
    unit: "unit",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: CreateProductDto = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
      unit: form.unit,
      image: form.image.trim() || undefined,
      active: true,
    };

    onCreate(newProduct);
    setForm({
      name: "",
      price: "",
      stock: "",
      categoryId: "",
      unit: "unit",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Nombre del producto"
        className="w-full border px-4 py-2 rounded-lg"
        required
      />

      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Precio de venta"
        type="number"
        className="w-full border px-4 py-2 rounded-lg"
        required
      />

      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock inicial"
        type="number"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded-lg"
        required
      >
        <option value="">Seleccionar categoría</option>
        {initialCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        name="unit"
        value={form.unit}
        onChange={handleChange}
        placeholder="Unidad de medida (ej: unidad, kg, g)"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="URL de la imagen"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Crear producto
      </button>
    </form>
  );
}
