import { Filters } from "@/features/items/domain/Filters"
import { describe, it, expect, beforeEach } from "vitest"

describe("Filters", () => {
  let filters: Filters

  beforeEach(() => {
    filters = new Filters(10, 15, {
      JS: true,
      TS: true,
    })
  })

  it("exposes offset and limit", () => {
    expect(filters.offset).toBe(10)
    expect(filters.limit).toBe(15)
  })

  it("returns selectedTags as TagFilterState[]", () => {
    expect(filters.selectedTags).toEqual([
      { id: "JS", isSelected: true },
      { id: "TS", isSelected: true },
    ])
  })

  it("returns only selected ids", () => {
    expect(filters.selectedIds).toEqual(["JS", "TS"])
  })

  it("adds tag if not present", () => {
    filters.toggleTag("React")

    expect(filters.selectedIds).toEqual(["JS", "TS", "React"])
  })

  it("removes tag if already selected", () => {
    filters.toggleTag("TS")

    expect(filters.selectedIds).toEqual(["JS"])
  })

  it("resets offset after toggling tag", () => {
    filters.toggleTag("React")

    expect(filters.offset).toBe(0)
  })

  it("does not mutate previous selectedTags reference", () => {
    const snapshot = filters.selectedTags

    filters.toggleTag("React")

    expect(filters.selectedTags).not.toBe(snapshot)
    expect(snapshot).toEqual([
      { id: "JS", isSelected: true },
      { id: "TS", isSelected: true },
    ])
  })
})
