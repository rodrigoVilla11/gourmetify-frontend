"use client";

import { useState, useMemo } from "react";
import { Order } from "@/data/orders";
import { OrderFilters } from "@/components/orders/OrderFilters";
import { OrderList } from "@/components/orders/OrderList";

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Juan Pérez",
    origin: "whatsapp",
    status: "pending",
    products: [{ id: 1, name: "Combo Sushi Clásico", quantity: 1, price: 4200 }],
    total: 4200,
    createdAt: new Date().toISOString(),
    notes: "Sin wasabi, por favor",
  },
  {
    id: "ORD-002",
    customer: "Lucía Gómez",
    origin: "web",
    status: "preparing",
    products: [{ id: 2, name: "Roll Veggie", quantity: 2, price: 1800 }],
    total: 3600,
    createdAt: new Date().toISOString(),
  },
  {
    id: "ORD-003",
    customer: "Carlos López",
    origin: "phone",
    status: "ready",
    products: [{ id: 3, name: "Combo Premium", quantity: 1, price: 5200 }],
    total: 5200,
    createdAt: new Date().toISOString(),
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const matchName = o.customer.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter ? o.status === statusFilter : true;
      return matchName && matchStatus;
    });
  }, [orders, query, statusFilter]);

  const handleStatusChange = (id: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Pedidos entrantes</h1>

      <OrderFilters
        query={query}
        onQueryChange={setQuery}
        status={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <OrderList orders={filtered} onNextStatus={handleStatusChange} />
    </div>
  );
}
