import type { ArticlesResponse } from "@/types/response"
import { apiService, handleError } from "."

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
    const response = await apiService.get("articles", params)
    return response.json()
  } catch (err) {
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
    throw handleError(err, "error while fetching articles")
  }
}
