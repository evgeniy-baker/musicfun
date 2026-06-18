import type { CurrentUserReaction } from '@/common/enums'
import type { Images, Tag, User } from '@/common/types'

export type PlaylistsResponse = {
  data: PlaylistData[]
  meta: PlaylistMeta
}

export type PlaylistData = {
  id: string
  type: 'playlists'
  attributes: PlaylistAttributes
}

//  Pagination
export type PlaylistMeta = {
  page: number
  pageSize: number
  totalCount: number
  pagesCount: number
}

export type PlaylistAttributes = {
  title: string
  description: string
  addedAt: string
  updatedAt: string
  order: number
  dislikesCount: number
  likesCount: number
  tags: Tag[]
  images: Images
  user: User
  currentUserReaction: CurrentUserReaction
}

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number
  pageSize?: number
  search?: string
  sortBy?: 'addedAt' | 'likesCount'
  sortDirection?: 'asc' | 'desc'
  tagsIds?: string[]
  userId?: string
  trackId?: string
}

export type CreatePlaylistArgs = {
  title: string
  description: string
}
export type RequestPlaylistArgs = {
  data: {
    type: 'playlists'
    attributes: CreatePlaylistArgs
  }
}

export type UpdatePlaylistArgs = {
  playlistId?: string | null
  title: string
  description: string
}
export type RequestUpdatePlaylistArgs = {
  data: {
    type: 'playlists'
    attributes: {
      title: string
      description: 'Cool playlist'
      tagIds: []
    }
  }
}
