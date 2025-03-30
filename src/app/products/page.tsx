"use client";

import { useState } from "react";
import Link from "next/link";
import { products as initialProducts } from "@/data/products";
import { initialCategories } from "@/data/categories";
import { initialCombos } from "@/data/combos";
import { ProductCard } from "@/components/ui/ProductCard";
import { Tabs } from "@/components/ui/Tabs";
import { EditStockModal } from "@/components/products/EditStockModal";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"products" | "combos">("products");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [products, setProducts] = useState(initialProducts);
  const [combos, setCombos] = useState(initialCombos);
  const [editing, setEditing] = useState<{
    id: number;
    name: string;
    stock: number;
  } | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  const getCategoryName = (id: number) =>
    initialCategories.find((c) => c.id === id)?.name || "Uncategorized";

  const handleUpdateStock = (id: number, newStock: number) => {
    const updated = [...products];
    const index = updated.findIndex((p) => p.id === id);
    if (index !== -1) {
      updated[index].stock = newStock;
      setProducts(updated);
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER + TABS */}
      <div className="flex justify-between items-center">
        <Tabs
          tabs={[
            { key: "products", label: "Products" },
            { key: "combos", label: "Combos" },
          ]}
          active={activeTab}
          onChange={(tab: string) => setActiveTab(tab as "products" | "combos")}
        />

        {activeTab === "products" ? (
          <Link
            href="/products/new"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            + New Product
          </Link>
        ) : (
          <Link
            href="/combos"
            className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
          >
            + New Combo
          </Link>
        )}
      </div>

      {/* CATEGORY FILTER */}
      {activeTab === "products" && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg border ${
              selectedCategory === null
                ? "bg-primary text-white"
                : "bg-white text-gray-600"
            }`}
          >
            All
          </button>
          {initialCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg border ${
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* PRODUCTS LIST */}
      {activeTab === "products" && (
        <div>
          {filteredProducts.length === 0 ? (
            <p className="text-gray-500 italic">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="space-y-2">
                  <ProductCard
                    name={product.name}
                    category={getCategoryName(product.categoryId)}
                    price={product.price}
                    image={product.image}
                    onAdd={() => {}}
                  />
                  <p className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </p>
                  <button
                    onClick={() => setEditing(product)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit Stock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COMBOS LIST */}
      {activeTab === "combos" && (
        <div>
          {combos.length === 0 ? (
            <p className="text-gray-500 italic">No combos created yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {combos.map((combo) => (
                <ProductCard
                  key={combo.id}
                  name={combo.name}
                  category="Combo"
                  price={combo.price}
                  image={combo.image || "/img/combo.jpg"}
                  onAdd={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {editing && (
        <EditStockModal
          product={editing}
          onUpdate={handleUpdateStock}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
