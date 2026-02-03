import Filter from "@/assets/filter.svg?react"
import { apiGetTags } from "@/services/api/tags"
import type { AppError } from "@/utils/appError"
import { useEffect, useState } from "react"

export type TagsProps = {
  selectedTags: Set<string>
  onClick: (tag: string) => void
  onLoading: (isLoading: boolean) => void
}

export function Tags({ selectedTags, onClick, onLoading }: TagsProps) {
  const [tags, setTags] = useState<string[]>([])
  const [error, setError] = useState<AppError | null>()

  useEffect(() => {
    async function getTags() {
      onLoading(true)
      try {
        setTags(await apiGetTags())
      } catch (error) {
        setError(error as AppError)
      }
      onLoading(false)
    }

    getTags()
  }, [onLoading])

  if (error) {
    switch (error.type) {
      default:
        throw error
    }
  }

  return (
    <details className="filters">
      <summary className="filters__toggle btn btn--ghost">
        <Filter />
      </summary>

      <div className="filters__content">
        {tags.map((t) => (
          <button
            type="button"
            className="tag"
            key={t}
            data-selected={selectedTags.has(t)}
            onClick={() => onClick(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </details>
  )
}
