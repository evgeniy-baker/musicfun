import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts'
import s from './TracksPage.module.css'

export const TracksPage = () => {
  const { data } = useFetchTracksInfiniteQuery()

  return (
    <div>
      <h1>Tracks page</h1>
      <div className={s.list}>
        {data?.pages[0].data.map((track) => {
          const { title, user, attachments } = track.attributes

          return (
            <div key={track.id} className={s.item}>
              <div>
                <p>Title: {title}</p>
                <p>Name: {user.name}</p>
              </div>
              {attachments.length ? <audio controls src={attachments[0].url} /> : 'no file'}
            </div>
          )
        })}
      </div>
    </div>
  )
}
