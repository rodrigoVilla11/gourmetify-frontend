"use client";

import { CashSession } from "@/data/cash";
type Props = {
    session: CashSession;
    onUpdate: (updated: CashSession) => void;
    disabled?: boolean;
  };
  
  export function CashSessionInfo({ session, onUpdate, disabled = false }: Props) {
    const handleChange = (field: keyof CashSession, value: string) => {
      if (disabled) return;
      onUpdate({ ...session, [field]: value });
    };
  
    return (
      <div className="space-y-3 bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold">Cash Session Info</h3>
  
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-gray-500">Date</label>
            <input
              type="date"
              value={session.date}
              onChange={(e) => handleChange("date", e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              disabled={disabled}
            />
          </div>
  
          <div>
            <label className="text-sm text-gray-500">Shift</label>
            <select
              value={session.shift}
              onChange={(e) =>
                handleChange("shift", e.target.value as CashSession["shift"])
              }
              className="w-full border rounded-lg px-3 py-2"
              disabled={disabled}
            >
              <option value="morning">Morning</option>
              <option value="afternoon">Afternoon</option>
              <option value="night">Night</option>
            </select>
          </div>
  
          <div>
            <label className="text-sm text-gray-500">Responsible</label>
            <input
              type="text"
              value={session.responsible}
              onChange={(e) => handleChange("responsible", e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              disabled={disabled}
            />
          </div>
        </div>
      </div>
    );
  }
  