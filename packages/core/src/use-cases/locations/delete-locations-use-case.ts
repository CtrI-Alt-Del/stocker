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
        await this.locationsRepository.deleteById(locationsId)
    }
}
