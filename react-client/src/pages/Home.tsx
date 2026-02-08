import { Pagination } from "@/components/Pagination"
import { Spinner } from "@/components/Spinner"
import { Tags } from "@/components/Tags"
import { apiGetArticles } from "@/services/api/articles"
import type { ArticlePreview } from "@/types/article"
import type { AppError } from "@/utils/appError"
import { useEffect, useLayoutEffect, useReducer, useState } from "react"
import { Link, useNavigate } from "react-router"

const TOOGLE_TAG = (state: Set<string>, tag: string) => {
  const next = new Set(state)
  if (next.has(tag)) {
    next.delete(tag)
  } else {
    next.add(tag)
  }
  return next
}

export default function Home() {
  const navigate = useNavigate()

  const [articles, setArticles] = useState<ArticlePreview[] | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [articlesPageLimit] = useState(15)
  const [page, setPage] = useState(1)
  const [selectedTags, setSelectedTags] = useReducer(
    TOOGLE_TAG,
    new Set<string>(),
  )
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AppError | null>()

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
    async function getArticles() {
      setIsLoading(true)
      try {
        const { articles, totalPages } = await apiGetArticles(
          page,
          articlesPageLimit,
          selectedTags,
        )
        setArticles(articles)
        setTotalPages(totalPages)
      } catch (error) {
        setError(error as AppError)
      }
      setIsLoading(false)
    }

    getArticles()
  }, [selectedTags, page, articlesPageLimit])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  if (error) {
    switch (error.type) {
      default:
        navigate("/500", { state: { status: 500 }, replace: true })
    }
  }

  return !articles ? (
    <Spinner dataVisible={true}></Spinner>
  ) : (
    <div className="browser browse-container">
      <Tags
        onLoading={setIsLoading}
        onClick={(tag) => {
          setPage(1)
          setSelectedTags(tag)
        }}
        selectedTags={selectedTags}
      ></Tags>

      <div className="browser__articles-page">
        {articles.length ? (
          <>
            <div className="browser__filtered-articles">
              {articles.map((article) => (
                <div className="browser__article-card" key={article.id}>
                  <h2 className="heading-3">
                    <Link to={`/articles/${article.slug}`}>
                      {article.title}{" "}
                    </Link>
                  </h2>

                  <div className="browser__article-card__tags">
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
          </>
        ) : (
          <div className="browser__empty-state">
            <h2>No articles found</h2>
            <p>Try changing filters or clearing search.</p>
          </div>
        )}
      </div>

      <Spinner dataVisible={isLoading}></Spinner>
    </div>
  )
}
