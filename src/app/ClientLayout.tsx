// src/components/ClientLayout.tsx

"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { CashProvider } from "@/contexts/CashContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/ui/Navbar";

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <CashProvider>
          <Sidebar />
          <main className="flex-1 p-4 md:p-6 md:pl-64">{children}</main>
        </CashProvider>
      </AuthProvider>
    </Provider>
  );
}
