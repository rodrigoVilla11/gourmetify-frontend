"use client"

import { useState } from "react"
import Link from "next/link"
import { products as initialProducts } from "@/data/products"
import { initialCategories } from "@/data/categories"
import { initialCombos } from "@/data/combos"
import { ProductCard } from "@/components/ui/ProductCard"
import { Tabs } from "@/components/ui/Tabs"
import { EditStockModal } from "@/components/products/EditStockModal"
import { Search, Plus, Package, Coffee, Filter } from "lucide-react"

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<"products" | "combos">("products")
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState(initialProducts)
  const [combos, setCombos] = useState(initialCombos)
  const [editing, setEditing] = useState<{
    id: number
    name: string
    stock: number
  } | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Filter products by category and search query
  const filteredProducts = products
    .filter((p) => !selectedCategory || p.categoryId === selectedCategory)
    .filter((p) => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Filter combos by search query
  const filteredCombos = combos.filter((c) => !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const getCategoryName = (id: number) => initialCategories.find((c) => c.id === id)?.name || "Uncategorized"

  const handleUpdateStock = (id: number, newStock: number) => {
    const updated = [...products]
    const index = updated.findIndex((p) => p.id === id)
    if (index !== -1) {
      updated[index].stock = newStock
      setProducts(updated)
    }
  }

  const getStockStatusClass = (stock: number) => {
    if (stock <= 0) return "bg-red-100 text-red-800"
    if (stock < 5) return "bg-yellow-100 text-yellow-800"
    return "bg-green-100 text-green-800"
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-primary">
          {activeTab === "products" ? "Product Management" : "Combo Management"}
        </h1>

        {activeTab === "products" ? (
          <Link
            href="/products/new"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} /> New Product
          </Link>
        ) : (
          <Link
            href="/combos"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus size={18} /> New Combo
          </Link>
        )}
      </div>

      {/* TABS + SEARCH */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs
          tabs={[
            { key: "products", label: "Products"/*, icon: <Package size={16} /> */},
            { key: "combos", label: "Combos"/*, icon: <Coffee size={16} />*/ },
          ]}
          active={activeTab}
          onChange={(tab: string) => setActiveTab(tab as "products" | "combos")}
        />

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* CATEGORY FILTER */}
      {activeTab === "products" && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-gray-700">Categories</h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden flex items-center gap-1 text-sm text-gray-500"
            >
              <Filter size={16} />
              {showFilters ? "Hide" : "Show"} filters
            </button>
          </div>

          <div className={`flex gap-2 flex-wrap ${!showFilters ? "hidden sm:flex" : ""}`}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {initialCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS LIST */}
      {activeTab === "products" && (
        <div className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500">
                {searchQuery
                  ? "No products match your search criteria."
                  : selectedCategory
                    ? "No products in this category."
                    : "No products found."}
              </p>
              <Link href="/products/new" className="mt-4 inline-block text-primary hover:underline">
                Add your first product
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <ProductCard
                    name={product.name}
                    category={getCategoryName(product.categoryId)}
                    price={product.price}
                    image={product.image}
                    onAdd={() => {}}
                  />
                  <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockStatusClass(product.stock)}`}
                      >
                        Stock: {product.stock}
                      </span>
                    </div>
                    <button
                      onClick={() => setEditing(product)}
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      Edit Stock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* COMBOS LIST */}
      {activeTab === "combos" && (
        <div className="mt-6">
          {filteredCombos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
              <p className="text-gray-500">
                {searchQuery ? "No combos match your search criteria." : "No combos created yet."}
              </p>
              <Link href="/combos" className="mt-4 inline-block text-primary hover:underline">
                Create your first combo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCombos.map((combo) => (
                <div
                  key={combo.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <ProductCard
                    name={combo.name}
                    category="Combo"
                    price={combo.price}
                    image={combo.image || "/img/combo.jpg"}
                    onAdd={() => {}}
                  />
                  <div className="px-4 py-3 border-t border-gray-100">
                    <Link
                      href={`/combos/${combo.id}`}
                      className="text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      Edit Combo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {editing && <EditStockModal product={editing} onUpdate={handleUpdateStock} onClose={() => setEditing(null)} />}
    </div>
  )
}

