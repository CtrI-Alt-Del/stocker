import type { BatchDto } from './batch-dto'

export type ProductDto = {
  id?: string
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
  batches: BatchDto[]
}
