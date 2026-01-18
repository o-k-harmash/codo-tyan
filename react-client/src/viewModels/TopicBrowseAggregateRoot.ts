import { useSyncExternalStore } from "react"
import initialState from "./TopicBrowseSettings"
import type { Status } from "./Status"
import type { TopicBrowse } from "./TopicBrowse"
import type { TopicBrowseSourceOfTruth } from "./TopicBrowseSourceOfTruth"
import { Store } from "@/helpers/Store"
import type { Tag } from "./Tag"

export class TopicBrowseAggregateRoot extends Store<TopicBrowse> {
  public static readonly PENDING: Status = "pending"
  public static readonly LOADING: Status = "loading"

  constructor() {
    super(initialState)
  }

  use(): TopicBrowse {
    return useSyncExternalStore(this.subscribe.bind(this), this.get.bind(this))
  }

  set status(status: Status) {
    this.updateStatus(status)
  }

  set data(data: TopicBrowseSourceOfTruth) {
    this.set((state) => ({
      ...state,
      ...data,
    }))
  }

  updateSelectionAndGetSnapshot(tag: Tag): TopicBrowse {
    const state = this.get()
    return {
      ...state,
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
      offset: 0,
    }
  }

  updateOffsetAndGetSnapshot(offset: number): TopicBrowse {
    return {
      ...this.get(),
      offset,
    }
  }

  private updateStatus(status: Status) {
    this.set((state) => ({
      ...state,
      status,
    }))
  }
}

export default new TopicBrowseAggregateRoot()
