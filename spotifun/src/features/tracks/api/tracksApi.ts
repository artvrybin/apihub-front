import { playlistsEndpoint, tracksEndpoint } from "@/common/apiEntities"
import { instance } from "@/common/instance"
import type { Cover } from "@/common/types"
import { joinUrl } from "@/common/utils"
import type {
  FetchPlaylistsTracksResponse,
  FetchTracksResponse,
  TrackDetailAttributes,
  TrackDetails,
  UpdateTrackArgs,
} from "./tracksApi.types.ts"

const relationshipsSegment = "relationships"

export const tracksApi = {
  fetchTracks: () => {
    return instance.get<FetchTracksResponse>(joinUrl(playlistsEndpoint, tracksEndpoint))
  },

  fetchTracksInPlaylist: ({ playlistId }: { playlistId: string }) => {
    return instance.get<FetchPlaylistsTracksResponse>(joinUrl(playlistsEndpoint, playlistId, tracksEndpoint))
  },

  fetchTrackById: (trackId: string) => {
    return instance.get<{ data: TrackDetails<TrackDetailAttributes> }>(
      joinUrl(playlistsEndpoint, tracksEndpoint, trackId),
    )
  },

  createTrack: ({ playlistId, title, file }: { playlistId: string; title: string; file: File }) => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("file", file)

    return instance.post<{ data: TrackDetails<TrackDetailAttributes> }>(
      joinUrl(playlistsEndpoint, playlistId, tracksEndpoint, "upload"),
      formData,
    )
  },

  removeTrack: (trackId: string) => {
    return instance.delete<void>(joinUrl(playlistsEndpoint, tracksEndpoint, trackId))
  },

  uploadTrackCover: ({ trackId, file }: { trackId: string; file: File }) => {
    const formData = new FormData()
    formData.append("cover", file)
    return instance.post<Cover>(joinUrl(playlistsEndpoint, tracksEndpoint, trackId, "cover"), formData)
  },

  updateTrack: ({ trackId, payload }: { trackId: string; payload: UpdateTrackArgs }) => {
    return instance.put<{
      data: TrackDetails<TrackDetailAttributes>
    }>(joinUrl(playlistsEndpoint, tracksEndpoint, trackId), payload)
  },

  addTrackToPlaylist: ({ playlistId, trackId }: { playlistId: string; trackId: string }) => {
    return instance.post<void>(joinUrl(playlistsEndpoint, playlistId, relationshipsSegment, tracksEndpoint), {
      trackId,
    })
  },

  removeTrackFromPlaylist: ({ playlistId, trackId }: { playlistId: string; trackId: string }) => {
    return instance.delete<void>(joinUrl(playlistsEndpoint, playlistId, relationshipsSegment, tracksEndpoint, trackId))
  },
}
