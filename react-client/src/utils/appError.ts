export type AppErrorType =
  | "NETWORK"
  | "ABORTED"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION"
  | "SERVER"
  | "UNKNOWN"

export class AppError extends Error {
  readonly type: AppErrorType
  readonly status?: number
  readonly details?: unknown

  constructor(params: {
    type: AppErrorType
    message: string
    status?: number
    details?: unknown
  }) {
    super(params.message)
    this.name = "AppError"
    this.type = params.type
    this.status = params.status
    this.details = params.details
  }
}

export default {
  serverError: (status: number) =>
    new AppError({ type: "SERVER", message: "Server error", status }),
  validationError: (details: Record<string, string>) =>
    new AppError({
      type: "VALIDATION",
      message: "Validation failed",
      status: 422,
      details,
    }),
  unauthorizedError: () =>
    new AppError({
      type: "UNAUTHORIZED",
      message: "Unauthorized",
      status: 401,
    }),
  abortedError: () =>
    new AppError({
      type: "ABORTED",
      message: "Request aborted",
    }),
  networkError: (details: unknown) =>
    new AppError({
      type: "NETWORK",
      message: "Network error",
      details,
    }),
  notfoundError: () =>
    new AppError({
      type: "NOT_FOUND",
      message: "Not found",
    }),
}
