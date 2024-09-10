import type { ProductDto } from '../../dtos'
import { Entity } from '../abstracts'
import { Batch } from './batch'

type ProductProps = {
  name: string
  description: string
  image: string
  costPrice: number
  sellingPrice: number
  brand: number
  heigth: number
  length: number
  weight: number
  width: number
  uom: string
  code: string
  minimumStock: number
  updatedProps: Partial<ProductDto> | null
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
        heigth: dto.heigth,
        length: dto.length,
        weight: dto.weight,
        width: dto.width,
        uom: dto.uom,
        code: dto.code,
        minimumStock: dto.minimumStock,
        batches: dto.batches.map(Batch.create),
        updatedProps: null
      },
      dto.id,
    )
  }

  update(partialDto: Partial<ProductDto>) {
    for ([prop, value] of Object.entries(partialDto)) {
      if (this[prop] !== value) {
        this.props.updatedProps[prop] = value
      }
    } 
  }

  get updatedProps() {
    return this.props.updatedProps
  }

  get stock(): number {
    return this.props.batches.reduce((stock, batch) => stock + batch.itemsQuantity, 0)
  }

  get batches(): Batch[] {
    return this.props.batches
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
      heigth: this.props.heigth,
      length: this.props.length,
      weight: this.props.weight,
      width: this.props.width,
      uom: this.props.uom,
      code: this.props.code,
      minimumStock: this.props.minimumStock,
      batches: this.props.batches.map((batch) => batch.dto),
    }
  }
}
