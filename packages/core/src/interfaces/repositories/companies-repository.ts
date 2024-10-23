import { Company } from "../../domain/entities";

export interface ICompaniesRepository {
	add(company: Company): Promise<void>
	findById(companyId: string): Promise<Company>
	update(company: Company, companyId: string): Promise<Company>
	delete(companyId: string): Promise<void>
}