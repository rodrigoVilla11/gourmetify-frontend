// /src/components/ui/CartItem.tsx

type CartItemProps = {
    name: string;
    price: number;
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onRemove: () => void;
  };
  
  export function CartItem({
    name,
    price,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
  }: CartItemProps) {
    return (
      <li className="flex justify-between items-center border-b pb-3">
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-gray-500">
            ${price} × {quantity}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onDecrease}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={onIncrease}
            className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            +
          </button>
          <button
            onClick={onRemove}
            className="text-red-500 text-sm hover:underline ml-2"
          >
            Remove
          </button>
        </div>
      </li>
    );
  }
  