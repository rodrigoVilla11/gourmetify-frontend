"use client";

import { useState } from "react";
import { SettingsForm, SystemSettings } from "@/components/settings/SettingsForm";
import { SettingsCard } from "@/components/settings/SettingsCard";

const defaultConfig: SystemSettings = {
  name: "Mi Restaurante",
  logoUrl: "",
  address: "Av. Siempre Viva 123",
  phone: "351-1234567",
  email: "contacto@mirestaurante.com",
  cuit: "20123456789",
  openHours: "Lunes a Sábado de 11:00 a 23:00",
  modules: {
    inventory: true,
    delivery: false,
    turnControl: true,
    tips: true,
  },
  paymentMethods: ["Efectivo", "Transferencia"],
  availableShifts: ["morning", "afternoon", "night"],
  vatIncluded: true,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSettings>(defaultConfig);
  const [editing, setEditing] = useState(false);

  return (
    <div className="p-4 md:p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Configuración del sistema</h1>

      {editing ? (
        <SettingsForm
          defaultSettings={settings}
          onSave={(newConfig) => {
            setSettings(newConfig);
            setEditing(false);
          }}
        />
      ) : (
        <SettingsCard settings={settings} onEdit={() => setEditing(true)} />
      )}
    </div>
  );
}
