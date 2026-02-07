import GlyphLeft from "@/assets/glyph__left.svg?react"
import GlyphRight from "@/assets/glyph__right.svg?react"
import { range } from "@/utils/range"

interface PaginationProps {
  onClick: (page: number) => void
  totalPages: number
  page: number
}

export function Pagination({ totalPages, page, onClick }: PaginationProps) {
  const MAX_VISIBLE = 10
  const half = Math.floor(MAX_VISIBLE / 2)

  const left = Math.max(page - half, 1)
  const right = Math.min(page + half, totalPages)

  let pages: (number | null)[]

  if (totalPages <= MAX_VISIBLE) {
    pages = range(1, totalPages, 1)
  } else if (left === 1) {
    pages = [...range(1, MAX_VISIBLE, 1), null, totalPages]
  } else if (right === totalPages) {
    pages = [1, null, ...range(totalPages - MAX_VISIBLE + 1, totalPages, 1)]
  } else {
    pages = [1, null, ...range(left, right, 1), null, totalPages]
  }

  return (
    <div className="browser__pagination">
      <button
        type="button"
        className="browser__arrow"
        onClick={() => onClick(page - 1)}
        disabled={page === 1}
      >
        <GlyphLeft />
      </button>

      {pages.map((i, k) =>
        i === null ? (
          <span key={k} className="browser__page">
            …
          </span>
        ) : (
          <button
            key={k}
            type="button"
            className="browser__page"
            onClick={() => onClick(i)}
            disabled={page === i}
            data-selected={page === i}
          >
            {i}
          </button>
        ),
      )}

      <button
        type="button"
        className="browser__arrow"
        onClick={() => onClick(page + 1)}
        disabled={page === totalPages}
      >
        <GlyphRight />
      </button>
    </div>
  )
}
