"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/services/productsApi";
import { useGetCategoriesQuery } from "@/redux/services/categoriesApi";
import {
  useGetCombosQuery,
  useCreateComboMutation,
  useUpdateComboMutation,
} from "@/redux/services/combosApi";
import { ProductDetailsModal } from "@/components/products/ProductsDetailsModal";
import { ProductModal } from "@/components/products/ProductModal";
import { CategoryModal } from "@/components/products/CategoryModal";
import { ComboModal } from "@/components/products/ComboModal";
import IngredientsPage from "./ingredients/page";
import { Product } from "@/types/Product";
import { Combo } from "@/types/Combo";
import { useGetIngredientsQuery } from "@/redux/services/ingredientsApi";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"productos" | "combos">(
    "productos"
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalComboOpen, setModalComboOpen] = useState(false);
  const [modalCategoriaOpen, setModalCategoriaOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [detailsProduct, setDetailsProduct] = useState<Product | null>(null);
  const [editCombo, setEditCombo] = useState<Combo | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [search, setSearch] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("Todas");
  const [filtroEstado, setFiltroEstado] = useState("Todos");

  const { data: productos = [] } = useGetProductsQuery();
  const { data: categorias = [] } = useGetCategoriesQuery();
  const { data: combos = [] } = useGetCombosQuery();
  const { data: ingredientes = [] } = useGetIngredientsQuery();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [createCombo] = useCreateComboMutation();
  const [updateCombo] = useUpdateComboMutation();

  const handleUpdateProduct = async (updated: Product) => {
    try {
      await updateProduct({ id: updated.id, data: updated }).unwrap();
      setShowDetails(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      // Podés mostrar un toast o alert acá
    }
  };

  const abrirModalNuevo = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const abrirEditarCombo = (combo: Combo) => {
    setEditCombo(combo);
    setModalComboOpen(true);
  };

  const abrirNuevoCombo = () => {
    setEditCombo(null);
    setModalComboOpen(true);
  };

  const handleSaveProduct = async (data: Partial<Product>) => {
    if (data.id) await updateProduct({ id: data.id, data });
    else await createProduct(data);
    setModalOpen(false);
  };

  const handleSaveCombo = async (data: Partial<Combo>) => {
    if (data.id) await updateCombo({ id: data.id, data });
    else await createCombo(data);
    setModalComboOpen(false);
  };

  const abrirModalEditar = (product: Product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  const abrirDetalles = (product: Product) => {
    setDetailsProduct(product);
    setShowDetails(true);
  };

  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideNombre = p.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const coincideCategoria =
        filtroCategoria === "Todas" || p.categoryName === filtroCategoria;
      const coincideEstado =
        filtroEstado === "Todos" ||
        (filtroEstado === "Activos" && p.active) ||
        (filtroEstado === "Inactivos" && !p.active);
      return coincideNombre && coincideCategoria && coincideEstado;
    });
  }, [productos, search, filtroCategoria, filtroEstado]);

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

      {showIngredients ? (
        <>
          <Button onClick={() => setShowIngredients(false)}>← Volver</Button>
          <IngredientsPage />
        </>
      ) : activeTab === "productos" ? (
        <>
          {/* FILTROS */}
          <div className="flex gap-2 flex-wrap items-center mb-4">
            <Input
              placeholder="🔍 Buscar producto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="Todas">Todas las categorías</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="border rounded px-3 py-2 text-sm"
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

          {/* TABLA PRODUCTOS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Producto</th>
                  <th className="px-6 py-3">Categoría</th>
                  <th className="px-6 py-3">Costo</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {productosFiltrados.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="px-6 py-3">{p.name}</td>
                    <td className="px-6 py-3">{p.categoryName}</td>
                    <td className="px-6 py-3">${p.cost.toFixed(2)}</td>
                    <td className="px-6 py-3">${p.price.toFixed(2)}</td>
                    <td className="px-6 py-3">{p.stock}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          p.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-right space-x-2">
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
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MODALES */}
          <ProductModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveProduct}
            product={editProduct}
            ingredientsDisponibles={ingredientes} // <--- los ingredientes disponibles
            categorias={categorias} // <--- las categorías disponibles
          />
          {detailsProduct && (
            <ProductDetailsModal
              open={showDetails}
              onClose={() => setShowDetails(false)}
              product={detailsProduct!}
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
          <div className="mt-4 bg-white border rounded-xl shadow-sm">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3">Nombre</th>
                  <th className="px-6 py-3">Precio</th>
                  <th className="px-6 py-3">Estado</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {combos.map((combo) => (
                  <tr key={combo.id} className="border-t">
                    <td className="px-6 py-3">{combo.name}</td>
                    <td className="px-6 py-3">${combo.price.toFixed(2)}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${
                          combo.active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {combo.active ? "Activo" : "Inactivo"}
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
          <ComboModal
            open={modalComboOpen}
            onClose={() => setModalComboOpen(false)}
            onSave={handleSaveCombo}
            productosDisponibles={productos}
            combo={editCombo} // 👈 ya está
          />
        </>
      )}
    </div>
  );
}
