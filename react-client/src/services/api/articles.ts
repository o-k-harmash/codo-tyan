import type { ArticleResponse, ArticlesResponse } from "@/types/response"
import { apiService, handleError } from "."
import errors from "@/utils/appError"

export async function apiGetArticles(
  page: number,
  articlesPageLimit: number,
  tags: Set<string>,
): Promise<ArticlesResponse> {
  try {
    const params = {
      page: page - 1,
      limit: articlesPageLimit,
      tags: Array.from(tags),
    }
    /**
     * TODO: possible to add different validation for complex api contracts for example handle different statuses but
     * it is include return status to the ui and handle it for user
     * example of different reasones see: https://web.dev/articles/fetch-api-error-handling?hl=ru#when_the_network_status_code_represents_an_error
     */
    const res = await apiService.get("articles", params)

    if (!res.ok) {
      throw errors.serverError(res.status)
    }

    return res.json()
  } catch (error) {
    // return {
    //   totalPages: 55,
    //   articles: [
    //     {
    //       id: "id1",
    //       title: "React course",
    //       description:
    //         "Learn the fundamentals of React including JSX, component lifecycle, hooks, and state management. Build dynamic single-page applications step by step.",
    //       tags: ["React"],
    //     },
    //     {
    //       id: "id2",
    //       title: "HTML course",
    //       description:
    //         "Master HTML5 by creating semantic layouts, responsive designs, and accessible web pages. Understand structure, forms, and multimedia embedding.",
    //       tags: ["Web"],
    //     },
    //     {
    //       id: "id3",
    //       title: "Advanced JavaScript course",
    //       description:
    //         "Deep dive into modern JavaScript concepts including closures, asynchronous programming, promises, async/await, and ES6+ features.",
    //       tags: ["JS"],
    //     },
    //     {
    //       id: "id4",
    //       title: "TypeScript course",
    //       description:
    //         "Learn TypeScript for scalable web applications. Explore types, interfaces, classes, generics, and integrating TypeScript with React or Node.js.",
    //       tags: ["TS", "Web"],
    //     },
    //     {
    //       id: "id5",
    //       title: "Tailwind CSS course",
    //       description:
    //         "Understand utility-first CSS with Tailwind. Build responsive, visually appealing interfaces quickly using prebuilt classes and custom configuration.",
    //       tags: ["CSS", "Web"],
    //     },
    //     {
    //       id: "id6",
    //       title: "Node.js Backend course",
    //       description:
    //         "Learn to build RESTful APIs with Node.js and Express. Manage databases, authentication, and deploy scalable backend services.",
    //       tags: ["Node", "Backend"],
    //     },
    //   ],
    // }
    throw handleError(error)
  }
}

