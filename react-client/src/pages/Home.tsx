import { Pagination } from "@/components/Pagination"
import { Spinner } from "@/components/Spinner"
import { Tags } from "@/components/Tags"
import useApiError from "@/hooks/useApiError"
import { apiGetArticles } from "@/services/api/articles"
import type { ArticlePreview } from "@/types/article"
import { useEffect, useLayoutEffect, useReducer, useState } from "react"
import { Link } from "react-router"

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
  const [articles, setArticles] = useState<ArticlePreview[] | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [articlesPageLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [selectedTags, setSelectedTags] = useReducer(
    TOOGLE_TAG,
    new Set<string>(),
  )
  const [isLoading, setIsLoading] = useState(true)
  const { setError } = useApiError()

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
      } catch (e) {
        setError(e)
      }
      setIsLoading(false)
    }

    getArticles()
  }, [selectedTags, page, articlesPageLimit])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [selectedTags, page, articlesPageLimit])

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
