"use client";

import { useParams } from "next/navigation";
import { closedCashSessions } from "@/data/closedCashSessions";
import { CashSummary } from "@/components/cash/CashSummary";
import { CashList } from "@/components/cash/CashList";
import { CashSessionInfo } from "@/components/cash/CashSessionInfo";

export default function SessionDetailPage() {
  const params = useParams();
  const sessionId = Number(params.id);

  const session = closedCashSessions.find((s) => s.id === sessionId);

  if (!session) {
    return <p className="text-red-600">Session not found.</p>;
  }

  return (
    <div className="space-y-6 print-container">
      <h2 className="text-2xl font-bold print-heading">Cash Session #{session.id}</h2>

      <CashSessionInfo session={session} onUpdate={() => {}} disabled />

      <CashSummary
        movements={session.movements}
        openingBalance={session.openingBalance}
      />

      <CashList movements={session.movements} />

      <button
        onClick={() => window.print()}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition no-print"
      >
        Export / Print
      </button>
    </div>
  );
}
