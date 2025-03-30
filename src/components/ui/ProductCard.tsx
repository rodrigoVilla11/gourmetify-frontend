// /src/components/ui/ProductCard.tsx

type ProductCardProps = {
    name: string;
    category: string;
    price: number;
    image: string;
    onAdd: () => void;
  };
  
  export function ProductCard({ name, category, price, image, onAdd }: ProductCardProps) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
        <img
          src={image}
          alt={name}
          className="w-full h-36 object-cover rounded-lg mb-3"
        />
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-green-600 font-bold mt-1">${price}</p>
        <button
          onClick={onAdd}
          className="mt-3 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        >
          Add to Cart
        </button>
      </div>
    );
  }
  