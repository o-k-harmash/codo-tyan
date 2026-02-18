import { Spinner } from "@/components/Spinner"
import redirectToEdit, { apiGetArticle } from "@/services/api/articles"
import type { ArticleResult } from "@/types/result"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import hljs from "highlight.js"
import useApiError from "@/hooks/useApiError"
import Phone from "@/assets/phone.svg?react"

type ArticleRouteParams = {
  articleId: string
}

export default function Article() {
  const { articleId } = useParams() as ArticleRouteParams

  const proseRef = useRef<HTMLDivElement | null>(null)
  const tableOfContentRef = useRef<HTMLDivElement | null>(null)

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
  })

  useEffect(() => {
    const root = proseRef.current
    const aside = tableOfContentRef.current

    if (!root || !aside) {
      return
    }

    aside.innerHTML = ""

    const title = document.createElement("span")

    title.className = "aside__title"
    title.textContent = "Table of content"
    aside.appendChild(title)

    const headers = root.querySelectorAll<HTMLElement>("h2")
    headers.forEach((header, i) => {
      if (!header.id) {
        header.id = `section-${i + 1}`
      }

      const link = document.createElement("a")
      link.href = `#${header.id}`
      link.className = "article__item nav__item"
      link.textContent = header.textContent || `Section ${i + 1}`

      aside.appendChild(link)
    })
  }, [article])

  return !article ? (
    <Spinner dataVisible={true}></Spinner>
  ) : (
    <section className="article">
      <div className="article__content">
        <div
          ref={proseRef}
          className="article__prose prose"
          dangerouslySetInnerHTML={{ __html: article.rawContent }}
        ></div>
        <aside className="article__aside" ref={tableOfContentRef}></aside>
      </div>
      <div className="article__menu">
        <button
          className="btn btn--iconic btn--outlined"
          onClick={() => redirectToEdit(article.slug)}
        >
          <Phone /> Edit on GitHub
        </button>
      </div>
    </section>
  )
}
