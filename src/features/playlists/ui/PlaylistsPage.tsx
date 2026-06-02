import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
  useUpdatePlaylistMutation,
} from '@/features/playlists/api/PlaylistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useState } from 'react'
import type { UpdatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery()
  const [deletePlaylist] = useDeletePlaylistMutation()
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Вы хотите удалить плэйлист?')) {
      deletePlaylist(playlistId)
    }
  }

  const editPlaylistHandler = (playlistId: null | string) => {
    if (playlistId) {
      setPlaylistId(playlistId)
    } else {
      setPlaylistId(null)
    }
  }

  const { register, handleSubmit } = useForm<UpdatePlaylistArgs>()
  const onSubmit: SubmitHandler<UpdatePlaylistArgs> = ({ title, description }) => {
    updatePlaylist({ playlistId, title, description })
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>

      <CreatePlaylistForm />

      <div className={s.items}>
        {data?.data.map((playlist) => {
          const isEditing = playlist.id === playlistId

          return (
            <div className={s.item} key={playlist.id}>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2>Edit playlist</h2>
                  <div>
                    <input {...register('title')} placeholder={'title'} />
                  </div>
                  <div>
                    <input {...register('description')} placeholder={'description'} />
                  </div>
                  <button type={'submit'}>edit playlist</button>
                  <button type={'button'} onClick={() => editPlaylistHandler(null)}>
                    cancel
                  </button>
                </form>
              ) : (
                <div>
                  <div>title: {playlist.attributes.title}</div>
                  <div>description: {playlist.attributes.description}</div>
                  <div>userName: {playlist.attributes.user.name}</div>

                  <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
                  <button onClick={() => editPlaylistHandler(playlist.id)}>update</button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
