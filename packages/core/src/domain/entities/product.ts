import type { ProductDto } from '../../dtos'
import { ConflictError } from '../../errors'
import { Entity } from '../abstracts'
import { Batch } from './batch'

type ProductProps = {
  name: string
  description: string
  image: string
  costPrice: number
  sellingPrice: number
  model?: string
  brand: string
  height: number
  length: number
  weight: number
  width: number
  uom: string
  code: string
  categoryId?: string | null
  companyId: string
  minimumStock: number
  isActive: boolean
  batchesWithoutStockIds: string[]
  batches: Batch[]
}

export class Product extends Entity<ProductProps> {
  static create(dto: ProductDto) {
    return new Product(
      {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        costPrice: dto.costPrice,
        sellingPrice: dto.sellingPrice,
        brand: dto.brand,
        height: dto.height,
        length: dto.length,
        weight: dto.weight,
        width: dto.width,
        model: dto.model,
        uom: dto.uom,
        code: dto.code,
        minimumStock: dto.minimumStock,
        isActive: dto.isActive,
        batches: dto.batches ? dto.batches.map(Batch.create) : [],
        batchesWithoutStockIds: [],
        companyId: dto.companyId,
      },
      dto.id,
    )
  }

  update(partialDto: Partial<ProductDto>): Product {
    return Product.create({ ...this.dto, ...partialDto })
  }

  reduceStock(itemsCount: number): void {
    let stock = itemsCount
    if (stock > this.currentStock) {
      throw new ConflictError('Estoque insuficiente')
    }

    for (const batch of this.props.batches) {
      const batchItemsCount = batch.itemsCount
      batch.reduceItemsCount(stock)
      stock -= batchItemsCount
      if (!stock) break
    }
  }

  get currentStock(): number {
    return this.props.batches.reduce((stock, batch) => stock + batch.itemsCount, 0)
  }

  get batches(): Batch[] {
    return this.props.batches
  }

  get updatedBatches(): Batch[] {
    return this.props.batches.filter((batch) => batch.hasUpdatedStock)
  }

  get batchesWithoutStock(): Batch[] {
    return this.props.batches.filter((batch) => !batch.hasItems)
  }

  get dto(): ProductDto {
    return {
      id: this.id,
      name: this.props.name,
      description: this.props.description,
      image: this.props.image,
      costPrice: this.props.costPrice,
      sellingPrice: this.props.sellingPrice,
      brand: this.props.brand,
      height: this.props.height,
      length: this.props.length,
      weight: this.props.weight,
      width: this.props.width,
      model: this.props.model,
      uom: this.props.uom,
      code: this.props.code,
      isActive: this.props.isActive,
      minimumStock: this.props.minimumStock,
      categoryId: this.props.categoryId,
      companyId: this.props.companyId,
      batches: this.props.batches.map((batch) => batch.dto),
    }
  }
}
