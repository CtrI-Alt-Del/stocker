import { useApi, useCache } from '@/ui/hooks'
import { ProductDto } from '@stocker/core/dtos'

export const useProductsTableHook = (page: number) => {
  const useapi = useApi()

  const fetchProducts = async () => {
    const response = await useapi.productsService.listProducts({ page })
    return response
  }

  const { data, error, isLoading } = useCache<ProductDto[]>({
    fetcher: fetchProducts,
    key: '/products',
    dependencies: [page],
  })
  const products = data ?? [
    {
      id: 'product1',
      name: 'Produto Exemplo',
      description: 'Este é um produto de exemplo para testes.',
      image: 'https://example.com/image.png',
      brand: 'Marca Exemplo',
      costPrice: 50.0,
      sellingPrice: 75.0,
      height: 10.0,
      length: 15.0,
      weight: 1.5,
      width: 5.0,
      uom: 'kg',
      code: 'EX12345',
      minimumStock: 10,
      companyId: 'company1',
      categoryId: 'category1',
      batches: [],
    },
    {
      id: 'product2',
      name: 'Produto Super maneiro',
      description: 'Este é um produto de exemplo para testes.',
      image: 'https://example.com/image.png',
      brand: 'Marca Exemplo',
      costPrice: 50.0,
      sellingPrice: 75.0,
      height: 10.0,
      length: 15.0,
      weight: 1.5,
      width: 5.0,
      uom: 'kg',
      code: 'EX12345',
      minimumStock: 10,
      companyId: 'company1',
      categoryId: 'category1',
      batches: [],
    }
  ]
  const loading = isLoading
  return { products, loading }
}
