import qs, { type BooleanOptional, type IStringifyOptions } from "qs"

export type Ok<T> = {
  ok: true
  status: number
  data?: T
}

export type Err<E> = {
  ok: false
  status: number
  error: E
}

export type HttpResult<T, E> = Ok<T> | Err<E>

async function httpClient<T, E>({
  url,
  method,
  prefix,
  params,
  body,
  headers = {},
  options = {},
  stringify = {},
}: {
  url: string
  prefix?: string
  method?: string
  params?: Record<string, unknown>
  body?: BodyInit
  headers?: Record<string, string>
  options?: RequestInit
  stringify?: IStringifyOptions<BooleanOptional>
}): Promise<HttpResult<T, E>> {
  const query = params
    ? `?${qs.stringify(params, {
        skipNulls: true,
        arrayFormat: "repeat",
        ...stringify,
      })}`
    : ""

  const response = await fetch(`${prefix ?? ""}${url}${query}`, {
    method,
    headers,
    body,
    credentials: "include",
    ...options,
  })

  let data: unknown = undefined

  try {
    data = await response.json()
  } catch {
    // ignore if no body
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      error: data as E,
    }
  }

  return {
    ok: true,
    status: response.status,
    data: data as T,
  }
}

export const http = {
  create(prefix: string) {
    return {
      get<T, E>(url: string, params?: Record<string, unknown>) {
        return httpClient<T, E>({ url, method: "GET", params, prefix })
      },

      post<T, E>(url: string, body?: unknown) {
        return httpClient<T, E>({
          url,
          method: "POST",
          prefix,
          body: body ? JSON.stringify(body) : undefined,
          headers: {
            "Content-Type": "application/json",
          },
        })
      },

      postForm<T, E>(url: string, formData: FormData) {
        return httpClient<T, E>({
          url,
          method: "POST",
          prefix,
          body: formData,
          // ❗ НЕ ставим Content-Type
        })
      },

      put<T, E>(url: string, body?: unknown) {
        return httpClient<T, E>({
          url,
          method: "PUT",
          prefix,
          body: body ? JSON.stringify(body) : undefined,
          headers: { "Content-Type": "application/json" },
        })
      },

      delete<T, E>(url: string) {
        return httpClient<T, E>({ url, method: "DELETE", prefix })
      },
    }
  },
}
