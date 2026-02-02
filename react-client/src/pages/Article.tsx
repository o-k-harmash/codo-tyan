import { Spinner } from "@/components/Spinner"
import { apiGetArticle } from "@/services/api/articles"
import type { ArticleResponse } from "@/types/response"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import hljs from "highlight.js"

export default function Article() {
  const params = useParams()
  const proseRef = useRef<HTMLDivElement | null>(null)

  const [article, setArticle] = useState<ArticleResponse>()

  useEffect(() => {
    const getArticle = async () => {
      const article = await apiGetArticle(params.articleId)
      setArticle(article)
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

  if (!article) {
    return <Spinner dataVisible={true}></Spinner>
  }

  return (
    <>
      <header className="mt-(--space-lg) py-(--space-lg)">
        <h1>{article.title}</h1>
      </header>
      <section
        ref={proseRef}
        className="prose mt-(--space-lg)"
        dangerouslySetInnerHTML={{ __html: article.rawContent }}
      ></section>
    </>
  )
}
