import { Pagination } from "@/components/Pagination"
import { Spinner } from "@/components/Spinner"
import { Tags } from "@/components/Tags"
import { apiGetArticles } from "@/services/api/articles"
import type { Article } from "@/types/article"
import { useEffect, useReducer, useState } from "react"

const toggleTag = (state: Set<string>, tag: string) => {
  const next = new Set(state)
  if (next.has(tag)) {
    next.delete(tag)
  } else {
    next.add(tag)
  }
  return next
}

export default function Home() {
  const [articles, setArticles] = useState<Article[] | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [articlesPageLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [selectedTags, setSelectedTags] = useReducer(
    toggleTag,
    new Set<string>(),
  )
  const [isLoading, setIsLoading] = useState(true)

  /**
   * TODO: AbortController implementation, maby consider tags change debounce
   *
   * Issue: If a user changes filters/pages quickly, previous requests aren't cancelled,
   * leading to potential race conditions and unnecessary network usage.
   * Recommendation: Use AbortController to cancel in-flight requests.
   *
   * Issue: When tags change, the API is called immediately. If a user clicks multiple tags quickly, multiple requests are fired.
   * Recommendation: Add debouncing for tag changes (not page changes, as those should be immediate).
   */
  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true)
      const { articles, totalPages } = await apiGetArticles(
        page,
        articlesPageLimit,
        selectedTags,
      )
      setArticles(articles)
      setTotalPages(totalPages)
      setIsLoading(false)
    }

    getArticles()
  }, [selectedTags, page, articlesPageLimit])

  if (articles === null) {
    return <Spinner dataVisible={true}></Spinner>
  }

  return (
    <>
      <Tags
        onLoading={setIsLoading}
        onClick={(tag) => {
          setPage(1)
          setSelectedTags(tag)
        }}
        selectedTags={selectedTags}
      ></Tags>

      <div
        className="flex w-full max-w-2xl flex-col gap-(--space-md)
          mt-(--space-md)"
      >
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex flex-col gap-(--space-md) rounded-md border
              border-gray-300 p-(--space-md)"
          >
            <span className="heading-3">{article.title}</span>

            <div className="flex flex-wrap gap-(--space-sm)">
              {article.tags.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <p className="text-justify">{article.description}</p>
          </div>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onClick={(page) => setPage(page)}
      />

      <Spinner dataVisible={isLoading}></Spinner>
    </>
  )
}
