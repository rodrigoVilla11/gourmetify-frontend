"use client";

import * as XLSX from "xlsx";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";

interface Props {
  onImport: (items: PriceListItem[]) => void;
}

export type PriceListItem = {
  id: string;
  name: string;
  unit: string;
  price: number;
  provider: string;
};

export function PriceListUploader({ onImport }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json: any[] = XLSX.utils.sheet_to_json(sheet);

    const parsed: PriceListItem[] = json.map((row: any, index) => ({
      id: `${Date.now()}-${index}`,
      name: row["Producto"] ?? "",
      unit: row["Unidad"] ?? "u",
      price: parseFloat(row["Precio"]),
      provider: row["Proveedor"] ?? "Sin proveedor",
    }));

    onImport(parsed);
  };

  return (
    <div className="space-y-2">
      <Label>Importar lista de precios (Excel)</Label>
      <input
        type="file"
        accept=".xlsx, .xls"
        className="text-sm"
        onChange={handleFile}
        ref={inputRef}
      />
      <p className="text-xs text-muted-foreground">
        Asegurate que el Excel tenga columnas: <strong>Producto</strong>,{" "}
        <strong>Unidad</strong>, <strong>Precio</strong>, <strong>Proveedor</strong>
      </p>
    </div>
  );
}
