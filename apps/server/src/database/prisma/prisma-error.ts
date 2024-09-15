import { Prisma } from '@prisma/client'
import { DatabaseError } from '@stocker/core/errors'

export class PrismaError {
  constructor(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error('Prisma client known request error')
      throw new DatabaseError(error.message)
    }
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      console.error('Prisma client unknown request error')
      throw new DatabaseError(error.message)
    }
    if (error instanceof Prisma.PrismaClientRustPanicError) {
      console.error('Prisma client rust panic error')
      throw new DatabaseError(error.message)
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      console.error('Prisma client validation error')
      throw new DatabaseError(error.message)
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
      console.error('Prisma client initialization error')
      throw new DatabaseError(error.message)
    }
    console.log(error)
  }
}
