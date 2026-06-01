import type { CreatePlaylistArgs } from '@/features/playlists/api/playlistsApi.types.ts'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useUpdatePlaylistMutation } from '@/features/playlists/api/PlaylistsApi.ts'

export const UpdatePlaylistForm = () => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()

  const [updatePlaylist] = useUpdatePlaylistMutation()
  a
  const onSubmit: SubmitHandler = () => {
    updatePlaylist()
      .unwrap()
      .then(() => {
        reset()
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Update playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <button>update playlist</button>
    </form>
  )
}
