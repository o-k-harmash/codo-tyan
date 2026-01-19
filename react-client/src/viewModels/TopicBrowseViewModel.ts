import { useEffect } from "react"
import type { ITopicBrowseViewModel } from "./ITopicBrowseViewModel"
import aggregate, {
  TopicBrowseAggregateRoot as Aggregare,
} from "./TopicBrowseAggregateRoot"
import type { TopicBrowse } from "./TopicBrowse"
import type { Tag } from "./Tag"
import ItemClient from "@/api/ItemClient"
import TagClient from "@/api/TagClient"
import type { TagList } from "./TagList"
import type { TopicBrowseSourceOfTruth } from "./TopicBrowseSourceOfTruth"

export default function useTopicBrowseViewModel(): TopicBrowse &
  ITopicBrowseViewModel {
  const state = aggregate.use()

  useEffect(() => {
    updateFormDataProcess(state)
  }, [])

  return {
    ...state,
    updateTag,
    updateOffset,
  }
}

export function updateTag(tag: Tag) {
  updateFormDataProcess(aggregate.computeNextStateWithToggledTag(tag))
}

export function updateOffset(offset: number) {
  updateFormDataProcess(aggregate.computeNextStateWithChangedOffset(offset))
}

export async function updateFormDataProcess({
  selectedTags,
  limit,
  offset,
}: TopicBrowseSourceOfTruth) {
  aggregate.status = Aggregare.LOADING

  let tags: TagList = aggregate.get().tags

  if (tags.length === 0) {
    const res = await TagClient.get()

    if (res.status === "abort") {
      return
    }

    if (res.status === "err") {
      throw res.error
    }

    tags = res.data
  }

  const res = await ItemClient.get(limit, offset, selectedTags)

  if (res.status === "abort") {
    return
  }

  if (res.status === "err") {
    throw res.error
  }

  aggregate.data = {
    tags,
    selectedTags,
    limit,
    offset,
    total: res.data.total,
    items: res.data.items,
  }

  aggregate.status = Aggregare.PENDING
}
