// types/Ingredient.ts
export type Ingredient = {
  id: number;
  name: string;
  unit: string;
  provider: string;
  currentStock: number;
  minimumStock: number;
  cost: number;
  active: boolean;
};

export type CreateIngredientDto = {
  name: string;
  unit: string;
  provider: string;
  currentStock: number;
  minimumStock: number;
  cost: number;
  active: boolean;
};

export type UpdateIngredientDto = Partial<CreateIngredientDto> & { id: number };
