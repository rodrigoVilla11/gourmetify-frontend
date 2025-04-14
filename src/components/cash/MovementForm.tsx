"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

interface Props {
  onSave: (movement: {
    type: "ingreso" | "egreso";
    concept: string;
    amount: number;
  }) => void;
  onCancel?: () => void;
}

export function MovementForm({ onSave, onCancel }: Props) {
  const [type, setType] = useState<"ingreso" | "egreso">("ingreso");
  const [concept, setConcept] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!concept || isNaN(value) || value <= 0) return;
    onSave({ type, concept, amount: value });
    setConcept("");
    setAmount("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white dark:bg-zinc-900 rounded-xl shadow ring-1 ring-muted"
    >
      <h3 className="text-lg font-semibold text-primary">
        Registrar movimiento
      </h3>

      <div className="space-y-2">
        <Label>Tipo</Label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "ingreso" | "egreso")}
          className="w-full border rounded px-3 py-2 text-sm bg-white dark:bg-zinc-950"
        >
          <option value="ingreso">Ingreso</option>
          <option value="egreso">Egreso</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Concepto</Label>
        <Input
          placeholder="Ej. compra de insumos, recarga"
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Monto</Label>
        <Input
          type="number"
          step="0.01"
          placeholder="$0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" variant="default">
          Guardar
        </Button>
      </div>
    </form>
  );
}
