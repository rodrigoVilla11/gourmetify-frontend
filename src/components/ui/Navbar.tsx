"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Sales", href: "/sales" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Cash Register", href: "/cash" },
    { name: "Cash History", href: "/cash/history" },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <div className="w-8 h-8 mr-2">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <g fill="#144336">
                <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z" />
                <path d="M65 40H35c-2.8 0-5 2.2-5 5v10c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V45c0-2.8-2.2-5-5-5zm-5 15H40V45h20v10z" />
              </g>
            </svg>
          </div>
          <h1 className="text-xl font-display font-bold text-primary tracking-tight">GOURMETIFY</h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-1 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-primary focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-2 pb-4 px-2">
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                      isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </nav>
  )
}

