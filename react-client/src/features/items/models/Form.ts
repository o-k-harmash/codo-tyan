import type { TagFilterState } from "../domain/TagFilterState"

export type Form = {
  offset: number
  limit: number
  selectedTags: TagFilterState[]
}
