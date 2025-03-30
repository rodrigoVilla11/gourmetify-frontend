type Item = {
    name: string;
    quantity: number;
  };
  
  type Props = {
    title: string;
    items: Item[];
  };
  
  export function TopItems({ title, items }: Props) {
    const sorted = items.sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-sm text-gray-600 font-medium mb-4">{title}</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          {sorted.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.name}</span>
              <span className="font-semibold">{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  