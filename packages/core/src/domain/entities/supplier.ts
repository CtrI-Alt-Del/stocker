import { Entity } from '../abstracts'
import type { SupplierDto } from '../../dtos'

type SupplierProps = {
  name: string
  email: string
  cnpj?: string
  phone?: string
}

export class Supplier extends Entity<SupplierProps> {
  static create(dto: SupplierDto) {
    return new Supplier(dto, dto.id)
  }

  get dto(): SupplierDto {
    return {
      id: this.id,
      name: this.props.name,
      email: this.props.email,
      cnpj: this.props.cnpj,
      phone: this.props.phone,
    }
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get cnpj() {
    return this.props.cnpj
  }

  get phone() {
    return this.props.phone
  }

  update(partialDto: Partial<SupplierDto>): Supplier {
    return Supplier.create({ ...this.dto, ...partialDto })
  }
}
