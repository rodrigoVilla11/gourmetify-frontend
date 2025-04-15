"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Role, User } from "@/data/users";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<User, "id" | "createdAt">) => void;
  userToEdit?: User | null;
}

export function UserFormModal({ open, onClose, onSubmit, userToEdit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("mozo");

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setEmail(userToEdit.email);
      setRole(userToEdit.role);
    } else {
      setName("");
      setEmail("");
      setRole("mozo");
    }
  }, [userToEdit]);

  const handleSubmit = () => {
    if (!name || !email) return;
    onSubmit({ name, email, role });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {userToEdit ? "Editar Usuario" : "Nuevo Usuario"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="space-y-2">
            <Label>Nombre</Label>
            <Input
              placeholder="Ej: Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Rol</Label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950"
            >
              <option value="admin">Admin</option>
              <option value="cajero">Cajero</option>
              <option value="mozo">Mozo</option>
              <option value="cocinero">Cocinero</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {userToEdit ? "Guardar cambios" : "Crear usuario"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
