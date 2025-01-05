import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";


export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({

    getReview: builder.query({
      query: (q) => ({
        url: `/reviews/${q}`,
        method: 'GET',
      }),
      providesTags: ['Review']
    }),

    addReview: builder.mutation({
      query: (q) => ({
        url: `/reviews/${q.id}`,
        method: 'POST',
        body: q.body,
        headers: {
          Authorization: `${q.token}`
        }
      }),
      invalidatesTags: ['Review']
    }),



  })
});



export const { useAddReviewMutation, useGetReviewQuery } = reviewApi;