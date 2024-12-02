import type { Location } from '@stocker/core/entities'
import type { ILocationsRepository } from '@stocker/core/interfaces'
import { PaginationResponse } from '@stocker/core/responses'
import type { CategoriesListParams, LocationsListParams } from '@stocker/core/types'
import { prisma } from '../prisma-client'
import { PrismaError } from '../prisma-error'
import { PAGINATION } from '@stocker/core/constants'
import { PrismaLocationsMapper } from '../mappers'

export class PrismaLocationsRepository implements ILocationsRepository {
  private readonly mapper: PrismaLocationsMapper = new PrismaLocationsMapper()

  async add(location: Location): Promise<void> {
    try {
      const prismaLocation = this.mapper.toPrisma(location)

      await prisma.location.create({
        data: {
          id: prismaLocation.id,
          name: prismaLocation.name,
          company_id: prismaLocation.company_id,
          parent_location_id: prismaLocation.parent_location_id,
          registered_at: prismaLocation.registered_at,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async deleteMany(locationsIds: string[]): Promise<void> {
    try {
      for (const locationId of locationsIds) {
        const location = await prisma.location.findUnique({
          where: {
            id: locationId,
          },
          include: {
            subLocation: true,
          },
        })

        if (!location) {
          throw new PrismaError('Repository Error: Location not found')
        }

        if (location.subLocation.length > 0) {
          const subLocationIds = location.subLocation.map((subLocation) => subLocation.id)
          await prisma.location.deleteMany({
            where: {
              id: {
                in: subLocationIds,
              },
            },
          })
        }

        await prisma.location.delete({
          where: {
            id: locationId,
          },
        })
      }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findById(locationId: string): Promise<Location | null> {
    try {
      const prismaLocation = await prisma.location.findUnique({
        where: {
          id: locationId,
        },
        include: {
          subLocation: true,
        },
      })

      if (!prismaLocation) return null
      return this.mapper.toDomain(prismaLocation)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findByName(locationName: string): Promise<Location | null> {
    try {
      const prismaLocation = await prisma.location.findFirst({
        where: {
          name: locationName,
        },
        include: {
          subLocation: true,
        },
      })

      if (!prismaLocation) return null
      return this.mapper.toDomain(prismaLocation)
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async findMany({
    name,
    companyId,
    page,
  }: LocationsListParams): Promise<{ locations: Location[]; count: number }> {
    try {
      const prismaLocations = await prisma.location.findMany({
        take: PAGINATION.itemsPerPage,
        skip: page > 0 ? (page - 1) * PAGINATION.itemsPerPage : 0,
        where: {
          company_id: companyId,
          parent_location_id: null,
          name: { contains: name, mode: 'insensitive' },
        },
        include: {
          subLocation: true,
        },
        orderBy: { registered_at: 'desc' },
      })
      const count = await prisma.location.count({
        where: {
          ...(name && { name: { contains: name, mode: 'insensitive' } }),
          company_id: companyId,
          parent_location_id: null,
        },
      })

      const locations = prismaLocations.map((location) => this.mapper.toDomain(location))
      return { locations, count }
    } catch (error) {
      throw new PrismaError(error)
    }
  }

  async count(): Promise<number> {
    try {
      const count = await prisma.location.count()
      return count
    } catch (error) {
      throw new PrismaError(error)
    }
  }
  async update(location: Location, locationId: string): Promise<void> {
    try {
      const prismaLocation = this.mapper.toPrisma(location)

      await prisma.location.update({
        data: {
          name: prismaLocation.name,
        },
        where: {
          id: locationId,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
  async deleteById(locationId: string): Promise<void> {
    try {
      const location = await prisma.location.findUnique({
        where: {
          id: locationId,
        },
        include: {
          subLocation: true,
        },
      })
      if (!location) {
        throw new PrismaError('No location')
      }
      if (location.subLocation.length > 0) {
        const subLocations = location.subLocation.map((sublocation) => sublocation.id)
        await prisma.location.deleteMany({
          where: {
            id: {
              in: subLocations,
            },
          },
        })
      }
      await prisma.location.delete({
        where: {
          id: locationId,
        },
      })
    } catch (error) {
      throw new PrismaError(error)
    }
  }
}
