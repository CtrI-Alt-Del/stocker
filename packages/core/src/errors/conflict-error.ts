import { AppError } from './app-error'

export class AlreadyExistsError extends AppError {
  constructor(message?: string) {
    super('Already Exists Error', message)
  }
}
