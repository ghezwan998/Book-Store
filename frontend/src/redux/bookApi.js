import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-store-backend-9u3q.onrender.com/api/book', credentials: 'include' }),
  tagTypes: ['Books'],
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => '',
      providesTags: ['Books'],
    }),
    getSingleBook: build.query({
      query: (id) => `/${id}`,
      providesTags: ['Books'],
    }),
    deleteBook: build.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
    }),
    addBook: build.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Books'], 
    }),
    addReview: build.mutation({
      query: ({bookId, review}) => ({
        url: `/${bookId}/review`,
        method: 'POST',
        body: review,
      }),
      invalidatesTags: ['Books'],
    })
  }),
})

export const { useGetBooksQuery, useGetSingleBookQuery, useDeleteBookMutation, useAddBookMutation, useAddReviewMutation } = booksApi;
