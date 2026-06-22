import { useCallback, useEffect, useRef } from 'react'

type Props = {
  hasNextPage: boolean
  isFetching: boolean
  fetchNextPage: () => void
  rootMargin?: string
  threshold?: number
}

export const useInfiniteScroll = ({
  hasNextPage,
  isFetching,
  fetchNextPage,
  rootMargin = '100px',
  threshold = 0.1,
}: Props) => {
  const observerRef = useRef<HTMLDivElement | null>(null)

  const loadMoreHandler = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {
    // IntersectionObserver отслеживает элементы и сообщает, насколько они видны во viewport
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const observer = new IntersectionObserver(
      (entries) => {
        // entries - наблюдаемый элемент
        if (entries.length > 0 && entries[0].isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null, // Отслеживание относительно окна браузера (viewport). null = весь экран
        rootMargin, // Начинать загрузку до появления элемента
        threshold, // Срабатывать когда % элемента становится видимым
      },
    )

    const currentObserverRef = observerRef.current
    if (currentObserverRef) {
      // начинает наблюдение за элементом
      observer.observe(currentObserverRef)
    }

    // Функция очистки - прекращает наблюдение при размонтировании компонента
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMoreHandler, rootMargin, threshold])

  return { observerRef }
}
