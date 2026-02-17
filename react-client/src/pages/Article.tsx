import { Spinner } from "@/components/Spinner"
import { apiGetArticle } from "@/services/api/articles"
import type { ArticleResult } from "@/types/result"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import hljs from "highlight.js"
import useApiError from "@/hooks/useApiError"

type ArticleRouteParams = {
  articleId: string
}

export default function Article() {
  const { articleId } = useParams() as ArticleRouteParams

  const proseRef = useRef<HTMLDivElement | null>(null)

  const [article, setArticle] = useState<ArticleResult | null>()
  const { setError } = useApiError()

  useEffect(() => {
    async function getArticle() {
      try {
        const article = await apiGetArticle(articleId)
        setArticle(article)
      } catch (e) {
        setError(e)
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

  return !article ? (
    <Spinner dataVisible={true}></Spinner>
  ) : (
    <section
      ref={proseRef}
      className="article-container article__prose prose"
      dangerouslySetInnerHTML={{ __html: article.rawContent }}
    ></section>
  )
}
