"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "admin" | "cashier" | "waiter";

export type User = {
  id: number;
  name: string;
  role: Role;
};

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
};

const defaultUser: User = {
  id: 1,
  name: "Admin",
  role: "admin",
};

const users: Record<string, User> = {
  Admin: { id: 1, name: "Admin", role: "admin" },
  Carla: { id: 2, name: "Carla", role: "cashier" },
  Pedro: { id: 3, name: "Pedro", role: "waiter" },
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const logout = () => {
    setUser(defaultUser);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

// ✅ Exportamos los usuarios simulados para usarlos en Home
export const mockUsers = users;
