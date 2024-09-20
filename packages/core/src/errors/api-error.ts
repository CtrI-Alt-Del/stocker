import { HTTP_STATUS_CODE } from '../constants'
import { AppError } from './app-error'

export class ApiError extends AppError {
  readonly statusCode: number

  constructor(message: string, statusCode?: number) {
    super('Api error', message)
    this.statusCode = statusCode ?? HTTP_STATUS_CODE.serverError
  }
}
