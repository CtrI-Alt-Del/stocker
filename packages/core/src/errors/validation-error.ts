import { AppError } from './app-error'

export class ValidationError extends AppError {
  constructor(message?: string) {
    super('Validation Error', message)
  }
}
