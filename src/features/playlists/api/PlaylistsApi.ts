import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  CreatePlaylistArgs,
  PlaylistData,
  PlaylistsResponse,
} from '@/features/playlists/api/playlistsApi.types.ts'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
  }),

  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => 'playlists',
    }),

    createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
      query: (body) => ({ method: 'post', url: 'playlists', body }),
    }),

    //
  }),
})

export const { useFetchPlaylistsQuery, useCreatePlaylistMutation } = playlistsApi
