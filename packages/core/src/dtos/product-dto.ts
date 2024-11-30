import type { BatchDto } from './batch-dto'
import type { CategoryDto } from './category-dto'
import type { LocationDto } from './location-dto'
import type { SupplierDto } from './supplier-dto'

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
  supplier?: {
    id: string
    dto?: SupplierDto
  }
  category?: {
    id: string
    dto?: CategoryDto
  }
  location?: {
    id: string
    dto?: LocationDto
  }
  model?: string | null
  batches?: BatchDto[]
  inboundInventoryMovementsCount?: number
  outboundInventoryMovementsCount?: number
}
