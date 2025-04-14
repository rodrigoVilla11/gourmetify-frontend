"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { ArrowDown, ArrowUp, AlertTriangle } from "lucide-react";

export type Ingredient = {
  id: number;
  nombre: string;
  unidad: string;
  proveedor: string;
  stockActual: number;
  stockMinimo: number;
  precioUnidad: number;
  activo: boolean;
};

type SortKey = keyof Pick<
  Ingredient,
  "nombre" | "stockActual" | "precioUnidad"
>;

export default function IngredientsPage() {
  const [search, setSearch] = useState("");
  const [proveedorFiltro, setProveedorFiltro] = useState<string>("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIngredient, setEditIngredient] = useState<Ingredient | null>(null);

  const [sortBy, setSortBy] = useState<SortKey>("nombre");
  const [sortAsc, setSortAsc] = useState(true);

  const [ingredientes, setIngredientes] = useState<Ingredient[]>([
    {
      id: 1,
      nombre: "Pan",
      unidad: "unidad",
      proveedor: "Proveedor A",
      stockActual: 50,
      stockMinimo: 10,
      precioUnidad: 80,
      activo: true,
    },
    {
      id: 2,
      nombre: "Carne",
      unidad: "g",
      proveedor: "Proveedor B",
      stockActual: 2000,
      stockMinimo: 5000,
      precioUnidad: 0.9,
      activo: true,
    },
    {
      id: 3,
      nombre: "Lechuga",
      unidad: "hoja",
      proveedor: "Proveedor A",
      stockActual: 20,
      stockMinimo: 30,
      precioUnidad: 15,
      activo: false,
    },
  ]);

  const [form, setForm] = useState<Ingredient>({
    id: 0,
    nombre: "",
    unidad: "",
    proveedor: "",
    stockActual: 0,
    stockMinimo: 0,
    precioUnidad: 0,
    activo: true,
  });

  const proveedores = [...new Set(ingredientes.map((i) => i.proveedor))];

  const openModal = (ingredient?: Ingredient) => {
    if (ingredient) {
      setEditIngredient(ingredient);
      setForm(ingredient);
    } else {
      setEditIngredient(null);
      setForm({
        id: 0,
        nombre: "",
        unidad: "",
        proveedor: "",
        stockActual: 0,
        stockMinimo: 0,
        precioUnidad: 0,
        activo: true,
      });
    }
    setModalOpen(true);
  };

  const saveIngredient = () => {
    if (editIngredient) {
      setIngredientes((prev) =>
        prev.map((i) => (i.id === editIngredient.id ? form : i))
      );
    } else {
      const nuevo = { ...form, id: Date.now() };
      setIngredientes((prev) => [...prev, nuevo]);
    }
    setModalOpen(false);
  };

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(!sortAsc);
    else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const filtered = ingredientes
    .filter(
      (i) =>
        i.nombre.toLowerCase().includes(search.toLowerCase()) &&
        (proveedorFiltro === "" || i.proveedor === proveedorFiltro)
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return (aVal < bVal ? -1 : 1) * (sortAsc ? 1 : -1);
    });

  const renderSortIcon = (key: SortKey) => {
    return sortBy === key ? (
      sortAsc ? (
        <ArrowUp size={14} />
      ) : (
        <ArrowDown size={14} />
      )
    ) : null;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Botones y Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button onClick={() => openModal()}>Nuevo ingrediente</Button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            placeholder="🔍 Buscar ingrediente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-64"
          />
          <select
            value={proveedorFiltro}
            onChange={(e) => setProveedorFiltro(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white"
          >
            <option value="">Todos los proveedores</option>
            {proveedores.map((prov, i) => (
              <option key={i} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("nombre")}
              >
                <span className="inline-flex items-center gap-1">
                  Nombre {renderSortIcon("nombre")}
                </span>
              </th>
              <th className="px-4 py-3">Unidad</th>
              <th className="px-4 py-3">Proveedor</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("stockActual")}
              >
                <span className="inline-flex items-center gap-1">
                  Stock {renderSortIcon("stockActual")}
                </span>
              </th>
              <th className="px-4 py-3">Stock mínimo</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("precioUnidad")}
              >
                <span className="inline-flex items-center gap-1">
                  Precio x unidad {renderSortIcon("precioUnidad")}
                </span>
              </th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="px-4 py-3">{i.nombre}</td>
                <td className="px-4 py-3">{i.unidad}</td>
                <td className="px-4 py-3">{i.proveedor}</td>
                <td className="px-4 py-3">
                  {i.stockActual < i.stockMinimo ? (
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <AlertTriangle size={14} className="text-red-600" />{" "}
                      {i.stockActual}
                    </span>
                  ) : (
                    i.stockActual
                  )}
                </td>
                <td className="px-4 py-3">{i.stockMinimo}</td>
                <td className="px-4 py-3">${i.precioUnidad.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      i.activo
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {i.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => openModal(i)}
                  >
                    Editar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editIngredient ? "Editar ingrediente" : "Nuevo ingrediente"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            />
            <Input
              placeholder="Unidad de medida"
              value={form.unidad}
              onChange={(e) => setForm({ ...form, unidad: e.target.value })}
            />
            <Input
              placeholder="Proveedor"
              value={form.proveedor}
              onChange={(e) => setForm({ ...form, proveedor: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Stock actual"
              value={form.stockActual}
              onChange={(e) =>
                setForm({ ...form, stockActual: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Stock mínimo sugerido"
              value={form.stockMinimo}
              onChange={(e) =>
                setForm({ ...form, stockMinimo: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Precio por unidad"
              value={form.precioUnidad}
              onChange={(e) =>
                setForm({ ...form, precioUnidad: Number(e.target.value) })
              }
            />
            <Button className="w-full" onClick={saveIngredient}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
