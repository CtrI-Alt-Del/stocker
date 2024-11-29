import type { ProductDto } from '../../dtos'
import { ConflictError } from '../../errors'
import type { StockLevel } from '../../types/stock-level'
import { Entity } from '../abstracts'
import { Price } from '../structs'
import { Batch } from './batch'

type ProductProps = {
  name: string
  description: string
  image: string
  costPrice: Price
  sellingPrice: Price
  brand: string
  height: number
  length: number
  weight: number
  width: number
  uom: string
  code: string
  model: string | null
  supplierId: string | null
  categoryId: string | null
  companyId: string
  minimumStock: number
  isActive: boolean
  batchesWithoutStockIds: string[]
  batches: Batch[]
  inboundInventoryMovementsCount: number
  outboundInventoryMovementsCount: number
}

export class Product extends Entity<ProductProps> {
  static create(dto: ProductDto) {
    return new Product(
      {
        name: dto.name,
        description: dto.description,
        image: dto.image,
        costPrice: Price.create(dto.costPrice),
        sellingPrice: Price.create(dto.sellingPrice),
        brand: dto.brand,
        height: dto.height,
        length: dto.length,
        weight: dto.weight,
        width: dto.width,
        uom: dto.uom,
        code: dto.code,
        minimumStock: dto.minimumStock,
        isActive: dto.isActive,
        categoryId: dto.categoryId ?? null,
        supplierId: dto.supplierId ?? null,
        model: dto.model ?? null,
        batches: dto.batches ? dto.batches.map(Batch.create) : [],
        batchesWithoutStockIds: [],
        companyId: dto.companyId,
        inboundInventoryMovementsCount: dto.inboundInventoryMovementsCount ?? 0,
        outboundInventoryMovementsCount: dto.outboundInventoryMovementsCount ?? 0,
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
      if (stock <= 0) break
    }
  }

  appendBatch(batch: Batch) {
    this.props.batches.push(batch)
    this.sortBatches()
  }

  updateBatch(updatedBatch: Batch) {
    const batchIndex = this.props.batches.findIndex((batch) =>
      batch.isEqualTo(updatedBatch),
    )
    this.props.batches.splice(batchIndex, 1, updatedBatch)
    this.sortBatches()
  }

  deleteBatches(batchesIds: string[]) {
    this.props.batches = this.props.batches.filter(
      (batch) => !batchesIds.includes(batch.id),
    )
  }

  private sortBatches() {
    this.props.batches.sort((a, b) => {
      const aExpSort = a.expirationDate ? a.expirationDate.getTime() : Infinity
      const bExpSort = b.expirationDate ? b.expirationDate.getTime() : Infinity

      if (aExpSort !== bExpSort) return aExpSort - bExpSort

      return new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
    })
  }

  get stockLevel(): StockLevel {
    if (this.currentStock >= this.minimumStock) {
      return 'safe'
    }
    if (this.currentStock > 0) {
      return 'average'
    }
    return 'danger'
  }

  get hasImage(): boolean {
    return Boolean(this.image)
  }

  get companyId(): string {
    return this.props.companyId
  }

  get categoryId(): string | null {
    return this.props.categoryId
  }

  get costPrice(): Price {
    return this.props.costPrice
  }

  get sellingPrice(): Price {
    return this.props.sellingPrice
  }

  get isActive(): boolean {
    return this.props.isActive
  }

  get image(): string {
    return this.props.image
  }

  get model(): string | null {
    return this.props.model
  }

  get description(): string {
    return this.props.description
  }

  get height(): number {
    return this.props.height
  }

  get length(): number {
    return this.props.length
  }

  get width(): number {
    return this.props.width
  }

  get brand(): string {
    return this.props.brand
  }

  get weight(): number {
    return this.props.weight
  }

  get uom(): string {
    return this.props.uom
  }

  get minimumStock(): number {
    return this.props.minimumStock
  }

  get isInactive(): boolean {
    return !this.props.isActive
  }

  get name(): string {
    return this.props.name
  }

  get code(): string {
    return this.props.code
  }

  get currentStock(): number {
    return this.props.batches.reduce((stock, batch) => stock + batch.itemsCount, 0)
  }

  get batches(): Batch[] {
    return this.props.batches
  }

  get inboundInventoryMovementsCount(): number {
    return this.props.inboundInventoryMovementsCount
  }

  set inboundInventoryMovementsCount(inboundInventoryMovementsCount: number) {
    this.props.inboundInventoryMovementsCount = inboundInventoryMovementsCount
  }

  get outboundInventoryMovementsCount(): number {
    return this.props.outboundInventoryMovementsCount
  }

  set outboundInventoryMovementsCount(outboundInventoryMovementsCount: number) {
    this.props.outboundInventoryMovementsCount = outboundInventoryMovementsCount
  }

  get batchesCount(): number {
    return this.props.batches.length
  }

  get updatedBatches(): Batch[] {
    return this.props.batches.filter((batch) => batch.hasUpdatedStock)
  }

  get emptyBatches(): Batch[] {
    return this.props.batches.filter((batch) => !batch.hasItems)
  }

  get dto(): ProductDto {
    return {
      id: this.id,
      name: this.props.name,
      description: this.props.description,
      image: this.props.image,
      costPrice: this.props.costPrice.value,
      sellingPrice: this.props.sellingPrice.value,
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
      supplierId: this.props.supplierId ?? undefined,
      inboundInventoryMovementsCount: this.props.inboundInventoryMovementsCount,
      outboundInventoryMovementsCount: this.props.outboundInventoryMovementsCount,
      batches: this.props.batches.map((batch) => batch.dto),
    }
  }
}
