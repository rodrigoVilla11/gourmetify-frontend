"use client"

import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { ChevronDown } from "lucide-react"

export function UserMenu() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 text-sm font-medium text-muted hover:text-primary focus:outline-none">
          {user.name}
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={8}
          className="z-50 w-44 rounded-md bg-white border border-gray-200 shadow-md p-1"
        >
          <DropdownMenu.Item
            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            Perfil
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            Cambiar de usuario
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-1 border-t border-gray-100" />
          <DropdownMenu.Item
            onClick={logout}
            className="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
          >
            Cerrar sesión
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
