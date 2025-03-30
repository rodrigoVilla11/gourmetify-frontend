import { notFound } from "next/navigation";
import { salesHistory, SaleItem } from "@/data/salesHistory";
import { products } from "@/data/products";
import { initialCombos } from "@/data/combos";

type Props = { params: { id: string } };

export default function TicketDetailPage({ params }: Props) {
  const ticket = salesHistory.find((t) => t.id === params.id);
  if (!ticket) return notFound();

  const getItemName = (item: SaleItem) => {
    if (item.type === "product") {
      return products.find((p) => p.id === item.id)?.name || "Unknown Product";
    } else {
      return (
        initialCombos.find((c) => c.id === item.id)?.name || "Unknown Combo"
      );
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ticket {ticket.id}</h2>
      <p className="text-sm text-gray-600">
        {new Date(ticket.date).toLocaleString()} — Seller:{" "}
        <span className="font-medium">{ticket.responsible}</span>
      </p>

      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        {ticket.items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>
              {item.quantity} × {getItemName(item)}
            </span>
          </div>
        ))}
        <hr />
        <div className="text-right font-bold text-lg text-green-700">
          Total: ${ticket.total}
        </div>
      </div>
    </div>
  );
}
