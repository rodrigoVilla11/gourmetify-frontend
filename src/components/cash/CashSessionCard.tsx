import { CashSession } from "@/data/cash";
import Link from "next/link";

type Props = {
  session: CashSession;
};

export function CashSessionCard({ session }: Props) {
  const totalIncome = session.movements
    .filter((m) => m.type === "income")
    .reduce((sum, m) => sum + m.amount, 0);

  const totalExpense = session.movements
    .filter((m) => m.type === "expense")
    .reduce((sum, m) => sum + m.amount, 0);

  const finalBalance = session.openingBalance + totalIncome - totalExpense;

  return (
    <div className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{session.date}</h3>
          <p className="text-sm text-gray-500 capitalize">
            {session.shift} shift - {session.responsible}
          </p>
        </div>
        <p
          className={`font-bold text-lg ${
            finalBalance >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          ${finalBalance}
        </p>
      </div>

      <Link
        href={`/cash/session/${session.id}`}
        className="text-sm text-blue-600 hover:underline self-end"
      >
        View Details
      </Link>
    </div>
  );
}
