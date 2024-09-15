import { Product } from '@stocker/core/entities'
import type { PrismaProduct } from '../types'

export class PrismaProductMapper {
  toDomain(prismaProduct: PrismaProduct): Product {
    return Product.create({
      id: prismaProduct.id,
      name: prismaProduct.name,
      image: prismaProduct.image,
      code: prismaProduct.code,
      brand: prismaProduct.brand,
      costPrice: prismaProduct.cost_price,
      sellingPrice: prismaProduct.selling_price,
      description: prismaProduct.description,
      height: prismaProduct.height,
      categoryId: prismaProduct.category_id,
      companyId: prismaProduct.company_id,
      uom: prismaProduct.uom,
      weight: prismaProduct.weight,
      width: prismaProduct.width,
      length: prismaProduct.length,
      minimumStock: prismaProduct.minimum_stock,
      batches: prismaProduct.batches.map((prismaBatch) => ({
        id: prismaBatch.id,
        code: prismaBatch.code,
        itemsCount: prismaBatch.items_count,
        expirationDate: prismaBatch.expiration_date,
        productId: prismaBatch.product_id,
      })),
    })
  }

  toPrisma(product: Product): PrismaProduct {
    const productDto = product.dto

    return {
      id: product.id,
      name: productDto.name,
      brand: productDto.brand,
      height: productDto.height,
      category_id: productDto.categoryId ?? null,
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
      batches: productDto.batches.map((batchDto) => ({
        id: String(batchDto.id),
        product_id: batchDto.productId,
        code: batchDto.code,
        items_count: batchDto.itemsCount,
        expiration_date: batchDto.expirationDate,
      })),
    }
  }
}
