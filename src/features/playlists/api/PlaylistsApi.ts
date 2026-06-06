import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  PlaylistData,
  PlaylistsResponse,
  RequestPlaylistArgs,
  RequestUpdatePlaylistArgs,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'
import type { Images } from '@/common/types'

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  tagTypes: ['Playlists'],
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
      providesTags: ['Playlists'],
      query: () => '/playlists',
    }),

    createPlaylist: build.mutation<{ data: PlaylistData }, { title: string; description: string }>({
      invalidatesTags: ['Playlists'],
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
      invalidatesTags: ['Playlists'],
      query: (playlistId) => {
        return {
          method: 'delete',
          url: `/playlists/${playlistId}`,
        }
      },
    }),

    updatePlaylist: build.mutation<void, UpdatePlaylistArgs>({
      invalidatesTags: ['Playlists'],
      query: ({ playlistId, title }) => {
        const body: RequestUpdatePlaylistArgs = {
          data: {
            type: 'playlists',
            attributes: {
              title,
              description: 'Cool playlist',
              tagIds: [],
            },
          },
        }

        return {
          method: 'put',
          url: `/playlists/${playlistId}`,
          body,
        }
      },
    }),

    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      invalidatesTags: ['Playlists'],
      query: ({ playlistId, file }) => {
        const formData = new FormData()
        formData.append('file', file)
        return {
          method: 'post',
          url: `/playlists/${playlistId}/images/main`,
          body: formData,
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
  useUploadPlaylistCoverMutation,
} = playlistsApi
