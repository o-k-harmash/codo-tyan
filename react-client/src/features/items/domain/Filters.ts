import type { TagList } from "../infrastructure/TagList"
import type { TagFilterState } from "./TagFilterState"

export class Filters {
  private _offset
  private _limit
  private _selectedTags: Record<string, boolean>

  constructor(
    offset: number,
    limit: number,
    selectedTags: Record<string, boolean>,
  ) {
    this._offset = offset
    this._limit = limit
    this._selectedTags = selectedTags
  }

  get offset() {
    return this._offset
  }

  get limit() {
    return this._limit
  }

  get selectedTags(): TagFilterState[] {
    return Object.entries(this._selectedTags).map(([id, isSelected]) => ({
      id,
      isSelected,
    }))
  }

  get selectedIds(): TagList {
    return Object.entries(this._selectedTags)
      .filter(([, selected]) => selected)
      .map(([id]) => id)
  }

  set offset(offset: number) {
    this._offset = offset
  }

  toggleTag(id: string) {
    this._offset = 0
    this._selectedTags = {
      ...this._selectedTags,
      [id]: !this._selectedTags[id],
    }
  }
}
