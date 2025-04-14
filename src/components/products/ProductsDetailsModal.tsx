"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductFormData } from "./ProductModal";

type Props = {
  open: boolean;
  onClose: () => void;
  product: ProductFormData;
  onUpdate: (updatedProduct: ProductFormData) => void;
};

export function ProductDetailsModal({
  open,
  onClose,
  product,
  onUpdate,
}: Props) {
  const [editableProduct, setEditableProduct] = useState<ProductFormData>({
    ...product,
    imagenes: product.imagenes ?? [],
  });

  useEffect(() => {
    if (product) {
      setEditableProduct({
        ...product,
        imagenes: product.imagenes ?? [], // Aseguramos que sea array
      });
    }
  }, [product]);

  const handleChange = (field: keyof ProductFormData, value: any) => {
    setEditableProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate(editableProduct);
    onClose();
  };

  const calcularCosto = () => {
    return editableProduct.ingredientes.reduce(
      (total, ing) => total + ing.cantidad * ing.precioUnidad,
      0
    );
  };

  const handleImageAdd = () => {
    if ((editableProduct.imagenes?.length || 0) >= 4) return;
    const nuevaURL = prompt("URL de la nueva imagen (simulado):")?.trim();
    if (nuevaURL) {
      setEditableProduct((prev) => ({
        ...prev,
        imagenes: [...(prev.imagenes || []), nuevaURL],
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setEditableProduct((prev) => ({
      ...prev,
      imagenes: prev.imagenes?.filter((_, i) => i !== index),
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Detalles del producto</DialogTitle>
      </DialogHeader>
  
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galería de Imágenes */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold text-gray-700">
              Imágenes del producto ({editableProduct.imagenes?.length || 0}/4)
            </h3>
            {(editableProduct.imagenes ?? []).length < 4 && (
              <Button size="sm" variant="outline" onClick={handleImageAdd}>
                + Agregar imagen
              </Button>
            )}
          </div>
          {editableProduct.imagenes?.length ? (
            <div className="grid grid-cols-2 gap-4">
              {editableProduct.imagenes.map((url, idx) => (
                <div
                  key={idx}
                  className="relative group rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`Imagen ${idx + 1}`}
                    width={200}
                    height={200}
                    className="rounded-md border w-full h-36 object-cover"
                  />
                  <button
                    onClick={() => handleImageRemove(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded hover:bg-red-700 hidden group-hover:block"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No hay imágenes cargadas.</p>
          )}
        </div>
  
        {/* Info General */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">
              {editableProduct.nombre}
            </h2>
            <p className="text-sm text-gray-500">
              Categoría: {editableProduct.categoria}
            </p>
  
            <div className="flex items-center gap-2">
              <span className="text-sm">Estado:</span>
              <Switch
                checked={editableProduct.activo}
                onCheckedChange={(val) => handleChange("activo", val)}
              />
              <span
                className={
                  editableProduct.activo ? "text-green-600" : "text-red-600"
                }
              >
                {editableProduct.activo ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Stock</label>
              <Input
                type="number"
                value={editableProduct.stock}
                onChange={(e) =>
                  handleChange("stock", parseInt(e.target.value))
                }
                readOnly
                className="bg-gray-100"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Precio de venta
              </label>
              <Input
                type="number"
                value={editableProduct.precio}
                onChange={(e) =>
                  handleChange("precio", parseFloat(e.target.value))
                }
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Costo (auto)
              </label>
              <Input
                type="number"
                value={calcularCosto().toFixed(2)}
                readOnly
                className="bg-gray-100"
              />
            </div>
          </div>
  
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Ingredientes
            </h3>
            <ul className="text-sm space-y-1 max-h-48 overflow-y-auto pr-1">
              {editableProduct.ingredientes.map((ing) => (
                <li
                  key={ing.id}
                  className="flex justify-between border-b py-1 text-gray-800"
                >
                  <span>
                    {ing.nombre} ({ing.cantidad} {ing.unidad})
                  </span>
                  <span>
                    ${(ing.precioUnidad * ing.cantidad).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
  
          <Button className="w-full" onClick={handleSave}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
  
  );
}
