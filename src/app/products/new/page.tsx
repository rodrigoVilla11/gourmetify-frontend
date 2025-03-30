"use client";

import { useState } from "react";
import { ProductForm } from "@/components/products/ProductForm";

export default function NewProductPage() {
  const [products, setProducts] = useState<any[]>([]);

  const handleCreate = (newProduct: any) => {
    setProducts((prev) => [...prev, newProduct]);
    console.log("Created product:", newProduct); // luego será POST al backend
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <ProductForm onCreate={handleCreate} />

      {products.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">Preview:</h3>
          <pre className="bg-gray-100 p-4 rounded-xl">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
