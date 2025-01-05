import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";


export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({


    getOrder: builder.query({
      query: (token) => ({
        url: '/orders',
        headers: {
          Authorization: token
        },

      }),
      providesTags: ['Order']
    }),

    getOrderDetail: builder.query({
      query: (q) => ({
        url: `/orders/${q.id}`,
        headers: {
          Authorization: q.token
        },

      }),
      providesTags: ['Order']
    }),


    addOrder: builder.mutation({
      query: (q) => ({
        url: '/orders',
        method: 'POST',
        body: q.body,
        headers: {
          Authorization: `${q.token}`
        }
      }),
      invalidatesTags: ['Order']
    }),






  })
});



export const { useAddOrderMutation, useGetOrderQuery, useGetOrderDetailQuery } = orderApi;