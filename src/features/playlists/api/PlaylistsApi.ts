import type {
  PlaylistData,
  PlaylistsResponse,
  RequestPlaylistArgs,
  RequestUpdatePlaylistArgs,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'
import type { Images } from '@/common/types'
import { baseApi } from '@/app/api/baseApi.ts'

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      providesTags: ['Playlist'],
      query: () => '/playlists',
    }),

    createPlaylist: build.mutation<{ data: PlaylistData }, { title: string; description: string }>({
      invalidatesTags: ['Playlist'],
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
      invalidatesTags: ['Playlist'],
      query: (playlistId) => {
        return {
          method: 'delete',
          url: `/playlists/${playlistId}`,
        }
      },
    }),

    updatePlaylist: build.mutation<void, UpdatePlaylistArgs>({
      invalidatesTags: ['Playlist'],
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
      invalidatesTags: ['Playlist'],
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
