"use client"
import Link from "next/link";
import { salesHistory } from "@/data/salesHistory";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function SalesHistoryPage() {
  const params = useSearchParams();
  const filterDate = params.get("date");
  const filterShift = params.get("shift");
  const filterResp = params.get("responsible");

  const filteredSales = useMemo(() => {
    return salesHistory.filter((s) => {
      const matchDate = filterDate ? s.date.startsWith(filterDate) : true;
      const matchShift = filterShift ? s.shift === filterShift : true;
      const matchResp = filterResp ? s.responsible === filterResp : true;
      return matchDate && matchShift && matchResp;
    });
  }, [filterDate, filterShift, filterResp]);

  function buildQuery(key: string, value: string) {
    const current = new URLSearchParams(window.location.search);
    if (value) current.set(key, value);
    else current.delete(key);
    return current.toString();
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sales History</h2>

      <div className="flex gap-4 flex-wrap items-center text-sm">
        <label>
          Shift:
          <select
            onChange={(e) =>
              (window.location.href = `/sales/history?${buildQuery(
                "shift",
                e.target.value
              )}`)
            }
            defaultValue={filterShift || ""}
            className="ml-1 border rounded px-2 py-1"
          >
            <option value="">All</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="night">Night</option>
          </select>
        </label>

        <label>
          Responsible:
          <input
            type="text"
            placeholder="e.g. Carla"
            defaultValue={filterResp || ""}
            onBlur={(e) =>
              (window.location.href = `/sales/history?${buildQuery(
                "responsible",
                e.target.value
              )}`)
            }
            className="ml-1 border rounded px-2 py-1"
          />
        </label>
      </div>

      {filteredSales.length === 0 ? (
        <p className="text-gray-500 italic">No sales registered.</p>
      ) : (
        <ul className="space-y-3">
          {filteredSales.map((sale) => (

            <li
              key={sale.id}
              className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow"
            >
              <div>
                <p className="font-medium text-sm">{sale.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(sale.date).toLocaleString()} — {sale.responsible}
                </p>
              </div>
              <div className="flex gap-6 items-center">
                <span className="font-bold text-green-700">${sale.total}</span>
                <Link
                  href={`/sales/ticket/${sale.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
