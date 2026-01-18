import type { Tag } from "./Tag"

export interface ITopicBrowseViewModel {
  updateTag: (tag: Tag) => void
  updateOffset: (offset: number) => void
}
