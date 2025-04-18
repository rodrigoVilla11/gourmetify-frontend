export type Combo = {
  id: number;
  name: string;
  price: number;
  cost: number;
  image?: string;
  categoryId: number;
  active: boolean;
  items: {
    productId: number;
    quantity: number;
  }[];
};

export type CreateComboDto = {
  name: string;
  price: number;
  active: boolean;
  categoryId: number;
  cost: number;
  items: {
    productId: number;
    quantity: number;
  }[];
};
