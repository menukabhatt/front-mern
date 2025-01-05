import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../../app/apiUrl";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({


    userLogin: builder.mutation({
      query: (q) => ({
        url: '/users/login',
        body: q,
        method: 'POST',

      })
    }),

    userSignUp: builder.mutation({
      query: (q) => ({
        url: '/users/register',
        body: q,
        method: 'POST',
      })
    }),

    updateUser: builder.mutation({
      query: (q) => ({
        url: '/users/update-user',
        body: q.body,
        headers: {
          'Authorization': q.token
        },
        method: 'PATCH',
      })
    }),

    getUser: builder.query({
      query: (token) => ({
        url: '/users/get-user',
        headers: {
          'Authorization': token
        },
        method: 'GET',
      })
    })



  })

});


export const { useUserLoginMutation, useUserSignUpMutation, useUpdateUserMutation, useGetUserQuery } = authApi;