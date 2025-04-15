export function formatCurrency(value: number): string {
    return `$${value.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  
  export function formatUnit(unit: "kg" | "g" | "l" | "ml" | "u"): string {
    const map: Record<string, string> = {
      kg: "kg",
      g: "g",
      l: "L",
      ml: "ml",
      u: "unid.",
    };
  
    return map[unit] ?? unit;
  }
  