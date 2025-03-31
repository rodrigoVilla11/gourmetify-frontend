"use client"

import Link from "next/link"
import { mockUsers, useAuth } from "@/contexts/AuthContext"

export default function Home() {
  const { user, setUser } = useAuth()

  const modules = [
    {
      title: "Manage Products",
      href: "/products",
      description: "Create, edit and organize your menu.",
      icon: "🍽️",
    },
    {
      title: "Sales",
      href: "/sales",
      description: "Register and track all sales activity.",
      icon: "💰",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      description: "View insights, KPIs and reports.",
      icon: "📊",
    },
    {
      title: "Cash Register",
      href: "/cash",
      description: "Control daily cash flow, incomes and expenses.",
      icon: "💵",
    },
    {
      title: "Cash History",
      href: "/cash/history",
      description: "Access previous sessions and audits.",
      icon: "📜",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-10 px-4 bg-background">
      <div className="flex flex-col items-center space-y-4 mb-4">
        <div className="w-16 h-16 mb-2">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <g fill="#144336">
              <path d="M50 10C27.9 10 10 27.9 10 50s17.9 40 40 40 40-17.9 40-40S72.1 10 50 10zm0 70c-16.5 0-30-13.5-30-30s13.5-30 30-30 30 13.5 30 30-13.5 30-30 30z" />
              <path d="M65 40H35c-2.8 0-5 2.2-5 5v10c0 2.8 2.2 5 5 5h30c2.8 0 5-2.2 5-5V45c0-2.8-2.2-5-5-5zm-5 15H40V45h20v10z" />
            </g>
          </svg>
        </div>
        <h1 className="text-5xl font-display font-extrabold text-primary tracking-tight">GOURMETIFY</h1>
        <p className="text-muted max-w-xl text-lg">La gestión de tu restaurante, más simple que nunca.</p>
      </div>

      <div className="bg-surface shadow-card px-6 py-5 rounded-2xl text-left w-full max-w-xs border border-gray-200">
        <label className="block text-sm text-primary font-medium mb-2">Logged in as:</label>
        <select
          value={user.name}
          onChange={(e) => {
            const selected = e.target.value
            setUser(mockUsers[selected])
          }}
          className="w-full border border-accent bg-surface px-4 py-3 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
        >
          <option>Admin</option>
          <option>Carla</option>
          <option>Pedro</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mt-4 w-full">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className="bg-surface p-6 rounded-2xl shadow-card hover:shadow-strong transition-all duration-300 text-left border border-gray-200 hover:border-green-900 group"
          >
            <div className="flex items-start mb-3">
              <span className="text-2xl mr-3">{mod.icon}</span>
              <h2 className="text-xl font-semibold text-primary group-hover:text-primary mb-1 font-display">
                {mod.title}
              </h2>
            </div>
            <p className="text-sm text-muted">{mod.description}</p>
          </Link>
        ))}
      </div>

      <footer className="text-sm text-muted mt-12 pb-6">
        <p>© 2025 GOURMETIFY - Your complete gastronomy management platform</p>
      </footer>
    </div>
  )
}

