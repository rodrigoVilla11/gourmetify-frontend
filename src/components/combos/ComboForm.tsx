"use client";

import { useState } from "react";
import { products } from "@/data/products";

type Props = {
  onCreate: (combo: any) => void;
};

export function ComboForm({ onCreate }: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [selectedItems, setSelectedItems] = useState<{ productId: number; quantity: number }[]>([]);

  const handleAddItem = () => {
    setSelectedItems((prev) => [...prev, { productId: products[0].id, quantity: 1 }]);
  };

  const handleChange = (index: number, field: string, value: any) => {
    setSelectedItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: field === "quantity" ? Number(value) : Number(value) } : item
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const combo = {
      id: Math.floor(Math.random() * 10000),
      name: name.trim(),
      price: Number(price),
      image: image.trim(),
      items: selectedItems,
    };

    onCreate(combo);
    setName("");
    setPrice("");
    setImage("");
    setSelectedItems([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Combo name"
        className="w-full border px-4 py-2 rounded-lg"
        required
      />
      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Combo price"
        type="number"
        className="w-full border px-4 py-2 rounded-lg"
        required
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL (optional)"
        className="w-full border px-4 py-2 rounded-lg"
      />

      <div className="space-y-2">
        {selectedItems.map((item, index) => (
          <div key={index} className="flex gap-2">
            <select
              value={item.productId}
              onChange={(e) =>
                handleChange(index, "productId", e.target.value)
              }
              className="flex-1 border rounded-lg px-2 py-1"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleChange(index, "quantity", e.target.value)
              }
              className="w-20 border rounded-lg px-2 py-1"
              min={1}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="text-sm text-indigo-600 hover:underline"
        >
          + Add product to combo
        </button>
      </div>

      <button
        type="submit"
        className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-green-700"
      >
        Create Combo
      </button>
    </form>
  );
}
