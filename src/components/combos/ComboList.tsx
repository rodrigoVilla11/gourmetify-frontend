import { Combo } from "@/data/combos";
import { products } from "@/data/products";

type Props = {
  combos: Combo[];
};

export function ComboList({ combos }: Props) {
  const getProductName = (id: number) =>
    products.find((p) => p.id === id)?.name || "Unknown";

  return (
    <div className="mt-8 space-y-4">
      {combos.map((combo) => (
        <div
          key={combo.id}
          className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
        >
          <h3 className="text-lg font-bold">{combo.name}</h3>
          <p className="text-green-600 font-semibold">${combo.price}</p>
          {combo.image && (
            <img
              src={combo.image}
              alt={combo.name}
              className="w-full max-w-xs rounded-lg"
            />
          )}
          <ul className="text-sm text-gray-600 list-disc ml-6">
            {combo.items.map((item, i) => (
              <li key={i}>
                {item.quantity} × {getProductName(item.productId)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
