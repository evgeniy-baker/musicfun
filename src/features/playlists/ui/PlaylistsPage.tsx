import {
  useDeletePlaylistMutation,
  useFetchPlaylistsQuery,
  useUpdatePlaylistMutation,
} from '@/features/playlists/api/PlaylistsApi.ts'
import s from './PlaylistsPage.module.css'
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx'
import { UpdatePlaylistForm } from '@/features/playlists/ui/UpdatePlaylistForm/UpdatePlaylistForm.tsx'

export const PlaylistsPage = () => {
  const { data } = useFetchPlaylistsQuery()

  const [deletePlaylist] = useDeletePlaylistMutation()
  const [updatePlaylist] = useUpdatePlaylistMutation()

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Вы хотите удалить плэйлист?')) {
      deletePlaylist(playlistId)
    }
  }

  const updatePlaylistHandler = () => {
    updatePlaylist()
  }

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>

      <CreatePlaylistForm />
      {/*<UpdatePlaylistForm />*/}

      <div className={s.items}>
        {data?.data.map((playlist) => {
          return (
            <div className={s.item} key={playlist.id}>
              <div>title: {playlist.attributes.title}</div>
              <div>description: {playlist.attributes.description}</div>
              <div>userName: {playlist.attributes.user.name}</div>

              <button onClick={() => deletePlaylistHandler(playlist.id)}>delete</button>
              <button onClick={updatePlaylistHandler}>update</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
