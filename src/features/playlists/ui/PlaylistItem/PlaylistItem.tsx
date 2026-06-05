import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'
import { useDeletePlaylistMutation } from '@/features/playlists/api/PlaylistsApi.ts'
import defaultCover from '@/assets/images/default-playlist-cover.png'
import s from './PlaylistItem.module.css'

type PlaylistItemType = {
  playlist: PlaylistData
  editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylistHandler }: PlaylistItemType) => {
  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Вы хотите удалить плэйлист?')) {
      deletePlaylist(playlistId)
    }
  }

  return (
    <div>
      <img src={defaultCover} alt={'cover'} className={s.cover} />
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>

      <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
      <button onClick={() => editPlaylistHandler(playlist)}>update</button>
    </div>
  )
}
