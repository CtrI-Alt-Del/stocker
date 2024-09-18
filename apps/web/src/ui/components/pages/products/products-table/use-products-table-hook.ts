import { useCallback, useMemo } from 'react'
import { parseAsInteger, useQueryState } from 'nuqs'
import { useApi, useCache } from '@/ui/hooks'
import { ProductDto } from '@stocker/core/dtos'
import { usePagination } from '@/ui/hooks/use-pagination'

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
  const filteredItemsByName = useMemo(() => {
    if (!filterByNameValue) return products
    return products.filter((product) =>
      product.name.toLowerCase().includes(filterByNameValue.toLowerCase()),
    )
  }, [products, filterByNameValue])

  // Pagination logic :)
  const rowsPerPage = 10
  const { paginatedItems, totalPages } = usePagination(
    filteredItemsByName,
    page,
    rowsPerPage,
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
    id: 'product6',
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
    id: 'product7',
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
    id: 'product8',
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
    id: 'product9',
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
    id: 'product10',
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
    id: 'product11',
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
    id: 'product12',
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
