import { useCallback  } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useApi, useCache } from '@/ui/hooks'
import { ProductDto } from '@stocker/core/dtos'
import { usePagination } from '@/ui/hooks/use-pagination'
import { PAGINATION } from '@stocker/core/constants'

export const useProductsTable = () => {
  const [pageState, setPage] = useQueryState('page', parseAsInteger)
  const page = pageState ?? 1
  const [filterByNameValueState, setFilterByNameValue] = useQueryState('name')
  const filterByNameValue = filterByNameValueState ?? ''

  const { productsService } = useApi()

  const fetchProducts = async () => {
    const response = await productsService.listProducts({ page })
    return response.body.items
  }

  const { data, isLoading } = useCache<ProductDto[]>({
    fetcher: fetchProducts,
    key: '/products',
    dependencies: [page],
  })

  const products = data ?? generateMockProducts()
  const loading = isLoading

  // Filter products by name Logic :)
  const filteredItemsByName = products.filter((product) =>
    product.name.toLowerCase().includes(filterByNameValue.toLowerCase()),
  )

  // Pagination logic :)
  const  itemsPerPage  = PAGINATION.itemsPerPage
  const { paginatedItems, totalPages } = usePagination(
    filteredItemsByName,
    page,
    itemsPerPage,
  )

  // Search change handle :)
  const onSearchChange = useCallback(
    (value: string | null) => {
      setFilterByNameValue(value ?? '')
      if (value) setPage(1)
    },
    [setFilterByNameValue, setPage],
  )

  return {
    page,
    setPage,
    filterByNameValue,
    onSearchChange,
    paginatedProducts: paginatedItems,
    totalPages,
    loading,
  }
}

//this is a VERY bad mock data,but use here for tests while backend is even worst than this mock
const generateMockProducts = () => [
  {
    id: 'product1',
    name: 'Produto Exemplo',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product3',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product4',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product5',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
  {
    id: 'product2',
    name: 'Produto Exemplo2',
    description: 'Este é um produto de exemplo para testes.',
    image: 'https://example.com/image.png',
    brand: 'Marca Exemplo',
    costPrice: 50.0,
    sellingPrice: 75.0,
    minimumStock: 10,
    code: 'EX12345',
    batches: [],
  },
]
