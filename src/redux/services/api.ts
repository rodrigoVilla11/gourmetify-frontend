import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000', // ⚠️ Cambiá esto si usás otra URL
  }),
  tagTypes: ['Product', 'Combo', 'Category', "Ingredient"],
  endpoints: () => ({}), // acá se inyectan luego
});
