import { describe, expect, it } from 'vitest'
import { Supplier } from '../supplier'
import type { SupplierDto } from '../../../dtos'

describe('Supplier entity', () => {
  it('should be created with valid DTO', () => {
    const supplierDto: SupplierDto = {
      id: '1',
      name: 'Supplier Name',
      email: 'supplier@example.com',
      cnpj: '12345678000195',
      phone: '1234567890',
    }
    const supplier = Supplier.create(supplierDto)

    expect(supplier.dto).toEqual(supplierDto)
  })

  it('should update supplier details', () => {
    const supplierDto: SupplierDto = {
      id: '1',
      name: 'Supplier Name',
      email: 'supplier@example.com',
    }
    const supplier = Supplier.create(supplierDto)

    const updatedSupplier = supplier.update({ name: 'Updated Supplier Name' })

    expect(updatedSupplier.name).toEqual('Updated Supplier Name')
    expect(updatedSupplier.email).toEqual(supplier.email)
  })

  it('should return the correct DTO after update', () => {
    const supplierDto: SupplierDto = {
      id: '1',
      name: 'Supplier Name',
      email: 'supplier@example.com',
    }
    const supplier = Supplier.create(supplierDto)

    const updatedSupplier = supplier.update({ email: 'newemail@example.com' })

    expect(updatedSupplier.dto.email).toEqual('newemail@example.com')
    expect(updatedSupplier.dto.name).toEqual(supplier.name)
  })
})
