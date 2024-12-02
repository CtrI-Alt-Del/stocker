import { Drawer } from '@/ui/components/commons/drawer'
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
import { IconButton } from '@/ui/components/commons/icon-button'
import { useRef } from 'react'
import type { DrawerRef } from '@/ui/components/commons/drawer/types'
import type { SupplierDto } from '@stocker/core/dtos'
import { useSuppliersTable } from './use-suppliers-table'
import { UpdateSupplierForm } from '../update-supplier-form'

type SuppliersTableProps = {
  page: number
  isLoading: boolean
  suppliers: SupplierDto[]
  totalPages: number
  selectionMode?: 'single' | 'multiple'
  selectedSuppliersIds: string[]
  onPageChange?: (page: number) => void
  onUpdateSupplier?: VoidFunction
  onSuppliersSelectionChange?: (suppliersIds: string[]) => void
}

export const SuppliersTable = ({
  page,
  isLoading,
  suppliers,
  totalPages,
  selectionMode,
  selectedSuppliersIds,
  onPageChange,
  onSuppliersSelectionChange,
  onUpdateSupplier,
}: SuppliersTableProps) => {
  const drawerRef = useRef<DrawerRef>(null)
  const {
    supplierBeingEditted,
    handleEditSupplierButtonClick,
    handleUpdateSupplierFormSubmit,
    handleCancelEditting,
    handleDrawerClose,
    handleSelectionChange,
  } = useSuppliersTable({
    suppliers,
    drawerRef,
    onSuppliersSelectionChange,
    onUpdateSupplier,
  })
  return (
    <>
      <Table
        aria-label='tabela'
        shadow='none'
        selectionMode={selectionMode ? selectionMode : 'multiple'}
        bottomContentPlacement='outside'
        selectedKeys={selectedSuppliersIds}
        onSelectionChange={handleSelectionChange}
        bottomContent={
          totalPages > 1 && (
            <div className='flex w-full justify-start'>
              <Pagination
                aria-label='paginação'
                showControls
                page={page}
                total={totalPages}
                onChange={onPageChange}
              />
            </div>
          )
        }
      >
        <TableHeader>
          <TableColumn key='name'>NOME</TableColumn>
          <TableColumn key='email'>E-MAIL</TableColumn>
          <TableColumn key='cnpj'>CNPJ</TableColumn>
          <TableColumn key='phone'>TELEFONE</TableColumn>
          <TableColumn key='action'>{null}</TableColumn>
        </TableHeader>
        <TableBody
          items={suppliers}
          isLoading={isLoading}
          loadingContent={<Spinner color='primary' label='Carregando...' />}
          aria-label='counteudo da tabela'
          emptyContent={'Nenhum fornecedor cadastrado'}
        >
          {(supplier) => (
            <TableRow key={supplier.id}>
              <TableCell key='name'>
                <span className='truncate'>{supplier.name}</span>
              </TableCell>
              <TableCell key='email'>
                <span className='truncate'>{supplier.email}</span>
              </TableCell>
              <TableCell key='cnpj'>
                <span className='truncate'>{supplier.cnpj}</span>
              </TableCell>
              <TableCell key='phone'>
                <span className='truncate'>{supplier.phone}</span>
              </TableCell>
              <TableCell key='actions'>
                <Tooltip content='Visualizar dados do Fornecedor'>
                  <IconButton
                    name='view'
                    className='size-6 text-zinc-500'
                    onClick={() => handleEditSupplierButtonClick(supplier)}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Drawer ref={drawerRef} trigger={null} onClose={handleDrawerClose}>
        {() =>
          supplierBeingEditted && (
            <UpdateSupplierForm
              supplier={supplierBeingEditted}
              onSubmit={handleUpdateSupplierFormSubmit}
              onCancel={handleCancelEditting}
            />
          )
        }
      </Drawer>
    </>
  )
}
