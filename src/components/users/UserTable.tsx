"use client";

import { User } from "@/data/users";
import { Button } from "@/components/ui/Button";
import { RoleBadge } from "@/components/users/RoleBadge";

interface Props {
  users: User[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h2 className="text-lg font-semibold text-primary mb-4">Usuarios</h2>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted border-b">
            <th className="text-left py-2">Nombre</th>
            <th className="text-left py-2">Email</th>
            <th className="text-left py-2">Rol</th>
            <th className="text-left py-2">Alta</th>
            <th className="text-right py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="py-2 font-medium">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                <RoleBadge role={user.role} />
              </td>
              <td className="py-2 text-muted-foreground">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-2 text-right flex justify-end gap-2">
                {onEdit && <Button size="sm" onClick={() => onEdit(user.id)}>Editar</Button>}
                {onDelete && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(user.id)}
                  >
                    Eliminar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}