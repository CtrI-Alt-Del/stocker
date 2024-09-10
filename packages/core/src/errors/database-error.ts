import { AppError } from './app-error'

export class DatabaseError extends AppError {
  constructor(message?: string) {
    super('Database Error', message)
  }
}
