import { Spinner } from "@/components/Spinner"
import { apiGetArticle } from "@/services/api/articles"
import type { ArticleResponse } from "@/types/response"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router"
import hljs from "highlight.js"
import type { AppError } from "@/utils/appError"

type ArticleRouteParams = {
  articleId: string
}

export default function Article() {
  const navigate = useNavigate()
  const { articleId } = useParams() as ArticleRouteParams

  const proseRef = useRef<HTMLDivElement | null>(null)

  const [article, setArticle] = useState<ArticleResponse | null>()
  const [error, setError] = useState<AppError | null>()

  useEffect(() => {
    async function getArticle() {
      try {
        const article = await apiGetArticle(articleId)
        setArticle(article)
      } catch (error) {
        setError(error as AppError)
      }
    }

    getArticle()
  }, [])

  useLayoutEffect(() => {
    const root = proseRef.current
    if (!root) {
      return
    }

    const blocks = root.querySelectorAll<HTMLElement>("pre code")
    blocks.forEach((block) => {
      hljs.highlightElement(block)
    })
  }, [article])

  if (error) {
    switch (error.type) {
      case "NOT_FOUND":
        navigate("/error", { state: { status: 404, message: "Not Found" } })
        break
      default:
        throw error
    }
  }

  return !article ? (
    <Spinner dataVisible={true}></Spinner>
  ) : (
    <div className="article__content">
      <header className="article__header">
        <h1>{article.title}</h1>
      </header>
      <section
        ref={proseRef}
        className="article__prose prose"
        dangerouslySetInnerHTML={{ __html: article.rawContent }}
      ></section>
    </div>
  )
}
