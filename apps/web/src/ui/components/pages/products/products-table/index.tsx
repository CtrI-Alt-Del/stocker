import { useProductsTableHook } from './use-products-table-hook'
import {
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
import { Edit } from 'lucide-react'
import { TableSearchComponent } from '@/ui/components/commons/search-component'

export const ProductsTable = () => {
  const {
    page,
    setPage,
    loading,
    filterByNameValue,
    onSearchChange,
    paginatedProducts,
    totalPages,
  } = useProductsTableHook()
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
        arial-label='Products table'
        shadow='none'
        topContent={
          <TableSearchComponent
            onSearchChange={onSearchChange}
            filterByNameValue={filterByNameValue}
          />
        }
        topContentPlacement='outside'
        selectionMode='multiple'
        bottomContentPlacement='outside'
        bottomContent={
          <div className='flex w-full justify-start '>
            <Pagination
              aria-label='pagination'
              showControls
              page={page}
              total={totalPages}
              onChange={(event) => {
                if (event && typeof event === 'number') {
                  setPage(event)
                } else {
                  setPage(1)
                }
              }}
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
