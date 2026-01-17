export interface Req {
  url: string
  body?: unknown
  headers?: Record<string, string>
  options?: RequestInit
}
