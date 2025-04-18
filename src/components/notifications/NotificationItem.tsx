"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export type Notification = {
  id: string;
  type: "info" | "warning" | "error" | "success";
  message: string;
  icon?: string;
  link?: string;
  date: string;
};

const typeStyles: Record<Notification["type"], string> = {
  info: "border-blue-300 bg-blue-50 text-blue-900",
  warning: "border-yellow-400 bg-yellow-50 text-yellow-900",
  error: "border-red-400 bg-red-50 text-red-900",
  success: "border-green-400 bg-green-50 text-green-900",
};

const iconFallback: Record<Notification["type"], string> = {
  info: "ℹ️",
  warning: "⚠️",
  error: "❌",
  success: "✅",
};

interface Props {
  notification: Notification;
}

export function NotificationItem({ notification }: Props) {
  return (
    <div
      className={cn(
        "border rounded-lg px-4 py-3 flex items-start justify-between gap-4 shadow-sm",
        typeStyles[notification.type]
      )}
    >
      <div className="flex items-start gap-3">
        <span className="text-lg">{notification.icon || iconFallback[notification.type]}</span>
        <div>
          <p className="text-sm leading-snug font-medium">{notification.message}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(notification.date).toLocaleString()}
          </p>
        </div>
      </div>

      {notification.link && (
        <Link
          href={notification.link}
          className="text-xs text-blue-600 font-medium hover:underline whitespace-nowrap"
        >
          Ver más
        </Link>
      )}
    </div>
  );
}
