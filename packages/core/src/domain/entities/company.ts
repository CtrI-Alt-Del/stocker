import type { CompanyDto } from '../../dtos'
import { Entity } from '../abstracts'

type CompanyProps = {
  name: string
  cnpj: string
}

export class Company extends Entity<CompanyProps> {
  static create(dto: CompanyDto) {
    return new Company(dto, dto.id)
  }

  get name() {
    return this.props.name
  }

  get cnpj() {
    return this.props.cnpj
  }

  get dto(): CompanyDto {
    return {
      id: this.id,
      name: this.name,
      cnpj: this.cnpj,
    }
  }
}
