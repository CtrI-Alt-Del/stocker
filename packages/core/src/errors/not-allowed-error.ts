import { AppError } from './app-error'

export class NotAllowedError extends AppError {
  constructor(message?: string) {
    super('Auth Error', message)
  }
}
