import { Company } from '@stocker/core/entities'
import type { PrismaCompany } from '../types'

export class PrismaCompaniesMapper {
  toDomain(prismaCompany: PrismaCompany): Company {
    const company = Company.create({
      id: prismaCompany.id,
      name: prismaCompany.name,
      cnpj: prismaCompany.cnpj,
    })

    return company
  }

  toPrisma(company: Company): PrismaCompany {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
    }
  }
}
