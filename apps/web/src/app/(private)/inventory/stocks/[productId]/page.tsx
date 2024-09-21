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
  console.log(params.productId)
  const response = await productsService.listProducts({ page: 1 })

  if (response.isFailure) {
    return notFound()
  }

  return <ProductStockPage />
}

export default Page
