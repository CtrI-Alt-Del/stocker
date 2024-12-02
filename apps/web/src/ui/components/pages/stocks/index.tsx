'use client'

import {
  Link,
  Pagination,
  Select,
  SelectItem,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'

import { ROUTES } from '@/constants/routes'
import { CategorySelect } from '../../commons/category-select'
import { Icon } from '../../commons/icon'
import { Search } from '../../commons/search'
import { Tag } from '../../commons/tag'
import { ExportCsvLink } from './export-csv-link'
import { useStocksPage } from './use-stocks-page'
import { SupplierSelect } from '../../commons/supplier-select'
import { LocationSelect } from '../../commons/location-select'
import { BROWSER_ENV } from '@/constants'
import { useAuthContext } from '../../contexts/auth-context'

export const StocksPage = () => {
  const {
    page,
    isFetching,
    products,
    productName,
    totalPages,
    stockLevel,
    supplierId,
    categoryId,
    locationId,
    handleCategoryIdChange,
    handleSupplierIdChange,
    handleLocationIdChange,
    handleStockLevelChange,
    handleSearchChange,
    handlePageChange,
  } = useStocksPage()
  const { userRole } = useAuthContext()

  return (
    <div className='space-y-3'>
      <h1 className='text-3xl font-black'>Inventário</h1>
      <div className='flex flex-col-reverse sm:flex-row justify-between gap-4 w-full'>
        <Search value={productName} onSearchChange={handleSearchChange} />
        <div>
          <ExportCsvLink
            href={`${BROWSER_ENV.appUrl}${ROUTES.api.inventoryCsv}?productName=${productName}&supplierId=${supplierId}&categoryId=${categoryId}&locationId=${locationId}&stockLevel=${stockLevel}`}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-4 max-w-5xl gap-3 mt-3'>
        <CategorySelect
          mode='filter'
          onSelectChange={handleCategoryIdChange}
          defeaultCategoryId={categoryId}
          className='w-full md:w-64'
        />
        <SupplierSelect
          mode='filter'
          onSelectChange={handleSupplierIdChange}
          defaultSupplierId={supplierId}
          className='w-full md:w-64'
        />
        <LocationSelect
          mode='filter'
          onSelectChange={handleLocationIdChange}
          defeaultLocationId={locationId}
          className='w-full md:w-64'
        />
        <Select
          className='max-w-96'
          size='md'
          defaultSelectedKeys={['']}
          label='Nível de estoque'
          value={stockLevel}
          onChange={(e) => handleStockLevelChange(e.target.value)}
        >
          <SelectItem key='' value=''>
            Todos
          </SelectItem>
          <SelectItem key='safe' value='safe'>
            Ideal
          </SelectItem>
          <SelectItem key='average' value='average'>
            Baixo
          </SelectItem>
          <SelectItem key='danger' value='danger'>
            Esgotado
          </SelectItem>
        </Select>
      </div>
      <Table
        aria-label='Tabela de Inventário'
        shadow='none'
        topContentPlacement='outside'
        bottomContentPlacement='outside'
        bottomContent={
          totalPages > 1 ? (
            <div className='flex w-full justify-start'>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={totalPages}
                onChange={handlePageChange}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key='product' className='uppercase'>
            Produto
          </TableColumn>
          <TableColumn key='batch' className='uppercase'>
            Quantidade de lotes
          </TableColumn>
          <TableColumn key='inbound' className='uppercase'>
            Lançamentos de entrada
          </TableColumn>
          <TableColumn key='outbound' className='uppercase'>
            Lançamentos de saída
          </TableColumn>
          <TableColumn key='stock' className='uppercase'>
            Estoque atual
          </TableColumn>
          <TableColumn key='min-stock' className='uppercase'>
            Estoque mínimo
          </TableColumn>
          <TableColumn key='status' className='uppercase'>
            Status do estoque
          </TableColumn>
        </TableHeader>
        <TableBody
          items={products}
          isLoading={isFetching}
          loadingContent={<Spinner color='primary' />}
          emptyContent='Nenhum estoque registrado'
        >
          {(product) => (
            <TableRow key={product.id}>
              <TableCell key='product' className='flex flex-col sm:flex-row gap-1'>
                <Link href={`${ROUTES.inventory.stocks}/${product.id}`}>
                  <Icon name='stock' className='size-6 text-zinc-500 mr-1' />
                </Link>
                {product.name}
              </TableCell>
              <TableCell key='batch'>{product.batchesCount}</TableCell>
              <TableCell key='inbound' className='font-semibold'>
                {product.inboundInventoryMovementsCount}
              </TableCell>
              <TableCell key='outbound'>
                {product.outboundInventoryMovementsCount}
              </TableCell>
              <TableCell key='stock'>{product.currentStock}</TableCell>
              <TableCell key='min-stock'>{product.minimumStock}</TableCell>
              <TableCell key='status'>
                {product.currentStock > product.minimumStock ? (
                  <Tag type='sucess'>Ideal</Tag>
                ) : product.currentStock > 0 ? (
                  <Tag type='warning'>Baixo</Tag>
                ) : (
                  <Tag type='danger'>Esgotado</Tag>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
