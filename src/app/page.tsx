"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  LineChart
} from "recharts";
import { UserMenu } from "@/components/ui/UserMenu";

export default function Home() {
  // const { user } = useAuth();

  const ultimos7Dias = [
    { dia: "Lun", monto: 3200 , ventas: 32 },
    { dia: "Mar", monto: 4500, ventas: 45  },
    { dia: "Mié", monto: 3700 , ventas: 37 },
    { dia: "Jue", monto: 5800, ventas: 58  },
    { dia: "Vie", monto: 7200, ventas: 72  },
    { dia: "Sáb", monto: 9500 , ventas: 95 },
    { dia: "Dom", monto: 10600, ventas: 61  },
  ];

  const productos = [
    { nombre: "Hamburguesa Doble", vendidos: 42, total: 12600 },
    { nombre: "Wrap de Pollo", vendidos: 27, total: 5750 },
  ];

  const actividad = [
    { icono: "🟢", texto: "Pedro cerró caja", tiempo: "hace 2h" },
    {
      icono: "💵",
      texto: "Carla registró una venta de $4.200",
      tiempo: "hace 3h",
    },
    {
      icono: "📦",
      texto: "Se repuso stock de Franui Chocolate",
      tiempo: "hace 5h",
    },
    { icono: "🧑‍💻", texto: "Ana editó un usuario", tiempo: "ayer" },
  ];

  const stockBajo = [
    { nombre: "Coca-Cola 1.5L 🥤", cantidad: 2 },
    { nombre: "Empanada Veggie 🥟", cantidad: 4 },
  ];
  return (
    <div className="flex flex-col gap-6 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-primary">
          Inicio
        </h1>
        <div className="flex items-center gap-3">
          <UserMenu />
          <div className="w-8 h-8 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* Search bar */}
      <Input placeholder="🔍 Buscar..." className="w-full max-w-md" />

      {/* Dashboard quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="💲 Total vendido hoy">
          <h2 className="text-3xl font-bold text-primary">$15.240</h2>
        </Card>

        <Card title="🧾 Caja">
          <h2 className="text-3xl font-bold text-primary">$100</h2>
        </Card>

        <Card title="📄 Ticket promedio">
          <h2 className="text-3xl font-bold text-primary">$1.090</h2>
        </Card>
        <Card
          title="Gestión de Usuarios"
          footer={
            <Link
              href="/users"
              className="text-sm text-primary font-medium hover:underline"
            >
              Ver usuarios
            </Link>
          }
        >
          <p className="text-xl font-bold text-primary">3 usuarios activos</p>
        </Card>
      </div>

      {/* Report preview */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Ventas por día (últimos 7 días)">
          <div className="w-full min-h-[260px]">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ultimos7Dias}>
                <XAxis dataKey="dia" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Bar dataKey="ventas" fill="#144336" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="📈 Últimos 7 días">
          <div className="w-full min-h-[260px]">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ultimos7Dias}>
                <XAxis dataKey="dia" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip cursor={{ fill: "#f3f4f6" }} />
                <Line dataKey="monto" stroke="#144336" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Más vendidos en cantidad">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted">
                <th className="text-left font-medium">Producto</th>
                <th className="text-right font-medium">Vendidos</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 text-gray-800">{prod.nombre}</td>
                  <td className="py-2 text-right">{prod.vendidos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Más vendidos en $">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-muted">
                <th className="text-left font-medium">Vendidos</th>
                <th className="text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2 text-gray-800">{prod.nombre}</td>
                  <td className="py-2 text-right">${prod.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Actividad reciente">
          <ul className="divide-y divide-gray-100">
            {actividad.map((item, i) => (
              <li key={i} className="flex justify-between py-2 text-sm">
                <span className="text-gray-800">
                  {item.icono} {item.texto}
                </span>
                <span className="text-muted text-xs">{item.tiempo}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Productos con stock bajo">
          <ul className="list-disc ml-5 space-y-1 text-sm text-red-700">
            {stockBajo.map((prod, i) => (
              <li key={i}>
                {prod.nombre} — quedan {prod.cantidad} unidades
                <Button size="sm" variant="secondary" className="ml-4">
                  Reponer
                </Button>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
