export default class ApiError extends Error {
  readonly status?: number

  constructor(params: {
    message: string
    status?: number
    options?: ErrorOptions
  }) {
    super(params.message, params.options)

    this.name = "ApiError"
    this.status = params.status

    Object.setPrototypeOf(this, new.target.prototype)
  }
}
