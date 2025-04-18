import { api } from "./api";
import { Ingredient } from "@/types/Ingredient";

export const ingredientsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 👉 Obtener todos los ingredientes
    getIngredients: build.query<Ingredient[], void>({
      query: () => "/ingredients",
      providesTags: ["Ingredient"],
    }),

    // 👉 Obtener un ingrediente por ID
    getIngredientById: build.query<Ingredient, number>({
      query: (id) => `/ingredients/${id}`,
    }),

    // 👉 Crear nuevo ingrediente
    createIngredient: build.mutation<Ingredient, Partial<Ingredient>>({
      query: (body) => ({
        url: "/ingredients",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Ingredient"],
    }),

    // 👉 Actualizar ingrediente
    updateIngredient: build.mutation<Ingredient, { id: number; data: Partial<Ingredient> }>({
      query: ({ id, data }) => ({
        url: `/ingredients/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Ingredient"],
    }),

    // 👉 Eliminar ingrediente
    deleteIngredient: build.mutation<void, number>({
      query: (id) => ({
        url: `/ingredients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Ingredient"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIngredientsQuery,
  useGetIngredientByIdQuery,
  useCreateIngredientMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientsApi;
