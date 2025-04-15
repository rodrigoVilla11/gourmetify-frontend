"use client";

import { useState } from "react";
import { User, users as initialUsers } from "@/data/users";
import { UserTable } from "@/components/users/UserTable";
import { UserFormModal } from "@/components/users/UserFormModal";
import { Button } from "@/components/ui/Button";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleCreateOrEdit = (data: Omit<User, "id" | "createdAt">) => {
    if (userToEdit) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userToEdit.id ? { ...u, ...data } : u
        )
      );
    } else {
      const newUser: User = {
        id: Date.now(),
        createdAt: new Date().toISOString(),
        ...data,
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setModalOpen(false);
    setUserToEdit(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro que querés eliminar este usuario?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Usuarios</h1>
        <Button onClick={() => setModalOpen(true)}>➕ Nuevo Usuario</Button>
      </div>

      <UserTable
        users={users}
        onEdit={(id) => {
          const found = users.find((u) => u.id === id) ?? null;
          setUserToEdit(found);
          setModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <UserFormModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setUserToEdit(null);
        }}
        onSubmit={handleCreateOrEdit}
        userToEdit={userToEdit}
      />
    </div>
  );
}