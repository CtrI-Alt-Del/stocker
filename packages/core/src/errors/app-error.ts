export class AppError extends Error {
  readonly title: string
  readonly message: string

  constructor(title?: string, message?: string) {
    super(message)
    this.title = title ?? 'App Error'
    this.message = message ?? 'Generic error'
  }
}
