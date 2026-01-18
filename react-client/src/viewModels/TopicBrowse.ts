import type { Status } from "./Status"
import type { TopicBrowseSourceOfTruth } from "./TopicBrowseSourceOfTruth"

export type TopicBrowse = TopicBrowseSourceOfTruth & {
  status: Status
}
