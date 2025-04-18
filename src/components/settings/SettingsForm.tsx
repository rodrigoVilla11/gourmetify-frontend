"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";

export type SystemSettings = {
  name: string;
  logoUrl?: string;
  address: string;
  phone: string;
  email: string;
  cuit?: string;
  openHours: string;

  modules: {
    inventory: boolean;
    delivery: boolean;
    turnControl: boolean;
    tips: boolean;
  };

  paymentMethods: string[];
  availableShifts: ("morning" | "afternoon" | "night")[];
  vatIncluded: boolean;
};

interface Props {
  defaultSettings: SystemSettings;
  onSave: (settings: SystemSettings) => void;
}

export function SettingsForm({ defaultSettings, onSave }: Props) {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  const handleChange = (field: keyof SystemSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleModuleToggle = (module: keyof SystemSettings["modules"]) => {
    setSettings((prev) => ({
      ...prev,
      modules: { ...prev.modules, [module]: !prev.modules[module] },
    }));
  };

  const handleShiftToggle = (shift: "morning" | "afternoon" | "night") => {
    const set = new Set(settings.availableShifts);
    if (set.has(shift)) set.delete(shift);
    else set.add(shift);
    setSettings((prev) => ({ ...prev, availableShifts: Array.from(set) as any }));
  };

  const handlePaymentToggle = (method: string) => {
    const set = new Set(settings.paymentMethods);
    if (set.has(method)) set.delete(method);
    else set.add(method);
    setSettings((prev) => ({ ...prev, paymentMethods: Array.from(set) }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(settings);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Nombre del local</Label>
          <Input
            value={settings.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <Label>CUIT</Label>
          <Input
            value={settings.cuit}
            onChange={(e) => handleChange("cuit", e.target.value)}
          />
        </div>
        <div>
          <Label>Teléfono</Label>
          <Input
            value={settings.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            value={settings.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Dirección</Label>
          <Input
            value={settings.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
        <div className="md:col-span-2">
          <Label>Horarios</Label>
          <Input
            value={settings.openHours}
            onChange={(e) => handleChange("openHours", e.target.value)}
            placeholder="Ej: Lunes a Sábados de 11:00 a 23:00"
          />
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-muted-foreground">Módulos activos</legend>
        {Object.entries(settings.modules).map(([key, value]) => (
          <label key={key} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={value}
              onChange={() => handleModuleToggle(key as keyof typeof settings.modules)}
            />
            {key}
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-muted-foreground">Turnos habilitados</legend>
        {["morning", "afternoon", "night"].map((shift) => (
          <label key={shift} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={settings.availableShifts.includes(shift as any)}
              onChange={() => handleShiftToggle(shift as any)}
            />
            {shift}
          </label>
        ))}
      </fieldset>

      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-muted-foreground">Métodos de pago</legend>
        {["Efectivo", "Transferencia", "MercadoPago", "Débito", "Crédito"].map((method) => (
          <label key={method} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={settings.paymentMethods.includes(method)}
              onChange={() => handlePaymentToggle(method)}
            />
            {method}
          </label>
        ))}
      </fieldset>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={settings.vatIncluded}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, vatIncluded: e.target.checked }))
            }
          />
          ¿Los precios incluyen IVA?
        </label>
      </div>

      <div className="pt-4 flex justify-end">
        <Button type="submit">Guardar configuración</Button>
      </div>
    </form>
  );
}
