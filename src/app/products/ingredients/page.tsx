"use client";

import { useState, useEffect } from "react";
import {
  useGetIngredientsQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
} from "@/redux/services/ingredientsApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import { AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";
import { Ingredient } from "@/types/Ingredient";

type SortKey = keyof Pick<Ingredient, "name" | "currentStock" | "cost">;

export default function IngredientsPage() {
  const { data: ingredientes = [] } = useGetIngredientsQuery();
  const [createIngredient] = useCreateIngredientMutation();
  const [updateIngredient] = useUpdateIngredientMutation();

  const [search, setSearch] = useState("");
  const [proveedorFiltro, setProveedorFiltro] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editIngredient, setEditIngredient] = useState<Ingredient | null>(null);

  const [sortBy, setSortBy] = useState<SortKey>("name");
  const [sortAsc, setSortAsc] = useState(true);

  const [form, setForm] = useState<Ingredient>({
    id: 0,
    name: "",
    unit: "",
    provider: "",
    currentStock: 0,
    minimumStock: 0,
    cost: 0,
    active: true,
  });

  useEffect(() => {
    if (editIngredient) {
      setForm(editIngredient);
    } else {
      setForm({
        id: 0,
        name: "",
        unit: "",
        provider: "",
        currentStock: 0,
        minimumStock: 0,
        cost: 0,
        active: true,
      });
    }
  }, [editIngredient]);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) setSortAsc(!sortAsc);
    else {
      setSortBy(key);
      setSortAsc(true);
    }
  };

  const filtered = [...ingredientes]
    .filter(
      (i) =>
        i.name.toLowerCase().includes(search.toLowerCase()) &&
        (proveedorFiltro === "" || i.provider === proveedorFiltro)
    )
    .sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      return (aVal < bVal ? -1 : 1) * (sortAsc ? 1 : -1);
    });

  const proveedores = [...new Set(ingredientes.map((i) => i.provider))];

  const saveIngredient = async () => {
    if (editIngredient?.id) {
      await updateIngredient({
        id: editIngredient.id,
        data: { ...form }, // 👈 envolvemos en `data`
      });
    } else {
      await createIngredient(form);
    }
    setModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Button
          onClick={() => {
            setEditIngredient(null);
            setModalOpen(true);
          }}
        >
          Nuevo ingrediente
        </Button>
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
                onClick={() => handleSort("name")}
              >
                <span className="inline-flex items-center gap-1">
                  Nombre{" "}
                  {sortBy === "name" &&
                    (sortAsc ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </span>
              </th>
              <th className="px-4 py-3">Unidad</th>
              <th className="px-4 py-3">Proveedor</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("currentStock")}
              >
                <span className="inline-flex items-center gap-1">
                  Stock{" "}
                  {sortBy === "currentStock" &&
                    (sortAsc ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </span>
              </th>
              <th className="px-4 py-3">Mínimo</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("cost")}
              >
                <span className="inline-flex items-center gap-1">
                  Costo{" "}
                  {sortBy === "cost" &&
                    (sortAsc ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}
                </span>
              </th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filtered.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="px-4 py-3">{i.name}</td>
                <td className="px-4 py-3">{i.unit}</td>
                <td className="px-4 py-3">{i.provider}</td>
                <td className="px-4 py-3">
                  {i.currentStock < i.minimumStock ? (
                    <span className="flex items-center gap-1 text-red-600 font-semibold">
                      <AlertTriangle size={14} /> {i.currentStock}
                    </span>
                  ) : (
                    i.currentStock
                  )}
                </td>
                <td className="px-4 py-3">{i.minimumStock}</td>
                <td className="px-4 py-3">${i.cost.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      i.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {i.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setEditIngredient(i);
                      setModalOpen(true);
                    }}
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
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Unidad de medida"
              value={form.unit}
              onChange={(e) => setForm({ ...form, unit: e.target.value })}
            />
            <Input
              placeholder="Proveedor"
              value={form.provider}
              onChange={(e) => setForm({ ...form, provider: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Stock actual"
              value={form.currentStock}
              onChange={(e) =>
                setForm({ ...form, currentStock: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Stock mínimo sugerido"
              value={form.minimumStock}
              onChange={(e) =>
                setForm({ ...form, minimumStock: Number(e.target.value) })
              }
            />
            <Input
              type="number"
              placeholder="Precio por unidad"
              value={form.cost}
              onChange={(e) =>
                setForm({ ...form, cost: Number(e.target.value) })
              }
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(val) => setForm({ ...form, active: val })}
              />
              <span>{form.active ? "Activo" : "Inactivo"}</span>
            </div>
            <Button className="w-full" onClick={saveIngredient}>
              Guardar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
