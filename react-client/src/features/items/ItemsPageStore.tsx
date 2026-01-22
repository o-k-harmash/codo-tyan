import { Store } from "@/helpers/Store"
import type { Status } from "@/viewModels/Status"
import { useSyncExternalStore } from "react"
import type { ItemsPageDto } from "./dtos/ItemsPageDto"
import type { ItemsPage } from "./models/ItemsPage"

export default class ItemsPageStore extends Store<ItemsPage> {
  constructor() {
    super({
      form: { offset: 0, limit: 15, selectedTags: [] },
      pagination: {
        offset: 0,
        limit: 15,
        total: 0,
        next: null,
        prev: null,
        interval: [],
      },
      items: [],
      status: "idle",
    })
  }

  use(): ItemsPage {
    return useSyncExternalStore(this.subscribe.bind(this), this.get.bind(this))
  }

  set status(status: Status) {
    this.updateStatus(status)
  }

  set data(data: { status: Status } & ItemsPageDto) {
    this.set((state) => ({
      ...state,
      ...data,
      form: {
        limit: data.limit,
        offset: data.offset,
        selectedTags: data.selectedTags,
      },
      pagination: {
        total: data.total,
        limit: data.limit,
        offset: data.offset,
        next: null,
        prev: null,
        interval: [],
      },
    }))
  }

  private updateStatus(status: Status) {
    this.set((state) => ({
      ...state,
      status,
    }))
  }
}
