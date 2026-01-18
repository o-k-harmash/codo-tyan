import type { ItemRes } from "./ItemRes"
import type { Res } from "./Res"
import type { TagList } from "./TagList"

export default {
  get(limit: number, offset: number, tags: TagList): Promise<Res<ItemRes>> {
    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
    })

    tags.forEach((tag) => params.append("tag", tag))

    return Promise.resolve({
      status: "ok",
      data: {
        limit: 15,
        offset: 0,
        total: 55,
        items: [
          {
            id: "id1",
            title: "React course",
            description:
              "Learn the fundamentals of React including JSX, component lifecycle, hooks, and state management. Build dynamic single-page applications step by step.",
            tags: ["React"],
          },
          {
            id: "id2",
            title: "HTML course",
            description:
              "Master HTML5 by creating semantic layouts, responsive designs, and accessible web pages. Understand structure, forms, and multimedia embedding.",
            tags: ["Web"],
          },
          {
            id: "id3",
            title: "Advanced JavaScript course",
            description:
              "Deep dive into modern JavaScript concepts including closures, asynchronous programming, promises, async/await, and ES6+ features.",
            tags: ["JS"],
          },
          {
            id: "id4",
            title: "TypeScript course",
            description:
              "Learn TypeScript for scalable web applications. Explore types, interfaces, classes, generics, and integrating TypeScript with React or Node.js.",
            tags: ["TS", "Web"],
          },
          {
            id: "id5",
            title: "Tailwind CSS course",
            description:
              "Understand utility-first CSS with Tailwind. Build responsive, visually appealing interfaces quickly using prebuilt classes and custom configuration.",
            tags: ["CSS", "Web"],
          },
          {
            id: "id6",
            title: "Node.js Backend course",
            description:
              "Learn to build RESTful APIs with Node.js and Express. Manage databases, authentication, and deploy scalable backend services.",
            tags: ["Node", "Backend"],
          },
        ],
      },
    })
  },
}
