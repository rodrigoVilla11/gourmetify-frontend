// src/app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { ClientLayout } from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GOURMETIFY",
  description: "Gastronomy management software",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-50 text-gray-900 flex">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
