import type { BatchDto } from './batch-dto'

export type ProductDto = {
  id?: string
  name: string
  description: string
  image: string
  brand: string
  costPrice: number
  sellingPrice: number
  height: number
  length: number
  weight: number
  width: number
  uom: string
  code: string
  minimumStock: number
  companyId: string
  isActive: boolean
  model?: string | null
  categoryId?: string | null
  batches?: BatchDto[]
  inboundInventoryMovementsCount?: number
  outboundInventoryMovementsCount?: number
}
