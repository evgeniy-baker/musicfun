import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  PlaylistData,
  PlaylistsResponse,
  RequestPlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',

  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`)
      return headers
    },
  }),

  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => '/playlists',
    }),

    createPlaylist: build.mutation<{ data: PlaylistData }, { title: string; description: string }>({
      query: ({ title, description }) => {
        const body: RequestPlaylistArgs = {
          data: {
            type: 'playlists',
            attributes: {
              title,
              description,
            },
          },
        }
        return {
          method: 'post',
          url: '/playlists',
          body,
        }
      },
    }),

    deletePlaylist: build.mutation<void, string>({
      query: (playlistId) => {
        return {
          method: 'delete',
          url: `/playlists/${playlistId}`,
        }
      },
    }),

    updatePlaylist: build.mutation<void, { playlistId: string; title: string }>({
      query: ({ playlistId, title }) => {
        return {
          method: 'put',
          url: `/playlists/${playlistId}`,
          body: {
            data: {
              type: 'playlists',
              attributes: {
                title,
                description: 'Cool playlist',
                tagIds: [],
              },
            },
          },
        }
      },
    }),

    //
  }),
})

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistMutation,
} = playlistsApi
