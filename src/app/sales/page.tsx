"use client";

import { useState } from "react";
import { salesProducts } from "@/data/sales";
import { initialCombos } from "@/data/combos";
import { initialCategories } from "@/data/categories";
import { ProductCard } from "@/components/ui/ProductCard";
import { CartItem } from "@/components/ui/CartItem";
import { useCash } from "@/contexts/CashContext";
import { addSaleToHistory } from "@/data/salesHistory";
import { useAuth } from "@/contexts/AuthContext";

export default function SalesPage() {
  const [products, setProducts] = useState([...salesProducts]);
  const [combos, setCombos] = useState(initialCombos);
  const [cart, setCart] = useState<
    { id: number; quantity: number; type: "product" | "combo" }[]
  >([]);
  const [ticketNumber, setTicketNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { addIncome } = useCash();
  const [responsible, setResponsible] = useState("Admin"); // valor por defecto
  const { user } = useAuth();

  const generateTicketId = () => {
    const date = new Date().toISOString().split("T")[0].replaceAll("-", "");
    const padded = String(ticketNumber).padStart(3, "0");
    return `T-${date}-${padded}`;
  };

  const getCategoryName = (id: number) =>
    initialCategories.find((c) => c.id === id)?.name || "Uncategorized";

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.categoryId === selectedCategory)
    : products;

  const addProductToCart = (productId: number) => {
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

  const addComboToCart = (comboId: number) => {
    const combo = combos.find((c) => c.id === comboId);
    if (!combo) return;

    const newProducts = [...products];
    let canSell = true;

    // Verificar stock
    for (const item of combo.items) {
      const p = newProducts.find((p) => p.id === item.productId);
      if (!p || p.stock < item.quantity) {
        canSell = false;
        break;
      }
    }

    if (!canSell) {
      alert("Not enough stock to sell this combo.");
      return;
    }

    // Descontar stock
    for (const item of combo.items) {
      const p = newProducts.find((p) => p.id === item.productId);
      if (p) p.stock -= item.quantity;
    }

    setProducts(newProducts);

    // Agregar al carrito
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

  const increaseQty = (itemId: number, type: "product" | "combo") => {
    if (type === "combo") return; // por simplicidad no permitir duplicar combos sin lógica avanzada
    setCart((prev) =>
      prev.map((i) =>
        i.id === itemId && i.type === type
          ? { ...i, quantity: i.quantity + 1 }
          : i
      )
    );
  };

  const decreaseQty = (itemId: number, type: "product" | "combo") => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === itemId && i.type === type
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (itemId: number, type: "product" | "combo") => {
    setCart((prev) =>
      prev.filter((i) => !(i.id === itemId && i.type === type))
    );
  };

  const getProduct = (id: number) => products.find((p) => p.id === id);
  const getCombo = (id: number) => combos.find((c) => c.id === id);

  const total = cart.reduce((sum, item) => {
    if (item.type === "product") {
      const product = getProduct(item.id);
      return product ? sum + product.price * item.quantity : sum;
    } else {
      const combo = getCombo(item.id);
      return combo ? sum + combo.price * item.quantity : sum;
    }
  }, 0);

  const confirmSale = () => {
    if (cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => {
      if (item.type === "product") {
        const p = getProduct(item.id);
        return sum + (p?.price || 0) * item.quantity;
      } else {
        const c = getCombo(item.id);
        return sum + (c?.price || 0) * item.quantity;
      }
    }, 0);

    const ticketId = generateTicketId();
    const now = new Date().toISOString();

    // Registrar ingreso en caja
    addIncome(`Sale ${ticketId}`, totalAmount);

    // Registrar en historial
    addSaleToHistory({
        id: ticketId,
        date: now,
        total: totalAmount,
        responsible: user.name,
        items: cart.map((i) => ({
          id: i.id,
          type: i.type,
          quantity: i.quantity,
        })),
      });
      

    alert(`✅ Sale confirmed!\nTicket: ${ticketId}\nTotal: $${totalAmount}`);
    setCart([]);
    setTicketNumber((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sales</h2>

      {/* Categoría Filtro */}
      <div className="flex gap-2 mb-6 flex-wrap">
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
      <div className="mb-4 max-w-sm">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Responsible / Seller
        </label>
        <input
          type="text"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          placeholder="Name or initials"
          className="w-full border rounded-lg px-3 py-2"
        />
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            category={getCategoryName(product.categoryId)}
            price={product.price}
            image={product.image}
            onAdd={() => addProductToCart(product.id)}
          />
        ))}

        {/* Combos */}
        {combos.map((combo) => (
          <ProductCard
            key={combo.id}
            name={combo.name}
            category="Combo"
            price={combo.price}
            image={combo.image || "/img/combo.jpg"}
            onAdd={() => addComboToCart(combo.id)}
          />
        ))}
      </div>

      {/* Carrito */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
        <h3 className="text-xl font-bold mb-4">Cart</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart.</p>
        ) : (
          <ul className="space-y-4">
            {cart.map((item) => {
              if (item.type === "product") {
                const product = getProduct(item.id);
                if (!product) return null;
                return (
                  <CartItem
                    key={`p-${item.id}`}
                    name={product.name}
                    price={product.price}
                    quantity={item.quantity}
                    onIncrease={() => increaseQty(item.id, "product")}
                    onDecrease={() => decreaseQty(item.id, "product")}
                    onRemove={() => removeFromCart(item.id, "product")}
                  />
                );
              } else {
                const combo = getCombo(item.id);
                if (!combo) return null;
                return (
                  <CartItem
                    key={`c-${item.id}`}
                    name={combo.name}
                    price={combo.price}
                    quantity={item.quantity}
                    onIncrease={() => {}}
                    onDecrease={() => decreaseQty(item.id, "combo")}
                    onRemove={() => removeFromCart(item.id, "combo")}
                  />
                );
              }
            })}
          </ul>
        )}
        <div className="mt-6 text-lg font-bold">
          Total: <span className="text-green-700">${total}</span>
        </div>
        {cart.length > 0 && (
          <button
            onClick={confirmSale}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Confirm Sale
          </button>
        )}
      </div>
    </div>
  );
}
