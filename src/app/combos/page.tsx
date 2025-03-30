"use client";

import { useState } from "react";
import { ComboForm } from "@/components/combos/ComboForm";
import { ComboList } from "@/components/combos/ComboList";
import { Combo } from "@/data/combos";

export default function CombosPage() {
  const [combos, setCombos] = useState<Combo[]>([]);

  const handleCreate = (newCombo: Combo) => {
    setCombos((prev) => [...prev, newCombo]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Combo</h2>
      <ComboForm onCreate={handleCreate} />
      <ComboList combos={combos} />
    </div>
  );
}
