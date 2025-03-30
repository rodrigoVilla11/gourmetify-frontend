"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { CashSession, CashMovement } from "@/data/cash";

// Simulamos una sesión activa
const initialSession: CashSession = {
  id: 999,
  date: new Date().toISOString().split("T")[0],
  shift: "morning",
  responsible: "System",
  openingBalance: 5000,
  movements: [],
};

type CashContextType = {
  cashSession: CashSession;
  addIncome: (description: string, amount: number) => void;
  addExpense: (description: string, amount: number) => void;
};

const CashContext = createContext<CashContextType | null>(null);

export function CashProvider({ children }: { children: ReactNode }) {
  const [cashSession, setCashSession] = useState<CashSession>(initialSession);

  const addMovement = (
    type: "income" | "expense",
    description: string,
    amount: number
  ) => {
    const newMovement: CashMovement = {
      id: cashSession.movements.length + 1,
      date: new Date().toISOString(),
      type,
      description,
      amount,
    };

    setCashSession((prev) => ({
      ...prev,
      movements: [...prev.movements, newMovement],
    }));
  };

  const value: CashContextType = useMemo(
    () => ({
      cashSession,
      addIncome: (description, amount) =>
        addMovement("income", description, amount),
      addExpense: (description, amount) =>
        addMovement("expense", description, amount),
    }),
    [cashSession]
  );

  return (
    <CashContext.Provider value={value}>{children}</CashContext.Provider>
  );
}

export function useCash() {
  const ctx = useContext(CashContext);
  if (!ctx) throw new Error("useCash must be used within <CashProvider>");
  return ctx;
}