export async function apiGetArticle(
  articleId: string,
): Promise<ArticleResponse> {
  try {
    const res = await apiService.get(`articles/${articleId}`)

    if (!res.ok) {
      throw errors.serverError(res.status)
    }

    return res.json()
  } catch (error) {
    // return {
    //   id: "dahsdlk131390qdalsdja12313eqpweqdladsada",
    //   title: "React Basics",
    //   rawContent: `<h2>React Basics: Полный пример</h2>

    // <p>React — это библиотека для создания UI. Она позволяет строить компоненты и управлять состоянием приложения.</p>

    // <img src="data:image/webp;base64,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" alt="React illustration" style="width:100%; height:auto;"/>

    // <h3>Компоненты</h3>
    // <p>Компоненты могут быть функциональными или классовыми. Используем <strong>функциональные компоненты</strong> в современном React.</p>

    // <pre><code class="language-javascript">function Hello({ name }) {
    //   return &lt;h1&gt;Hello {name}&lt;/h1&gt;;
    // }

    // const App = () =&gt; &lt;Hello name="React" /&gt;;
    // </code></pre>

    // <p>Вложенные списки:</p>
    // <ul>
    //   <li>Первый уровень
    //     <ul>
    //       <li>Второй уровень</li>
    //       <li>Второй уровень
    //         <ol>
    //           <li>Нумерованный третий уровень</li>
    //           <li>Нумерованный третий уровень</li>
    //         </ol>
    //       </li>
    //     </ul>
    //   </li>
    //   <li>Первый уровень пункт 2</li>
    // </ul>

    // <h3>JSX и props</h3>
    // <p>Props позволяют передавать данные в компонент:</p>

    // <pre><code class="language-javascript">{function Button({ label, onClick }) {
    //   return <button onClick={onClick}>{label}</button>;
    // }}
    // </code></pre>

    // <p>Еще одно изображение с другим соотношением:</p>
    // <img src="https://th.bing.com/th/id/OIP.Hkckl9PJFYG4CSc1gxKF_QHaEK?w=325&h=182&c=7&r=0&o=7&pid=1.7&rm=3" alt="React workflow" style="width:100%; height:auto;"/>

    // <h4>Цитата</h4>
    // <blockquote>
    //   <p>"React делает интерфейсы предсказуемыми и декларативными."</p>
    // </blockquote>

    // <h4>Python пример</h4>
    // <pre><code class="language-python">def fibonacci(n):
    //     a, b = 0, 1
    //     for _ in range(n):
    //         print(a)
    //         a, b = b, a + b

    // fibonacci(10)
    // </code></pre>

    // <h3>Ссылки и ресурсы</h3>
    // <p>Полезные ссылки для изучения:</p>
    // <ol>
    //   <li><a href="https://reactjs.org/">React Documentation</a></li>
    //   <li><a href="https://highlightjs.org/">Highlight.js</a></li>
    //   <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
    // </ol>

    // <p>Тест абзаца с <strong>жирным текстом</strong>, <em>курсивом</em> и <code>inline code</code>.</p>

    // <h4>Реализация компонента Articles</h4>
    // <pre><code class="language-javascript">&lt;!-- Highlight.js корректная подсветка --&gt;
    // import { Spinner } from "@/components/Spinner";
    // import { apiGetArticle } from "@/services/api/articles";
    // import type { ArticleResponse } from "@/types/response";
    // import { useEffect, useLayoutEffect, useRef, useState } from "react";
    // import { useParams } from "react-router";
    // import hljs from "highlight.js";

    // export default function Article() {
    //   const params = useParams();
    //   const proseRef = useRef&lt;HTMLDivElement | null&gt;(null);
    //   const [article, setArticle] = useState&lt;ArticleResponse&gt;();

    //   useEffect(() =&gt; {
    //     const getArticle = async () =&gt; {
    //       const article = await apiGetArticle(params.articleId);
    //       setArticle(article);
    //     }
    //     getArticle();
    //   }, []);

    //   useLayoutEffect(() =&gt; {
    //     const root = proseRef.current;
    //     if (!root) return;
    //     const blocks = root.querySelectorAll&lt;HTMLElement&gt;("pre code");
    //     blocks.forEach((block) =&gt; hljs.highlightElement(block));
    //   }, [article]);

    //   if (!article) return &lt;Spinner dataVisible={true} /&gt;;

    //   return (
    //     &lt;&gt;
    //       &lt;header className="mt-(--space-lg) py-(--space-lg)"&gt;
    //         &lt;h1&gt;{article.title}&lt;/h1&gt;
    //         &lt;h2 className="heading-3 pt-(--space-sm) text-gray-400"&gt;
    //           {article.subtitle}
    //         &lt;/h2&gt;
    //       &lt;/header&gt;
    //       &lt;section
    //         ref={proseRef}
    //         className="prose mt-(--space-lg)"
    //       &gt;&lt;/section&gt;
    //     &lt;/&gt;
    //   );
    // }
    // </code></pre>

    // <h4>Заключение</h4>
    // <p>Этот пример демонстрирует почти все элементы, которые можно встретить в статье Markdown: заголовки, списки, вложенные списки, изображения разного соотношения сторон, цитаты и блоки кода.</p>
    // `,
    // }
    throw handleError(error)
  }
}
