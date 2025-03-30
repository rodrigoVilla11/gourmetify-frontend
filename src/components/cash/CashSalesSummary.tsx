import { useRouter } from "next/navigation";
import { CashMovement } from "@/data/cash";

type Props = {
  movements: CashMovement[];
};

export function CashSalesSummary({ movements }: Props) {
  const router = useRouter();

  const sales = movements.filter(
    (m) => m.type === "income" && m.description.startsWith("Sale")
  );

  const totalSales = sales.reduce((sum, m) => sum + m.amount, 0);

  const firstSale = sales[0];
  const saleDate = firstSale ? firstSale.date.split("T")[0] : null;

  const goToSalesHistory = () => {
    if (saleDate) {
      router.push(`/sales/history?date=${saleDate}`);
    } else {
      router.push("/sales/history");
    }
  };

  return (
    <div
      onClick={goToSalesHistory}
      className="bg-blue-50 p-6 rounded-xl shadow flex justify-between items-center cursor-pointer hover:bg-blue-100 transition"
    >
      <div>
        <h3 className="text-lg font-semibold text-blue-700">Sales Income Summary</h3>
        <p className="text-sm text-gray-600">
          {sales.length} ticket{sales.length !== 1 && "s"} registered
        </p>
      </div>
      <p className="text-2xl font-bold text-blue-800">+${totalSales}</p>
    </div>
  );
}
