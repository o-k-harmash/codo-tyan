import { useEffect } from "react"
import type { IUseItemsPage } from "./IUseItemsPage"
import ItemsPageStore from "./ItemsPageStore"
import { Filters } from "./domain/Filters"
import type { ItemsPage } from "./models/ItemsPage"
import TagClient from "./infrastructure/TagClient"
import ItemClient from "./infrastructure/ItemClient"

let filters: Filters | null = null
const store = new ItemsPageStore()

export default function useItemsPage(): ItemsPage & IUseItemsPage {
  const state = store.use()

  useEffect(() => {
    ;(async () => {
      const offset = 0
      const limit = 15

      const [tres, ires] = await Promise.all([
        TagClient.get(),
        ItemClient.get(limit, offset, []),
      ])

      if (tres.status === "abort" || ires.status === "abort") {
        return
      }

      if (tres.status === "err" || ires.status === "err") {
        throw new Error()
      }

      const record: Record<string, boolean> = {}

      for (const tag of tres.data) {
        record[tag] = false
      }

      filters = new Filters(offset, limit, record)

      store.data = {
        total: ires.data.total,
        limit: filters.limit,
        offset: filters.offset,
        selectedTags: filters.selectedTags,
        items: ires.data.items,
        status: "pending",
      }
    })()
  }, [])

  return {
    ...state,
    toggleTag,
    changePage,
  }
}

async function toggleTag(tagId: string) {
  if (!filters) {
    return
  }

  store.status = "loading"
  filters.toggleTag(tagId)

  const ires = await ItemClient.get(
    filters.limit,
    filters.offset,
    filters.selectedIds,
  )

  if (ires.status === "abort") {
    return
  }

  if (ires.status === "err") {
    throw new Error()
  }

  store.data = {
    total: ires.data.total,
    limit: filters.limit,
    offset: filters.offset,
    selectedTags: filters.selectedTags,
    items: ires.data.items,
    status: "pending",
  }
}

async function changePage(pageId: number) {
  if (!filters) {
    return
  }

  store.status = "loading"
  filters.offset = pageId

  const ires = await ItemClient.get(
    filters.limit,
    filters.offset,
    filters.selectedIds,
  )

  if (ires.status === "abort") {
    return
  }

  if (ires.status === "err") {
    throw new Error()
  }

  store.data = {
    total: ires.data.total,
    limit: filters.limit,
    offset: filters.offset,
    selectedTags: filters.selectedTags,
    items: ires.data.items,
    status: "pending",
  }
}
