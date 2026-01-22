import type { TagList } from "./TagList"

/**
 * Item structure returned by the API.
 *
 * This is a data contract (DTO), not a business model.
 * It contains no behavior, invariants, or validation logic.
 */
export type Item = {
  id: string
  title: string
  description: string
  tags: TagList
}
