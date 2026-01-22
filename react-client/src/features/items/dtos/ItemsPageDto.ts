import type { TagFilterState } from "../domain/TagFilterState"
import type { ItemList } from "../infrastructure/ItemList"
import type { ItemRes } from "../infrastructure/ItemRes"

export type ItemsPageDto = ItemRes & {
  selectedTags: TagFilterState[]
  total: number
  items: ItemList
}
