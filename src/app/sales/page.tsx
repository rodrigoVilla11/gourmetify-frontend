"use client";

import { useState } from "react";
import { useCash } from "@/contexts/CashContext";
import { useAuth } from "@/contexts/AuthContext";
import { salesProducts } from "@/data/sales";
import { initialCombos } from "@/data/combos";
import { initialCategories } from "@/data/categories";
import {
  addSaleToHistory,
  DeliverySale,
  InStoreSale,
  salesHistory,
} from "@/data/salesHistory";

import { TicketPreviewModal } from "@/components/sales/TicketPreviewModal";
import { CustomerForm } from "@/components/sales/CustomerForm";
import { DiscountForm } from "@/components/sales/DiscountForm";
import { ProductGrid } from "@/components/sales/ProductGrid";
import { CartSummary } from "@/components/sales/CartSummary";
import { SalesHistoryToday } from "@/components/sales/SalesHistoryToday";

export default function SalesPage() {
  const [products] = useState(salesProducts);
  const [combos] = useState(initialCombos);
  const [cart, setCart] = useState<
    { id: number; quantity: number; type: "product" | "combo" }[]
  >([]);
  const [ticketNumber, setTicketNumber] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [view, setView] = useState<"mostrador" | "delivery">("mostrador");

  const [customerName, setCustomerName] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [shippingCost, setShippingCost] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState("Efectivo");
  const [notes, setNotes] = useState("");
  const [discount, setDiscount] = useState(0);
  const [surcharge, setSurcharge] = useState(0);
  const [isPercentage, setIsPercentage] = useState(true);
  const [showPreview, setShowPreview] = useState(false);

  const { addIncome } = useCash();
  const { user } = useAuth();

  const generateTicketId = () => {
    const date = new Date().toISOString().split("T")[0].replaceAll("-", "");
    const padded = String(ticketNumber).padStart(3, "0");
    return `T-${date}-${padded}`;
  };

  const getItem = (id: number, type: "product" | "combo") => {
    if (type === "product") {
      const p = products.find((p) => p.id === id);
      return p ? { name: p.name, price: p.price } : null;
    } else {
      const c = combos.find((c) => c.id === id);
      return c ? { name: c.name, price: c.price } : null;
    }
  };

  const onIncrease = (id: number, type: "product" | "combo") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.type === type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const onDecrease = (id: number, type: "product" | "combo") => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id && item.type === type
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const onRemove = (id: number, type: "product" | "combo") => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.type === type))
    );
  };

  const getProduct = (id: number) => products.find((p) => p.id === id);
  const getCombo = (id: number) => combos.find((c) => c.id === id);

  const subtotal = cart.reduce((sum, item) => {
    const data =
      item.type === "product" ? getProduct(item.id) : getCombo(item.id);
    return data ? sum + data.price * item.quantity : sum;
  }, 0);

  const calculatedDiscount = isPercentage
    ? subtotal * (discount / 100)
    : discount;
  const calculatedSurcharge = isPercentage
    ? subtotal * (surcharge / 100)
    : surcharge;

  const total =
    subtotal -
    calculatedDiscount +
    calculatedSurcharge +
    (view === "delivery" ? shippingCost : 0);

  const confirmSale = () => {
    if (cart.length === 0) return;

    const ticketId = generateTicketId();
    const now = new Date().toISOString();

    const commonFields = {
      id: ticketId,
      date: now,
      total,
      responsible: user.name,
      customer: customerName,
      paymentMethod,
      notes,
      items: cart,
    };

    const sale =
      view === "delivery"
        ? ({
            ...commonFields,
            type: "delivery",
            delivery: {
              phone: deliveryPhone,
              address: deliveryAddress,
              shippingCost,
            },
          } satisfies DeliverySale)
        : ({
            ...commonFields,
            type: "mostrador",
          } satisfies InStoreSale);

    addSaleToHistory(sale);
    addIncome(`Venta ${ticketId}`, total);
    alert(`✅ Venta confirmada: ${ticketId}`);

    setCart([]);
    setCustomerName("");
    setDeliveryPhone("");
    setDeliveryAddress("");
    setShippingCost(0);
    setNotes("");
    setTicketNumber((prev) => prev + 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
      {/* Selector de vista */}
      <div className="flex gap-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            view === "mostrador"
              ? "bg-primary text-white"
              : "bg-white border text-gray-600"
          }`}
          onClick={() => setView("mostrador")}
        >
          🧍‍♂️ Mostrador
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-semibold ${
            view === "delivery"
              ? "bg-primary text-white"
              : "bg-white border text-gray-600"
          }`}
          onClick={() => setView("delivery")}
        >
          🛵 Delivery
        </button>
      </div>

      {/* Formularios */}
      <CustomerForm
        view={view}
        customerName={customerName}
        setCustomerName={setCustomerName}
        deliveryPhone={deliveryPhone}
        setDeliveryPhone={setDeliveryPhone}
        deliveryAddress={deliveryAddress}
        setDeliveryAddress={setDeliveryAddress}
        shippingCost={shippingCost}
        setShippingCost={setShippingCost}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        notes={notes}
        setNotes={setNotes}
      />

      <DiscountForm
        discount={discount}
        setDiscount={setDiscount}
        surcharge={surcharge}
        setSurcharge={setSurcharge}
        isPercentage={isPercentage}
        setIsPercentage={setIsPercentage}
      />

      {/* Productos y combos */}
      <ProductGrid
        products={products}
        combos={combos}
        categories={initialCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        cart={cart}
        setCart={setCart}
      />

      {/* Carrito */}
      <CartSummary
        cart={cart}
        setCart={setCart}
        getItem={getItem}
        subtotal={subtotal}
        discount={calculatedDiscount}
        surcharge={calculatedSurcharge}
        shippingCost={view === "delivery" ? shippingCost : 0}
        total={total}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
        onConfirmClick={() => setShowPreview(true)}
      />

      {/* Historial de ventas del día */}
      <SalesHistoryToday sales={salesHistory} />

      {/* Modal de ticket */}
      <TicketPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        items={cart}
        total={total}
        subtotal={subtotal}
        discount={calculatedDiscount}
        surcharge={calculatedSurcharge}
        shippingCost={view === "delivery" ? shippingCost : 0}
        notes={notes}
        customer={customerName}
        paymentMethod={paymentMethod}
        isPercentage={isPercentage}
        onConfirm={() => {
          confirmSale();
          setShowPreview(false);
        }}
      />
    </div>
  );
}
