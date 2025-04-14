"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { salesHistory } from "@/data/salesHistory";

import Filters from "@/components/sales/Filters";
import SaleCard from "@/components/sales/SaleCard";
import TicketModal from "@/components/sales/TicketModal";

export default function SalesHistoryPage() {
  const router = useRouter();
  const params = useSearchParams();

  const filterDate = params.get("date");
  const filterShift = params.get("shift");
  const filterResp = params.get("responsible");

  const [selectedSale, setSelectedSale] = useState<typeof salesHistory[0] | null>(null);

  const filteredSales = useMemo(() => {
    return salesHistory.filter((s) => {
      const matchDate = filterDate ? s.date.startsWith(filterDate) : true;
      const matchShift = filterShift ? s.shift === filterShift : true;
      const matchResp = filterResp ? s.responsible === filterResp : true;
      return matchDate && matchShift && matchResp;
    });
  }, [filterDate, filterShift, filterResp]);

  function updateQuery(key: string, value: string) {
    const query = new URLSearchParams(params.toString());
    value ? query.set(key, value) : query.delete(key);
    router.push(`/sales/history?${query.toString()}`);
  }

  return (
    <main className="p-4 sm:p-6 md:p-8 space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Historial de Ventas</h2>

      <Filters
        filterShift={filterShift}
        filterResp={filterResp}
        onChange={updateQuery}
      />

      {filteredSales.length === 0 ? (
        <p className="text-muted-foreground italic">No hay ventas registradas.</p>
      ) : (
        <ul className="space-y-3">
          {filteredSales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} onView={() => setSelectedSale(sale)} />
          ))}
        </ul>
      )}

      {selectedSale && (
        <TicketModal
          sale={selectedSale}
          open={!!selectedSale}
          onClose={() => setSelectedSale(null)}
        />
      )}
    </main>
  );
}
