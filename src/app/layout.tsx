// /src/app/layout.tsx

import "./globals.css";
import { ReactNode } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Inter } from "next/font/google";
import { CashProvider } from "@/contexts/CashContext";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GOURMETIFY",
  description: "Gastronomy management software",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="p-6">
          <AuthProvider>
            <CashProvider>{children}</CashProvider>
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
