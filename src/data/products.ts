// types/Product.ts
export type Product = {
  id: number;
  name: string;
  categoryId: number;
  categoryName?: string; // opcional si ya viene resuelto
  price: number;
  image: string;
  stock: number;
  minimumStock?: number;
};

export const products = [
  {
    id: 1,
    name: "Americano Coffee",
    categoryId: 1,
    price: 1200,
    cost: 500,
    stock: 50,
    unit: "unit",
    image: "/img/coffee.jpg",
    minimumStock: 20,
  },
  {
    id: 2,
    name: "Ham & Cheese Sandwich",
    categoryId: 2,
    price: 2500,
    cost: 1000,
    stock: 7,
    unit: "unit",
    image: "/img/sandwich.jpg",
    minimumStock: 10,
  },
  {
    id: 3,
    name: "Chocolate Cake",
    categoryId: 3,
    price: 3200,
    cost: 1300,
    stock: 10,
    unit: "unit",
    image: "/img/cake.jpg",
    minimumStock: 5,
  },
];