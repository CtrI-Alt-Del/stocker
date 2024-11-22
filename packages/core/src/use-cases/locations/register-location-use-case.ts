import type { ILocationsRepository } from "../../interfaces";
import type { LocationDto } from "../../dtos"
import { Location } from '../../domain/entities/'
import { ConflictError } from "../../errors";


type Request = {
    locationDto: LocationDto
  }

export class RegisterLocationUseCase {
    private readonly locationsRepository: ILocationsRepository

    constructor(locationsRepository: ILocationsRepository) {
        this.locationsRepository = locationsRepository
    }

    async execute({ locationDto }: Request) {
    const existingLocation = await this.locationsRepository.findByName(locationDto.name)
    if (existingLocation !== null) {
        throw new ConflictError('Nome já em uso')
      }
      
    const location = Location.create(locationDto)
    await this.locationsRepository.add(location)
    }
}