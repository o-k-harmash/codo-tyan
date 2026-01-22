import Filter from "@/assets/filter.svg?react"
import GlyphLeft from "@/assets/glyph__left.svg?react"
import GlyphRight from "@/assets/glyph__right.svg?react"
import useItemsPage from "./useItemsPage"

function Spinner({ visible }: { visible: boolean }) {
  return (
    <div data-visible={visible} className="page-loader">
      <div className="page-loader__spinner"></div>
    </div>
  )
}

export default function ItemsPage() {
  const { status, items, form, pagination, toggleTag, changePage } =
    useItemsPage()

  if (status === "idle") {
    return <Spinner visible={true}></Spinner>
  }

  return (
    <>
      <Spinner visible={status === "loading"}></Spinner>

      {/* Tags filter section */}
      <details className="filters">
        <summary className="filters__toggle btn btn--ghost">
          <Filter />
        </summary>

        <div className="filters__content">
          {form.selectedTags.map((t) => (
            <button
              key={t.id}
              data-selected={t.isSelected}
              onClick={() => toggleTag(t.id)}
              className="tag"
            >
              {t.id}
            </button>
          ))}
        </div>
      </details>

      {/* Topics list section */}
      <ul
        className="flex w-full max-w-2xl flex-col gap-(--space-md)
          mt-(--space-md)"
      >
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-(--space-md) rounded-md border
              border-gray-300 p-(--space-md)"
          >
            <h3>{item.title}</h3>

            {/* Display tags for each topic */}
            <div className="flex flex-wrap gap-(--space-sm)">
              {item.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-justify">{item.description}</p>
          </li>
        ))}
      </ul>

      {/* Pagination / info section */}
      {/**TODO: pagination logic */}
      <div className="pagination">
        <button className="pagination__arrow">
          <GlyphLeft></GlyphLeft>
        </button>

        <ul className="pagination__list">
          {Array.from({ length: 5 }, (_, id) => (
            <li key={id}>
              <button
                disabled={pagination.offset === id}
                onClick={() => changePage(id)}
                className="pagination__item"
              >
                {id + 1}
              </button>
            </li>
          ))}
        </ul>

        <button className="pagination__arrow">
          <GlyphRight></GlyphRight>
        </button>
      </div>
    </>
  )
}
