import { CashMovement } from "@/data/cash";

type Props = {
  movements: CashMovement[];
};

export function CashList({ movements }: Props) {
  return (
    <div className="mt-6 space-y-3">
      {movements.length === 0 ? (
        <p className="text-gray-500 italic">No movements registered.</p>
      ) : (
        movements.map((m) => {
          const isAutoSale = m.description.startsWith("Sale");
          return (
            <div
              key={m.id}
              className={`flex justify-between items-center p-4 rounded-xl shadow ${
                m.type === "income" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              <div>
                <p className={`font-medium ${isAutoSale ? "text-primary" : ""}`}>
                  {m.description}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(m.date).toLocaleString()}
                </p>
              </div>
              <p
                className={`font-bold ${
                  m.type === "income" ? "text-green-600" : "text-red-600"
                }`}
              >
                {m.type === "income" ? "+" : "-"}${m.amount}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
