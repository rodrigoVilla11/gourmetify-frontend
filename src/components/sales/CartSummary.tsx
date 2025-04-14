"use client";
import { CartItem } from "@/components/ui/CartItem";

type CartItemType = {
  id: number;
  quantity: number;
  type: "product" | "combo";
};

type Props = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  getItem: (id: number, type: "product" | "combo") => { name: string; price: number } | null;
  subtotal: number;
  total: number;
  discount: number;
  surcharge: number;
  shippingCost: number;
  onIncrease: (id: number, type: "product" | "combo") => void;
  onDecrease: (id: number, type: "product" | "combo") => void;
  onRemove: (id: number, type: "product" | "combo") => void;
  onConfirmClick: () => void;
};

export function CartSummary({
  cart,
  setCart,
  getItem,
  subtotal,
  total,
  discount,
  surcharge,
  shippingCost,
  onIncrease,
  onDecrease,
  onRemove,
  onConfirmClick,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-md">
      <h2 className="text-lg font-semibold mb-4">Carrito</h2>

      {cart.length === 0 ? (
        <p className="text-sm text-gray-500">No hay productos en el carrito.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => {
            const data = getItem(item.id, item.type);
            if (!data) return null;

            return (
              <CartItem
                key={`${item.type}-${item.id}`}
                name={data.name}
                price={data.price}
                quantity={item.quantity}
                onIncrease={() => onIncrease(item.id, item.type)}
                onDecrease={() => onDecrease(item.id, item.type)}
                onRemove={() => onRemove(item.id, item.type)}
              />
            );
          })}
        </ul>
      )}

      <div className="mt-6 text-right text-lg font-bold">
        Total: <span className="text-primary">${total.toFixed(2)}</span>
      </div>

      <div className="mt-4 text-sm text-gray-600 space-y-1">
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
        {discount > 0 && (
          <div className="text-green-700">
            - Descuento: ${discount.toFixed(2)}
          </div>
        )}
        {surcharge > 0 && (
          <div className="text-red-700">
            + Recargo: ${surcharge.toFixed(2)}
          </div>
        )}
        {shippingCost > 0 && <div>+ Envío: ${shippingCost.toFixed(2)}</div>}
      </div>

      {cart.length > 0 && (
        <button
          onClick={onConfirmClick}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Ver ticket
        </button>
      )}
    </div>
  );
}
