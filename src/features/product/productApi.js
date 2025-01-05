import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({

    getTop5: builder.query({
      query: (q) => ({
        url: '/products/top-5',
        method: 'GET'
      }),
      providesTags: ['Product']
    }),

    getProducts: builder.query({
      query: (q) => ({
        url: '/products',
        params: q,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),

    getSingleProduct: builder.query({
      query: (q) => ({
        url: `/products/${q}`,
        method: 'GET'
      }),
      providesTags: ['Product']
    }),


    addProduct: builder.mutation({
      query: (q) => ({
        url: '/products',
        method: 'POST',
        body: q.body,
        headers: {
          Authorization: `${q.token}`
        }
      }),
      invalidatesTags: ['Product']
    }),
    updateProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'PATCH',
        body: q.body,
        headers: {
          Authorization: `${q.token}`
        }

      }),
      invalidatesTags: ['Product']
    }),


    removeProduct: builder.mutation({
      query: (q) => ({
        url: `/products/${q.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `${q.token}`
        }

      }),
      invalidatesTags: ['Product']
    }),



  })
});



export const { useGetProductsQuery, useGetTop5Query, useGetSingleProductQuery, useAddProductMutation, useUpdateProductMutation, useRemoveProductMutation } = productApi;