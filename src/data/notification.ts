export type Notification = {
    id: string;
    type: "warning" | "error" | "info" | "success";
    message: string;
    icon?: string;
    link?: string; // opcional para ir directo al módulo relacionado
    date: string;
  };
  