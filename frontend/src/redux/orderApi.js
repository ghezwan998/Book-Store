import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-store-backend-9u3q.onrender.com/api/order' ,credentials: 'include',}),
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: '/',
        method: 'POST',
        body: orderData,
      }),
    }),
    getAllOrders: builder.query({
       query: () => ({
        url: '/',
        method: 'GET',
        providesTags: ['Orders'],
       }) 
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Orders'],
    }),
    markAsDelivered: builder.mutation({
      query: (id) => ({
        url: `/${id}/deliver`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const { usePlaceOrderMutation, useGetAllOrdersQuery, useDeleteOrderMutation, useMarkAsDeliveredMutation } = orderApi;
