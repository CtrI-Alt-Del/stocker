import { NotFoundError } from "../../errors";
import type { ILocationsRepository } from "../../interfaces";

type Request = {
    locationsId: string
};

export class DeleteLocationsUseCase {
    private readonly locationsRepository: ILocationsRepository;

    constructor(locationsRepository: ILocationsRepository) {
        this.locationsRepository = locationsRepository;
    }

    async execute({ locationsId }: Request): Promise<void> {
        for (const locationId of locationsId) {
            const existingLocation = await this.locationsRepository.findById(locationId);
            if (!existingLocation) {
                throw new NotFoundError("Local não  encontrado");
            }
        }
        await this.locationsRepository.deleteMany(locationsId);
    }
}
