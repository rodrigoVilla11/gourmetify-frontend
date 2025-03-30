import { CashMovement } from "@/data/cash";

type Props = {
  movements: CashMovement[];
  openingBalance: number;
};

export function CashSummary({ movements, openingBalance }: Props) {
  const income = movements
    .filter((m) => m.type === "income")
    .reduce((sum, m) => sum + m.amount, 0);

  const expense = movements
    .filter((m) => m.type === "expense")
    .reduce((sum, m) => sum + m.amount, 0);

  const finalBalance = openingBalance + income - expense;

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3">
      <h3 className="text-xl font-bold mb-2">Cash Summary</h3>
      <p>Opening Balance: <span className="font-semibold">${openingBalance}</span></p>
      <p>Total Incomes: <span className="text-green-600 font-semibold">+${income}</span></p>
      <p>Total Expenses: <span className="text-red-600 font-semibold">-${expense}</span></p>
      <hr />
      <p className="text-lg font-bold">
        Final Balance:{" "}
        <span className={finalBalance >= 0 ? "text-green-700" : "text-red-700"}>
          ${finalBalance}
        </span>
      </p>
    </div>
  );
}
