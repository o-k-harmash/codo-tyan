import type { Pagination as P } from "@/api/Pagination"

export type Pagination = P & {
  interval: (number | null)[]
  next: number | null
  prev: number | null
}
