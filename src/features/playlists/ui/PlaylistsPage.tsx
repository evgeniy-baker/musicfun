import { useFetchPlaylistsQuery } from '@/features/playlists/api/PlaylistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem/PlaylistItem.tsx'
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx'

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery()

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>()

  const [playlistId, setPlaylistId] = useState<string | null>(null)

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id)
      reset({ title: playlist.attributes.title })
    } else {
      setPlaylistId(null)
    }
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
                <EditPlaylistForm
                  playlistId={playlist.id}
                  setPlaylistId={setPlaylistId}
                  editPlaylist={editPlaylistHandler}
                  register={register}
                  handleSubmit={handleSubmit}
                />
              ) : (
                <PlaylistItem playlist={playlist} editPlaylistHandler={editPlaylistHandler} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
