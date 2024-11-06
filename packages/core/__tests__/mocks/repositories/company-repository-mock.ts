import type { Company } from "../../../src/domain/entities";
import type { ICompaniesRepository } from "../../../src/interfaces";

export class CompanyRepositoryMock implements ICompaniesRepository {
    companies: Company[] = []

    async add(company: Company): Promise<void> {
        this.companies.push(company)
    }

    async delete(companyId: string): Promise<void> {
        this.companies = this.companies.filter((company) => company.id !== companyId);
    }    

    async findByCnpj(companyCnpj: string): Promise<Company | null> {
        const company = this.companies.find((company) => company.cnpj === companyCnpj) ?? null
        return company
    }

    async findById(companyId: string): Promise<Company | null> {
        const company = this.companies.find((company) => company.id === companyId) ?? null
        return company
    }

    async update(company: Company, companyId: string): Promise<Company> {
        throw new Error('Method not implemented.')
    }
}