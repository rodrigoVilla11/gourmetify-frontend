"use client";

import { ProductCard } from "@/components/ui/ProductCard";
import { Combo } from "@/data/combos";
import { Product } from "@/data/products";
import { Category } from "@/data/categories";

type CartItem = {
  id: number;
  quantity: number;
  type: "product" | "combo";
};

type Props = {
  products: Product[];
  combos: Combo[];
  categories: Category[];
  selectedCategory: number | null;
  setSelectedCategory: (id: number | null) => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function ProductGrid({
  products,
  combos,
  categories,
  selectedCategory,
  setSelectedCategory,
  cart,
  setCart,
}: Props) {
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  const onAddProduct = (productId: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId && i.type === "product");
      return item
        ? prev.map((i) =>
            i.id === productId && i.type === "product"
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { id: productId, quantity: 1, type: "product" }];
    });
  };

  const onAddCombo = (comboId: number) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === comboId && i.type === "combo");
      return item
        ? prev.map((i) =>
            i.id === comboId && i.type === "combo"
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...prev, { id: comboId, quantity: 1, type: "combo" }];
    });
  };

  return (
    <div className="space-y-4">
      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-md border text-sm ${
            selectedCategory === null
              ? "bg-primary text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Todas
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-md border text-sm ${
              selectedCategory === cat.id
                ? "bg-primary text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Productos y Combos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {filteredProducts.map((p) => (
          <ProductCard
            key={p.id}
            name={p.name}
            category={p.categoryName || "Sin categoría"}
            price={p.price}
            image={p.image}
            onAdd={() => onAddProduct(p.id)}
          />
        ))}
        {combos.map((c) => (
          <ProductCard
            key={c.id}
            name={c.name}
            category="Combo"
            price={c.price}
            image={c.image || "/img/combo.jpg"}
            onAdd={() => onAddCombo(c.id)}
          />
        ))}
      </div>
    </div>
  );
}
