import Filter from "@/assets/filter.svg?react"
import { apiGetTags } from "@/services/api/tags"
import { useEffect, useState } from "react"

export type TagsProps = {
  selectedTags: Set<string>
  onClick: (tag: string) => void
  onLoading: (isLoading: boolean) => void
}

export function Tags({ selectedTags, onClick, onLoading }: TagsProps) {
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const getTags = async () => {
      onLoading(true)
      setTags(await apiGetTags())
      onLoading(false)
    }

    getTags()
  }, [onLoading])

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
