import type { Req } from "./Req"
import type { Res } from "./Res"

export default async function httpClient<T, E = Error>(
  req: Req,
): Promise<Res<T, E>> {
  const { url, body, headers = {}, options = {} } = req

  const method = headers.method ?? (body ? "POST" : "GET")

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...options,
    ...(body ? { body: JSON.stringify(body) } : {}),
  }

  try {
    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      const errorBody = await response.text()

      return {
        status: "err",
        error: new Error(errorBody || response.statusText) as E,
      }
    }

    return {
      status: "ok",
      data: (await response.json()) as T,
    }
  } catch (err) {
    /**TODO:
     * - test it when api will be connected with server
     * - e.name === "TimeoutError" considering to implement handler
     */
    if (err instanceof Error && err.name === "AbortError") {
      return {
        status: "abort",
      }
    }

    return {
      status: "err",
      error: err as E,
    }
  }
}
