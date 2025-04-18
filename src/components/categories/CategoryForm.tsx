"use client";

import { useState } from "react";

type Props = {
  onAdd: (name: string) => void;
};

export function CategoryForm({ onAdd }: Props) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() !== "") {
      onAdd(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New category"
        className="px-4 py-2 border rounded-lg w-full"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Add
      </button>
    </form>
  );
}
