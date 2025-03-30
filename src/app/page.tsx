"use client";

import Link from "next/link";
import { mockUsers, useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, setUser } = useAuth();

  const modules = [
    {
      title: "Manage Products",
      href: "/products",
      description: "Create, edit and organize your menu.",
    },
    {
      title: "Sales",
      href: "/sales",
      description: "Register and track all sales activity.",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      description: "View insights, KPIs and reports.",
    },
    {
      title: "Cash Register",
      href: "/cash",
      description: "Control daily cash flow, incomes and expenses.",
    },
    {
      title: "Cash History",
      href: "/cash/history",
      description: "Access previous sessions and audits.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8 px-4">
      <h1 className="text-4xl font-bold text-primary">Welcome to GOURMETIFY</h1>
      <p className="text-gray-600 max-w-xl">
        Your complete and optimized platform for gastronomy management.
      </p>

      <div className="bg-white shadow px-4 py-3 rounded-lg text-left w-full max-w-xs">
        <label className="block text-sm text-gray-600 font-medium mb-1">Logged in as:</label>
        <select
          value={user.name}
          onChange={(e) => {
            const selected = e.target.value;
            const users = {
              Admin: { id: 1, name: "Admin", role: "admin" },
              Carla: { id: 2, name: "Carla", role: "cashier" },
              Pedro: { id: 3, name: "Pedro", role: "waiter" },
            };
            setUser(mockUsers[selected]);
          }}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option>Admin</option>
          <option>Carla</option>
          <option>Pedro</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mt-4">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-left"
          >
            <h2 className="text-xl font-semibold text-primary mb-2">{mod.title}</h2>
            <p className="text-sm text-gray-600">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
