import s from './PlaylistsList.module.css'
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm.tsx'
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem/PlaylistItem.tsx'
import { useForm } from 'react-hook-form'
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types.ts'
import { useState } from 'react'

type Props = {
  playlists: PlaylistData[]
  isPlaylistsLoading: boolean
}

export const PlaylistsList = ({ playlists, isPlaylistsLoading }: Props) => {
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
    <div className={s.items}>
      {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
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
  )
}
