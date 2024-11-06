import { NotFoundError } from "../../errors";
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
        const company = await this.companiesRepository.findById(companyId)
        if (!company) {
            throw new NotFoundError('Company não encontrado')
          }
        if (company) {
            await this.companiesRepository.delete(companyId)
        }
    }
}