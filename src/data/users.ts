export type Role = "admin" | "cajero" | "mozo" | "cocinero" | "supervisor";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Rodrigo Villa",
    email: "rodrigo@gourmetify.app",
    role: "admin",
    createdAt: "2025-01-10T12:00:00",
  },
  {
    id: 2,
    name: "Lucía Martínez",
    email: "lucia@sushi.com",
    role: "cajero",
    createdAt: "2025-03-05T09:15:00",
  },
];
