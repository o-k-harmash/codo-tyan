import qs, { type BooleanOptional, type IStringifyOptions } from "qs"

function httpClient({
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
  body?: unknown
  headers?: Record<string, string>
  options?: RequestInit
  stringify?: IStringifyOptions<BooleanOptional>
}): Promise<Response> {
  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  let uri = ""

  if (prefix) {
    uri += prefix + "/"
  }

  uri += url

  if (params) {
    const stringifyOptions: IStringifyOptions<BooleanOptional> = {
      skipNulls: true,
      arrayFormat: "repeat",
      ...stringify,
    }

    uri += "?" + qs.stringify(params, stringifyOptions)
  }

  return fetch(uri, fetchOptions)
}

export const http = {
  create(prefix: string) {
    return {
      get(url: string, params?: Record<string, unknown>) {
        return httpClient({ url, method: "GET", params, prefix })
      },
      post(url: string, body?: unknown) {
        return httpClient({ url, method: "POST", body, prefix })
      },
      put(url: string, body?: unknown) {
        return httpClient({ url, method: "PUT", body, prefix })
      },
      patch(url: string, body?: unknown) {
        return httpClient({ url, method: "PATCH", body, prefix })
      },
      delete(url: string) {
        return httpClient({ url, method: "DELETE", prefix })
      },
    }
  },
}
