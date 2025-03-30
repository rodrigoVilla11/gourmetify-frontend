"use client";

import { useState } from "react";
import { initialCategories, Category } from "@/data/categories";
import { CategoryForm } from "@/components/categories/CategoryForm";
import { CategoryList } from "@/components/categories/CategoryList";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleAdd = (name: string) => {
    const newCategory = {
      id: categories.length + 1,
      name,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleDelete = (id: number) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Product Categories</h2>

      <CategoryForm onAdd={handleAdd} />
      <CategoryList categories={categories} onDelete={handleDelete} />
    </div>
  );
}
