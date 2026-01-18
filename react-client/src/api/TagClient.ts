import type { Res } from "./Res"
import type { TagRes } from "./TagRes"

export default {
  get(): Promise<Res<TagRes>> {
    return Promise.resolve({
      status: "ok",
      data: ["React", "Web", "JS", "TS", "CSS", "Node", "Backend"],
    })
  },
}
