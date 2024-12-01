import { Product } from '@stocker/core/entities'
import type { PrismaProduct } from '../types'

export class PrismaProductMapper {
  toDomain(prismaProduct: PrismaProduct): Product {
    const product = Product.create({
      id: prismaProduct.id,
      name: prismaProduct.name,
      image: prismaProduct.image,
      code: prismaProduct.code,
      brand: prismaProduct.brand,
      costPrice: prismaProduct.cost_price,
      sellingPrice: prismaProduct.selling_price,
      description: prismaProduct.description,
      height: prismaProduct.height,
      category: prismaProduct.category
        ? {
            id: prismaProduct.category.id,
            dto: {
              id: prismaProduct.category.id,
              name: prismaProduct.category.name,
              companyId: prismaProduct.category.company_id,
              subCategories: [],
            },
          }
        : undefined,
      location: prismaProduct.location
        ? {
            id: prismaProduct.location.id,
            dto: {
              id: prismaProduct.location.id,
              name: prismaProduct.location.name,
              companyId: prismaProduct.location.company_id,
              subLocations: [],
            },
          }
        : undefined,
      supplier: prismaProduct.supplier
        ? {
            id: prismaProduct.supplier.id,
            dto: {
              id: prismaProduct.supplier.id,
              name: prismaProduct.supplier.name,
              email: prismaProduct.supplier.email,
              companyId: prismaProduct.supplier.company_id,
            },
          }
        : undefined,
      companyId: prismaProduct.company_id,
      uom: prismaProduct.uom,
      weight: prismaProduct.weight,
      width: prismaProduct.width,
      isActive: prismaProduct.is_active,
      model: prismaProduct.model,
      length: prismaProduct.length,
      minimumStock: prismaProduct.minimum_stock,
      batches: prismaProduct.batches
        .filter((batch) => Boolean(batch.id))
        .map((prismaBatch) => ({
          id: prismaBatch.id,
          code: prismaBatch.code,
          itemsCount: prismaBatch.items_count,
          expirationDate: prismaBatch.expiration_date ?? undefined,
          maximumDaysToExpiration: prismaBatch.maximum_days_to_expiration ?? undefined,
          productId: prismaBatch.product_id,
          resgisteredAt: prismaBatch.registered_at,
        })),
    })

    return product
  }

  toPrisma(product: Product): PrismaProduct {
    const productDto = product.dto

    return {
      id: product.id,
      name: productDto.name,
      brand: productDto.brand,
      height: productDto.height,
      category_id: productDto.category?.id ?? null,
      company_id: productDto.companyId,
      code: productDto.code,
      description: productDto.description,
      cost_price: productDto.costPrice,
      image: productDto.image,
      length: productDto.length,
      minimum_stock: productDto.minimumStock,
      selling_price: productDto.sellingPrice,
      uom: productDto.uom,
      weight: productDto.weight,
      width: productDto.width,
      is_active: productDto.isActive,
      supplier_id: productDto.supplier?.id ?? null,
      location_id: productDto.location?.id ?? null,
      model: productDto.model ?? null,
      batches: productDto.batches?.length
        ? productDto.batches.map((batchDto) => ({
            id: String(batchDto.id),
            product_id: batchDto.productId,
            code: batchDto.code,
            items_count: batchDto.itemsCount,
            expiration_date: batchDto.expirationDate ?? null,
            maximum_days_to_expiration: batchDto.maximumDaysToExpiration ?? null,
            registered_at: batchDto.registeredAt ?? new Date(),
          }))
        : [],
      registered_at: new Date(),
    }
  }
}
