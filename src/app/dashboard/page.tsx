"use client";

import { KPIBox } from "@/components/ui/KPIBox";
import { salesHistory } from "@/data/salesHistory";
import { useMemo, useState, useEffect } from "react";
import { SalesByShiftChart } from "@/components/dashboard/SalesByShiftChart";
import { TopItems } from "@/components/dashboard/TopItems";
import { products } from "@/data/products";
import { initialCombos } from "@/data/combos";
import { SalesByDayChart } from "@/components/dashboard/SalesByDayChart";

export default function DashboardPage() {
  const [range, setRange] = useState<"all" | "today" | "last7" | "month">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const now = new Date();

  useEffect(() => {
    setStartDate("");
    setEndDate("");
  }, [range]);

  const filteredSales = useMemo(() => {
    return salesHistory.filter((s) => {
      const saleDate = new Date(s.date);
      const dateStr = saleDate.toISOString().split("T")[0];

      if (startDate || endDate) {
        const afterStart = !startDate || dateStr >= startDate;
        const beforeEnd = !endDate || dateStr <= endDate;
        return afterStart && beforeEnd;
      }

      if (range === "today") {
        return saleDate.toDateString() === now.toDateString();
      }

      if (range === "last7") {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 7);
        return saleDate >= sevenDaysAgo;
      }

      if (range === "month") {
        return (
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      }

      return true;
    });
  }, [startDate, endDate, range]);

  const totalSales = useMemo(() => {
    return filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  }, [filteredSales]);

  const averageTicket = useMemo(() => {
    return filteredSales.length
      ? (totalSales / filteredSales.length).toFixed(2)
      : "0.00";
  }, [totalSales, filteredSales.length]);

  const salesByUser = useMemo(() => {
    const count: Record<string, number> = {};
    filteredSales.forEach((s) => {
      count[s.responsible] = (count[s.responsible] || 0) + s.total;
    });
    return count;
  }, [filteredSales]);

  const salesByShift = useMemo(() => {
    const count: Record<string, number> = {};
    filteredSales.forEach((s) => {
      const shift = s.shift || "unknown";
      count[shift] = (count[shift] || 0) + s.total;
    });
    return count;
  }, [filteredSales]);

  const shiftChartData = Object.entries(salesByShift).map(([shift, total]) => ({
    shift,
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
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-2 items-center text-sm">
          <label>
            From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="ml-1 border rounded px-2 py-1"
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="ml-1 border rounded px-2 py-1"
            />
          </label>
        </div>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value as any)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="last7">Last 7 Days</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Total Sold" value={`$${totalSales}`} />
        <KPIBox label="Avg. Ticket" value={`$${averageTicket}`} />
        <KPIBox label="Sales by Users" value="" details={salesByUser} />
        <KPIBox label="Sales by Shift" value="" details={salesByShift} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesByShiftChart data={shiftChartData} />
        <TopItems title="Top Products" items={productQuantities} />
        <TopItems title="Top Combos" items={comboQuantities} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <SalesByDayChart data={salesByDay} />
      </div>
    </div>
  );
}
