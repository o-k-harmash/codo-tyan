import { describe, it, expect, beforeEach } from "vitest"
import { TopicBrowseAggregateRoot } from "@/viewModels/TopicBrowseAggregateRoot"
import type { TopicBrowseSourceOfTruth } from "@/viewModels/TopicBrowseSourceOfTruth"
import initialState from "@/viewModels/TopicBrowseSettings"

describe("TopicBrowsePresentation", () => {
  let store: TopicBrowseAggregateRoot

  beforeEach(() => {
    store = new TopicBrowseAggregateRoot()
    store.data = { ...store.get(), selectedTags: ["JS", "TS"] }
  })

  it("initial state should match initial snapshot", () => {
    const snapshot = new TopicBrowseAggregateRoot().get()
    expect(snapshot.status).toBe(initialState.status)
    expect(snapshot.tags).toEqual(initialState.tags)
    expect(snapshot.selectedTags).toEqual(initialState.selectedTags)
    expect(snapshot.items).toEqual(initialState.items)
    expect(snapshot.total).toBe(initialState.total)
    expect(snapshot.limit).toBe(initialState.limit)
    expect(snapshot.offset).toBe(initialState.offset)
  })

  it("should update status", () => {
    store.status = TopicBrowseAggregateRoot.LOADING
    expect(store.get().status).toBe("loading")

    store.status = TopicBrowseAggregateRoot.PENDING
    expect(store.get().status).toBe("pending")
  })

  it("should update data", () => {
    const newData: TopicBrowseSourceOfTruth = {
      selectedTags: ["React", "TS"],
      tags: ["React", "TS", "JS"],
      items: [
        {
          id: "id1",
          title: "React course",
          description:
            "Learn the fundamentals of React including JSX, component lifecycle, hooks, and state management. Build dynamic single-page applications step by step.",
          tags: ["React"],
        },
      ],
      total: 1,
      limit: 5,
      offset: 0,
    }

    store.data = newData
    const snapshot = store.get()
    expect(snapshot.selectedTags).toEqual(["React", "TS"])
    expect(snapshot.tags).toEqual(["React", "TS", "JS"])
    expect(snapshot.items).toHaveLength(1)
    expect(snapshot.total).toBe(1)
    expect(snapshot.limit).toBe(5)
  })

  it("adds a tag if not present", () => {
    const snapshot = store.computeNextStateWithToggledTag("React")
    expect(snapshot.selectedTags).toEqual(["JS", "TS", "React"])
  })

  it("removes a tag if present", () => {
    const snapshot = store.computeNextStateWithToggledTag("TS")
    expect(snapshot.selectedTags).toEqual(["JS"])
  })

  it("does not mutate original array", () => {
    const snapshot = store.get()
    const copy = [...snapshot.selectedTags]
    store.computeNextStateWithToggledTag("React")
    expect(snapshot.selectedTags).toEqual(copy)
  })

  it("drop offset after toggling tag", () => {
    const snapshot = store.get()
    store.computeNextStateWithToggledTag("React")
    expect(snapshot.offset).toEqual(0)
  })
})
