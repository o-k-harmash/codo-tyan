import ItemsPageStore from "@/features/items/ItemsPageStore"
import { describe, it, expect, beforeEach } from "vitest"

describe("ItemsPageStore", () => {
  let store: ItemsPageStore

  beforeEach(() => {
    store = new ItemsPageStore()
  })

  it("initial state should match defaults", () => {
    const snapshot = store.get()

    expect(snapshot.status).toBe("idle")
    expect(snapshot.items).toEqual([])

    expect(snapshot.form).toEqual({
      offset: 0,
      limit: 15,
      selectedTags: [],
    })

    expect(snapshot.pagination).toEqual({
      offset: 0,
      limit: 15,
      total: 0,
      next: null,
      prev: null,
      interval: [],
    })
  })

  it("updates status", () => {
    store.status = "loading"
    expect(store.get().status).toBe("loading")

    store.status = "pending"
    expect(store.get().status).toBe("pending")
  })

  it("updates data snapshot", () => {
    store.data = {
      status: "success",
      items: [
        {
          id: "1",
          title: "React course",
          description: "Learn React",
          tags: ["React"],
        },
      ],
      selectedTags: ["React", "TS"],
      total: 1,
      limit: 5,
      offset: 0,
    }

    const snapshot = store.get()

    expect(snapshot.status).toBe("success")
    expect(snapshot.items).toHaveLength(1)

    expect(snapshot.form).toEqual({
      offset: 0,
      limit: 5,
      selectedTags: ["React", "TS"],
    })

    expect(snapshot.pagination.total).toBe(1)
    expect(snapshot.pagination.limit).toBe(5)
    expect(snapshot.pagination.offset).toBe(0)
  })
})
