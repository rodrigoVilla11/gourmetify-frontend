export type Product = {
  id: number;
  name: string;
  price: number;
  cost: number;
  stock: number;
  unit: string;
  images?: string[];
  categoryId: number;
  categoryName?: string;
  ingredients?: ProductIngredient[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProductIngredient = {
  id: number;
  quantity: number;
  ingredient: {
    id: number;
    name: string;
    unit: string;
    cost: number;
  };
};

export type CreateProductDto = {
  name: string;
  price: number;
  stock: number;
  unit: string;
  image?: string;
  categoryId: number;
  active?: boolean; // opcional, si no lo enviás se puede defaultear a true
};
