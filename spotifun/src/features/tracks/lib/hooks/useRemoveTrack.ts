import { tracksKey } from "@/common/apiEntities"
import { type MouseEvent, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { showErrorToast, showSuccessToast } from "@/common/utils"
import type { Nullable } from "@/common/types"
import { queryClient } from "@/main.tsx"
import { tracksApi } from "../../api/tracksApi.ts"

export const useRemoveTrack = (onSuccess?: () => void) => {
  const [removingTrackId, setRemovingTrackId] = useState<Nullable<string>>(null)

  const { mutate } = useMutation({
    mutationFn: tracksApi.removeTrack,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [tracksKey] })
      showSuccessToast("Трек удален")
      onSuccess?.() // Чтобы сделать редирект на странице одного трека
    },
    onError: (err: unknown) => showErrorToast("Не удалось удалить трек", err),
    onSettled: () => setRemovingTrackId(null),
  })

  const removeTrack = (e: MouseEvent, trackId: string) => {
    e.preventDefault()
    if (confirm("Вы уверены, что хотите удалить трек?")) {
      setRemovingTrackId(trackId)
      mutate(trackId)
    }
  }

  return { removeTrack, removingTrackId }
}
