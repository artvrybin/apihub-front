import { uploadCover } from "@/common/utils/uploadCover.ts"
import { queryClient } from "@/main.tsx"
import { useMutation } from "@tanstack/react-query"
import noCover from "@/assets/img/no-cover.png"
import type { ChangeEvent } from "react"
import { PlaylistQueryKey, playlistsApi } from "../../../../../api/playlistsApi.ts"
import type { Playlist } from "../../../../../api/playlistsApi.types.ts"
import s from "./PlaylistCover.module.css"

type Props = {
  playlist: Playlist
}

export const PlaylistCover = ({ playlist }: Props) => {
  const { mutate } = useMutation({
    mutationFn: playlistsApi.uploadPlaylistCover,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PlaylistQueryKey] })
    },
  })

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    uploadCover({
      event,
      maxSize: 5 * 1024 * 1024,
      onSuccess: (file) => mutate({ playlistId: playlist.id, file }),
    })
  }

  const originalCover = playlist.attributes.images.main?.find((img) => img.type === "original")

  return (
    <div className={s.container}>
      <img src={originalCover ? originalCover.url : noCover} alt={"no cover image"} className={s.cover} />
      <div>
        <input type="file" accept="image/jpeg,image/png,image/gif" onChange={uploadCoverHandler} />
      </div>
    </div>
  )
}
