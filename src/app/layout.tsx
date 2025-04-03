// /src/app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { CashProvider } from "@/contexts/CashContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/ui/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GOURMETIFY",
  description: "Gastronomy management software",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 flex">
        <AuthProvider>
          <CashProvider>
            <Sidebar />
            <main className="flex-1 p-4 md:p-6 md:pl-64">{children}</main>
          </CashProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
