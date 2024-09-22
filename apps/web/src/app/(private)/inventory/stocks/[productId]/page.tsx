import { notFound } from 'next/navigation'

import { NextServerApiClient } from '@/api/next/clients/next-server-api-client'
import { ProductsService } from '@/api/services'
import { ProductStockPage } from '@/ui/components/pages/product-stock'

type PageProps = {
  params: {
    productId: string
  }
}

const Page = async ({ params }: PageProps) => {
  const apiClient = NextServerApiClient()
  const productsService = ProductsService(apiClient)
  const response = await productsService.getProduct(params.productId)

  if (response.isFailure) {
    return notFound()
  }

  return <ProductStockPage productDto={response.body} />

}

export default Page
