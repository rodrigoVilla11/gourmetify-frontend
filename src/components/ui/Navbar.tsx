"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Sales", href: "/sales" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Cash Register", href: "/cash" },
    { name: "Cash History", href: "/cash/history" },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-gray-700 hover:text-primary focus:outline-none"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[url('/FONDO%20TEXTURA%20VERDE-BLANCO%20MAS%20ESPACIO.png')] border-r border-gray-200 shadow-sm z-10 transition-transform duration-300 ease-in-out 
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col items-center justify-center gap-3 px-6 pb-8">
          <div className="w-50 h-22">
            <img src="/LogoGourmetifyBlancoSinFondo.png" alt="Logo-Gourmetify" />
          </div>
        </div>

        <nav className="flex flex-col gap-3 mt-4 px-6 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-lg transition-colors duration-200 text-left w-full text-sm font-semibold tracking-tight
                  ${
                    isActive
                      ? "bg-white text-primary"
                      : "text-white hover:bg-white/10 hover:text-white"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
