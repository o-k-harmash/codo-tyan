import type { ItemList } from "./ItemList"
import type { TagList } from "./TagList"

export type TopicBrowseSourceOfTruth = {
  total: number
  limit: number
  offset: number
  selectedTags: TagList
  tags: TagList
  items: ItemList
}
