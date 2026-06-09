import type { PlaylistData } from '@/features/playlists/api/playlistsApi.types.ts'
import { useDeletePlaylistMutation } from '@/features/playlists/api/PlaylistsApi.ts'
import { PlaylistCover } from '@/features/playlists/ui/PlaylistItem/PlaylistCover/PlaylistCover.tsx'
import { PlaylistDescription } from '@/features/playlists/ui/PlaylistItem/PlaylistDescription/PlaylistDescription.tsx'

type PlaylistItemType = {
  playlist: PlaylistData
  editPlaylistHandler: (playlist: PlaylistData) => void
}

export const PlaylistItem = ({ playlist, editPlaylistHandler }: PlaylistItemType) => {
  const [deletePlaylist] = useDeletePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Do you want to delete the playlist?')) {
      deletePlaylist(playlistId)
    }
  }

  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />
      <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
      <button onClick={() => editPlaylistHandler(playlist)}>update</button>
    </div>
  )
}
