import { api } from "./api";
import { Combo } from "@/types/Combo";

export const combosApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 👉 Obtener todos los combos
    getCombos: build.query<Combo[], void>({
      query: () => "/combos",
      providesTags: ["Combo"],
    }),

    // 👉 Obtener combo por ID
    getComboById: build.query<Combo, number>({
      query: (id) => `/combos/${id}`,
    }),

    // 👉 Crear combo
    createCombo: build.mutation<Combo, Partial<Combo>>({
      query: (body) => ({
        url: "/combos",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Combo"],
    }),

    // 👉 Actualizar combo
    updateCombo: build.mutation<Combo, { id: number; data: Partial<Combo> }>({
      query: ({ id, data }) => ({
        url: `/combos/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Combo"],
    }),

    // 👉 Eliminar combo
    deleteCombo: build.mutation<void, number>({
      query: (id) => ({
        url: `/combos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Combo"],
    }),

    // 👉 Agregar producto al combo
    addProductToCombo: build.mutation<any, { id: number; productId: number; quantity: number }>({
      query: ({ id, ...body }) => ({
        url: `/combos/${id}/products`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Combo"],
    }),

    // 👉 Quitar producto del combo
    removeProductFromCombo: build.mutation<any, { id: number; productId: number }>({
      query: ({ id, productId }) => ({
        url: `/combos/${id}/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Combo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCombosQuery,
  useGetComboByIdQuery,
  useCreateComboMutation,
  useUpdateComboMutation,
  useDeleteComboMutation,
  useAddProductToComboMutation,
  useRemoveProductFromComboMutation,
} = combosApi;
