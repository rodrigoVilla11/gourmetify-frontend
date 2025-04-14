// ✅ /app/dashboard/page.tsx
"use client";

import { useMemo, useState } from "react";
import { salesHistory } from "@/data/salesHistory";
import { products } from "@/data/products";
import { initialCombos } from "@/data/combos";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { KPICards } from "@/components/dashboard/KPICards";
import { SalesByUserChart } from "@/components/dashboard/SalesByUserChart";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { TopCombos } from "@/components/dashboard/TopCombos";
import { SalesEvolutionChart } from "@/components/dashboard/SalesEvolutionChart";
import { SalesByShiftChart } from "@/components/dashboard/SalesByShiftCard";

export default function DashboardPage() {
  const [filters, setFilters] = useState({
    range: "all",
    startDate: "",
    endDate: "",
    shift: "",
    responsible: "",
  });

  const filteredSales = useMemo(() => {
    return salesHistory.filter((s) => {
      const date = new Date(s.date);
      const dateStr = date.toISOString().split("T")[0];
      const todayStr = new Date().toISOString().split("T")[0];

      const inDateRange =
        filters.range === "today"
          ? dateStr === todayStr
          : filters.range === "last7"
          ? date >= new Date(new Date().setDate(new Date().getDate() - 7))
          : filters.range === "month"
          ? date.getMonth() === new Date().getMonth()
          : filters.range === "custom"
          ? (!filters.startDate || dateStr >= filters.startDate) &&
            (!filters.endDate || dateStr <= filters.endDate)
          : true;

      const matchShift = filters.shift ? s.shift === filters.shift : true;
      const matchResp = filters.responsible
        ? s.responsible === filters.responsible
        : true;

      return inDateRange && matchShift && matchResp;
    });
  }, [filters]);

  const totalSales = useMemo(
    () => filteredSales.reduce((sum, s) => sum + s.total, 0),
    [filteredSales]
  );

  const averageTicket = useMemo(() => {
    return filteredSales.length
      ? (totalSales / filteredSales.length).toFixed(2)
      : "0.00";
  }, [totalSales, filteredSales.length]);

  const salesByUser = useMemo(() => {
    const result: Record<string, number> = {};
    filteredSales.forEach((s) => {
      result[s.responsible] = (result[s.responsible] || 0) + s.total;
    });
    return result;
  }, [filteredSales]);

  const salesByShift = useMemo(() => {
    const result: Record<string, number> = {};
    filteredSales.forEach((s) => {
      const shift = s.shift || "unknown";
      result[shift] = (result[shift] || 0) + s.total;
    });
    return result;
  }, [filteredSales]);

  const shiftChartData = Object.entries(salesByShift).map(([shift, total]) => ({
    shift,
    total,
  }));

  const userChartData = Object.entries(salesByUser).map(([user, total]) => ({
    user,
    total,
  }));

  const productQuantities = products.map((p) => ({
    name: p.name,
    quantity: filteredSales.reduce(
      (sum, s) =>
        sum +
        s.items
          .filter((i) => i.type === "product" && i.id === p.id)
          .reduce((a, b) => a + b.quantity, 0),
      0
    ),
  }));

  const comboQuantities = initialCombos.map((c) => ({
    name: c.name,
    quantity: filteredSales.reduce(
      (sum, s) =>
        sum +
        s.items
          .filter((i) => i.type === "combo" && i.id === c.id)
          .reduce((a, b) => a + b.quantity, 0),
      0
    ),
  }));

  const uniqueDates = Array.from(
    new Set(filteredSales.map((s) => s.date.split("T")[0]))
  ).sort();

  const salesByDay = uniqueDates.map((date) => {
    const total = filteredSales
      .filter((s) => s.date.startsWith(date))
      .reduce((sum, s) => sum + s.total, 0);
    return { date: date.slice(5), total };
  });

  return (
    <div className="space-y-10 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <DashboardFilters value={filters} onChange={setFilters} />

      <KPICards
        totalSales={totalSales}
        averageTicket={Number(averageTicket)}
        salesByUser={salesByUser}
        salesByShift={salesByShift}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesByUserChart data={userChartData} />
        <SalesByShiftChart data={shiftChartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts items={productQuantities} />
        <TopCombos items={comboQuantities} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SalesEvolutionChart data={salesByDay} />
      </div>
    </div>
  );
}