import { api } from "./api";
import { Category } from "@/types/Category";

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 👉 Obtener todas las categorías
    getCategories: build.query<Category[], void>({
      query: () => "/categories",
      providesTags: ["Category"],
    }),

    // 👉 Obtener una categoría por ID
    getCategoryById: build.query<Category, number>({
      query: (id) => `/categories/${id}`,
    }),

    // 👉 Crear nueva categoría
    createCategory: build.mutation<Category, Partial<Category>>({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),

    // 👉 Actualizar categoría
    updateCategory: build.mutation<Category, { id: number; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    // 👉 Eliminar categoría
    deleteCategory: build.mutation<void, number>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
