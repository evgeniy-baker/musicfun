import { useFetchTracksInfiniteQuery } from '@/features/tracks/api/tracksApi.ts'
import { TracksList } from '@/features/tracks/ui/TracksList/TracksList.tsx'
import { LoadingTrigger } from '@/features/tracks/ui/LoadingTrigger/LoadingTrigger.tsx'
import { useInfiniteScroll } from '@/common/hoocks'

export const TracksPage = () => {
  const { data, hasNextPage, isFetching, isLoading, isFetchingNextPage, fetchNextPage } =
    useFetchTracksInfiniteQuery()

  const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetching })

  const pages = data?.pages.flatMap((page) => page.data) || []

  return (
    <div>
      <h1>Tracks page</h1>

      {isLoading && <h1>Loading...</h1>}

      <TracksList tracks={pages} />

      {hasNextPage && (
        <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage} />
      )}

      {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
    </div>
  )
}
