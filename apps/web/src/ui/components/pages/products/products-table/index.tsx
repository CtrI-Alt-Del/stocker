import { useProductsTable } from './use-products-table'

import {
  Chip,
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
import { Edit, EyeIcon } from 'lucide-react'
import { TableSearch } from '@/ui/components/commons/search-component'
import { Tag } from '@/ui/components/commons/chip'

export const ProductsTable = () => {
  const {
    page,
    setPage,
    isLoading,
    filterByNameValue,
    HandleSearchChange,
    paginatedProducts,
    totalPages,
  } = useProductsTable()
  return (
    <>
      <Table
        arial-label='Products table'
        shadow='none'
        topContent={
          <TableSearch
            onSearchChange={HandleSearchChange}
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
          <TableColumn key={'code'}>CODIGO</TableColumn>
          <TableColumn key={'price'}>PREÇO</TableColumn>

          <TableColumn key={'minimumStock'}>ESTOQUE MINIMO</TableColumn>
          <TableColumn key={'distributor'}>FORNECEDOR</TableColumn>

          <TableColumn key={'status'}> ATIVO</TableColumn>

          <TableColumn key={'option'}>AÇÕES</TableColumn>
        </TableHeader>
        <TableBody
          items={paginatedProducts}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' />}
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
              <TableCell key={'code'}>{item.code}</TableCell>
              <TableCell key={'price'}>{item.costPrice}</TableCell>
              <TableCell key={'minimumStock'}>{item.minimumStock}</TableCell>
              <TableCell key={'distributor'}>GABRIEL :)</TableCell>

              <TableCell key={'status'}>
                <Tag type='sucess'>Ativo</Tag>
              </TableCell>

              <TableCell key={'option'}>
                <div className='flex flex-row items-center justify-center gap-2'>
                  <Tooltip content='Editar produto'>
                    <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                      <Edit className='size-6' />
                    </span>
                  </Tooltip>
                  <Tooltip content='Ver produto'>
                    <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                      <EyeIcon className='size-6' />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
