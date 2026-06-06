import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'
import {
  useDeletePlaylistMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/PlaylistsApi.ts'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistItem.module.css'
import type { ChangeEvent } from 'react'

type PlaylistItemType = {
  playlist: PlaylistData
  editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylistHandler }: PlaylistItemType) => {
  const [deletePlaylist] = useDeletePlaylistMutation()
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()

  const cover = playlist.attributes.images.main.find((img) => img.type === 'original')
  const url = cover?.url ? cover?.url : defaultCover

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Вы хотите удалить плэйлист?')) {
      deletePlaylist(playlistId)
    }
  }

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length && event.target.files[0]
    if (!file) return
    uploadPlaylistCover({ playlistId: playlist.id, file })
  }

  return (
    <div>
      <img src={url} alt={'cover'} className={s.cover} />
      <input type="file" onChange={uploadCoverHandler} />
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>

      <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
      <button onClick={() => editPlaylistHandler(playlist)}>update</button>
    </div>
  )
}
