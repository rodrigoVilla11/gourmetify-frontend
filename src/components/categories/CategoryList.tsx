"use client";

import { Category } from "@/data/categories";

type Props = {
  categories: Category[];
  onDelete: (id: number) => void;
};

export function CategoryList({ categories, onDelete }: Props) {
  return (
    <ul className="space-y-3">
      {categories.map((cat) => (
        <li
          key={cat.id}
          className="flex justify-between items-center bg-white px-4 py-2 rounded-xl shadow"
        >
          <span>{cat.name}</span>
          <button
            onClick={() => onDelete(cat.id)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
