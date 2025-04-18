"use client";

import { NotificationItem, Notification } from "@/components/notifications/NotificationItem";

interface Props {
  notifications: Notification[];
  title?: string;
}

export function NotificationPanel({ notifications, title = "Alertas del sistema" }: Props) {
  if (notifications.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow ring-1 ring-muted">
        <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground italic">No hay notificaciones por ahora.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow ring-1 ring-muted space-y-4">
      <h2 className="text-lg font-semibold text-primary">{title}</h2>
      <div className="space-y-3">
        {notifications.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))}
      </div>
    </div>
  );
}