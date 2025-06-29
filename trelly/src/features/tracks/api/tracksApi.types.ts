import type { Images, Meta, Nullable, User } from "@/common/types"

export type TrackDetails<T> = {
  id: string
  type: "tracks"
  attributes: T
}

// Attributes
export type BaseAttributes = {
  title: string
  addedAt: string
  attachments: TrackAttachment[]
  images: Images
}

export type FetchTracksAttributes = BaseAttributes & {
  user: User
}

export type TrackDetailAttributes = BaseAttributes & {
  lyrics: Nullable<string>
  releaseDate: Nullable<string>
  updatedAt: string
  duration: number
  processingStatus: "uploaded" // TODO: какие еще будут статусы ?
  visibility: "private" // TODO: какие еще будут типы ?
  tags: { id: string; originalName: string }[]
  artists: { id: string; name: string }[]
}

export type PlaylistItemAttributes = BaseAttributes & {
  updatedAt: string
  order: number
}

// Attachment
export type TrackAttachment = {
  id: string
  addedAt: string
  updatedAt: string
  version: number
  url: string
  contentType: string
  originalName: string
  originalKey: string
  fileSize: number
}

// Response
export type FetchTracksResponse = {
  data: TrackDetails<FetchTracksAttributes>[]
  meta: Meta
}

export type FetchPlaylistsTracksResponse = {
  data: TrackDetails<PlaylistItemAttributes>[]
  meta: Meta
}

// Arguments
// TODO: Часть свойств можно взять из TrackDetailAttributes, и добавить tagIds, artistsIds
// Не факт что станет читаемее
export type UpdateTrackArgs = {
  title?: string
  lyrics?: string
  processingStatus?: "uploaded"
  visibility?: "private"
  duration?: number
  releaseDate?: string
  tagIds?: string[]
  artistsIds?: string[]
}
