"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Switch } from "@/components/ui/Switch";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoriesQuery,
} from "@/redux/services/categoriesApi";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CategoryModal({ open, onClose }: Props) {
  const { data: categorias = [], refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [form, setForm] = useState({
    id: 0,
    name: "",
    description: "",
    active: true,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    setForm({ id: 0, name: "", description: "", active: true });
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (isEditing) {
      await updateCategory({
        id: form.id,
        data: {
          name: form.name,
          description: form.description,
          active: form.active,
        },
      });
    } else {
      await createCategory({
        name: form.name,
        description: form.description,
        active: form.active,
      });
    }
    await refetch();
    resetForm();
  };

  const handleEdit = (cat: any) => {
    setForm({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      active: cat.active,
    });
    setIsEditing(true);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gestionar Categorías</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Formulario */}
          <div className="space-y-3">
            <Input
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              placeholder="Descripción"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(val) => setForm({ ...form, active: val })}
              />
              <span>{form.active ? "Activo" : "Inactivo"}</span>
            </div>
            <Button className="w-full" onClick={handleSave}>
              {isEditing ? "Guardar cambios" : "Crear categoría"}
            </Button>
          </div>

          {/* Lista de categorías */}
          <div className="border-t pt-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Categorías actuales
            </h3>
            <ul className="space-y-2 text-sm">
              {categorias.map((cat) => (
                <li
                  key={cat.id}
                  className="flex justify-between items-center border rounded px-3 py-2"
                >
                  <div>
                    <p className="font-medium">{cat.name}</p>
                    <p className="text-gray-500 text-xs">{cat.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        cat.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {cat.active ? "Activo" : "Inactivo"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(cat)}
                    >
                      Editar
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
