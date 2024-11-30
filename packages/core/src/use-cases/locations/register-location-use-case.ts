import type { ILocationsRepository } from "../../interfaces";
import type { LocationDto } from "../../dtos"
import { Location } from '../../domain/entities/'
import { ConflictError } from "../../errors";


type Request = {
    locationDto: LocationDto
    companyId: string
  }

export class RegisterLocationUseCase {
    private readonly locationsRepository: ILocationsRepository

    constructor(locationsRepository: ILocationsRepository) {
        this.locationsRepository = locationsRepository
    }

    async execute({ locationDto, companyId }: Request) {
      if (locationDto.name) {
        const locationName = await this.locationsRepository.findByName(locationDto.name)
        if (locationName !== null && locationName.dto.companyId === companyId) {
          throw new ConflictError('Nome já em uso por outra localização no sistema')
        }
  }
    const location = Location.create(locationDto)
    await this.locationsRepository.add(location)
    }
}