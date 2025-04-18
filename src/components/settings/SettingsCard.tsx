"use client";

import { SystemSettings } from "./SettingsForm";
import { RoleBadge } from "@/components/users/RoleBadge";

interface Props {
  settings: SystemSettings;
  onEdit?: () => void;
}

export function SettingsCard({ settings, onEdit }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 space-y-4 ring-1 ring-muted">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-primary">Información del local</h2>
        {onEdit && (
          <button onClick={onEdit} className="text-sm text-blue-600 hover:underline">
            Editar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <p><strong>Nombre:</strong> {settings.name}</p>
        <p><strong>CUIT:</strong> {settings.cuit || "-"}</p>
        <p><strong>Teléfono:</strong> {settings.phone}</p>
        <p><strong>Email:</strong> {settings.email}</p>
        <p className="sm:col-span-2"><strong>Dirección:</strong> {settings.address}</p>
        <p className="sm:col-span-2"><strong>Horarios:</strong> {settings.openHours}</p>
      </div>

      <div className="pt-2 space-y-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Módulos activos:</h3>
        <ul className="list-disc ml-6 text-sm">
          {Object.entries(settings.modules)
            .filter(([, active]) => active)
            .map(([key]) => (
              <li key={key}>{key}</li>
            ))}
        </ul>
      </div>

      <div className="pt-2">
        <h3 className="text-sm font-semibold text-muted-foreground">Turnos habilitados:</h3>
        <p className="text-sm">{settings.availableShifts.join(", ") || "-"}</p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-muted-foreground">Métodos de pago:</h3>
        <p className="text-sm">{settings.paymentMethods.join(", ") || "-"}</p>
      </div>

      <p className="text-sm text-muted-foreground">
        {settings.vatIncluded ? "Los precios incluyen IVA" : "Precios sin IVA"}
      </p>
    </div>
  );
}
