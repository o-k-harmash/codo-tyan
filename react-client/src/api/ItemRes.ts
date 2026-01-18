import type { ItemList } from "./ItemList"
import type { Pagination } from "./Pagination"

/**
 * API response structure for paginated items.
 *
 * Represents raw backend data and may be cached or mapped
 * into presentation or business models if needed.
 */
export type ItemRes = Pagination & {
  items: ItemList
}
