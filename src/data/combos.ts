export type ComboItem = {
    productId: number;
    quantity: number;
  };
  
  export type Combo = {
    id: number;
    name: string;
    price: number;
    image?: string;
    items: ComboItem[];
  };
  
  export const initialCombos: Combo[] = [];
  