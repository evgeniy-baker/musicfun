import { useFetchPlaylistsQuery } from '@/features/playlists/api/PlaylistsApi.ts'

export const PlaylistsPage = () => {
  const fu = async () => {
    console.log(await useFetchPlaylistsQuery())
  }
  fu()
  // const { data } = useFetchPlaylistsQuery()

  return (
    <div>
      <h1>Playlists page</h1>
    </div>
  )
}
