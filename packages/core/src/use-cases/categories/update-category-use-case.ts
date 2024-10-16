import type { CategoryDto } from "../../dtos";
import { NotFoundError } from "../../errors";
import type { ICategoriesRepository } from "../../interfaces";

type Request = {
    categoryId: string
    categoryDto: Partial<CategoryDto>
}
export class UpdateCategoryUseCase {
    private readonly categoryRepository: ICategoriesRepository

    constructor(categoryRepository: ICategoriesRepository) {
        this.categoryRepository = categoryRepository
    }

    async execute({categoryId, categoryDto} : Request) {
        const category = await this.categoryRepository.findById(categoryId)
        if (!category) {
            throw new NotFoundError('Categoria não encontrada')
        }
        const updatedCategory = category.update(categoryDto)
        await this.categoryRepository.update(updatedCategory)
    }

}