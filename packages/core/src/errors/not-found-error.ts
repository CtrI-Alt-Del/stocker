import { AppError } from './app-error'

export class NotFoundError extends AppError {
  constructor(message?: string) {
    super('Not Found Error', message)
  }
}
