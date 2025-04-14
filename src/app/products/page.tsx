"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  ProductFormData,
  ProductModal,
} from "../../components/products/ProductModal";
import IngredientsPage from "./ingredients/page";
import { ProductDetailsModal } from "../../components/products/ProductsDetailsModal";
import { CategoryModal } from "@/components/products/CategoryModal";
import { Combo, ComboModal } from "@/components/products/ComboModal";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"productos" | "combos">(
    "productos"
  );
  const [showIngredients, setShowIngredients] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCategoriaOpen, setModalCategoriaOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<ProductFormData | null>(null);
  const [detailsProduct, setDetailsProduct] = useState<ProductFormData | null>(
    null
  );
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const [modalComboOpen, setModalComboOpen] = useState(false);
  const [editCombo, setEditCombo] = useState<Combo | null>(null);
  const [combos, setCombos] = useState<Combo[]>([]);

  // función para abrir modal de nuevo combo
  const abrirNuevoCombo = () => {
    setEditCombo(null);
    setModalComboOpen(true);
  };

  // función para editar combo existente
  const abrirEditarCombo = (combo: Combo) => {
    setEditCombo(combo);
    setModalComboOpen(true);
  };

  // función para guardar combo (nuevo o editado)
  const handleSaveCombo = (combo: Combo) => {
    if (combo.id) {
      setCombos((prev) => prev.map((c) => (c.id === combo.id ? combo : c)));
    } else {
      const nuevoCombo = { ...combo, id: Date.now() };
      setCombos((prev) => [...prev, nuevoCombo]);
    }
  };

  const [productos, setProductos] = useState<ProductFormData[]>([
    {
      id: 1,
      nombre: "Hamburguesa Doble",
      categoria: "Comida Rápida",
      precio: 650.0,
      stock: 132,
      costo: 0,
      activo: true,
      ingredientes: [
        {
          id: 1,
          nombre: "Pan",
          unidad: "unidad",
          cantidad: 1,
          precioUnidad: 50,
        },
        {
          id: 2,
          nombre: "Carne",
          unidad: "g",
          cantidad: 150,
          precioUnidad: 1.5,
        },
        {
          id: 3,
          nombre: "Cheddar",
          unidad: "g",
          cantidad: 30,
          precioUnidad: 0.5,
        },
        {
          id: 5,
          nombre: "Tomate",
          unidad: "rodaja",
          cantidad: 2,
          precioUnidad: 0.75,
        },
      ],
    },
  ]);

  const calcularCosto = (ingredientes: any[]) => {
    return ingredientes.reduce(
      (acc, ing) => acc + ing.precioUnidad * ing.cantidad,
      0
    );
  };

  const handleSave = (data: ProductFormData) => {
    const updatedData = {
      ...data,
      costo: calcularCosto(data.ingredientes || []),
    };

    if (data.id) {
      setProductos((prev) =>
        prev.map((p) => (p.id === data.id ? updatedData : p))
      );
    } else {
      const nuevo = { ...updatedData, id: Date.now() };
      setProductos((prev) => [...prev, nuevo]);
    }
  };

  const abrirModalNuevo = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const abrirDetalles = (product: ProductFormData) => {
    setDetailsProduct(product);
    setShowDetails(true);
  };

  const abrirModalEditar = (product: ProductFormData) => {
    const recalculated = {
      ...product,
      costo: calcularCosto(product.ingredientes || []),
    };
    setEditProduct(recalculated);
    setModalOpen(true);
  };

  const handleUpdateProduct = (updated: ProductFormData) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const toggleActivo = (id: number) => {
    setProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, activo: !p.activo } : p))
    );
  };

  const categoriasUnicas = Array.from(
    new Set(productos.map((p) => p.categoria))
  );

  const productosFiltrados = productos
    .map((p) => ({
      ...p,
      costo: calcularCosto(p.ingredientes || []),
    }))
    .filter((p) => {
      const coincideNombre = p.nombre
        .toLowerCase()
        .includes(search.toLowerCase());
      const coincideCategoria =
        filtroCategoria === "Todas" || p.categoria === filtroCategoria;
      const coincideEstado =
        filtroEstado === "Todos" ||
        (filtroEstado === "Activos" && p.activo) ||
        (filtroEstado === "Inactivos" && !p.activo);
      return coincideNombre && coincideCategoria && coincideEstado;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Gestión</h1>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "productos" ? "default" : "ghost"}
            onClick={() => setActiveTab("productos")}
          >
            Productos
          </Button>
          <Button
            variant={activeTab === "combos" ? "default" : "ghost"}
            onClick={() => setActiveTab("combos")}
          >
            Combos
          </Button>
        </div>
      </div>

      {/* Sección Ingredientes */}
      {showIngredients ? (
        <>
          <Button onClick={() => setShowIngredients(false)}>← Volver</Button>
          <IngredientsPage />
        </>
      ) : activeTab === "productos" ? (
        <>
          <div className="flex gap-2 flex-wrap items-center mb-4">
            <Input
              placeholder="🔍 Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <select
              className="border rounded px-3 py-2 text-sm"
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {categoriasUnicas.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Activos">Activos</option>
              <option value="Inactivos">Inactivos</option>
            </select>
            <Button variant="secondary" onClick={abrirModalNuevo}>
              Nuevo producto
            </Button>
            <Button variant="outline" onClick={() => setShowIngredients(true)}>
              Ver ingredientes
            </Button>
            <Button
              variant="outline"
              onClick={() => setModalCategoriaOpen(true)}
            >
              Categorías
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Producto</th>
                  <th className="px-6 py-3">Categoría</th>
                  <th className="px-6 py-3">Costo</th>
                  <th className="px-6 py-3">Precio Venta</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Activo</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {productosFiltrados.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-6 py-3">{p.nombre}</td>
                    <td className="px-6 py-3">{p.categoria}</td>
                    <td className="px-6 py-3">${p.costo.toFixed(2)}</td>
                    <td className="px-6 py-3">${p.precio.toFixed(2)}</td>
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
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => abrirModalEditar(p)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => abrirDetalles(p)}
                      >
                        Ver detalles
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

          {detailsProduct && (
            <ProductDetailsModal
              open={showDetails}
              onClose={() => setShowDetails(false)}
              product={detailsProduct}
              onUpdate={handleUpdateProduct}
            />
          )}

          <CategoryModal
            open={modalCategoriaOpen}
            onClose={() => setModalCategoriaOpen(false)}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gestión de combos</h2>
            <Button onClick={abrirNuevoCombo}>+ Nuevo combo</Button>
          </div>

          {combos.length === 0 ? (
            <div className="mt-4 text-sm text-gray-500">
              No hay combos creados aún.
            </div>
          ) : (
            <div className="mt-4 bg-white border rounded-xl shadow-sm">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="px-6 py-3">Nombre</th>
                    <th className="px-6 py-3">Productos</th>
                    <th className="px-6 py-3">Precio</th>
                    <th className="px-6 py-3">Estado</th>
                    <th className="px-6 py-3 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {combos.map((combo) => (
                    <tr key={combo.id} className="border-t">
                      <td className="px-6 py-3">{combo.nombre}</td>
                      <td className="px-6 py-3">
                        {combo.productos
                          .map((p) => `${p.nombre} x${p.cantidad}`)
                          .join(", ")}
                      </td>
                      <td className="px-6 py-3">${combo.precio.toFixed(2)}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            combo.activo
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {combo.activo ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => abrirEditarCombo(combo)}
                        >
                          Editar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
      <ComboModal
        open={modalComboOpen}
        onClose={() => setModalComboOpen(false)}
        onSave={handleSaveCombo}
        combo={editCombo}
        productosDisponibles={productos
          .filter(
            (p): p is ProductFormData & { id: number } =>
              typeof p.id === "number"
          )
          .map((p) => ({
            id: p.id,
            nombre: p.nombre,
          }))}
      />
    </div>
  );
}
