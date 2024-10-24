import type { ICompaniesRepository } from "../../interfaces";

type Request = {
    companyId: string
}

export class DeleteCompanyUseCase {
    private readonly companiesRepository: ICompaniesRepository

    constructor(companiesRepository: ICompaniesRepository) {
        this.companiesRepository = companiesRepository
    }

    async execute({ companyId }: Request) {
        await this.companiesRepository.delete(companyId)
    }
}