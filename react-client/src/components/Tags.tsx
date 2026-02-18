import Filter from "@/assets/filter.svg?react"
import useApiError from "@/hooks/useApiError"
import { apiGetTags } from "@/services/api/tags"
import { useEffect, useState } from "react"

export type TagsProps = {
  selectedTags: Set<string>
  onClick: (tag: string) => void
  onLoading: (isLoading: boolean) => void
}

export function Tags({ selectedTags, onClick, onLoading }: TagsProps) {
  const [tags, setTags] = useState<string[]>([])
  const { setError } = useApiError()

  useEffect(() => {
    async function getTags() {
      onLoading(true)
      try {
        setTags(await apiGetTags())
      } catch (e) {
        setError(e)
      }
      onLoading(false)
    }

    getTags()
  }, [onLoading])

  return (
    <>
      <details className="browser__filters">
        <summary className="browser__burger btn btn--ghost">
          <Filter />
        </summary>

        <div className="browser__details">
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

      <div className="browser__filters-desktop">
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
    </>
  )
}
