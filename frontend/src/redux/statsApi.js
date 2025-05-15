import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/stats', credentials: 'include' }),
  endpoints: (build) => ({
    getStats: build.query({
      query: () => '/',
    }),
  }),
});

export const { useGetStatsQuery } = statsApi;