// /src/components/ui/Navbar.tsx

import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">GOURMETIFY</h1>
      <ul className="flex gap-6 text-sm font-medium text-gray-700">
        <li>
          <Link href="/" className="hover:text-primary">Home</Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-primary">Products</Link>
        </li>
        <li>
          <Link href="/sales" className="hover:text-primary">Sales</Link>
        </li>
        <li>
          <Link href="/dashboard" className="hover:text-primary">Dashboard</Link>
        </li>
        <li>
          <Link href="/cash" className="hover:text-primary">Cash</Link>
        </li>
        <li>
          <Link href="/cash/history" className="hover:text-primary">History</Link>
        </li>
      </ul>
    </nav>
  );
}
