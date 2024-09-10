import { AppError } from './app-error'

export class AuthError extends AppError {
  constructor(message?: string) {
    super('Auth Error', message)
  }
}
