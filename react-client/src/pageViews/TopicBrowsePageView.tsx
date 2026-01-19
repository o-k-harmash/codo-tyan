import Filter from "@/assets/filter.svg?react"
import useTopicBrowseViewModel from "@/viewModels/TopicBrowseViewModel"
import GlyphLeft from "@/assets/glyph__left.svg?react"
import GlyphRight from "@/assets/glyph__right.svg?react"
import { TopicBrowseAggregateRoot as Presentation } from "@/viewModels/TopicBrowseAggregateRoot"

function Spinner({ visible }: { visible: boolean }) {
  return (
    <div data-visible={visible} className="page-loader">
      <div className="page-loader__spinner"></div>
    </div>
  )
}

export default function TopicBrowsePageView() {
  const { tags, items, status, offset, selectedTags, updateTag, updateOffset } =
    useTopicBrowseViewModel()

  if (status === "idle") {
    return <Spinner visible={true}></Spinner>
  }

  return (
    <>
      <Spinner visible={status === Presentation.LOADING}></Spinner>

      {/* Tags filter section */}
      <details className="filters">
        <summary className="filters__toggle btn btn--ghost">
          <Filter />
        </summary>

        <div className="filters__content">
          {tags.map((id) => (
            <button
              key={id}
              data-selected={selectedTags.includes(id)}
              onClick={() => updateTag(id)}
              className="tag"
            >
              {id}
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
                disabled={offset === id}
                onClick={() => updateOffset(id)}
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
