import type { LocationDto } from '../../dtos'
import type { ILocationsRepository } from '../../interfaces'
import { PaginationResponse } from '../../responses'

type Request = {
  companyId: string
  page: number
  name?: string
}

export class ListLocationsUseCase {
  private readonly locationsRepository: ILocationsRepository

  constructor(locationsRepository: ILocationsRepository) {
    this.locationsRepository = locationsRepository
  }

  async execute({
    companyId,
    page,
    name,
  }: Request): Promise<PaginationResponse<LocationDto>> {
    const { locations, count } = await this.locationsRepository.findMany({ name, companyId, page })
    const locationsValue = locations.map((location) => location.dto)
    return new PaginationResponse({
      items: locationsValue,
      itemsCount: count,
    })
  }
}
