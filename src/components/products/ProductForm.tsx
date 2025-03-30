// /src/components/products/ProductForm.tsx

"use client";

import { useState } from "react";
import { initialCategories } from "@/data/categories";

type Props = {
  onCreate: (product: any) => void;
};

export function ProductForm({ onCreate }: Props) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    cost: "",
    stock: "",
    categoryId: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      id: Math.floor(Math.random() * 10000),
      name: form.name.trim(),
      price: Number(form.price),
      cost: Number(form.cost),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
      unit: "unit",
      image: form.image.trim(),
    };

    onCreate(newProduct);
    setForm({
      name: "",
      price: "",
      cost: "",
      stock: "",
      categoryId: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Product name"
        className="w-full border px-4 py-2 rounded-lg"
        required
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="Selling price"
        type="number"
        className="w-full border px-4 py-2 rounded-lg"
        required
      />
      <input
        name="cost"
        value={form.cost}
        onChange={handleChange}
        placeholder="Cost price"
        type="number"
        className="w-full border px-4 py-2 rounded-lg"
      />
      <input
        name="stock"
        value={form.stock}
        onChange={handleChange}
        placeholder="Initial stock"
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
        <option value="">Select category</option>
        {initialCategories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        name="image"
        value={form.image}
        onChange={handleChange}
        placeholder="Image URL"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <button
        type="submit"
        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
      >
        Create Product
      </button>
    </form>
  );
}
