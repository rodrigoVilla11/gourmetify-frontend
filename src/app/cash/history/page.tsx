"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { closedCashSessions } from "@/data/closedCashSessions";
import { useMemo } from "react";

export default function CashHistoryPage() {
  const params = useSearchParams();
  const filterDate = params.get("date");
  const filterResp = params.get("responsible");

  const filteredSessions = useMemo(() => {
    return closedCashSessions.filter((s) => {
      const matchDate = filterDate ? s.date.startsWith(filterDate) : true;
      const matchResp = filterResp
        ? s.responsible.toLowerCase().includes(filterResp.toLowerCase())
        : true;
      return matchDate && matchResp;
    });
  }, [filterDate, filterResp]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Cash Sessions History</h2>

      {filterDate && (
        <p className="text-sm text-gray-600">
          Showing sessions for: <strong>{filterDate}</strong>
        </p>
      )}

      {filteredSessions.length === 0 ? (
        <p className="text-gray-500 italic">No closed sessions found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredSessions.map((session) => (
            <li
              key={session.id}
              className="flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow"
            >
              <div>
                <p className="font-medium text-sm">
                  {session.date} — {session.shift} — {session.responsible}
                </p>
                <p className="text-xs text-gray-500">
                  {session.movements.length} movements — Opening: ${session.openingBalance}
                </p>
              </div>
              <Link
                href={`/cash/session/${session.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
