import defaultCover from '@/assets/images/default-playlist-cover.png'
import type { ChangeEvent } from 'react'
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from '@/features/playlists/api/PlaylistsApi.ts'
import s from './PlaylistCover.module.css'
import type { Images } from '@/common/types'

type Props = {
  playlistId: string
  images: Images
}

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation()

  const originalCover = images.main.find((img) => img.type === 'original')
  const url = originalCover ? originalCover.url : defaultCover

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const allowedTypes = ['image/png, image/jpeg, image/gif']
    const maxSize = 1024 * 1024 // 1 MB
    const file = event.target.files?.length && event.target.files[0]
    if (!file) return

    if (allowedTypes.includes(file.type)) {
      alert('Only JPEG, PNG or GIF images are allowed')
      return
    }
    if (file.size > maxSize) {
      alert(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)
    }

    uploadPlaylistCover({ playlistId, file })
  }
  const deleteCoverHandler = () => deletePlaylistCover(playlistId)

  return (
    <>
      <img src={url} alt={'cover'} className={s.cover} />

      <input
        type="file"
        accept={'image/png, image/jpeg, image/gif'}
        onChange={uploadCoverHandler}
      />

      {originalCover && <button onClick={deleteCoverHandler}>delete cover</button>}
    </>
  )
}
