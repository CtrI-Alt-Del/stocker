import { useCallback, useMemo, useState } from 'react'
import { useProductsTableHook } from './use-products-table-hook'
import {
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from '@nextui-org/react'
import { Edit, Search } from 'lucide-react'
import { TableSearchComponent } from '@/ui/components/commons/search-component'

export const ProductsTable = () => {
  const [page, setPage] = useState<number>(1)
  const [filterByNameValue, setFilterByNameValue] = useState('')
  const hasSearchByNameFilter = Boolean(filterByNameValue)
  const { products, loading } = useProductsTableHook(page)
  const filteredItemsByName = useMemo(() => {
    let filteredProducts = [...products]
    if (hasSearchByNameFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterByNameValue.toLowerCase()),
      )
    }
    return filteredProducts
  }, [products, filterByNameValue, hasSearchByNameFilter])
  const rowsPerPage = 10
  const pages = Math.ceil(filteredItemsByName.length / rowsPerPage)
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return filteredItemsByName.slice(start, end)
  }, [page, products])
  const onSearchChange = useCallback((value: string | null) => {
    if (value) {
      setFilterByNameValue(value)
      setPage(1)
    } else {
      setFilterByNameValue('')
    }
  }, [])
  if (loading) {
    return (
      <Spinner
        aria-label='loading'
        label='Carregando...'
        className='flex items-center justify-center  w-full h-full  mt-24'
        size='lg'
      />
    )
  }
  return (
    <>
      <Table
        arial-label="Products table"
        
        shadow='none'
        topContent={<TableSearchComponent onSearchChange={onSearchChange} filterByNameValue={filterByNameValue}/>}
        topContentPlacement='outside'
        selectionMode='multiple'
        bottomContentPlacement='outside'
        bottomContent={
          <div className='flex w-full justify-start '>
            <Pagination
              aria-label='pagination'
              showControls
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key={'name'}>NOME</TableColumn>
          <TableColumn key={'description'}>DESCRIÇÃO</TableColumn>
          <TableColumn key={'code'}>CODIGO</TableColumn>
          <TableColumn key={'price'}>PREÇO</TableColumn>

          <TableColumn key={'minimumStock'}>ESTOQUE MINIMO</TableColumn>

          <TableColumn key={'status'}> ATIVO</TableColumn>
          <TableColumn key={'option'}>{null}</TableColumn>
        </TableHeader>
        <TableBody
          items={paginatedProducts}
          isLoading={loading}
          emptyContent={'Nenhum produto criado.'}
        >
          {(item) => (
            <TableRow>
              <TableCell key={'NAME'}>
                <div className='flex items-center gap-2'>
                  <img
                    src={item.image}
                    alt={item.name}
                    className='w-8 h-8 rounded-full'
                  />
                  <p className='font-bold'>{item.name}</p>
                </div>
              </TableCell>
              <TableCell key={'description'}>{item.description}</TableCell>
              <TableCell key={'code'}>{item.code}</TableCell>
              <TableCell key={'price'}>{item.costPrice}</TableCell>
              <TableCell key={'minimumStock'}>{item.minimumStock}</TableCell>
              <TableCell key={'status'}>status</TableCell>
              <TableCell key={'option'}>
                <Tooltip content='Editar produto'>
                  <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                    <Edit className='size-6' />
                  </span>
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
