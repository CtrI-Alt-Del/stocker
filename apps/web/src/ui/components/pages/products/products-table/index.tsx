import { NextApiClient } from '@/api/next/next-api-client'
import { ProductsService } from '@/api/services'
import { ProductDto } from '@stocker/core/dtos'
import { useEffect, useState } from 'react'

export const ProductsTable = () => {
  // const apiClient = NextApiClient()
  // const [products, setProducts] = useState<ProductDto[]>([])
  // const [page, setPage] = useState<number>(1)
  // const [loading, setLoading] = useState<boolean>(true)
  // const productsService = ProductsService(apiClient)
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true)
  //     try {
  //       const response = await productsService.listProducts({ page })
  //       setProducts(response.body.items)
  //     } catch (error) {
  //       console.log(error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }
  //   fetchProducts()
  // },[])
  // return <>{console.log(products)}</>
  return <> </>
}
