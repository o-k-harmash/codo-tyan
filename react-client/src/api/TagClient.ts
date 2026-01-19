import type { Res } from "./Res"
import type { TagRes } from "./TagRes"

export default {
  get(): Promise<Res<TagRes>> {
    /**TODO: something as
     * httpClient<TagRes>({
     *   url: `${settings.protocol}/${settings.domain}/${settings.prefix}`,
     * })
     */
    return Promise.resolve({
      status: "ok",
      data: ["React", "Web", "JS", "TS", "CSS", "Node", "Backend"],
    })
  },
}
