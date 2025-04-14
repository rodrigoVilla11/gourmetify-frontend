"use client";

interface FiltersProps {
  filterShift: string | null;
  filterResp: string | null;
  onChange: (key: string, value: string) => void;
}

export default function Filters({ filterShift, filterResp, onChange }: FiltersProps) {
  return (
    <div className="flex gap-4 flex-wrap items-end text-sm">
      <div>
        <label className="block font-medium text-muted-foreground mb-1">Turno</label>
        <select
          value={filterShift || ""}
          onChange={(e) => onChange("shift", e.target.value)}
          className="w-36 border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-950"
        >
          <option value="">Todos</option>
          <option value="morning">Mañana</option>
          <option value="afternoon">Tarde</option>
          <option value="night">Noche</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-muted-foreground mb-1">Responsable</label>
        <input
          type="text"
          placeholder="Ej. Carla"
          defaultValue={filterResp || ""}
          onBlur={(e) => onChange("responsible", e.target.value)}
          className="w-36 border border-gray-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-950"
        />
      </div>
    </div>
  );
}
