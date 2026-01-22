import type { Pagination } from "./Pagination"
import type { Form } from "./Form"
import type { Status } from "./Status"
import type { ItemList } from "../infrastructure/ItemList"

export type ItemsPage = {
  form: Form
  pagination: Pagination
  items: ItemList
  status: Status
}
