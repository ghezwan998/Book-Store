import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => '',
      providesTags: ["User"]
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: build.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    getProfile: build.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    toggleAdmin: build.mutation({
      query: ({ id, isAdmin }) => ({
        url: `/${id}/role`,
        method: "PATCH",
        body: { isAdmin },
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["User"],
    })
  }),
});

export const {
  useGetAllUsersQuery,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
  useToggleAdminMutation,
  useDeleteUserMutation,
} = userApi;
