import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const {} = playlistsApi

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
  }),

  endpoints: (build) => ({
    fetchPlaylists: build.query<any, any>({
      query: () => `playlist`,
    }),
  }),
})
