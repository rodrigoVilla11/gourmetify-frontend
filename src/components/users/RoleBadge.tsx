"use client";

import { Role } from "@/data/users";

export function RoleBadge({ role }: { role: Role }) {
  const config: Record<Role, { label: string; color: string }> = {
    admin: { label: "Admin", color: "bg-red-500" },
    cajero: { label: "Cajero", color: "bg-blue-500" },
    mozo: { label: "Mozo", color: "bg-green-500" },
    cocinero: { label: "Cocinero", color: "bg-yellow-500" },
    supervisor: { label: "Supervisor", color: "bg-purple-500" },
  };

  const { label, color } = config[role];

  return (
    <span
      className={`inline-block text-xs font-semibold text-white px-2 py-1 rounded-full ${color}`}
    >
      {label}
    </span>
  );
}
