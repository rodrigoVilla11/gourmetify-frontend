"use client";

interface TopProductsProps {
  items: { name: string; quantity: number }[];
  title?: string;
}

export function TopProducts({ items, title = "Productos más vendidos" }: TopProductsProps) {
  const sorted = [...items].sort((a, b) => b.quantity - a.quantity).slice(0, 10);

  return (
    <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow ring-1 ring-muted">
      <h3 className="text-lg font-semibold mb-4 text-primary">{title}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-muted">
            <th className="text-left font-medium">Producto</th>
            <th className="text-right font-medium">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="py-2 text-gray-800">{item.name}</td>
              <td className="py-2 text-right font-medium">{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
