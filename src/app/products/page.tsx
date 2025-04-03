"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProductFormData, ProductModal } from "./new/page";
import IngredientsPage from "./ingredients/page"; // 👈 importar el componente modularizado

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductFormData | null>(null);
  const [showIngredients, setShowIngredients] = useState(false); // 👈 cambio de vista

  const [productos, setProductos] = useState<ProductFormData[]>([
    {
      id: 1,
      nombre: "Hamburguesa Doble",
      stock: 132,
      costo: 320.0,
      precio: 650.0,
      activo: true,
      ingredientes: [
        { id: 1, nombre: "Pan", unidad: "unidad", cantidad: 1 },
        { id: 2, nombre: "Carne", unidad: "g", cantidad: 150 },
        { id: 3, nombre: "Cheddar", unidad: "g", cantidad: 30 },
        { id: 4, nombre: "Lechuga", unidad: "hoja", cantidad: 2 },
        { id: 5, nombre: "Tomate", unidad: "rodaja", cantidad: 2 },
      ],
    },
    // ...
  ]);

  const handleSave = (data: ProductFormData) => {
    if (data.id) {
      setProductos((prev) => prev.map((p) => (p.id === data.id ? { ...data } : p)));
    } else {
      const nuevo = { ...data, id: Date.now() };
      setProductos((prev) => [...prev, nuevo]);
    }
  };

  const toggleActivo = (id: number) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p))
    );
  };

  const abrirModalNuevo = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const abrirModalEditar = (product: ProductFormData) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-display font-bold text-primary">
          {showIngredients ? "Ingredientes" : "Productos"}
        </h1>
        <div className="flex gap-2">
          {!showIngredients ? (
            <>
              <Button variant="secondary" onClick={abrirModalNuevo}>
                Nuevo producto
              </Button>
              <Button variant="outline" onClick={() => setShowIngredients(true)}>
                Ver ingredientes
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setShowIngredients(false)}>
              ← Volver a productos
            </Button>
          )}
        </div>
      </div>

      {!showIngredients && (
        <>
          <Input
            placeholder="🔍 Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Producto</th>
                  <th className="px-6 py-3">Costo</th>
                  <th className="px-6 py-3">Precio Venta</th>
                  <th className="px-6 py-3">Ingredientes</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Activo</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {productosFiltrados.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-6 py-3">{p.nombre}</td>
                    <td className="px-6 py-3">${p.costo.toFixed(2)}</td>
                    <td className="px-6 py-3">${p.precio.toFixed(2)}</td>
                    <td className="px-6 py-3 truncate max-w-[250px]">
                      {Array.isArray(p.ingredientes)
                        ? p.ingredientes
                            .map((ing) => `${ing.nombre} (${ing.cantidad} ${ing.unidad})`)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="px-6 py-3">{p.stock}</td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => toggleActivo(p.id!)}
                        className={`text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                          p.activo
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.activo ? "Activo" : "Inactivo"}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <Button size="sm" variant="secondary" onClick={() => abrirModalEditar(p)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ProductModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSave}
            product={editProduct}
          />
        </>
      )}

      {showIngredients && <IngredientsPage />} {/* Render dinámico 👇 */}
    </div>
  );
}
