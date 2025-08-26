import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-store-backend-9u3q.onrender.com/api/stats', credentials: 'include' }),
  endpoints: (build) => ({
    getStats: build.query({
      query: () => '/',
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;
