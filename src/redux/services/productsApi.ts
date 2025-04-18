import { api } from "./api";
import { Product } from "@/types/Product";

export const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    // 👉 Obtener todos los productos
    getProducts: build.query<Product[], void>({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    // 👉 Obtener un producto por ID
    getProductById: build.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),

    // 👉 Crear producto
    createProduct: build.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // 👉 Actualizar producto
    updateProduct: build.mutation<Product, { id: number; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    // 👉 Eliminar producto
    deleteProduct: build.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    // 👉 Agregar ingrediente al producto
    addIngredientToProduct: build.mutation<any, { id: number; ingredientId: number; quantity: number }>({
      query: ({ id, ...body }) => ({
        url: `/products/${id}/ingredients`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    // 👉 Obtener composición del producto
    getProductComposition: build.query<any[], number>({
      query: (id) => `/products/${id}/composition`,
    }),

    // 👉 Eliminar ingrediente de la composición
    removeIngredientFromProduct: build.mutation<any, { id: number; ingredientId: number }>({
      query: ({ id, ingredientId }) => ({
        url: `/products/${id}/ingredients/${ingredientId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddIngredientToProductMutation,
  useGetProductCompositionQuery,
  useRemoveIngredientFromProductMutation,
} = productsApi;
